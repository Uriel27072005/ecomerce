// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACADwy3iSxnIGC3JqICAaXLUYe8RrBKhM",
  authDomain: "ecomerce-9aab6.firebaseapp.com",
  projectId: "ecomerce-9aab6",
  storageBucket: "ecomerce-9aab6.firebasestorage.app",
  messagingSenderId: "939882069355",
  appId: "1:939882069355:web:e1e9005467a8be1840a02e",
  measurementId: "G-N44GZ0TD5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Removed the unused analytics
const db = getFirestore(app); // Initialize Firestore

export { db }; // Export Firestore
