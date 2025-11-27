 // Firebase initialization
        const firebaseConfig = {
            apiKey: "AIzaSyApNKH811nkaAiGnP4TjOlR57VPr_Keghg",
            authDomain: "darulhuda-balam.firebaseapp.com",
            projectId: "darulhuda-balam",
            databaseURL: "https://darulhuda-balam-default-rtdb.asia-southeast1.firebasedatabase.app",
            storageBucket: "darulhuda-balam.firebasestorage.app",
            messagingSenderId: "1:200089179332:web:c3a904f43ebe79a1b8e591",
            appId: "G-4P4770WH6T"
        };

        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        const db = firebase.firestore();