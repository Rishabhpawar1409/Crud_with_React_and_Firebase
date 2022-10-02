import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0N6X-sDGDnZjF6Rd-10C7nLC4kOrcRgo",
  authDomain: "todo-5d67e.firebaseapp.com",
  projectId: "todo-5d67e",
  storageBucket: "todo-5d67e.appspot.com",
  messagingSenderId: "116577648512",
  appId: "1:116577648512:web:7fffe665b13093416f0b65",
  measurementId: "G-Q2RX3K8ZJ4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
