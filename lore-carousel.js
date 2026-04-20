document.addEventListener('DOMContentLoaded', () => {
    // Member image arrays
    const loreImages = [
        'Lore/LoreN.png',
        'Lore/LoreN1.png'
    ];

    const pauImages = [
        'Pau/PauN.png',
        'Pau/PauN1.png'
    ];

    const saraImages = [
        'Sara/SaraN.png',
        'Sara/SaraN1.png'
    ];

    const aloImages = ['Alo/AloN.png'];
    const daniImages = ['Dani/DaniN.png'];
    const nanaImages = ['Nana/NanaN.png'];

    /**
     * Initializes a K-pop carousel inside a specified container
     * @param {string} containerId - The ID of the container element
     * @param {Array<string>} imagesArray - Array of image paths
     * @param {number} interval - Interval in milliseconds (default 3000ms)
     */
    function initKpopCarousel(containerId, imagesArray, interval = 3000) {
        const container = document.getElementById(containerId);
        if (!container || !imagesArray || imagesArray.length === 0) return;

        // Clear container and build DOM dynamically
        container.innerHTML = '';
        
        imagesArray.forEach((src, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide' + (index === 0 ? ' active' : '');
            
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Slide ${index + 1} for ${containerId}`;
            
            // WPO: Native lazy loading and async decoding
            img.loading = 'lazy';
            img.decoding = 'async';
            
            slide.appendChild(img);
            container.appendChild(slide);
        });

        const slides = container.querySelectorAll('.carousel-slide');
        if (slides.length <= 1) return;

        let currentSlide = 0;
        let animationInterval = null;

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        /**
         * WPO: Performance Intersection Observer
         * Only start the carousel interval when it's visible to the user.
         */
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start animation if not already running
                    if (!animationInterval) {
                        animationInterval = setInterval(nextSlide, interval);
                    }
                } else {
                    // Pause animation to save resources when not in view
                    if (animationInterval) {
                        clearInterval(animationInterval);
                        animationInterval = null;
                    }
                }
            });
        }, { threshold: 0.1 }); // Trigger when 10% visible

        observer.observe(container);
    }

    // Initialize all carousels
    initKpopCarousel('carousel-lore', loreImages);
    initKpopCarousel('carousel-pau', pauImages);
    initKpopCarousel('carousel-sara', saraImages);
    initKpopCarousel('carousel-alo', aloImages);
    initKpopCarousel('carousel-dani', daniImages);
    initKpopCarousel('carousel-nana', nanaImages);

    /**
     * WPO: Lite YouTube Embeds logic
     * Loads the high-res thumbnail and only injects the iframe on click.
     */
    function initLiteYouTube() {
        const liteVideos = document.querySelectorAll('.lite-youtube');
        
        liteVideos.forEach(video => {
            video.addEventListener('click', function() {
                const videoId = this.getAttribute('data-id');
                const iframe = document.createElement('iframe');
                
                iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allowfullscreen', '1');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                
                // Replace content with iframe
                this.innerHTML = '';
                this.appendChild(iframe);
            });
        });
    }

    initLiteYouTube();

    /**
     * UI/UX: Sticky Header & ScrollSpy Logic
     */
    const header = document.querySelector('.main-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section, header, footer');

    // 1. Scroll Effect: Compact Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        // 2. ScrollSpy: Highlight active section in menu
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Check if section is in viewport (with offset for sticky header)
            if (window.scrollY >= (sectionTop - 100)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});
