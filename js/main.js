document.addEventListener('DOMContentLoaded', () => {
    const navbarContainer = document.getElementById('navbar-container');
    const heroContainer = document.getElementById('hero-container');

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
});
