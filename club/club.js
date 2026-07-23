const header = document.querySelector('[data-header]');
const menu = document.querySelector('#menu');
const menuToggle = document.querySelector('.menu-toggle');
const progress = document.querySelector('[data-progress]');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let scrollFrame = 0;

const onScroll = () => {
  header?.classList.toggle('scrolled', window.scrollY > 18);
  const max = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  scrollFrame = 0;
};
addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(onScroll);
}, { passive: true });
onScroll();

menuToggle?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  }), { rootMargin: '0px 0px -5% 0px', threshold: .08 });
  reveals.forEach(element => revealObserver.observe(element));
} else {
  reveals.forEach(element => element.classList.add('visible'));
}

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

if (matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference) and (update:fast)').matches) {
  const hero = document.querySelector('.club-hero');
  const depthElements = [...document.querySelectorAll('[data-depth]')];
  let pointerFrame = 0;
  let pointerX = 0;
  let pointerY = 0;
  hero?.addEventListener('pointermove', event => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(() => {
      const x = (pointerX / innerWidth - .5) * 18;
      const y = (pointerY / innerHeight - .5) * 18;
      depthElements.forEach(element => {
        const depth = Number(element.dataset.depth);
        element.style.translate = `${x * depth}px ${y * depth}px`;
      });
      pointerFrame = 0;
    });
  }, { passive: true });
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
