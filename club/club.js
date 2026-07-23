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

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
