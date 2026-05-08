import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUHb2zjRRWdtOqiDOSt2oD6kCaexi9BkM",
  authDomain: "burger-blaze.firebaseapp.com",
  projectId: "burger-blaze",
  storageBucket: "burger-blaze.firebasestorage.app",
  messagingSenderId: "859102018275",
  appId: "1:859102018275:web:54a704cc5a2651441663d6",
  measurementId: "G-3TRZS6QX5Y"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

