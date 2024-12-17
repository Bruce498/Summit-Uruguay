document.addEventListener('DOMContentLoaded', () => {
  const toggler = document.getElementById('menuToggle');
  const sideMenu = document.getElementById('sideMenu');
  const overlay = document.querySelector('.overlay');
  const closeMenu = document.getElementById('closeMenu');
  const menuItemsWithSubmenus = document.querySelectorAll('.has-submenu');
  const body = document.querySelector('body');

  // Abrir y cerrar el menú
  toggler.addEventListener('click', () => {
    const isOpen = sideMenu.classList.contains('open');
    if (isOpen) {
      sideMenu.classList.remove('open');
      overlay.classList.remove('active');
      body.classList.remove('menu-open');
    } else {
      sideMenu.classList.add('open');
      overlay.classList.add('active');
      body.classList.add('menu-open');
    }
  });

  // Cerrar el menú cuando se hace clic en el botón de cerrar
  closeMenu.addEventListener('click', () => {
    sideMenu.classList.remove('open');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
  });

  // Manejar el submenú
  menuItemsWithSubmenus.forEach(item => {
    const submenu = item.querySelector('.submenu');
    
    item.addEventListener('click', (e) => {
      e.stopPropagation(); // Evitar que el clic cierre el menú

      // Si el submenú está abierto, lo cerramos con animación
      if (item.classList.contains('open')) {
        submenu.style.maxHeight = null; // Restablecer altura
      } else {
        // Si el submenú está cerrado, lo abrimos con animación
        submenu.style.maxHeight = submenu.scrollHeight + 'px'; // Ajustar altura al contenido
      }

      // Alternar clase 'open' para el estado del submenú
      item.classList.toggle('open');
    });

    // Asegurar que los submenús estén colapsados al inicio
    submenu.style.maxHeight = null;
  });

  // Cerrar el menú si se hace clic fuera de él (en el overlay)
  overlay.addEventListener('click', () => {
    sideMenu.classList.remove('open');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
  });
});

