// ==================== Typing Animation ====================
const typingTexts = [
    'Junior Cybersecurity Engineer',
    'SOC Analyst L1',
    'Application Security Analyst',
    'VAPT Engineer',
    'Cybersecurity Analyst – Graduate',
    'Threat Detection Engineer',
    'Penetration Tester'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenTexts = 2000;

function typeText() {
    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => {
            isDeleting = true;
        }, delayBetweenTexts);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeText, speed);
}

// Start typing animation
setTimeout(typeText, 1000);

// ==================== Mobile Navigation ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==================== Navbar Scroll Effect ====================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ==================== Smooth Scrolling for Navigation ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Scroll Reveal Animation ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateOnScroll = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .about-text, .stat');
animateOnScroll.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ==================== Skill Progress Animation ====================
const skillsSection = document.querySelector('.skills');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.animation = 'progress 1.5s ease-in-out forwards';
                }, index * 100);
            });
            skillsAnimated = true;
        }
    });
}, { threshold: 0.3 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Contact form handling is done via the inline script in index.html
// to avoid duplicate event listeners and ensure proper Web3Forms integration

// ==================== Notification System ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00f2fe' : '#ff6b6b'};
        color: #0a0e27;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 242, 254, 0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== Active Navigation Link ====================
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ==================== Cursor Trail Effect ====================
const coords = { x: 0, y: 0 };
let circles = document.querySelectorAll('.circle');

if (circles.length === 0) {
    // Create cursor trail circles
    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.style.cssText = `
            position: fixed;
            pointer-events: none;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(0, 242, 254, 0.3);
            z-index: 9999;
            transition: transform 0.1s;
        `;
        document.body.appendChild(circle);
    }
}

const allCircles = document.querySelectorAll('.circle');

allCircles.forEach((circle, index) => {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    allCircles.forEach((circle, index) => {
        circle.style.left = x - 5 + 'px';
        circle.style.top = y - 5 + 'px';
        circle.style.transform = `scale(${(allCircles.length - index) / allCircles.length})`;

        circle.x = x;
        circle.y = y;

        const nextCircle = allCircles[index + 1] || allCircles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
}

animateCircles();

// ==================== Particle Background ====================
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(0, 242, 254, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }
}

createParticles();

// ==================== Stats Counter Animation ====================
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const statsSection = document.querySelector('.about-stats');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            const stats = document.querySelectorAll('.stat h3');
            const values = [5, 4, 20];
            stats.forEach((stat, index) => {
                setTimeout(() => {
                    animateValue(stat, 0, values[index], 2000);
                }, index * 200);
            });
            statsAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ==================== Copy Email on Click ====================
const emailElements = document.querySelectorAll('.contact-item span, .contact-item a');
emailElements.forEach(element => {
    if (element.textContent.includes('@')) {
        element.style.cursor = 'pointer';
        element.addEventListener('click', () => {
            navigator.clipboard.writeText(element.textContent.trim());
            showNotification('Email copied to clipboard!', 'success');
        });
    }
});

// ==================== Preloader ====================
window.addEventListener('load', () => {
    document.body.style.overflow = 'visible';
});

// ==================== Page Load Animation ====================
window.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero-text');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(30px)';

        setTimeout(() => {
            hero.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
});

console.log('%c👋 Welcome to my portfolio!', 'color: #00f2fe; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Let\'s connect!', 'color: #4facfe; font-size: 14px;');


// ==================== Professional Toast (no CSS file changes) ====================
(function () {
    const TOAST_TTL = 3500;

    function ensureContainer() {
        let c = document.getElementById('pro-toast-container');
        if (!c) {
            c = document.createElement('div');
            c.id = 'pro-toast-container';
            c.style.cssText = `
        position: fixed; right: 20px; bottom: 20px; z-index: 10000;
        display: flex; flex-direction: column; gap: 12px;
      `;
            document.body.appendChild(c);
        }
        return c;
    }

    function colorFor(type) {
        const root = getComputedStyle(document.documentElement);
        const primary = (root.getPropertyValue('--primary-color') || '#00f2fe').trim();
        if (type === 'success') return primary;
        if (type === 'error') return '#ff6b6b';
        if (type === 'info') return '#4facfe';
        return primary;
    }

    window.proToast = function (type, message) {
        const container = ensureContainer();
        const toast = document.createElement('div');
        const accent = colorFor(type);

        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.style.cssText = `
      min-width: 280px; max-width: 420px; padding: 14px 16px;
      border-radius: 12px; background: #0f1631; color: #e6edf6;
      box-shadow: 0 10px 30px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06) inset;
      border-left: 4px solid ${accent}; display:flex; align-items:flex-start; gap:10px;
      font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      transform: translateY(10px); opacity: 0; transition: all .25s ease;
    `;

        const dot = document.createElement('div');
        dot.style.cssText = `width:10px;height:10px;border-radius:50%;margin-top:6px;background:${accent};flex:0 0 auto;`;

        const text = document.createElement('div');
        text.style.cssText = `font-size:14px;line-height:1.5;`;
        text.textContent = message;

        const close = document.createElement('button');
        close.setAttribute('aria-label', 'Close notification');
        close.textContent = '✕';
        close.style.cssText = `
      background: transparent; border: 0; color: #9fb3c8; margin-left: auto;
      cursor: pointer; font-size: 14px; padding: 0; line-height: 1;
    `;
        close.onclick = dismiss;

        toast.append(dot, text, close);
        container.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        });

        let timer = setTimeout(dismiss, TOAST_TTL);

        function dismiss() {
            clearTimeout(timer);
            toast.style.transform = 'translateY(10px)';
            toast.style.opacity = '0';
            setTimeout(() => container.contains(toast) && container.removeChild(toast), 250);
        }
    };
})();

// ==================== Expandable Card Modals with Hover ====================
(function () {
    // Get all expandable cards
    const expandableCards = document.querySelectorAll('.expandable-card');
    const allModals = document.querySelectorAll('.card-modal');
    let hoverTimeout = null;
    let activeModal = null;
    let openedByClick = false; // Track if modal was opened by click

    // Function to open modal with animation
    function openModal(modal, byClick) {
        if (!modal) return;
        activeModal = modal;
        openedByClick = byClick;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Trigger animation
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });
    }

    // Function to close modal with animation
    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');

        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            if (activeModal === modal) {
                activeModal = null;
                openedByClick = false;
            }
        }, 300);
    }

    // Open modal when clicking OR hovering on expandable card
    expandableCards.forEach(card => {
        const modalId = card.getAttribute('data-modal');
        const modal = document.getElementById(modalId);

        // Click to open (requires X to close)
        card.addEventListener('click', (e) => {
            clearTimeout(hoverTimeout);
            openModal(modal, true);
        });

        // Hover to open with delay (auto-closes when mouse leaves)
        card.addEventListener('mouseenter', () => {
            hoverTimeout = setTimeout(() => {
                if (!activeModal) {
                    openModal(modal, false);
                }
            }, 400);
        });

        card.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
        });
    });

    // Close modal when clicking close button
    allModals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeModal(modal);
            });
        }

        // Close modal when clicking outside content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });

        // Auto-close when mouse leaves modal (only if opened by hover)
        modal.addEventListener('mouseleave', () => {
            if (activeModal === modal && !openedByClick) {
                closeModal(modal);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeModal) {
            closeModal(activeModal);
        }
    });
})();
