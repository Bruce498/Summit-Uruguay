document.addEventListener('DOMContentLoaded', () => {
  let currentIndex = 0;
  const slider = document.querySelector('.gallery-multi-item-slider');
  const images = document.querySelectorAll('.gallery-multi-item');
  const totalImages = images.length;

  // Modal Elements
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".modal .close");

  if (slider && images.length > 0) {
    // Duplicamos las imágenes para crear el ciclo infinito
    for (let i = 0; i < totalImages; i++) {
      const clone = images[i].cloneNode(true);
      slider.appendChild(clone);
    }

    // Actualiza la posición del slider
    function updateSliderPosition() {
      const offset = -currentIndex * 25; // Desplazamiento de las imágenes por 25% cada vez
      slider.style.transition = 'transform 0.3s ease';
      slider.style.transform = `translateX(${offset}%)`;
    }

    function moveSlide(direction) {
      currentIndex += direction;

      if (currentIndex >= totalImages) {
        currentIndex = 0;
        slider.style.transition = 'none';
        slider.style.transform = `translateX(0%)`;

        setTimeout(() => {
          slider.style.transition = 'transform 0.3s ease';
          updateSliderPosition();
        }, 10);
      } else if (currentIndex < 0) {
        currentIndex = totalImages - 1;
      }

      updateSliderPosition();
    }

    // Controles de navegación
    document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
    document.querySelector('.next').addEventListener('click', () => moveSlide(1));

    // Auto avance de la galería
    let autoSlide = setInterval(() => moveSlide(1), 3000);

    document.querySelector('.gallery-multi-item-container').addEventListener('mouseenter', () => {
      clearInterval(autoSlide);
    });

    document.querySelector('.gallery-multi-item-container').addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => moveSlide(1), 3000);
    });
  }

  // Modal handling
  if (modal && modalImage && captionText && closeBtn) {
    document.querySelectorAll('.gallery-multi-item img').forEach((img) => {
      img.addEventListener('click', function () {
        modal.style.display = "block";
        modalImage.src = this.src;
        captionText.innerHTML = this.alt;
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = "none";
    });

    window.addEventListener('click', (e) => {
      if (e.target == modal) {
        modal.style.display = "none";
      }
    });
  }
});
