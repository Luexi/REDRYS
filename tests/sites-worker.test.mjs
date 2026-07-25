import assert from 'node:assert/strict';
import test from 'node:test';

import { createWorker } from '../sites/worker.mjs';

/**
 * En el código fuente las rutas están vacías: las inyecta
 * `scripts/prepare-sites-build.mjs` a partir del build. Las pruebas usan una
 * lista propia para verificar el comportamiento del Worker de forma aislada.
 */
const worker = createWorker({
  pageRoutes: [
    '/',
    '/la-red/',
    '/objetivos/',
    '/lineas-investigacion/',
    '/lineas-investigacion/cultura-tributaria-y-responsabilidad-fiscal/',
  ],
});

const assets = new Map([
  ['/index.html', ['home', 'text/html; charset=utf-8']],
  ['/la-red/index.html', ['la red', 'text/html; charset=utf-8']],
  [
    '/lineas-investigacion/cultura-tributaria-y-responsabilidad-fiscal/index.html',
    ['linea', 'text/html; charset=utf-8'],
  ],
  ['/404.html', ['not found', 'text/html; charset=utf-8']],
  ['/robots.txt', ['public robots', 'text/plain; charset=utf-8']],
  ['/images/logo-redrys-uagro.png', ['png', 'image/png']],
]);

function createEnvironment(requests) {
  return {
    ASSETS: {
      async fetch(request) {
        const url = new URL(request.url);
        requests.push(url.pathname);
        const asset = assets.get(url.pathname);

        if (!asset) {
          return new Response('missing', { status: 404 });
        }

        return new Response(asset[0], {
          status: 200,
          headers: { 'Content-Type': asset[1] },
        });
      },
    },
  };
}

async function request(url, options = {}) {
  const requests = [];
  const response = await worker.fetch(
    new Request(url, {
      headers: { Accept: 'text/html', ...options.headers },
      method: options.method ?? 'GET',
    }),
    createEnvironment(requests),
  );

  return { response, requests };
}

test('serves the home and public page assets on the canonical host', async () => {
  const home = await request('https://redrys.org/');
  const page = await request('https://redrys.org/la-red/');

  assert.equal(home.response.status, 200);
  assert.deepEqual(home.requests, ['/index.html']);
  assert.equal(home.response.headers.get('X-Robots-Tag'), null);
  assert.equal(page.response.status, 200);
  assert.deepEqual(page.requests, ['/la-red/index.html']);
});

test('serves nested routes such as research lines', async () => {
  const { response, requests } = await request(
    'https://redrys.org/lineas-investigacion/cultura-tributaria-y-responsabilidad-fiscal/',
  );

  assert.equal(response.status, 200);
  assert.deepEqual(requests, [
    '/lineas-investigacion/cultura-tributaria-y-responsabilidad-fiscal/index.html',
  ]);
});

test('redirects public pages without a trailing slash', async () => {
  const { response, requests } = await request(
    'https://redrys.org/la-red?source=test',
  );

  assert.equal(response.status, 308);
  assert.equal(
    response.headers.get('Location'),
    'https://redrys.org/la-red/?source=test',
  );
  assert.deepEqual(requests, []);
});

test('redirects nested public pages without a trailing slash', async () => {
  const { response } = await request(
    'https://redrys.org/lineas-investigacion/cultura-tributaria-y-responsabilidad-fiscal',
  );

  assert.equal(response.status, 308);
  assert.equal(
    response.headers.get('Location'),
    'https://redrys.org/lineas-investigacion/cultura-tributaria-y-responsabilidad-fiscal/',
  );
});

test('redirects www to the apex while preserving path and query', async () => {
  const { response } = await request(
    'https://www.redrys.org/objetivos/?source=test',
  );

  assert.equal(response.status, 308);
  assert.equal(
    response.headers.get('Location'),
    'https://redrys.org/objetivos/?source=test',
  );
});

test('prevents indexing on the temporary Sites hostname', async () => {
  const page = await request('https://redrys-org.example.chatgpt.site/');
  const robots = await request(
    'https://redrys-org.example.chatgpt.site/robots.txt',
  );

  assert.equal(page.response.headers.get('X-Robots-Tag'), 'noindex, nofollow');
  assert.equal(robots.response.status, 200);
  assert.equal(await robots.response.text(), 'User-agent: *\nDisallow: /\n');
  assert.equal(
    robots.response.headers.get('X-Robots-Tag'),
    'noindex, nofollow',
  );
});

test('returns a real custom 404 and blocks internal files', async () => {
  const missing = await request('https://redrys.org/no-existe/');
  const internal = await request('https://redrys.org/server/index.js');

  assert.equal(missing.response.status, 404);
  assert.equal(await missing.response.text(), 'not found');
  assert.equal(missing.response.headers.get('X-Robots-Tag'), 'noindex, nofollow');
  assert.equal(internal.response.status, 404);
  assert.deepEqual(internal.requests, ['/404.html']);
});

test('preserves static assets and rejects unsupported methods', async () => {
  const asset = await request(
    'https://redrys.org/images/logo-redrys-uagro.png',
    { headers: { Accept: 'image/png' } },
  );
  const post = await request('https://redrys.org/', { method: 'POST' });

  assert.equal(asset.response.status, 200);
  assert.equal(asset.response.headers.get('Content-Type'), 'image/png');
  assert.deepEqual(asset.requests, ['/images/logo-redrys-uagro.png']);
  assert.equal(post.response.status, 405);
  assert.equal(post.response.headers.get('Allow'), 'GET, HEAD');
});
