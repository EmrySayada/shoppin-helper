// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxFB3m1iPghAGaz2O7pCz-HYMHPCr1tnQ",
  authDomain: "shopping-helper-ee11b.firebaseapp.com",
  projectId: "shopping-helper-ee11b",
  storageBucket: "shopping-helper-ee11b.firebasestorage.app",
  messagingSenderId: "799422948812",
  appId: "1:799422948812:web:5513c6a53fdafc87456969"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);