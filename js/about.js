// Main JavaScript for About Page
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

    // Volunteers Data
    const volunteersData = [
        { id: 1, name: "Vivian O. Akanbi", role: "Civil Servant", img: "images/volunteers/v1.jpg" },
        { id: 2, name: "Chinedu", role: "Sport psychologist", img: "images/volunteers/v2.jpg" },
        { id: 3, name: "Pastor Funmilayo Abayomi", role: "Civil Servant", img: "images/volunteers/v3.jpg" },
        { id: 4, name: "Nurse Joy Adeola Dikko", role: "Civil Servant", img: "images/volunteers/v4.jpg" },
        { id: 5, name: "Oluleye Toluwani Samuel", role: "Fundraiser", img: "images/volunteers/v5.jpg" },
        { id: 6, name: "Ahmed Faith", role: "Civil Servant", img: "images/volunteers/v6.jpg" },
        { id: 7, name: "Tunde", role: "Teacher", img: "images/volunteers/v7.jpg" },
        { id: 8, name: "Olorunfemi Osekafore Damilola", role: "Arts Teacher", img: "images/volunteers/v8.jpg" },
        { id: 9, name: "Christian Emmanuel", role: "Teacher", img: "images/volunteers/v9.jpg" },
        { id: 10, name: "Mrs. Funmi Aribilola", role: "Nutritionist", img: "images/volunteers/v10.jpg" },
        { id: 11, name: "Oluwatobi Ayeni", role: "Beauty and Fashion Enhancement Specialistr", img: "images/volunteers/v11.jpg" },
        { id: 12, name: "Adebayo", role: "Program Assistant", img: "images/volunteers/v12.jpg" }
    ];

    // Initialize Volunteers Gallery
    function initVolunteersGallery() {
        const volunteersScroll = document.getElementById('volunteersScroll');
        const scrollLeft = document.getElementById('scrollLeft');
        const scrollRight = document.getElementById('scrollRight');
        const scrollDots = document.getElementById('scrollDots');
        
        // Create volunteer items
        volunteersData.forEach(volunteer => {
            const volunteerItem = document.createElement('div');
            volunteerItem.className = 'volunteer-item';
            
            volunteerItem.innerHTML = `
                <img src="${volunteer.img}" alt="${volunteer.name}" class="volunteer-image">
                <div class="volunteer-overlay">
                    <div class="volunteer-name">${volunteer.name}</div>
                    <div class="volunteer-role">${volunteer.role}</div>
                </div>
            `;
            
            volunteersScroll.appendChild(volunteerItem);
        });
        
        // Calculate scroll amount (width of one item + gap)
        const scrollAmount = 220; // 200px width + 20px gap
        
        // Create dots based on number of volunteer items
        function createDots() {
            scrollDots.innerHTML = '';
            const itemCount = volunteersData.length;
            
            for (let i = 0; i < itemCount; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                
                dot.addEventListener('click', function() {
                    scrollToIndex(i);
                    updateActiveDot(i);
                });
                
                scrollDots.appendChild(dot);
            }
        }
        
        // Scroll to specific index
        function scrollToIndex(index) {
            volunteersScroll.scrollTo({
                left: index * scrollAmount,
                behavior: 'smooth'
            });
        }
        
        // Update active dot
        function updateActiveDot(index) {
            const dots = document.querySelectorAll('.dot');
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) dots[index].classList.add('active');
        }
        
        // Scroll events
        scrollLeft.addEventListener('click', function() {
            volunteersScroll.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        scrollRight.addEventListener('click', function() {
            volunteersScroll.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Update active dot on scroll
        volunteersScroll.addEventListener('scroll', function() {
            const scrollPosition = volunteersScroll.scrollLeft;
            const activeIndex = Math.round(scrollPosition / scrollAmount);
            updateActiveDot(activeIndex);
        });
        
        // Touch/swipe functionality
        let startX;
        let scrollLeftPosition;
        
        volunteersScroll.addEventListener('touchstart', function(e) {
            startX = e.touches[0].pageX;
            scrollLeftPosition = volunteersScroll.scrollLeft;
        });
        
        volunteersScroll.addEventListener('touchmove', function(e) {
            e.preventDefault();
            const x = e.touches[0].pageX;
            const walk = (x - startX) * 2;
            volunteersScroll.scrollLeft = scrollLeftPosition - walk;
        });
        
        // Initialize dots
        createDots();
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

    // Partner logo interactions
    const partnerItems = document.querySelectorAll('.partner-item');
    partnerItems.forEach(item => {
        item.addEventListener('click', function() {
            // In a real site, this would navigate to the partner's website
            console.log('Partner clicked: ' + this.querySelector('img').alt);
        });
    });

    // Initialize everything
    initVolunteersGallery();
    
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
    console.log('🌟 About Us page loaded successfully!');
});