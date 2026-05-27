
// ================= THEME TOGGLE =================
const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// ================= NAVBAR SCROLL =================
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ================= TYPING EFFECT =================
const texts = [
  "Full Stack Developer",
  "Open Source Contributor",
  "Cloud Enthusiast",
  "Data Analytics Enthusiast",
  "Problem Solver"
];

let i = 0, j = 0, isDeleting = false;

function type() {
  const el = document.getElementById("typing");
  let current = texts[i];

  if (!isDeleting) {
    el.textContent = current.substring(0, j++);
  } else {
    el.textContent = current.substring(0, j--);
  }

  if (!isDeleting && j === current.length) {
    isDeleting = true;
    setTimeout(type, 1200);
    return;
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % texts.length;
  }

  setTimeout(type, isDeleting ? 50 : 90);
}

type();

// ================= GSAP ANIMATIONS =================
gsap.registerPlugin(ScrollTrigger);

// HERO ANIMATION
gsap.from(".hero-left", {
  opacity: 0,
  x: -80,
  duration: 1
});

gsap.from(".hero-right", {
  opacity: 0,
  x: 80,
  duration: 1
});

// SECTION REVEAL ANIMATION
gsap.utils.toArray(".section").forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%"
    },
    opacity: 0,
    y: 60,
    duration: 1
  });
});

// PROJECT CARDS ANIMATION
gsap.from(".project-card", {
  scrollTrigger: {
    trigger: ".projects-grid",
    start: "top 80%"
  },
  opacity: 0,
  y: 40,
  stagger: 0.15,
  duration: 0.8
});

// ================= MOUSE FOLLOW GLOW =================
const glow = document.createElement("div");

glow.style.position = "fixed";
glow.style.width = "200px";
glow.style.height = "200px";
glow.style.borderRadius = "50%";
glow.style.background = "radial-gradient(circle, rgba(192,132,252,0.3), transparent)";
glow.style.pointerEvents = "none";
glow.style.transform = "translate(-50%, -50%)";
glow.style.zIndex = "0";

document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const top = section.offsetTop - 150;
    if (scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});