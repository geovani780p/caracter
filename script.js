/**
 * Buscador y Reemplazador de Texto
 * Aplicación web moderna para buscar y reemplazar texto con interfaz visual
 * Utiliza ECMAScript 6+ y programación orientada a objetos
 */

class TextSearchReplace {
    constructor() {
        this.elements = this.initializeElements();
        this.state = {
            originalText: '',
            searchTerm: '',
            replaceTerm: '',
            caseSensitive: false,
            wholeWord: false,
            matches: [],
            highlightedText: '',
            modifiedText: ''
        };
        this.bindEvents();
        this.updateUI();
    }

    /**
     * Inicializa y obtiene referencias a los elementos del DOM
     * @returns {Object} Objeto con referencias a elementos del DOM
     */
    initializeElements() {
        const elements = {
            inputText: document.getElementById('inputText'),
            searchTerm: document.getElementById('searchTerm'),
            replaceTerm: document.getElementById('replaceTerm'),
            caseSensitive: document.getElementById('caseSensitive'),
            wholeWord: document.getElementById('wholeWord'),
            searchBtn: document.getElementById('searchBtn'),
            replaceBtn: document.getElementById('replaceBtn'),
            clearBtn: document.getElementById('clearBtn'),
            copyBtn: document.getElementById('copyBtn'),
            matchCount: document.getElementById('matchCount'),
            highlightedText: document.getElementById('highlightedText'),
            modifiedText: document.getElementById('modifiedText')
        };

        // Verificar que todos los elementos existan
        Object.entries(elements).forEach(([key, element]) => {
            if (!element) {
                console.error(`Elemento no encontrado: ${key}`);
            }
        });

        return elements;
    }

    /**
     * Vincula eventos a los elementos del DOM
     */
    bindEvents() {
        // Eventos de entrada de texto
        this.elements.inputText.addEventListener('input', 
            this.debounce(() => this.handleTextChange(), 300)
        );
        
        this.elements.searchTerm.addEventListener('input', 
            this.debounce(() => this.handleSearchChange(), 300)
        );
        
        this.elements.replaceTerm.addEventListener('input', 
            () => this.handleReplaceChange()
        );

        // Eventos de opciones
        this.elements.caseSensitive.addEventListener('change', 
            () => this.handleOptionsChange()
        );
        
        this.elements.wholeWord.addEventListener('change', 
            () => this.handleOptionsChange()
        );

        // Eventos de botones
        this.elements.searchBtn.addEventListener('click', 
            () => this.performSearch()
        );
        
        this.elements.replaceBtn.addEventListener('click', 
            () => this.performReplace()
        );
        
        this.elements.clearBtn.addEventListener('click', 
            () => this.clearAll()
        );
        
        this.elements.copyBtn.addEventListener('click', 
            () => this.copyToClipboard()
        );

        // Eventos de teclado
        this.elements.searchTerm.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        this.elements.replaceTerm.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.performReplace();
            }
        });

        // Evento para detectar Ctrl+V en el textarea
        this.elements.inputText.addEventListener('paste', () => {
            setTimeout(() => this.handleTextChange(), 50);
        });
    }

    /**
     * Función de debounce para evitar múltiples ejecuciones
     * @param {Function} func - Función a ejecutar
     * @param {number} wait - Tiempo de espera en ms
     * @returns {Function} Función con debounce aplicado
     */
    debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    /**
     * Maneja cambios en el texto principal
     */
    handleTextChange() {
        this.state.originalText = this.elements.inputText.value;
        if (this.state.searchTerm) {
            this.performSearch();
        } else {
            this.updateUI();
        }
    }

    /**
     * Maneja cambios en el término de búsqueda
     */
    handleSearchChange() {
        this.state.searchTerm = this.elements.searchTerm.value;
        if (this.state.searchTerm && this.state.originalText) {
            this.performSearch();
        } else {
            this.clearResults();
        }
    }

    /**
     * Maneja cambios en el término de reemplazo
     */
    handleReplaceChange() {
        this.state.replaceTerm = this.elements.replaceTerm.value;
        if (this.state.matches.length > 0) {
            this.generateModifiedText();
        }
    }

    /**
     * Maneja cambios en las opciones de búsqueda
     */
    handleOptionsChange() {
        this.state.caseSensitive = this.elements.caseSensitive.checked;
        this.state.wholeWord = this.elements.wholeWord.checked;
        
        if (this.state.searchTerm && this.state.originalText) {
            this.performSearch();
        }
    }

    /**
     * Realiza la búsqueda de coincidencias
     */
    performSearch() {
        if (!this.state.originalText || !this.state.searchTerm) {
            this.clearResults();
            return;
        }

        try {
            this.state.matches = this.findMatches();
            this.generateHighlightedText();
            this.generateModifiedText();
            this.updateUI();
        } catch (error) {
            console.error('Error durante la búsqueda:', error);
            this.showError('Error durante la búsqueda. Verifica el texto y el término de búsqueda.');
        }
    }

    /**
     * Encuentra todas las coincidencias en el texto
     * @returns {Array} Array de objetos con información de las coincidencias
     */
    findMatches() {
        const matches = [];
        let searchText = this.state.originalText;
        let searchTerm = this.state.searchTerm;

        // Escapar caracteres especiales de regex
        const escapedSearchTerm = this.escapeRegExp(searchTerm);
        
        // Configurar flags de la expresión regular
        let flags = 'g';
        if (!this.state.caseSensitive) {
            flags += 'i';
            searchText = searchText.toLowerCase();
            searchTerm = searchTerm.toLowerCase();
        }

        // Construir patrón de búsqueda
        let pattern = escapedSearchTerm;
        if (this.state.wholeWord) {
            pattern = `\\b${pattern}\\b`;
        }

        const regex = new RegExp(pattern, flags);
        let match;

        // Buscar todas las coincidencias
        while ((match = regex.exec(this.state.originalText)) !== null) {
            matches.push({
                text: match[0],
                index: match.index,
                length: match[0].length
            });

            // Evitar bucle infinito con coincidencias de longitud 0
            if (match.index === regex.lastIndex) {
                regex.lastIndex++;
            }
        }

        return matches;
    }

    /**
     * Escapa caracteres especiales para uso en expresiones regulares
     * @param {string} string - Cadena a escapar
     * @returns {string} Cadena escapada
     */
    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Genera el texto con coincidencias resaltadas
     */
    generateHighlightedText() {
        if (this.state.matches.length === 0) {
            this.state.highlightedText = this.state.originalText;
            return;
        }

        let result = '';
        let lastIndex = 0;

        // Procesar cada coincidencia
        this.state.matches.forEach(match => {
            // Agregar texto antes de la coincidencia
            result += this.escapeHtml(this.state.originalText.slice(lastIndex, match.index));
            
            // Agregar coincidencia resaltada
            result += `<span class="highlight">${this.escapeHtml(match.text)}</span>`;
            
            lastIndex = match.index + match.length;
        });

        // Agregar texto restante
        result += this.escapeHtml(this.state.originalText.slice(lastIndex));
        
        this.state.highlightedText = result;
    }

    /**
     * Genera el texto modificado con reemplazos
     */
    generateModifiedText() {
        if (this.state.matches.length === 0 || !this.state.replaceTerm) {
            this.state.modifiedText = this.state.originalText;
            return;
        }

        let result = this.state.originalText;
        const replacements = [];

        // Calcular reemplazos (de atrás hacia adelante para mantener índices)
        this.state.matches.slice().reverse().forEach(match => {
            const before = result.slice(0, match.index);
            const after = result.slice(match.index + match.length);
            result = before + this.state.replaceTerm + after;
            
            replacements.unshift({
                index: match.index,
                original: match.text,
                replacement: this.state.replaceTerm
            });
        });

        this.state.modifiedText = result;
    }

    /**
     * Realiza el reemplazo y actualiza el texto original
     */
    performReplace() {
        if (this.state.matches.length === 0) {
            this.showMessage('No hay coincidencias para reemplazar.');
            return;
        }

        if (!this.state.replaceTerm && this.state.replaceTerm !== '') {
            this.showMessage('Ingresa el texto de reemplazo.');
            return;
        }

        // Actualizar el texto original con el modificado
        this.state.originalText = this.state.modifiedText;
        this.elements.inputText.value = this.state.modifiedText;

        // Limpiar búsqueda y mostrar resultado
        this.clearResults();
        this.showMessage(`Se reemplazaron ${this.state.matches.length} coincidencias.`);
        
        // Mostrar botón de copiar
        this.elements.copyBtn.style.display = 'inline-flex';
    }

    /**
     * Limpia todos los campos y resultados
     */
    clearAll() {
        this.elements.inputText.value = '';
        this.elements.searchTerm.value = '';
        this.elements.replaceTerm.value = '';
        this.elements.caseSensitive.checked = false;
        this.elements.wholeWord.checked = false;
        
        this.state = {
            originalText: '',
            searchTerm: '',
            replaceTerm: '',
            caseSensitive: false,
            wholeWord: false,
            matches: [],
            highlightedText: '',
            modifiedText: ''
        };

        this.updateUI();
        this.elements.copyBtn.style.display = 'none';
        this.showMessage('Todos los campos han sido limpiados.');
    }

    /**
     * Limpia solo los resultados de búsqueda
     */
    clearResults() {
        this.state.matches = [];
        this.state.highlightedText = this.state.originalText;
        this.state.modifiedText = this.state.originalText;
        this.updateUI();
    }

    /**
     * Copia el texto modificado al portapapeles
     */
    async copyToClipboard() {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(this.state.modifiedText);
            } else {
                // Fallback para navegadores más antiguos
                const textArea = document.createElement('textarea');
                textArea.value = this.state.modifiedText;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                textArea.remove();
            }
            
            this.showMessage('Texto copiado al portapapeles.');
            
            // Cambiar temporalmente el texto del botón
            const originalText = this.elements.copyBtn.innerHTML;
            this.elements.copyBtn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
            setTimeout(() => {
                this.elements.copyBtn.innerHTML = originalText;
            }, 2000);
            
        } catch (error) {
            console.error('Error al copiar:', error);
            this.showError('No se pudo copiar el texto. Intenta seleccionar y copiar manualmente.');
        }
    }

    /**
     * Actualiza la interfaz de usuario
     */
    updateUI() {
        // Actualizar contador de coincidencias
        this.elements.matchCount.textContent = this.state.matches.length;
        
        // Actualizar texto resaltado
        this.elements.highlightedText.innerHTML = this.state.highlightedText || 
            'El texto con coincidencias resaltadas aparecerá aquí...';
        
        // Actualizar texto modificado
        this.elements.modifiedText.textContent = this.state.modifiedText || 
            'El texto modificado aparecerá aquí...';

        // Habilitar/deshabilitar botón de reemplazo
        this.elements.replaceBtn.disabled = this.state.matches.length === 0;
        
        // Mostrar/ocultar botón de copiar
        if (this.state.modifiedText && this.state.modifiedText !== this.state.originalText) {
            this.elements.copyBtn.style.display = 'inline-flex';
        } else {
            this.elements.copyBtn.style.display = 'none';
        }
    }

    /**
     * Escapa caracteres HTML para prevenir XSS
     * @param {string} text - Texto a escapar
     * @returns {string} Texto escapado
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Muestra un mensaje temporal al usuario
     * @param {string} message - Mensaje a mostrar
     */
    showMessage(message) {
        this.showNotification(message, 'info');
    }

    /**
     * Muestra un error temporal al usuario
     * @param {string} message - Mensaje de error a mostrar
     */
    showError(message) {
        this.showNotification(message, 'error');
    }

    /**
     * Muestra una notificación temporal
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo de notificación ('info' o 'error')
     */
    showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;

        // Estilos de la notificación
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'error' ? '#ff6b6b' : '#667eea',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: '10000',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500',
            maxWidth: '300px',
            animation: 'slideInRight 0.3s ease-out'
        });

        // Agregar estilos de animación si no existen
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Agregar al DOM
        document.body.appendChild(notification);

        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);

        // Permitir cerrar con clic
        notification.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }

    /**
     * Obtiene estadísticas del texto
     * @returns {Object} Objeto con estadísticas del texto
     */
    getTextStats() {
        const text = this.state.originalText;
        return {
            characters: text.length,
            charactersNoSpaces: text.replace(/\s/g, '').length,
            words: text.trim() ? text.trim().split(/\s+/).length : 0,
            lines: text.split('\n').length,
            paragraphs: text.split(/\n\s*\n/).filter(p => p.trim()).length
        };
    }
}

/**
 * Funciones de utilidad globales
 */
const TextUtils = {
    /**
     * Detecta el idioma predominante del texto (simple heurística)
     * @param {string} text - Texto a analizar
     * @returns {string} Código de idioma detectado
     */
    detectLanguage(text) {
        const spanishWords = /\b(el|la|los|las|un|una|de|en|que|y|es|con|para|por|como|su|del|se|le|da|me|te|lo|yo|tu|él|ella|nosotros|ustedes|ellos|ellas)\b/gi;
        const englishWords = /\b(the|a|an|and|or|but|in|on|at|to|for|of|with|by|from|up|about|into|over|after|is|are|was|were|be|been|being|have|has|had|do|does|did|will|would|could|should|may|might|must|can|i|you|he|she|it|we|they|me|him|her|us|them|my|your|his|its|our|their)\b/gi;
        
        const spanishMatches = (text.match(spanishWords) || []).length;
        const englishMatches = (text.match(englishWords) || []).length;
        
        return spanishMatches > englishMatches ? 'es' : 'en';
    },

    /**
     * Formatea números con separadores de miles
     * @param {number} num - Número a formatear
     * @returns {string} Número formateado
     */
    formatNumber(num) {
        return new Intl.NumberFormat('es-ES').format(num);
    },

    /**
     * Capitaliza la primera letra de cada palabra
     * @param {string} text - Texto a capitalizar
     * @returns {string} Texto capitalizado
     */
    titleCase(text) {
        return text.replace(/\w\S*/g, (txt) => 
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
    }
};

/**
 * Inicialización de la aplicación
 */
document.addEventListener('DOMContentLoaded', () => {
    // Verificar compatibilidad del navegador
    if (!window.ES6Support) {
        // Test básico de soporte ES6
        try {
            eval('const testArrow = () => {}; const testTemplate = `test`; const testDestruct = {a, b} = {a:1, b:2};');
            window.ES6Support = true;
        } catch (e) {
            window.ES6Support = false;
        }
    }

    if (!window.ES6Support) {
        alert('Tu navegador no soporta todas las características necesarias. Por favor, actualiza tu navegador para una mejor experiencia.');
    }

    // Inicializar la aplicación
    try {
        window.textSearchReplace = new TextSearchReplace();
        console.log('Aplicación Text Search Replace inicializada correctamente');
        
        // Ejemplo de texto para demostración (opcional)
        const exampleText = `Bienvenido a la aplicación de búsqueda y reemplazo de texto.

Esta herramienta te permite buscar palabras, letras o caracteres específicos en tu texto y reemplazarlos de manera visual e interactiva.

Características principales:
- Búsqueda en tiempo real
- Resaltado visual de coincidencias
- Opciones de búsqueda avanzada
- Interfaz moderna y responsive
- Copia rápida del resultado

¡Prueba escribiendo algo de texto y busca una palabra!`;

        // Cargar texto de ejemplo si no hay contenido
        if (!window.textSearchReplace.elements.inputText.value.trim()) {
            // Comentado para que el usuario inicie con textarea vacío
            // window.textSearchReplace.elements.inputText.value = exampleText;
            // window.textSearchReplace.handleTextChange();
        }

    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
        alert('Ocurrió un error al cargar la aplicación. Por favor, recarga la página.');
    }
});

// Exportar para uso en testing o extensiones futuras
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TextSearchReplace, TextUtils };
}