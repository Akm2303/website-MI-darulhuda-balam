 // Data berita contoh
        const sampleNews = [
        //     {
        //         id: 1,
        //         title: "Penerimaan Siswa Baru Tahun Ajaran 2025/2026",
        //         category: "pengumuman",
        //         image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        //         excerpt: "Pendaftaran siswa baru untuk tahun ajaran 2025/2026 telah dibuka. Segera daftarkan putra-putri Anda...",
        //         content: "Pendaftaran siswa baru untuk tahun ajaran 2025/2026 telah dibuka. Segera daftarkan putra-putri Anda. Persyaratan dan informasi lengkap dapat dilihat di bagian pengumuman.",
        //         author: "Admin Sekolah",
        //         date: "15 Maret 2025"
        //     },
        //     {
        //         id: 2,
        //         title: "Perayaan Hari Kemerdekaan Indonesia ke-80",
        //         category: "kegiatan",
        //         image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        //         excerpt: "Siswa-siswi MI Darul Huda merayakan Hari Kemerdekaan Indonesia dengan berbagai lomba dan kegiatan seru...",
        //         content: "Siswa-siswi MI Darul Huda merayakan Hari Kemerdekaan Indonesia dengan berbagai lomba dan kegiatan seru. Acara diikuti dengan semangat kebersamaan dan nasionalisme.",
        //         author: "Guru Olahraga",
        //         date: "17 Agustus 2025"
        //     },
        //     {
        //         id: 3,
        //         title: "Siswa MI Darul Huda Juara Olimpiade Matematika Tingkat Kota",
        //         category: "prestasi",
        //         image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        //         excerpt: "Ahmad Fauzi, siswa kelas 5 MI Darul Huda berhasil meraih juara 1 Olimpiade Matematika tingkat Kota Bandar Lampung...",
        //         content: "Ahmad Fauzi, siswa kelas 5 MI Darul Huda berhasil meraih juara 1 Olimpiade Matematika tingkat Kota Bandar Lampung. Prestasi ini membanggakan seluruh keluarga besar sekolah.",
        //         author: "Guru Matematika",
        //         date: "10 September 2025"
        //     }
        // ];
            {
                id: 1,
                title: "Penerimaan Siswa Baru Tahun Ajaran 2025/2026",
                category: "pengumuman",
                image: "images/Hariguru2.jpg",
                excerpt: "Test",
                content: "Pendaftaran siswa baru untuk tahun ajaran 2025/2026 telah dibuka. Segera daftarkan putra-putri Anda. Persyaratan dan informasi lengkap dapat dilihat di bagian pengumuman.",
                author: "Admin Sekolah",
                date: "15 Maret 2025"
            },
            {
                id: 2,
                title: "Perayaan Hari Guru Nasional 2025",
                category: "kegiatan",
                image: "images/Hariguru1.jpg",
                excerpt: "Kegiatan Peringatan Hari Guru Nasional.",
                content: "Dalam Rangka Memperingati Hari guru nasional TA 2025/2026 MI Darul Huda Melakukan Berbagi Kegiatan Salah satunya melakukan upacara",
                author: "TU",
                date: "27 November 2025"
            },
            {
                id: 3,
                title: "Ekstrakurikuler Pramuka MI Darul Huda",
                category: "ekstrakurikuler",
                image: "images/Eskul1.jpg",
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
                'ekstrakurikuler': 'Ekstrakurikuler'
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
        
       // Daftar gambar slider
        let images = [
            {
                src: "images/Hariguru1.jpg",
                alt: "Kegiatan Peringatan Hari Guru Nasional",
                title: "Hasi Guru Nasional 2025",
                description: "Dalam Rangka Memperingati Hari guru nasional TA 2025/2026 MI Darul Huda Melakukan Berbagi Kegiatan Salah satunya melakukan upacara"
            },
            {
                src: "images/logo-mi-darul-huda.png",
                alt: "Acara Perpisahan Kelas VI TA 2022/2023",
                title: "Perpisahan Kelas VI",
                description: "Dokumentasi Acara Perpisahan Kelas VI"
            },
            {
                src: "images/Eskul1.jpg",
                alt: "Ekstrakurikuler MI Darul Huda",
                title: "Ekstrakurikuler MI Darul Huda",
                description: "Ekstrakurikuler MI Darul Huda Untuk Mendukung Potensi Anak"
            },
            {
                src: "images/Gedung.jpg",
                alt: "Gedung MI Darul Huda",
                title: "Gedung Utama MI Darul Huda",
                description: "Gedung Utama MI Darul Huda"
            }
        ];

        let index = 0;
        const imgTag = document.getElementById("slideImage");
        const captionTitle = document.querySelector('.slider-caption h3');
        const captionDesc = document.querySelector('.slider-caption p');
        const dots = document.querySelectorAll('.slider-controls .dot');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');

        // Fungsi untuk memperbarui slider
        function updateSlider() {
            imgTag.style.opacity = 0;
            
            setTimeout(() => {
                imgTag.src = images[index].src;
                imgTag.alt = images[index].alt;
                captionTitle.textContent = images[index].title;
                captionDesc.textContent = images[index].description;
                imgTag.style.opacity = 1;
                
                // Update active dot
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }, 300);
        }

        // Auto slide setiap 5 detik
        let slideInterval = setInterval(() => {
            nextSlide();
        }, 10000);

        // Fungsi untuk slide berikutnya
        function nextSlide() {
            index = (index + 1) % images.length;
            updateSlider();
        }

        // Fungsi untuk slide sebelumnya
        function prevSlide() {
            index = (index - 1 + images.length) % images.length;
            updateSlider();
        }

        // Event listeners untuk dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                // Hentikan auto slide sementara
                clearInterval(slideInterval);
                
                index = parseInt(this.getAttribute('data-index'));
                updateSlider();
                
                // Mulai kembali auto slide setelah 5 detik
                setTimeout(() => {
                    slideInterval = setInterval(() => {
                        nextSlide();
                    }, 10000);
                }, 10000);
            });
        });

        // Event listeners untuk tombol navigasi
        prevBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            prevSlide();
            setTimeout(() => {
                slideInterval = setInterval(() => {
                    nextSlide();
                }, 10000);
            }, 10000);
        });

        nextBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            nextSlide();
            setTimeout(() => {
                slideInterval = setInterval(() => {
                    nextSlide();
                }, 10000);
            }, 10000);
        });

        // Pause slider saat hover
        const sliderContainer = document.querySelector('.slider-container');
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                nextSlide();
            }, 10000);
        });
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

    