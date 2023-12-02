// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-6f3bf.firebaseapp.com",
  projectId: "mern-auth-6f3bf",
  storageBucket: "mern-auth-6f3bf.appspot.com",
  messagingSenderId: "1059389930537",
  appId: "1:1059389930537:web:226170a6fa2abe66003038"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);