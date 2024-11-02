// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyBLaW9nUhPHcbw7q7OTpC5N-tJAM6UM5ec",
  authDomain: "my-app-64820.firebaseapp.com",
  projectId: "my-app-64820",
  storageBucket: "my-app-64820.firebasestorage.app",
  messagingSenderId: "270222230383",
  appId: "1:270222230383:web:40bbd8ef412becf9c51e9a",
  measurementId: "G-3B3PCWXD1F"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
