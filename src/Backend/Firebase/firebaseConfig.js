// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace these values with your Firebase project's configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY", // e.g., "AIzaSyD..."
    authDomain: "YOUR_AUTH_DOMAIN", // e.g., "your-project-id.firebaseapp.com"
    projectId: "YOUR_PROJECT_ID", // e.g., "your-project-id"
    storageBucket: "YOUR_STORAGE_BUCKET", // e.g., "your-project-id.appspot.com"
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // e.g., "123456789"
    appId: "YOUR_APP_ID" // e.g., "1:123456789:web:abc123def456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get Firebase Auth instance
const db = getFirestore(app); // Get Firestore instance

export { auth, db }; // Export Auth and Firestore instances
