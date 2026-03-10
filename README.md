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
    integrantes.ts       → Lista de 23 miembros fundadores
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
| `/integrantes/` | Directorio de 23 miembros fundadores con dependencia (FCA/FACOM) |
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

## Deploy

### Dominio y hosting

- **Dominio:** `redrys.org` (registrado en Neubox)
- **DNS:** Cloudflare (plan gratuito, modo DNS only)
- **Hosting:** GitHub Pages con deploy automático via GitHub Actions

### Deploy automático

Cada push a `main` ejecuta el workflow `.github/workflows/deploy.yml` que:

1. Instala dependencias
2. Ejecuta `astro build`
3. Sube el contenido de `dist/` a GitHub Pages

### Configuración en GitHub

1. Ir a **Settings → Pages** del repositorio
2. En **Source**, seleccionar **GitHub Actions**
3. En **Custom domain**, escribir `redrys.org` y guardar
4. Marcar **Enforce HTTPS** (una vez que pase el DNS check)

### Archivo CNAME

El archivo `public/CNAME` contiene `redrys.org` y es necesario para que GitHub Pages sirva el sitio en el dominio custom. No eliminarlo.

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
- GitHub Actions para deploy automático
- Dominio custom via Cloudflare DNS → GitHub Pages
