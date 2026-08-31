document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('open');
        });
    });

    // 3. Typing Effect for Hero Subtitle
    const typedOutput = document.getElementById('typed-output');
    const words = ["Frontend Developer", "UI/UX Enthusiast", "Creative Coder", "Web Designer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function typeEffect() {
        if (!typedOutput) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedOutput.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedOutput.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(typeEffect, typingSpeed);
    }
    
    typeEffect();

    // 4. Scroll Reveal Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after reveal
                // scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        scrollObserver.observe(el);
    });

    // 5. Number Counter Animation
    const counters = document.querySelectorAll('.number');
    const countObserverOptions = {
        threshold: 0.5
    };

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // Total animation time
        const frameRate = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameRate);
        let currentFrame = 0;

        const updateCounter = () => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            const currentCount = Math.round(target * progress);

            counter.innerText = currentCount + (target > 10 ? '+' : '');

            if (currentFrame < totalFrames) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target + '+';
            }
        };
        
        updateCounter();
    };

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if (!counter.classList.contains('animated')) {
                    animateCounter(counter);
                    counter.classList.add('animated');
                }
            }
        });
    }, countObserverOptions);

    counters.forEach(counter => {
        countObserver.observe(counter);
    });

    // 6. Lightbox Modal for Hero Avatar
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const heroAvatar = document.getElementById('hero-avatar');
    const closeBtn = document.querySelector('.modal-close');

    if (heroAvatar && modal) {
        heroAvatar.addEventListener('click', () => {
            modal.classList.add('show');
            modalImg.src = heroAvatar.src;
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // 7. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});
