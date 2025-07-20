// Configuración de animaciones con AOS
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS si está disponible
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // Animación para elementos con clase .animate-on-scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar
    
    // Efecto hover para tarjetas
    const cards = document.querySelectorAll('.card-hover-effect');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.card-content').classList.add('translate-y-0');
            this.querySelector('.card-content').classList.remove('translate-y-full');
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.card-content').classList.remove('translate-y-0');
            this.querySelector('.card-content').classList.add('translate-y-full');
        });
    });
    
    // Efecto de carga para imágenes
    const lazyLoadImages = function() {
        const lazyImages = document.querySelectorAll('img.lazy');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    };
    
    lazyLoadImages();
});