# REDRYS — Sitio web

Sitio institucional de la **Red de Educación para el Desarrollo Regional y
Sostenible (REDRYS)**, adscrita a la Universidad Autónoma de Guerrero. Está
construido con Astro y se publica como sitio estático.

- Dominio canónico: **https://redrys.org**
- Repositorio: **https://github.com/Luexi/REDRYS**
- Hosting desplegado y destino definitivo: **ChatGPT Sites**.
- Estado de migración: el corte DNS a Sites está en validación. GitHub Pages
  permanece configurado únicamente como respaldo hasta confirmar el dominio,
  HTTPS y los postchecks de producción. Consulta el estado operativo en
  [`docs/migracion-chatgpt-sites.md`](docs/migracion-chatgpt-sites.md).
- Estado editorial: Galería y Repositorio permanecen como secciones en
  preparación, publicadas con `noindex` y fuera del sitemap.

## Inicio rápido

Requiere Node.js 20 o una versión compatible.

```bash
npm ci
npm run dev
```

El servidor local queda disponible normalmente en `http://localhost:4321/`.

Antes de publicar cualquier cambio:

```bash
npm run verify:sites
```

La verificación ejecuta las pruebas del Worker, compila Astro, prepara el
artefacto de ChatGPT Sites y valida rutas, SEO, datos estructurados, sitemap,
404, imágenes y PDFs.

## Qué documento consultar

| Necesidad | Documento |
| --- | --- |
| Entender el diseño técnico, el sistema visual, el Worker y Sites | [`ARCHITECTURE.md`](ARCHITECTURE.md) |
| Actualizar contenido, archivos o estilos y publicar de forma segura | [`MANTENIMIENTO.md`](MANTENIMIENTO.md) |
| Consultar la procedencia del contenido y las decisiones pendientes | [`docs/FUENTES-Y-PENDIENTES.md`](docs/FUENTES-Y-PENDIENTES.md) |
| Saber qué sigue y bajo qué condiciones | [`roadmap.md`](roadmap.md) |
| Revisar el baseline, DNS y procedimiento de rollback de hosting | [`docs/migracion-chatgpt-sites.md`](docs/migracion-chatgpt-sites.md) |

## Rutas públicas

26 rutas, de las cuales 24 son indexables.

| Ruta | Contenido |
| --- | --- |
| `/` | Presentación de la red, líneas de investigación y forma de trabajo |
| `/la-red/` | Naturaleza, creación, estructura, comisiones y sede |
| `/objetivos/` | Objetivo general y objetivos específicos |
| `/lineas-investigacion/` | Índice de las tres líneas |
| `/lineas-investigacion/<slug>/` | Una página por línea de investigación |
| `/integrantes/` | Directorio de integrantes fundadores, agrupado por dependencia |
| `/integrantes/<slug>/` | Perfil académico individual (solo con datos documentados) |
| `/documentos/` | Índice de documentos fundacionales |
| `/documentos/reglamento/` | Texto íntegro del reglamento en HTML |
| `/documentos/acta-de-creacion/` | Datos institucionales del acta y descarga del PDF |
| `/colaborar/` | Requisitos de incorporación, derechos, obligaciones y vinculación |
| `/contacto/` | Correo, teléfono, sede y vías de contacto |
| `/galeria/` | Sección en preparación (`noindex`, fuera del sitemap) |
| `/repositorio/` | Sección en preparación (`noindex`, fuera del sitemap) |
| `/404.html` | Página de error estática con `noindex` y sin canonical |

## Estructura

```text
REDRYS/
├── .github/workflows/deploy.yml     # Despliegue legado de Pages durante el corte
├── .openai/hosting.json             # Enlace local al proyecto de Sites; sin secretos
├── docs/
│   ├── FUENTES-Y-PENDIENTES.md      # Trazabilidad y backlog editorial
│   └── migracion-chatgpt-sites.md   # Baseline, corte y rollback
├── public/
│   ├── docs/                        # Acta y reglamento públicos
│   ├── fonts/                       # Tipografías autoalojadas y licencias OFL
│   └── images/                      # Logo e imagen social
├── scripts/
│   ├── prepare-sites-build.mjs      # Empaqueta Astro para Sites
│   ├── sync-fonts.mjs               # Actualiza public/fonts/ desde devDependencies
│   └── verify-sites-build.mjs       # Verifica el artefacto final
├── sites/worker.mjs                 # Worker de entrega para ChatGPT Sites
├── src/
│   ├── assets/                      # Fotografías; se optimizan con astro:assets
│   ├── components/                  # Header, footer, breadcrumbs, fichas, procedencia, índice
│   ├── content/                     # Colecciones de líneas y documentos (Markdown)
│   ├── content.config.ts            # Esquemas Zod de las colecciones
│   ├── data/                        # Contenido institucional centralizado
│   ├── layouts/BaseLayout.astro     # HTML base, metadata y JSON-LD
│   ├── lib/reglamento.ts            # Anclajes de los artículos del reglamento
│   ├── lib/schema.ts                # Constructores del grafo de datos estructurados
│   ├── pages/                       # Rutas públicas y página 404
│   └── styles/global.css            # Sistema visual
├── tests/sites-worker.test.mjs      # Pruebas del Worker
├── ARCHITECTURE.md
├── MANTENIMIENTO.md
├── roadmap.md
├── astro.config.mjs
└── package.json
```

`dist/`, `.astro/` y `node_modules/` son artefactos generados y no forman parte
del contenido que se edita manualmente.

## Dónde editar contenido

| Cambio | Archivo principal |
| --- | --- |
| Nombre, correo, teléfono, dirección, sede y fundador | `src/data/site.ts` |
| Navegación y enlaces del footer | `src/data/site.ts` |
| Integrantes y sus perfiles | `src/data/integrantes.ts` |
| Objetivos | `src/data/objetivos.ts` |
| Líneas de investigación | `src/content/lineas/*.md` |
| Documentos fundacionales | `src/content/documentos/*.md` |
| Fecha `lastmod` del sitemap | `astro.config.mjs` |
| Colores, tipografía y estilos | `src/styles/global.css` |
| Archivos de tipografía | `public/fonts/` (`npm run sync:fonts`) |
| Acta y reglamento descargables | `public/docs/` |

Los pasos completos y las aprobaciones necesarias están en
[`MANTENIMIENTO.md`](MANTENIMIENTO.md). Para datos institucionales se debe
consultar antes [`docs/FUENTES-Y-PENDIENTES.md`](docs/FUENTES-Y-PENDIENTES.md);
el repositorio representa el contenido público, pero no sustituye la
confirmación de la coordinación de REDRYS.

## Tecnología

- Astro 5 con salida estática.
- Content Collections con validación Zod para líneas y documentos.
- TypeScript para datos de contenido.
- CSS vanilla con custom properties y contrastes WCAG AA verificados.
- Tipografías autoalojadas: Source Serif 4 para el texto institucional y
  Source Sans 3 para el aparato (navegación, etiquetas, metadatos). SIL OFL 1.1.
- **Cero recursos externos**: ninguna petición sale del dominio.
- **Cero JavaScript del lado del cliente**; el menú móvil es CSS.
- `@astrojs/sitemap` con `lastmod` y filtrado de rutas sin contenido.
- Metadata canonical, Open Graph, Twitter Cards y JSON-LD en grafo:
  `ResearchOrganization`, `WebSite`, `WebPage`, `BreadcrumbList`,
  `DigitalDocument` y `Person`.
- Worker ESM para entregar la salida estática en ChatGPT Sites, con rutas
  descubiertas automáticamente desde el build.
- GitHub como fuente de código y respaldo.

## Publicación

El dominio canónico es `https://redrys.org`. El Site definitivo ya está
desplegado en ChatGPT Sites y el dominio se encuentra en proceso de validación.
GitHub Pages se conserva como rollback temporal mientras se confirman HTTPS y
los postchecks de producción.

Un `git push` **no publica automáticamente en ChatGPT Sites**. GitHub conserva
el código y el historial; Sites publica una versión guardada y vinculada a un
SHA concreto. Cada despliegue de Sites es una operación explícita de
producción.

El flujo normal es:

1. Crear una rama desde `main`.
2. Realizar y revisar los cambios.
3. Ejecutar `npm run verify:sites`.
4. Hacer commit, push y fusionar el cambio aprobado.
5. Solicitar la publicación del SHA exacto en el Site existente de REDRYS.
6. Guardar en Sites una versión vinculada a ese SHA.
7. Desplegar explícitamente la versión validada.
8. Verificar `redrys.org`, rutas, assets, 404 y SEO después del despliegue.

Para una actualización ordinaria puede pedirse a Codex:

> Publica en ChatGPT Sites el commit `<SHA>` de REDRYS después de ejecutar las
> verificaciones.

El dominio y sus registros DNS no se cambian en cada actualización: permanecen
asociados al mismo Site.

La arquitectura completa está en [`ARCHITECTURE.md`](ARCHITECTURE.md) y las
instrucciones paso a paso en [`MANTENIMIENTO.md`](MANTENIMIENTO.md). No se
deben cambiar DNS ni retirar GitHub Pages sin seguir la bitácora de
[`docs/migracion-chatgpt-sites.md`](docs/migracion-chatgpt-sites.md).

## Estado editorial

- **Líneas de investigación:** publicadas, con el contenido editorial marcado
  como pendiente de ratificación por la coordinación.
- **Perfiles de integrante:** 11 publicados con nota de procedencia visible;
  pendientes de ratificación. Sin fotografías, ORCID ni perfiles externos.
- **Galería:** pendiente de recibir y aprobar fotografías, textos alternativos
  y pies de foto.
- **Repositorio:** pendiente de que exista un catálogo verificado de
  publicaciones. La condición de entrada está en [`roadmap.md`](roadmap.md).
- **Documentos fundacionales:** el acta y el reglamento están publicados sin
  cambios. El reglamento tiene además su texto íntegro en HTML; el acta solo un
  resumen, porque el documento contiene firmas.
- **Datos institucionales:** correo, lista de integrantes, cargo del fundador,
  participación de FACOM y dirección postal quedaron confirmados el 25 de julio
  de 2026 y registrados en
  [`docs/FUENTES-Y-PENDIENTES.md`](docs/FUENTES-Y-PENDIENTES.md).
