import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "share-files-75e74.firebaseapp.com",
  projectId: "share-files-75e74",
  storageBucket: "share-files-75e74.appspot.com",
  messagingSenderId: "932014955662",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-H4CXBGE98S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
