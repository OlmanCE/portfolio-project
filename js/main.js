document.addEventListener('DOMContentLoaded', () => {

    const navbarContainer = document.getElementById('navbar-container');
    const heroContainer = document.getElementById('hero-container');
    const projectsContainer = document.getElementById('projects-container');
    const aboutContainer = document.getElementById('about-container');
    const blogContainer = document.getElementById('blog-container');
    const contactContainer = document.getElementById('contact-container');
    let overlay;
    let typewriterTimeout;  // Variable para manejar el timeout del tipeo
    let isTyping = false;   // Controla si el efecto de tipeo está en progreso

    // Cargar el navbar
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarContainer.innerHTML = data;

            const toggleButton = document.querySelector('.navbar-toggle');
            const navbarMenu = document.querySelector('.navbar-menu');
            const navbarLinks = document.querySelectorAll('.navbar-link');

            // Crear overlay
            overlay = document.createElement('div');
            overlay.classList.add('menu-overlay');
            document.body.appendChild(overlay);

            if (toggleButton) {
                toggleButton.addEventListener('click', () => {
                    navbarMenu.classList.toggle('active');
                    overlay.classList.toggle('active');

                    // Limpia líneas de comandos anteriores
                    clearTerminalLines();
                    stopTypeWriterEffect();  // Detener cualquier tipeo activo

                    // Solo inicia el efecto si el menú está abierto y la pantalla es menor a 768px
                    if (navbarMenu.classList.contains('active') && window.innerWidth <= 768) {
                        startTypeWriterEffect();
                    }
                });
            }

            // Cerrar menú al hacer clic en un enlace
            navbarLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navbarMenu.classList.remove('active');
                    overlay.classList.remove('active');
                    clearTerminalLines();
                    stopTypeWriterEffect();  // Detener cualquier tipeo activo
                });
            });

            // Cerrar menú al hacer clic en el overlay
            overlay.addEventListener('click', () => {
                navbarMenu.classList.remove('active');
                overlay.classList.remove('active');
                clearTerminalLines();
                stopTypeWriterEffect();  // Detener cualquier tipeo activo
            });

            // Detectar cambio de tamaño y detener el efecto de tipeo si no está en responsive
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    clearTerminalLines();
                    stopTypeWriterEffect();  // Detener el tipeo si se pasa a escritorio
                }
            });
        })
        .catch(error => console.error('Error cargando el navbar:', error));

    // Cargar la hero section
    fetch('components/hero.html')
        .then(response => response.text())
        .then(data => {
            heroContainer.innerHTML = data;
        })
        .catch(error => console.error('Error cargando la hero section:', error));

    // Cargar la sección de proyectos
    fetch('components/projects.html')
        .then(response => response.text())
        .then(data => {
            projectsContainer.innerHTML = data;
        })
        .catch(error => console.error('Error cargando la sección de proyectos:', error));

    // Cargar la sección de acerca de mi
    fetch('components/about.html')
        .then(response => response.text())
        .then(data => {
            aboutContainer.innerHTML = data;
        })
        .catch(error => console.error('Error cargando la sección de acerca de mi:', error));

    // Cargar la sección de blog
    fetch('components/blog.html')
        .then(response => response.text())
        .then(data => {
            blogContainer.innerHTML = data;
        })
        .catch(error => console.error('Error cargando la sección de blog:', error));

    // Cargar la sección de contacto
    fetch('components/contact.html')
        .then(response => response.text())
        .then(data => {
            contactContainer.innerHTML = data;
            initContactForm();
        })
        .catch(error => console.error('Error cargando la sección de contacto:', error));
    // Function para limpiar líneas de terminal
    function clearTerminalLines() {
        const terminalLines = document.querySelectorAll('.terminal-line');
        terminalLines.forEach(line => line.remove());
    }

    // Function para iniciar el efecto de tipeo
    function startTypeWriterEffect() {
        const commands = [
            'cd portfolio',
            'ls -l',
            'cat about.txt',
            'vim projects.md',
            'git push origin master'
        ];
        let commandIndex = 0;
        let charIndex = 0;
        let terminalLine;
        isTyping = true;

        function typeCommand() {
            if (commandIndex < commands.length && isTyping) {
                const command = commands[commandIndex];

                // Si es el inicio de un nuevo comando, limpiar la línea anterior
                if (charIndex === 0) {
                    if (terminalLine) {
                        terminalLine.remove();
                    }
                    terminalLine = document.createElement('div');
                    terminalLine.classList.add('terminal-line');
                    document.querySelector('.navbar-menu').appendChild(terminalLine);
                }

                terminalLine.textContent = '> ' + command.substring(0, charIndex + 1);
                charIndex++;

                // Si el comando está completo, pasar al siguiente
                // esto para evitar que se escriba un comando en la misma línea
                if (charIndex === command.length) {
                    charIndex = 0;
                    commandIndex++;
                    typewriterTimeout = setTimeout(typeCommand, 1000); // Esperar 1 segundo antes del siguiente comando
                } else {
                    typewriterTimeout = setTimeout(typeCommand, 100); // Esperar 100ms entre caracteres
                }
            }
        }

        typeCommand();
    }

    // Function para detener el efecto de tipeo
    function stopTypeWriterEffect() {
        isTyping = false;  // Detiene el proceso de tipeo
        clearTimeout(typewriterTimeout);  // Limpiar cualquier timeout activo
    }
});

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            //posible implementación de fetch para enviar el formulario a un servidor :)           
            alert('Gracias por tu mensaje. Te contactare pronto!');
            contactForm.reset();
        });
    }
}