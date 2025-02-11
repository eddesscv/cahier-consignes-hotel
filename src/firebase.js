// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC3yupxF4pjowV-m5oYnrVtfXEr2qHBwF8",
  authDomain: "cashier-consigne-123-elyees.firebaseapp.com",
  projectId: "cashier-consigne-123-elyees",
  storageBucket: "cashier-consigne-123-elyees.firebasestorage.app",
  messagingSenderId: "53113554642",
  appId: "1:53113554642:web:b0b9e4128bc2a9e18c8f0b",
  measurementId: "G-2455G435ZC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db };
