// Configurações
const CONFIG = {
    whatsappNumber: '5521994503162', // Formato internacional
    whatsappMessage: 'Olá! Gostaria de maiores informações sobre consultoria jurídica em responsabilidade civil e agendar uma consulta.',
    whatsappFormTemplate: 'Olá! Meu nome é {NOME}. {MENSAGEM}. Gostaria de maiores informações sobre consultoria jurídica em responsabilidade civil.'
};

// DOM Elements
let elements = {};

// Initialize all functionality when DOM is loaded
function init() {
    // Check if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
}

function initializeApp() {
    try {
        // Get DOM elements after DOM is ready
        elements = {
            menuMobile: document.getElementById('menuMobile'),
            nav: document.querySelector('.nav'),
            whatsappForm: document.getElementById('whatsappForm'),
            whatsappFormBtn: document.getElementById('whatsappFormBtn'),
            nomeCompletoInput: document.getElementById('nomeCompleto'),
            mensagemInput: document.getElementById('mensagem'),
            whatsappBtn: document.getElementById('whatsappBtn'),
            whatsappHeroBtn: document.getElementById('whatsappHeroBtn'),
            whatsappFloat: document.getElementById('whatsappFloat'),
            heroCta: document.getElementById('heroCta')
        };

        initMobileMenu();
        initWhatsApp();
        initWhatsAppForm();
        initSmoothScrolling();
        initHeaderScrollEffect();
        initScrollAnimations();
        initAccessibility();
        addFormValidation();
        addCharacterCounter();

        console.log('=== CAMPOS DE PINHO - SITE INICIALIZADO ===');
        console.log('✅ WhatsApp configurado para:', CONFIG.whatsappNumber);
        console.log('✅ Formulário WhatsApp implementado');
        console.log('✅ Botão WhatsApp no hero adicionado');
        console.log('✅ Múltiplos pontos de contato WhatsApp');
        console.log('✅ Validação de formulário ativa');
        console.log('✅ Design responsivo implementado');
        console.log('✅ Animações e efeitos de scroll ativos');
        console.log('✅ Navegação suave habilitada');
        console.log('===========================================');

    } catch (error) {
        console.error('Erro na inicialização:', error);
    }
}

// Mobile Menu Functionality
function initMobileMenu() {
    if (elements.menuMobile) {
        elements.menuMobile.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on nav links
    if (elements.nav) {
        const navLinks = elements.nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (elements.nav.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        });
    }
}

function toggleMobileMenu() {
    elements.nav.classList.toggle('active');
    elements.menuMobile.classList.toggle('active');

    // Toggle hamburger animation
    const spans = elements.menuMobile.querySelectorAll('span');
    spans.forEach((span, index) => {
        span.style.transform = elements.menuMobile.classList.contains('active') 
            ? getHamburgerTransform(index) 
            : 'none';
    });
}

function getHamburgerTransform(index) {
    const transforms = [
        'rotate(-45deg) translate(-5px, 6px)',
        'opacity(0)',
        'rotate(45deg) translate(-5px, -6px)'
    ];
    return transforms[index];
}

// WhatsApp Functionality
function initWhatsApp() {
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

    console.log('WhatsApp URL configurada:', whatsappUrl);

    // WhatsApp buttons with default message
    const whatsappButtons = [elements.whatsappBtn, elements.whatsappHeroBtn, elements.whatsappFloat, elements.heroCta];

    whatsappButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Abrindo WhatsApp com mensagem padrão');
                window.open(whatsappUrl, '_blank');
            });
        }
    });
}

// WhatsApp Form Functionality
function initWhatsAppForm() {
    if (elements.whatsappForm) {
        elements.whatsappForm.addEventListener('submit', handleWhatsAppFormSubmit);
        console.log('✅ Formulário WhatsApp configurado');
    }
}

function handleWhatsAppFormSubmit(e) {
    e.preventDefault();

    console.log('Processando envio do formulário WhatsApp...');

    const nomeCompleto = elements.nomeCompletoInput.value.trim();
    const mensagem = elements.mensagemInput.value.trim();

    // Validação
    let isValid = true;

    if (!nomeCompleto) {
        showFieldError('nomeError', 'Nome completo é obrigatório');
        elements.nomeCompletoInput.classList.add('error');
        isValid = false;
    } else {
        hideFieldError('nomeError');
        elements.nomeCompletoInput.classList.remove('error');
    }

    if (!mensagem) {
        showFieldError('mensagemError', 'Mensagem é obrigatória');
        elements.mensagemInput.classList.add('error');
        isValid = false;
    } else if (mensagem.length < 10) {
        showFieldError('mensagemError', 'Mensagem deve ter pelo menos 10 caracteres');
        elements.mensagemInput.classList.add('error');
        isValid = false;
    } else {
        hideFieldError('mensagemError');
        elements.mensagemInput.classList.remove('error');
    }

    if (!isValid) {
        console.log('❌ Formulário inválido - corrigir erros');
        return;
    }

    // Criar mensagem personalizada
    const mensagemPersonalizada = CONFIG.whatsappFormTemplate
        .replace('{NOME}', nomeCompleto)
        .replace('{MENSAGEM}', mensagem);

    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(mensagemPersonalizada)}`;

    console.log('✅ Abrindo WhatsApp com mensagem personalizada');
    console.log('Nome:', nomeCompleto);
    console.log('Mensagem:', mensagem);

    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');

    // Limpar formulário
    elements.whatsappForm.reset();
    updateCharacterCounter();

    // Feedback visual
    showSuccessMessage();
}

function showFieldError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function hideFieldError(errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

function showSuccessMessage() {
    // Criar e mostrar mensagem de sucesso temporária
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #25D366;
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        text-align: center;
        font-weight: 600;
    `;
    successMsg.textContent = '✅ Redirecionando para WhatsApp...';

    document.body.appendChild(successMsg);

    setTimeout(() => {
        document.body.removeChild(successMsg);
    }, 3000);
}

// Form Validation
function addFormValidation() {
    // Real-time validation
    if (elements.nomeCompletoInput) {
        elements.nomeCompletoInput.addEventListener('blur', () => {
            const value = elements.nomeCompletoInput.value.trim();
            if (!value) {
                showFieldError('nomeError', 'Nome completo é obrigatório');
                elements.nomeCompletoInput.classList.add('error');
            } else {
                hideFieldError('nomeError');
                elements.nomeCompletoInput.classList.remove('error');
            }
        });

        elements.nomeCompletoInput.addEventListener('input', () => {
            if (elements.nomeCompletoInput.classList.contains('error') && elements.nomeCompletoInput.value.trim()) {
                hideFieldError('nomeError');
                elements.nomeCompletoInput.classList.remove('error');
            }
        });
    }

    if (elements.mensagemInput) {
        elements.mensagemInput.addEventListener('blur', () => {
            const value = elements.mensagemInput.value.trim();
            if (!value) {
                showFieldError('mensagemError', 'Mensagem é obrigatória');
                elements.mensagemInput.classList.add('error');
            } else if (value.length < 10) {
                showFieldError('mensagemError', 'Mensagem deve ter pelo menos 10 caracteres');
                elements.mensagemInput.classList.add('error');
            } else {
                hideFieldError('mensagemError');
                elements.mensagemInput.classList.remove('error');
            }
        });

        elements.mensagemInput.addEventListener('input', () => {
            updateCharacterCounter();
            if (elements.mensagemInput.classList.contains('error') && elements.mensagemInput.value.trim().length >= 10) {
                hideFieldError('mensagemError');
                elements.mensagemInput.classList.remove('error');
            }
        });
    }
}

// Character Counter
function addCharacterCounter() {
    updateCharacterCounter();
}

function updateCharacterCounter() {
    const charCountElement = document.getElementById('charCount');
    if (charCountElement && elements.mensagemInput) {
        const currentLength = elements.mensagemInput.value.length;
        charCountElement.textContent = currentLength;

        // Change color based on limit
        if (currentLength > 450) {
            charCountElement.style.color = '#ff6b6b';
        } else if (currentLength > 400) {
            charCountElement.style.color = '#ffa726';
        } else {
            charCountElement.style.color = '#666';
        }
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));

            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('✅ Navegação suave habilitada');
}

// Header Scroll Effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    console.log('✅ Efeito de scroll do header habilitado');
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.area-card, .feature, .info-item');

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });

    console.log('✅ Animações de scroll configuradas');
}

// Accessibility Improvements
function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Pular para o conteúdo principal';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Improve button accessibility
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
            button.setAttribute('aria-label', 'Botão de ação');
        }
    });

    // Add role to navigation
    const nav = document.querySelector('.nav');
    if (nav) {
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Menu principal');
    }

    console.log('✅ Melhorias de acessibilidade aplicadas');
}

// Handle errors gracefully
window.addEventListener('error', (e) => {
    console.error('Erro capturado:', e.error);
    // Não mostrar erro para o usuário em produção
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise rejeitada:', e.reason);
    e.preventDefault();
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`⚡ Site carregado em ${Math.round(loadTime)}ms`);
    });
}

// Initialize the app
init();

// Debug info for development
console.log('🚀 Campos de Pinho - Consultoria Jurídica');
console.log('📱 WhatsApp:', CONFIG.whatsappNumber);
console.log('🌐 Site desenvolvido para GitHub Pages');
console.log('✨ Formulário integrado ao WhatsApp');