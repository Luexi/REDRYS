import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Copia las tipografías a `public/fonts/`.
 *
 * Los archivos se versionan en el repositorio a propósito: el sitio no debe
 * depender de `node_modules` ni de un CDN de terceros para renderizar su texto.
 * Los paquetes de `@fontsource-variable` son solo la procedencia verificable de
 * esos archivos, por eso viven en `devDependencies`.
 *
 * Ejecuta `npm run sync:fonts` únicamente al actualizar una tipografía. Después
 * hay que revisar el resultado y volver a ejecutar `npm run verify:sites`.
 */

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const fontsDirectory = resolve(projectRoot, 'public', 'fonts');

/** [paquete, archivo dentro de `files/`, destino en `public/fonts/`] */
const FONT_FILES = [
  [
    '@fontsource-variable/source-serif-4',
    'source-serif-4-latin-wght-normal.woff2',
    'source-serif-4-latin-wght-normal.woff2',
  ],
  [
    '@fontsource-variable/source-sans-3',
    'source-sans-3-latin-wght-normal.woff2',
    'source-sans-3-latin-wght-normal.woff2',
  ],
  [
    '@fontsource-variable/source-sans-3',
    'source-sans-3-latin-wght-italic.woff2',
    'source-sans-3-latin-wght-italic.woff2',
  ],
];

/** La licencia SIL OFL debe acompañar a los archivos redistribuidos. */
const LICENSE_FILES = [
  ['@fontsource-variable/source-serif-4', 'LICENSE-source-serif-4.txt'],
  ['@fontsource-variable/source-sans-3', 'LICENSE-source-sans-3.txt'],
];

await mkdir(fontsDirectory, { recursive: true });

for (const [packageName, sourceFile, targetFile] of FONT_FILES) {
  await copyFile(
    resolve(projectRoot, 'node_modules', packageName, 'files', sourceFile),
    resolve(fontsDirectory, targetFile),
  );
}

for (const [packageName, targetFile] of LICENSE_FILES) {
  await copyFile(
    resolve(projectRoot, 'node_modules', packageName, 'LICENSE'),
    resolve(fontsDirectory, targetFile),
  );
}

console.log(
  `Synced ${FONT_FILES.length} font files and ${LICENSE_FILES.length} licenses into public/fonts/.`,
);
