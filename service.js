// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABPfLZtz-4yVTBbpGZYgOzqVvLnKSPjCU",
  authDomain: "tes-hosting-ceef8.firebaseapp.com",
  projectId: "tes-hosting-ceef8",
  storageBucket: "tes-hosting-ceef8.firebasestorage.app",
  messagingSenderId: "366297598678",
  appId: "1:366297598678:web:3f1c0339a32a1227e55777",
  measurementId: "G-4HC07Q5WJT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);