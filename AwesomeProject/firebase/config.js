import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBS6GVR6EPT5s8pgFTZbnyJqvoAluqSTsA",
  authDomain: "react-native-v2-aebb3.firebaseapp.com",
  projectId: "react-native-v2-aebb3",
  storageBucket: "react-native-v2-aebb3.appspot.com",
  messagingSenderId: "791242164299",
  appId: "1:791242164299:web:685fd6d7833711db5ee5ce",
  measurementId: "G-PVDCGSPD9K"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);