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

// Navbar scroll effect - slight opacity change on scroll
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

// Gallery Images Data
const galleryImages = [
    { url: 'images/gallery/community/1.JPG', alt: 'Menstrual Hygiene Day, Kango, Kuje, Abuja' },
    { url: 'images/gallery/education/1.jpg', alt: 'School Campaign, Tupechi Secondary School, Abuja' },
    { url: 'images/gallery/healthcare/1.jpg', alt: 'Free Medical Outreach' },
    { url: 'images/gallery/community/2.JPG', alt: 'Senior Citizen Outreach, Gofye, Abjua' },
    { url: 'images/gallery/education/2.jpeg', alt: 'CIDI Volunteers' },
    { url: 'images/gallery/community/3.JPG', alt: 'Menstrual Hygiene Day, Tupechi, Abuja.' },
    { url: 'images/gallery/healthcare/2.jpg', alt: 'Free Medical Outreach, Gofye, Abjua' },
    { url: 'images/gallery/community/4.JPG', alt: 'Menstrual Hygiene Day, Kango, Kuje, Abuja' },
    { url: 'images/gallery/education/3.jpg', alt: 'Robotics Training Session, Abuja' },
    { url: 'images/gallery/community/5.JPG', alt: 'Monthly Girls Club, Kuje, Abuja.' },
    { url: 'images/gallery/healthcare/3.jpg', alt: 'Medical Outreach' },
    { url: 'images/gallery/community/6.JPG', alt: 'Girls Empowerment, Tupechi, Abuja' },
    { url: 'images/gallery/education/4.jpg', alt: 'School Campaign, government Secondary school, Kuje, Abuja' },
    { url: 'images/gallery/healthcare/4.jpg', alt: 'Free Medical Outreach, Gudaba.' },
    { url: 'images/gallery/community/7.JPG', alt: 'Girls Empowerment' },
    { url: 'images/gallery/education/5.jpg', alt: 'School Campaign' },
    { url: 'images/gallery/healthcare/5.jpg', alt: 'Free Medical Assistance, Ijebu Mushin, Ogun State' },
    { url: 'images/gallery/community/8.JPG', alt: ' Widows Outreach' },
    { url: 'images/gallery/community/9.JPG', alt: 'Girls Empowerment - collaboration with Roatry Club, Apo.' },
    { url: 'images/gallery/education/6.jpg', alt: 'School Campaign, Iworoad, Oyo State' },
    { url: 'images/gallery/healthcare/6.jpg', alt: 'Free Medical Outreach' },
    { url: 'images/gallery/community/10.JPG', alt: 'Boys Club' },
    { url: 'images/gallery/education/7.jpg', alt: 'School Campaign' },
    { url: 'images/gallery/community/11.JPG', alt: 'Widows Outreach' },
    { url: 'images/gallery/education/v.jpg', alt: 'CIDI Volunteers' }
];

// Generate Gallery
function generateGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${image.url}" alt="${image.alt}" loading="lazy">
        `;
        
        galleryItem.addEventListener('click', () => {
            openModal(image.url, image.alt);
        });
        
        galleryGrid.appendChild(galleryItem);
    });
}

// Modal Functionality
const modal = document.getElementById('galleryModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeModal = document.querySelector('.close-modal');

function openModal(src, alt) {
    modal.style.display = 'block';
    modalImg.src = src;
    modalCaption.textContent = alt;
    
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
}

function closeModalFunc() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal on X click
closeModal.addEventListener('click', closeModalFunc);

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModalFunc();
    }
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
    generateGallery();
    initNewsletterForm();
    initSmoothScrolling();
});