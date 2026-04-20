document.addEventListener('DOMContentLoaded', () => {
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
