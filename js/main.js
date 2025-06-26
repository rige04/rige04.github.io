document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Language Switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('.en, .pt-br');
    function setLanguage(lang) {
        translatableElements.forEach(el => {
            el.classList.toggle('hidden', !el.classList.contains(lang));
        });
        langButtons.forEach(btn => {
            btn.dataset.active = btn.dataset.lang === lang;
        });
        localStorage.setItem('preferredLanguage', lang);
    }
    langButtons.forEach(button => {
        button.addEventListener('click', () => setLanguage(button.dataset.lang));
    });
    setLanguage(localStorage.getItem('preferredLanguage') || 'pt-br');
    
    // Scroll reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    function observeElements() {
        document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
    }
    
    // Initial observation
    observeElements();
    
    // Portfolio Lightbox Functionality
    function attachLightboxToItems() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                lightboxImg.setAttribute('src', item.dataset.src);
                lightbox.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.getElementById('close-lightbox');

    function closeLightbox() {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
             closeLightbox();
        }
    });
    closeLightboxBtn.addEventListener('click', closeLightbox);
    
    // Initialize lightbox functionality
    attachLightboxToItems();
}); 