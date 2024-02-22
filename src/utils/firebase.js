// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAqT-W_1xxl-zyyHg-_07Z8LESnulbmTs",
  authDomain: "chat-app-5916f.firebaseapp.com",
  projectId: "chat-app-5916f",
  storageBucket: "chat-app-5916f.appspot.com",
  messagingSenderId: "253901479482",
  appId: "1:253901479482:web:3aec5476c90f2ba4cd5f03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore();
export const storage = getStorage(app);

export default app;

export const getFirebaseErrorMessage = (error) => {
  switch (error.code) {
    case 'auth/invalid-login-credentials':
      return 'Invalid password';
    case 'auth/email-already-in-use':
      return 'Email address is already in use.';
    case 'auth/network-request-failed':
      return 'There is error on your network. please check your internet';
    default:
      return error.message;
  }
}
