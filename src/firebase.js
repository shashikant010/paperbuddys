// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCC0LnM3UTmNS2R-p-jIq8f0PvEK-lOcSg",
  authDomain: "paperbuddy-bbd4f.firebaseapp.com",
  databaseURL: "https://paperbuddy-bbd4f-default-rtdb.firebaseio.com",
  projectId: "paperbuddy-bbd4f",
  storageBucket: "paperbuddy-bbd4f.firebasestorage.app",
  messagingSenderId: "367551683620",
  appId: "1:367551683620:web:4af1b5270c7de6f6324cb1",
  measurementId: "G-03BH83T0RC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Export Auth and Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);