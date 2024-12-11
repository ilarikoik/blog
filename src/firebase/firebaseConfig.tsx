// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import config from "../config";
// https://firebase.google.com/docs/web/setup#available-libraries

//const firebaseConfig = {
//  apiKey: config.REACT_APP_FIREBASE_API_KEY,
//  authDomain: config.REACT_APP_FIREBASE_AUTH_DOMAIN,
//  projectId: config.REACT_APP_FIREBASE_PROJECT_ID,
//  storageBucket: config.REACT_APP_FIREBASE_STORAGE_BUCKET,
//  messagingSenderId: config.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//  appId: config.REACT_APP_FIREBASE_APP_ID,
//  measurementId: config.REACT_APP_FIREBASE_MEASUREMENT_ID,
//};
const firebaseConfig = {
  apiKey: "AIzaSyCuqP9Et5QwMBQ3EsAXWwbxBvY4Z-JHP_E",

  authDomain: "blog-428cc.firebaseapp.com",

  projectId: "blog-428cc",

  storageBucket: "blog-428cc.firebasestorage.app",

  messagingSenderId: "352552028837",

  appId: "1:352552028837:web:358b7ff0467f31a1511b4c",

  measurementId: "G-9X5WE4GDXF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
