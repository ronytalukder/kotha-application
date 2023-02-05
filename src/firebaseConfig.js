// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACPUs3O2Kr-ZxqPp_3EVEMICbPsYBcO1g",
  authDomain: "kotha-chatting-app.firebaseapp.com",
  projectId: "kotha-chatting-app",
  storageBucket: "kotha-chatting-app.appspot.com",
  messagingSenderId: "794421521425",
  appId: "1:794421521425:web:dad52a33c3e54277fbd5b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;