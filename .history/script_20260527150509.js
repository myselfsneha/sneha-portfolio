// THEME TOGGLE
const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// NAVBAR SCROLL
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// TYPING EFFECT
const texts = [
  "Full Stack Developer",
  "Open Source Contributor",
  "Cloud Enthusiast",
  "Data Analytics Enthusiast",
  "Problem Solver"
];

let i = 0;
let j = 0;
let currentText = "";
let isDeleting = false;

function type() {
  currentText = texts[i];

  if (isDeleting) {
    j--;
  } else {
    j++;
  }

  document.getElementById("typing").textContent = currentText.substring(0, j);

  if (!isDeleting && j === currentText.length) {
    isDeleting = true;
    setTimeout(type, 1000);
    return;
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % texts.length;
  }

  setTimeout(type, isDeleting ? 50 : 100);
}

type();

// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});