const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

let scrollFrame = 0;
const updateHeader = () => {
  header?.classList.toggle('scrolled', scrollY > 20);
  scrollFrame = 0;
};
addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateHeader);
}, { passive: true });
updateHeader();

menuToggle?.addEventListener('click', () => {
  const open = menu?.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(Boolean(open)));
});
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { rootMargin: '0px 0px -5% 0px', threshold: .08 });
  reveals.forEach(element => observer.observe(element));
} else {
  reveals.forEach(element => element.classList.add('visible'));
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

const testimonialWrap = document.querySelector('[data-mini-testimonials]');
const testimonials = [...document.querySelectorAll('.mini-testimonial')];
const testimonialDots = [...document.querySelectorAll('.mini-testimonial-progress span')];
let testimonialIndex = 0;
let testimonialTimer = 0;
let testimonialsVisible = false;

const showTestimonial = index => {
  testimonials.forEach((item, position) => item.classList.toggle('active', position === index));
  testimonialDots.forEach((dot, position) => dot.classList.toggle('active', position === index));
};
const stopTestimonials = () => {
  clearTimeout(testimonialTimer);
  testimonialTimer = 0;
};
const scheduleTestimonial = () => {
  stopTestimonials();
  if (!testimonialsVisible || document.hidden || reduceMotion.matches || testimonials.length < 2) return;
  testimonialTimer = setTimeout(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
    scheduleTestimonial();
  }, 5200);
};

if (testimonialWrap && 'IntersectionObserver' in window) {
  const testimonialObserver = new IntersectionObserver(([entry]) => {
    testimonialsVisible = entry.isIntersecting;
    scheduleTestimonial();
  }, { threshold: .2 });
  testimonialObserver.observe(testimonialWrap);
} else if (testimonialWrap) {
  testimonialsVisible = true;
  scheduleTestimonial();
}
document.addEventListener('visibilitychange', scheduleTestimonial);
reduceMotion.addEventListener?.('change', scheduleTestimonial);
