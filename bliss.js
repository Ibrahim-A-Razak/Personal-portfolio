// 1. Sticky Navbar Effect
// Select the navbar element
const navbar = document.getElementById('navbar');

// Listen for scroll events on the window
window.addEventListener('scroll', () => {
    // If scrolled down more than 50px, add 'scrolled' class
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        // Otherwise remove it
        navbar.classList.remove('scrolled');
    }
});

// --- Counter Animation Logic (Existing Code) ---
const counters = document.querySelectorAll('.number');
const speed = 7000;

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const updateCount = () => {
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 10);
        } else {
            counter.innerText = target.toLocaleString();
        }
    };
    updateCount();
};

const observerOptions = {
    root: null,
    threshold: 0.1
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('.number') || entry.target;
            if (counter && counter.getAttribute('data-target') && !counter.classList.contains('animated')) {
                animateCounter(counter);
                counter.classList.add('animated');
            }
        }
    });
};

const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

const counterItems = document.querySelectorAll('.counter-item');
if (counterItems.length > 0) {
    counterItems.forEach(item => intersectionObserver.observe(item));
} else {
    counters.forEach(counter => {
        if (counter.getAttribute('data-target')) {
            intersectionObserver.observe(counter);
        }
    });
}

if (!('IntersectionObserver' in window)) {
    counters.forEach(counter => {
        if (counter.getAttribute('data-target')) {
            animateCounter(counter);
        }
    });
}


// 2. Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

// Toggle the 'active' class on click
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon based on state (Hamburger vs Close)
    menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.textContent = '☰';
    });
});

// 3. Fade-in Animation on Scroll (Intersection Observer)
// This is a modern, performant way to detect when elements are on screen
const observerConfig = {
    threshold: 0.1 // Trigger when 10% of the element is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the 'visible' class to trigger CSS transition
            entry.target.classList.add('visible');
            // Stop observing once animated (optional, improves performance)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Select all elements with 'fade-in' class and start observing them
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// 4. Simple Form Handling (Prevents refresh for demo)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop the form from actually submitting/reloading
        alert('Thanks for your message! (This is a demo)');
        contactForm.reset(); // Clear the form fields
    });
}


/* =========================================
   HERO AVATAR LIGHTBOX FUNCTIONALITY
   ========================================= */
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const heroAvatar = document.getElementById('hero-avatar');
const closeBtn = document.querySelector('.modal-close');

// Open modal when hero avatar is clicked
heroAvatar.addEventListener('click', () => {
    modal.classList.add('show');
    modalImg.src = heroAvatar.src;
});

// Close modal when X is clicked
closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
});

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// Close modal when Escape key is pressed
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
    }
});
