// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxQrBcBN5QvRboxBKkALwMkh6vHlGP6xY",
  authDomain: "gf-complaint-portal.firebaseapp.com",
  projectId: "gf-complaint-portal",
  storageBucket: "gf-complaint-portal.firebasestorage.app",
  messagingSenderId: "502042294584",
  appId: "1:502042294584:web:01ed077efb98620842a9cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db };