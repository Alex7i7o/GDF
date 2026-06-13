import "../sass/Estilo.scss";

document.addEventListener("DOMContentLoaded", () => {
  
  // Nombres de las claves en LocalStorage
  const KEYS = {
    horno: 'gdf_horno_count',
    postre: 'gdf_postre_count',
    fe: 'gdf_fe_count'
  };

  // Valores base iniciales ficticios (para dar sensación de comunidad)
  const BASE_COUNTS = {
    horno: 142,
    postre: 89,
    fe: 215
  };

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

  // Inicializar contadores
  function initCounters() {
    Object.keys(KEYS).forEach(key => {
      // Intentar obtener el valor guardado
      let savedValue = localStorage.getItem(KEYS[key]);
      
      // Si no hay valor guardado, usar el valor base
      if (!savedValue) {
        savedValue = BASE_COUNTS[key];
        localStorage.setItem(KEYS[key], savedValue);
      }
      
      // Mostrar el valor en el HTML
      updateDisplay(key, parseInt(savedValue));

      // Agregar evento click
      counters[key].btn.addEventListener('click', () => {
        incrementCounter(key);
      });
    });
  }

  // Incrementar contador
  function incrementCounter(key) {
    let currentValue = parseInt(localStorage.getItem(KEYS[key]));
    currentValue++;
    
    // Guardar nuevo valor
    localStorage.setItem(KEYS[key], currentValue);
    
    // Actualizar vista
    updateDisplay(key, currentValue);
    
    // Animación visual
    animateClick(key);
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
      
      // Remover clase después de la animación
      setTimeout(() => {
        btn.classList.remove('clicked');
      }, 200);
    }
  }

  // Ejecutar inicialización
  initCounters();

});
