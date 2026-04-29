/* ============================================================
   AERA — script.js
   ============================================================
   CONFIGURAÇÃO DO LINK DA PLATAFORMA (COPILOTOS)
   Insira abaixo a URL de acesso à Plataforma quando disponível.
   Todos os botões e links da página serão atualizados automaticamente.
   ============================================================ */
const AERA_APP_URL = '#'; // ← CONFIGURAR: cole aqui a URL da Plataforma quando estiver disponível

/* URL da página de login local (prévia) — usada enquanto AERA_APP_URL não está configurado */
const AERA_APP_LOGIN_PREVIEW = 'login.html';

document.addEventListener('DOMContentLoaded', function () {

    /* ---- Injeta a URL da Plataforma em todos os botões/links marcados ---- */
    document.querySelectorAll('[data-app-link]').forEach(el => {
        if (AERA_APP_URL && AERA_APP_URL !== '#') {
            el.href = AERA_APP_URL;
            el.setAttribute('target', '_blank');
            el.setAttribute('rel', 'noopener noreferrer');
        } else {
            /* Enquanto a URL real não está configurada, aponta para a prévia do login */
            el.href = AERA_APP_LOGIN_PREVIEW;
        }
    });

    /* ---- Header: classe "scrolled" ao rolar ---- */
    const siteHeader = document.getElementById('site-header');
    if (siteHeader) {
        window.addEventListener('scroll', () => {
            siteHeader.classList.toggle('scrolled', window.scrollY > 20);
        }, { passive: true });
    }

    /* ---- Menu hambúrguer ---- */
    const hamburger = document.getElementById('hamburger');
    const mainNav   = document.getElementById('main-nav');

    function closeNav() {
        if (!mainNav) return;
        mainNav.classList.remove('active');
        hamburger && hamburger.setAttribute('aria-expanded', 'false');
        mainNav.querySelectorAll('.dropdown-panel').forEach(p => p.style.display = '');
    }

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen);
            if (!isOpen) {
                mainNav.querySelectorAll('.dropdown-panel').forEach(p => p.style.display = '');
            }
        });
    }

    /* ---- Dropdown mobile: toggle ao clicar ---- */
    document.querySelectorAll('.nav-dropdown > a').forEach(link => {
        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                const panel = this.nextElementSibling;
                if (panel) panel.style.display = panel.style.display === 'block' ? '' : 'block';
            }
        });
    });

    /* ---- Fecha nav ao clicar num link interno ---- */
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                const isDropdownTrigger = link.parentElement.classList.contains('nav-dropdown');
                if (!isDropdownTrigger) closeNav();
            }
        });
    });

    /* ---- Rolagem suave para âncoras ---- */
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                closeNav();
            }
        });
    });

    /* ---- Modal de contato ---- */
    const modal       = document.getElementById('contact-modal');
    const closeBtn    = document.querySelector('.close-button');
    const openButtons = document.querySelectorAll('.open-modal');
    if (modal) {
        openButtons.forEach(btn => {
            btn.addEventListener('click', () => modal.classList.add('active'));
        });
        if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', e => {
            if (e.target === modal) modal.classList.remove('active');
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') modal.classList.remove('active');
        });
    }

});