document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DO MENU HAMBÚRGUER ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // --- LÓGICA DO DROPDOWN (GAVETA) NO MOBILE ---
    const dropdownToggle = document.querySelector('.dropdown-container > a');

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('active');

                const dropdownMenu = this.nextElementSibling;
                if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                    dropdownMenu.classList.toggle('active');
                }
            }
        });
    }

    // --- LÓGICA DE ROLAGEM SUAVE (LINKS-ÂNCORA) ---
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    const activeDropdown = document.querySelector('.dropdown-menu.active');
                    if (activeDropdown) {
                        activeDropdown.classList.remove('active');
                        document.querySelector('.dropdown-container > a').classList.remove('active');
                    }
                }
            }
        });
    });

    // ==========================================
    // --- LÓGICA DO VÍDEO DO AERA APP ---
    // ==========================================
    const appVideo = document.getElementById('app-video');
    const customPlayBtn = document.getElementById('custom-play-btn');
    const videoHeroSection = document.getElementById('video-hero');

    if (appVideo && customPlayBtn && videoHeroSection) {
        // Ao clicar no botão, dá play no vídeo
        customPlayBtn.addEventListener('click', function() {
            appVideo.play();
        });

        // Quando o vídeo começa a tocar, esconde os textos e a camada escura
        appVideo.addEventListener('play', function() {
            videoHeroSection.classList.add('is-playing');
        });

        // Quando o vídeo é pausado manualmente, os textos voltam
        appVideo.addEventListener('pause', function() {
            videoHeroSection.classList.remove('is-playing');
        });

        // Quando o vídeo acaba, os textos voltam e o vídeo reseta pro início
        appVideo.addEventListener('ended', function() {
            videoHeroSection.classList.remove('is-playing');
            appVideo.currentTime = 0;
        });
    }

});