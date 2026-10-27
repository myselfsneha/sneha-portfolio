const glow = document.querySelector(".cursor-glow");

if (glow && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (event) => {
        glow.style.left = `${event.clientX}px`;
        glow.style.top = `${event.clientY}px`;
    }, { passive: true });
}

const filters = document.querySelectorAll(".filter-button");
const projects = document.querySelectorAll(".project-card");
const filterTimeouts = new WeakMap();

filters.forEach((button) => {
    button.addEventListener("click", () => {
        filters.forEach((item) => {
            const active = item === button;
            item.classList.toggle("active", active);
            item.setAttribute("aria-pressed", String(active));
        });

        const selectedFilter = button.dataset.filter;

        projects.forEach((card) => {
            const previousTimeout = filterTimeouts.get(card);

            if (previousTimeout) {
                window.clearTimeout(previousTimeout);
                filterTimeouts.delete(card);
            }

            const matches =
                selectedFilter === "all" ||
                card.dataset.category === selectedFilter;

            if (!matches) {
                card.style.opacity = "0";

                const timeout = window.setTimeout(() => {
                    card.hidden = true;
                    card.style.display = "none";
                    filterTimeouts.delete(card);
                }, 200);

                filterTimeouts.set(card, timeout);
            } else {
                card.hidden = false;
                card.style.display = "";
                card.style.opacity = "0";

                requestAnimationFrame(() => {
                    card.style.opacity = "1";
                });
            }
        });
    });
});

const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
    const isDark = theme === "dark";

    document.body.classList.toggle("dark-theme", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";

    if (themeToggle) {
        const icon = themeToggle.querySelector(".theme-icon");

        if (icon) {
            icon.textContent = isDark ? "☀️" : "☾";
        } else {
            themeToggle.textContent = isDark ? "☀️" : "🌙";
        }

        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light theme" : "Switch to dark theme"
        );
        themeToggle.setAttribute("aria-pressed", String(isDark));
    }

    try {
        localStorage.setItem("theme", theme);
    } catch {}
}

let savedTheme = "light";

try {
    savedTheme = localStorage.getItem("theme") || "light";
} catch {}

setTheme(savedTheme === "dark" ? "dark" : "light");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isDark = document.body.classList.contains("dark-theme");
        setTheme(isDark ? "light" : "dark");
    });
}

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        mainNav.classList.toggle("open", !isExpanded);
        document.body.classList.toggle("menu-open", !isExpanded);
    });

    mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menuToggle.setAttribute("aria-expanded", "false");
            mainNav.classList.remove("open");
            document.body.classList.remove("menu-open");
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            menuToggle.setAttribute("aria-expanded", "false");
            mainNav.classList.remove("open");
            document.body.classList.remove("menu-open");
        }
    });
}

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

function updateActiveNav() {
    let currentSection = "";

    sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= 160) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${currentSection}`;

        link.classList.toggle("active", active);

        if (active) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("load", updateActiveNav);
updateActiveNav();

const typing = document.querySelector(".typing-terminal");

const terminalTexts = [
    "Open to Internships...",
    "Full Stack Developer...",
    "Data Analytics Enthusiast...",
    "AI/ML Learner..."
];

if (
    typing &&
    terminalTexts.length &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
    let currentTextIndex = 0;
    typing.textContent = terminalTexts[0];
    typing.style.transition = "opacity 250ms ease";

    window.setInterval(() => {
        currentTextIndex = (currentTextIndex + 1) % terminalTexts.length;
        typing.style.opacity = "0";

        window.setTimeout(() => {
            typing.textContent = terminalTexts[currentTextIndex];
            typing.style.opacity = "1";
        }, 250);
    }, 2500);
}

const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameInput = document.getElementById("contactName");
        const emailInput = document.getElementById("contactEmail");
        const messageInput = document.getElementById("contactMessage");

        const name = nameInput?.value.trim() || "";
        const email = emailInput?.value.trim() || "";
        const message = messageInput?.value.trim() || "";

        if (!name || !email || !message) {
            form.reportValidity();
            return;
        }

        if (!emailInput.checkValidity()) {
            emailInput.reportValidity();
            return;
        }

        const whatsappNumber = "916232448666";

        const whatsappMessage = [
            "Hi Sneha! I contacted you through your portfolio.",
            "",
            `Name: ${name}`,
            `Email: ${email}`,
            "",
            "Message:",
            message
        ].join("\n");

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        if (formStatus) {
            formStatus.textContent =
                "Opening WhatsApp with your message. Please review it and tap Send there.";
        }

        const whatsappWindow = window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

        if (!whatsappWindow) {
            window.location.href = whatsappURL;
        }
    });
}

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const revealCards = document.querySelectorAll(
    ".glass-card, .project-card, .skill-card"
);

if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
    const observer = new IntersectionObserver(
        (entries, activeObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    activeObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealCards.forEach((card) => observer.observe(card));
} else {
    revealCards.forEach((card) => card.classList.add("show"));
}
