//funcion para abrir y cerrar el menu de hamburguesa para dispositivos moviles
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.hamburger');
    const isOpen = navMenu.classList.contains('active');
    
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', !isOpen);
    hamburger.setAttribute('aria-label', !isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
}

