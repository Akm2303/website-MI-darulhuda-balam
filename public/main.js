document.addEventListener('DOMContentLoaded', function() {
            // Smooth scrolling untuk navigasi
            document.querySelectorAll('nav a').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                });
            });
            
            // Load data dari Firestore
            loadPrograms();
            loadNews();
            
            // Form submission
            document.getElementById('contactForm').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Terima kasih! Pesan Anda telah dikirim. Kami akan segera merespons.');
                this.reset();
            });
            
            // Mobile menu toggle
            document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
                document.querySelector('nav ul').style.display = 
                    document.querySelector('nav ul').style.display === 'flex' ? 'none' : 'flex';
            });
            
            // Update active nav link on scroll
            window.addEventListener('scroll', function() {
                const sections = document.querySelectorAll('section');
                const navLinks = document.querySelectorAll('nav a');
                
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (pageYOffset >= sectionTop - 100) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            });
        });
        
        // Fungsi untuk memuat program dari Firestore
        function loadPrograms() {
            const programsContainer = document.getElementById('programs-container');
            
            // Contoh data program (dalam implementasi nyata, data akan diambil dari Firestore)
            const programsData = [
                {
                    id: 1,
                    title: "Program Reguler",
                    description: "Program pendidikan reguler dengan kurikulum nasional yang diperkaya dengan pengembangan karakter.",
                    icon: "fas fa-book"
                },
                {
                    id: 2,
                    title: "Program Bahasa",
                    description: "Penguasaan bahasa asing (Inggris, Mandarin, Jepang) dengan metode pembelajaran interaktif.",
                    icon: "fas fa-language"
                },
                {
                    id: 3,
                    title: "Program Sains",
                    description: "Pengembangan kemampuan sains dan teknologi melalui eksperimen dan proyek penelitian.",
                    icon: "fas fa-flask"
                },
                {
                    id: 4,
                    title: "Program Olahraga",
                    description: "Pengembangan bakat olahraga dengan fasilitas lengkap dan pelatih profesional.",
                    icon: "fas fa-running"
                },
                {
                    id: 5,
                    title: "Program Seni",
                    description: "Eksplorasi kreativitas melalui seni musik, tari, lukis, dan teater.",
                    icon: "fas fa-palette"
                },
                {
                    id: 6,
                    title: "Program Digital",
                    description: "Pembelajaran coding, robotika, dan teknologi digital untuk persiapan masa depan.",
                    icon: "fas fa-laptop-code"
                }
            ];
            
            // Simulasi loading data dari Firestore
            setTimeout(() => {
                programsContainer.innerHTML = '';
                
                programsData.forEach(program => {
                    const programCard = document.createElement('div');
                    programCard.className = 'program-card';
                    programCard.innerHTML = `
                        <div class="program-icon">
                            <i class="${program.icon}"></i>
                        </div>
                        <div class="program-content">
                            <h3>${program.title}</h3>
                            <p>${program.description}</p>
                            <a href="#" class="read-more">Selengkapnya <i class="fas fa-arrow-right"></i></a>
                        </div>
                    `;
                    programsContainer.appendChild(programCard);
                });
            }, 1500);
        }
        
        // // Fungsi untuk memuat berita dari Firestore
        // function loadNews() {
        //     const newsContainer = document.getElementById('news-container');
            
        //     // Contoh data berita (dalam implementasi nyata, data akan diambil dari Firestore)
        //     const newsData = [
        //         {
        //             id: 1,
        //             title: "Peringatan Hari Pendidikan Nasional 2023",
        //             date: "2 Mei 2023",
        //             excerpt: "Sekolah kami merayakan Hari Pendidikan Nasional dengan berbagai kegiatan menarik dan inspiratif.",
        //             image: "news1.jpg"
        //         },
        //         {
        //             id: 2,
        //             title: "Siswa Berprestasi di Olimpiade Sains Nasional",
        //             date: "15 April 2023",
        //             excerpt: "Dua siswa kami berhasil meraih medali perak dalam Olimpiade Sains Nasional tingkat provinsi.",
        //             image: "news2.jpg"
        //         },
        //         {
        //             id: 3,
        //             title: "Workshop Parenting untuk Orang Tua Siswa",
        //             date: "28 Maret 2023",
        //             excerpt: "Kami menyelenggarakan workshop parenting dengan tema 'Mendidik Anak di Era Digital'.",
        //             image: "news3.jpg"
        //         }
        //     ];
            
        //     // Simulasi loading data dari Firestore
        //     setTimeout(() => {
        //         newsContainer.innerHTML = '';
                
        //         newsData.forEach(news => {
        //             const newsCard = document.createElement('div');
        //             newsCard.className = 'news-card';
        //             newsCard.innerHTML = `
        //                 <div class="news-image">
        //                     <div style="width: 100%; height: 100%; background-color: #e5e7eb; display: flex; align-items: center; justify-content: center; color: #6b7280;">
        //                         <i class="fas fa-newspaper" style="font-size: 40px;"></i>
        //                     </div>
        //                 </div>
        //                 <div class="news-content">
        //                     <div class="news-date">${news.date}</div>
        //                     <h3>${news.title}</h3>
        //                     <p>${news.excerpt}</p>
        //                     // <a href="#" class="read-more">Baca Selengkapnya <i class="fas fa-arrow-right"></i></a>
        //                 </div>
        //             `;
        //             newsContainer.appendChild(newsCard);
        //         });
        //     }, 2000);
        // }