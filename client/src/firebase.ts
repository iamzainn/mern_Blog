// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernblog-9503e.firebaseapp.com",
  projectId: "mernblog-9503e",
  storageBucket: "mernblog-9503e.appspot.com",
  messagingSenderId: "988010339646",
  appId: "1:988010339646:web:bb08a9885177afcce3a06f"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);