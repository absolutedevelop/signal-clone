import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import "firebase/auth"
import "firebase/firestore"

// import {*} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8WTdY9kXOMTh8iBXhxm9WFzy5pVbEedA",
  authDomain: "signal-clone-ft.firebaseapp.com",
  projectId: "signal-clone-ft",
  storageBucket: "signal-clone-ft.appspot.com",
  messagingSenderId: "1012451908066",
  appId: "1:1012451908066:web:fbf203fcfed48babd281bb",
  measurementId: "G-JT9YM2YCS6"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

console.log(db)


export {db}





