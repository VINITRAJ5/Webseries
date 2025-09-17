// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBglA1qje-nY3MO22xYeK4P52m1AJJqWvY",
  authDomain: "movie-app-fab6c.firebaseapp.com",
  projectId: "movie-app-fab6c",
  storageBucket: "movie-app-fab6c.firebasestorage.app",
  messagingSenderId: "375050138481",
  appId: "1:375050138481:web:1e0cb7c8072fbee145bcd0",
  measurementId: "G-J2F21Q63T8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);