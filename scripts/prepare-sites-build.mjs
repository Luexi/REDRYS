import {
  copyFile,
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  writeFile,
} from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, '..');
const distDirectory = resolve(projectRoot, 'dist');
const clientDirectory = resolve(distDirectory, 'client');
const serverDirectory = resolve(distDirectory, 'server');
const distOpenAIDirectory = resolve(distDirectory, '.openai');
const sourceHostingPath = resolve(projectRoot, '.openai', 'hosting.json');
const sourceWorkerPath = resolve(projectRoot, 'sites', 'worker.mjs');
const generatedAssetMarker = '/* __GENERATED_TEXT_ASSETS__ */';

const textAssetSpecs = [
  ['/index.html', 'index.html', 'text/html; charset=utf-8'],
  ['/la-red/index.html', 'la-red/index.html', 'text/html; charset=utf-8'],
  ['/objetivos/index.html', 'objetivos/index.html', 'text/html; charset=utf-8'],
  [
    '/integrantes/index.html',
    'integrantes/index.html',
    'text/html; charset=utf-8',
  ],
  ['/contacto/index.html', 'contacto/index.html', 'text/html; charset=utf-8'],
  ['/galeria/index.html', 'galeria/index.html', 'text/html; charset=utf-8'],
  [
    '/repositorio/index.html',
    'repositorio/index.html',
    'text/html; charset=utf-8',
  ],
  ['/404.html', '404.html', 'text/html; charset=utf-8'],
  ['/robots.txt', 'robots.txt', 'text/plain; charset=utf-8'],
  ['/sitemap-index.xml', 'sitemap-index.xml', 'text/xml; charset=utf-8'],
  ['/sitemap-0.xml', 'sitemap-0.xml', 'text/xml; charset=utf-8'],
];

const hosting = JSON.parse(await readFile(sourceHostingPath, 'utf8'));
const allowedKeys = new Set(['project_id', 'd1', 'r2']);
const unexpectedKeys = Object.keys(hosting).filter((key) => !allowedKeys.has(key));

if (unexpectedKeys.length > 0) {
  throw new Error(
    `.openai/hosting.json contains unsupported keys: ${unexpectedKeys.join(', ')}`,
  );
}

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

if (!workerSource.includes(generatedAssetMarker)) {
  throw new Error('The Sites worker is missing its generated asset marker.');
}

const builtWorker = workerSource.replace(
  generatedAssetMarker,
  JSON.stringify(generatedTextAssets),
);

for (const target of [
  'index.html',
  '404.html',
  'robots.txt',
  'sitemap-index.xml',
  'sitemap-0.xml',
  'CNAME',
  'la-red',
  'objetivos',
  'integrantes',
  'contacto',
  'galeria',
  'repositorio',
]) {
  await rm(resolve(distDirectory, target), { recursive: true, force: true });
}

await rm(serverDirectory, { recursive: true, force: true });
await rm(distOpenAIDirectory, { recursive: true, force: true });
await rm(clientDirectory, { recursive: true, force: true });
await mkdir(clientDirectory, { recursive: true });

for (const entry of await readdir(distDirectory, { withFileTypes: true })) {
  if (['client', 'server', '.openai'].includes(entry.name)) {
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
  'Prepared dist/client, dist/server/index.js and dist/.openai/hosting.json for Sites.',
);
