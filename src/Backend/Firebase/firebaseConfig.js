// src/Backend/Firebase/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import { getFirestore } from 'firebase/firestore'; // Import Firestore
import { getStorage } from 'firebase/storage'; // Import Storage
import { getAnalytics } from 'firebase/analytics'; // Import Analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAr6lrGokJhGoGIinL9jBcJVwZy3I3rDZU",
  authDomain: "market-place-100d5.firebaseapp.com",
  projectId: "market-place-100d5",
  storageBucket: "market-place-100d5.appspot.com",
  messagingSenderId: "417791995406",
  appId: "1:417791995406:web:868fb04049f352d83c965f",
  measurementId: "G-GEVB2THCTP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Initialize Analytics
const auth = getAuth(app); // Initialize Firebase Auth
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app); // Initialize Storage

// Export the initialized services
export { app, analytics, auth, db, storage };
