// firebase.js
// Konfigurasi Firebase untuk SD Islam

// TODO: Ganti konfigurasi berikut dengan project Firebase kamu
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "",
  appId: ""
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Export Firestore dan Storage\const db = firebase.firestore();
const storage = firebase.storage();

export { db, storage };