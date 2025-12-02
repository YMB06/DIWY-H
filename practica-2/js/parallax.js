// Efecto parallax con JavaScript para mayor control
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax para video del hero
    const heroVideoBg = document.querySelector('.hero__video-bg');
    if (heroVideoBg) {
        const speed = scrolled * 0.5;
        heroVideoBg.style.transform = `translateY(${speed}px) scale(1.1)`;
    }
    
    // Parallax para video section
    const videoSection = document.querySelector('.video__bg');
    if (videoSection) {
        const speed = scrolled * 0.3;
        videoSection.style.transform = `translateY(${speed}px) scale(1.05)`;
    }
    
    // Parallax para video de bootstrap
    const heroVideoBoot = document.querySelector('.hero-video-bg');
    if (heroVideoBoot && !heroVideoBoot.classList.contains('hero__video-bg')) {
        const speed = scrolled * 0.4;
        heroVideoBoot.style.transform = `translateY(${speed}px) scale(1.08)`;
    }
});

// Efecto parallax al mover el mouse
document.addEventListener('mousemove', (e) => {
    const videoElements = document.querySelectorAll('[class*="video-bg"]');
    const moveX = (e.clientX / window.innerWidth) * 2 - 1;
    const moveY = (e.clientY / window.innerHeight) * 2 - 1;
    
    videoElements.forEach(el => {
        const speed = 5;
        el.style.backgroundPosition = `${moveX * speed}px ${moveY * speed}px`;
    });
});