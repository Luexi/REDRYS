import { copyFile, mkdir, readFile, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, '..');
const distDirectory = resolve(projectRoot, 'dist');
const serverDirectory = resolve(distDirectory, 'server');
const distOpenAIDirectory = resolve(distDirectory, '.openai');
const sourceHostingPath = resolve(projectRoot, '.openai', 'hosting.json');
const sourceWorkerPath = resolve(projectRoot, 'sites', 'worker.mjs');

const hosting = JSON.parse(await readFile(sourceHostingPath, 'utf8'));
const allowedKeys = new Set(['project_id', 'd1', 'r2']);
const unexpectedKeys = Object.keys(hosting).filter((key) => !allowedKeys.has(key));

if (unexpectedKeys.length > 0) {
  throw new Error(
    `.openai/hosting.json contains unsupported keys: ${unexpectedKeys.join(', ')}`,
  );
}

await rm(serverDirectory, { recursive: true, force: true });
await rm(distOpenAIDirectory, { recursive: true, force: true });
await mkdir(serverDirectory, { recursive: true });
await mkdir(distOpenAIDirectory, { recursive: true });

await copyFile(sourceWorkerPath, resolve(serverDirectory, 'index.js'));
await copyFile(sourceHostingPath, resolve(distOpenAIDirectory, 'hosting.json'));

console.log('Prepared dist/server/index.js and dist/.openai/hosting.json for Sites.');
