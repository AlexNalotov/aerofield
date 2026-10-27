/* Generated; edit src/ and run node scripts/build.mjs. */
(() => {
function calculateEstimate(area, rate) {
  if (![area, rate].every(value => typeof value === 'number' && Number.isFinite(value) && value > 0 && value <= 1_000_000)) {
    throw new RangeError('Площа й тариф мають бути більшими за нуль і не перевищувати 1 000 000.');
  }
  return Math.round((area * rate + Number.EPSILON) * 100) / 100;
}

function initCalculator() {
  const area = document.querySelector('#calc-area');
  const rate = document.querySelector('#calc-rate');
  const output = document.querySelector('#estimate');
  const currency = new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH' });
  function update() {
    if (!rate.value) { output.textContent = 'Вкажіть тариф'; return; }
    try { output.textContent = currency.format(calculateEstimate(area.valueAsNumber, rate.valueAsNumber)); }
    catch (error) { output.textContent = error.message; }
  }
  area.addEventListener('input', update);
  rate.addEventListener('input', update);
  document.querySelector('#use-estimate').addEventListener('click', () => {
    if (area.checkValidity() && area.value) document.querySelector('[name="area"]').value = area.value;
  });
}

function formatLead(data) {
  return `Заявка AEROFIELD\nІм’я: ${data.name.trim()}\nТелефон: ${data.phone.trim()}\nЛокація: ${data.region.trim() || 'Не вказано'}\nПлоща: ${data.area || 'Не вказано'} га\nПослуга: ${data.service || 'Не вказано'}`;
}

function initLeadForm() {
  document.querySelector('#leadForm').addEventListener('submit', async event => {
    event.preventDefault();
    const form = event.currentTarget;
    for (const name of ['name', 'phone']) {
      const input = form.elements.namedItem(name);
      if (!input.value.trim()) { input.value = ''; input.reportValidity(); return; }
    }
    const text = formatLead(Object.fromEntries(new FormData(form)));
    const result = document.querySelector('#result');
    result.style.display = 'block';
    result.textContent = 'Скопіюйте заявку та передайте менеджеру:\n\n' + text;
    try { await navigator.clipboard.writeText(text); result.textContent = '✓ Текст скопійовано. Заявку ще не надіслано.\n\n' + text; } catch {}
  });
}

function initVideo() {
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


const toggle = document.querySelector('.mobileToggle');
const menu = document.querySelector('#menu');
function setMenu(open) {
  menu.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); } });
document.querySelector('#year').textContent = new Date().getFullYear();
initCalculator();
initLeadForm();
initVideo();

})();
