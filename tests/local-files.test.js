import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
for (const entry of ['index.html', 'dist/index.html']) {
  test(`${entry}: assets resolve when opened as a local file`, async () => {
    const file = resolve(root, entry);
    const html = await readFile(file, 'utf8');
    const assets = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
      .map(match => match[1]).filter(value => !value.startsWith('#') && !/^https?:/.test(value));
    assert.ok(assets.length >= 3);
    for (const asset of assets) {
      assert.ok(asset.startsWith('./'), `Asset must be relative: ${asset}`);
      await access(resolve(dirname(file), asset));
    }
    assert.doesNotMatch(html, /<script[^>]+type="module"/);
  });
}
