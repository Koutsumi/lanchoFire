// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
//require("dotenv").config()

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAGvfNPbBAJTBHMxt96EOW6mg3zCoO7_Xo',
  authDomain: 'lanchofire.firebaseapp.com',
  projectId: 'lanchofire',
  storageBucket: 'lanchofire.appspot.com',
  messagingSenderId: '1001784587790',
  appId: '1:1001784587790:web:09e818b380909d05d2ae5f'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default getFirestore(app)