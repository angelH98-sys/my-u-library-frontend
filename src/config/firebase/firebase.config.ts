import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAI4WlseXdd9gzaXUsb4Oh1fusDNuvzfY0",
  authDomain: "my-u-library.firebaseapp.com",
  projectId: "my-u-library",
  storageBucket: "my-u-library.appspot.com",
  messagingSenderId: "708664433662",
  appId: "1:708664433662:web:ba56297b2a6cfbc25bfeaf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(app);