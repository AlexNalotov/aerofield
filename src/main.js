import { initCalculator } from './features/calculator.js';
import { initLeadForm } from './features/leads.js';
import { initVideo } from './features/video.js';

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
