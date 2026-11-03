import test from 'node:test';
import assert from 'node:assert/strict';
import { CATALOG, itemLabel } from './catalog.mjs';

test('chaque meuble du catalogue a un nom russe', () => {
  const missing = CATALOG.filter((item) => !itemLabel(item, 'ru')?.trim() || itemLabel(item, 'ru') === item.en).map((item) => item.id);
  assert.deepEqual(missing, []);
});

test('le catalogue affiche les noms russes', () => {
  assert.equal(itemLabel(CATALOG.find((item) => item.id === 'loungeSofa'), 'ru'), 'Диван');
  assert.equal(itemLabel(CATALOG.find((item) => item.id === 'bedDouble'), 'ru'), 'Двуспальная кровать');
});
