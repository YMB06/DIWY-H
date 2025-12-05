function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

function expandArticle(event) {
    event.preventDefault();
    const article = event.target.closest('.blog-post');
    const readMoreBtn = event.target;
    
    if (article.classList.contains('expanded')) {
        article.classList.remove('expanded');
        readMoreBtn.textContent = 'Leer más';
    } else {
        article.classList.add('expanded');
        readMoreBtn.textContent = 'Leer menos';
    }
}

// Añadir event listeners cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', expandArticle);
    });
});