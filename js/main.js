// Imports
import "../sass/Estilo.scss";

// 
document.addEventListener("DOMContentLoaded", () => {
    // Boton video
    const video = document.querySelector(".video");
    const audioBtn = document.getElementById("audioBtn");
    const playPauseBtn = document.getElementById("playPauseBtn");

    if(video && audioBtn && playPauseBtn) {
        // Control de Audio
        audioBtn.addEventListener("click", () => {
            video.muted = !video.muted;
            audioBtn.textContent = video.muted ? "🔊" : "🔇";
        });

        // Control de Play/Pausa
        playPauseBtn.addEventListener("click", () => {
            if (video.paused) {
                video.play();
                playPauseBtn.textContent = "⏸️";
            } else {
                video.pause();
                playPauseBtn.textContent = "▶️";
            }
        });
    }
});

// -------------

const controls = document.querySelector('.video-controls');
const introSection = document.querySelector('.intro'); // Tu contenedor padre

window.addEventListener('scroll', () => {
    // Calculamos cuánto le falta al contenedor para salir de pantalla
    const rect = introSection.getBoundingClientRect();
    const bottomThreshold = 150; // Ajusta esto: es a cuántos px del fondo quieres que cambie

    // Si el borde inferior del contenedor está cerca del borde inferior de la pantalla
    if (rect.bottom < bottomThreshold) {
        controls.classList.add('is-absolute');
    } else {
        controls.classList.remove('is-absolute');
    }
});

// -----------

const scriptURL = 'https://script.google.com/macros/s/AKfycbwQiyKAbUIxAQRBZteOANiVqUtciZzUi8AS9h7wD1DA8U5RIc8I2gstjWXe_oo-X3J4/exec'; // La URL que copiaste al desplegar
const form = document.getElementById('gdf-signup-form');

form.addEventListener('submit', e => {
  e.preventDefault();
  
  const formData = new FormData(form);
  
  // Usamos keepalive para que la petición se envíe aunque cambies de página
  fetch(scriptURL, { 
    method: 'POST', 
    mode: 'no-cors', 
    body: formData,
    keepalive: true 
  })
  .then(() => {
    // Como usamos no-cors, no podemos leer la respuesta, 
    // pero podemos asumir que si no dio error, se envió.
    alert("¡Inscripción recibida!");
    form.reset();
  })
  .catch(error => {
    console.error('Error:', error);
  });
});