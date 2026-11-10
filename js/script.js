
// Mobile Navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const isExpanded = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isExpanded);
});

// Close menu after selecting a link
document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });

});

// Dark and Light Mode
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-theme");

    const isDark = document.body.classList.contains("dark-theme");

    themeToggle.textContent = isDark ? "☀" : "☾";

});


// Typing Animation
const typingText = document.getElementById("typingText");

const roles = [
    " | Machine Learning Enthusiast",
    " | Data Analyst",
    " | AI Enthusiast",
    " | Problem Solver"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {
        typingText.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentRole.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();


// Skills Filtering

const filterButtons = document.querySelectorAll(".filter-btn");
const skillCards = document.querySelectorAll(".skill-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedCategory = button.dataset.filter;

        // Update active button
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        // Filter skills
        skillCards.forEach(card => {

            const category = card.dataset.category;

            if (
                selectedCategory === "all" ||
                selectedCategory === category
            ) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }

        });

    });

});


// =====================================
// PROJECT FILTERING
// =====================================

const projectFilters = document.querySelectorAll(".project-filter");
const projectCards = document.querySelectorAll(".project-card");

projectFilters.forEach(button => {

    button.addEventListener("click", () => {

        const selectedCategory = button.dataset.filter;

        // Update active filter
        projectFilters.forEach(btn => {
            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        // Display matching projects
        projectCards.forEach(card => {

            const category = card.dataset.category;

            if (
                selectedCategory === "all" ||
                selectedCategory === category
            ) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }

        });

    });

});


// =====================================
// PROJECT DETAILS MODAL
// =====================================

const projectModal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalStack = document.getElementById("modalStack");

let previousFocus = null;

// Open project details
document.querySelectorAll(".project-details").forEach(button => {

    button.addEventListener("click", () => {

        previousFocus = button;

        modalTitle.textContent = button.dataset.title;
        modalDescription.textContent = button.dataset.description;
        modalStack.textContent = button.dataset.stack;

        projectModal.classList.add("active");
        projectModal.setAttribute("aria-hidden", "false");

        modalClose.focus();

    });

});

// Close modal
function closeProjectModal() {

    projectModal.classList.remove("active");
    projectModal.setAttribute("aria-hidden", "true");

    if (previousFocus) {
        previousFocus.focus();
    }

}

modalClose.addEventListener("click", closeProjectModal);

// Close when clicking outside the modal content
projectModal.addEventListener("click", event => {

    if (event.target === projectModal) {
        closeProjectModal();
    }

});

// Close using Escape key
document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        projectModal.classList.contains("active")
    ) {
        closeProjectModal();
    }

});


// ==============================
// CONTACT FORM
// ==============================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            formStatus.textContent = "Please complete all fields.";
            return;
        }

        const subject = encodeURIComponent("Portfolio Contact Message");
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        const recipient = "YOUR_EMAIL@example.com";

        window.location.href =
            `mailto:${recipient}?subject=${subject}&body=${body}`;

        formStatus.textContent =
            "Your email application should open with your message.";
    });
}


// ==============================
// CURRENT YEAR
// ==============================

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// ==============================
// SCROLL REVEAL ANIMATIONS
// ==============================

const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .highlight-card, .skill-card, .project-card, .contact-container"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ==============================
// BACK TO TOP BUTTON
// ==============================

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

}

// ==============================
// ACTIVE NAVIGATION LINK
// ==============================

const sections = document.querySelectorAll(
    "section[id]"
);

const activeNavLinks = document.querySelectorAll(
    ".nav-links a[href^='#']"
);

const sectionObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                const currentId = entry.target.id;

                navLinks.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${currentId}`
                    );
                });

            }
        });
    },
    {
        rootMargin: "-30% 0px -60% 0px"
    }
);

sections.forEach(section => {
    sectionObserver.observe(section);
});