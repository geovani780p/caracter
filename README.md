# 🔍 Buscador y Reemplazador de Texto

Una aplicación web moderna y elegante para buscar y reemplazar texto de manera visual e interactiva. Desarrollada con HTML5, CSS3 y JavaScript ES6+ moderno.

![Preview](https://img.shields.io/badge/Status-Activo-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## ✨ Características

### 🎯 Funcionalidades Principales
- **Búsqueda en tiempo real**: Encuentra coincidencias mientras escribes
- **Resaltado visual**: Ve todas las coincidencias destacadas en el texto
- **Reemplazo interactivo**: Reemplaza todas las coincidencias con un solo clic
- **Vista previa**: Observa los cambios antes de aplicarlos
- **Copia rápida**: Copia el resultado al portapapeles fácilmente

### ⚙️ Opciones Avanzadas
- **Sensibilidad a mayúsculas**: Controla si distinguir entre mayúsculas y minúsculas
- **Palabras completas**: Busca solo palabras completas, no fragmentos
- **Búsqueda de caracteres especiales**: Busca cualquier carácter, símbolo o emoji
- **Contador de coincidencias**: Ve cuántas coincidencias se encontraron

### 🎨 Interfaz Moderna
- **Diseño responsive**: Funciona perfectamente en desktop, tablet y móvil
- **Interfaz intuitiva**: Fácil de usar para cualquier nivel de usuario
- **Animaciones suaves**: Transiciones y efectos visuales elegantes
- **Tema moderno**: Gradientes y efectos de cristal (glassmorphism)

## 🚀 Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con Flexbox, Grid y gradientes
- **JavaScript ES6+**: Programación orientada a objetos y características modernas

### Características Técnicas
- **Clases ES6**: Arquitectura modular y mantenible
- **Arrow Functions**: Sintaxis moderna y concisa
- **Template Literals**: Construcción dinámica de strings
- **Destructuring**: Manejo eficiente de datos
- **Async/Await**: Manejo de operaciones asíncronas
- **Regular Expressions**: Búsqueda y coincidencia de patrones
- **DOM Manipulation**: Interacción dinámica con elementos
- **Event Handling**: Gestión de eventos de usuario
- **Debouncing**: Optimización de rendimiento
- **Error Handling**: Manejo robusto de errores

## 📋 Requisitos

- Navegador web moderno con soporte para ES6+
- JavaScript habilitado
- Conexión a internet (para iconos Font Awesome)

### Navegadores Compatibles
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🛠️ Instalación y Uso

### Opción 1: Uso Directo
1. Visita la [página en vivo](https://tu-usuario.github.io/text-search-replace)
2. ¡Comienza a usar la aplicación inmediatamente!

### Opción 2: Clonar Repositorio
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/text-search-replace.git

# Navegar al directorio
cd text-search-replace

# Abrir en el navegador
# Simplemente abre index.html en tu navegador favorito
```

### Opción 3: Servidor Local
```bash
# Con Python (si tienes Python instalado)
python -m http.server 8000

# Con Node.js (si tienes Node.js instalado)
npx http-server

# Luego visita http://localhost:8000
```

## 📖 Cómo Usar

### 1. Ingresar Texto
- Escribe o pega tu texto en el área de texto principal
- Puedes usar cualquier tipo de texto: documentos, código, poemas, etc.

### 2. Buscar
- Ingresa la palabra, letra o carácter que quieres buscar
- Las coincidencias se resaltarán automáticamente en tiempo real
- Ve el contador de coincidencias encontradas

### 3. Configurar Opciones
- **Mayúsculas/minúsculas**: Activa si quieres que "Casa" y "casa" sean diferentes
- **Palabras completas**: Activa si buscas "arte" y no quieres que coincida con "parte"

### 4. Reemplazar
- Ingresa el texto de reemplazo
- Haz clic en "Reemplazar" para aplicar todos los cambios
- Ve la vista previa del texto modificado antes de confirmar

### 5. Copiar Resultado
- Usa el botón "Copiar Texto" para copiar el resultado al portapapeles
- Pega el resultado donde lo necesites

## 🎯 Casos de Uso

### 📝 Edición de Texto
- Corregir errores ortográficos en documentos largos
- Cambiar terminología específica en textos técnicos
- Actualizar nombres o referencias en documentos

### 💻 Desarrollo
- Refactorizar nombres de variables en código
- Cambiar URLs o rutas en archivos de configuración
- Actualizar documentación técnica

### 📚 Académico
- Revisar y corregir trabajos de investigación
- Actualizar referencias bibliográficas
- Estandarizar formatos de citación

### 🎨 Creativo
- Editar guiones y textos creativos
- Cambiar nombres de personajes en historias
- Adaptar contenido para diferentes audiencias

## 🏗️ Arquitectura del Código

### Estructura de Archivos
```
text-search-replace/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos CSS modernos
├── script.js           # Lógica JavaScript ES6+
├── README.md           # Documentación del proyecto
└── .gitignore         # Archivos ignorados por Git
```

### Clase Principal: TextSearchReplace
```javascript
class TextSearchReplace {
    constructor()           // Inicialización
    initializeElements()    // Referencias DOM
    bindEvents()           // Eventos de usuario
    findMatches()          // Búsqueda de coincidencias
    performReplace()       // Reemplazo de texto
    updateUI()             // Actualización de interfaz
}
```

### Características Técnicas Destacadas
- **Debouncing**: Evita búsquedas excesivas mientras el usuario escribe
- **Escape HTML**: Previene inyección de código malicioso
- **RegExp Escaping**: Maneja caracteres especiales de forma segura
- **Error Handling**: Gestión robusta de errores y casos edge
- **Responsive Design**: Adaptación automática a diferentes tamaños de pantalla

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar este proyecto:

1. **Fork** el repositorio
2. **Crea** una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### Ideas para Contribuir
- 🌐 Soporte para más idiomas en la interfaz
- 📊 Estadísticas avanzadas del texto
- 🎨 Temas personalizables
- 💾 Guardado de sesiones en localStorage
- 📱 Mejoras en la experiencia móvil
- ⚡ Optimizaciones de rendimiento
- 🔍 Búsqueda con expresiones regulares
- 📈 Análisis de frecuencia de palabras

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ve el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Leonardo** - [GitHub](https://github.com/leonardo)

## 🙏 Agradecimientos

- [Font Awesome](https://fontawesome.com/) por los iconos
- [Google Fonts](https://fonts.google.com/) por las tipografías
- La comunidad de desarrolladores por la inspiración y mejores prácticas

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:
- 🐛 [Reportar un bug](https://github.com/leonardo/text-search-replace/issues)
- 💡 [Sugerir una característica](https://github.com/leonardo/text-search-replace/issues)
- 📧 Contacto: tu-email@ejemplo.com

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!

**¡Hecho con ❤️ y JavaScript moderno!**