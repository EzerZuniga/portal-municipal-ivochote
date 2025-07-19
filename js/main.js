/**
 * Funciones principales para el sitio web de la Municipalidad de Ivochote
 * Autor: Tu Instagram @tu_usuario
 * Version: 1.0.0
 */

// Configuración global
const CONFIG = {
    site: {
        name: 'Municipalidad de Ivochote',
        author: '@tu_usuario',
        version: '1.0.0'
    },
    api: {
        baseUrl: 'https://api.municipalidad-ivochote.pe',
        timeout: 5000
    },
    animations: {
        duration: 300,
        easing: 'ease-in-out'
    },
    breakpoints: {
        mobile: 768,
        tablet: 1024,
        desktop: 1200
    }
};

// Estado global de la aplicación
const AppState = {
    isLoading: false,
    currentPage: '',
    user: null,
    darkMode: localStorage.getItem('darkMode') === 'true',
    mobileMenuOpen: false,
    notifications: []
};

// Inicialización principal
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Inicializa toda la aplicación
 */
function initializeApp() {
    console.log(`%c🏛️ Municipalidad de Ivochote v${CONFIG.site.version}`, 'color: #1e40af; font-weight: bold; font-size: 16px;');
    console.log(`%cDesarrollado por ${CONFIG.site.author}`, 'color: #6b7280; font-size: 12px;');
    
    // Configurar página actual
    setCurrentPage();
    
    // Inicializar componentes base
    initializeNavigation();
    initializeScrollEffects();
    initializeFormValidation();
    initializeLazyLoading();
    initializeAccessibility();
    initializePerformanceOptimizations();
    
    // Aplicar modo oscuro si está activado
    if (AppState.darkMode) {
        document.documentElement.classList.add('dark');
    }
    
    // Inicializar componentes específicos según la página
    initializePageSpecificComponents();
    
    // Mostrar mensaje de bienvenida después de la carga
    setTimeout(() => {
        showWelcomeMessage();
    }, 1000);
}

/**
 * Establece la página actual basada en la URL
 */
function setCurrentPage() {
    const path = window.location.pathname;
    const fileName = path.split('/').pop() || 'index.html';
    AppState.currentPage = fileName.replace('.html', '');
    
    // Marcar enlace activo en navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href')?.includes(fileName)) {
            link.classList.add('active');
        }
    });
}

/**
 * Inicializa la navegación principal
 */
function initializeNavigation() {
    const navbar = document.querySelector('.navbar-municipal');
    const mobileToggle = document.querySelector('[data-mobile-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    
    // Toggle del menú móvil
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
    
    // Efectos de scroll en navbar
    if (navbar) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', throttle(() => {
            const currentScrollY = window.scrollY;
            
            // Agregar clase scrolled
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Ocultar/mostrar navbar en scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        }, 100));
    }
    
    // Enlaces suaves
    initializeSmoothScrolling();
}

/**
 * Inicializa el scroll suave para enlaces internos
 */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Offset para navbar fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                closeMobileMenu();
            }
        });
    });
}

/**
 * Controla el menú móvil
 */
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const toggleIcon = document.querySelector('[data-mobile-toggle] i');
    
    AppState.mobileMenuOpen = !AppState.mobileMenuOpen;
    
    if (AppState.mobileMenuOpen) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('block');
        toggleIcon.className = 'fas fa-times';
        document.body.classList.add('no-scroll');
    } else {
        closeMobileMenu();
    }
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const toggleIcon = document.querySelector('[data-mobile-toggle] i');
    
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('block');
    }
    
    if (toggleIcon) {
        toggleIcon.className = 'fas fa-bars';
    }
    
    AppState.mobileMenuOpen = false;
    document.body.classList.remove('no-scroll');
}

/**
 * Inicializa efectos de scroll y animaciones
 */
function initializeScrollEffects() {
    // Intersection Observer para animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Animación especial para contadores
                if (entry.target.hasAttribute('data-counter')) {
                    animateCounter(entry.target);
                }
                
                // Animación especial para progress bars
                if (entry.target.classList.contains('progress-fill')) {
                    animateProgressBar(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos que deben animarse
    document.querySelectorAll('.service-card, .authority-card, .news-card, .project-item, [data-counter], .progress-fill').forEach(el => {
        observer.observe(el);
    });
    
    // Parallax suave para hero sections
    const heroSections = document.querySelectorAll('.hero-municipal');
    if (heroSections.length > 0) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroSections.forEach(hero => {
                hero.style.transform = `translateY(${rate}px)`;
            });
        }, 16));
    }
}

/**
 * Anima contadores numéricos
 */
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-counter'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString('es-PE');
    }, 16);
}

/**
 * Anima barras de progreso
 */
function animateProgressBar(element) {
    const targetWidth = element.getAttribute('data-progress') || '0%';
    element.style.width = '0%';
    
    setTimeout(() => {
        element.style.width = targetWidth;
    }, 200);
}

/**
 * Inicializa validación de formularios
 */
function initializeFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
        
        // Validación en tiempo real
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    });
}

/**
 * Maneja el envío de formularios
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Validar todos los campos
    const isValid = validateForm(form);
    if (!isValid) {
        showNotification('Por favor, corrija los errores en el formulario', 'error');
        return;
    }
    
    // Mostrar estado de carga
    setLoadingState(submitButton, true);
    
    try {
        // Simular envío de formulario (en producción conectar con backend)
        await simulateFormSubmission(formData);
        
        showNotification('Formulario enviado correctamente', 'success');
        form.reset();
        
        // Redireccionar si es necesario
        const redirectUrl = form.getAttribute('data-redirect');
        if (redirectUrl) {
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 1500);
        }
        
    } catch (error) {
        console.error('Error al enviar formulario:', error);
        showNotification('Error al enviar el formulario. Intente nuevamente.', 'error');
    } finally {
        setLoadingState(submitButton, false);
    }
}

/**
 * Valida un formulario completo
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Valida un campo individual
 */
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    
    clearFieldError(field);
    
    // Validaciones básicas
    if (required && !value) {
        showFieldError(field, 'Este campo es obligatorio');
        return false;
    }
    
    if (value) {
        // Validación de email
        if (type === 'email' && !isValidEmail(value)) {
            showFieldError(field, 'Ingrese un email válido');
            return false;
        }
        
        // Validación de teléfono
        if (type === 'tel' && !isValidPhone(value)) {
            showFieldError(field, 'Ingrese un teléfono válido');
            return false;
        }
        
        // Validación de longitud mínima
        const minLength = field.getAttribute('minlength');
        if (minLength && value.length < parseInt(minLength)) {
            showFieldError(field, `Mínimo ${minLength} caracteres`);
            return false;
        }
    }
    
    return true;
}

/**
 * Muestra error en un campo
 */
function showFieldError(field, message) {
    field.classList.add('border-red-500');
    
    let errorElement = field.parentNode.querySelector('.form-error');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'form-error text-red-600 text-sm mt-1 block';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

/**
 * Limpia error de un campo
 */
function clearFieldError(field) {
    field.classList.remove('border-red-500');
    
    const errorElement = field.parentNode.querySelector('.form-error');
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Inicializa lazy loading para imágenes
 */
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        img.classList.remove('opacity-0');
                        img.classList.add('opacity-100');
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * Mejoras de accesibilidad
 */
function initializeAccessibility() {
    // Navegación por teclado
    document.addEventListener('keydown', (e) => {
        // Escape para cerrar menús
        if (e.key === 'Escape') {
            closeMobileMenu();
            closeAllModals();
        }
        
        // Enter para activar botones
        if (e.key === 'Enter' && e.target.getAttribute('role') === 'button') {
            e.target.click();
        }
    });
    
    // Skip links para lectores de pantalla
    addSkipLinks();
    
    // Mejorar contraste en modo de alto contraste
    if (window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }
    
    // Respetar preferencias de movimiento reducido
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
}

/**
 * Agrega enlaces de salto para accesibilidad
 */
function addSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded';
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

/**
 * Optimizaciones de rendimiento
 */
function initializePerformanceOptimizations() {
    // Precargar páginas importantes
    const importantPages = ['servicios.html', 'autoridades.html', 'contacto.html'];
    importantPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
    });
    
    // Comprimir imágenes automáticamente
    compressImages();
    
    // Implementar service worker para caché
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('Service Worker registration failed:', err);
        });
    }
}

/**
 * Comprime imágenes grandes automáticamente
 */
function compressImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            if (this.naturalWidth > 1920) {
                // Sugerir optimización para imágenes muy grandes
                console.warn(`Imagen ${this.src} es muy grande (${this.naturalWidth}px). Considere optimizarla.`);
            }
        });
    });
}

/**
 * Inicializa componentes específicos de cada página
 */
function initializePageSpecificComponents() {
    switch (AppState.currentPage) {
        case 'index':
            initializeHomePage();
            break;
        case 'galeria':
            initializeGallery();
            break;
        case 'contacto':
            initializeContactPage();
            break;
        case 'transparencia':
            initializeTransparencyPage();
            break;
        case 'noticias':
            initializeNewsPage();
            break;
    }
}

/**
 * Inicializa componentes de la página principal
 */
function initializeHomePage() {
    // Carousel de noticias destacadas
    initializeNewsCarousel();
    
    // Contador de visitantes
    updateVisitorCounter();
    
    // Widget del clima
    initializeWeatherWidget();
}

/**
 * Inicializa galería con lightbox
 */
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', openLightbox);
    });
}

/**
 * Inicializa página de contacto
 */
function initializeContactPage() {
    // Inicializar mapa
    initializeMap();
    
    // Validación especial para formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

/**
 * Sistema de notificaciones
 */
function showNotification(message, type = 'info', duration = 5000) {
    const notification = createNotificationElement(message, type);
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto-remover
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
    
    AppState.notifications.push(notification);
}

/**
 * Crea elemento de notificación
 */
function createNotificationElement(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    return notification;
}

/**
 * Obtiene icono para tipo de notificación
 */
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || icons.info;
}

/**
 * Utilidades de rendimiento
 */
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Utilidades de validación
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^(\+51|51)?[9][0-9]{8}$/;
    return re.test(phone.replace(/\s/g, ''));
}

/**
 * Simula envío de formulario
 */
async function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simular éxito o error
            if (Math.random() > 0.1) {
                resolve({ success: true });
            } else {
                reject(new Error('Error simulado'));
            }
        }, 2000);
    });
}

/**
 * Estados de carga
 */
function setLoadingState(button, loading) {
    if (loading) {
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
    } else {
        button.disabled = false;
        button.innerHTML = button.getAttribute('data-original-text') || 'Enviar';
    }
}

/**
 * Cierra todos los modales abiertos
 */
function closeAllModals() {
    document.querySelectorAll('.modal.show').forEach(modal => {
        modal.classList.remove('show');
    });
}

/**
 * Mensaje de bienvenida
 */
function showWelcomeMessage() {
    const isFirstVisit = !localStorage.getItem('hasVisited');
    
    if (isFirstVisit) {
        localStorage.setItem('hasVisited', 'true');
        showNotification('¡Bienvenido al sitio web oficial de la Municipalidad de Ivochote!', 'info', 8000);
    }
}

/**
 * Actualiza contador de visitantes
 */
function updateVisitorCounter() {
    const counter = document.querySelector('[data-visitor-counter]');
    if (counter) {
        const visits = parseInt(localStorage.getItem('visitCount') || '0') + 1;
        localStorage.setItem('visitCount', visits.toString());
        counter.textContent = visits.toLocaleString('es-PE');
    }
}

/**
 * Exportar funciones públicas
 */
window.MunicipalidadApp = {
    showNotification,
    toggleMobileMenu,
    closeMobileMenu,
    validateField,
    setLoadingState,
    throttle,
    debounce,
    CONFIG,
    AppState
};

// Debug en desarrollo
if (window.location.hostname === 'localhost') {
    window.DEBUG = {
        AppState,
        CONFIG,
        showNotification,
        toggleMobileMenu
    };
    console.log('🔧 Modo debug activo. Usa window.DEBUG para acceder a herramientas de desarrollo.');
}