import firebase from "firebase/compat/app";
import "firebase/compat/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB3K1zj4bfG0Gqb7MMPQiYNAvAaY3Ne4DI",
  authDomain: "react-native-hw-acd91.firebaseapp.com",
  projectId: "react-native-hw-acd91",
  storageBucket: "react-native-hw-acd91.appspot.com",
  messagingSenderId: "511381213194",
  appId: "1:511381213194:web:057ace9675cb072bf98ff3",
  measurementId: "G-S3YQF2NGKH"
};

export default firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();





// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";


// const firebaseConfig = {
//   apiKey: "AIzaSyB3K1zj4bfG0Gqb7MMPQiYNAvAaY3Ne4DI",
//   authDomain: "react-native-hw-acd91.firebaseapp.com",
//   projectId: "react-native-hw-acd91",
//   storageBucket: "react-native-hw-acd91.appspot.com",
//   messagingSenderId: "511381213194",
//   appId: "1:511381213194:web:057ace9675cb072bf98ff3",
//   measurementId: "G-S3YQF2NGKH"
// };


// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);

// export const db = getFirestore(app);
// export const storage = getStorage(app);