const projects = [
  {title: 'Project One', description: 'A short description of project one.', url: '#', tech: ['JS','HTML','CSS']},
  {title: 'Project Two', description: 'A short description of project two.', url: '#', tech: ['Python','ML']},
  {title: 'Project Three', description: 'A short description of project three.', url: '#', tech: ['Go','API']}
];

function renderProjects(){
  const list = document.getElementById('projects-list');
  list.innerHTML = '';
  projects.forEach(p => {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `
      <h4><a href="${p.url}" target="_blank" rel="noopener" style="color:inherit;text-decoration:none">${p.title}</a></h4>
      <p>${p.description}</p>
      <div class="tech">${p.tech.join(' • ')}</div>
    `;
    list.appendChild(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  document.getElementById('year').textContent = new Date().getFullYear();
  // smooth link behavior
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth'});
      }
    });
  });
  // Contact form handling (uses Formspree or similar endpoint)
  const form = document.getElementById('contact-form');
  if(form){
    const statusEl = document.getElementById('contact-status');
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      statusEl.textContent = 'Sending…';
      statusEl.className = 'status';
      const endpoint = form.dataset.endpoint;
      const data = new FormData(form);
      try{
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: data
        });
        if(res.ok){
          statusEl.textContent = 'Thanks — message sent.';
          statusEl.classList.add('success');
          form.reset();
        } else {
          const json = await res.json().catch(()=>null);
          statusEl.textContent = (json && json.error) ? json.error : 'Failed to send message.';
          statusEl.classList.add('error');
        }
      }catch(err){
        statusEl.textContent = 'Network error — try again later.';
        statusEl.classList.add('error');
      }
    });
  }

  // Scroll animations using IntersectionObserver
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  if(animateElements.length){
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const el = entry.target;
          el.classList.add('in-view');
          // if this element contains children to stagger
          const staggerItems = el.querySelectorAll && el.querySelectorAll('.card');
          if(staggerItems && staggerItems.length){
            staggerItems.forEach((item, i) => {
              setTimeout(()=> item.classList.add('in-view'), i * 80);
            });
          }
          obs.unobserve(el);
        }
      });
    }, {threshold: 0.12, rootMargin: '0px 0px -8% 0px'});

    animateElements.forEach(el => observer.observe(el));
  }

  // Hamburger menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if(menuToggle && nav){
    menuToggle.addEventListener('click', ()=>{
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // animate hamburger to X
      menuToggle.classList.toggle('open');
    });

    // close nav when a link is clicked (mobile)
    nav.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=>{
      if(nav.classList.contains('open')){
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('open');
      }
    }));
  }
});
