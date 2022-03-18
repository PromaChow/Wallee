// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDepgLgWH6y7aQAEeEe7m5w2CkhIAqBLK4",
  authDomain: "firstapp-1852e.firebaseapp.com",
  databaseURL: "https://firstapp-1852e-default-rtdb.firebaseio.com",
  projectId: "firstapp-1852e",
  storageBucket: "firstapp-1852e.appspot.com",
  messagingSenderId: "1061687218566",
  appId: "1:1061687218566:web:1f0341a377783227315c07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.languageCode = 'en';
