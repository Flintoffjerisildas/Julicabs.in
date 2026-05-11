
/**
 * Main application script
 * Handles global functionality like Navbar toggle and icon initialization
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Navbar Toggle Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Sticky Navbar background on scroll
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('bg-black/60', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-white/10');
            navbar.classList.remove('bg-transparent', 'border-transparent');
        } else {
            navbar.classList.remove('bg-black/60', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-white/10');
            navbar.classList.add('bg-transparent', 'border-transparent');
        }
    });
    // Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));
});
