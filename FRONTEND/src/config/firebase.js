import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhdklkeSBBU6zQBHpbwZLCEqeOHz5QICY",
  authDomain: "job-portal-34f82.firebaseapp.com",
  projectId: "job-portal-34f82",
  storageBucket: "job-portal-34f82.firebasestorage.app",
  messagingSenderId: "869116184134",
  appId: "1:869116184134:web:9bf6ff5fc414bb7f252c47"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);