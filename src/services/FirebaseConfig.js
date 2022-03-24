import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
 
const firebaseConfig = {
  apiKey: "AIzaSyD5s1rX1W1LubC-ndPLbBt8M--rklXhJz4",
  authDomain: "amethyst-c2a32.firebaseapp.com",
  projectId: "amethyst-c2a32",
  storageBucket: "amethyst-c2a32.appspot.com",
  messagingSenderId: "610670876417",
  appId: "1:610670876417:web:4710354dc6600570a96d00"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
