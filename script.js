async function renderProjects() {
  const response = await fetch('projects.json', { cache: 'no-store' });
  const projects = await response.json();
  document.querySelector('#count').textContent = `${String(projects.length).padStart(2, '0')} INTERFACES`;
  document.querySelector('#updated').textContent = `UPDATED ${projects[0]?.date.replaceAll('-', '.') ?? '—'}`;
  document.querySelector('#projects').innerHTML = projects.map((project, index) => `
    <a class="project" href="${project.url}" target="_blank" rel="noreferrer" style="--accent:${project.accent}">
      <span class="project-number">${String(index + 1).padStart(2, '0')}</span>
      <span class="project-copy"><strong>${project.title}</strong><i>${project.englishTitle}</i></span>
      <span class="project-tags">${project.tags.join(' · ')}</span><span class="arrow" aria-hidden="true">↗</span>
    </a>`).join('');
}
renderProjects().catch(() => {
  document.querySelector('#projects').textContent = 'PROJECT INDEX UNAVAILABLE';
});
