document.addEventListener('DOMContentLoaded', () => {
    const navbarContainer = document.getElementById('navbar-container');
    const heroContainer = document.getElementById('hero-container');
    const projectsContainer = document.getElementById('projects-container');
    const aboutContainer = document.getElementById('about-container');
    const blogContainer = document.getElementById('blog-container');
    const contactContainer = document.getElementById('contact-container');

    // Cargar el navbar
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarContainer.innerHTML = data;

            const toggleButton = document.querySelector('.navbar-toggle');
            const navbarMenu = document.querySelector('.navbar-menu');

            if (toggleButton) {
                toggleButton.addEventListener('click', () => {
                    navbarMenu.classList.toggle('active');
                });
            }
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
        })
        .catch(error => console.error('Error cargando la sección de contacto:', error));
});
