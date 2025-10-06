// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger animations for various animation classes
                if (entry.target.classList.contains('slide-in-left') ||
                    entry.target.classList.contains('slide-in-right') ||
                    entry.target.classList.contains('scale-up') ||
                    entry.target.classList.contains('fade-in-up') ||
                    entry.target.classList.contains('bounce-in')) {
                    entry.target.style.opacity = '1';
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedSelectors = '.fade-in, .slide-in-left, .slide-in-right, .scale-up, .fade-in-up, .bounce-in, .heading-unblur, .paragraph-unblur, .text-unblur, .word-reveal, .char-reveal';
    
    document.querySelectorAll(animatedSelectors).forEach((el) => {
        // Set initial opacity for animated elements
        if (el.classList.contains('slide-in-left') ||
            el.classList.contains('slide-in-right') ||
            el.classList.contains('scale-up') ||
            el.classList.contains('bounce-in')) {
            el.style.opacity = '0';
        }
        observer.observe(el);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.classList.add('shadow-lg');
        } else {
            nav.classList.remove('shadow-lg');
        }
    });

    // Lightbox functionality for all clickable images
    const clickableImages = document.querySelectorAll('.clickable-image');
    clickableImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            openLightbox(this);
        });
    });

    // Close lightbox when clicking anywhere on it
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', closeLightbox);
    }

    // Also close with X button
    const closeBtn = lightbox?.querySelector('button');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeLightbox();
        });
    }

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});

function openLightbox(img) {
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightbox = document.getElementById('lightbox');
    
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
}
