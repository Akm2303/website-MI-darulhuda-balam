// Data kredensial admin (dalam aplikasi nyata, ini akan disimpan di server)
const adminCredentials = [
    { email: "admin@midarulhuda.id", password: "admin123" },
    { email: "operator@midarulhuda.id", password: "operator123" }
];


// Fungsi untuk menampilkan pesan
function displayMessages() {
    const container = document.getElementById('messages-container');
    container.innerHTML = '';
    
    if (messages.length === 0) {
        container.innerHTML = '<p class="loading">Tidak ada pesan masuk.</p>';
        return;
    }
    
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = 'message-item';
        messageElement.innerHTML = `
            <div class="message-header">
                <span class="message-sender">${message.sender} (${message.email})</span>
                <span class="message-date">${message.date}</span>
            </div>
            <div class="message-content">${message.content}</div>
        `;
        container.appendChild(messageElement);
    });
}

// Fungsi untuk menampilkan status login
function showStatus(type, message) {
    const loginStatus = document.getElementById('loginStatus');
    loginStatus.textContent = message;
    loginStatus.className = `login-status ${type}`;
    loginStatus.style.display = 'block';
    
    // Sembunyikan status setelah 5 detik
    setTimeout(() => {
        loginStatus.style.display = 'none';
    }, 5000);
}

// Fungsi untuk menangani login admin
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validasi input
    if (!email || !password) {
        showStatus('error', 'Harap masukkan email dan password!');
        return;
    }
    
    // Cek kredensial
    const isValid = adminCredentials.some(cred => 
        cred.email === email && cred.password === password
    );
    
    if (isValid) {
        showStatus('success', 'Login berhasil! Mengarahkan ke panel admin...');
        
        // Simulasi loading sebelum menampilkan panel admin
        setTimeout(() => {
            document.getElementById('adminPanel').style.display = 'block';
            // Sembunyikan form login setelah berhasil login
            document.querySelector('form').style.display = 'none';
        }, 1500);
    } else {
        showStatus('error', 'Email atau password salah!');
    }
}

// Fungsi untuk menangani klik tombol admin
function handleAdminAction(feature) {
    const featureNames = {
        'beranda': 'Kelola Beranda',
        'program': 'Kelola Program',
        'galeri': 'Kelola Galeri',
        'staff': 'Kelola Staff',
        'pesan': 'Pesan Masuk',
        'pengaturan': 'Pengaturan'
    };
    
    alert(`Fitur "${featureNames[feature]}" akan segera dibuka!`);
    
    // Di sini Anda bisa menambahkan logika untuk masing-masing fitur
    switch(feature) {
        case 'pesan':
            // Fokus ke bagian pesan
            document.querySelector('.card:nth-child(2)').scrollIntoView({ 
                behavior: 'smooth' 
            });
            break;
        // Tambahkan case untuk fitur lainnya
    }
}

// Fungsi untuk inisialisasi event listeners
function initializeEventListeners() {
    // Event listener untuk form login
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Event listener untuk tombol admin
    document.querySelectorAll('.admin-action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const feature = this.getAttribute('data-feature');
            handleAdminAction(feature);
        });
    });
    
    // Event listener untuk tautan cepat
    document.querySelectorAll('.quick-link').forEach(link => {
        link.addEventListener('click', function() {
            alert(`Membuka: ${this.textContent}`);
        });
    });
}

// Fungsi untuk inisialisasi aplikasi
function initializeApp() {
    // Simulasi loading data pesan
    setTimeout(() => {
        displayMessages();
    }, 1500);
    
    // Inisialisasi event listeners
    initializeEventListeners();
    
    console.log('Admin Panel MI Darul Huda initialized');
}

// Inisialisasi aplikasi ketika DOM siap
document.addEventListener('DOMContentLoaded', initializeApp);