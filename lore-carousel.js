document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('#integrantes .carousel-slide');
    let currentSlide = 0;

    if (slides.length === 0) return;

    function nextSlide() {
        // Remove active class from current
        slides[currentSlide].classList.remove('active');
        
        // Increment index
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to next
        slides[currentSlide].classList.add('active');
    }

    // Start automatic carousel every 3 seconds
    setInterval(nextSlide, 3000);
});
