// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyzov7YZ3C7hvJrXivIil3ZAZ_PLFFzus",
  authDomain: "blog-app-c1921.firebaseapp.com",
  projectId: "blog-app-c1921",
  storageBucket: "blog-app-c1921.appspot.com",
  messagingSenderId: "125877551100",
  appId: "1:125877551100:web:36141d36d1b67cdca1bc79",
  measurementId: "G-K3ML1Q0Y42",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

export default db;
