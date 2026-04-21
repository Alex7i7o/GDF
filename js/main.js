// Imports
import "../sass/Estilo.scss";

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