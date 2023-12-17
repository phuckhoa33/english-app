// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsTKSBheI9ui_yBi3AyZiQoPm4Exvgjyk",
  authDomain: "english-cbfde.firebaseapp.com",
  projectId: "english-cbfde",
  storageBucket: "english-cbfde.appspot.com",
  messagingSenderId: "78788126824",
  appId: "1:78788126824:web:f74cad6be88bb2afdb33dd",
  measurementId: "G-1J4BRC0T7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}