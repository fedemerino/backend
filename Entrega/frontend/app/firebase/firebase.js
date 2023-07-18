// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUzoRIih8FTwLjzx9SuIu7e_NLh1Qdx54",
  authDomain: "sneakers-55719.firebaseapp.com",
  projectId: "sneakers-55719",
  storageBucket: "sneakers-55719.appspot.com",
  messagingSenderId: "76595027085",
  appId: "1:76595027085:web:d719819610c4ff850216c4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);