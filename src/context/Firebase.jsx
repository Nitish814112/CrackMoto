// src/context/Firebase.js

import React, { createContext, useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDuic9OtvHGwQ4kfWM2NGQRjrUMGThaxGI",
  authDomain: "login-system-257d2.firebaseapp.com",
  projectId: "login-system-257d2",
  storageBucket: "login-system-257d2.appspot.com",
  messagingSenderId: "80112107552",
  appId: "1:80112107552:web:a0a3cf3488bfd759eb7c45"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signinWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signupWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  };

  return (
    <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, signinWithEmailAndPassword, signupWithGoogle, getAuth: () => firebaseAuth }}>
      {children}
    </FirebaseContext.Provider>
  );
};
