import "../sass/Estilo.scss";

document.addEventListener("DOMContentLoaded", () => {
    // 1. Manejo del Formulario y Webhook
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwQiyKAbUIxAQRBZteOANiVqUtciZzUi8AS9h7wD1DA8U5RIc8I2gstjWXe_oo-X3J4/exec';
    const form = document.getElementById('campamento-form');
    const submitBtn = document.getElementById('submit-btn');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            // Estado de carga
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'PROCESANDO...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            const formData = new FormData(form);
            formData.append('tipo', 'campa'); // Indica al script que debe ir a la Hoja 2 o procesar como campaña

            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                body: formData,
                keepalive: true
            })
                .then(() => {
                    form.reset();
                    submitBtn.textContent = '¡REGISTRADO!';
                    submitBtn.style.backgroundColor = '#5da703'; // Verde éxito

                    // Redirección a WhatsApp después de 1 segundo
                    setTimeout(() => {
                        window.location.href = "https://chat.whatsapp.com/FhmYVDNs2uoEjYTJD5sqKg";
                    }, 1000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert("Hubo un problema con la conexión. Por favor, intentá de nuevo.");
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                });
        });
    }

});
