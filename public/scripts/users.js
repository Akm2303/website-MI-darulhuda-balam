// =============================
// FUNGSI MANAJEMEN USER
// =============================

function loadUsers() {
    db.ref('users').once('value')
        .then(snapshot => {
            const users = snapshot.val() || {};
            const usersList = document.getElementById('usersList');
            
            if (Object.keys(users).length === 0) {
                usersList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Belum ada pengguna terdaftar</p>';
                return;
            }
            
            let html = '';
            const userArray = Object.values(users);
            
            userArray.forEach(user => {
                const roleClass = user.role === 'admin' ? 'admin' : '';
                const lastLogin = user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('id-ID') : 'Belum login';
                
                html += `
                    <div class="user-item">
                        <div class="user-info">
                            <h4>${user.displayName || 'Tidak ada nama'}</h4>
                            <p>${user.email} • Terdaftar: ${new Date(user.createdAt).toLocaleDateString('id-ID')}</p>
                        </div>
                        <div class="user-role ${roleClass}">${user.role}</div>
                    </div>
                `;
            });
            
            usersList.innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading users:', error);
            showAlert('Error memuat data pengguna', 'error');
        });
}