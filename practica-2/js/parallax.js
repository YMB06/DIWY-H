// Efecto parallax con JavaScript para mayor control
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVideo = document.querySelector('.hero__video-bg');
    const videoSection = document.querySelector('.video__bg');
    
    if (heroVideo) {
        const speed = scrolled * 0.5;
        heroVideo.style.transform = `translateY(${speed}px) scale(1.1)`;
    }
    
    if (videoSection) {
        const speed = scrolled * 0.3;
        videoSection.style.transform = `translateY(${speed}px) scale(1.05)`;
    }
});