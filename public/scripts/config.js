// Konfigurasi Firebase
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyApNKH811nkaAiGnP4TjOlR57VPr_Keghg",
    authDomain: "darulhuda-balam.firebaseapp.com",
    projectId: "darulhuda-balam",
    storageBucket: "darulhuda-balam.firebasestorage.app",
    messagingSenderId: "200089179332",
    appId: "1:200089179332:web:c3a904f43ebe79a1b8e591",
    measurementId: "G-4P4770WH6T"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);