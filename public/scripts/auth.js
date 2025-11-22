// State
let currentUser = null;

// Fungsi untuk menampilkan notifikasi
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Fungsi untuk menampilkan/menyembunyikan loading
function setLoading(show) {
    const loading = document.getElementById('loading');
    if (show) {
        loading.classList.add('show');
    } else {
        loading.classList.remove('show');
    }
}

// Fungsi login
function login(email, password) {
    setLoading(true);
    
    return auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            setLoading(false);
            showNotification('Login berhasil!', 'success');
            return userCredential;
        })
        .catch((error) => {
            setLoading(false);
            showNotification('Login gagal: ' + error.message, 'error');
            throw error;
        });
}

// Fungsi logout
function logout() {
    return auth.signOut()
        .then(() => {
            showNotification('Logout berhasil!', 'success');
        })
        .catch((error) => {
            showNotification('Logout gagal: ' + error.message, 'error');
            throw error;
        });
}

// Cek status login saat aplikasi dimulai
auth.onAuthStateChanged(user => {
    const adminPanel = document.getElementById('adminPanel');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    
    if (user) {
        currentUser = user;
        adminPanel.classList.add('show');
        adminLoginBtn.textContent = 'Admin';
    } else {
        currentUser = null;
        adminPanel.classList.remove('show');
        adminLoginBtn.textContent = 'Admin';
    }
});

// Export functions untuk digunakan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { login, logout, currentUser, showNotification, setLoading };
}