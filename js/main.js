document.addEventListener('DOMContentLoaded', () => {
    // Initialize syntax highlighting for code blocks
    initSyntaxHighlighting();
    
    // Initialize section animations
    initSectionAnimations();
    
    // Initialize navigation behavior
    initNavigationBehavior();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize terminal typing effect
    initTerminalEffect();
    
    // Initialize services filter
    initServicesFilter();
});

/**
 * Initialize syntax highlighting for code blocks
 */
function initSyntaxHighlighting() {
    document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
    });
}

/**
 * Initialize section animations based on scroll position
 */
function initSectionAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

/**
 * Initialize header navigation behavior
 */
function initNavigationBehavior() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    // Nav behavior set to fade mode
    window.addEventListener('scroll', () => {
        // Add shadow on scroll regardless of mode
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Handle fade behavior
        // Scrolling down - hide the navbar
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            header.classList.add('fade-out');
        }
        // Scrolling up - show the navbar
        else if (window.scrollY < lastScrollY) {
            header.classList.remove('fade-out');
        }

        lastScrollY = window.scrollY;
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize terminal typing effect
 */
function initTerminalEffect() {
    const terminalLines = document.querySelectorAll('.bg-dark > p');
    let lineDelay = 500;
    
    terminalLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
        }, lineDelay * (index + 1));
    });
}

/**
 * Initialize services filtering functionality
 */
function initServicesFilter() {
    const menuButtons = document.querySelectorAll('.menu-btn');
    const serviceItems = document.querySelectorAll('.service-item');
    
    if (!menuButtons.length || !serviceItems.length) return;
    
    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            menuButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Show/hide services based on filter
            serviceItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}