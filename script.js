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
});
