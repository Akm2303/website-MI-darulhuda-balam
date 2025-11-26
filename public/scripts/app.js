// =============================
// FUNGSI UTILITAS & INITIALIZATION
// =============================

function showAlert(message, type = 'success', elementId = 'mainAlert') {
    const alert = document.getElementById(elementId);
    alert.textContent = message;
    alert.className = `alert alert-${type}`;
    alert.style.display = 'block';
    
    setTimeout(() => {
        alert.style.display = 'none';
    }, 5000);
}

function switchTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabId).classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    // Load data if needed
    if (tabId === 'photosTab') {
        loadPhotos();
    } else if (tabId === 'usersTab') {
        loadUsers();
    }
}

function showLogin() {
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('registerPage').classList.add('hidden');
}

function showRegister() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('registerPage').classList.remove('hidden');
}

// Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Set default date to today
    document.getElementById('photoDate').value = new Date().toISOString().split('T')[0];
    
    // Check if user is already logged in
    auth.onAuthStateChanged((user) => {
        if (user) {
            currentUser = user;
            showDashboard();
        } else {
            showLogin();
        }
    });
});