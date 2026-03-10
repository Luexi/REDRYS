# REDRYS — Sitio Web

Sitio web estático de la **Red de Educación para el Desarrollo Regional y Sostenible (REDRYS)**, construido con [Astro](https://astro.build).

## Estructura del proyecto

```
src/
  components/       → Componentes reutilizables (Header, Footer, tarjetas)
  data/              → Datos centralizados editables
  layouts/           → Layout base compartido por todas las páginas
  pages/             → Páginas del sitio (cada archivo = una ruta)
  styles/            → Estilos globales (CSS vanilla)
public/
  images/            → Logo e imágenes
  docs/              → PDFs institucionales (acta, reglamento)
```

## Dónde editar contenido

| Qué editar | Archivo |
|---|---|
| Nombre, correo, teléfono, sede | `src/data/site.ts` |
| Lista de integrantes | `src/data/integrantes.ts` |
| Objetivos | `src/data/objetivos.ts` |
| Líneas de investigación | `src/data/lineas.ts` |
| Navegación (menú) | `src/data/site.ts` → `navLinks` / `footerLinks` |

## Comandos

```bash
npm install          # Instalar dependencias
npm run dev          # Servidor de desarrollo (http://localhost:4321)
npm run build        # Build de producción (genera carpeta dist/)
npm run preview      # Preview del build de producción
```

## Deploy

El sitio genera archivos estáticos en `dist/`. Compatible con GitHub Pages, Vercel, Netlify o cualquier hosting estático.

## Tecnología

- Astro (sin React, Vue ni Svelte)
- CSS vanilla (sin Tailwind)
- Google Fonts: Instrument Serif + Inter
- Sin JavaScript del lado del cliente
