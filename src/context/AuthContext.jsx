'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updatePassword as firebaseUpdatePassword,
  sendEmailVerification,
  fetchSignInMethodsForEmail,
} from '../config/firebase'
import { createContact, searchContacts, getContact } from '../services/ghlApi'
import { syncUserToN8N } from '../services/n8nApi'

const AuthContext = createContext(null)

// ═══════════════════════════════════════════════════════
// DEMO CLIENT DATABASE
// Kept as a fallback for testing. In production, Firebase
// handles auth and Blesta stores client profiles.
// ═══════════════════════════════════════════════════════

export const DEMO_CLIENTS = []

function findDemoClient(email) {
  return null
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [firebaseUser, setFirebaseUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [justRegistered, setJustRegistered] = useState(false)

  const isAuthenticated = !!user
  const isFirebaseAuth = !!firebaseUser

  // Clear the justRegistered flag (called after tour completes)
  const clearJustRegistered = useCallback(() => {
    setJustRegistered(false)
  }, [])

  // ═══════════════════════════════════════════════════════
  // AUTH STATE LISTENER
  // Firebase auth state changes trigger this callback.
  // Demo clients bypass Firebase entirely.
  // ═══════════════════════════════════════════════════════

  useEffect(() => {


    // Listen for Firebase auth state
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setFirebaseUser(fbUser)
        // Build user profile from Firebase + GHL CRM data
        const profile = {
          id: fbUser.uid,
          firebase_uid: fbUser.uid,
          email: fbUser.email,
          first_name: fbUser.displayName?.split(' ')[0] || fbUser.email.split('@')[0],
          last_name: fbUser.displayName?.split(' ').slice(1).join(' ') || '',
          emailVerified: fbUser.emailVerified,
          phone: fbUser.phoneNumber || '',
          tier: 'sme',
          ghl_contact_id: null,
        }

        // Attempt to find or create GHL contact by email
        try {
          const ghlResult = await searchContacts(fbUser.email)
          if (ghlResult?.contacts?.length > 0) {
            const ghlContact = ghlResult.contacts[0]
            profile.ghl_contact_id = ghlContact.id
            profile.first_name = ghlContact.firstName || profile.first_name
            profile.last_name = ghlContact.lastName || profile.last_name
            profile.phone = ghlContact.phone || profile.phone
            profile.tags = ghlContact.tags || []
          } else {
            // No GHL contact found — auto-create one
            try {
              const newContact = await createContact({
                firstName: profile.first_name,
                lastName: profile.last_name,
                email: fbUser.email,
                phone: fbUser.phoneNumber || '',
                tags: ['auto-synced'],
                customFields: [{ key: 'firebase_uid', value: fbUser.uid }],
              })
              if (newContact?.contact?.id) {
                profile.ghl_contact_id = newContact.contact.id
                console.log('GHL contact auto-created on login:', newContact.contact.id)
              }
            } catch {
              console.warn('GHL auto-create skipped — API not connected')
            }
          }
        } catch {
          // GHL not connected yet — use Firebase profile only
        }

        setUser(profile)
      } else {
        setFirebaseUser(null)
        setUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  // ═══════════════════════════════════════════════════════
  // LOGIN
  // Tries demo client first, then Firebase.
  // ═══════════════════════════════════════════════════════

  const login = useCallback(async (email, password) => {
    setError(null)
    try {


      // ─── Firebase login ───
      const cred = await signInWithEmailAndPassword(auth, email, password)
      localStorage.removeItem('demo_client_id')

      // Profile will be set by onAuthStateChanged listener
      return { success: true, mode: 'firebase', uid: cred.user.uid }
    } catch (err) {
      // Convert Firebase error codes to friendly messages
      const message = firebaseErrorMessage(err)
      setError(message)
      return { success: false, error: message }
    }
  }, [])

   // ═══════════════════════════════════════════════════════
  // REGISTER
  // Creates Firebase account + GHL CRM contact.
  // ═══════════════════════════════════════════════════════

  const register = useCallback(async (data) => {
    setError(null)
    try {
      const { email, password, ...profileData } = data

      // Create Firebase user
      const cred = await createUserWithEmailAndPassword(auth, email, password)

      // Send email verification
      await sendEmailVerification(cred.user)

      // Create GHL contact linked to Firebase UID
      try {
        await syncUserToN8N({
          firstName: profileData.first_name || profileData.firstName || '',
          lastName: profileData.last_name || profileData.lastName || '',
          name: `${profileData.first_name || profileData.firstName || ''} ${profileData.last_name || profileData.lastName || ''}`.trim(),
          email,
          phone: profileData.phone || '',
          tags: ["Technical Relief Signup", "New Lead"],
          locationId: "ykYa2zxHu6dYJjJsW1Zn",
          businessName: profileData.businessName || profileData.companyName || '',
          companyName: profileData.companyName || profileData.businessName || '',
          website: profileData.website || '',
          streetAddress: profileData.streetAddress || profileData.address1 || '',
          address1: profileData.address1 || profileData.streetAddress || '',
          city: profileData.city || '',
          state: profileData.state || '',
          country: profileData.country || '',
          postalCode: profileData.postalCode || '',
          customFields: [{ key: 'firebase_uid', value: cred.user.uid }],
          firebase_uid: cred.user.uid
        })
        console.log('User synced to n8n successfully')
          //
        //
      } catch (err) {
        // Firebase registration still succeeds even if n8n sync fails
        console.warn('n8n sync skipped or failed:', err.message)
      }

      setJustRegistered(true)
      return { success: true, uid: cred.user.uid, emailVerification: true }
    } catch (err) {
      const message = firebaseErrorMessage(err)
      setError(message)
      return { success: false, error: message }
    }
  }, [])

  // ═══════════════════════════════════════════════════════
  // LOGOUT
  // ═══════════════════════════════════════════════════════

  const logout = useCallback(async () => {
    // Clear session data
    localStorage.removeItem('ghl_contact_id')

    // Sign out of Firebase
    try {
      await signOut(auth)
    } catch {
      // If Firebase sign-out fails, still clear local state
    }

    setUser(null)
    setFirebaseUser(null)
    setError(null)
  }, [])

  // ═══════════════════════════════════════════════════════
  // PASSWORD MANAGEMENT
  // ═══════════════════════════════════════════════════════

  const resetPassword = useCallback(async (email) => {
    setError(null)
    try {
      await sendPasswordResetEmail(auth, email)
      return { success: true }
    } catch (err) {
      const message = firebaseErrorMessage(err)
      setError(message)
      return { success: false, error: message }
    }
  }, [])

  const changePassword = useCallback(async (newPassword) => {
    setError(null)
    if (!auth.currentUser) {
      setError('You must be logged in to change your password')
      return { success: false, error: 'Not authenticated' }
    }
    try {
      await firebaseUpdatePassword(auth.currentUser, newPassword)
      return { success: true }
    } catch (err) {
      const message = firebaseErrorMessage(err)
      setError(message)
      return { success: false, error: message }
    }
  }, [])

  // ═══════════════════════════════════════════════════════
  // RESEND EMAIL VERIFICATION
  // ═══════════════════════════════════════════════════════

  const resendVerification = useCallback(async () => {
    if (!auth.currentUser) return { success: false, error: 'Not authenticated' }
    try {
      await sendEmailVerification(auth.currentUser)
      return { success: true }
    } catch (err) {
      return { success: false, error: firebaseErrorMessage(err) }
    }
  }, [])

  // ═══════════════════════════════════════════════════════
  // CHECK IF EMAIL EXISTS IN FIREBASE
  // Used by forgot password to validate before sending reset
  // ═══════════════════════════════════════════════════════

  const checkEmailExists = useCallback(async (email) => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email)
      return { exists: methods.length > 0, methods }
    } catch (err) {
      // If Firebase email enumeration protection is ON, this may
      // always return empty. Fall through to send reset anyway.
      return { exists: null, error: firebaseErrorMessage(err) }
    }
  }, [])

  const value = {
    user,
    firebaseUser,
    loading,
    error,
    isAuthenticated,
    isFirebaseAuth,
    justRegistered,
    clearJustRegistered,
    login,
    register,
    logout,
    resetPassword,
    changePassword,
    resendVerification,
    checkEmailExists,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// ═══════════════════════════════════════════════════════
// FIREBASE ERROR MESSAGES
// Convert Firebase error codes to user-friendly strings
// ═══════════════════════════════════════════════════════

function firebaseErrorMessage(err) {
  const code = err?.code || ''
  switch (code) {
    case 'auth/user-not-found':
      return 'No account found with this email address.'
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password.'
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.'
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.'
    case 'auth/requires-recent-login':
      return 'For security, please log out and log back in before changing your password.'
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.'
    default:
      return err.message || 'An unexpected error occurred.'
  }
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
