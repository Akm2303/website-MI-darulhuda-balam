// Konfigurasi Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
  import { getDatabase } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
  import { getStorage } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";

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

  // Services (sama seperti v8 tetapi modular)
  const analytics = getAnalytics(app);
  window.auth = getAuth(app);
  window.db = getDatabase(app);
  window.firestore = getFirestore(app);
  window.storage = getStorage(app);

  console.log("Firebase v12 connected successfully");