import { ModalManager } from './modal.js';
import { Utils, AlertManager, LoadingManager } from './utils.js';

// Component Loader
class ComponentLoader {
    static async load(containerId, componentPath) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = html;
            }
            return true;
        } catch (error) {
            console.error(`Error loading ${componentPath}:`, error);
            return false;
        }
    }

    static async loadComponents(components) {
        const promises = components.map(comp => this.load(comp.id, comp.path));
        return Promise.all(promises);
    }
}

// Global App Initialization
class MunicipalApp {
    static async init() {
        // Cargar componentes comunes
        await this.loadCommonComponents();
        
        // Inicializar funcionalidades
        this.initNavigation();
        this.initSwiper();
        this.initCounters();
        this.initBackToTop();
        this.initSmoothScroll();
        
        console.log('Municipal App initialized');
    }

    static async loadCommonComponents() {
        const components = [
            { id: 'header-container', path: '/src/components/navbar.html' },
            { id: 'footer-container', path: '/src/components/footer.html' }
        ];

        await ComponentLoader.loadComponents(components);
    }

    static initNavigation() {
        // Header scroll effect
        let lastScroll = 0;
        const header = document.getElementById('header');

        if (header) {
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    header.classList.add('bg-white/95', 'backdrop-blur-sm');
                    header.classList.remove('bg-transparent');
                } else {
                    header.classList.remove('bg-white/95', 'backdrop-blur-sm');
                    header.classList.add('bg-transparent');
                }
                
                lastScroll = currentScroll;
            });
        }

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        const mobileMenuClose = document.getElementById('mobile-menu-close');

        if (mobileMenuBtn && mobileMenu) {
            const toggleMobileMenu = () => {
                mobileMenuOverlay.classList.toggle('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 
                    mobileMenuBtn.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
                );
            };

            mobileMenuBtn.addEventListener('click', toggleMobileMenu);
            if (mobileMenuClose) {
                mobileMenuClose.addEventListener('click', toggleMobileMenu);
            }
            if (mobileMenuOverlay) {
                mobileMenuOverlay.addEventListener('click', (e) => {
                    if (e.target === mobileMenuOverlay) {
                        toggleMobileMenu();
                    }
                });
            }
        }
    }

    static initSwiper() {
        if (typeof Swiper !== 'undefined' && document.querySelector('.hero-swiper')) {
            new Swiper('.hero-swiper', {
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                effect: 'fade',
                fadeEffect: {
                    crossFade: true,
                },
            });
        }
    }

    static initCounters() {
        const animateCounters = () => {
            const counters = document.querySelectorAll('[data-counter]');
            
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.counter);
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    }
                }, 16);
            });
        };

        // Trigger counter animation when section is visible
        const statsSection = document.querySelector('.py-16.bg-gradient-to-r.from-blue-600');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(statsSection);
        }
    }

    static initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');

        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('scale-100');
                    backToTopBtn.classList.remove('scale-0');
                } else {
                    backToTopBtn.classList.add('scale-0');
                    backToTopBtn.classList.remove('scale-100');
                }
            });

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    static initSmoothScroll() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    Utils.smoothScrollTo(target, 100);
                }
            });
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    MunicipalApp.init();
});

// Make managers globally available
window.ModalManager = ModalManager;
window.AlertManager = AlertManager;
window.LoadingManager = LoadingManager;
window.Utils = Utils;