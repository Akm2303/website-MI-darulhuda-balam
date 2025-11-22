// Konfigurasi Firebase
const firebaseConfig = {
    // GANTI DENGAN KONFIGURASI FIREBASE ANDA
    apiKey: "AIzaSyEXAMPLEEXAMPLEEXAMPLEEXAMPLE",
    authDomain: "sd-islam-alfalah.firebaseapp.com",
    projectId: "sd-islam-alfalah",
    storageBucket: "sd-islam-alfalah.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Inisialisasi services
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();