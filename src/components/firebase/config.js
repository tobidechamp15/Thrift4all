// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtua7K6yEVsL1GbGEWJmD7a2B4x8lJvCc",
  authDomain: "thrift4all-9536.firebaseapp.com",
  projectId: "thrift4all-9536",
  storageBucket: "thrift4all-9536.appspot.com",
  messagingSenderId: "310042098720",
  appId: "1:310042098720:web:41b7b2d30baea554bcd045",
  measurementId: "G-ST7YT1BL0Q",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const userId = localStorage.getItem("userId");

export { analytics };
export { db };
export { userId };
