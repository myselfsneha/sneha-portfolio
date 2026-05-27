// THEME
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

// NAV SCROLL
window.addEventListener("scroll", () => {
  document.getElementById("navbar")
    .classList.toggle("scrolled", window.scrollY > 50);
});

// TYPING
const texts = [
  "Full Stack Developer",
  "Open Source Contributor",
  "Data Analyst",
  "Problem Solver"
];

let i=0,j=0,del=false;

function type(){
  const el=document.getElementById("typing");
  let t=texts[i];

  el.textContent=t.substring(0,j);

  if(!del && j++===t.length){
    del=true;setTimeout(type,1000);return;
  }

  if(del && j--===0){
    del=false;i=(i+1)%texts.length;
  }

  setTimeout(type,del?50:100);
}
type();

// FILTER
function filterProjects(type){
  document.querySelectorAll(".project-card").forEach(c=>{
    c.style.display=(type==="all"||c.classList.contains(type))?"block":"none";
  });
}

// CONTACT (demo)
function sendMessage(){
  alert("Message sent (demo)");
}