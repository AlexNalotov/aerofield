export function initVideo() {
  const video = document.querySelector('#hero-video');
  const button = document.querySelector('#video-toggle');
  const status = document.querySelector('#video-status');
  if (!video || !button) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = false;
  let visible = true;
  let failed = false;
  const sync = () => { button.textContent = video.paused ? '▶ Відтворити відео' : 'Ⅱ Призупинити відео'; };
  async function play() {
    if (!video.getAttribute('src')) video.src = video.dataset.src;
    try { await video.play(); } catch { sync(); }
  }
  button.addEventListener('click', () => {
    if (video.paused) { userPaused = false; play(); }
    else { userPaused = true; video.pause(); }
  });
  video.addEventListener('play', sync);
  video.addEventListener('pause', sync);
  video.addEventListener('error', () => {
    failed = true;
    video.style.visibility = 'hidden';
    button.hidden = true;
    status.textContent = 'Відео недоступне. Показано фотографію поля.';
  });
  const canAutoPlay = () => !failed && !userPaused && !reducedMotion.matches && !navigator.connection?.saveData && visible && !document.hidden;
  const update = () => { if (canAutoPlay()) play(); else video.pause(); };
  reducedMotion.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); }, { threshold: 0.15 }).observe(video);
  document.querySelectorAll('.film video').forEach(film => film.addEventListener('play', () => {
    document.querySelectorAll('.film video').forEach(other => { if (other !== film) other.pause(); });
    video.pause();
  }));
  update();
}
