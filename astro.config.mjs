import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Fecha de la última revisión del contenido publicado.
 *
 * Se usa como `lastmod` de las rutas del sitemap. Actualízala cuando se
 * publique un cambio real de contenido; no debe derivarse de la fecha de build,
 * porque cada compilación produciría una fecha nueva sin que el contenido haya
 * cambiado. El procedimiento está en `MANTENIMIENTO.md`.
 */
const CONTENT_LAST_MODIFIED = '2026-07-25';

/**
 * Rutas excluidas del sitemap: no tienen contenido suficiente y se publican con
 * `noindex`. Deben reincorporarse en cuanto dejen de ser secciones en
 * preparación.
 */
const EXCLUDED_FROM_SITEMAP = ['/galeria/', '/repositorio/'];

export default defineConfig({
  site: 'https://redrys.org',
  integrations: [
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        return !EXCLUDED_FROM_SITEMAP.includes(pathname);
      },
      serialize: (item) => ({
        ...item,
        lastmod: CONTENT_LAST_MODIFIED,
      }),
    }),
  ],
});
