document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       Mobile Navigation Toggle
       ========================================================================== */
    const primaryNav = document.getElementById('primary-navigation');
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navIcon = navToggle.querySelector('i');

    navToggle.addEventListener('click', () => {
        const visibility = primaryNav.getAttribute('data-visible');
        
        if (visibility === "false") {
            primaryNav.setAttribute('data-visible', true);
            navToggle.setAttribute('aria-expanded', true);
            navIcon.classList.replace('ph-list', 'ph-x');
        } else {
            primaryNav.setAttribute('data-visible', false);
            navToggle.setAttribute('aria-expanded', false);
            navIcon.classList.replace('ph-x', 'ph-list');
        }
    });

    // Close mobile nav when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            primaryNav.setAttribute('data-visible', false);
            navToggle.setAttribute('aria-expanded', false);
            navIcon.classList.replace('ph-x', 'ph-list');
        });
    });

    /* ==========================================================================
       Sticky Header Background on Scroll
       ========================================================================== */
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load

    /* ==========================================================================
       Active Link Updating on Scroll
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust offset to account for sticky header
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       Scroll Reveal Animation using Intersection Observer
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* ==========================================================================
       Contact Form Handling
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get button to show loading/success state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            // Simulate form submission
            submitBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Sending...';
            submitBtn.style.opacity = '0.8';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="ph ph-check-circle"></i> Message Sent!';
                submitBtn.classList.remove('btn-primary');
                submitBtn.style.background = '#10b981'; // Success green
                submitBtn.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
                
                // Reset form
                contactForm.reset();
                
                // Revert button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.classList.add('btn-primary');
                    submitBtn.style.background = '';
                    submitBtn.style.boxShadow = '';
                    submitBtn.style.opacity = '1';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
