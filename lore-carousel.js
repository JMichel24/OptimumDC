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

        // Clear container and build DOM dynamically to simplify HTML
        container.innerHTML = '';
        
        imagesArray.forEach((src, index) => {
            const slide = document.createElement('div');
            // Ensure proper class and spacing, first element gets active class
            slide.className = 'carousel-slide' + (index === 0 ? ' active' : '');
            
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Slide ${index + 1} for ${containerId}`;
            
            slide.appendChild(img);
            container.appendChild(slide);
        });

        const slides = container.querySelectorAll('.carousel-slide');
        if (slides.length <= 1) return;

        let currentSlide = 0;

        function nextSlide() {
            // Remove active class from current
            slides[currentSlide].classList.remove('active');
            
            // Increment index
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Add active class to next
            slides[currentSlide].classList.add('active');
        }

        // Start automatic carousel every 'interval' milliseconds independently
        setInterval(nextSlide, interval);
    }

    // Initialize all carousels
    initKpopCarousel('carousel-lore', loreImages);
    initKpopCarousel('carousel-pau', pauImages);
    initKpopCarousel('carousel-sara', saraImages);
});
