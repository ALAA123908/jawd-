// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdnATHW-qWjRbuN9X-MFbhnKURSJ90RsU",
  authDomain: "store-fa352.firebaseapp.com",
  projectId: "store-fa352",
  storageBucket: "store-fa352.appspot.com",
  messagingSenderId: "2593187684",
  appId: "1:2593187684:web:34b1630f042027034dfc71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
export const db = getFirestore(app);