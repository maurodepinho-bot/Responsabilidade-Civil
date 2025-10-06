// Configuração do WhatsApp
const CONFIG = {
    whatsapp: {
        number: '5521994503162', // Número com código do país (55) + DDD (21) + número
        baseUrl: 'https://wa.me/'
    },
    messages: {
        default: 'Olá! Gostaria de saber mais sobre os serviços da Campos de Pinho Consultoria Jurídica.',
        hero: 'Olá! Vi o site da Campos de Pinho Consultoria e gostaria de uma consulta sobre responsabilidade civil.',
        float: 'Olá! Preciso de ajuda jurídica. Podem me orientar?',
        cta: 'Olá! Gostaria de agendar uma consulta gratuita sobre responsabilidade civil. Podem me ajudar?'
    }
};

// Classe principal da aplicação
class CamposPinhoSite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupWhatsAppIntegration();
        this.setupFormValidation();
        this.setupAnimations();
    }

    // Event Listeners
    setupEventListeners() {
        // Scroll suave para links de navegação
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll do header
        window.addEventListener('scroll', () => {
            this.handleHeaderScroll();
        });

        // Resize da janela
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Rastreamento de scroll e engajamento
        this.setupEngagementTracking();
    }

    // Efeitos de scroll
    setupScrollEffects() {
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });

        // Intersection Observer para animações
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observar elementos para animação
        document.querySelectorAll('.hero-card, .area-card, .info-item').forEach(el => {
            observer.observe(el);
        });
    }

    // Menu mobile
    setupMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Fechar menu ao clicar em um link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
        }
    }

    // Integração WhatsApp
    setupWhatsAppIntegration() {
        // Botões WhatsApp diretos
        document.querySelectorAll('.whatsapp-btn, .whatsapp-btn-float').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const action = btn.getAttribute('data-action') || 'default';
                this.openWhatsApp(CONFIG.messages[action] || CONFIG.messages.default);
            });
        });

        // Formulário WhatsApp
        const form = document.getElementById('whatsapp-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        }
    }

    // Validação do formulário
    setupFormValidation() {
        const form = document.getElementById('whatsapp-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    // Animações
    setupAnimations() {
        // Contador animado para estatísticas
        const stats = document.querySelectorAll('.stat-number');
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        });

        stats.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    // Rastreamento de engajamento
    setupEngagementTracking() {
        let scrollDepth = 0;
        let timeOnPage = 0;
        const startTime = Date.now();

        // Rastrear profundidade de scroll
        const trackScrollDepth = Utils.throttle(() => {
            const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
            
            if (scrollPercent > scrollDepth && scrollPercent % 25 === 0) {
                scrollDepth = scrollPercent;
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll_depth', {
                        'event_category': 'engagement',
                        'event_label': `${scrollPercent}%`,
                        'value': scrollPercent
                    });
                }
            }
        }, 1000);

        window.addEventListener('scroll', trackScrollDepth);

        // Rastrear tempo na página
        setInterval(() => {
            timeOnPage = Math.round((Date.now() - startTime) / 1000);
            
            // Rastrear marcos de tempo (30s, 60s, 120s, 300s)
            if ([30, 60, 120, 300].includes(timeOnPage)) {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'time_on_page', {
                        'event_category': 'engagement',
                        'event_label': `${timeOnPage}s`,
                        'value': timeOnPage
                    });
                }
            }
        }, 1000);

        // Rastrear cliques em seções
        document.querySelectorAll('section').forEach(section => {
            section.addEventListener('click', () => {
                const sectionId = section.id || section.className.split(' ')[0];
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'section_click', {
                        'event_category': 'engagement',
                        'event_label': sectionId,
                        'value': 1
                    });
                }
            });
        });

        // Rastrear saída da página
        window.addEventListener('beforeunload', () => {
            const finalTimeOnPage = Math.round((Date.now() - startTime) / 1000);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_exit', {
                    'event_category': 'engagement',
                    'event_label': 'time_spent',
                    'value': finalTimeOnPage
                });
            }
        });
    }

    // Métodos auxiliares
    handleHeaderScroll() {
        const header = document.querySelector('.header');
        const scrolled = window.scrollY > 50;
        
        header.classList.toggle('scrolled', scrolled);
    }

    handleResize() {
        // Fechar menu mobile se a tela ficar grande
        if (window.innerWidth > 768) {
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        }
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remover classes de erro anteriores
        field.classList.remove('error');
        this.removeErrorMessage(field);

        // Validações específicas
        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value && !emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Por favor, insira um email válido';
                }
                break;
            
            case 'tel':
                const phoneRegex = /^[\d\s\(\)\-\+]+$/;
                if (value && !phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Por favor, insira um telefone válido';
                }
                break;
        }

        // Validação de campo obrigatório
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório';
        }

        // Aplicar estilo de erro se necessário
        if (!isValid) {
            field.classList.add('error');
            this.showErrorMessage(field, errorMessage);
        }

        return isValid;
    }

    showErrorMessage(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorDiv);
    }

    removeErrorMessage(field) {
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        let isFormValid = true;

        // Validar todos os campos
        const fields = form.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification('Por favor, corrija os erros no formulário', 'error');
            return;
        }

        // Construir mensagem para WhatsApp
        const nome = formData.get('nome');
        const telefone = formData.get('telefone');
        const assunto = formData.get('assunto');
        const mensagem = formData.get('mensagem');

        let whatsappMessage = `*Nova consulta - Campos de Pinho Consultoria*\n\n`;
        whatsappMessage += `*Nome:* ${nome}\n`;
        if (telefone) whatsappMessage += `*Telefone:* ${telefone}\n`;
        whatsappMessage += `*Assunto:* ${assunto}\n\n`;
        whatsappMessage += `*Mensagem:*\n${mensagem}`;

        // Rastrear conversão no Google Ads
        this.trackConversion();

        // Abrir WhatsApp
        this.openWhatsApp(whatsappMessage);

        // Limpar formulário
        form.reset();
        this.showNotification('Redirecionando para o WhatsApp...', 'success');
    }

    trackConversion() {
        // Rastrear conversão no Google Ads
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'AW-608190853/rRbDCMSw5eEBEIWDgaIC',
                'value': 1.0,
                'currency': 'BRL'
            });
            
            // Rastrear evento personalizado
            gtag('event', 'lead_form_submission', {
                'event_category': 'engagement',
                'event_label': 'whatsapp_form',
                'value': 1
            });
        }
    }

    openWhatsApp(message) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `${CONFIG.whatsapp.baseUrl}${CONFIG.whatsapp.number}?text=${encodedMessage}`;
        
        // Rastrear clique no WhatsApp
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                'event_category': 'engagement',
                'event_label': 'whatsapp_button',
                'value': 1
            });
        }
        
        // Abrir em nova aba
        window.open(whatsappUrl, '_blank');
    }

    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60 FPS
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Formatar número
            const formatted = Math.floor(current).toString();
            if (element.textContent.includes('+')) {
                element.textContent = formatted + '+';
            } else {
                element.textContent = formatted;
            }
        }, 16);
    }

    showNotification(message, type = 'info') {
        // Remover notificação existente
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Criar nova notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos da notificação
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });

        // Cores baseadas no tipo
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // Adicionar ao DOM
        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remover após 5 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    // Método para adicionar estilos CSS dinamicamente se necessário
    addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .nav-menu.active {
                display: flex !important;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 1rem;
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                border-top: 1px solid var(--border-color);
            }
            
            .nav-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .nav-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .nav-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
            
            .error {
                border-color: #ef4444 !important;
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
            }
            
            @media (max-width: 768px) {
                .nav-menu {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Utilitários globais
const Utils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Verificar se é dispositivo móvel
    isMobile() {
        return window.innerWidth <= 768;
    },

    // Verificar se elemento está visível
    isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar aplicação
    const app = new CamposPinhoSite();
    
    // Adicionar estilos dinâmicos
    app.addDynamicStyles();
    
    // Log de inicialização (apenas em desenvolvimento)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🏛️ Campos de Pinho Consultoria - Site carregado com sucesso!');
        console.log('📱 WhatsApp:', CONFIG.whatsapp.number);
    }
});

// Exportar para uso global se necessário
window.CamposPinhoSite = CamposPinhoSite;
window.Utils = Utils;
