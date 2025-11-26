// =============================
// FUNGSI AUTHENTICATION
// =============================

function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showAlert('Harap isi email dan password!', 'error', 'loginAlert');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            currentUser = userCredential.user;
            showDashboard();
            showAlert('Login berhasil!', 'success');
        })
        .catch((error) => {
            console.error('Login error:', error);
            showAlert(`Error: ${error.message}`, 'error', 'loginAlert');
        });
}

function register() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const role = document.getElementById('regRole').value;

    if (!name || !email || !password) {
        showAlert('Harap isi semua field!', 'error', 'registerAlert');
        return;
    }

    if (password.length < 6) {
        showAlert('Password harus minimal 6 karakter!', 'error', 'registerAlert');
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            // Create user record in database
            return db.ref('users/' + user.uid).set({
                uid: user.uid,
                email: email,
                displayName: name,
                role: role,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            });
        })
        .then(() => {
            showAlert('Pendaftaran berhasil! Silakan login.', 'success', 'registerAlert');
            showLogin();
            // Clear form
            document.getElementById('regName').value = '';
            document.getElementById('regEmail').value = '';
            document.getElementById('regPassword').value = '';
        })
        .catch((error) => {
            console.error('Registration error:', error);
            showAlert(`Error: ${error.message}`, 'error', 'registerAlert');
        });
}

function logout() {
    auth.signOut()
        .then(() => {
            currentUser = null;
            showLogin();
            showAlert('Logout berhasil!', 'success');
        })
        .catch((error) => {
            console.error('Logout error:', error);
            showAlert(`Error: ${error.message}`, 'error');
        });
}

// Auth State Listener
auth.onAuthStateChanged((user) => {
    if (user) {
        currentUser = user;
        showDashboard();
    } else {
        currentUser = null;
        showLogin();
    }
});