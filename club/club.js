const header = document.querySelector('[data-header]');
const menu = document.querySelector('#menu');
const menuToggle = document.querySelector('.menu-toggle');
const progress = document.querySelector('[data-progress]');

const onScroll = () => {
  header?.classList.toggle('scrolled', window.scrollY > 18);
  const max = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

menuToggle?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const demoContent = {
  crea: ['Imagina tu mundo', 'Transforma una idea en personajes, reglas y desafíos.'],
  aprende: ['Prueba y mejora', 'Descubre lógica y resolución de problemas mientras construyes.'],
  comparte: ['Hazlo jugar', 'Presenta tu proyecto y celebra todo lo que aprendiste.']
};
document.querySelectorAll('[data-demo]').forEach(button => button.addEventListener('click', () => {
  const [title, copy] = demoContent[button.dataset.demo];
  document.querySelectorAll('[data-demo]').forEach(item => {
    item.classList.toggle('active', item === button);
    item.setAttribute('aria-selected', String(item === button));
  });
  document.querySelector('[data-demo-title]').textContent = title;
  document.querySelector('[data-demo-copy]').textContent = copy;
  document.querySelector('[data-game-stage]').animate([{ transform: 'scale(.985)' }, { transform: 'scale(1)' }], { duration: 280 });
}));

document.querySelector('[data-play]')?.addEventListener('click', event => {
  const playing = document.querySelector('[data-game-stage]').classList.toggle('playing');
  event.currentTarget.classList.toggle('active', playing);
  event.currentTarget.querySelector('span').textContent = playing ? 'Ⅱ' : '▶';
  event.currentTarget.setAttribute('aria-label', playing ? 'Pausar demostración' : 'Activar demostración');
});

if (matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches) {
  document.querySelector('.club-hero')?.addEventListener('pointermove', event => {
    const x = (event.clientX / innerWidth - .5) * 18;
    const y = (event.clientY / innerHeight - .5) * 18;
    document.querySelectorAll('[data-depth]').forEach(el => {
      const depth = Number(el.dataset.depth);
      el.style.translate = `${x * depth}px ${y * depth}px`;
    });
  });
}

document.querySelector('[data-year]').textContent = new Date().getFullYear();
