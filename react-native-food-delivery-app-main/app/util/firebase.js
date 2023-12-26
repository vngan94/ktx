import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBVO3qOKnI34smHTaQkc03iLYqJKAP5kDw",
  authDomain: "kktx-435c1.firebaseapp.com",
  databaseURL: "https://kktx-435c1-default-rtdb.firebaseio.com",
  projectId: "kktx-435c1",
  storageBucket: "kktx-435c1.appspot.com",
  messagingSenderId: "494498841756",
  appId: "1:494498841756:web:7b8a9d3df6842e54c21959",
  measurementId: "G-KW2JG4VWW2",
};

// export const firebase = initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);

// export const storage = getStorage(app);
export const authentication = getAuth(initializeApp(firebaseConfig));
export default firebase.initializeApp(firebaseConfig);
firebase.initializeApp({
  // Provide the app config
});

const auth = firebase.auth();
