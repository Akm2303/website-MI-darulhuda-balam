 // Data berita contoh
        const sampleNews = [
            {
                id: 1,
                title: "Penerimaan Siswa Baru Tahun Ajaran 2025/2026",
                category: "pengumuman",
                image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                excerpt: "Pendaftaran siswa baru untuk tahun ajaran 2025/2026 telah dibuka. Segera daftarkan putra-putri Anda...",
                content: "Pendaftaran siswa baru untuk tahun ajaran 2025/2026 telah dibuka. Segera daftarkan putra-putri Anda. Persyaratan dan informasi lengkap dapat dilihat di bagian pengumuman.",
                author: "Admin Sekolah",
                date: "15 Maret 2025"
            },
            {
                id: 2,
                title: "Perayaan Hari Kemerdekaan Indonesia ke-80",
                category: "kegiatan",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                excerpt: "Siswa-siswi MI Darul Huda merayakan Hari Kemerdekaan Indonesia dengan berbagai lomba dan kegiatan seru...",
                content: "Siswa-siswi MI Darul Huda merayakan Hari Kemerdekaan Indonesia dengan berbagai lomba dan kegiatan seru. Acara diikuti dengan semangat kebersamaan dan nasionalisme.",
                author: "Guru Olahraga",
                date: "17 Agustus 2025"
            },
            {
                id: 3,
                title: "Siswa MI Darul Huda Juara Olimpiade Matematika Tingkat Kota",
                category: "prestasi",
                image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                excerpt: "Ahmad Fauzi, siswa kelas 5 MI Darul Huda berhasil meraih juara 1 Olimpiade Matematika tingkat Kota Bandar Lampung...",
                content: "Ahmad Fauzi, siswa kelas 5 MI Darul Huda berhasil meraih juara 1 Olimpiade Matematika tingkat Kota Bandar Lampung. Prestasi ini membanggakan seluruh keluarga besar sekolah.",
                author: "Guru Matematika",
                date: "10 September 2025"
            }
        ];

        // Fungsi untuk menampilkan berita
        function displayNews(newsArray = sampleNews) {
            const newsGrid = document.getElementById('newsGrid');
            newsGrid.innerHTML = '';
            
            if (newsArray.length === 0) {
                newsGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; padding: 40px;">Tidak ada berita yang ditemukan.</p>';
                return;
            }
            
            // Tampilkan maksimal 6 berita di halaman utama
            const displayNews = newsArray.slice(0, 6);
            
            displayNews.forEach(news => {
                const newsCard = document.createElement('div');
                newsCard.className = 'news-card';
                newsCard.setAttribute('data-category', news.category);
                
                newsCard.innerHTML = `
                    <div class="news-image">
                        <img src="${news.image}" alt="${news.title}">
                    </div>
                    <div class="news-content">
                        <span class="news-category">${getCategoryName(news.category)}</span>
                        <h3 class="news-title">${news.title}</h3>
                        <p class="news-excerpt">${news.excerpt}</p>
                        <a href="#" class="read-more">Baca Selengkapnya <i class="fas fa-arrow-right"></i></a>
                        <div class="news-meta">
                            <div class="news-date">
                                <i class="far fa-calendar-alt"></i>
                                <span>${news.date}</span>
                            </div>
                            <div class="news-actions">
                                <button class="news-action-btn" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="news-action-btn" title="Hapus">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                
                newsGrid.appendChild(newsCard);
            });
        }
        
        // Fungsi untuk mendapatkan nama kategori
        function getCategoryName(category) {
            const categories = {
                'kegiatan': 'Kegiatan',
                'pengumuman': 'Pengumuman',
                'prestasi': 'Prestasi'
            };
            return categories[category] || 'Umum';
        }
        
        // Fungsi untuk memfilter berita
        function filterNews(category) {
            if (category === 'all') {
                displayNews();
                return;
            }
            
            const filteredNews = sampleNews.filter(news => news.category === category);
            displayNews(filteredNews);
        }
        
        // Fungsi untuk mencari berita
        function searchNews(query) {
            const filteredNews = sampleNews.filter(news => 
                news.title.toLowerCase().includes(query.toLowerCase()) || 
                news.excerpt.toLowerCase().includes(query.toLowerCase())
            );
            displayNews(filteredNews);
        }
        
        // Fungsi untuk menambahkan berita baru
        function addNews(event) {
            event.preventDefault();
            
            const title = document.getElementById('newsTitle').value;
            const category = document.getElementById('newsCategory').value;
            const image = document.getElementById('newsImage').value;
            const content = document.getElementById('newsContent').value;
            const author = document.getElementById('newsAuthor').value;
            
            // Membuat excerpt dari konten (100 karakter pertama)
            const excerpt = content.substring(0, 100) + '...';
            
            // Format tanggal
            const now = new Date();
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const date = now.toLocaleDateString('id-ID', options);
            
            // Buat objek berita baru
            const newNews = {
                id: sampleNews.length + 1,
                title,
                category,
                image,
                excerpt,
                content,
                author,
                date
            };
            
            // Tambahkan ke array sampleNews
            sampleNews.unshift(newNews);
            
            // Tampilkan ulang berita
            displayNews();
            
            // Reset form
            document.getElementById('newsForm').reset();
            
            // Tampilkan pesan sukses
            alert('Berita berhasil ditambahkan!');
        }
        
        // Fungsi untuk slider gambar
        function initImageSlider() {
            const images = [
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
            ];
            
            let index = 0;
            const imgTag = document.getElementById("slideImage");
            
            // Auto slide setiap 5 detik
            setInterval(() => {
                index = (index + 1) % images.length;
                imgTag.style.opacity = 0;
                
                setTimeout(() => {
                    imgTag.src = images[index];
                    imgTag.style.opacity = 1;
                }, 300);
            }, 5000);
        }
        
        // Event Listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Tampilkan berita saat halaman dimuat
            displayNews();
            
            // Inisialisasi slider gambar
            initImageSlider();
            
            // Filter berita berdasarkan kategori
            document.querySelectorAll('.filter-btn').forEach(button => {
                button.addEventListener('click', function() {
                    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    filterNews(this.getAttribute('data-filter'));
                });
            });
            
            // Pencarian berita
            document.getElementById('searchInput').addEventListener('input', function() {
                searchNews(this.value);
            });
            
            // Tambah berita baru
            document.getElementById('newsForm').addEventListener('submit', addNews);
            
            // Bersihkan form
            document.getElementById('clearForm').addEventListener('click', function() {
                document.getElementById('newsForm').reset();
            });
            
            // Toggle mobile menu
            document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
                const nav = document.querySelector('nav');
                nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
            });
            
            // Smooth scroll untuk navigasi
            document.querySelectorAll('nav a').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Tutup menu mobile setelah klik
                    if (window.innerWidth <= 768) {
                        document.querySelector('nav').style.display = 'none';
                    }
                });
            });
        });