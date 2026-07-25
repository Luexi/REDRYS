# Roadmap de REDRYS

Estado de referencia: **25 de julio de 2026**.

Este documento organiza el trabajo pendiente de REDRYS en tres resultados
distintos:

1. cerrar definitivamente la migración a ChatGPT Sites;
2. completar el sitio institucional base con contenido aprobado;
3. evolucionar, cuando existan suficientes fuentes, hacia un portal académico.

No sustituye a
[`docs/FUENTES-Y-PENDIENTES.md`](docs/FUENTES-Y-PENDIENTES.md), que controla la
procedencia y aprobación del contenido, ni a
[`docs/migracion-chatgpt-sites.md`](docs/migracion-chatgpt-sites.md), que
registra el corte de hosting y el rollback.

---

## Principios de ejecución

- **Una fuente de verdad.** El repositorio contiene lo publicado; las
  aprobaciones institucionales se registran en
  `docs/FUENTES-Y-PENDIENTES.md`.
- **Contenido antes que marcado.** No se añade schema, una ruta indexable ni
  una promesa editorial sin contenido real que lo respalde.
- **Lotes pequeños.** Cada publicación debe resolver una familia coherente de
  cambios y poder revisarse, desplegarse o revertirse por separado.
- **Sin inferencias institucionales.** Las discrepancias de nombres, cargos,
  integrantes, fechas o fuentes requieren confirmación explícita.
- **Calidad automatizada y revisión humana.** `npm run verify:sites` es
  obligatorio, pero no sustituye la revisión visual, editorial o documental.
- **Publicación explícita.** Un push a GitHub no actualiza ChatGPT Sites. Cada
  versión se guarda y despliega asociada al SHA exacto que fue revisado.
- **YAGNI.** No se implementan búsqueda, taxonomías, feeds o catálogos
  avanzados antes de que el volumen real de contenido los justifique.

---

## Estado actual verificado

| Área | Estado |
| --- | --- |
| Repositorio fuente | `https://github.com/Luexi/REDRYS` |
| Hosting definitivo | ChatGPT Sites |
| Dominio canónico | `https://redrys.org` |
| Versión pública de Sites | Versión 5 |
| Commit desplegado de referencia | `931f4048facb6494596374309800b15c5f2deba9` |
| Rutas públicas | 26 |
| Rutas indexables | 24 |
| HTTPS del apex | Activo y válido |
| HTTPS de `www` | Activo y válido |
| Redirección `www` | Permanente hacia `https://redrys.org` |
| Dominio temporal | Bloqueado mediante `robots.txt` y `X-Robots-Tag` |
| DNS del apex | Los cinco nameservers publican los dos A de Sites |
| DNS de `www` | `ns301` publica el CNAME; `ns302`–`ns305` siguen desincronizados |
| GitHub Pages | Conservado temporalmente como rollback |
| Search Console | Pendiente |

La documentación histórica que todavía describa HTTPS como “en validación”
debe actualizarse al cerrar la fase 0. El problema operativo pendiente no es
el certificado: es la respuesta autoritativa inconsistente de `www`.

---

## Qué significa “terminado”

### Migración terminada

La migración solo se considera cerrada cuando:

- los cinco nameservers autoritativos coinciden para el apex y `www`;
- Sites marca ambos dominios y sus certificados como activos;
- las 26 rutas, recursos, PDFs, robots, sitemap y 404 pasan los postchecks;
- escritorio, móvil, teclado y navegación se revisaron en Chrome;
- Search Console reconoce la propiedad y acepta el sitemap;
- el estado final, el SHA publicado y el rollback están documentados;
- GitHub Pages fue retirado después de la autorización humana correspondiente;
- GitHub permanece como repositorio de código y respaldo.

### Sitio institucional base terminado

El sitio institucional base se considera completo cuando:

- las tres líneas de investigación fueron ratificadas;
- los perfiles académicos publicados fueron ratificados y autorizados;
- las variantes de nombres e integrantes quedaron resueltas;
- la portada utiliza fotografía institucional aprobada;
- existe una imagen social adecuada;
- Galería y Repositorio muestran honestamente su estado y no compiten en el
  índice mientras estén vacíos;
- no queda contenido editorial provisional presentado como definitivo.

### Portal académico completo

El portal avanzado es una evolución posterior. Requiere un catálogo verificado
de publicaciones, responsable editorial y capacidad de mantenimiento. No
bloquea la migración ni la finalización del sitio institucional base.

---

## Tablero de fases

| Fase | Prioridad | Estado | Bloqueo principal |
| --- | --- | --- | --- |
| 0. Cierre de migración | P0 | En curso | DNS autoritativo de `www` y QA en Chrome |
| 1. Ratificación editorial | P0 | Pendiente | Revisión de la coordinación |
| 2. Identidad visual institucional | P1 | Preparada | Incorporar material aprobado |
| 3. Activar Galería | P1 | En preparación | Fotografías, contexto y permisos |
| 4. Activar Repositorio | P1 | Recopilación | 15 publicaciones verificadas |
| 5. Portal académico avanzado | P2 | No iniciado | Catálogo y responsable editorial |

Las fases editoriales pueden avanzar mientras se propaga el DNS, pero la
retirada de GitHub Pages permanece bloqueada hasta completar la fase 0.

---

## Fase 0 — Cerrar la migración

**Objetivo:** convertir a ChatGPT Sites en el único hosting público efectivo,
sin perder el rollback antes de que las comprobaciones terminen.

### 0.1 Sincronizar el DNS autoritativo

- Consultar por separado `ns301`–`ns305.cloud-mx-ns.net`.
- Confirmar que el apex entregue únicamente:
  - `162.159.143.30`;
  - `172.66.3.26`.
- Confirmar que los cinco nameservers entreguen para `www`:
  - CNAME `custom-domains.chatgpt.site`.
- No modificar NS, MX, SPF, DKIM, DMARC ni registros de correo.
- Si la inconsistencia de `www` supera 24 horas desde el corte, abrir un ticket
  con Neubox con las respuestas autoritativas y el registro esperado.

**Terminado cuando:** los cinco nameservers coinciden y Sites mantiene ambos
dominios en estado activo.

### 0.2 Ejecutar los postchecks técnicos

Verificar en producción:

- HTTP → HTTPS;
- certificado y cadena válidos para apex y `www`;
- 26 rutas con el estado esperado;
- 404 HTTP real;
- imágenes, tipografías y ambos PDFs;
- `robots.txt`, `sitemap-index.xml` y `sitemap-0.xml`;
- canonical, title, description, Open Graph, Twitter Card y JSON-LD;
- ausencia de autenticación;
- dominio temporal con `noindex, nofollow`;
- redirección permanente de `www` al apex;
- rendimiento y estabilidad visual razonables.

Comando automatizado:

```bash
npm run verify:sites
```

Resultado esperado: 26 rutas verificadas, 24 indexables, pruebas del Worker,
SEO, datos estructurados, sitemap, 404 y recursos preservados.

### 0.3 Completar el QA humano en Chrome

Revisar como mínimo:

1. portada en escritorio;
2. portada a 320, 768, 1024 y 1440 px;
3. menú móvil con ratón, tacto y teclado;
4. foco visible y orden de tabulación;
5. una línea de investigación;
6. un perfil de integrante;
7. el reglamento y sus anclajes por artículo;
8. ambos PDFs;
9. breadcrumbs, enlaces de contacto y enlaces externos;
10. una ruta inexistente.

**Terminado cuando:** no existen recursos rotos, contenido recortado, overflow,
fallos de teclado o diferencias relevantes respecto del build aprobado.

### 0.4 Registrar las decisiones SEO

Se adoptan las siguientes decisiones:

- **`ResearchOrganization` se mantiene.** Describe con mayor precisión a una
  red que promueve investigación aplicada y no imparte programas educativos.
  No se añadirá `EducationalOrganization` únicamente para satisfacer una lista
  de comprobación si el contenido no respalda ese tipo.
- **Galería y Repositorio conservan temporalmente `noindex, follow`.** Están
  disponibles para navegación, pero se excluyen del sitemap mientras no tengan
  contenido suficiente. Indexar placeholders produciría URLs de baja calidad.
- La excepción termina cuando cada sección cumple su criterio editorial y pasa
  a ser indexable en las fases 3 y 4.

Si se decide restablecer el requisito original de “ninguna ruta pública con
`noindex`”, la fase 0 no puede cerrarse hasta completar Galería y Repositorio.

### 0.5 Dar de alta Google Search Console

Intervención humana requerida:

- usar la propiedad de dominio `redrys.org`;
- verificar la propiedad sin retirar los TXT de Sites;
- enviar `https://redrys.org/sitemap-index.xml`;
- inspeccionar `https://redrys.org/`;
- confirmar que la URL es accesible e indexable;
- revisar que el sitemap sea aceptado sin errores.

**Terminado cuando:** la propiedad está verificada, el sitemap fue aceptado y
la home puede solicitarse para indexación.

### 0.6 Actualizar el estado y retirar GitHub Pages

Antes de retirar Pages:

- registrar el SHA y la versión pública vigentes;
- actualizar `README.md` y `docs/migracion-chatgpt-sites.md`;
- registrar el resultado final de DNS, TLS y postchecks;
- confirmar el procedimiento de rollback;
- solicitar la autorización humana final.

Después de la autorización:

- desactivar GitHub Pages;
- sustituir `.github/workflows/deploy.yml` por validación de build;
- retirar `public/CNAME`;
- conservar GitHub y todo su historial;
- ejecutar nuevamente `npm run verify:sites`;
- publicar el commit de cierre en Sites;
- comprobar una vez más `redrys.org`.

### Criterios de salida de la fase 0

- [ ] DNS autoritativo consistente en los cinco nameservers.
- [ ] Apex y `www` activos en Sites.
- [ ] HTTPS válido y HTTP redirigido.
- [ ] Postchecks automatizados completos.
- [ ] QA en Chrome completado.
- [ ] Decisiones SEO registradas.
- [ ] Search Console y sitemap configurados.
- [ ] Documentación y rollback actualizados.
- [ ] Retirada de GitHub Pages autorizada y ejecutada.
- [ ] Repositorio conservado como fuente y respaldo.

---

## Fase 1 — Ratificación editorial gradual

**Objetivo:** sustituir avisos provisionales por contenido revisado y aprobado,
sin publicar un gran lote difícil de verificar.

### 1.1 Ratificar las líneas de investigación

Procesar una línea por publicación:

| Lote | Ruta | Archivo |
| --- | --- | --- |
| 1A | `/lineas-investigacion/direccion-y-liderazgo-para-el-desarrollo-sostenible/` | `src/content/lineas/direccion-y-liderazgo-para-el-desarrollo-sostenible.md` |
| 1B | `/lineas-investigacion/cultura-tributaria-y-responsabilidad-fiscal/` | `src/content/lineas/cultura-tributaria-y-responsabilidad-fiscal.md` |
| 1C | `/lineas-investigacion/politicas-publicas-para-el-desarrollo-regional/` | `src/content/lineas/politicas-publicas-para-el-desarrollo-regional.md` |

Para cada lote:

1. la coordinación revisa el texto;
2. se incorporan únicamente las correcciones aprobadas;
3. se cambia `aprobacion` a `editorial-aprobada`;
4. se registra quién aprobó, qué aprobó y la fecha en
   `docs/FUENTES-Y-PENDIENTES.md`;
5. se ejecuta `npm run verify:sites`;
6. se publica el SHA exacto y se comprueba la ruta en producción.

### 1.2 Ratificar los perfiles académicos

Procesar los 11 perfiles en tres lotes de **4 + 4 + 3**.

Por cada persona:

- confirmar nombre, grado, semblanza y cuerpo académico;
- obtener autorización para publicar los datos en REDRYS;
- conservar la fuente hasta que exista una ratificación propia de la red;
- no incorporar fotografía, correo personal, ORCID o perfil externo sin
  autorización específica;
- registrar la aprobación y su fecha.

Los lotes deben modificar principalmente:

- `src/data/integrantes.ts`;
- `docs/FUENTES-Y-PENDIENTES.md`.

### 1.3 Resolver identidades pendientes

Requiere confirmación de la coordinación:

| Caso | Decisión necesaria |
| --- | --- |
| Nallety / Nallely Vázquez Martínez | Ortografía oficial |
| Hugo / José Hugo Vázquez Mendoza | Nombre oficial completo |
| Adriana Miranda Esteban | Confirmar si pertenece al directorio de REDRYS |

No se genera un perfil por semejanza de nombres. Confirmado el dato, añadir
`slug`, grado, semblanza y cuerpo académico en `src/data/integrantes.ts`
genera la ruta automáticamente.

### 1.4 Resolver pendientes institucionales menores

- Confirmar una fuente verificable para la afirmación sobre la vigencia inicial
  de tres años, o descartarla definitivamente.
- Revisar en `/objetivos/` el bloque “Cómo se concretan estos objetivos”, que
  actualmente obliga a volver a las tarjetas para identificar “el primero”,
  “el segundo” y “el tercero”.
- Registrar cualquier corrección en `docs/FUENTES-Y-PENDIENTES.md`.

### Criterios de salida de la fase 1

- [ ] Tres líneas ratificadas o sustituidas por texto institucional.
- [ ] Once perfiles ratificados y autorizados.
- [ ] Variantes de nombre resueltas.
- [ ] Caso de Adriana Miranda Esteban resuelto.
- [ ] Vigencia de tres años confirmada o descartada.
- [ ] Ningún contenido indexable aparece como aprobado sin respaldo.

---

## Fase 2 — Identidad visual institucional

**Objetivo:** incorporar material propio de REDRYS sin sustituir trazabilidad
por decoración.

### 2.1 Fotografía de portada — hecho

La fotografía institucional autorizada está publicada como **banda documental**
a ancho completo bajo el hero.

- Origen: `src/assets/sesion-trabajo-mdo-fca.jpeg`. Vive en `src/assets/` y no
  en `public/images/` porque se procesa con `astro:assets`: el build genera las
  derivadas WebP con `srcset` y fija `width`/`height`, que es lo que mantiene el
  CLS en cero. El original queda intacto en el repositorio.
- Recorte 21:9 en escritorio y 4:3 por debajo de 768 px, donde la tira
  panorámica sería ilegible.
- Desaturada al 60 % con `contrast(1.05)`: el mantel azul y las sillas naranjas
  eran los colores más saturados de la página y competían con el acento
  turquesa. La escena sigue siendo legible y a color.
- Texto alternativo descriptivo y pie de foto visible.
- Los cuatro datos institucionales que ocupaban esa columna no se perdieron:
  pasaron a una franja de pares término/valor bajo la banda.

Medido tras el cambio: **CLS 0.00**, **LCP 112 ms**, sin desbordamiento
horizontal entre 320 y 1440 px, `npm run verify:sites` en verde.

**Pendiente menor:** el pie de foto es genérico porque no consta la fecha ni la
denominación del evento. No se infirieron. Ver `docs/FUENTES-Y-PENDIENTES.md`.

### 2.1b Segunda fotografía — no publicada

Existe una segunda imagen (sesión de formación en aula) que **no se publicó**:
muestra estudiantes identificables y la autorización registrada cubre solo la
sesión de trabajo entre integrantes.

- Con la autorización registrada, su lugar natural es `/la-red/`, para ilustrar
  la dimensión formativa de la red.
- El archivo original no está en el repositorio hasta que exista ese permiso.

### 2.2 Imagen social

La imagen actual `public/images/screen.png` mide 1600×1280 y no tiene la
relación recomendada para enlaces compartidos.

- Crear una imagen institucional de 1200×630.
- Usar contenido, tipografías y paleta reales del sitio.
- Verificar que no invente texto, cargos o integrantes.
- Actualizar Open Graph y Twitter Card.
- Comprobar la URL pública y sus dimensiones.

### 2.3 Logotipo

- Preparar una variante optimizada para los tamaños de 34×34 y 48×48.
- Conservar el archivo institucional fuente.
- Comparar calidad visual y peso.
- Verificar header, footer e imagen social.

### 2.4 Fotografías de integrantes

Incorporarlas individualmente cuando exista autorización:

- ruta sugerida: `public/images/integrantes/<slug>.<ext>`;
- permiso de uso registrado;
- texto alternativo;
- dimensiones declaradas;
- recorte consistente;
- fallback sin fotografía preservado.

No es necesario esperar a reunir las 11 imágenes.

### Criterios de salida de la fase 2

- [x] Portada con fotografía institucional aprobada.
- [ ] Pie de foto de la portada con fecha y evento confirmados.
- [ ] Imagen social 1200×630 validada.
- [ ] Logotipo optimizado sin pérdida visible.
- [ ] Cada fotografía personal tiene autorización y metadatos.
- [ ] Lighthouse y `npm run verify:sites` permanecen en verde.

---

## Fase 3 — Activar Galería

**Objetivo:** convertir `/galeria/` en una sección editorial real antes de
permitir su indexación.

### Condición mínima de entrada

- al menos un evento o actividad documentada;
- entre 4 y 6 fotografías aprobadas;
- fecha y lugar;
- pie de foto y texto alternativo por imagen;
- permiso de uso;
- introducción editorial suficiente para superar la validación de contenido.

### Implementación

1. Definir una estructura de datos con título, fecha, lugar, descripción,
   imágenes, pies, textos alternativos y fuente.
2. Publicar el primer conjunto como un solo lote revisable.
3. Verificar navegación por teclado y lectura sin depender del diseño visual.
4. Retirar `noindex` de `src/pages/galeria.astro`.
5. Retirar `/galeria/` de `EXCLUDED_FROM_SITEMAP` en `astro.config.mjs`.
6. Retirar la ruta de `NOINDEX_ROUTES` en
   `scripts/verify-sites-build.mjs`.
7. Ejecutar `npm run verify:sites`.
8. Publicar y comprobar sitemap, canonical, Open Graph e imágenes.

### Criterios de salida de la fase 3

- [ ] Galería contiene material real y autorizado.
- [ ] Todas las imágenes tienen contexto y texto alternativo.
- [ ] La ruta es indexable.
- [ ] La ruta figura en el sitemap.
- [ ] No existe dependencia de JavaScript para acceder al contenido.

---

## Fase 4 — Activar Repositorio

**Objetivo:** publicar un catálogo académico suficientemente completo para
representar actividad real de la red.

### Condición de entrada

Antes de crear fichas públicas deben existir:

- al menos **15 publicaciones verificadas**;
- autores;
- año;
- medio de publicación;
- DOI o enlace comprobable;
- licencia o derechos de publicación;
- relación documentada con integrantes o actividad de REDRYS;
- responsable editorial designado con capacidad de mantenimiento.

Un catálogo con dos o tres entradas comunica una red inactiva y no justifica la
arquitectura adicional.

### Recopilación interna gradual

La investigación puede avanzar sin publicar registros incompletos:

1. definir los metadatos obligatorios;
2. recopilar los primeros cinco registros;
3. verificar autores, DOI, licencia y fuente;
4. corregir el esquema con los hallazgos reales;
5. completar diez registros;
6. revisar consistencia de nombres y afiliaciones;
7. alcanzar quince registros;
8. obtener aprobación del responsable editorial.

### Publicación

Solo después de cumplir la condición de entrada:

- crear una colección de publicaciones;
- generar `/publicaciones/[slug]/`;
- añadir `ScholarlyArticle` únicamente a fichas reales;
- enlazar autores y líneas con relaciones documentadas;
- añadir formas de cita cuando los metadatos lo permitan;
- retirar `noindex` de `/repositorio/`;
- incluir Repositorio y publicaciones en el sitemap;
- verificar enlaces DOI, canonical, JSON-LD y páginas de autor.

### Criterios de salida de la fase 4

- [ ] Quince publicaciones verificadas.
- [ ] Responsable editorial designado.
- [ ] Derechos y licencias documentados.
- [ ] Fichas públicas sin atribuciones inferidas.
- [ ] Repositorio indexable e incluido en el sitemap.
- [ ] Procedimiento de alta, corrección y retirada documentado.

---

## Fase 5 — Portal académico avanzado

**Objetivo:** añadir capacidades de descubrimiento únicamente cuando el volumen
publicado las haga útiles.

Posibles incorporaciones:

| Sección o capacidad | Condición previa |
| --- | --- |
| `/proyectos/[slug]/` | Proyectos documentados con responsables y estado |
| `/eventos/[slug]/` | Calendario real y responsable de actualización |
| `/noticias/[slug]/` | Cadencia editorial y autoría |
| `/convocatorias/[slug]/` | Proceso para retirar convocatorias vencidas |
| `/temas/[tag]/` | Taxonomía estable con suficiente contenido |
| `/buscar/` con Pagefind | Aproximadamente 30 fichas útiles |
| RSS | Contenido nuevo con periodicidad real |
| Exportación BibTeX/RIS | Metadatos bibliográficos completos |
| ORCID y Google Scholar | Identificadores confirmados y autorizados |
| Política de acceso abierto | Decisión institucional publicada |

No se añadirá `Event`, `NewsArticle`, `ResearchProject` o `ScholarlyArticle` sin
contenido real que justifique cada tipo.

Esta fase implica operación editorial permanente y no debe quedar a cargo de
una sola persona sin transferencia documentada.

---

## Cadencia obligatoria para cada lote

Cada incorporación de contenido o diseño sigue la misma secuencia:

1. **Fuente:** identificar documento, persona responsable o autorización.
2. **Alcance:** elegir una sola familia coherente de cambios.
3. **Implementación:** modificar únicamente los archivos necesarios.
4. **Trazabilidad:** actualizar `docs/FUENTES-Y-PENDIENTES.md`.
5. **Validación local:** ejecutar `npm run verify:sites`.
6. **Revisión visual:** comprobar las rutas afectadas en móvil y escritorio.
7. **Revisión Git:** confirmar que no hay secretos ni archivos privados.
8. **Commit y push:** guardar el lote con un mensaje descriptivo.
9. **Publicación Sites:** guardar y desplegar una versión vinculada al SHA.
10. **Postcheck:** revisar producción, recursos, 404, sitemap y SEO.

Un lote no se considera terminado solo porque está en `main`; debe estar
desplegado y verificado en `https://redrys.org`.

---

## Prioridades resumidas

| Prioridad | Trabajo | Responsable principal |
| --- | --- | --- |
| P0 | DNS, QA, Search Console y retirada controlada de Pages | Responsable técnico + propietario |
| P0 | Ratificación de líneas y perfiles | Coordinación de REDRYS |
| P1 | Nombres, fotografía institucional e imagen social | Coordinación + responsable técnico |
| P1 | Galería con permisos y contexto | Coordinación + responsable editorial |
| P1 | Catálogo de 15 publicaciones | Responsable editorial |
| P2 | ORCID, acta accesible y mejoras de redacción | Coordinación |
| P2 | Portal avanzado, búsqueda y feeds | Responsable editorial + técnico |

---

## Mejoras que no bloquean el cierre

- revisar la justificación del texto corrido con lectores reales. Se justifica
  con partición de palabras a petición expresa, para acercarlo al registro de
  una publicación académica impresa. WCAG 1.4.8 (nivel AAA) desaconseja el
  texto justificado porque el espaciado irregular dificulta el seguimiento de
  línea a personas con dislexia; el sitio apunta a AA, no a AAA. Retirarlo es
  una regla de `global.css`;
- fotografía en las páginas interiores, que siguen siendo solo texto;
- modo oscuro institucional;
- fotografías de todos los integrantes;
- ORCID y perfiles externos;
- acta con capa de texto o transcripción accesible;
- proyectos, eventos, noticias y convocatorias;
- búsqueda estática;
- RSS;
- taxonomías;
- exportación de citas.

Estas mejoras pueden aportar valor, pero no deben retrasar la estabilización del
dominio, las aprobaciones de contenido o la retirada segura de GitHub Pages.

---

## Lo que este roadmap no promete

- No genera producción académica.
- No sustituye repositorios institucionales, ORCID o Google Scholar.
- No garantiza posiciones en buscadores.
- No convierte contenido provisional en institucional mediante marcado SEO.
- No autoriza fotografías, datos personales, firmas o semblanzas.
- No elimina la necesidad de un responsable editorial con tiempo asignado.

El sitio puede hacer visible, accesible y citable el trabajo real de REDRYS;
su credibilidad depende de que cada afirmación siga teniendo una fuente y una
persona responsable.
