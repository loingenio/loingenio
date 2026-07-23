const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');
menuButton?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

// Cuando tengas el enlace de YouTube, pega aquí sólo el código del video.
const YOUTUBE_VIDEO_ID = '';
if (YOUTUBE_VIDEO_ID) {
  const shell = document.querySelector('[data-video-shell]');
  const loadButton = document.querySelector('[data-video-load]');
  loadButton.disabled = false;
  loadButton.querySelector('strong').textContent = 'Reproducir la clase';
  loadButton.querySelector('p').textContent = 'El video se cargará sólo cuando pulses este botón.';
  loadButton.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`;
    iframe.title = 'Bienvenida al curso Creando mi primer videojuego con Scratch';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    shell.replaceChildren(iframe);
  }, { once: true });
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
