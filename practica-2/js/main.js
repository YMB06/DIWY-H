// Detectar sección activa
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('nav__link--active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('nav__link--active');
        }
    });
}

// Ejecutar al cargar y al hacer scroll
window.addEventListener('scroll', updateActiveSection);
window.addEventListener('load', updateActiveSection);