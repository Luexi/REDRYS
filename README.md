# REDRYS — Sitio Web

Sitio web estático de la **Red de Educación para el Desarrollo Regional y Sostenible (REDRYS)**, construido con [Astro](https://astro.build).

Publicado en: **https://redrys.org**

Repositorio: **https://github.com/Luexi/REDRYS**

## Estructura del proyecto

```
.github/
  workflows/
    deploy.yml          → GitHub Actions: build y deploy automático a GitHub Pages
public/
  CNAME                 → Dominio custom para GitHub Pages (redrys.org)
  images/
    logo-redrys-uagro.png
    screen.png
  docs/
    acta-creacion-redrys.pdf
    reglamento-redrys.pdf
src/
  components/
    Header.astro        → Navegación principal con menú móvil (CSS-only)
    Footer.astro        → Footer institucional
    SectionTitle.astro   → Título de sección reutilizable (eyebrow + heading)
    MemberCard.astro     → Tarjeta de integrante (iniciales, nombre, dependencia)
    ObjectiveCard.astro  → Tarjeta de objetivo específico
  data/
    site.ts              → Datos globales: nombre, correo, teléfono, sede, navegación
    integrantes.ts       → Lista de 22 miembros fundadores
    objetivos.ts         → Objetivo general y específicos
    lineas.ts            → Líneas de investigación
  layouts/
    BaseLayout.astro     → Layout base (head, fonts, header, footer)
  pages/
    index.astro          → Inicio (homepage con hero editorial y fotos de stock)
    la-red.astro         → La Red (descripción, estructura, comisiones, documentos)
    objetivos.astro      → Objetivos generales y específicos
    integrantes.astro    → Directorio de miembros fundadores
    contacto.astro       → Información de contacto
    galeria.astro        → Galería (placeholder — próximamente)
    repositorio.astro    → Repositorio académico (placeholder — próximamente)
  styles/
    global.css           → Sistema de estilos completo (CSS vanilla, sin Tailwind)
astro.config.mjs         → Configuración de Astro (site: https://redrys.org)
```

## Páginas

| Ruta | Descripción |
|---|---|
| `/` | Inicio — hero editorial con fotos de stock, logo REDRYS, CTA, atribución institucional |
| `/la-red/` | Naturaleza, contexto de creación, líneas de investigación, estructura, comisiones, sede, documentos PDF |
| `/objetivos/` | Objetivo general destacado + 4 objetivos específicos en tarjetas |
| `/integrantes/` | Directorio de 22 miembros fundadores con dependencia (FCA/FACOM) |
| `/contacto/` | Correo, teléfono, dirección, botón mailto |
| `/galeria/` | Placeholder elegante — próximamente |
| `/repositorio/` | Placeholder con categorías (Publicaciones, Ponencias, Material didáctico) |

## Dónde editar contenido

| Qué editar | Archivo |
|---|---|
| Nombre, correo, teléfono, sede, coordinador | `src/data/site.ts` |
| Lista de integrantes | `src/data/integrantes.ts` |
| Objetivos | `src/data/objetivos.ts` |
| Líneas de investigación | `src/data/lineas.ts` |
| Navegación principal (header) | `src/data/site.ts` → `navLinks` |
| Enlaces del footer | `src/data/site.ts` → `footerLinks` |
| Estilos / paleta de colores | `src/styles/global.css` → `:root` custom properties |

## Comandos

```bash
npm install          # Instalar dependencias
npm run dev          # Servidor de desarrollo → http://localhost:4321/
npm run build        # Build de producción (genera carpeta dist/)
npm run preview      # Preview del build de producción
```

## Alojamiento y publicación

### Arquitectura

- **Dominio canónico:** `https://redrys.org` (registrado en Neubox).
- **DNS:** administrado desde Neubox. Los nameservers autoritativos observados
  son `ns301.cloud-mx-ns.net` a `ns305.cloud-mx-ns.net`; no se usa Cloudflare.
- **Hosting objetivo:** ChatGPT Sites.
- **Código y respaldo:** este repositorio de GitHub.

La migración conserva temporalmente GitHub Pages como hosting de respaldo hasta
que Sites valide el dominio y emita un certificado correcto. Durante ese
periodo no deben eliminarse `.github/workflows/deploy.yml` ni `public/CNAME`.

### Validación local

```bash
npm ci
npm run verify:sites
```

`verify:sites` prueba el Worker, compila Astro, prepara el artefacto requerido
por Sites y valida rutas, SEO, sitemap, 404, imágenes y PDFs.

### Actualización del sitio

1. Crear una rama desde `main`.
2. Editar el contenido o los estilos existentes.
3. Ejecutar `npm run verify:sites`.
4. Crear un commit y hacer push a GitHub.
5. Guardar en Sites una versión asociada al mismo SHA.
6. Revisar la versión privada antes de desplegarla públicamente.

El identificador del proyecto de Sites se almacena en
`.openai/hosting.json`. No deben guardarse allí credenciales, tokens ni valores
DNS.

### Dominio y rollback

Los registros del dominio solo se cambian después de obtener de Sites los
valores exactos y de aprobar la versión final. El procedimiento completo,
baseline y rollback están documentados en
[`docs/migracion-chatgpt-sites.md`](docs/migracion-chatgpt-sites.md).

## Paleta de colores

| Variable | Color | Uso |
|---|---|---|
| `--color-bg` | `#F4F6F3` | Fondo general |
| `--color-dark` | `#0D2F36` | Textos principales, marca |
| `--color-text` | `#0F172A` | Texto body |
| `--color-turquoise` | `#0A6F80` | Acento primario, CTAs, links activos |
| `--color-green` | `#4E8C1C` | Acento secundario, detalles decorativos |
| `--color-border` | `#CDD8D1` | Bordes, separadores |
| `--color-light` | `#F8FAFC` | Fondos claros |

## Tipografía

- **Instrument Serif** — Títulos y headings (h1, h2, h3)
- **Inter** — Texto body, navegación, UI

## Tecnología

- Astro (sin React, Vue ni Svelte)
- CSS vanilla con custom properties (sin Tailwind)
- Google Fonts (Instrument Serif + Inter)
- Menú móvil CSS-only (sin JavaScript del lado del cliente)
- Worker ESM mínimo para servir la salida estática en ChatGPT Sites
- GitHub como repositorio de código y respaldo
- Dominio personalizado administrado desde Neubox

## SEO y Posicionamiento (Google)

El sitio cuenta con una arquitectura optimizada para indexación y posicionamiento web (SEO):

- **Sitemap Automatizado:** Integrado con `@astrojs/sitemap` para generar automáticamente `sitemap-index.xml` y `sitemap-0.xml` en cada compilación de producción.
- **Control de Indexación:** Archivo `public/robots.txt` para controlar a los rastreadores e indicarles la ruta del sitemap.
- **URLs Canónicas:** Generadas de manera dinámica para evitar contenido duplicado entre diferentes subdominios o versiones de rutas.
- **Previsualizaciones Enriquecidas:** Metadatos Open Graph y Twitter Cards dinámicos para mostrar imágenes y descripciones consistentes al compartir enlaces en WhatsApp o redes sociales.
- **Datos Estructurados (Schema.org / JSON-LD):** Marcado dinámico en formato de organización académica (`EducationalOrganization`) que vincula semánticamente a la REDRYS con la **Universidad Autónoma de Guerrero (UAGro)**, su dirección, coordinador fundador e información de contacto.
