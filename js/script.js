/ru* ===== LITTLE NOOR - Main JavaScript ===== */

document.addEventListener('DOMContentLoaded', function() {

    // ===== Preloader =====
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.classList.add('hidden');
            }, 500);
        });
        // Fallback: hide preloader after 2 seconds if load event doesn't fire
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 2000);
    }

    // ===== Navbar Scroll Effect =====
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ===== Mobile Navigation Toggle =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (navOverlay) navOverlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        if (navOverlay) {
            navOverlay.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close menu when a nav link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                if (navOverlay) navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ===== Image Slider =====
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');

    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        function goToSlide(index) {
            slides.forEach(function(slide) {
                slide.classList.remove('active');
            });
            dots.forEach(function(dot) {
                dot.classList.remove('active');
            });
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlideFunc() {
            goToSlide(currentSlide + 1);
        }

        function prevSlideFunc() {
            goToSlide(currentSlide - 1);
        }

        function startSlideInterval() {
            slideInterval = setInterval(nextSlideFunc, 5000);
        }

        function resetSlideInterval() {
            clearInterval(slideInterval);
            startSlideInterval();
        }

        // Event listeners for controls
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextSlideFunc();
                resetSlideInterval();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevSlideFunc();
                resetSlideInterval();
            });
        }

        dots.forEach(function(dot) {
            dot.addEventListener('click', function() {
                var slideIndex = parseInt(this.getAttribute('data-slide'));
                goToSlide(slideIndex);
                resetSlideInterval();
            });
        });

        // Start auto-slide
        startSlideInterval();

        // Pause on hover
        var heroSlider = document.getElementById('heroSlider');
        if (heroSlider) {
            heroSlider.addEventListener('mouseenter', function() {
                clearInterval(slideInterval);
            });
            heroSlider.addEventListener('mouseleave', function() {
                startSlideInterval();
            });
        }
    }

    // ===== Scroll to Top Button =====
    const scrollBtn = document.getElementById('scrollTop');
    if (scrollBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== Fade-in Animations on Scroll =====
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    function checkFadeIn() {
        fadeElements.forEach(function(el) {
            var rect = el.getBoundingClientRect();
            var windowHeight = window.innerHeight;
            if (rect.top < windowHeight - 80) {
                el.classList.add('visible');
            }
        });
    }

    if (fadeElements.length > 0) {
        // Check on load
        window.addEventListener('load', checkFadeIn);
        // Check on scroll
        window.addEventListener('scroll', checkFadeIn);
        // Check on resize
        window.addEventListener('resize', checkFadeIn);
        // Initial check
        checkFadeIn();
    }

    // ===== Password Toggle Visibility =====
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var targetId = this.getAttribute('data-target');
            var input = document.getElementById(targetId);
            if (input) {
                if (input.type === 'password') {
                    input.type = 'text';
                    this.classList.remove('fa-eye');
                    this.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    this.classList.remove('fa-eye-slash');
                    this.classList.add('fa-eye');
                }
            }
        });
    });

    // ===== Login Page: Check if already logged in =====
    if (window.location.pathname.includes('login.html')) {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            window.location.href = 'dashboard.html';
        }
    }

    // ===== Dashboard: Check auth =====
    if (window.location.pathname.includes('dashboard.html')) {
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            window.location.href = 'login.html';
        }
    }

    // ===== Logout functionality =====
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        });
    }

});

