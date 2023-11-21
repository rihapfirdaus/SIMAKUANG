// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSKD8uONBppz3PUmCRuOK5rLX9whFizJQ",
  authDomain: "saldosiaga.firebaseapp.com",
  projectId: "saldosiaga",
  storageBucket: "saldosiaga.appspot.com",
  messagingSenderId: "639752454929",
  appId: "1:639752454929:web:94e8be7b3f51aa56e102b0",
  measurementId: "G-FHKH9NKLFV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentification and get a reference to the service
export const auth = getAuth(app);
