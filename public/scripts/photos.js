// =============================
// FUNGSI FOTO KEGIATAN
// =============================

function uploadPhoto() {
    const title = document.getElementById('photoTitle').value;
    const description = document.getElementById('photoDescription').value;
    const category = document.getElementById('photoCategory').value;
    const date = document.getElementById('photoDate').value;
    const file = document.getElementById('photoFile').files[0];
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');

    if (!title || !file) {
        showAlert('Harap isi judul dan pilih foto!', 'error');
        return;
    }

    // Show progress bar
    progressBar.style.display = 'block';
    progress.style.width = '0%';

    // Upload file to Firebase Storage
    const storageRef = storage.ref('kegiatan/' + Date.now() + '-' + file.name);
    const uploadTask = storageRef.put(file);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Update progress bar
            const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progress.style.width = progressPercent + '%';
        },
        (error) => {
            // Error handling
            progressBar.style.display = 'none';
            showAlert(`Upload gagal: ${error.message}`, 'error');
        },
        () => {
            // Upload success, get URL
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                // Save photo data to database
                const photoId = 'photo_' + Date.now();
                db.ref('photos/' + photoId).set({
                    id: photoId,
                    title: title,
                    description: description,
                    category: category,
                    date: date || new Date().toISOString().split('T')[0],
                    imageUrl: url,
                    uploadedBy: currentUser.uid,
                    uploadedByName: currentUser.displayName || currentUser.email,
                    uploadTimestamp: new Date().toISOString()
                });

                // Reset form and progress bar
                document.getElementById('photoTitle').value = '';
                document.getElementById('photoDescription').value = '';
                document.getElementById('photoDate').value = '';
                document.getElementById('photoFile').value = '';
                progressBar.style.display = 'none';
                
                showAlert('Foto berhasil diupload!', 'success');
                loadDashboardStats();
                loadPhotos();
            });
        }
    );
}

function loadPhotos() {
    db.ref('photos').orderByChild('uploadTimestamp').once('value')
        .then(snapshot => {
            const photos = snapshot.val() || {};
            const photosList = document.getElementById('photosList');
            
            if (Object.keys(photos).length === 0) {
                photosList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Belum ada foto kegiatan</p>';
                return;
            }
            
            let html = '';
            const photoArray = Object.values(photos).reverse();
            
            photoArray.forEach(photo => {
                const date = new Date(photo.uploadTimestamp).toLocaleDateString('id-ID');
                
                html += `
                    <div class="photo-card">
                        <img src="${photo.imageUrl}" alt="${photo.title}" onerror="this.src='https://via.placeholder.com/300x200?text=Gagal+Memuat+Gambar'">
                        <div class="photo-info">
                            <h4>${photo.title}</h4>
                            <p>${photo.description || 'Tidak ada deskripsi'}</p>
                            <div class="photo-meta">
                                <span>${date}</span>
                                <span>${photo.category}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            photosList.innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading photos:', error);
            showAlert('Error memuat data foto', 'error');
        });
}