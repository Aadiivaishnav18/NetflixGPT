// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-quuOJWJeyySsRgrdSp4qviEINGR-z1w",
  authDomain: "netflixgpt-ded95.firebaseapp.com",
  projectId: "netflixgpt-ded95",
  storageBucket: "netflixgpt-ded95.firebasestorage.app",
  messagingSenderId: "1096712169902",
  appId: "1:1096712169902:web:675bd177c77c07779ec03f",
  measurementId: "G-T2K7RD71ZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);