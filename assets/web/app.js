/* ==========================================================================
   INTERACTIVIDAD JAVASCRIPT: ScrollSpy Dock, Filtro Simétrico y Copiado
   Kevin Daniel Arteaga Gallegos
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initSkillsFilter();
  initScrollSpy();
});

// 1. ALTERNADOR DE MODO OSCURO / CLARO
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeBtn) return;
  const icon = themeBtn.querySelector('i');

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      if (icon) icon.className = 'fas fa-moon';
      showToast('Modo Claro Activado');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (icon) icon.className = 'fas fa-sun';
      showToast('Modo Oscuro Activado');
    }
  });
}

// 2. BARRA INTERACTIVA INFERIOR (SCROLLSPY AUTOMÁTICO)
function initScrollSpy() {
  const dockItems = document.querySelectorAll('.dock-item');
  const sections = [
    document.getElementById('perfil'),
    document.getElementById('estudios'),
    document.getElementById('proyectos'),
    document.getElementById('habilidades'),
    document.getElementById('contacto')
  ].filter(Boolean);

  // Detección automática al hacer scroll con IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        dockItems.forEach(item => {
          if (item.getAttribute('data-section') === id) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Manejo de clic en los botones del dock
  dockItems.forEach(item => {
    item.addEventListener('click', (e) => {
      dockItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

// 3. FILTRADO INTERACTIVO DE HABILIDADES (SIMÉTRICO)
function initSkillsFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillButtons = document.querySelectorAll('.skill-button');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillButtons.forEach(btn => {
        const category = btn.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          btn.classList.remove('hide');
        } else {
          btn.classList.add('hide');
        }
      });
    });
  });
}

// 4. COPIAR AL PORTAPAPELES CON TOAST Y COMUNICACIÓN FLUTTER
function copiarAlPortapapeles(texto, label) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(texto).then(() => {
      showToast(`${label} copiado: ${texto}`);
    }).catch(() => {
      fallbackCopy(texto, label);
    });
  } else {
    fallbackCopy(texto, label);
  }

  // Notificar al wrapper nativo de Flutter si está disponible
  if (window.FlutterChannel) {
    window.FlutterChannel.postMessage(`Copiado: ${label} (${texto})`);
  }
}

function fallbackCopy(texto, label) {
  const input = document.createElement('input');
  input.value = texto;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  showToast(`${label} copiado: ${texto}`);
}

// 5. TOAST FLOTANTE
let toastTimer;
function showToast(mensaje) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = mensaje;
  toast.classList.add('show');
  
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

// 6. FORMULARIO DE CONTACTO
function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('senderName').value;
  const email = document.getElementById('senderEmail').value;
  const msg = document.getElementById('senderMsg').value;

  showToast(`¡Gracias ${name}! Mensaje enviado.`);
  
  // Notificar al SnackBar de Flutter si se ejecuta en móvil
  if (window.FlutterChannel) {
    window.FlutterChannel.postMessage(`Mensaje de ${name} (${email}): ${msg}`);
  }

  document.getElementById('contactForm').reset();
}
