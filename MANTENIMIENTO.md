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

Edita `src/data/lineas.ts`.

Cada línea tiene `title` y `description`. El reglamento contiene los nombres;
las descripciones públicas son una explicación editorial y deben revisarse si
se modifica la formulación oficial.

### Navegación y footer

Edita `navLinks` y `footerLinks` en `src/data/site.ts`.

- Usa rutas con slash final, por ejemplo `/objetivos/`.
- Confirma que la ruta exista en `src/pages/`.
- Revisa el menú móvil.
- No enlaces Galería o Repositorio como secciones terminadas mientras sigan
  siendo placeholders.

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
5. Verifica los enlaces desde `/la-red/`.
6. Registra la versión y aprobación en `FUENTES-Y-PENDIENTES.md`.

No sobrescribas una versión oficial si no existe una copia recuperable en el
historial o archivo institucional.

### Galería

`src/pages/galeria.astro` es actualmente un placeholder. Para convertirla en
una sección real se requiere:

- Selección de fotografías aprobadas.
- Fecha, evento y pie de foto.
- Texto alternativo.
- Autorización de uso de imagen.
- Criterio de orden y responsable de futuras actualizaciones.

No basta con copiar fotografías a `public/`; la coordinación debe aprobar el
conjunto y el contexto publicado.

### Repositorio académico

`src/pages/repositorio.astro` es actualmente un placeholder. Antes de
implementarlo se debe decidir:

- Qué tipos de materiales se aceptan.
- Metadatos mínimos: título, autores, fecha, categoría y enlace.
- Quién verifica derechos y versión de publicación.
- Si se alojarán archivos o solo enlaces externos.
- Quién mantendrá el catálogo.

Si el volumen o frecuencia crece de forma importante, revisa las señales de
evolución en `ARCHITECTURE.md` antes de construir una solución manual.

### Colores y tipografía

Edita `src/styles/global.css`.

Los colores principales están en las custom properties de `:root`. Haz cambios
globales en los tokens en lugar de reemplazar colores aislados.

Después de modificar estilos, revisa:

- Contraste y legibilidad.
- Header y menú móvil.
- Tarjetas y botones.
- Pantallas angostas y escritorio.
- Estados de foco con teclado.
- Página 404.

## Verificación

Antes de cada publicación ejecuta:

```bash
npm run verify:sites
```

El resultado esperado termina con un mensaje que confirma siete rutas, SEO,
sitemap, 404, Worker y assets preservados. Un exit code distinto de cero
significa que no se debe publicar.

Además realiza una revisión visual:

1. Abre las siete rutas públicas.
2. Prueba el menú en móvil y escritorio.
3. Comprueba enlaces internos, correo, teléfono y descargas.
4. Abre ambos PDFs.
5. Visita una ruta inexistente.
6. Revisa que no haya contenido provisional presentado como definitivo.

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
11. Comprueba el dominio canónico, las siete rutas, assets, PDFs, 404 y SEO.

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
- [ ] Galería y Repositorio conservan su estado real.
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
