
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernblog-9503e.firebaseapp.com",
  projectId: "mernblog-9503e",
  storageBucket: "mernblog-9503e.appspot.com",
  messagingSenderId: "988010339646",
  appId: "1:988010339646:web:bb08a9885177afcce3a06f"
};

 export const app = initializeApp(firebaseConfig);