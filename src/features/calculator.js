export function calculateEstimate(area, rate) {
  if (![area, rate].every(value => typeof value === 'number' && Number.isFinite(value) && value > 0 && value <= 1_000_000)) {
    throw new RangeError('Площа й тариф мають бути більшими за нуль і не перевищувати 1 000 000.');
  }
  return Math.round((area * rate + Number.EPSILON) * 100) / 100;
}

export function initCalculator() {
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
