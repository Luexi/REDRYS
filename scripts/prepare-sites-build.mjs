import {
  copyFile,
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  writeFile,
} from 'node:fs/promises';
import { dirname, posix, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, '..');
const distDirectory = resolve(projectRoot, 'dist');
const clientDirectory = resolve(distDirectory, 'client');
const serverDirectory = resolve(distDirectory, 'server');
const distOpenAIDirectory = resolve(distDirectory, '.openai');
const sourceHostingPath = resolve(projectRoot, '.openai', 'hosting.json');
const sourceWorkerPath = resolve(projectRoot, 'sites', 'worker.mjs');

const textAssetsMarker = '/* __GENERATED_TEXT_ASSETS__ */';
const pageRoutesMarker = '/* __GENERATED_PAGE_ROUTES__ */';

/** Archivos de texto generados por Astro que el Worker sirve directamente. */
const ROOT_TEXT_ASSETS = [
  ['robots.txt', 'text/plain; charset=utf-8'],
  ['sitemap-index.xml', 'text/xml; charset=utf-8'],
  ['sitemap-0.xml', 'text/xml; charset=utf-8'],
];

/** Directorios de `dist/` que no forman parte del contenido publicado. */
const NON_CONTENT_ENTRIES = new Set(['client', 'server', '.openai']);

/**
 * Recorre `dist/` y devuelve todas las páginas HTML generadas por Astro. Las
 * rutas no se mantienen a mano: añadir una página nueva a `src/pages/` basta
 * para que quede incluida en el artefacto de Sites.
 */
async function collectHtmlFiles(directory) {
  const found = [];

  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (NON_CONTENT_ENTRIES.has(entry.name)) {
      continue;
    }

    const entryPath = resolve(directory, entry.name);

    if (entry.isDirectory()) {
      found.push(...(await collectHtmlFiles(entryPath)));
      continue;
    }

    if (entry.name.endsWith('.html')) {
      found.push(relative(distDirectory, entryPath).split(sep).join(posix.sep));
    }
  }

  return found;
}

const hosting = JSON.parse(await readFile(sourceHostingPath, 'utf8'));
const allowedKeys = new Set(['project_id', 'd1', 'r2']);
const unexpectedKeys = Object.keys(hosting).filter((key) => !allowedKeys.has(key));

if (unexpectedKeys.length > 0) {
  throw new Error(
    `.openai/hosting.json contains unsupported keys: ${unexpectedKeys.join(', ')}`,
  );
}

const htmlFiles = (await collectHtmlFiles(distDirectory)).sort();

if (!htmlFiles.includes('index.html') || !htmlFiles.includes('404.html')) {
  throw new Error('The Astro build is missing index.html or 404.html.');
}

/**
 * Toda página `x/index.html` corresponde a la ruta pública `/x/`. `404.html` no
 * es una ruta pública: el Worker la sirve como respuesta de error.
 */
const pageRoutes = htmlFiles
  .filter((file) => file === 'index.html' || file.endsWith('/index.html'))
  .map((file) => (file === 'index.html' ? '/' : `/${file.slice(0, -'index.html'.length)}`))
  .sort();

const textAssetSpecs = [
  ...htmlFiles.map((file) => [`/${file}`, file, 'text/html; charset=utf-8']),
  ...ROOT_TEXT_ASSETS.map(([file, contentType]) => [`/${file}`, file, contentType]),
];

const generatedTextAssets = await Promise.all(
  textAssetSpecs.map(async ([publicPath, sourcePath, contentType]) => [
    publicPath,
    {
      body: await readFile(resolve(distDirectory, sourcePath), 'utf8'),
      contentType,
    },
  ]),
);

const workerSource = await readFile(sourceWorkerPath, 'utf8');

for (const marker of [textAssetsMarker, pageRoutesMarker]) {
  if (!workerSource.includes(marker)) {
    throw new Error(`The Sites worker is missing the marker ${marker}.`);
  }
}

const builtWorker = workerSource
  .replace(textAssetsMarker, JSON.stringify(generatedTextAssets))
  .replace(pageRoutesMarker, JSON.stringify(pageRoutes).slice(1, -1));

/** Recursos que sirve el Worker y que no deben quedar sueltos en `client/`. */
const workerServedFiles = [
  ...htmlFiles,
  ...ROOT_TEXT_ASSETS.map(([file]) => file),
  'CNAME',
];

for (const target of workerServedFiles) {
  await rm(resolve(distDirectory, target), { recursive: true, force: true });
}

/** Directorios que quedaron vacíos tras retirar sus `index.html`. */
for (const route of pageRoutes) {
  if (route === '/') {
    continue;
  }

  const directory = resolve(distDirectory, route.slice(1, -1));
  const remaining = await readdir(directory).catch(() => null);

  if (remaining && remaining.length === 0) {
    await rm(directory, { recursive: true, force: true });
  }
}

await rm(serverDirectory, { recursive: true, force: true });
await rm(distOpenAIDirectory, { recursive: true, force: true });
await rm(clientDirectory, { recursive: true, force: true });
await mkdir(clientDirectory, { recursive: true });

for (const entry of await readdir(distDirectory, { withFileTypes: true })) {
  if (NON_CONTENT_ENTRIES.has(entry.name)) {
    continue;
  }

  await rename(
    resolve(distDirectory, entry.name),
    resolve(clientDirectory, entry.name),
  );
}

await mkdir(serverDirectory, { recursive: true });
await mkdir(distOpenAIDirectory, { recursive: true });

await writeFile(resolve(serverDirectory, 'index.js'), builtWorker, 'utf8');
await copyFile(sourceHostingPath, resolve(distOpenAIDirectory, 'hosting.json'));

console.log(
  `Prepared ${pageRoutes.length} routes and ${generatedTextAssets.length} text assets ` +
    'into dist/client, dist/server/index.js and dist/.openai/hosting.json.',
);
