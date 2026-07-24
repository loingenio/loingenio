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

const mailerLiteForm = document.querySelector('[data-mailerlite-form]');
let mailerLiteLoaded = false;

function ml_webform_success_44111574() {
  const formBody = mailerLiteForm?.querySelector('.row-form');
  const successBody = mailerLiteForm?.querySelector('.row-success');
  if (formBody) formBody.hidden = true;
  if (successBody) successBody.hidden = false;
}

const loadMailerLite = () => {
  if (!mailerLiteForm || mailerLiteLoaded) return;
  mailerLiteLoaded = true;
  const script = document.createElement('script');
  script.src = 'https://groot.mailerlite.com/js/w/webforms.min.js?v83147fa8ce2d95cb73ece7f28b469519';
  script.async = true;
  document.head.appendChild(script);
  fetch('https://assets.mailerlite.com/jsonp/2514975/forms/193908274732467554/takel', {
    mode: 'no-cors',
    credentials: 'omit'
  }).catch(() => {});
};

if (mailerLiteForm && 'IntersectionObserver' in window) {
  const mailerLiteObserver = new IntersectionObserver(([entry], observer) => {
    if (!entry.isIntersecting) return;
    loadMailerLite();
    observer.disconnect();
  }, { rootMargin: '500px 0px' });
  mailerLiteObserver.observe(mailerLiteForm);
} else {
  loadMailerLite();
}
