// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.opacity = '0.98';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.opacity = '1';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
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

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                // Here you would typically send the email to your backend
                console.log('Newsletter subscription:', email);
                
                // Show success message
                emailInput.value = '';
                emailInput.placeholder = 'Thank you for subscribing!';
                
                // Reset placeholder after 3 seconds
                setTimeout(() => {
                    emailInput.placeholder = 'Enter your email';
                }, 3000);
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Smooth scrolling for anchor links
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNewsletterForm();
    initSmoothScrolling();
});














// Minimal Volunteer Form JavaScript for 3rd Party Form
document.addEventListener('DOMContentLoaded', function() {
    const volunteerForm = document.getElementById('volunteerForm');
    const successModal = document.getElementById('successModal');
    
    // Only add interactivity - validation will be handled by 3rd party service
    
    // Make checkboxes more interactive
    const checkboxes = document.querySelectorAll('.checkbox-item');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function(e) {
            if (e.target.tagName !== 'INPUT') {
                const input = this.querySelector('input[type="checkbox"]');
                input.checked = !input.checked;
            }
        });
    });
    
    // "Other" checkbox handling
    const otherCheckbox = document.getElementById('interest-other');
    const otherTextarea = document.getElementById('otherInterests');
    
    if (otherCheckbox && otherTextarea) {
        otherCheckbox.addEventListener('change', function() {
            if (this.checked) {
                otherTextarea.focus();
                otherTextarea.style.borderColor = 'var(--gold)';
            } else {
                otherTextarea.value = '';
                otherTextarea.style.borderColor = '';
            }
        });
        
        otherTextarea.addEventListener('focus', function() {
            if (!otherCheckbox.checked) {
                otherCheckbox.checked = true;
            }
        });
    }
    
    // Success modal handling (if 3rd party redirects to success page)
    // Check if success parameter is in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success')) {
        showSuccessModal();
    }
    
    // Modal controls
    const closeModal = document.querySelector('.close-modal');
    const modalBtn = document.querySelector('.modal-btn');
    
    function showSuccessModal() {
        if (successModal) {
            successModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeSuccessModal() {
        if (successModal) {
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeSuccessModal);
    }
    
    if (modalBtn) {
        modalBtn.addEventListener('click', closeSuccessModal);
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeSuccessModal();
        }
    });
});