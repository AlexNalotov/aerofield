import { mkdir, copyFile, cp, readFile, writeFile } from 'node:fs/promises';
// Keep source modules testable; generate a classic script for file:// support.
const modules = ['src/features/calculator.js', 'src/features/leads.js', 'src/features/video.js', 'src/main.js'];
const parts = await Promise.all(modules.map(async path => {
  const source = await readFile(path, 'utf8');
  return source.replace(/^import .*;\r?\n/gm, '').replace(/^export /gm, '');
}));
await mkdir('public', { recursive: true });
await writeFile('public/app.js', '/* Generated; edit src/ and run node scripts/build.mjs. */\n(() => {\n' + parts.join('\n') + '\n})();\n');
await mkdir('dist', { recursive: true });
await copyFile('index.html', 'dist/index.html');
await cp('src', 'dist/src', { recursive: true });
await cp('public', 'dist/public', { recursive: true });
console.log('Build complete: dist/');
