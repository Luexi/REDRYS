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
- Estado editorial: Galería y Repositorio permanecen como secciones
  informativas pendientes de contenido.

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
artefacto de ChatGPT Sites y valida rutas, SEO, sitemap, 404, imágenes y PDFs.

## Qué documento consultar

| Necesidad | Documento |
| --- | --- |
| Entender el diseño técnico, el Worker, Sites y el respaldo temporal | [`ARCHITECTURE.md`](ARCHITECTURE.md) |
| Actualizar contenido, archivos o estilos y publicar de forma segura | [`MANTENIMIENTO.md`](MANTENIMIENTO.md) |
| Consultar la procedencia del contenido y las decisiones pendientes | [`docs/FUENTES-Y-PENDIENTES.md`](docs/FUENTES-Y-PENDIENTES.md) |
| Revisar el baseline, DNS y procedimiento de rollback de hosting | [`docs/migracion-chatgpt-sites.md`](docs/migracion-chatgpt-sites.md) |

## Rutas públicas

| Ruta | Contenido |
| --- | --- |
| `/` | Presentación general de REDRYS |
| `/la-red/` | Naturaleza, estructura, comisiones y documentos fundacionales |
| `/objetivos/` | Objetivo general y objetivos específicos |
| `/integrantes/` | Directorio de integrantes fundadores publicados |
| `/contacto/` | Información de contacto y sede |
| `/galeria/` | Placeholder pendiente de fotografías aprobadas |
| `/repositorio/` | Placeholder pendiente de publicaciones y materiales |
| `/404.html` | Página de error estática con `noindex` |

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
│   └── images/                      # Logo e imagen social
├── scripts/
│   ├── prepare-sites-build.mjs      # Empaqueta Astro para Sites
│   └── verify-sites-build.mjs       # Verifica el artefacto final
├── sites/worker.mjs                 # Worker de entrega para ChatGPT Sites
├── src/
│   ├── components/                  # Header, footer y tarjetas reutilizables
│   ├── data/                        # Contenido institucional centralizado
│   ├── layouts/BaseLayout.astro     # HTML base, metadata y JSON-LD
│   ├── pages/                       # Siete rutas públicas y página 404
│   └── styles/global.css            # Sistema visual
├── tests/sites-worker.test.mjs      # Pruebas del Worker
├── ARCHITECTURE.md
├── MANTENIMIENTO.md
├── astro.config.mjs
└── package.json
```

`dist/`, `.astro/` y `node_modules/` son artefactos generados y no forman parte
del contenido que se edita manualmente.

## Dónde editar contenido

| Cambio | Archivo principal |
| --- | --- |
| Nombre, correo, teléfono, sede y coordinador | `src/data/site.ts` |
| Navegación y enlaces del footer | `src/data/site.ts` |
| Integrantes publicados | `src/data/integrantes.ts` |
| Objetivos | `src/data/objetivos.ts` |
| Líneas de investigación | `src/data/lineas.ts` |
| Colores, tipografía y estilos | `src/styles/global.css` |
| Acta y reglamento descargables | `public/docs/` |

Los pasos completos y las aprobaciones necesarias están en
[`MANTENIMIENTO.md`](MANTENIMIENTO.md). Para datos institucionales se debe
consultar antes [`docs/FUENTES-Y-PENDIENTES.md`](docs/FUENTES-Y-PENDIENTES.md);
el repositorio representa el contenido público, pero no sustituye la
confirmación de la coordinación de REDRYS.

## Tecnología

- Astro 5 con salida estática.
- TypeScript para datos de contenido.
- CSS vanilla con custom properties.
- JavaScript del lado del cliente reducido al mínimo; el menú móvil es CSS.
- `@astrojs/sitemap` para generar el sitemap.
- Metadata canonical, Open Graph, Twitter Cards y JSON-LD de
  `EducationalOrganization`.
- Worker ESM para entregar la salida estática en ChatGPT Sites.
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

- **Galería:** pendiente de recibir y aprobar fotografías, textos alternativos
  y pies de foto.
- **Repositorio:** pendiente de definir materiales, metadatos, permisos y
  responsables de actualización.
- **Documentos fundacionales:** el acta y el reglamento están publicados; la
  autorización para exponer una copia del acta con firmas debe quedar
  confirmada por la coordinación.
- **Datos institucionales:** existen diferencias entre algunos datos del acta
  y el sitio. Se mantienen sin cambios hasta recibir confirmación, conforme a
  [`docs/FUENTES-Y-PENDIENTES.md`](docs/FUENTES-Y-PENDIENTES.md).
