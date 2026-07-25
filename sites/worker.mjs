const APEX_HOST = 'redrys.org';
const TEMPORARY_HOST_SUFFIX = '.chatgpt.site';
const GENERATED_TEXT_ASSETS = new Map(/* __GENERATED_TEXT_ASSETS__ */);

const PAGE_ASSETS = new Map([
  ['/', '/index.html'],
  ['/la-red/', '/la-red/index.html'],
  ['/objetivos/', '/objetivos/index.html'],
  ['/integrantes/', '/integrantes/index.html'],
  ['/contacto/', '/contacto/index.html'],
  ['/galeria/', '/galeria/index.html'],
  ['/repositorio/', '/repositorio/index.html'],
]);

const INTERNAL_PREFIXES = ['/server/', '/.openai/'];

function isTemporaryHost(hostname) {
  return hostname === 'chatgpt.site' || hostname.endsWith(TEMPORARY_HOST_SUFFIX);
}

function isInternalPath(pathname) {
  return INTERNAL_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function canonicalPagePath(pathname) {
  if (pathname === '/' || pathname.endsWith('/')) {
    return null;
  }

  const withSlash = `${pathname}/`;
  return PAGE_ASSETS.has(withSlash) ? withSlash : null;
}

function redirectResponse(url, status = 308) {
  return new Response(null, {
    status,
    headers: {
      Location: url.toString(),
      'Cache-Control': 'public, max-age=300',
    },
  });
}

function addResponseHeaders(response, { noindex = false } = {}) {
  const headers = new Headers(response.headers);
  headers.set('X-Content-Type-Options', 'nosniff');

  if (noindex) {
    headers.set('X-Robots-Tag', 'noindex, nofollow');
  } else {
    headers.delete('X-Robots-Tag');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function fetchAsset(request, env, pathname) {
  const generatedAsset = GENERATED_TEXT_ASSETS.get(pathname);

  if (generatedAsset) {
    return new Response(request.method === 'HEAD' ? null : generatedAsset.body, {
      status: 200,
      headers: { 'Content-Type': generatedAsset.contentType },
    });
  }

  const assetURL = new URL(request.url);
  assetURL.pathname = pathname;

  return env.ASSETS.fetch(new Request(assetURL, request));
}

async function customNotFound(request, env) {
  const page = await fetchAsset(request, env, '/404.html');
  const headers = new Headers(page.headers);
  headers.set('Content-Type', 'text/html; charset=utf-8');

  return addResponseHeaders(
    new Response(page.body, {
      status: 404,
      statusText: 'Not Found',
      headers,
    }),
    { noindex: true },
  );
}

const worker = {
  async fetch(request, env) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'GET, HEAD' },
      });
    }

    const url = new URL(request.url);
    const temporaryHost = isTemporaryHost(url.hostname);

    if (url.hostname === `www.${APEX_HOST}`) {
      url.protocol = 'https:';
      url.hostname = APEX_HOST;
      return redirectResponse(url);
    }

    const normalizedPagePath = canonicalPagePath(url.pathname);
    if (normalizedPagePath) {
      url.pathname = normalizedPagePath;
      return redirectResponse(url);
    }

    if (temporaryHost && url.pathname === '/robots.txt') {
      return addResponseHeaders(
        new Response('User-agent: *\nDisallow: /\n', {
          status: 200,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        }),
        { noindex: true },
      );
    }

    if (isInternalPath(url.pathname)) {
      return customNotFound(request, env);
    }

    const assetPath = PAGE_ASSETS.get(url.pathname) ?? url.pathname;
    const response = await fetchAsset(request, env, assetPath);

    if (response.status === 404) {
      const acceptsHTML = request.headers.get('Accept')?.includes('text/html');
      const pathHasExtension = /\/[^/]+\.[^/]+$/.test(url.pathname);

      if (acceptsHTML || !pathHasExtension) {
        return customNotFound(request, env);
      }
    }

    return addResponseHeaders(response, { noindex: temporaryHost });
  },
};

export { GENERATED_TEXT_ASSETS, PAGE_ASSETS, isTemporaryHost };
export default worker;
