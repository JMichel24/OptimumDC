// Carrusel de imágenes por integrante
document.querySelectorAll('.carrusel').forEach(carrusel => {
  const images = carrusel.querySelectorAll('img');
  let index = 0;

  setInterval(() => {
    images[index].classList.remove('active');
    index = (index + 1) % images.length;
    images[index].classList.add('active');
  }, 3000);
});

document.addEventListener('DOMContentLoaded', () => {
  // Lightbox de galería de imágenes
  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox');
  lightbox.innerHTML = `
    <span class="close">&times;</span>
    <img src="" alt="Imagen ampliada" />
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.close');

  document.querySelectorAll('.galeria-grid img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
    }
  });

  // Carrusel 3D de videos MP4 con lightbox
  const carousel = document.querySelector('.video-carousel');
  if (carousel) {
    const videoCards = carousel.querySelectorAll('.video-card');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    const videoCount = videoCards.length;
    let currentIndex = 0;

    const angle = 360 / videoCount;
    videoCards.forEach((card, i) => {
      card.style.transform = `rotateY(${i * angle}deg) translateZ(500px)`;
      card.style.position = 'absolute';
    });

    const updateCarouselRotation = () => {
      const rotation = currentIndex * -angle;
      carousel.style.transform = `rotateY(${rotation}deg)`;
    };

    // Botones de control
    if (nextBtn && prevBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % videoCount;
        updateCarouselRotation();
      });

      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + videoCount) % videoCount;
        updateCarouselRotation();
      });
    }

    // Teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % videoCount;
        updateCarouselRotation();
      } else if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + videoCount) % videoCount;
        updateCarouselRotation();
      }
    });

    // Lightbox de video
    const videoLightbox = document.createElement('div');
    videoLightbox.classList.add('video-lightbox');
    videoLightbox.innerHTML = `
      <span class="close-video">&times;</span>
      <video controls></video>
    `;
    document.body.appendChild(videoLightbox);

    const lightboxVideo = videoLightbox.querySelector('video');
    const closeVideoBtn = videoLightbox.querySelector('.close-video');

    videoCards.forEach(card => {
      const video = card.querySelector('video');
      card.addEventListener('click', () => {
        lightboxVideo.src = video.getAttribute('src');
        lightboxVideo.play();
        videoLightbox.style.display = 'flex';
      });
    });

    closeVideoBtn.addEventListener('click', () => {
      lightboxVideo.pause();
      lightboxVideo.src = '';
      videoLightbox.style.display = 'none';
    });

    videoLightbox.addEventListener('click', (e) => {
      if (e.target === videoLightbox) {
        lightboxVideo.pause();
        lightboxVideo.src = '';
        videoLightbox.style.display = 'none';
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function () {
      setTimeout(() => {
        alert('¡Gracias por tu mensaje! Te responderemos pronto.');
      }, 100);
    });
  }
});
