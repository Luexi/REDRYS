import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const publicRoutes = [
  '/',
  '/la-red/',
  '/objetivos/',
  '/integrantes/',
  '/contacto/',
  '/galeria/',
  '/repositorio/',
];

const routeAssets = new Map(
  publicRoutes.map((route) => [
    route,
    route === '/'
      ? '/index.html'
      : `${route}index.html`,
  ]),
);

function tags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) ?? [];
}

function attribute(tag, name) {
  return tag.match(new RegExp(`${name}=["']([^"']*)["']`, 'i'))?.[1] ?? null;
}

function meta(html, attributeName, attributeValue) {
  const tag = tags(html, 'meta').find(
    (item) => attribute(item, attributeName) === attributeValue,
  );
  return tag ? attribute(tag, 'content') : null;
}

function link(html, rel) {
  const tag = tags(html, 'link').find((item) => attribute(item, 'rel') === rel);
  return tag ? attribute(tag, 'href') : null;
}

async function sha256(path) {
  const contents = await readFile(resolve(path));
  return createHash('sha256').update(contents).digest('hex');
}

const titles = [];
const workerURL = pathToFileURL(resolve('dist/server/index.js'));
workerURL.searchParams.set('verify', `${process.pid}-${Date.now()}`);
const {
  GENERATED_TEXT_ASSETS,
  default: generatedWorker,
} = await import(workerURL.href);
const generatedEnvironment = {
  ASSETS: {
    fetch: async () => new Response('Not found', { status: 404 }),
  },
};
const canonicalResponse = await generatedWorker.fetch(
  new Request('https://redrys.org/'),
  generatedEnvironment,
);
const temporaryResponse = await generatedWorker.fetch(
  new Request('https://redrys-org.example.chatgpt.site/'),
  generatedEnvironment,
);
const temporaryRobots = await generatedWorker.fetch(
  new Request('https://redrys-org.example.chatgpt.site/robots.txt'),
  generatedEnvironment,
);
const generatedNotFound = await generatedWorker.fetch(
  new Request('https://redrys.org/no-existe/', {
    headers: { Accept: 'text/html' },
  }),
  generatedEnvironment,
);

assert.equal(canonicalResponse.status, 200);
assert.equal(canonicalResponse.headers.get('X-Robots-Tag'), null);
assert.equal(temporaryResponse.status, 200);
assert.equal(
  temporaryResponse.headers.get('X-Robots-Tag'),
  'noindex, nofollow',
);
assert.equal(await temporaryRobots.text(), 'User-agent: *\nDisallow: /\n');
assert.equal(generatedNotFound.status, 404);
assert.equal(
  generatedNotFound.headers.get('X-Robots-Tag'),
  'noindex, nofollow',
);

for (const [route, assetPath] of routeAssets) {
  const html = GENERATED_TEXT_ASSETS.get(assetPath)?.body;
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  const canonical = link(html, 'canonical');
  const expectedCanonical = new URL(route, 'https://redrys.org').href;
  const jsonLDText = html.match(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i,
  )?.[1];

  assert.equal(
    html.match(/<html[^>]+lang=["']([^"']+)["']/i)?.[1],
    'es',
    `${route} must declare lang=es`,
  );
  assert.ok(title, `${route} must have a title`);
  assert.ok(meta(html, 'name', 'description'), `${route} needs a description`);
  assert.equal(canonical, expectedCanonical, `${route} canonical mismatch`);

  for (const property of [
    'og:type',
    'og:url',
    'og:title',
    'og:description',
    'og:image',
    'og:site_name',
    'og:locale',
  ]) {
    assert.ok(meta(html, 'property', property), `${route} missing ${property}`);
  }

  for (const name of [
    'twitter:card',
    'twitter:url',
    'twitter:title',
    'twitter:description',
    'twitter:image',
  ]) {
    assert.ok(meta(html, 'name', name), `${route} missing ${name}`);
  }

  assert.equal(meta(html, 'name', 'robots'), null, `${route} must be indexable`);
  assert.ok(jsonLDText, `${route} missing JSON-LD`);
  assert.equal(
    JSON.parse(jsonLDText)['@type'],
    'EducationalOrganization',
    `${route} JSON-LD type mismatch`,
  );
  assert.match(html, /<main\b/i, `${route} must contain crawlable main HTML`);
  titles.push(title);
}

assert.equal(
  new Set(titles).size,
  publicRoutes.length,
  'Every public route must have a unique title',
);

const robots = GENERATED_TEXT_ASSETS.get('/robots.txt')?.body;
assert.match(robots, /User-agent:\s*\*/i);
assert.match(robots, /Allow:\s*\//i);
assert.match(
  robots,
  /Sitemap:\s*https:\/\/redrys\.org\/sitemap-index\.xml/i,
);

const sitemap = GENERATED_TEXT_ASSETS.get('/sitemap-0.xml')?.body;
const sitemapRoutes = [
  ...sitemap.matchAll(/<loc>https:\/\/redrys\.org([^<]*)<\/loc>/g),
]
  .map((match) => match[1] || '/')
  .sort();
assert.deepEqual(sitemapRoutes, [...publicRoutes].sort());

const notFoundHTML = GENERATED_TEXT_ASSETS.get('/404.html')?.body;
assert.equal(meta(notFoundHTML, 'name', 'robots'), 'noindex, nofollow');

for (const asset of [
  'images/logo-redrys-uagro.png',
  'images/screen.png',
  'docs/acta-creacion-redrys.pdf',
  'docs/reglamento-redrys.pdf',
]) {
  assert.equal(
    await sha256(`public/${asset}`),
    await sha256(`dist/client/${asset}`),
    `${asset} changed during the build`,
  );
}

await readFile(resolve('dist/server/index.js'), 'utf8');
for (const internalTextAsset of [
  'index.html',
  '404.html',
  'robots.txt',
  'sitemap-index.xml',
  'sitemap-0.xml',
]) {
  await assert.rejects(
    access(resolve('dist/client', internalTextAsset)),
    `${internalTextAsset} must be served by the Worker`,
  );
}
const hosting = JSON.parse(
  await readFile(resolve('dist/.openai/hosting.json'), 'utf8'),
);
assert.deepEqual(
  Object.keys(hosting).filter(
    (key) => !['project_id', 'd1', 'r2'].includes(key),
  ),
  [],
);

console.log(
  `Verified ${publicRoutes.length} routes, SEO, sitemap, 404, worker and preserved assets.`,
);
