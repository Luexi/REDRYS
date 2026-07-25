import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * Rutas publicadas sin contenido suficiente. Se sirven con `noindex, follow` y
 * quedan fuera del sitemap hasta que dejen de ser secciones en preparación.
 * Debe coincidir con `EXCLUDED_FROM_SITEMAP` en `astro.config.mjs`.
 */
const NOINDEX_ROUTES = new Set(['/galeria/', '/repositorio/']);

/** Mínimo de palabras dentro de <main> exigible a una ruta indexable. */
const MIN_WORDS_INDEXABLE = 200;

/** Dominios externos permitidos en el HTML publicado. */
const ALLOWED_EXTERNAL_HOSTS = new Set([
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'schema.org',
  'www.w3.org',
  'redrys.org',
  'www.uagro.mx',
]);

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

function mainWordCount(html) {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? '';
  const text = main
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return text ? text.split(' ').length : 0;
}

function externalHosts(html) {
  const matches = html.match(/(?:src|href)=["']https?:\/\/([^/"']+)/gi) ?? [];
  return matches.map((item) => item.split('//')[1]);
}

async function sha256(path) {
  const contents = await readFile(resolve(path));
  return createHash('sha256').update(contents).digest('hex');
}

const workerURL = pathToFileURL(resolve('dist/server/index.js'));
workerURL.searchParams.set('verify', `${process.pid}-${Date.now()}`);
const {
  GENERATED_TEXT_ASSETS,
  GENERATED_PAGE_ROUTES,
  default: generatedWorker,
} = await import(workerURL.href);

const publicRoutes = [...GENERATED_PAGE_ROUTES].sort();
const indexableRoutes = publicRoutes.filter((route) => !NOINDEX_ROUTES.has(route));

assert.ok(publicRoutes.includes('/'), 'The build must expose the home route');
assert.ok(
  indexableRoutes.length >= publicRoutes.length - NOINDEX_ROUTES.size,
  'Unexpected noindex route in the build',
);

// --- Comportamiento del Worker generado ---

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
const nestedRedirect = await generatedWorker.fetch(
  new Request('https://redrys.org/lineas-investigacion'),
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
assert.equal(nestedRedirect.status, 308, 'Nested routes must redirect to the trailing slash');
assert.equal(
  nestedRedirect.headers.get('Location'),
  'https://redrys.org/lineas-investigacion/',
);

// --- SEO por ruta ---

const titles = [];

for (const route of publicRoutes) {
  const assetPath = route === '/' ? '/index.html' : `${route}index.html`;
  const html = GENERATED_TEXT_ASSETS.get(assetPath)?.body;
  assert.ok(html, `${route} is missing from the generated assets`);

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
  assert.ok(
    title.length <= 75,
    `${route} title is too long (${title.length} characters)`,
  );
  assert.ok(meta(html, 'name', 'description'), `${route} needs a description`);
  assert.equal(canonical, expectedCanonical, `${route} canonical mismatch`);

  for (const property of [
    'og:type',
    'og:url',
    'og:title',
    'og:description',
    'og:image',
    'og:image:width',
    'og:image:height',
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

  const robots = meta(html, 'name', 'robots');

  if (NOINDEX_ROUTES.has(route)) {
    assert.equal(
      robots,
      'noindex, follow',
      `${route} must be noindex while it has no content`,
    );
  } else {
    assert.equal(robots, null, `${route} must be indexable`);
    assert.ok(
      mainWordCount(html) >= MIN_WORDS_INDEXABLE,
      `${route} has too little content to be indexable (${mainWordCount(html)} words)`,
    );
  }

  // Un solo H1 por página.
  assert.equal(
    (html.match(/<h1\b/gi) ?? []).length,
    1,
    `${route} must contain exactly one H1`,
  );

  // JSON-LD válido, con la entidad de la red referenciable por @id.
  assert.ok(jsonLDText, `${route} missing JSON-LD`);
  const jsonLD = JSON.parse(jsonLDText);
  assert.ok(Array.isArray(jsonLD['@graph']), `${route} JSON-LD must use @graph`);
  const organization = jsonLD['@graph'].find(
    (node) => node['@id'] === 'https://redrys.org/#organizacion',
  );
  assert.ok(organization, `${route} JSON-LD missing the organization node`);
  assert.equal(organization['@type'], 'ResearchOrganization');

  // Ningún recurso externo no autorizado (p. ej. imágenes de stock).
  for (const host of externalHosts(html)) {
    assert.ok(
      ALLOWED_EXTERNAL_HOSTS.has(host),
      `${route} references the unexpected external host ${host}`,
    );
  }

  assert.match(html, /<main\b/i, `${route} must contain crawlable main HTML`);
  assert.match(html, /class="skip-link"/, `${route} must expose the skip link`);
  titles.push(title);
}

assert.equal(
  new Set(titles).size,
  publicRoutes.length,
  'Every public route must have a unique title',
);

// --- robots.txt y sitemap ---

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

assert.deepEqual(
  sitemapRoutes,
  indexableRoutes,
  'The sitemap must list exactly the indexable routes',
);
assert.match(sitemap, /<lastmod>\d{4}-\d{2}-\d{2}/, 'The sitemap must declare lastmod');

for (const route of NOINDEX_ROUTES) {
  assert.ok(
    !sitemapRoutes.includes(route),
    `${route} must not appear in the sitemap`,
  );
}

// --- Página 404 ---

const notFoundHTML = GENERATED_TEXT_ASSETS.get('/404.html')?.body;
assert.equal(meta(notFoundHTML, 'name', 'robots'), 'noindex, follow');
assert.equal(
  link(notFoundHTML, 'canonical'),
  null,
  'The 404 page must not declare a canonical URL',
);

// --- Assets preservados y estructura del artefacto ---

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
  `Verified ${publicRoutes.length} routes (${indexableRoutes.length} indexable), SEO, ` +
    'structured data, sitemap, 404, worker and preserved assets.',
);
