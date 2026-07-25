# Roadmap de REDRYS

Estado a **25 de julio de 2026**.

Este documento registra qué se implementó, qué quedó pendiente y qué se
necesita para llegar al portal académico completo. No sustituye a
[`docs/FUENTES-Y-PENDIENTES.md`](docs/FUENTES-Y-PENDIENTES.md), que controla la
procedencia del contenido y las aprobaciones institucionales.

---

## Dónde estamos

Se implementó la **arquitectura académica temática** (opción 2 de la auditoría
SEO). El sitio pasó de 7 rutas a 26, y de ~830 palabras de contenido total a
más de 9 000.

| Antes | Después |
| --- | --- |
| 7 rutas públicas | 26 rutas públicas |
| Portada con 57 palabras | Portada con 480 palabras |
| Líneas de investigación sin URL propia | 3 páginas de línea de ~650 palabras cada una |
| Reglamento solo en PDF | Texto íntegro en HTML, indexable y accesible |
| Sin perfiles de integrante | 11 perfiles académicos |
| 2 fotografías de stock externas | 0 recursos externos de imagen |
| Placeholders indexados y en el sitemap | `noindex` y fuera del sitemap |
| JSON-LD idéntico en todas las páginas | Grafo con `@id` estable y nodos por tipo de página |
| Menú móvil inoperable con teclado | Navegación operable con teclado |
| Sitemap sin `lastmod` | Sitemap con `lastmod` y solo rutas indexables |

### Qué se construyó

- **`/lineas-investigacion/`** con una página por línea. Contenido redactado a
  partir del reglamento, marcado como `editorial-pendiente-de-aprobacion`.
- **`/documentos/`** con el texto íntegro del reglamento y un resumen del acta.
- **`/integrantes/[slug]/`** para las 11 personas con perfil académico
  documentado y nombre coincidente con la fuente.
- **`/colaborar/`** con requisitos de admisión, derechos y obligaciones.
- **Astro Content Collections** con esquemas Zod que obligan a declarar la
  procedencia (`fuente`) y el estado de aprobación (`aprobacion`) de cada ficha.
- **Descubrimiento automático de rutas** en el artefacto de ChatGPT Sites: ya no
  hay listas de rutas que mantener a mano en `sites/worker.mjs`.

---

## Fase siguiente: completar la base actual

Trabajo que no requiere una decisión de arquitectura, solo información.

### 1. Fotografías

- **Portada.** Sustituir el panel de datos del hero por una fotografía
  institucional real. Hay una fotografía aprobada de una sesión de trabajo
  pendiente de incorporar al repositorio.
- **Integrantes.** Añadir fotografía a los perfiles. El campo está previsto en
  la interfaz `Integrante` pero deliberadamente sin usar. Las imágenes deben
  colocarse en `public/images/integrantes/` con el nombre del `slug`.
- **Imagen social.** `public/images/screen.png` mide 1600×1280 (relación 4:5).
  Las redes sociales recortan a 1.91:1. Conviene generar una imagen de
  1200×630 optimizada.
- **Requisito previo:** autorización de uso de imagen registrada.

### 2. Ratificación del contenido pendiente

- Las tres páginas de línea están marcadas como
  `editorial-pendiente-de-aprobacion`. Cuando la coordinación las revise, basta
  cambiar ese campo a `editorial-aprobada` en el frontmatter y registrar la
  aprobación en `docs/FUENTES-Y-PENDIENTES.md`.
- Los perfiles de integrante muestran una nota de procedencia porque sus datos
  vienen del sitio de la Maestría en Dirección de Organizaciones. Al ratificarse,
  la nota puede sustituirse por la fuente confirmada.

### 3. Variantes de nombre sin resolver

Dos personas del directorio no tienen perfil porque su nombre no coincide
exactamente entre fuentes:

| Nombre publicado en REDRYS | Nombre en la fuente MDO |
| --- | --- |
| Nallety Vázquez Martínez | Nallely Vázquez Martínez |
| Hugo Vázquez Mendoza | José Hugo Vázquez Mendoza |

No se resolvió por inferencia. Confirmada la ortografía oficial, añadir `slug`,
`grado`, `semblanza` y `cuerpoAcademico` en `src/data/integrantes.ts` genera su
perfil automáticamente.

Existe además un caso inverso: **Adriana Miranda Esteban** aparece en la fuente
MDO declarada como integrante de la red, pero no figura en el directorio de
REDRYS. Requiere confirmación.

### 4. Rendimiento

- **Autohospedar las fuentes.** Google Fonts sigue siendo la única dependencia
  externa bloqueante del render. Descargar Instrument Serif e Inter a
  `public/fonts/` eliminaría dos `preconnect` y una hoja de estilos de terceros.
- **Optimizar el logotipo.** `logo-redrys-uagro.png` pesa 40 KB para mostrarse a
  36×36 y 64×64.

### 5. Galería

Cuando existan fotografías aprobadas con pie de foto, texto alternativo y
permiso de uso, retirar `noindex` de `src/pages/galeria.astro` y quitar la ruta
de `EXCLUDED_FROM_SITEMAP` en `astro.config.mjs` y de `NOINDEX_ROUTES` en
`scripts/verify-sites-build.mjs`.

---

## Fase posterior: portal académico completo (opción 3)

Esta es la evolución prevista una vez que exista producción académica suficiente.
**No debe iniciarse antes de cumplir la condición de entrada.**

### Condición de entrada

> Existir un catálogo verificado de **al menos 15 publicaciones** con autores,
> año, medio y DOI o enlace comprobable, y un responsable editorial designado
> con tiempo asignado.

Un catálogo de publicaciones con dos o tres entradas comunica una red inactiva:
daña más la credibilidad de lo que aporta el SEO. Por eso la condición es
cuantitativa y previa.

**Estado actual:** la recopilación está en curso. Se sabe que existe producción
real de los integrantes —al menos un artículo con DOI en *Vinculatégica EFAN*
(2024), capítulos en Pearson y Fides, y memorias de congreso— pero todavía no
está verificada ni consolidada como catálogo de la red.

### Qué incluiría

| Sección | Contenido | Schema asociado |
| --- | --- | --- |
| `/publicaciones/[slug]/` | Título, autores enlazados, resumen, año, palabras clave, línea, medio, DOI, licencia, forma de citar (APA y BibTeX) | `ScholarlyArticle` |
| `/proyectos/[slug]/` | Objetivo, metodología, participantes, evaluación de impacto social, estado | `ResearchProject` |
| `/eventos/[slug]/` | Fecha, lugar, programa, participantes | `Event` |
| `/noticias/[slug]/` | Actividad de la red, fechada y firmada | `NewsArticle` |
| `/convocatorias/[slug]/` | Vigencia, requisitos, contacto | `CreativeWork` |
| `/temas/[tag]/` | Taxonomía transversal | — |
| `/buscar/` | Búsqueda estática | `WebSite` + `SearchAction` |
| `/citar/` | Cómo citar a la red y sus recursos | — |
| `/politicas/` | Acceso abierto, licencias, privacidad documental | — |

Los perfiles de integrante se completarían con **ORCID** y **Google Scholar** en
`sameAs`, y las publicaciones se enlazarían automáticamente a sus autores, sus
líneas y sus proyectos.

### Lo que cambiaría técnicamente

- Seis colecciones de contenido en lugar de dos, con relaciones resueltas en
  build.
- Rutas por taxonomía (`/temas/`, por autor, por año).
- **Pagefind** para búsqueda estática: sería la única excepción a la regla de
  cero JavaScript del sitio, y solo se justifica por encima de ~30 fichas.
- `@astrojs/rss` para feeds.
- Exportación de citas en BibTeX/RIS generada en build.

### Riesgos que hay que aceptar antes de empezar

1. **Portal vacío.** El riesgo dominante y el motivo de la condición de entrada.
2. **Marcado sin contenido.** Declarar `ScholarlyArticle` sin publicaciones
   reales es spam estructurado. Cada schema entra con su contenido, nunca antes.
3. **Datos personales a escala.** ORCID, correos y fotografías de decenas de
   personas exigen consentimiento individual documentado y un procedimiento de
   retirada.
4. **Deuda de mantenimiento.** Excede a un responsable técnico individual:
   requiere un responsable editorial con cadencia sostenida.
5. **Rendimiento.** El sitio dejaría de ser rápido «por construcción» y pasaría a
   necesitar un presupuesto de rendimiento explícito.

### Esfuerzo estimado

**130–200 horas-persona** de desarrollo, más carga editorial permanente. Es una
aproximación, no un compromiso.

---

## Lo que este roadmap no resuelve

- **No genera producción académica.** El sitio puede exhibir y hacer citable la
  producción de la red; no puede sustituirla.
- **No sustituye a repositorios institucionales** ni a Google Scholar.
- **No garantiza posiciones en buscadores.** Ninguna intervención técnica puede
  hacerlo.

---

## Antes de cualquier fase

La migración de alojamiento a ChatGPT Sites sigue sin cerrarse: el certificado
HTTPS estaba en validación y `www` desincronizado entre nameservers. **Mientras
`https://redrys.org` no resuelva con TLS válido, ningún trabajo de SEO produce
efecto**, porque los rastreadores no pueden acceder al sitio. El estado
operativo y el procedimiento de rollback están en
[`docs/migracion-chatgpt-sites.md`](docs/migracion-chatgpt-sites.md).

Igual de importante: dar de alta el dominio en **Google Search Console** y
enviar `https://redrys.org/sitemap-index.xml`. Sin eso no hay forma de medir si
algo de lo implementado funciona.
