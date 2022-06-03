
import { initializeApp } from "firebase/app";
import { getAuth }from"firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyABmzvAVECX15KPohXiqunRcH_P_09Qdf8",
  authDomain: "react-2022-42e9b.firebaseapp.com",
  projectId: "react-2022-42e9b",
  storageBucket: "react-2022-42e9b.appspot.com",
  messagingSenderId: "247141883389",
  appId: "1:247141883389:web:b92fd9e67f67705495cd94"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };