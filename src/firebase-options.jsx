// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDb-lqIzZafIJCSMTKI_zoSqiUl4sHJ3Zo",
  authDomain: "mental-health-32799.firebaseapp.com",
  projectId: "mental-health-32799",
  storageBucket: "mental-health-32799.appspot.com",
  messagingSenderId: "679049696270",
  appId: "1:679049696270:web:4fc2ef3f3e41e4c42e985f",
  databaseURL: "https://mental-health-32799-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export { app };