import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDuRUdDoeFGIfEbUDUR3bVwt8bBYYg0v0",
  authDomain: "yemektarifi-30f6b.firebaseapp.com",
  projectId: "yemektarifi-30f6b",
  storageBucket: "yemektarifi-30f6b.firebasestorage.app",
  messagingSenderId: "355156995329",
  appId: "1:355156995329:web:1310c6eb1fef2fc5083f00"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);





export {db}