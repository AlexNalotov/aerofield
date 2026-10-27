import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateEstimate } from '../src/features/calculator.js';
import { formatLead } from '../src/features/leads.js';
test('estimate handles hectares, decimals and currency rounding', () => {
  assert.equal(calculateEstimate(100, 300), 30000);
  assert.equal(calculateEstimate(1.25, 333.33), 416.66);
});
test('estimate rejects missing, negative and nonfinite values', () => {
  for (const value of [0, -1, NaN, Infinity, '100', 1000001]) {
    assert.throws(() => calculateEstimate(value, 300), RangeError);
    assert.throws(() => calculateEstimate(100, value), RangeError);
  }
});
test('lead text preserves user content and handles optional fields', () => {
  assert.equal(formatLead({name:' Олена ',phone:' +380123456789 ',region:'',area:'12.5',service:''}), 'Заявка AEROFIELD\nІм’я: Олена\nТелефон: +380123456789\nЛокація: Не вказано\nПлоща: 12.5 га\nПослуга: Не вказано');
});
