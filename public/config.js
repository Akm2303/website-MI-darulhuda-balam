    // Konfigurasi Firebase (ganti dengan konfigurasi project Anda)
        const firebaseConfig = {
            apiKey: "AIzaSyApNKH811nkaAiGnP4TjOlR57VPr_Keghg",
            authDomain: "darulhuda-balam.firebaseapp.com",
            projectId: "darulhuda-balam",
            storageBucket: "darulhuda-balam.appspot.com",
            messagingSenderId: "200089179332",
            appId: "1:200089179332:web:c3a904f43ebe79a1b8e591",
            measurementId: "G-4P4770WH6T"
        };
        
        // Inisialisasi Firebase
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();