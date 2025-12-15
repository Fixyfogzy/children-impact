// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect - becomes slightly darker on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.7)';
    } else {
        navbar.style.background = 'transparent';
    }
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const isDropdownButton = e.target.matches('.donate-btn') || e.target.closest('.donate-btn');
    if (!isDropdownButton) {
        document.querySelectorAll('.dropdown-content').forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    }
});

// Handle dropdown display
document.querySelectorAll('.donate-dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        const content = dropdown.querySelector('.dropdown-content');
        const isVisible = content.style.display === 'block';
        
        // Close all other dropdowns
        document.querySelectorAll('.dropdown-content').forEach(d => {
            d.style.display = 'none';
        });
        
        // Toggle current dropdown
        content.style.display = isVisible ? 'none' : 'block';
    });
});






// Intersection Observer to trigger counter when section is in view
const impactSection = document.querySelector('.impact-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            observer.unobserve(impactSection);
        }
    });
}, { threshold: 0.5 });

if (impactSection) {
    observer.observe(impactSection);
}



// Testimonial Carousel
function initTestimonialCarousel() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(n) {
        // Remove active classes from all slides and dots
        testimonialCards.forEach(card => {
            card.classList.remove('active', 'prev', 'next');
        });
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Update current slide
        currentSlide = (n + testimonialCards.length) % testimonialCards.length;
        
        // Calculate previous and next slide indices
        const prevSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
        const nextSlide = (currentSlide + 1) % testimonialCards.length;
        
        // Add appropriate classes
        testimonialCards[prevSlide].classList.add('prev');
        testimonialCards[currentSlide].classList.add('active');
        testimonialCards[nextSlide].classList.add('next');
        
        dots[currentSlide].classList.add('active');
        
        // Update button states
        updateButtonStates();
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
        resetAutoAdvance();
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
        resetAutoAdvance();
    }

    function updateButtonStates() {
        // You can add disabled states if needed for first/last slide
    }

    function resetAutoAdvance() {
        clearInterval(slideInterval);
        startAutoAdvance();
    }

    function startAutoAdvance() {
        if (window.innerWidth <= 768) {
            slideInterval = setInterval(nextSlide, 5000);
        }
    }

    function stopAutoAdvance() {
        clearInterval(slideInterval);
    }

    // Event Listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoAdvance();
        });
    });

    // Pause auto-advance on hover
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (testimonialsGrid) {
        testimonialsGrid.addEventListener('mouseenter', stopAutoAdvance);
        testimonialsGrid.addEventListener('mouseleave', startAutoAdvance);
        
        // Touch events for mobile
        testimonialsGrid.addEventListener('touchstart', stopAutoAdvance);
        testimonialsGrid.addEventListener('touchend', () => {
            setTimeout(startAutoAdvance, 3000);
        });
    }

    // Initialize based on screen size
    if (window.innerWidth > 768) {
        // Desktop - show all testimonials
        testimonialCards.forEach(card => {
            card.style.position = 'static';
            card.style.opacity = '1';
            card.style.transform = 'none';
            card.style.pointerEvents = 'all';
        });
        if (carouselControls) carouselControls.style.display = 'none';
    } else {
        // Mobile - initialize carousel
        showSlide(0);
        startAutoAdvance();
    }
}

// Handle window resize
function handleResize() {
    initTestimonialCarousel();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initTestimonialCarousel();
});

window.addEventListener('resize', handleResize);






// Gallery Preview Interaction
function initGalleryPreview() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        // Click handler for gallery items
        item.addEventListener('click', () => {
            // You can add functionality here for:
            // 1. Opening a lightbox
            // 2. Navigating to gallery page with specific category
            // 3. Showing more details
            
            // For now, just navigate to gallery page
            window.location.href = 'gallery.html';
        });
        
        // Keyboard accessibility
        item.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.location.href = 'gallery.html';
            }
        });
        
        // Add tabindex for accessibility
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `View ${item.querySelector('h3').textContent} gallery`);
    });
}

// Initialize gallery on load
document.addEventListener('DOMContentLoaded', () => {
    initGalleryPreview();
    // Your other initialization code...
});







// Partners Section - Pause on hover and handle responsive animation
function initPartnersSection() {
    const partnersScroll = document.querySelector('.partners-scroll');
    const partnersContainer = document.querySelector('.partners-scroll-container');
    
    if (!partnersScroll) return;
    
    // Calculate animation duration based on number of items
    function updateAnimationDuration() {
        const partnerLogos = document.querySelectorAll('.partner-logo');
        const totalWidth = Array.from(partnerLogos).reduce((total, logo) => {
            return total + logo.offsetWidth + 
                   parseInt(getComputedStyle(partnersScroll).gap.replace('px', ''));
        }, 0);
        
        // Set animation duration proportional to total width
        const baseDuration = 30; // seconds for default setup
        const calculatedDuration = (totalWidth / 2) * 0.05; // Adjust this factor as needed
        
        partnersScroll.style.animationDuration = `${Math.max(calculatedDuration, 20)}s`;
    }
    
    // Initialize animation duration
    updateAnimationDuration();
    
    // Update on window resize
    window.addEventListener('resize', updateAnimationDuration);
    
    // Pause animation when hovering over container
    partnersContainer.addEventListener('mouseenter', () => {
        partnersScroll.style.animationPlayState = 'paused';
    });
    
    partnersContainer.addEventListener('mouseleave', () => {
        partnersScroll.style.animationPlayState = 'running';
    });
    
    // Touch events for mobile
    partnersContainer.addEventListener('touchstart', () => {
        partnersScroll.style.animationPlayState = 'paused';
    });
    
    partnersContainer.addEventListener('touchend', () => {
        setTimeout(() => {
            partnersScroll.style.animationPlayState = 'running';
        }, 2000);
    });
}

// Initialize partners section
document.addEventListener('DOMContentLoaded', () => {
    initPartnersSection();
    // Your other initialization code...
});




// CTA Section Animation
function initCTASection() {
    const ctaSection = document.querySelector('.cta-section');
    
    if (!ctaSection) return;
    
    // Add intersection observer for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(ctaSection);
}

// Initialize CTA section
document.addEventListener('DOMContentLoaded', () => {
    initCTASection();
    // Your other initialization code...
});

// Rest of your existing JavaScript code...