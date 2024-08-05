import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcqbwAtsDHuWGCqWq-Hl9kAUKddeLabfw",
  authDomain: "barzan-portfolio-884dd.firebaseapp.com",
  projectId: "barzan-portfolio-884dd",
  storageBucket: "barzan-portfolio-884dd.appspot.com",
  messagingSenderId: "910463706319",
  appId: "1:910463706319:web:620b8672d5554b066ac3ba",
  measurementId: "G-9VM993XNGS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage }