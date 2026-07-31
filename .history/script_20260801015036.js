// ======================
// Cursor Glow
// ======================

const glow = document.querySelector(".cursor-glow");

if (glow) {
  window.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

// ======================
// Project Filtering
// ======================

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach((button) => {
  button.addEventListener("click", () => {

    filters.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    projects.forEach((card) => {

      card.style.opacity = "0";

      setTimeout(() => {

        if (filter === "all" || card.classList.contains(filter)) {

          card.style.display = "block";

          setTimeout(() => {
            card.style.opacity = "1";
          }, 100);

        } else {

          card.style.display = "none";

        }

      }, 200);

    });

  });
});

// ======================
// Theme Toggle
// ======================

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");

function enableLightMode() {

  document.documentElement.style.setProperty("--bg", "#f5f5f5");
  document.documentElement.style.setProperty("--text", "#111111");

  themeToggle.textContent = "☀️";

}

function enableDarkMode() {

  document.documentElement.style.setProperty("--bg", "#0f0f14");
  document.documentElement.style.setProperty("--text", "#ffffff");

  themeToggle.textContent = "🌙";

}

if (savedTheme === "light") {

  enableLightMode();

} else {

  enableDarkMode();

}

themeToggle.addEventListener("click", () => {

  if (localStorage.getItem("theme") === "light") {

    enableDarkMode();
    localStorage.setItem("theme", "dark");

  } else {

    enableLightMode();
    localStorage.setItem("theme", "light");

  }

});

// ======================
// Active Navbar
// ======================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach((section) => {

    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      current = section.id;
    }

  });

  navLinks.forEach((link) => {

    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }

  });

});

// ======================
// Terminal Typing
// ======================

const typing = document.querySelector(".typing-terminal");

const texts = [
  "Open to Internships...",
  "Full Stack Developer...",
  "Data Analytics Enthusiast...",
  "AI/ML Learner..."
];

let currentText = 0;

if (typing) {

  typing.textContent = texts[0];

  setInterval(() => {

    currentText = (currentText + 1) % texts.length;

    typing.style.opacity = "0";

    setTimeout(() => {

      typing.textContent = texts[currentText];
      typing.style.opacity = "1";

    }, 250);

  }, 2500);

}

// ======================
// Contact Form
// ======================

const form = document.querySelector(".contact-form");

if (form) {

  form.addEventListener("submit", (e) => {

    e.preventDefault();

    alert("Thank you! I'll get back to you soon.");

    form.reset();

  });

}

// ======================
// Scroll Reveal
// ======================

const revealCards = document.querySelectorAll(
  ".glass-card, .project-card, .skill-card"
);

const observer = new IntersectionObserver(

  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");

      }

    });

  },

  {
    threshold: 0.2
  }

);

revealCards.forEach((card) => observer.observe(card));