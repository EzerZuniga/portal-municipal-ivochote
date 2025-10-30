// Utilidades generales
export class Utils {
    // Formatear fecha
    static formatDate(date, format = 'es-PE') {
        return new Date(date).toLocaleDateString(format, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Capitalizar texto
    static capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    // Validar email
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Validar teléfono peruano
    static validatePhone(phone) {
        const re = /^9\d{8}$/;
        return re.test(phone.replace(/\D/g, ''));
    }

    // Debounce function
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Obtener parámetros URL
    static getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
    }

    // Scroll suave
    static smoothScrollTo(element, offset = 0) {
        const target = typeof element === 'string' ? document.querySelector(element) : element;
        if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Copiar al portapapeles
    static async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback para navegadores antiguos
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        }
    }
}

// Alert Manager
export class AlertManager {
    static show(message, type = 'info', title = '', duration = 5000) {
        const container = document.getElementById('alert-container');
        const template = document.getElementById('alert-template');
        
        if (!container || !template) {
            console.warn('Alert container o template no encontrado');
            return;
        }

        const alert = template.content.cloneNode(true);
        const alertElement = alert.querySelector('.alert');
        const icon = alert.querySelector('.alert-icon i');
        const alertTitle = alert.querySelector('.alert-title');
        const alertMessage = alert.querySelector('.alert-message');
        const closeBtn = alert.querySelector('.alert-close');

        // Configurar tipo
        const types = {
            success: { 
                color: 'border-green-500 bg-green-50 text-green-800', 
                icon: 'fa-check-circle' 
            },
            error: { 
                color: 'border-red-500 bg-red-50 text-red-800', 
                icon: 'fa-exclamation-circle' 
            },
            warning: { 
                color: 'border-yellow-500 bg-yellow-50 text-yellow-800', 
                icon: 'fa-exclamation-triangle' 
            },
            info: { 
                color: 'border-blue-500 bg-blue-50 text-blue-800', 
                icon: 'fa-info-circle' 
            }
        };

        const config = types[type] || types.info;
        alertElement.classList.add(...config.color.split(' '));
        icon.className = `fas ${config.icon} text-lg`;

        // Configurar contenido
        alertTitle.textContent = title || Utils.capitalize(type);
        alertMessage.textContent = message;

        // Configurar cierre
        closeBtn.onclick = () => this.close(alertElement);
        if (duration > 0) {
            setTimeout(() => this.close(alertElement), duration);
        }

        container.appendChild(alert);
        
        // Animación de entrada
        setTimeout(() => {
            alertElement.classList.remove('translate-x-full');
        }, 50);
    }

    static close(alertElement) {
        alertElement.classList.add('translate-x-full');
        setTimeout(() => {
            if (alertElement.parentNode) {
                alertElement.parentNode.removeChild(alertElement);
            }
        }, 300);
    }
}

// Loading Manager
export class LoadingManager {
    static show(message = 'Cargando...') {
        let spinner = document.getElementById('loading-spinner');
        if (!spinner) {
            spinner = document.createElement('div');
            spinner.id = 'loading-spinner';
            spinner.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            spinner.innerHTML = `
                <div class="bg-white rounded-2xl p-8 shadow-2xl text-center">
                    <div class="w-16 h-16 mx-auto mb-4 relative">
                        <div class="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                        <div class="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p class="text-gray-700 font-semibold">${message}</p>
                </div>
            `;
            document.body.appendChild(spinner);
        } else {
            spinner.classList.remove('hidden');
        }
    }

    static hide() {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.classList.add('hidden');
        }
    }
}