export class ModalManager {
    static show(title, content, buttons = []) {
        const overlay = document.getElementById('modal-overlay');
        const modalContent = document.getElementById('modal-content');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const modalFooter = document.getElementById('modal-footer');

        if (!overlay) {
            console.error('Modal overlay no encontrado');
            return;
        }

        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        
        // Configurar botones
        modalFooter.innerHTML = '';
        buttons.forEach(btn => {
            const button = document.createElement('button');
            button.className = `px-4 py-2 rounded-lg font-semibold transition-colors ${btn.classes || 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`;
            button.textContent = btn.text;
            button.onclick = btn.action;
            modalFooter.appendChild(button);
        });

        // Mostrar modal
        overlay.classList.remove('hidden');
        setTimeout(() => {
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }, 50);

        // Agregar event listener para ESC
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                ModalManager.hide();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    static hide() {
        const overlay = document.getElementById('modal-overlay');
        const modalContent = document.getElementById('modal-content');
        
        if (!overlay) return;

        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 300);
    }

    static confirm(title, message, confirmText = 'Confirmar', cancelText = 'Cancelar') {
        return new Promise((resolve) => {
            const content = `
                <p class="text-gray-600">${message}</p>
            `;
            
            const buttons = [
                {
                    text: cancelText,
                    classes: 'bg-gray-300 hover:bg-gray-400 text-gray-800',
                    action: () => {
                        ModalManager.hide();
                        resolve(false);
                    }
                },
                {
                    text: confirmText,
                    classes: 'bg-blue-600 hover:bg-blue-700 text-white',
                    action: () => {
                        ModalManager.hide();
                        resolve(true);
                    }
                }
            ];
            
            ModalManager.show(title, content, buttons);
        });
    }
}

// Inicializar eventos del modal
document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    
    if (modalOverlay && modalClose) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) ModalManager.hide();
        });
        modalClose.addEventListener('click', () => ModalManager.hide());
    }
});