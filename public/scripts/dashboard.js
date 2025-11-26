// =============================
// FUNGSI DASHBOARD
// =============================

function showDashboard() {
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('registerPage').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    
    // Load dashboard data
    loadDashboardStats();
    loadPhotos();
}

function loadDashboardStats() {
    // Load photos count
    db.ref('photos').once('value')
        .then(snapshot => {
            const photos = snapshot.val() || {};
            document.getElementById('totalPhotos').textContent = Object.keys(photos).length;
        });
    
    // Load users count
    db.ref('users').once('value')
        .then(snapshot => {
            const users = snapshot.val() || {};
            document.getElementById('totalUsers').textContent = Object.keys(users).length;
        });
    
    // Load activities count (by unique dates)
    db.ref('photos').once('value')
        .then(snapshot => {
            const photos = snapshot.val() || {};
            const dates = new Set();
            
            Object.values(photos).forEach(photo => {
                if (photo.date) {
                    dates.add(photo.date);
                }
            });
            
            document.getElementById('totalActivities').textContent = dates.size;
        });
}