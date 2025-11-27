        // Konfigurasi Firebase (ganti dengan konfigurasi project Anda)
        const firebaseConfig = {
            apiKey: "AIzaSyDummyApiKey1234567890",
            authDomain: "sekolah-cerdas.firebaseapp.com",
            projectId: "sekolah-cerdas",
            storageBucket: "sekolah-cerdas.appspot.com",
            messagingSenderId: "123456789012",
            appId: "1:123456789012:web:abcdef123456"
        };
        
        // Inisialisasi Firebase
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();