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

const savedTheme = localStorage.getItem("theme");

if(savedTheme==="light"){
    document.documentElement.style.setProperty("--bg","#f5f5f5");
    document.documentElement.style.setProperty("--text","#111111");
    themeToggle.textContent="☀️";
}
else{
    document.documentElement.style.setProperty("--bg","#0f0f14");
    document.documentElement.style.setProperty("--text","#ffffff");
    themeToggle.textContent="🌙";
}

themeToggle.addEventListener("click",()=>{

    if(localStorage.getItem("theme")==="light"){

        document.documentElement.style.setProperty("--bg","#0f0f14");
        document.documentElement.style.setProperty("--text","#ffffff");

        themeToggle.textContent="🌙";

        localStorage.setItem("theme","dark");

    }

    else{

        document.documentElement.style.setProperty("--bg","#f5f5f5");
        document.documentElement.style.setProperty("--text","#111111");

        themeToggle.textContent="☀️";

        localStorage.setItem("theme","light");

    }

});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-150;

        if(pageYOffset>=sectionTop){
            current=section.getAttribute("id");
        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){
            link.classList.add("active");
        }

    });

});

const typing=document.querySelector(".typing-terminal");

const texts=[
"Open to Internships...",
"Full Stack Developer...",
"Data Analytics Enthusiast...",
"AI/ML Learner..."
];

let i=0;

setInterval(()=>{

typing.textContent=texts[i];

i=(i+1)%texts.length;

},2500);

const form=document.querySelector(".contact-form");

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    alert("Thank you! I'll get back to you soon.");

    form.reset();

});

const reveal=document.querySelectorAll(".glass-card,.project-card,.skill-card");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{threshold:.2});

reveal.forEach(card=>observer.observe(card));