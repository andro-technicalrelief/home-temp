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
import { registerClient, getClientDetails } from '../services/blestaApi'

const AuthContext = createContext(null)

// ═══════════════════════════════════════════════════════
// DEMO CLIENT DATABASE
// Kept as a fallback for testing. In production, Firebase
// handles auth and Blesta stores client profiles.
// ═══════════════════════════════════════════════════════

export const DEMO_CLIENTS = [
  {
    id: 'client-001',
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@technicalrelief.co.za',
    phone: '+27 12 345 6789',
    address1: '123 Main Street',
    city: 'Cape Town',
    state: 'Western Cape',
    zip: '8001',
    country: 'ZA',
    company: 'Technical Relief',
    tier: 'enterprise',
  },
  {
    id: 'client-002',
    first_name: 'James',
    last_name: 'Mitchell',
    email: 'james@techventures.co.za',
    phone: '+27 21 555 0142',
    address1: '88 Bree Street',
    city: 'Cape Town',
    state: 'Western Cape',
    zip: '8001',
    country: 'ZA',
    company: 'TechVentures SA',
    tier: 'growth',
  },
  {
    id: 'client-003',
    first_name: 'Sarah',
    last_name: 'Khumalo',
    email: 'sarah@digitalcommerce.co.za',
    phone: '+27 11 234 8800',
    address1: '14 Sandton Drive',
    city: 'Johannesburg',
    state: 'Gauteng',
    zip: '2196',
    country: 'ZA',
    company: 'Digital Commerce Co',
    tier: 'sme',
  },
  {
    id: 'client-004',
    first_name: 'David',
    last_name: 'Pretorius',
    email: 'david@logiflow.co.za',
    phone: '+27 12 998 3310',
    address1: '5 Innovation Hub',
    city: 'Pretoria',
    state: 'Gauteng',
    zip: '0181',
    country: 'ZA',
    company: 'LogiFlow',
    tier: 'growth',
  },
  {
    id: 'client-005',
    first_name: 'Naledi',
    last_name: 'Mokoena',
    email: 'naledi@greenleaf.co.za',
    phone: '+27 31 400 2211',
    address1: '22 Umhlanga Rocks Drive',
    city: 'Durban',
    state: 'KwaZulu-Natal',
    zip: '4319',
    country: 'ZA',
    company: 'GreenLeaf Organics',
    tier: 'sme',
  },
]

function findDemoClient(email) {
  return DEMO_CLIENTS.find((c) => c.email.toLowerCase() === email.toLowerCase())
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
    // Check for demo client session first
    const demoId = localStorage.getItem('demo_client_id')
    if (demoId) {
      const demoClient = DEMO_CLIENTS.find((c) => c.id === demoId)
      if (demoClient) {
        setUser(demoClient)
        setLoading(false)
        // Still listen for Firebase changes but don't block
      }
    }

    // Listen for Firebase auth state
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setFirebaseUser(fbUser)
        // Build user profile from Firebase + any stored Blesta data
        const profile = {
          id: fbUser.uid,
          firebase_uid: fbUser.uid,
          email: fbUser.email,
          first_name: fbUser.displayName?.split(' ')[0] || fbUser.email.split('@')[0],
          last_name: fbUser.displayName?.split(' ').slice(1).join(' ') || '',
          emailVerified: fbUser.emailVerified,
          phone: fbUser.phoneNumber || '',
          // Try to fetch Blesta profile
          tier: 'sme',
        }

        // Attempt to load Blesta client details
        try {
          const blestaData = await getClientDetails(fbUser.uid)
          if (blestaData?.client) {
            Object.assign(profile, blestaData.client, { firebase_uid: fbUser.uid })
          }
        } catch {
          // Blesta not connected yet — use Firebase profile only
        }

        if (!localStorage.getItem('demo_client_id')) {
          setUser(profile)
        }
      } else {
        setFirebaseUser(null)
        if (!localStorage.getItem('demo_client_id')) {
          setUser(null)
        }
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
      // ─── Demo client login (password = email) ───
      const demoClient = findDemoClient(email)
      if (demoClient && password === demoClient.email) {
        localStorage.setItem('demo_client_id', demoClient.id)
        localStorage.removeItem('blesta_token')
        localStorage.removeItem('blesta_client_id')
        setUser(demoClient)
        return { success: true, mode: 'demo' }
      }

      // ─── If email matched a demo client but wrong password ───
      if (demoClient) {
        throw new Error('Invalid credentials')
      }

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
  // Creates Firebase account + optional Blesta client record.
  // ═══════════════════════════════════════════════════════

  const register = useCallback(async (data) => {
    setError(null)
    try {
      const { email, password, ...profileData } = data

      // Create Firebase user
      const cred = await createUserWithEmailAndPassword(auth, email, password)

      // Send email verification
      await sendEmailVerification(cred.user)

      // Try to create Blesta client record linked to Firebase UID
      try {
        await registerClient({
          ...profileData,
          email,
          firebase_uid: cred.user.uid,
        })
      } catch {
        // Blesta not connected yet — Firebase registration still succeeds
        console.warn('Blesta client creation skipped — API not connected')
      }

      localStorage.removeItem('demo_client_id')
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
    // Clear demo session
    localStorage.removeItem('demo_client_id')
    localStorage.removeItem('blesta_token')
    localStorage.removeItem('blesta_client_id')

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
