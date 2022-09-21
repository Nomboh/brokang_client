// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "brokang-49e46.firebaseapp.com",
  projectId: "brokang-49e46",
  storageBucket: "brokang-49e46.appspot.com",
  messagingSenderId: "273927144395",
  appId: "1:273927144395:web:156b24ca03a5578b7aac4e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
