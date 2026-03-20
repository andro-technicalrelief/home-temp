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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

let app;
let auth;

try {
  if (!import.meta.env.VITE_FIREBASE_API_KEY) {
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
