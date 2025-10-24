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
            // Só ativa a lógica de clique no mobile (telas <= 768px)
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Previne a navegação para #solutions
                
                // Adiciona/remove classe 'active' para girar o ícone
                this.classList.toggle('active'); 
                
                // Seleciona o próximo elemento (a ul.dropdown-menu)
                const dropdownMenu = this.nextElementSibling;
                
                if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                    // Adiciona/remove classe 'active' para mostrar/esconder o menu
                    dropdownMenu.classList.toggle('active');
                }
            }
            // Em telas maiores, o :hover do CSS cuida disso e o link funciona
        });
    }

    // --- LÓGICA DE ROLAGEM SUAVE (LINKS-ÂNCORA) ---
    // Seleciona todos os links que começam com #, mas NÃO os links que são só "#" ou o link do modal
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"]):not([href="#contact-modal"])'); 

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Fecha o menu hambúrguer (se estiver aberto)
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    // Também fecha o dropdown de soluções se estiver aberto
                    const activeDropdown = document.querySelector('.dropdown-menu.active');
                    if (activeDropdown) {
                        activeDropdown.classList.remove('active');
                        document.querySelector('.dropdown-container > a').classList.remove('active');
                    }
                }
            }
        });
    });

    // --- LÓGICA DO MODAL (POP-UP DE CONTATO) ---
    const modal = document.getElementById('contact-modal');
    // Seleciona todos os botões/links que devem abrir o modal
    const openModalButtons = document.querySelectorAll('.open-modal, a[href="#contact-modal"]');
    const closeModalButton = document.querySelector('.close-button');

    // Função para abrir o modal
    function openModal(e) {
        e.preventDefault(); // Previne o comportamento padrão do link
        if (modal) {
             modal.style.display = 'flex';
        }
    }

    // Função para fechar o modal
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Adiciona o evento de clique em todos os botões "open-modal"
    openModalButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });

    // Adiciona evento de clique no botão "X"
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    // Adiciona evento de clique fora do modal (no fundo) para fechar
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
});