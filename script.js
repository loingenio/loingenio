const header=document.querySelector('[data-header]');
const menuToggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('#menu');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>20));
menuToggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',open)});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false')}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelector('[data-year]').textContent=new Date().getFullYear();

const miniTestimonials=document.querySelectorAll('.mini-testimonial');
const miniTestimonialDots=document.querySelectorAll('.mini-testimonial-progress span');
if(miniTestimonials.length>1&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  let miniTestimonialIndex=0;
  setInterval(()=>{
    miniTestimonials[miniTestimonialIndex].classList.remove('active');
    miniTestimonialDots[miniTestimonialIndex]?.classList.remove('active');
    miniTestimonialIndex=(miniTestimonialIndex+1)%miniTestimonials.length;
    miniTestimonials[miniTestimonialIndex].classList.add('active');
    miniTestimonialDots[miniTestimonialIndex]?.classList.add('active');
  },4500);
}
