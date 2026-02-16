//  <!-- JavaScript Logic -->

        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        bhutan: {
                            red: '#E84C3D',
                            yellow: '#F1C40F',
                            dark: '#2C3E50',
                            gold: '#D4AF37',
                            light: '#ECF0F1'
                        },
                        whatsapp: '#25D366'
                    },
                    fontFamily: {
                        serif: ['"Playfair Display"', 'serif'],
                        sans: ['"Lato"', 'sans-serif'],
                    },
                    backgroundImage: {
                        'pattern': "url('https://www.transparenttextures.com/patterns/cubes.png')",
                    }
                }
            }
        }
    
        // --- 1. Initialization & Loader ---
        window.onload = function() {
            lucide.createIcons();
            setTimeout(() => {
                document.getElementById('page-loader').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('page-loader').style.display = 'none';
                }, 500);
            }, 1000);
            renderHotels('all'); // Initial load
        }

        // --- 2. Navbar & Mobile Menu ---
        const navbar = document.getElementById('navbar');
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        let isMenuOpen = false;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-white', 'shadow-md', 'text-gray-800');
                navbar.classList.remove('bg-transparent', 'text-white');
            } else {
                navbar.classList.remove('bg-white', 'shadow-md', 'text-gray-800');
                navbar.classList.add('bg-transparent', 'text-white');
            }
        });

        menuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            const icon = menuBtn.querySelector('.hamburger-icon');
            const spans = icon.querySelectorAll('span');
            
            if (isMenuOpen) {
                mobileMenu.classList.remove('translate-x-full');
                // Animate to X
                spans[0].classList.add('rotate-45', 'translate-y-2');
                spans[1].classList.add('opacity-0');
                spans[2].classList.add('-rotate-45', '-translate-y-2');
            } else {
                mobileMenu.classList.add('translate-x-full');
                // Animate back
                spans[0].classList.remove('rotate-45', 'translate-y-2');
                spans[1].classList.remove('opacity-0');
                spans[2].classList.remove('-rotate-45', '-translate-y-2');
            }
        });

        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.click(); // Close menu on click
            });
        });

        // --- 3. Complex Carousel Logic ---
        const slides = [
            {
                title: "Tiger's Nest (Taktsang)",
                desc: "Clinging to a cliff 900 meters above Paro valley, this is the most sacred site in Bhutan.",
                img: "images/tigernest.jpg"
            },
            {
                title: "Punakha Dzong",
                desc: "The Palace of Great Happiness, located at the confluence of the Pho Chhu and Mo Chhu rivers.",
                img: "images/punakhadzong.jpg"
            },
            {
                title: "Dochula Pass",
                desc: "A mountain pass with 108 memorial chortens and panoramic views of the Himalayas.",
                img: "images/dochulapass.jpg"
            }
        ];

        let currentSlide = 0;
        const track = document.getElementById('carousel-track');
        const indicatorsContainer = document.getElementById('carousel-indicators');
        const titleEl = document.getElementById('slide-title');
        const descEl = document.getElementById('slide-desc');

        // Init Carousel
        slides.forEach((slide, index) => {
            // Create Slide
            const div = document.createElement('div');
            div.className = 'carousel-slide flex-shrink-0 h-full w-full relative';
            div.innerHTML = `<img src="${slide.img}" class="w-full h-full object-cover rounded-2xl" alt="${slide.title}">`;
            track.appendChild(div);

            // Create Dot
            const dot = document.createElement('button');
            dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${index === 0 ? 'bg-bhutan-yellow w-8' : 'bg-white/50 hover:bg-white'}`;
            dot.onclick = () => goToSlide(index);
            indicatorsContainer.appendChild(dot);
        });

        function updateCaption(index) {
            // Fade out
            titleEl.style.opacity = '0';
            titleEl.style.transform = 'translateY(20px)';
            descEl.style.opacity = '0';
            descEl.style.transform = 'translateY(20px)';

            setTimeout(() => {
                titleEl.innerText = slides[index].title;
                descEl.innerText = slides[index].desc;
                
                // Fade in
                titleEl.style.opacity = '1';
                titleEl.style.transform = 'translateY(0)';
                descEl.style.opacity = '1';
                descEl.style.transform = 'translateY(0)';
            }, 300);
        }

        function goToSlide(index) {
            currentSlide = index;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            const dots = indicatorsContainer.children;
            Array.from(dots).forEach((dot, i) => {
                dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${i === index ? 'bg-bhutan-yellow w-8' : 'bg-white/50 hover:bg-white'}`;
            });

            updateCaption(index);
        }

        document.getElementById('next-slide').onclick = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
        };

        document.getElementById('prev-slide').onclick = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(currentSlide);
        };

        // Auto play
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
        }, 5000);


        // --- 4. Hotel Filtering Logic ---
        const hotels = [
            { name: "Le Méridien", loc: "Thimphu", type: "luxury", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600", rating: 5 },
            { name: "Six Senses", loc: "Paro", type: "luxury", img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600", rating: 5 },
            { name: "Hotel Norbuling", loc: "Thimphu", type: "standard", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=600", rating: 4 },
            { name: "Tashi Namgay", loc: "Paro", type: "standard", img: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=600", rating: 3 },
            { name: "Kisa Villa", loc: "Thimphu", type: "budget", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600", rating: 3 },
            { name: "Simtokha Inn", loc: "Punakha", type: "budget", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600", rating: 3 }
        ];

        const grid = document.getElementById('hotel-grid');
        const btns = document.querySelectorAll('.filter-btn');

        function renderHotels(filter) {
            grid.innerHTML = '';
            const filtered = filter === 'all' ? hotels : hotels.filter(h => h.type === filter);
            
            filtered.forEach(h => {
                const stars = '★'.repeat(h.rating) + '☆'.repeat(5 - h.rating);
                const card = `
                    <div class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 group">
                        <div class="h-48 overflow-hidden">
                            <img src="${h.img}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                        </div>
                        <div class="p-6">
                            <div class="flex justify-between items-start mb-2">
                                <div>
                                    <span class="text-xs font-bold text-bhutan-red uppercase tracking-wide">${h.loc}</span>
                                    <h3 class="text-xl font-bold font-serif">${h.name}</h3>
                                </div>
                                <span class="text-yellow-400 text-sm tracking-widest">${stars}</span>
                            </div>
                            <div class="flex justify-between items-center mt-4">
                                <span class="px-2 py-1 bg-gray-100 text-xs rounded text-gray-500 capitalize">${h.type}</span>
                                <button class="text-bhutan-red font-bold text-sm hover:underline" onclick="document.getElementById('message').value='Inquiry for ${h.name}'; window.location.href='#contact'">Book This</button>
                            </div>
                        </div>
                    </div>
                `;
                grid.innerHTML += card;
            });
        }

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => {
                    b.classList.remove('bg-bhutan-dark', 'text-white');
                    b.classList.add('text-gray-600', 'hover:bg-gray-100');
                });
                btn.classList.add('bg-bhutan-dark', 'text-white');
                btn.classList.remove('text-gray-600', 'hover:bg-gray-100');
                renderHotels(btn.dataset.filter);
            });
        });

        // --- 5. Lightbox Logic ---
        const lightbox = document.getElementById('lightbox');
        const lbImg = document.getElementById('lightbox-img');
        const lbCap = document.getElementById('lightbox-caption');

        function openLightbox(el) {
            const img = el.querySelector('img');
            lbImg.src = img.src;
            lbCap.innerText = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // --- 6. WhatsApp Form Logic ---
        function sendToWhatsApp(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const packageType = document.getElementById('package').value;
            const message = document.getElementById('message').value;

            const text = `*New Travel Inquiry*%0a` +
                         `-----------------------%0a` +
                         `*Name:* ${name}%0a` +
                         `*Phone:* ${phone}%0a` +
                         `*Email:* ${email}%0a` +
                         `*Interested In:* ${packageType}%0a` +
                         `*Message:* ${message}`;

            window.open(`https://wa.me/919382344882?text=${text}`, '_blank');
        }
  