import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABUEpaifJhvGHvyrNrVUSHuLD_Sg0T9GA",
  authDomain: "blue-berry-d4c70.firebaseapp.com",
  projectId: "blue-berry-d4c70",
  storageBucket: "blue-berry-d4c70.firebasestorage.app",
  messagingSenderId: "1095187489844",
  appId: "1:1095187489844:web:2da83b8f62480d9d3f5661",
  measurementId: "G-D3JWVTVQ37"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)