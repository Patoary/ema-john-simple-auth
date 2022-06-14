// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3uc_C0_L4ZhPi0SaomH2rRlUlnN4UxPc",
  authDomain: "ema-john-simple-bad22.firebaseapp.com",
  projectId: "ema-john-simple-bad22",
  storageBucket: "ema-john-simple-bad22.appspot.com",
  messagingSenderId: "654572798195",
  appId: "1:654572798195:web:2a897568ddbcaec078b786"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

export default auth;