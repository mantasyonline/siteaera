document.addEventListener('DOMContentLoaded', function() {

    // --- Funcionalidade de Rolagem Suave para links internos ---
    const navLinks = document.querySelectorAll('nav a[href^="#"], a.cta-button[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Para fechar o menu hambúrguer após clicar em um link (mobile)
                if (window.innerWidth <= 768) {
                    const navMenu = document.querySelector('.nav-links');
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // --- Funcionalidade do Menu Hambúrguer (Mobile) ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger && navMenu) { // Verifica se os elementos existem
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

});