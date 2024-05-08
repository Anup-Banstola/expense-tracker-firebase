// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsdazAEfNU6Hukv7CyKmkD8l6NvsUFHjs",
  authDomain: "expense-tracker-firebase-e6195.firebaseapp.com",
  projectId: "expense-tracker-firebase-e6195",
  storageBucket: "expense-tracker-firebase-e6195.appspot.com",
  messagingSenderId: "216593805064",
  appId: "1:216593805064:web:72dd79a9cc2e3d879b86bd",
  measurementId: "G-06B2Z8R0CY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    const user = auth.currentUser;
    console.log(user);

    if (user) {
      const navigate = useNavigate();
      console.log("User is already signed in:", user);
      navigate("/dashboard");
    } else {
      signInWithPopup(auth, provider);
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error setting persistence:", errorMessage);
  });

const browserHistory = createBrowserRouter();
firebase.auth().onAuthStateChanged((user) => {
  browserHistory.replace(user ? "/dashboard" : "/");
});
