// Aguarda o DOM (estrutura da página) ser totalmente carregado
document.addEventListener('DOMContentLoaded', function() {

    // --- Funcionalidade de Rolagem Suave para links internos ---
    
    // Seleciona todos os links <a> que começam com '#'
    const navLinks = document.querySelectorAll('nav a[href^="#"], a.cta-button[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 1. Previne o comportamento padrão (o pulo imediato)
            e.preventDefault();

            // 2. Pega o ID do alvo (ex: '#services')
            const targetId = this.getAttribute('href');

            // 3. Encontra o elemento na página
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // 4. Rola suavemente até o elemento
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Você pode adicionar mais códigos JavaScript aqui no futuro
    // Ex: Animações de "scroll", validação de formulário de contato, etc.

});