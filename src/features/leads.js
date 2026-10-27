export function formatLead(data) {
  return `Заявка AEROFIELD\nІм’я: ${data.name.trim()}\nТелефон: ${data.phone.trim()}\nЛокація: ${data.region.trim() || 'Не вказано'}\nПлоща: ${data.area || 'Не вказано'} га\nПослуга: ${data.service || 'Не вказано'}`;
}

export function initLeadForm() {
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
