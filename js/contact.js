// Main JavaScript for Contact Page
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Show loading state
                submitBtn.classList.add('loading');
                
                // Simulate form submission
                setTimeout(() => {
                    // In a real implementation, you would send the form data to a server here
                    showSuccessMessage();
                    submitBtn.classList.remove('loading');
                    contactForm.reset();
                }, 2000);
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    }

    // Form Validation Functions
    function validateForm() {
        let isValid = true;
        const fields = [
            { id: 'fullName', validator: validateName },
            { id: 'email', validator: validateEmail },
            { id: 'subject', validator: validateSubject },
            { id: 'message', validator: validateMessage }
        ];
        
        fields.forEach(field => {
            const element = document.getElementById(field.id);
            if (!field.validator(element.value)) {
                showError(element, getErrorMessage(field.id));
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(field) {
        const validators = {
            fullName: validateName,
            email: validateEmail,
            subject: validateSubject,
            message: validateMessage
        };
        
        if (validators[field.id]) {
            if (!validators[field.id](field.value)) {
                showError(field, getErrorMessage(field.id));
            } else {
                clearError(field);
            }
        }
    }
    
    function validateName(name) {
        return name.trim().length >= 2;
    }
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validateSubject(subject) {
        return subject !== '';
    }
    
    function validateMessage(message) {
        return message.trim().length >= 10;
    }
    
    function getErrorMessage(fieldId) {
        const messages = {
            fullName: 'Please enter your full name (at least 2 characters)',
            email: 'Please enter a valid email address',
            subject: 'Please select a subject',
            message: 'Please enter a message (at least 10 characters)'
        };
        return messages[fieldId] || 'This field is required';
    }
    
    function showError(field, message) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function clearError(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.remove('error');
        errorElement.style.display = 'none';
    }
    
    function showSuccessMessage() {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div style="background: #d4edda; color: #155724; padding: 1rem; border-radius: 8px; margin-top: 1rem; border: 1px solid #c3e6cb;">
                <i class="fas fa-check-circle"></i>
                Thank you! Your message has been sent successfully. We'll get back to you soon.
            </div>
        `;
        
        contactForm.appendChild(successMessage);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background change on scroll
    function handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'var(--bg-white)';
                navbar.style.backdropFilter = 'none';
            }
        }
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Simple validation
            if (email && email.includes('@')) {
                // Show success message
                const button = this.querySelector('button');
                const originalText = button.textContent;
                button.textContent = 'Subscribed!';
                button.style.background = '#27ae60';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    this.reset();
                }, 2000);
            }
        });
    }

    // Social media link interactions
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, this would open the social media page
            console.log('Social link clicked: ' + this.querySelector('i').className);
        });
    });

    // Volunteer button interaction
    const volunteerBtn = document.querySelector('.btn-light');
    if (volunteerBtn) {
        volunteerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, this would navigate to volunteer page
            console.log('Volunteer button clicked');
        });
    }

    // Event listeners
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Initial call for navbar background
    handleNavbarScroll();

    // Loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Console welcome message
    console.log('🌟 Contact page loaded successfully!');
});