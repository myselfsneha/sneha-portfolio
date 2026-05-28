// Cursor Glow
const glow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// Project Filtering
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach(button => {
  button.addEventListener("click", () => {

    filters.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    projects.forEach(card => {

      if (filter === "all") {
        card.style.display = "block";
      }

      else if (card.classList.contains(filter)) {
        card.style.display = "block";
      }

      else {
        card.style.display = "none";
      }

    });

  });
});

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");

let darkMode = true;

themeToggle.addEventListener("click", () => {

  if (darkMode) {
    document.documentElement.style.setProperty("--bg", "#f5f5f5");
    document.documentElement.style.setProperty("--text", "#111111");
    themeToggle.textContent = "☀️";
  }

  else {
    document.documentElement.style.setProperty("--bg", "#0f0f14");
    document.documentElement.style.setProperty("--text", "#ffffff");
    themeToggle.textContent = "🌙";
  }

  darkMode = !darkMode;

});
