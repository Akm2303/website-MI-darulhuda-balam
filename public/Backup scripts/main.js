// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', function() {
    // Set tahun saat ini
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Muat data dari Firebase
    loadWebsiteData();
    loadPrograms();
    loadFacilities();
    loadAchievements();
    loadContactInfo();

    // Event listeners
    setupEventListeners();
});

// Setup semua event listeners
function setupEventListeners() {
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const loginModal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const manageContentBtn = document.getElementById('manageContentBtn');
    const contentModal = document.getElementById('contentModal');
    const viewMessagesBtn = document.getElementById('viewMessagesBtn');
    const messagesModal = document.getElementById('messagesModal');
    const contactForm = document.getElementById('contactForm');

    // Admin login
    adminLoginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentUser) {
            // Jika sudah login, toggle admin panel
            document.getElementById('adminPanel').classList.toggle('show');
        } else {
            // Jika belum login, tampilkan modal login
            loginModal.classList.add('show');
        }
    });

    // Logout
    logoutBtn.addEventListener('click', logout);

    // Kelola konten
    manageContentBtn.addEventListener('click', () => contentModal.classList.add('show'));

    // Lihat pesan
    viewMessagesBtn.addEventListener('click', () => {
        loadMessages();
        messagesModal.classList.add('show');
    });

    // Form login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        login(email, password)
            .then(() => {
                loginModal.classList.remove('show');
            })
            .catch(error => {
                // Error sudah ditangani di auth.js
            });
    });

    // Form kontak
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitContactForm()
            .catch(error => {
                // Error sudah ditangani di firestore.js
            });
    });

    // Mobile menu
    document.querySelector('.mobile-menu').addEventListener('click', function() {
        document.querySelector('nav ul').classList.toggle('show');
    });

    // Tutup modal
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').classList.remove('show');
        });
    });

    // Klik di luar modal untuk menutup
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });

    // Smooth scroll untuk link navigasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Tutup menu mobile setelah mengklik link
                document.querySelector('nav ul').classList.remove('show');
            }
        });
    });

    // Event listener untuk perubahan section konten
    document.getElementById('contentSection').addEventListener('change', function() {
        loadContentForm(this.value);
    });
}

// Fungsi untuk memuat form konten berdasarkan section
function loadContentForm(section) {
    const formContainer = document.getElementById('contentForm');
    formContainer.innerHTML = '';
    
    switch(section) {
        case 'hero':
            formContainer.innerHTML = `
                <div class="form-group">
                    <label for="heroTitleInput">Judul Hero</label>
                    <input type="text" id="heroTitleInput" value="${document.getElementById('heroTitle').textContent}">
                </div>
                <div class="form-group">
                    <label for="heroDescriptionInput">Deskripsi Hero</label>
                    <textarea id="heroDescriptionInput">${document.getElementById('heroDescription').textContent}</textarea>
                </div>
                <button class="btn" onclick="updateHeroContent()">Simpan Perubahan</button>
            `;
            break;
            
        case 'about':
            formContainer.innerHTML = `
                <div class="form-group">
                    <label for="aboutTitleInput">Judul Tentang Kami</label>
                    <input type="text" id="aboutTitleInput" value="${document.getElementById('aboutTitle').textContent}">
                </div>
                <div class="form-group">
                    <label for="aboutContentInput">Konten Tentang Kami</label>
                    <textarea id="aboutContentInput" rows="10">${document.getElementById('aboutContent').innerHTML}</textarea>
                </div>
                <button class="btn" onclick="updateAboutContent()">Simpan Perubahan</button>
            `;
            break;
            
        // Tambahkan case untuk section lainnya sesuai kebutuhan
            
        default:
            formContainer.innerHTML = '<p>Fitur untuk section ini sedang dalam pengembangan.</p>';
    }
}