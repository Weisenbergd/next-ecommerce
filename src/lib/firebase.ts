// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAJtoEu1qo6jhB-Lqwhx_VKvrOhMHiuJLk",

  authDomain: "image-bucket-e236e.firebaseapp.com",

  projectId: "image-bucket-e236e",

  storageBucket: "image-bucket-e236e.appspot.com",

  messagingSenderId: "854511976697",

  appId: "1:854511976697:web:4202b940bd378ad017e228",

  measurementId: "G-1NPL0LN1J4",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
