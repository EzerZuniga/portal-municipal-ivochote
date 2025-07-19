/**
 * Sistema de modo oscuro para la Municipalidad de Ivochote
 * Autor: Tu Instagram @tu_usuario
 * Funcionalidades: Toggle automático, detección de preferencias del sistema, persistencia
 */

class DarkModeManager {
    constructor() {
        this.isDarkMode = false;
        this.toggleButton = null;
        this.storageKey = 'darkMode';
        this.transitions = {
            duration: 300,
            easing: 'ease-in-out'
        };
        
        this.init();
    }

    /**
     * Inicializa el sistema de modo oscuro
     */
    init() {
        this.createToggleButton();
        this.loadThemePreference();
        this.setupEventListeners();
        this.setupSystemPreferenceDetection();
        this.addTransitionStyles();
        
        console.log('🌙 Sistema de modo oscuro inicializado');
    }

    /**
     * Crea el botón de toggle para el modo oscuro
     */
    createToggleButton() {
        // Buscar botón existente o crear uno nuevo
        this.toggleButton = document.querySelector('[data-dark-mode-toggle]');
        
        if (!this.toggleButton) {
            this.toggleButton = document.createElement('button');
            this.toggleButton.setAttribute('data-dark-mode-toggle', '');
            this.toggleButton.className = 'dark-mode-toggle fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110';
            this.toggleButton.setAttribute('aria-label', 'Alternar modo oscuro');
            this.toggleButton.innerHTML = this.getToggleIcon();
            
            // Agregar al DOM
            document.body.appendChild(this.toggleButton);
        }
        
        this.updateToggleButton();
    }

    /**
     * Genera el icono para el botón de toggle
     */
    getToggleIcon() {
        return `
            <span class="sun-icon ${this.isDarkMode ? 'hidden' : 'block'}">
                <svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 18a6 6 0 100-12 6 6 0 000 12zM12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM12 20a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4.93 4.93a1 1 0 011.41 0l.71.71a1 1 0 11-1.41 1.41l-.71-.71a1 1 0 010-1.41zM17.66 17.66a1 1 0 011.41 0l.71.71a1 1 0 11-1.41 1.41l-.71-.71a1 1 0 010-1.41zM2 12a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zM20 12a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM6.34 17.66a1 1 0 010-1.41l.71-.71a1 1 0 111.41 1.41l-.71.71a1 1 0 01-1.41 0zM19.07 4.93a1 1 0 010 1.41l-.71.71a1 1 0 11-1.41-1.41l.71-.71a1 1 0 011.41 0z"/>
                </svg>
            </span>
            <span class="moon-icon ${this.isDarkMode ? 'block' : 'hidden'}">
                <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
            </span>
        `;
    }

    /**
     * Carga la preferencia de tema guardada
     */
    loadThemePreference() {
        // Prioridad: localStorage > preferencia del sistema > light por defecto
        const savedTheme = localStorage.getItem(this.storageKey);
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme !== null) {
            this.isDarkMode = savedTheme === 'true';
        } else {
            this.isDarkMode = systemPrefersDark;
        }
        
        this.applyTheme();
    }

    /**
     * Configura los event listeners
     */
    setupEventListeners() {
        // Click en el botón de toggle
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => this.toggle());
        }
        
        // Atajo de teclado (Ctrl/Cmd + Shift + D)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggle();
            }
        });
        
        // Eventos personalizados
        document.addEventListener('theme-change-request', (e) => {
            const { theme } = e.detail;
            if (theme === 'dark' || theme === 'light') {
                this.setTheme(theme === 'dark');
            }
        });
    }

    /**
     * Detecta cambios en las preferencias del sistema
     */
    setupSystemPreferenceDetection() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', (e) => {
            // Solo aplicar si no hay preferencia guardada manualmente
            if (localStorage.getItem(this.storageKey) === null) {
                this.isDarkMode = e.matches;
                this.applyTheme();
                this.updateToggleButton();
                this.showThemeChangeNotification();
            }
        });
    }

    /**
     * Agrega estilos de transición suaves
     */
    addTransitionStyles() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                transition: background-color ${this.transitions.duration}ms ${this.transitions.easing},
                           border-color ${this.transitions.duration}ms ${this.transitions.easing},
                           color ${this.transitions.duration}ms ${this.transitions.easing};
            }
            
            .dark-mode-toggle {
                transition: all ${this.transitions.duration}ms ${this.transitions.easing};
            }
            
            .dark-mode-toggle:hover {
                transform: scale(1.1) rotate(15deg);
            }
            
            .sun-icon, .moon-icon {
                transition: all ${this.transitions.duration}ms ${this.transitions.easing};
            }
            
            /* Prevenir transiciones durante la carga inicial */
            .no-transition * {
                transition: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Alterna entre modo claro y oscuro
     */
    toggle() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
        this.savePreference();
        this.updateToggleButton();
        this.showThemeChangeNotification();
        this.triggerThemeChangeEvent();
        
        // Analytics (opcional)
        this.trackThemeChange();
    }

    /**
     * Establece un tema específico
     */
    setTheme(isDark) {
        this.isDarkMode = isDark;
        this.applyTheme();
        this.savePreference();
        this.updateToggleButton();
        this.triggerThemeChangeEvent();
    }

    /**
     * Aplica el tema actual al DOM
     */
    applyTheme() {
        const html = document.documentElement;
        const body = document.body;
        
        // Agregar clase temporal para prevenir transiciones durante el cambio
        body.classList.add('no-transition');
        
        if (this.isDarkMode) {
            html.classList.add('dark');
            body.classList.add('dark-mode');
            this.updateMetaThemeColor('#1f2937'); // gray-800
        } else {
            html.classList.remove('dark');
            body.classList.remove('dark-mode');
            this.updateMetaThemeColor('#ffffff'); // white
        }
        
        // Remover clase temporal después de un frame
        requestAnimationFrame(() => {
            body.classList.remove('no-transition');
        });
        
        // Actualizar elementos específicos
        this.updateSpecificElements();
    }

    /**
     * Actualiza elementos específicos que requieren cambios manuales
     */
    updateSpecificElements() {
        // Actualizar mapas, iframes, etc.
        const maps = document.querySelectorAll('iframe[src*="google.com/maps"]');
        maps.forEach(map => {
            if (this.isDarkMode) {
                map.style.filter = 'invert(0.9) hue-rotate(180deg)';
            } else {
                map.style.filter = 'none';
            }
        });
        
        // Actualizar gráficos o charts si existen
        const charts = document.querySelectorAll('[data-chart]');
        charts.forEach(chart => {
            // Trigger chart theme update
            const event = new CustomEvent('chart-theme-update', {
                detail: { isDarkMode: this.isDarkMode }
            });
            chart.dispatchEvent(event);
        });
        
        // Actualizar favicon si tienes versión dark
        this.updateFavicon();
    }

    /**
     * Actualiza el color del tema en la meta tag
     */
    updateMetaThemeColor(color) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        metaThemeColor.content = color;
    }

    /**
     * Actualiza el favicon según el tema
     */
    updateFavicon() {
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            const basePath = favicon.href.split('/').slice(0, -1).join('/');
            const faviconName = this.isDarkMode ? 'favicon-dark.ico' : 'favicon.ico';
            
            // Solo actualizar si existe la versión dark
            const testImage = new Image();
            testImage.onload = () => {
                favicon.href = `${basePath}/${faviconName}`;
            };
            testImage.src = `${basePath}/${faviconName}`;
        }
    }

    /**
     * Actualiza la apariencia del botón de toggle
     */
    updateToggleButton() {
        if (!this.toggleButton) return;
        
        const sunIcon = this.toggleButton.querySelector('.sun-icon');
        const moonIcon = this.toggleButton.querySelector('.moon-icon');
        
        if (sunIcon && moonIcon) {
            if (this.isDarkMode) {
                sunIcon.classList.add('hidden');
                sunIcon.classList.remove('block');
                moonIcon.classList.remove('hidden');
                moonIcon.classList.add('block');
            } else {
                sunIcon.classList.remove('hidden');
                sunIcon.classList.add('block');
                moonIcon.classList.add('hidden');
                moonIcon.classList.remove('block');
            }
        }
        
        // Actualizar aria-label
        const label = this.isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
        this.toggleButton.setAttribute('aria-label', label);
    }

    /**
     * Guarda la preferencia en localStorage
     */
    savePreference() {
        localStorage.setItem(this.storageKey, this.isDarkMode.toString());
    }

    /**
     * Muestra notificación del cambio de tema
     */
    showThemeChangeNotification() {
        const message = this.isDarkMode ? 
            '🌙 Modo oscuro activado' : 
            '☀️ Modo claro activado';
        
        // Solo mostrar si la función showNotification está disponible
        if (window.MunicipalidadApp && window.MunicipalidadApp.showNotification) {
            window.MunicipalidadApp.showNotification(message, 'info', 2000);
        }
    }

    /**
     * Dispara evento personalizado de cambio de tema
     */
    triggerThemeChangeEvent() {
        const event = new CustomEvent('theme-changed', {
            detail: {
                isDarkMode: this.isDarkMode,
                theme: this.isDarkMode ? 'dark' : 'light'
            }
        });
        document.dispatchEvent(event);
    }

    /**
     * Tracking de analytics (opcional)
     */
    trackThemeChange() {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'theme_change', {
                theme: this.isDarkMode ? 'dark' : 'light'
            });
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'CustomEvent', {
                event_name: 'theme_change',
                theme: this.isDarkMode ? 'dark' : 'light'
            });
        }
    }

    /**
     * Obtiene el estado actual del tema
     */
    getCurrentTheme() {
        return {
            isDarkMode: this.isDarkMode,
            theme: this.isDarkMode ? 'dark' : 'light'
        };
    }

    /**
     * Resetea las preferencias a los valores por defecto
     */
    reset() {
        localStorage.removeItem(this.storageKey);
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode = systemPrefersDark;
        this.applyTheme();
        this.updateToggleButton();
    }

    /**
     * Programa cambio automático según la hora del día
     */
    setupAutoSchedule() {
        const now = new Date();
        const hour = now.getHours();
        
        // Activar modo oscuro entre 7 PM y 7 AM
        const shouldBeDark = hour >= 19 || hour < 7;
        
        if (shouldBeDark !== this.isDarkMode) {
            this.setTheme(shouldBeDark);
            this.showThemeChangeNotification();
        }
        
        // Programar siguiente verificación
        setTimeout(() => this.setupAutoSchedule(), 60 * 60 * 1000); // Cada hora
    }

    /**
     * Destructor para limpiar event listeners
     */
    destroy() {
        if (this.toggleButton) {
            this.toggleButton.removeEventListener('click', this.toggle);
            if (this.toggleButton.parentNode) {
                this.toggleButton.parentNode.removeChild(this.toggleButton);
            }
        }
        
        document.removeEventListener('keydown', this.handleKeydown);
        document.removeEventListener('theme-change-request', this.handleThemeChangeRequest);
    }
}

// API pública para el modo oscuro
class PublicDarkModeAPI {
    constructor(manager) {
        this.manager = manager;
    }

    toggle() {
        this.manager.toggle();
    }

    setTheme(theme) {
        const isDark = theme === 'dark';
        this.manager.setTheme(isDark);
    }

    getCurrentTheme() {
        return this.manager.getCurrentTheme();
    }

    reset() {
        this.manager.reset();
    }

    enableAutoSchedule() {
        this.manager.setupAutoSchedule();
    }

    on(event, callback) {
        document.addEventListener(`theme-${event}`, callback);
    }

    off(event, callback) {
        document.removeEventListener(`theme-${event}`, callback);
    }
}

// Inicialización automática
let darkModeManager;
let darkModeAPI;

document.addEventListener('DOMContentLoaded', () => {
    darkModeManager = new DarkModeManager();
    darkModeAPI = new PublicDarkModeAPI(darkModeManager);
    
    // Exponer API global
    window.DarkMode = darkModeAPI;
    
    // Para depuración
    if (window.location.hostname === 'localhost') {
        window.DEBUG = window.DEBUG || {};
        window.DEBUG.darkMode = darkModeManager;
    }
});

// Funciones de utilidad
function requestThemeChange(theme) {
    const event = new CustomEvent('theme-change-request', {
        detail: { theme }
    });
    document.dispatchEvent(event);
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DarkModeManager, PublicDarkModeAPI };
}