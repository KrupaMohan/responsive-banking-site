document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Add smooth scrolling to all links
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

    // Add fixed header on scroll
    const header = document.querySelector('.navbar');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('navbar-scrolled', 'shadow-sm');
            } else {
                header.classList.remove('navbar-scrolled', 'shadow-sm');
            }
        });
    }

    // Initialize AOS Animation
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Hero video handling
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        // Ensure video plays when loaded
        heroVideo.addEventListener('loadedmetadata', function() {
            const playPromise = heroVideo.play();
            
            // Handle autoplay restrictions
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('Autoplay prevented:', error);
                    // Show fallback image if video fails to play
                    const heroSection = document.querySelector('.hero-section');
                    if (heroSection) {
                        heroSection.style.backgroundImage = 'url("https://images.unsplash.com/photo-1601597111158-5fce897524b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")';
                        heroSection.style.backgroundSize = 'cover';
                        heroSection.style.backgroundPosition = 'center';
                    }
                });
            }
        });
        
        // Handle video loading errors
        heroVideo.addEventListener('error', function() {
            console.error('Error loading hero video');
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.style.backgroundImage = 'url("https://images.unsplash.com/photo-1601597111158-5fce897524b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")';
                heroSection.style.backgroundSize = 'cover';
                heroSection.style.backgroundPosition = 'center';
            }
        });
    }

    // Initialize carousel with interval
    const myCarousel = document.querySelector('#heroCarousel');
    if (myCarousel) {
        const carousel = new bootstrap.Carousel(myCarousel, {
            interval: 5000,
            touch: true,
            ride: 'carousel'
        });
    }

    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'btn btn-primary btn-floating btn-lg back-to-top';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add current year to footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });

    // EMI Calculator
    const emiCalculator = document.getElementById('emiCalculator');
    const loanAmount = document.getElementById('loanAmount');
    const interestRate = document.getElementById('interestRate');
    const loanTenure = document.getElementById('loanTenure');
    const tenureValue = document.getElementById('tenureValue');
    const emiResult = document.getElementById('emiResult');
    const emiAmount = document.getElementById('emiAmount');
    const totalInterest = document.getElementById('totalInterest');
    const totalPayment = document.getElementById('totalPayment');

    // Update tenure value display
    loanTenure.addEventListener('input', function() {
        tenureValue.textContent = this.value + ' Years';
    });

    // Calculate EMI
    emiCalculator.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const P = parseFloat(loanAmount.value);
        const r = parseFloat(interestRate.value) / 12 / 100; // Monthly interest rate
        const n = parseFloat(loanTenure.value) * 12; // Total number of months
        
        const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        const totalInterestAmount = (emi * n) - P;
        const totalAmount = emi * n;

        emiAmount.textContent = '₹' + emi.toFixed(2);
        totalInterest.textContent = '₹' + totalInterestAmount.toFixed(2);
        totalPayment.textContent = '₹' + totalAmount.toFixed(2);
        
        emiResult.style.display = 'block';
    });

    // Language Toggle
    const languageToggle = document.getElementById('languageToggle');
    const langEn = document.querySelector('.lang-en');
    const langKn = document.querySelector('.lang-kn');

    languageToggle.addEventListener('click', function() {
        langEn.classList.toggle('d-none');
        langKn.classList.toggle('d-none');
    });

    // Smooth Scroll
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

    // Navbar Scroll Effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Service Cards Hover Effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Mobile Menu Toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navbarToggler.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
            navbarCollapse.classList.remove('show');
        }
    });

    // Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
});

// Function to handle currency formatting
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Function to handle EMI calculation
function calculateEMI(principal, rate, years) {
    const monthlyRate = rate / 12 / 100;
    const numberOfPayments = years * 12;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return Math.round(emi);
}

// Function to handle fixed deposit calculation
function calculateFD(principal, rate, years) {
    const amount = principal * Math.pow(1 + (rate / 100), years);
    return Math.round(amount);
}
