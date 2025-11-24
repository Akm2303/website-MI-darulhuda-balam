// Fungsi untuk memuat data website dari Firebase
function loadWebsiteData() {
    setLoading(true);
    
    return db.collection('website').doc('content').get()
        .then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                
                // Hero section
                if (data.hero) {
                    document.getElementById('heroTitle').textContent = data.hero.title || 'Selamat Datang di MI Darul Huda Bandar Lampung';
                    document.getElementById('heroDescription').textContent = data.hero.description || 'Mendidik generasi muslim yang berakhlak mulia, cerdas, kreatif, dan mandiri dalam lingkungan islami yang menyenangkan.';
                }
                
                // About section
                if (data.about) {
                    document.getElementById('aboutTitle').textContent = data.about.title || 'Visi & Misi Sekolah';
                    document.getElementById('aboutContent').innerHTML = data.about.content || `
                        <p><strong>Visi:</strong> Menjadi sekolah dasar islam unggulan yang mencetak generasi Qur'ani, berprestasi, dan berakhlak mulia.</p>
                        <p><strong>Misi:</strong></p>
                        <ul>
                            <li>Menyelenggarakan pendidikan yang mengintegrasikan iman, ilmu, dan amal</li>
                            <li>Mengembangkan potensi peserta didik secara optimal melalui pembelajaran yang aktif, kreatif, dan menyenangkan</li>
                            <li>Menumbuhkan karakter islami melalui pembiasaan nilai-nilai agama dalam kehidupan sehari-hari</li>
                            <li>Membangun kerjasama yang harmonis antara sekolah, orang tua, dan masyarakat</li>
                        </ul>
                        <p>SD Islam Terpadu Al-Falah didirikan pada tahun 2005 dengan komitmen untuk memberikan pendidikan terbaik yang memadukan kurikulum nasional dengan nilai-nilai Islam.</p>
                    `;
                }
                
                // Footer
                if (data.footer) {
                    document.getElementById('footerDescription').textContent = data.footer.description || 'Mendidik generasi muslim yang berakhlak mulia, cerdas, kreatif, dan mandiri dalam lingkungan islami yang menyenangkan.';
                }
            }
            setLoading(false);
            return doc;
        })
        .catch((error) => {
            setLoading(false);
            console.error('Error loading website data:', error);
            throw error;
        });
}

// Fungsi untuk memuat program dari Firebase
function loadPrograms() {
    return db.collection('programs').orderBy('order', 'asc').get()
        .then((querySnapshot) => {
            const container = document.getElementById('programsContainer');
            const footerContainer = document.getElementById('footerPrograms');
            
            container.innerHTML = '';
            footerContainer.innerHTML = '';
            
            if (querySnapshot.empty) {
                // Data default jika tidak ada program di Firebase
                const defaultPrograms = [
                    {
                        title: 'Program Tahfiz Al-Qur\'an',
                        description: 'Program menghafal Al-Qur\'an dengan metode yang menyenangkan sesuai usia anak. Target hafalan 3 juz selama masa sekolah.',
                        image: 'https://source.unsplash.com/random/600x400/?quran'
                    },
                    {
                        title: 'Program Sains & Teknologi',
                        description: 'Pengenalan sains dan teknologi melalui eksperimen sederhana, robotika dasar, dan coding untuk anak.',
                        image: 'https://source.unsplash.com/random/600x400/?science'
                    },
                    {
                        title: 'Program Seni & Kreativitas',
                        description: 'Mengembangkan bakat seni dan kreativitas siswa melalui kegiatan melukis, musik islami, dan drama.',
                        image: 'https://source.unsplash.com/random/600x400/?art'
                    }
                ];
                
                defaultPrograms.forEach(program => {
                    container.innerHTML += createProgramCard(program);
                    footerContainer.innerHTML += `<li><a href="#program">${program.title}</a></li>`;
                });
            } else {
                querySnapshot.forEach((doc) => {
                    const program = doc.data();
                    container.innerHTML += createProgramCard(program);
                    footerContainer.innerHTML += `<li><a href="#program">${program.title}</a></li>`;
                });
            }
            return querySnapshot;
        })
        .catch((error) => {
            console.error('Error loading programs:', error);
            throw error;
        });
}

// Fungsi untuk membuat kartu program
function createProgramCard(program) {
    return `
        <div class="program-card">
            <div class="program-img">
                <img src="${program.image || 'https://source.unsplash.com/random/600x400/?education'}" alt="${program.title}">
            </div>
            <div class="program-info">
                <h3>${program.title}</h3>
                <p>${program.description}</p>
            </div>
        </div>
    `;
}

// Fungsi untuk memuat fasilitas dari Firebase
function loadFacilities() {
    return db.collection('facilities').orderBy('order', 'asc').get()
        .then((querySnapshot) => {
            const container = document.getElementById('facilitiesContainer');
            container.innerHTML = '';
            
            if (querySnapshot.empty) {
                // Data default jika tidak ada fasilitas di Firebase
                const defaultFacilities = [
                    { name: 'Perpustakaan', description: 'Koleksi buku yang lengkap dengan ruang baca yang nyaman untuk siswa.', icon: 'book' },
                    { name: 'Laboratorium Sains', description: 'Peralatan sains yang aman untuk eksperimen dan pembelajaran praktis.', icon: 'flask' },
                    { name: 'Lab Komputer', description: 'Komputer dengan spesifikasi terbaru untuk pembelajaran teknologi.', icon: 'laptop' },
                    { name: 'Musholla', description: 'Tempat ibadah yang nyaman dan representatif untuk sholat berjamaah.', icon: 'mosque' }
                ];
                
                defaultFacilities.forEach(facility => {
                    container.innerHTML += createFacilityCard(facility);
                });
            } else {
                querySnapshot.forEach((doc) => {
                    const facility = doc.data();
                    container.innerHTML += createFacilityCard(facility);
                });
            }
            return querySnapshot;
        })
        .catch((error) => {
            console.error('Error loading facilities:', error);
            throw error;
        });
}

// Fungsi untuk membuat kartu fasilitas
function createFacilityCard(facility) {
    return `
        <div class="facility-card">
            <div class="facility-icon">
                <i class="fas fa-${facility.icon}"></i>
            </div>
            <h3>${facility.name}</h3>
            <p>${facility.description}</p>
        </div>
    `;
}

// Fungsi untuk memuat prestasi dari Firebase
function loadAchievements() {
    return db.collection('achievements').orderBy('date', 'desc').limit(10).get()
        .then((querySnapshot) => {
            const container = document.getElementById('achievementsContainer');
            container.innerHTML = '';
            
            if (querySnapshot.empty) {
                // Data default jika tidak ada prestasi di Firebase
                const defaultAchievements = [
                    { title: 'Juara 1 Olimpiade Matematika', description: 'Tim matematika SD Islam Al-Falah meraih juara 1 dalam Olimpiade Matematika Tingkat Kota 2023.' },
                    { title: 'Juara 2 MTQ Nasional', description: 'Siswa kami meraih juara 2 Musabaqah Tilawatil Qur\'an Tingkat Nasional 2023.' },
                    { title: 'Juara 3 Lomba Robotik', description: 'Tim robotik SD Islam Al-Falah meraih juara 3 dalam Kompetisi Robotik Sekolah Dasar 2023.' },
                    { title: 'Juara 1 Pidato Bahasa Inggris', description: 'Siswi kami meraih juara 1 dalam lomba pidato bahasa Inggris tingkat provinsi 2023.' }
                ];
                
                defaultAchievements.forEach(achievement => {
                    container.innerHTML += createAchievementItem(achievement);
                });
            } else {
                querySnapshot.forEach((doc) => {
                    const achievement = doc.data();
                    container.innerHTML += createAchievementItem(achievement);
                });
            }
            return querySnapshot;
        })
        .catch((error) => {
            console.error('Error loading achievements:', error);
            throw error;
        });
}

// Fungsi untuk membuat item prestasi
function createAchievementItem(achievement) {
    return `
        <div class="achievement-item">
            <h3>${achievement.title}</h3>
            <p>${achievement.description}</p>
        </div>
    `;
}

// Fungsi untuk memuat informasi kontak dari Firebase
function loadContactInfo() {
    return db.collection('website').doc('contact').get()
        .then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                const container = document.getElementById('contactInfo');
                const footerContainer = document.getElementById('footerContact');
                
                container.innerHTML = '';
                footerContainer.innerHTML = '';
                
                if (data.address) {
                    container.innerHTML += `<p><i class="fas fa-map-marker-alt"></i> ${data.address}</p>`;
                    footerContainer.innerHTML += `<li><i class="fas fa-map-marker-alt"></i> ${data.address}</li>`;
                }
                
                if (data.phone) {
                    container.innerHTML += `<p><i class="fas fa-phone"></i> ${data.phone}</p>`;
                    footerContainer.innerHTML += `<li><i class="fas fa-phone"></i> ${data.phone}</li>`;
                }
                
                if (data.email) {
                    container.innerHTML += `<p><i class="fas fa-envelope"></i> ${data.email}</p>`;
                    footerContainer.innerHTML += `<li><i class="fas fa-envelope"></i> ${data.email}</li>`;
                }
                
                if (data.hours) {
                    container.innerHTML += `<p><i class="fas fa-clock"></i> ${data.hours}</p>`;
                }
                
                // Social media links
                if (data.facebook) {
                    document.getElementById('facebookLink').href = data.facebook;
                }
                
                if (data.instagram) {
                    document.getElementById('instagramLink').href = data.instagram;
                }
                
                if (data.youtube) {
                    document.getElementById('youtubeLink').href = data.youtube;
                }
                
                if (data.whatsapp) {
                    document.getElementById('whatsappLink').href = `https://wa.me/${data.whatsapp}`;
                }
            }
            return doc;
        })
        .catch((error) => {
            console.error('Error loading contact info:', error);
            throw error;
        });
}

// Fungsi untuk mengirim form kontak
function submitContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    setLoading(true);
    
    return db.collection('messages').add({
        name: name,
        email: email,
        subject: subject,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        read: false
    })
    .then(() => {
        setLoading(false);
        showNotification('Pesan berhasil dikirim!', 'success');
        document.getElementById('contactForm').reset();
    })
    .catch((error) => {
        setLoading(false);
        showNotification('Gagal mengirim pesan: ' + error.message, 'error');
        throw error;
    });
}

// Fungsi untuk memuat pesan masuk
function loadMessages() {
    if (!currentUser) return;
    
    setLoading(true);
    
    return db.collection('messages')
        .orderBy('timestamp', 'desc')
        .get()
        .then((querySnapshot) => {
            const container = document.getElementById('messagesList');
            container.innerHTML = '';
            
            if (querySnapshot.empty) {
                container.innerHTML = '<p>Tidak ada pesan masuk.</p>';
            } else {
                querySnapshot.forEach((doc) => {
                    const message = doc.data();
                    const date = message.timestamp ? message.timestamp.toDate().toLocaleDateString('id-ID') : 'Tanggal tidak tersedia';
                    
                    container.innerHTML += `
                        <div class="message-item" style="border-bottom: 1px solid #eee; padding: 15px 0;">
                            <h4>${message.subject}</h4>
                            <p><strong>Dari:</strong> ${message.name} (${message.email})</p>
                            <p><strong>Tanggal:</strong> ${date}</p>
                            <p>${message.message}</p>
                        </div>
                    `;
                });
            }
            
            setLoading(false);
            return querySnapshot;
        })
        .catch((error) => {
            setLoading(false);
            showNotification('Gagal memuat pesan: ' + error.message, 'error');
            throw error;
        });
}

// Fungsi untuk memperbarui konten hero
function updateHeroContent() {
    const title = document.getElementById('heroTitleInput').value;
    const description = document.getElementById('heroDescriptionInput').value;
    
    setLoading(true);
    
    return db.collection('website').doc('content').set({
        hero: {
            title: title,
            description: description
        }
    }, { merge: true })
    .then(() => {
        setLoading(false);
        showNotification('Konten hero berhasil diperbarui!', 'success');
        document.getElementById('heroTitle').textContent = title;
        document.getElementById('heroDescription').textContent = description;
        document.getElementById('contentModal').classList.remove('show');
    })
    .catch((error) => {
        setLoading(false);
        showNotification('Gagal memperbarui konten: ' + error.message, 'error');
        throw error;
    });
}

// Fungsi untuk memperbarui konten tentang kami
function updateAboutContent() {
    const title = document.getElementById('aboutTitleInput').value;
    const content = document.getElementById('aboutContentInput').value;
    
    setLoading(true);
    
    return db.collection('website').doc('content').set({
        about: {
            title: title,
            content: content
        }
    }, { merge: true })
    .then(() => {
        setLoading(false);
        showNotification('Konten tentang kami berhasil diperbarui!', 'success');
        document.getElementById('aboutTitle').textContent = title;
        document.getElementById('aboutContent').innerHTML = content;
        document.getElementById('contentModal').classList.remove('show');
    })
    .catch((error) => {
        setLoading(false);
        showNotification('Gagal memperbarui konten: ' + error.message, 'error');
        throw error;
    });
}

// Export functions untuk digunakan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        loadWebsiteData, 
        loadPrograms, 
        loadFacilities, 
        loadAchievements, 
        loadContactInfo, 
        submitContactForm, 
        loadMessages,
        updateHeroContent,
        updateAboutContent
    };
}