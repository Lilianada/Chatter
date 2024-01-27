// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const appId = process.env.REACT_APP_FIREBASE_APP_ID;
const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const authDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const messagingSenderId = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const measurementId = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID;
const storageBucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const databaseURL = process.env.REACT_APP_FIREBASE_DATABASE_URL;

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    databaseURL: databaseURL,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId:messagingSenderId,
    appId: appId,
    measurementId: measurementId
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 
export const storage = getStorage(app);
export const firebase = app;