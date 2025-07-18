// Minimal interaction script
console.log("Sneha's portfolio loaded.");
// Reveal sections on scroll
const sections = document.querySelectorAll("section");

function revealOnScroll() {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
      section.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
