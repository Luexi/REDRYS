# Manual de mantenimiento

Esta guía permite actualizar REDRYS sin conocer todos los detalles de su
arquitectura. Para entender el Worker, el build y el hosting, consulta
[`ARCHITECTURE.md`](ARCHITECTURE.md).

## Antes de editar

Se necesita:

- Node.js 20 o una versión compatible.
- Git.
- Acceso al repositorio.
- Aprobación de la coordinación para cambios institucionales.

Instala exactamente las dependencias registradas:

```bash
npm ci
```

Inicia el sitio local:

```bash
npm run dev
```

Abre `http://localhost:4321/` y conserva la terminal para revisar errores.

## Regla para contenido institucional

Antes de cambiar nombres, integrantes, objetivos, líneas, contacto, sede o
documentos:

1. Consulta [`docs/FUENTES-Y-PENDIENTES.md`](docs/FUENTES-Y-PENDIENTES.md).
2. Obtén confirmación de la coordinación de REDRYS.
3. Registra fecha, decisión y fuente de la confirmación.
4. Modifica el contenido.
5. Revisa todas las páginas donde aparece.

No resuelvas diferencias entre el acta, el reglamento y el sitio por
intuición. El responsable técnico implementa la decisión; la coordinación
determina el contenido institucional.

## Actualizaciones habituales

### Datos generales y contacto

Edita `src/data/site.ts`.

Ahí se encuentran nombre, correo, teléfono, dirección, ciudad, coordinador,
fecha de creación, sede e institución. El mismo archivo controla los enlaces
de navegación y footer.

Después de editar, revisa al menos:

- `/`
- `/la-red/`
- `/contacto/`
- Header y footer en móvil y escritorio.
- Metadata estructurada generada por `BaseLayout.astro`.

Si cambia un dato que también está escrito directamente en
`src/layouts/BaseLayout.astro`, actualízalo en la misma entrega para evitar que
el contenido visible y JSON-LD se contradigan.

### Integrantes

Edita `src/data/integrantes.ts`. Cada registro usa:

```ts
{
  name: 'Nombre completo',
  dependency: 'FCA',
  role: 'Miembro fundador'
}
```

- Conserva acentos y nombre completo aprobado.
- Usa únicamente dependencias y roles confirmados.
- No ordenes, agregues o retires personas sin aprobación.
- Revisa `/integrantes/` y el total mostrado en `/la-red/`.
- Actualiza la matriz de fuentes si cambia la lista canónica.

### Objetivos

Edita `src/data/objetivos.ts`.

- `objetivoGeneral` contiene el texto general.
- `objetivosEspecificos` contiene letra y texto de cada objetivo.

Conserva el sentido del documento oficial. Una mejora de estilo que cambie el
alcance también necesita aprobación.

### Líneas de investigación

Edita los archivos Markdown de `src/content/lineas/`. Hay uno por línea y el
nombre del archivo determina la URL.

El frontmatter es obligatorio y está validado: si falta un campo o `tituloSEO`
supera los 70 caracteres, **el build falla**. Los campos críticos son:

- `fuente`: de dónde procede el contenido. Debe poder rastrearse hasta un
  documento institucional o una aprobación registrada.
- `aprobacion`: `documento-institucional`, `editorial-pendiente-de-aprobacion` o
  `editorial-aprobada`. Cuando la coordinación ratifique un texto, cambia este
  campo y registra la fecha en `docs/FUENTES-Y-PENDIENTES.md`.
- `actualizado`: fecha de la última revisión del contenido.

El nombre de cada línea procede del Artículo 1 del reglamento y no se modifica
sin aprobación. El cuerpo del documento es redacción editorial.

Para añadir una línea nueva basta con crear el archivo: el índice, la portada,
`/la-red/`, el sitemap y el Worker la recogen automáticamente.

### Documentos fundacionales

Edita los archivos de `src/content/documentos/`. Mismo frontmatter, más:

- `textoIntegro`: `true` solo si el HTML reproduce el documento completo.
- `archivo` y `archivoTamano`: ruta y peso del PDF original.

**El acta no debe transcribirse.** Contiene firmas manuscritas y datos
personales. Su página publica únicamente los datos institucionales.

### Perfiles de integrante

Edita `src/data/integrantes.ts`.

Una persona obtiene página propia **solo si su registro tiene `slug`**. Sin
`slug` aparece en el directorio pero no genera ruta. Para publicar un perfil
nuevo hacen falta, como mínimo, `slug`, `grado` y `semblanza`.

Antes de añadir un perfil:

- Confirma que el nombre coincide exactamente con la fuente de los datos. Si hay
  variantes ortográficas, **no las resuelvas por inferencia**: regístralas como
  pendiente.
- Confirma que la persona autoriza la publicación de sus datos.
- No publiques correos personales, ORCID ni fotografías sin autorización
  explícita.

### Navegación y footer

Edita `navLinks` y `footerLinks` en `src/data/site.ts`.

- Usa rutas con slash final, por ejemplo `/objetivos/`.
- Confirma que la ruta exista en `src/pages/`.
- Revisa el menú móvil.
- No enlaces Galería o Repositorio como secciones terminadas mientras sigan
  siendo placeholders.
- **Seis entradas es el máximo cómodo** en el menú de escritorio: por encima de
  eso la navegación se parte en dos líneas a 1024 px, que es diseño roto. Si
  necesitas añadir una sección, retira otra o agrúpala dentro de una existente.

`Documentos` está en el menú principal a propósito: el acta y el reglamento son
la prueba de que la red existe y la ruta que sigue quien viene a verificarla.
`Objetivos` vive solo en el pie porque su contenido pertenece al mismo ámbito
que `La Red`, que ya enlaza a él.

### Citas a artículos del reglamento

No escribas el anclaje a mano. Usa el ayudante:

```astro
---
import { articulosHref } from '../lib/reglamento';
const articulo = await articulosHref([5, 12], import.meta.env.BASE_URL);
---
<a href={articulo[5]}>Artículo 5 del reglamento</a>
```

Los anclajes se derivan de los encabezados del Markdown publicado, así que
siguen a la redacción del documento. Si citas un artículo que no existe en el
reglamento, **el build falla**: es la señal de que la cita está mal o de que el
documento cambió, no un error del ayudante.

### Procedencia y estado de aprobación

Las páginas de línea, documento y perfil muestran su procedencia en la columna
lateral mediante el componente `Provenance`. El estado se toma del campo
`aprobacion` de la ficha y se pinta con color:

| Valor de `aprobacion` | Cómo se muestra |
| --- | --- |
| `documento-institucional` | «Transcripción de un documento institucional», en verde |
| `editorial-aprobada` | «Redacción aprobada por la coordinación», en verde |
| `editorial-pendiente-de-aprobacion` | «Redacción pendiente de ratificación», en gris |

Cambiar el campo en el frontmatter es suficiente: no hay texto que actualizar en
la plantilla. Registra siempre la aprobación en
[`docs/FUENTES-Y-PENDIENTES.md`](docs/FUENTES-Y-PENDIENTES.md) en la misma
entrega.

### Imágenes

Coloca imágenes públicas en `public/images/`.

- Usa nombres descriptivos en minúsculas y con guiones.
- Optimiza peso y dimensiones antes de agregarlas.
- Añade texto alternativo útil en la página que las muestra.
- No publiques fotografías sin autorización de uso.
- Si reemplazas `screen.png`, revisa las previsualizaciones Open Graph y
  Twitter.

### Acta y reglamento

Los archivos públicos están en `public/docs/`.

Para sustituirlos sin cambiar enlaces:

1. Conserva los nombres `acta-creacion-redrys.pdf` y
   `reglamento-redrys.pdf`.
2. Confirma que la versión sea oficial y esté autorizada para publicación.
3. Revisa firmas, teléfonos, correos y otros datos visibles.
4. Abre todas las páginas del PDF y confirma legibilidad.
5. Verifica los enlaces desde `/la-red/` y desde `/documentos/`, y actualiza
   `archivoTamano` en la ficha de `src/content/documentos/` si cambió el peso.
6. Registra la versión y aprobación en `FUENTES-Y-PENDIENTES.md`.

No sobrescribas una versión oficial si no existe una copia recuperable en el
historial o archivo institucional.

### Fecha del sitemap

Cuando publiques un cambio real de contenido, actualiza `CONTENT_LAST_MODIFIED`
en `astro.config.mjs`. Es el `lastmod` que se envía a los buscadores.

No se deriva de la fecha de compilación a propósito: si lo hiciera, cada build
declararía contenido nuevo aunque nada hubiera cambiado, y la señal dejaría de
significar algo.

### Secciones en preparación

`/galeria/` y `/repositorio/` se publican con `noindex, follow` y quedan fuera
del sitemap. Siguen siendo accesibles para quien visite el sitio, pero no se
ofrecen a los buscadores mientras no tengan contenido.

Para reactivar una de ellas cuando tenga contenido real:

1. Quita `noindex={true}` de la página en `src/pages/`.
2. Elimina la ruta de `EXCLUDED_FROM_SITEMAP` en `astro.config.mjs`.
3. Elimina la ruta de `NOINDEX_ROUTES` en `scripts/verify-sites-build.mjs`.
4. Ejecuta `npm run verify:sites`. Si la página no alcanza las 200 palabras, la
   verificación fallará: es la señal de que todavía no está lista.

### Galería

`src/pages/galeria.astro` es actualmente una sección en preparación. Para
convertirla en una sección real se requiere:

- Selección de fotografías aprobadas.
- Fecha, evento y pie de foto.
- Texto alternativo.
- Autorización de uso de imagen.
- Criterio de orden y responsable de futuras actualizaciones.

No basta con copiar fotografías a `public/`; la coordinación debe aprobar el
conjunto y el contexto publicado.

### Repositorio académico

`src/pages/repositorio.astro` es actualmente una sección en preparación. La
condición de entrada para construirlo está en [`roadmap.md`](roadmap.md). Antes
de implementarlo se debe decidir:

- Qué tipos de materiales se aceptan.
- Metadatos mínimos: título, autores, fecha, categoría y enlace.
- Quién verifica derechos y versión de publicación.
- Si se alojarán archivos o solo enlaces externos.
- Quién mantendrá el catálogo.

Si el volumen o frecuencia crece de forma importante, revisa las señales de
evolución en `ARCHITECTURE.md` antes de construir una solución manual.

### Colores, tipografía y estilos

Edita `src/styles/global.css`. Todo el sistema vive en las custom properties de
`:root`: color, escala tipográfica y ritmo. Haz los cambios en los tokens, nunca
sustituyendo un valor suelto dentro de una regla.

Cuatro reglas del sistema conviene no romper por descuido:

1. **Dos voces tipográficas.** `--font-serif` compone el texto institucional
   (títulos y prosa transcrita); `--font-sans`, el aparato que lo rodea
   (navegación, etiquetas, metadatos, controles). Antes de aplicar una familia a
   un elemento nuevo, decide a cuál de las dos categorías pertenece.
2. **Dos lenguajes de contenedor.** `record` es una ficha que lleva a otra
   página; `panel` agrupa datos que no llevan a ninguna parte. Cualquier otra
   lista se separa con filetes y espacio. **No añadas una tercera variante de
   caja**: el diseño anterior tenía nueve y ninguna significaba nada.
3. **Color opaco y medido.** No introduzcas grises con `rgba(..., α)`. Si
   necesitas un tono nuevo, añade un token opaco y anota su contraste medido en
   la cabecera del archivo, junto a los demás.
4. **El verde es semántico.** `--color-ratified` solo marca contenido respaldado
   por un documento institucional. No lo uses como acento decorativo; el acento
   del sitio es `--color-accent` y es único.

Para actualizar una tipografía:

```bash
npm run sync:fonts
```

Copia los `.woff2` desde los paquetes de `devDependencies` a `public/fonts/`.
Los archivos se versionan a propósito: el sitio no debe depender de
`node_modules` ni de un CDN para renderizar su texto. Si cambias de familia,
actualiza también los `@font-face`, el stack de `--font-serif`/`--font-sans` y
los dos `<link rel="preload">` de `BaseLayout.astro`, y conserva la licencia del
archivo junto a las fuentes.

**No reintroduzcas Google Fonts.** `fonts.googleapis.com` no está en
`ALLOWED_EXTERNAL_HOSTS` de `scripts/verify-sites-build.mjs`, así que la
verificación fallará. Es intencionado: era la única dependencia externa del
sitio y la causa de todo su layout shift.

Después de modificar estilos, revisa:

- Contraste y legibilidad.
- Header, menú móvil y cabecera fija al desplazarse.
- Fichas, paneles y botones (incluido `.btn--ghost`, que debe verse como botón).
- Pantallas angostas y escritorio, con atención a la franja de 768 a 1023 px.
- Estados de foco con teclado.
- La columna lateral de procedencia en una línea, un documento y un perfil.
- Página 404.

## Verificación

Antes de cada publicación ejecuta:

```bash
npm run verify:sites
```

El resultado esperado termina con un mensaje que confirma el número de rutas
verificadas, cuántas son indexables, SEO, datos estructurados, sitemap, 404,
Worker y assets preservados. Un exit code distinto de cero significa que no se
debe publicar.

La verificación falla, entre otros motivos, si una ruta indexable tiene menos de
200 palabras, si un título supera los 75 caracteres, si hay más de un H1, si
aparece un dominio externo no autorizado, si cambia un archivo preservado
(imágenes, PDFs o tipografías) o si el sitemap y las rutas indexables dejan de
coincidir. Son fallos intencionados: señalan un problema de contenido, no un
error del script.

El build falla antes, y también a propósito, si una ficha no declara `fuente` y
`aprobacion`, o si una página cita un artículo que no existe en el reglamento
publicado.

Además realiza una revisión visual:

1. Abre la portada, una línea de investigación, un documento y un perfil.
2. Prueba el menú en móvil y escritorio, **incluido el manejo con teclado**:
   tabula hasta el control del menú y ábrelo con la barra espaciadora.
3. Comprueba enlaces internos, breadcrumbs, correo, teléfono y descargas.
4. Sigue una cita por artículo hasta el reglamento y confirma que aterriza en el
   artículo correcto, sin quedar oculta bajo la cabecera fija.
5. Abre ambos PDFs.
6. Visita una ruta inexistente.
7. Revisa que no haya contenido provisional presentado como definitivo.

## Publicación

1. Actualiza `main` y crea una rama descriptiva.
2. Realiza un solo conjunto coherente de cambios.
3. Ejecuta `npm run verify:sites`.
4. Revisa visualmente el sitio.
5. Comprueba `git diff` y confirma que no haya archivos privados.
6. Crea el commit, haz push y completa la revisión o pull request.
7. Identifica el SHA exacto aprobado que debe publicarse.
8. Solicita a Codex que prepare ese commit para el Site existente de REDRYS.
9. Guarda en Sites una versión vinculada al SHA validado.
10. Despliega explícitamente esa versión.
11. Comprueba el dominio canónico, una muestra de rutas de cada tipo, assets,
    PDFs, 404 y SEO.

Un push a `main` activa el workflow de GitHub Pages mientras permanezca
habilitado durante la migración, pero no actualiza ChatGPT Sites. Después de
retirar Pages, ese workflow se convertirá en una validación de build.

ChatGPT Sites requiere guardar y desplegar una versión asociada al SHA
correcto. Cada despliegue es de producción, por lo que no debe usarse como una
previsualización improvisada. Para publicar una actualización puede pedirse:

> Publica en ChatGPT Sites el commit `<SHA>` de REDRYS después de ejecutar las
> verificaciones.

No se deben editar el dominio ni los DNS para actualizaciones ordinarias: el
Site conserva la asociación con `redrys.org`.

Para cambios de dominio, corte de proveedor o rollback, sigue
[`docs/migracion-chatgpt-sites.md`](docs/migracion-chatgpt-sites.md). No
modifiques registros de correo ni DNS fuera del alcance de hosting.

Mientras la migración esté abierta, no deshabilites GitHub Pages ni elimines
`public/CNAME`. Esa retirada requiere comprobar resolución y HTTPS en
`redrys.org` y `www.redrys.org`, completar los postchecks, confirmar el
rollback y recibir la autorización final indicada en la bitácora.

## Checklist previa a publicación

- [ ] La coordinación aprobó los cambios institucionales.
- [ ] La fuente y fecha de aprobación quedaron registradas.
- [ ] No se añadieron firmas, secretos o datos personales innecesarios.
- [ ] Todas las rutas y enlaces funcionan.
- [ ] El sitio se revisó en móvil y escritorio.
- [ ] Metadata, canonical y contenido visible son consistentes.
- [ ] Las imágenes tienen texto alternativo.
- [ ] Los PDFs correctos abren y son legibles.
- [ ] Galería y Repositorio conservan su estado real y siguen en `noindex`.
- [ ] `CONTENT_LAST_MODIFIED` se actualizó si cambió el contenido.
- [ ] Las fichas nuevas declaran `fuente` y `aprobacion` correctos.
- [ ] El menú móvil se puede abrir con teclado.
- [ ] `npm run verify:sites` terminó correctamente.
- [ ] El diff contiene solo archivos esperados.
- [ ] El SHA solicitado a Sites coincide con el commit aprobado en GitHub.
- [ ] Se autorizó el despliegue productivo de la versión seleccionada.
- [ ] Los postchecks sobre `https://redrys.org` terminaron correctamente.

## Problemas frecuentes

### `npm ci` falla

Confirma la versión de Node y que `package-lock.json` esté presente. No borres
el lockfile ni uses `npm update` como solución automática.

### El build falla

Lee el primer error de Astro o Node. Revisa primero sintaxis, imports, comas y
comillas en el archivo recién editado.

### Un enlace devuelve 404

Las páginas públicas usan slash final. Verifica la ruta, mayúsculas y nombre
del archivo. Los assets de `public/` se enlazan desde raíz, por ejemplo
`/images/logo-redrys-uagro.png`.

### Una imagen o PDF no aparece

Confirma que esté dentro de `public/`, que el nombre coincida exactamente y
que no se haya agregado solo a `dist/`. `dist/` se regenera y nunca es la
fuente del asset.

### El contenido no cambia

Detén y reinicia el servidor de desarrollo. Confirma que editaste `src/` o
`public/`, no `dist/`. Para una versión desplegada, verifica que Sites use el
SHA del commit correcto y que esa versión, además de estar guardada, haya sido
desplegada. Un push a GitHub no basta para actualizar Sites.

### El dominio temporal aparece en buscadores

No cambies la lógica del Worker sin revisar `ARCHITECTURE.md`. Ejecuta la
verificación y confirma que el host temporal reciba `X-Robots-Tag: noindex,
nofollow` y un `robots.txt` bloqueado.
