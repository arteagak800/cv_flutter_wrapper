/* ==========================================================================
   INTERACTIVIDAD JAVASCRIPT: Filtrado, Copiado y Modo Oscuro
   Compatible con WebView Flutter (Bidireccional) y Navegadores Web
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initSkillsFilter();
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

// 2. FILTRADO INTERACTIVO DE HABILIDADES
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.pill-btn, .filter-btn');
  const skillChips = document.querySelectorAll('.skill-chip');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillChips.forEach(chip => {
        if (filter === 'all' || chip.getAttribute('data-category') === filter) {
          chip.classList.remove('hide');
        } else {
          chip.classList.add('hide');
        }
      });
    });
  });
}

// 3. COPIAR AL PORTAPAPELES CON CONFIRMACIÓN TOAST
function copiarAlPortapapeles(texto, label) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(texto).then(() => {
      showToast(`${label} copiado`);
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
  showToast(`${label} copiado`);
}

// 4. MOSTRAR MENSAJE TOAST FLOTANTE
let toastTimeout;
function showToast(mensaje) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = mensaje;
  toast.classList.add('show');
  
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

// 5. MANEJO DE FORMULARIO DE CONTACTO
function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('senderName').value;
  const email = document.getElementById('senderEmail').value;
  const msg = document.getElementById('senderMsg').value;

  showToast(`¡Gracias ${name}! Mensaje enviado.`);
  
  // Si estamos en Flutter WebView, notificamos al snackbar nativo
  if (window.FlutterChannel) {
    window.FlutterChannel.postMessage(`Mensaje de ${name} (${email}): ${msg}`);
  }

  document.getElementById('contactForm').reset();
}
