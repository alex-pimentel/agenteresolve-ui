import { cp, mkdir } from 'node:fs/promises';

await mkdir('dist', { recursive: true });
await cp('src/styles/globals.css', 'dist/styles.css');
console.log('Copied src/styles/globals.css -> dist/styles.css');
