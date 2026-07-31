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
        card.style.opacity = "0";

setTimeout(() => {

    if(filter==="all" || card.classList.contains(filter)){
        card.style.display="block";

        setTimeout(()=>{
            card.style.opacity="1";
        },100);
    }
    else{
        card.style.display="none";
    }

},200);
      }

      else if (card.classList.contains(filter)) {
        card.style.opacity = "0";

setTimeout(() => {

    if(filter==="all" || card.classList.contains(filter)){
        card.style.display="block";

        setTimeout(()=>{
            card.style.opacity="1";
        },100);
    }
    else{
        card.style.display="none";
    }

},200);
      }

      else {
        card.style.opacity = "0";

setTimeout(() => {

    if(filter==="all" || card.classList.contains(filter)){
        card.style.display="block";

        setTimeout(()=>{
            card.style.opacity="1";
        },100);
    }
    else{
        card.style.display="none";
    }

},200);
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
