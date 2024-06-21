// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw0t-FmSrPh8c5H7PAEZo1duXjhvr4OVA",
  authDomain: "photofolio-438d9.firebaseapp.com",
  projectId: "photofolio-438d9",
  storageBucket: "photofolio-438d9.appspot.com",
  messagingSenderId: "185270524007",
  appId: "1:185270524007:web:de4c172d81f4d3a9e25cc2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
