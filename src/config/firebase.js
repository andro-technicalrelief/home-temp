import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updatePassword,
  sendEmailVerification,
  fetchSignInMethodsForEmail,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let app;
let auth;

try {
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    throw new Error('Firebase API Key is missing. Check your .env file.')
  }
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
} catch (err) {
  console.error("Firebase Initialization Error:", err.message)
  app = { name: '[Firebase Initialization Failed]' }
  auth = {
    currentUser: null,
    onAuthStateChanged: (observer) => { 
      console.warn("Firebase Auth not available - defaulting to guest mode.");
      if (typeof observer === 'function') observer(null);
      else if (observer?.next) observer.next(null);
      return () => {} 
    }
  }
}

export {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updatePassword,
  sendEmailVerification,
  fetchSignInMethodsForEmail,
}
export default app
