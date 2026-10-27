const glow = document.querySelector(".cursor-glow");

if (glow && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (event) => {
        glow.style.left = `${event.clientX}px`;
        glow.style.top = `${event.clientY}px`;
    });
}

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach((button) => {
    button.addEventListener("click", () => {
        filters.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        const selectedFilter = button.dataset.filter;

        projects.forEach((card) => {
            const matches =
                selectedFilter === "all" ||
                card.classList.contains(selectedFilter);

            card.style.opacity = "0";

            window.setTimeout(() => {
                card.hidden = !matches;
                card.style.display = matches ? "" : "none";

                if (matches) {
                    requestAnimationFrame(() => {
                        card.style.opacity = "1";
                    });
                }
            }, 200);
        });
    });
});

const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
    const isDark = theme === "dark";

    document.body.classList.toggle("dark-theme", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";

    if (themeToggle) {
        themeToggle.textContent = isDark ? "☀️" : "🌙";
        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light theme" : "Switch to dark theme"
        );
        themeToggle.setAttribute("aria-pressed", String(isDark));
    }

    try {
        localStorage.setItem("theme", theme);
    } catch {
        return;
    }
}

let savedTheme = "light";

try {
    savedTheme = localStorage.getItem("theme") || "light";
} catch {
    savedTheme = "light";
}

setTheme(savedTheme === "dark" ? "dark" : "light");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isDark = document.body.classList.contains("dark-theme");
        setTheme(isDark ? "light" : "dark");
    });
}

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('.navbar nav a[href^="#"]');

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

if (typing && terminalTexts.length) {
    let currentTextIndex = 0;
    let typingInterval;

    typing.textContent = terminalTexts[0];
    typing.style.transition = "opacity 250ms ease";

    function startTerminalTyping() {
        if (typingInterval) {
            window.clearInterval(typingInterval);
        }

        typingInterval = window.setInterval(() => {
            currentTextIndex = (currentTextIndex + 1) % terminalTexts.length;
            typing.style.opacity = "0";

            window.setTimeout(() => {
                typing.textContent = terminalTexts[currentTextIndex];
                typing.style.opacity = "1";
            }, 250);
        }, 2500);
    }

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        startTerminalTyping();
    }
}

const form = document.querySelector(".contact-form");

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        alert("Thank you! I'll get back to you soon.");

        form.reset();
    });
}

const revealCards = document.querySelectorAll(
    ".glass-card, .project-card, .skill-card"
);

if ("IntersectionObserver" in window) {
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
