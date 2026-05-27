// THEME TOGGLE
const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// NAVBAR SCROLL EFFECT
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// TYPING ANIMATION
const roles = [
  "Full Stack Developer",
  "Open Source Contributor",
  "Cloud Enthusiast",
  "Data Analytics Enthusiast",
  "Problem Solver"
];

let index = 0;
let charIndex = 0;
let isDeleting = false;
const typedText = document.getElementById("typedText");

function typeEffect() {
  const current = roles[index];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typedText.textContent = current.substring(0, charIndex);

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1200);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % roles.length;
  }

  setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();

// PROJECT FILTERING
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".project-card");

filters.forEach(btn => {
  btn.addEventListener("click", () => {

    // active button
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    cards.forEach(card => {
      if (filter === "all") {
        card.style.display = "block";
      } else {
        if (card.classList.contains(filter)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      }
    });

  });
});

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach(section => {
  section.classList.add("hidden");
  observer.observe(section);
});