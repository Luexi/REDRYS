import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const publicRoutes = [
  '/',
  '/la-red/',
  '/objetivos/',
  '/integrantes/',
  '/contacto/',
  '/galeria/',
  '/repositorio/',
];

const routeFiles = new Map(
  publicRoutes.map((route) => [
    route,
    route === '/' ? 'dist/index.html' : `dist${route}index.html`,
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

for (const [route, file] of routeFiles) {
  const html = await readFile(resolve(file), 'utf8');
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

const robots = await readFile(resolve('dist/robots.txt'), 'utf8');
assert.match(robots, /User-agent:\s*\*/i);
assert.match(robots, /Allow:\s*\//i);
assert.match(
  robots,
  /Sitemap:\s*https:\/\/redrys\.org\/sitemap-index\.xml/i,
);

const sitemap = await readFile(resolve('dist/sitemap-0.xml'), 'utf8');
const sitemapRoutes = [
  ...sitemap.matchAll(/<loc>https:\/\/redrys\.org([^<]*)<\/loc>/g),
]
  .map((match) => match[1] || '/')
  .sort();
assert.deepEqual(sitemapRoutes, [...publicRoutes].sort());

const notFoundHTML = await readFile(resolve('dist/404.html'), 'utf8');
assert.equal(meta(notFoundHTML, 'name', 'robots'), 'noindex, nofollow');

for (const asset of [
  'images/logo-redrys-uagro.png',
  'images/screen.png',
  'docs/acta-creacion-redrys.pdf',
  'docs/reglamento-redrys.pdf',
]) {
  assert.equal(
    await sha256(`public/${asset}`),
    await sha256(`dist/${asset}`),
    `${asset} changed during the build`,
  );
}

await readFile(resolve('dist/server/index.js'), 'utf8');
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
