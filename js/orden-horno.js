import "../sass/Estilo.scss";

document.addEventListener("DOMContentLoaded", () => {
  
  // URL del Webhook de Google Apps Script
  const scriptURL = 'https://script.google.com/macros/s/AKfycbxEnB516Z_8_s91T7NE8tlbPdcDdOmDEYUyhc4o2runW7sechDYHEYWBazBC_tpRSIf/exec';

  // Referencias a los elementos del DOM
  const counters = {
    horno: {
      btn: document.getElementById('btn-horno'),
      display: document.getElementById('count-horno')
    },
    postre: {
      btn: document.getElementById('btn-postre'),
      display: document.getElementById('count-postre')
    },
    fe: {
      btn: document.getElementById('btn-fe'),
      display: document.getElementById('count-fe')
    }
  };

  // Variable para evitar doble clics rápidos
  let isUpdating = false;

  // Inicializar contadores cargando desde Sheets
  function initCounters() {
    // Estado de carga inicial
    Object.keys(counters).forEach(key => {
      counters[key].display.textContent = '...';
      
      // Agregar evento click
      counters[key].btn.addEventListener('click', () => {
        if (!isUpdating) {
          incrementCounter(key);
        }
      });
    });

    // Petición GET para traer los contadores actuales
    fetch(scriptURL)
      .then(response => response.json())
      .then(data => {
        updateDisplay('horno', data.horno);
        updateDisplay('postre', data.postre);
        updateDisplay('fe', data.fe);
      })
      .catch(error => {
        console.error('Error al cargar contadores:', error);
        Object.keys(counters).forEach(key => counters[key].display.textContent = '0');
      });
  }

  // Incrementar contador
  function incrementCounter(key) {
    isUpdating = true;
    
    // 1. Actualización Visual Optimista (instantánea)
    let currentValue = parseInt(counters[key].display.textContent) || 0;
    updateDisplay(key, currentValue + 1);
    animateClick(key);

    // 2. Enviar a Google Sheets en segundo plano
    const formData = new FormData();
    formData.append('tipo', 'contador');
    formData.append('contador', key);

    fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    })
    .then(() => {
      isUpdating = false; // Liberar bloqueo
    })
    .catch(error => {
      console.error('Error al guardar contador:', error);
      isUpdating = false;
    });
  }

  // Actualizar el DOM
  function updateDisplay(key, value) {
    if (counters[key] && counters[key].display) {
      counters[key].display.textContent = value;
    }
  }

  // Animación al hacer clic
  function animateClick(key) {
    if (counters[key] && counters[key].btn) {
      const btn = counters[key].btn;
      btn.classList.add('clicked');
      
      setTimeout(() => {
        btn.classList.remove('clicked');
      }, 200);
    }
  }

  // Ejecutar inicialización
  initCounters();

});
