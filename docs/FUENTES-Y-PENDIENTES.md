# Fuentes de contenido y pendientes

Última revisión documental: **25 de julio de 2026**.

Este archivo controla de dónde procede el contenido institucional publicado y
qué decisiones requieren confirmación. No reemplaza el acta, el reglamento ni
las instrucciones formales de la coordinación.

## Roles

- **Responsable técnico:** Luis, mientras no se documente una transferencia.
  Implementa cambios, conserva el historial y verifica la publicación.
- **Autoridad institucional:** coordinación de REDRYS. Confirma integrantes,
  contacto, objetivos, documentos y cualquier afirmación institucional.

Si cambia alguno de los responsables, registra aquí el nombre, fecha y alcance
de la transferencia.

## Reglas de trazabilidad

1. El repositorio representa lo publicado, pero no crea hechos
   institucionales.
2. El acta y el reglamento son fuentes primarias para el contenido que
   contienen.
3. Una desviación respecto de esos documentos necesita confirmación explícita
   y fechada de la coordinación.
4. Las diferencias no se corrigen por inferencia, semejanza de nombres o
   presencia de una firma.
5. La confirmación debe registrar qué se aprobó, quién lo aprobó y la fecha.
6. No se copian firmas ni datos personales adicionales a este archivo.
7. Todo contenido de una colección declara su `fuente` y su `aprobacion` en el
   frontmatter. El esquema de `src/content.config.ts` no compila si faltan.

## Estados de aprobación del contenido

| Estado | Significado |
| --- | --- |
| `documento-institucional` | Transcripción o resumen fiel de un documento oficial. |
| `editorial-pendiente-de-aprobacion` | Redacción propia del sitio, pendiente de ratificación por la coordinación. |
| `editorial-aprobada` | Redacción propia ratificada por la coordinación en una fecha registrada. |

## Matriz de contenido

| Dato público | Valor o tratamiento actual | Fuente principal | Ubicación | Implementación | Estado |
| --- | --- | --- | --- | --- | --- |
| Nombre y siglas | Red de Educación para el Desarrollo Regional y Sostenible (REDRYS) | Acta y reglamento | Acta p. 1; Reglamento p. 1 | `src/data/site.ts` | Coincide con las fuentes |
| Fecha de creación | 28 de octubre de 2024 | Acta constitutiva | Acta p. 1 | `src/data/site.ts` | Coincide con la fuente |
| Cargo del Dr. Rubén Hernández Chavarría | **Fundador de la Red**, cargo permanente | Confirmación de la coordinación | — | `src/data/site.ts`, `src/data/integrantes.ts`, `src/lib/schema.ts` | **Confirmado el 25 de julio de 2026** |
| Teléfono | Se publica el número registrado en `site.ts` | Acta constitutiva | Acta p. 1 | `src/data/site.ts` y JSON-LD | Coincide con el acta; confirmar que continúa siendo contacto público |
| Correo | `redrys@uagro.mx` | Confirmación de la coordinación | — | `src/data/site.ts` y `src/lib/schema.ts` | **Confirmado el 25 de julio de 2026** |
| Dirección postal | Av. Adolfo Ruiz Cortines s/n, Alta Progreso, C.P. 39610, Acapulco de Juárez, Gro. | Confirmación de la coordinación (coincide con la dirección de la FCA) | — | `src/data/site.ts` y `PostalAddress` del JSON-LD | **Confirmado el 25 de julio de 2026** |
| Sede | Edificio de Posgrado, FCA, UAGro, Acapulco | Acta y reglamento | Acta p. 1; Reglamento p. 1 | `src/data/site.ts` | Coincide en términos generales |
| Participación de FACOM | La Facultad de Comunicación participa formalmente | Confirmación de la coordinación | — | `src/pages/la-red.astro`, `src/pages/integrantes/index.astro` | **Confirmado el 25 de julio de 2026** |
| Objetivo general | Texto público completo | Acta constitutiva | Acta p. 1 | `src/data/objetivos.ts`, `src/content/documentos/acta-de-creacion.md` | Coincide con la fuente |
| Objetivos específicos | Cuatro objetivos | Reglamento | Reglamento p. 1 | `src/data/objetivos.ts` | Coinciden con la fuente |
| Nombres de las líneas | Tres líneas | Reglamento | Reglamento p. 1, Art. 1 | `src/content/lineas/` | Coinciden con la fuente |
| Desarrollo editorial de las líneas | ~650 palabras por línea | Redacción propia a partir de los Art. 1, 2, 12 y 13 | — | `src/content/lineas/*.md` | **`editorial-pendiente-de-aprobacion`** |
| Integrantes | 22 integrantes publicados | Acta constitutiva y confirmación de la coordinación | Acta pp. 2-4 | `src/data/integrantes.ts` | **Lista confirmada el 25 de julio de 2026** |
| Perfiles académicos | 11 perfiles con grado, semblanza y cuerpo académico | Sitio público de la Maestría en Dirección de Organizaciones (FCA-UAGro) | — | `src/data/integrantes.ts`, `src/pages/integrantes/[slug].astro` | **Pendiente de ratificación por REDRYS** |
| Texto del reglamento | Transcripción íntegra en HTML | PDF institucional | `public/docs/reglamento-redrys.pdf` | `src/content/documentos/reglamento.md` | `documento-institucional` |
| Resumen del acta | Datos institucionales, sin transcripción | PDF institucional y esta matriz | `public/docs/acta-creacion-redrys.pdf` | `src/content/documentos/acta-de-creacion.md` | `documento-institucional` |
| Tipos de miembros | Profesores-investigadores, estudiantes y colaboradores externos | Reglamento | Reglamento pp. 1-2 | `src/pages/la-red.astro`, `src/pages/colaborar.astro` | Coincide con la fuente |
| Comité y responsable | Comité de cinco miembros y responsable elegido cada dos años | Reglamento | Reglamento p. 2 | `src/pages/la-red.astro` | Coincide con la fuente |
| Comisiones | Investigación, vinculación, difusión y formación | Reglamento | Reglamento p. 2 | `src/pages/la-red.astro` | Nombres de la fuente; las descripciones breves son redacción editorial |
| Vigencia de tres años | **Retirado del sitio** | No aparece en el reglamento; no verificable en el acta escaneada | — | — | Pendiente de confirmar la fuente antes de volver a publicarlo |
| Acta y reglamento (PDF) | PDFs descargables, sin cambios | Documentos proporcionados al proyecto | `/public/docs/` | Enlaces en `/documentos/` y `/la-red/` | **Se mantienen intactos por decisión del 25 de julio de 2026** |

«Coincide» significa que la revisión técnica no detectó una diferencia
material de transcripción. No equivale a una ratificación actual de la
coordinación.

## Decisiones abiertas

### P0 — Antes del próximo cambio institucional

#### Ratificación del contenido editorial de las líneas

- **Situación:** las tres páginas de `/lineas-investigacion/` contienen ~650
  palabras cada una, redactadas a partir de los Artículos 1, 2, 12 y 13 del
  reglamento y del contexto público del estado. No afirman proyectos,
  resultados, cifras ni participaciones que no consten en las fuentes.
- **Decisión requerida:** revisión y ratificación por la coordinación, o
  entrega de un texto propio que las sustituya.
- **Responsable de decidir:** coordinación de REDRYS.
- **Criterio de cierre:** cambiar `aprobacion` a `editorial-aprobada` en el
  frontmatter de los tres archivos y registrar la fecha en este documento.
- **Revisión:** registrada el 25 de julio de 2026.

#### Ratificación de los perfiles de integrante

- **Situación:** los datos de formación, distinciones y cuerpo académico de 11
  integrantes proceden del sitio público de la Maestría en Dirección de
  Organizaciones de la FCA-UAGro, no de una fuente propia de la REDRYS. Cada
  perfil muestra una nota de procedencia visible que lo declara.
- **Observación:** no se publican identificadores ORCID, perfiles externos,
  correos personales ni fotografías. El único correo publicado es institucional
  y ya figuraba en la fuente.
- **Decisión requerida:** ratificación de los datos por la coordinación y
  confirmación de que las personas autorizan su publicación en el sitio de la
  red.
- **Responsable de decidir:** coordinación de REDRYS.
- **Criterio de cierre:** aprobación fechada y sustitución de la nota de
  procedencia.
- **Revisión:** registrada el 25 de julio de 2026.

### P1 — Variantes de nombre sin resolver

- **Situación:** dos integrantes no tienen perfil porque su nombre no coincide
  exactamente entre fuentes.

  | Nombre publicado en REDRYS | Nombre en la fuente MDO |
  | --- | --- |
  | Nallety Vázquez Martínez | Nallely Vázquez Martínez |
  | Hugo Vázquez Mendoza | José Hugo Vázquez Mendoza |

- **Caso inverso:** Adriana Miranda Esteban aparece en la fuente MDO declarada
  como integrante de la red, pero no figura en el directorio de la REDRYS.
- **Decisión requerida:** confirmar la ortografía oficial de cada nombre y si
  Adriana Miranda Esteban debe incorporarse al directorio.
- **Responsable de decidir:** coordinación de REDRYS.
- **Criterio de cierre:** nombres confirmados; añadir `slug` y datos de perfil
  en `src/data/integrantes.ts` genera la página automáticamente.
- **Revisión:** registrada el 25 de julio de 2026. No se resolvió por
  inferencia, conforme a la regla 4.

### P1 — Contenido pendiente

#### Fotografías

- **Entrada necesaria:** fotografías de integrantes e imagen social de 1200×630.
- **Situación:** la fotografía de sesión de trabajo, con autorización de uso
  confirmada el 25 de julio de 2026, **ya está publicada** en la banda de la
  portada. Las fotografías de integrantes se aplazaron deliberadamente a una
  fase posterior.
- **Criterio de cierre:** imágenes en `src/assets/`, con texto alternativo
  descriptivo, pie de foto y dimensiones declaradas.
- **Revisión:** ver `roadmap.md`.

##### Segunda fotografía pendiente de autorización

- **Situación:** existe una segunda fotografía (sesión de formación en aula con
  estudiantes de posgrado, archivo original entregado el 25 de julio de 2026)
  que **no se ha publicado**. La autorización registrada en este documento
  cubre únicamente la fotografía de sesión de trabajo.
- **Motivo:** la imagen muestra estudiantes identificables. La autorización de
  uso de imagen de estudiantes es un supuesto distinto al de una reunión de
  trabajo entre integrantes de la red, y no consta registrada.
- **Criterio de cierre:** autorización de uso de imagen registrada en la tabla
  de aprobaciones, con fecha y evento confirmados. Con eso, la fotografía puede
  incorporarse a `/la-red/` para ilustrar la dimensión formativa de la red, o a
  la galería cuando esa sección se active.

##### Metadatos pendientes de la fotografía publicada

- **Entrada necesaria:** fecha exacta y denominación oficial del evento
  fotografiado.
- **Situación:** el pie de foto publicado es deliberadamente genérico («Sesión
  de trabajo de la red en la Facultad de Contaduría y Administración de la
  Universidad Autónoma de Guerrero») porque no consta la fecha ni el nombre del
  evento. No se infirieron.
- **Criterio de cierre:** pie de foto con fecha y evento confirmados.

#### Galería

- **Entrada necesaria:** fotografías aprobadas, evento, fecha, pie de foto,
  texto alternativo y permiso de uso.
- **Situación:** la ruta se publica con `noindex, follow` y está excluida del
  sitemap mientras no tenga contenido.
- **Criterio de cierre:** contenido real en `/galeria/`, retirada de `noindex`,
  eliminación de la ruta de `EXCLUDED_FROM_SITEMAP` en `astro.config.mjs` y de
  `NOINDEX_ROUTES` en `scripts/verify-sites-build.mjs`.

#### Repositorio académico

- **Entrada necesaria:** catálogo verificado de publicaciones con autores, año,
  medio, DOI o enlace, licencia y derechos de publicación.
- **Situación:** la recopilación está en curso. La ruta se publica con
  `noindex, follow` y está excluida del sitemap.
- **Criterio de cierre:** ver la condición de entrada del portal académico en
  `roadmap.md` (al menos 15 publicaciones verificadas).

### P1 — Operación

#### Estado final de la migración

- **Situación:** el corte DNS hacia ChatGPT Sites comenzó el 25 de julio de
  2026. El dominio principal ya entrega los A indicados por Sites en los cinco
  nameservers, pero la validación HTTPS y la sincronización autoritativa de
  `www` seguían pendientes. GitHub Pages se conserva como rollback temporal y
  no debe retirarse hasta completar los postchecks.
- **Decisión requerida:** registrar si el dominio ya fue cortado
  definitivamente a Sites y si se autoriza retirar Pages y `public/CNAME`.
- **Responsable de decidir:** responsable técnico con autorización del
  propietario del dominio.
- **Criterio de cierre:** apex y `www` resueltos por Sites, HTTPS válido,
  versión y SHA desplegados registrados, fecha de corte y rollback
  probado/documentado.
- **Revisión:** seguir los hitos de `docs/migracion-chatgpt-sites.md`.

#### Alta en Google Search Console

- **Situación:** el dominio no está dado de alta. Sin ello no hay forma de
  medir indexación ni consultas de búsqueda.
- **Criterio de cierre:** propiedad verificada, `sitemap-index.xml` enviado y
  aceptado, cobertura sin errores.
- **Dependencia:** requiere HTTPS válido en `redrys.org`.

## Backlog resumido

| Prioridad | Pendiente | Información o aprobación necesaria | Responsable | Terminado cuando |
| --- | --- | --- | --- | --- |
| P0 | Ratificar el contenido de las líneas | Revisión de los tres textos | Coordinación | `aprobacion: editorial-aprobada` en los tres archivos |
| P0 | Ratificar los perfiles de integrante | Confirmación de datos y autorización | Coordinación | Nota de procedencia sustituida |
| P1 | Variantes de nombre | Ortografía oficial de dos nombres y caso de Adriana Miranda Esteban | Coordinación | Directorio y perfiles coherentes |
| P1 | Fotografía de portada | Incorporar el archivo aprobado | Responsable técnico | Portada con imagen institucional |
| P1 | Vigencia de tres años | Fuente documental de la afirmación | Coordinación | Dato restituido o descartado |
| P1 | Galería | Fotografías, contexto y permisos | Coordinación + responsable técnico | Página real aprobada e indexable |
| P1 | Repositorio | Catálogo, metadatos y derechos | Coordinación + responsable técnico | Condición de entrada de `roadmap.md` cumplida |
| P1 | Migración de hosting | Confirmación del corte y retiro del respaldo | Responsable técnico + propietario del dominio | Estado y rollback actualizados |
| P1 | Search Console | HTTPS válido | Responsable técnico | Sitemap enviado y aceptado |
| P2 | ORCID y perfiles externos | Identificadores de cada integrante | Coordinación | `sameAs` publicado en los perfiles |
| P2 | Accesibilidad documental | El acta sigue siendo un PDF escaneado sin capa de texto | Coordinación | Copia con texto seleccionable o transcripción autorizada |

## Registro de aprobaciones

| Fecha | Decisión | Aprobó | Evidencia o referencia | Cambios realizados |
| --- | --- | --- | --- | --- |
| 2026-07-25 | Correo público vigente: `redrys@uagro.mx` | Coordinación, vía responsable técnico | Instrucción registrada en la sesión de implementación | Se mantiene en `site.ts` y en el JSON-LD; cerrado el pendiente anterior |
| 2026-07-25 | Lista de integrantes: los 22 publicados son correctos | Coordinación, vía responsable técnico | Ídem | Se mantiene `integrantes.ts` sin cambios de lista |
| 2026-07-25 | Cargo del Dr. Rubén Hernández Chavarría: Fundador de la Red, permanente | Coordinación, vía responsable técnico | Ídem | `founder` se conserva en el JSON-LD; `role` actualizado en `integrantes.ts`; retirada la etiqueta «Coordinador» |
| 2026-07-25 | La Facultad de Comunicación participa formalmente en la red | Coordinación, vía responsable técnico | Ídem | Se conserva la mención a FACOM en `/la-red/` e `/integrantes/` |
| 2026-07-25 | Dirección postal pública de la sede | Coordinación, vía responsable técnico | Ídem | Añadida a `site.ts` y al `PostalAddress` del JSON-LD |
| 2026-07-25 | El acta en PDF se mantiene intacta y publicada | Responsable técnico | Ídem | Sin cambios en `public/docs/`; la página HTML no transcribe firmas ni datos personales |
| 2026-07-25 | Autorización de uso de la fotografía de sesión de trabajo | Coordinación, vía responsable técnico | Ídem | Incorporada como `src/assets/sesion-trabajo-mdo-fca.jpeg`, publicada en la banda de la portada con pie y texto alternativo |
| 2026-07-25 | Uso de los datos de perfil del sitio de la Maestría en Dirección de Organizaciones | Responsable técnico | Ídem | 11 perfiles publicados con nota de procedencia visible; pendiente de ratificación institucional |

No adjuntes conversaciones privadas ni documentos con firmas. Registra una
referencia suficiente para localizar la aprobación en el archivo
institucional correspondiente.
