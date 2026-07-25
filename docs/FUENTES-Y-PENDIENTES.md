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

## Matriz de contenido

| Dato público | Valor o tratamiento actual | Fuente principal | Ubicación | Implementación | Estado |
| --- | --- | --- | --- | --- | --- |
| Nombre y siglas | Red de Educación para el Desarrollo Regional y Sostenible (REDRYS) | Acta y reglamento | Acta p. 1; Reglamento p. 1 | `src/data/site.ts` | Coincide con las fuentes |
| Fecha de creación | 28 de octubre de 2024 | Acta constitutiva | Acta p. 1 | `src/data/site.ts` | Coincide con la fuente |
| Coordinador publicado | Dr. Rubén Hernández Chavarría | Acta constitutiva | Acta p. 1 | `src/data/site.ts` y `src/layouts/BaseLayout.astro` | Coincide con la fuente; confirmar vigencia del cargo |
| Teléfono | Se publica el número registrado en `site.ts` | Acta constitutiva | Acta p. 1 | `src/data/site.ts` y JSON-LD | Coincide con el acta; confirmar que continúa siendo contacto público |
| Correo | `redrys@uagro.mx` | Confirmación institucional pendiente; el acta muestra otro correo | Acta p. 1 | `src/data/site.ts` y `src/layouts/BaseLayout.astro` | Pendiente de aprobación documentada |
| Sede | Edificio de Posgrado, FCA, UAGro, Acapulco | Acta y reglamento | Acta p. 1; Reglamento p. 1 | `src/data/site.ts` | Coincide en términos generales |
| Objetivo general | Texto público completo | Acta constitutiva | Acta p. 1 | `src/data/objetivos.ts` | Coincide con la fuente |
| Objetivos específicos | Cuatro objetivos | Reglamento | Reglamento p. 1 | `src/data/objetivos.ts` | Coinciden con la fuente |
| Líneas de investigación | Tres líneas con descripciones editoriales | Reglamento | Reglamento p. 1 | `src/data/lineas.ts` | Nombres coinciden; descripciones son adaptación pública |
| Integrantes | 22 integrantes publicados | Acta constitutiva y criterio institucional pendiente de documentar | Acta pp. 2-4 | `src/data/integrantes.ts` | Pendiente de confirmar lista canónica y criterio |
| Tipos de miembros | Profesores-investigadores, estudiantes y colaboradores externos | Reglamento | Reglamento pp. 1-2 | Resumen en `src/pages/la-red.astro` | Coincide con la fuente |
| Comité y responsable | Comité de cinco miembros y responsable elegido cada dos años | Reglamento | Reglamento p. 2 | `src/pages/la-red.astro` | Coincide con la fuente |
| Comisiones | Investigación, vinculación, difusión y formación | Reglamento | Reglamento p. 2 | `src/pages/la-red.astro` | Coincide con la fuente |
| Reuniones, proyectos y publicaciones | Reglas institucionales no desarrolladas como flujo web | Reglamento | Reglamento pp. 2-3 | No existe módulo dinámico | Informativo; fuera del alcance técnico actual |
| Acta y reglamento | PDFs descargables | Documentos proporcionados al proyecto | `/public/docs/` | Enlaces en `src/pages/la-red.astro` | Publicados; revisar autorización y privacidad |

“Coincide” significa que la revisión técnica no detectó una diferencia
material de transcripción. No equivale a una ratificación actual de la
coordinación.

## Decisiones abiertas

### P0 — Antes del próximo cambio institucional

#### Lista canónica de integrantes

- **Situación:** el sitio publica 22 integrantes. El acta contiene 24
  renglones de nombres entre las páginas 2 y 4.
- **Observaciones:** aparece Liliana Galeana Camacho y otro renglón con una
  variante “Liliana Galena Camacho”; también aparece Fermín Rodríguez Jaimes,
  quien no figura en la lista web.
- **Decisión requerida:** confirmar la lista oficial y el criterio: personas
  nombradas, firmantes, fundadores aprobados o miembros activos.
- **Responsable de decidir:** coordinación de REDRYS.
- **Criterio de cierre:** lista fechada y aprobada; sitio y matriz
  actualizados.
- **Revisión:** registrada el 25 de julio de 2026; revisar al recibir respuesta
  y antes del siguiente despliegue institucional.

#### Correo institucional

- **Situación:** el sitio publica `redrys@uagro.mx`; el acta muestra otro
  correo.
- **Decisión requerida:** confirmar cuál debe ser el contacto público vigente.
- **Responsable de decidir:** coordinación de REDRYS.
- **Criterio de cierre:** confirmación fechada y consistencia entre contenido
  visible, footer y JSON-LD.
- **Revisión:** registrada el 25 de julio de 2026; revisar antes del siguiente
  cambio de contacto.

#### Acta con firmas

- **Situación:** la copia pública contiene firmas manuscritas y datos de
  contacto.
- **Decisión requerida:** confirmar autorización para mantener esa versión
  pública o proporcionar una copia pública redactada.
- **Responsable de decidir:** coordinación de REDRYS.
- **Criterio de cierre:** autorización registrada o PDF público sustituido por
  una versión aprobada, conservando el original en un archivo privado.
- **Revisión:** registrada el 25 de julio de 2026; revisar antes del próximo
  despliegue que modifique documentos.

### P1 — Contenido pendiente

#### Galería

- **Entrada necesaria:** fotografías aprobadas, evento, fecha, pie de foto,
  texto alternativo y permiso de uso.
- **Responsables:** coordinación aporta y aprueba; responsable técnico
  implementa.
- **Criterio de cierre:** contenido real en `/galeria/`, revisión móvil,
  accesibilidad y aprobación final.
- **Revisión:** pendiente de programar cuando la coordinación entregue
  material.

#### Repositorio académico

- **Entrada necesaria:** categorías, materiales iniciales, metadatos, derechos
  de publicación y responsable de mantenimiento.
- **Responsables:** coordinación define y aprueba; responsable técnico diseña
  la implementación.
- **Criterio de cierre:** alcance aprobado, materiales verificables y página
  que ya no se presente como placeholder.
- **Revisión:** pendiente de programar cuando exista un catálogo inicial.

### P1 — Operación

#### Estado final de la migración

- **Situación:** el corte DNS hacia ChatGPT Sites comenzó el 25 de julio de
  2026. El dominio principal ya entrega los A indicados por Sites en los cinco
  nameservers, pero la validación HTTPS y la sincronización autoritativa de
  `www` siguen pendientes. GitHub Pages se conserva como rollback temporal y
  no debe retirarse hasta completar los postchecks.
- **Decisión requerida:** registrar si el dominio ya fue cortado
  definitivamente a Sites y si se autoriza retirar Pages y `public/CNAME`.
- **Responsable de decidir:** responsable técnico con autorización del
  propietario del dominio.
- **Criterio de cierre:** apex y `www` resueltos por Sites, HTTPS válido,
  versión y SHA desplegados registrados, fecha de corte y rollback
  probado/documentado.
- **Revisión:** seguir los hitos de `docs/migracion-chatgpt-sites.md`; no
  ejecutar la retirada como parte de documentación. Este estado es transitorio;
  la bitácora es la referencia operativa.

## Backlog resumido

| Prioridad | Pendiente | Información o aprobación necesaria | Responsable | Terminado cuando |
| --- | --- | --- | --- | --- |
| P0 | Lista de integrantes | Lista canónica y criterio institucional | Coordinación | Web y fuente coinciden con aprobación fechada |
| P0 | Correo público | Confirmación del contacto vigente | Coordinación | Sitio y JSON-LD son consistentes |
| P0 | Privacidad del acta | Autorización o copia pública redactada | Coordinación | Existe decisión registrada |
| P1 | Galería | Fotografías, contexto y permisos | Coordinación + responsable técnico | Página real aprobada |
| P1 | Repositorio | Catálogo, metadatos y derechos | Coordinación + responsable técnico | Alcance y contenido publicados |
| P1 | Migración de hosting | Confirmación del corte y retiro del respaldo | Responsable técnico + propietario del dominio | Estado y rollback actualizados |
| P2 | Accesibilidad documental | Transcripción HTML o copia accesible aprobada | Coordinación + responsable técnico | Contenido textual accesible y enlazado |

## Registro de aprobaciones

Añade una fila únicamente cuando exista una decisión explícita:

| Fecha | Decisión | Aprobó | Evidencia o referencia | Cambios realizados |
| --- | --- | --- | --- | --- |
| — | Sin aprobaciones registradas en este documento | — | — | — |

No adjuntes conversaciones privadas ni documentos con firmas. Registra una
referencia suficiente para localizar la aprobación en el archivo
institucional correspondiente.
