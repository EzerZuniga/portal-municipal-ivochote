// Component Loader
export async function loadComponent(containerId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
        
        // Ejecutar scripts dentro del componente
        const scripts = document.getElementById(containerId).getElementsByTagName('script');
        for (let script of scripts) {
            eval(script.innerHTML);
        }
        
        return true;
    } catch (error) {
        console.error(`Error cargando ${componentPath}:`, error);
        return false;
    }
}

// Cargar todos los componentes
export async function loadAllComponents() {
    const components = [
        { id: 'header-container', path: '/src/components/navbar.html' },
        { id: 'footer-container', path: '/src/components/footer.html' }
    ];

    const promises = components.map(comp => loadComponent(comp.id, comp.path));
    await Promise.all(promises);
}