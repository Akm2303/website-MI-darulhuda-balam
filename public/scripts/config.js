// Konfigurasi Firebase
const firebaseConfig = {
    // GANTI DENGAN KONFIGURASI FIREBASE ANDA
    apiKey: "AIzaSyCFlm5SqLoSpUQL0Eo9Htj_aDuBLumplT8",
    authDomain: "darul-huda-web-ae9fa.firebaseapp.com",
    projectId: "darul-huda-web-ae9fa",
    storageBucket: "darul-huda-web-ae9fa.firebasestorage.app",
    messagingSenderId: "343029892756",
    appId: "1:343029892756:web:1f165c145c485b5716d681",
    measurementId: "G-R7ZKC98FLF"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Inisialisasi services
const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();