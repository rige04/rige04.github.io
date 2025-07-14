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
    
    // Set initial language
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
    
    // Portfolio Filtering Functionality
    function initializePortfolioFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    const category = item.dataset.category;
                    
                    if (filter === 'all' || category === filter) {
                        item.classList.remove('hidden');
                        item.classList.add('fade-in');
                        setTimeout(() => {
                            item.classList.remove('fade-out');
                        }, 50);
                    } else {
                        item.classList.add('fade-out');
                        setTimeout(() => {
                            item.classList.add('hidden');
                        }, 300);
                    }
                });
                
                // Smooth scroll to portfolio section if not already visible
                const portfolioSection = document.getElementById('portfolio');
                const rect = portfolioSection.getBoundingClientRect();
                if (rect.top > window.innerHeight || rect.bottom < 0) {
                    portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
    
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
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
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
    
    // Initialize portfolio functionality
    initializePortfolioFilters();
    attachLightboxToItems();
    
    // Global lightbox function for commission images
    window.openLightbox = function(imageSrc) {
        lightboxImg.setAttribute('src', imageSrc);
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };
}); 