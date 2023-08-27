 
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
 
import "firebase/firestore";
 
const firebaseConfig = {
  apiKey: "AIzaSyBqwOg_u4O1FUdlhZoB0UKkMc8xNm1dIs0",
  authDomain: "svelte-auth-24122.firebaseapp.com",
  projectId: "svelte-auth-24122",
  storageBucket: "svelte-auth-24122.appspot.com",
  messagingSenderId: "672092949160",
  appId: "1:672092949160:web:a5ecdf73ac8b29d939909d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
 