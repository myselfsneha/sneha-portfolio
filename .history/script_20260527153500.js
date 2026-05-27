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

import { useState } from "react";
import { projects } from "../data/projects";

export default function Projects() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? projects
      : projects.filter(p => p.type === filter);

  return (
    <section className="section">
      <h2>Projects</h2>

      <div className="filters">
        {["all","frontend","analytics","opensource"].map(f => (
          <button key={f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid">
        {filtered.map((p, i) => (
          <div className="card" key={i}>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";

const texts = [
  "Full Stack Developer",
  "Data Analyst",
  "Open Source Contributor",
  "Cloud Enthusiast"
];

export default function Hero() {
  const [text, setText] = useState("");
  let i = 0, j = 0, del = false;

  useEffect(() => {
    function type() {
      let current = texts[i];
      setText(current.substring(0, j));

      if (!del && j++ === current.length) {
        del = true;
        setTimeout(type, 1000);
        return;
      }

      if (del && j-- === 0) {
        del = false;
        i = (i + 1) % texts.length;
      }

      setTimeout(type, del ? 50 : 100);
    }

    type();
  }, []);

  return (
    <section className="section">
      <h1>Sneha Singh</h1>
      <h2>{text}</h2>
      <p>Building impactful digital experiences.</p>
    </section>
  );
}