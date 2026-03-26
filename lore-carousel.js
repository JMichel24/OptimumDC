document.addEventListener('DOMContentLoaded', () => {
    // Member image arrays
    const loreImages = [
        'Lore/1.png',
        'Lore/IMG_20241027_074459 (1).remini-enhanced.png',
        'Lore/IMG_38L78.jpg',
        'Lore/Sin título-1.png'
    ];

    const pauImages = [
        'Pau/IMG_20241027_075013.jpg',
        'Pau/IMG_38L87.jpg',
        'Pau/Sin título-6.png'
    ];

    const saraImages = [
        'Sara/IMG_20241027_074616.jpg',
        'Sara/IMG_39L03.jpg',
        'Sara/Sin título-4.png'
    ];

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
});
