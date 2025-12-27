/* ------------------------------
  portfolio interactivity script
-------------------------------*/

// Typing animation
const typing = document.getElementById('typing');
const phrases = [
  'I build dashboards with Power BI.',
  'I clean messy data with Python.',
  'I tell stories from numbers.'
];
let tIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  const current = phrases[tIndex % phrases.length];
  if(!deleting){
    typing.textContent = current.slice(0, charIndex+1);
    charIndex++;
    if(charIndex === current.length){ deleting = true; setTimeout(typeLoop, 1000); return; }
  } else {
    typing.textContent = current.slice(0, charIndex-1);
    charIndex--;
    if(charIndex === 0){ deleting = false; tIndex++; }
  }
  setTimeout(typeLoop, deleting ? 50 : 90);
}
setTimeout(typeLoop, 600);

// Theme toggle (light/dark)
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  // remember preference
  if(document.body.classList.contains('dark')) localStorage.setItem('theme','dark');
  else localStorage.removeItem('theme');
});
if(localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');

// Smooth scroll highlight (optional)
document.querySelectorAll('.nav-links a').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const id = a.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Animate progress bars when skills visible
function animateSkills(){
  document.querySelectorAll('.progress').forEach(bar=>{
    const rect = bar.getBoundingClientRect();
    if(rect.top < window.innerHeight - 80){
      const val = bar.getAttribute('data-value') || bar.dataset.value;
      bar.querySelector('span').style.width = val + '%';
    }
  });
}
window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// Contact form send animation (no backend) - simulate success
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const status = document.getElementById('formStatus');
    const btn = contactForm.querySelector('button');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    // small animation
    await new Promise(r => setTimeout(r, 900));
    status.textContent = '✅ Message sent! I will reply soon.';
    btn.textContent = 'Sent';
    // reset
    contactForm.reset();
    setTimeout(()=>{ btn.disabled=false; btn.textContent='Send Message'; status.textContent=''; }, 2200);
  });
}

// Back-to-top
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 350) backTop.style.display = 'block';
  else backTop.style.display = 'none';
});
backTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

// Simple on-scroll reveal for project cards
function revealOnScroll(){
  document.querySelectorAll('[data-aos]').forEach(el=>{
    const r = el.getBoundingClientRect();
    if(r.top < window.innerHeight - 80) el.style.opacity = 1, el.style.transform='translateY(0)', el.style.transition='opacity .6s ease, transform .6s ease';
    else el.style.opacity = 0, el.style.transform='translateY(20px)';
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', ()=>{ revealOnScroll(); animateSkills(); });
