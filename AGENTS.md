# Guía de agentes — REDRYS

## Contexto y alcance

Al delegar o retomar: objetivo, decisiones y permisos con fuente y alcance,
estado comprobado, evidencias y pendientes. Recupéralos antes de repreguntar.
El relevo no concede permisos. Reporta bloqueos del sistema sin eludirlos.

- Empieza en [README.md](README.md). Para editar contenido o estilos consulta [MANTENIMIENTO.md](MANTENIMIENTO.md); para diseño técnico, [ARCHITECTURE.md](ARCHITECTURE.md). Carga solo el área del encargo.
- Antes de cambiar datos institucionales consulta [fuentes y pendientes](docs/FUENTES-Y-PENDIENTES.md). Conserva procedencia, ratificaciones pendientes y avisos de secciones en preparación; el sitio no sustituye la confirmación de la coordinación.
- Respeta el texto de los documentos fundacionales y los límites técnicos del README: sitio estático, sin JavaScript cliente ni recursos externos. Las salidas generadas no se editan a mano.
- Revisa `git status` antes de editar y conserva trabajo ajeno. Publicación y DNS siguen [la bitácora de migración](docs/migracion-chatgpt-sites.md) y requieren orden específica de Luis, igual que push y gastos.
- **Decisiones dentro del encargo.** Cuando corresponda, busca que el resultado sea claro para quien lo usa (UX), fácil de mantener para quien lo desarrolla (DX) y fiable de consultar u operar por agentes (AX). Conserva el comportamiento esperado y los contratos vigentes. Si estos objetivos compiten, prioriza el objetivo del encargo, la corrección, la seguridad y la accesibilidad; explica el compromiso relevante y valida el recorrido afectado. Este criterio no amplía el alcance ni autoriza refactorizaciones, rediseños o infraestructura no pedidos.

## Texto visible

Antes de extender una interfaz, contrasta una muestra con la referencia vigente.
Prueba su recorrido en móvil y escritorio, con datos de prueba cuando hagan falta.
Lo comprueba el agente; conserva la revisión independiente y las aprobaciones exigidas.

- En contenido nuevo o modificado, compón título y contenido. Omite subtítulos, rótulos sobre títulos (eyebrows), lemas y ayudas por defecto; añádelos solo si aportan información necesaria para comprender o actuar.
- Cada línea añade un dato concreto. No repitas el título ni describas lo que el botón, tabla o pantalla ya hace evidente; los espacios opcionales de una plantilla pueden quedar vacíos; conserva los campos y estructuras exigidos por el encargo.
- Redacta frases naturales. Evita cadenas de frases publicitarias cortadas (staccato), como «Más rápido. Más fácil.», y promesas genéricas.
- Conserva encabezados y etiquetas funcionales, costes, condiciones, errores, fuentes, unidades y texto necesario para accesibilidad. Simplificar no elimina información que cambia una decisión, ratificaciones pendientes ni estados de preparación; conserva la fidelidad de los documentos fundacionales.
- Si una ayuda intenta compensar una acción confusa, revisa primero nombres, orden, agrupación y flujo dentro del encargo. Conserva el apoyo que siga aportando información necesaria.
- Antes de entregar, aplica la prueba de supresión a cada texto auxiliar: si quitarlo no pierde información útil, elimínalo y recompón el espacio. Revisa el resultado final en su contexto, también en móvil cuando corresponda.

## Sincronizar con el remoto

**Antes de editar:** ejecuta `git fetch` y `git status -sb`.
- **Rama al día:** trabaja normal.
- **Rama atrás del remoto y sin cambios locales:** actualiza con `git pull --ff-only`.
- **Rama atrás del remoto y con cambios locales** (tuyos, de otro agente o de Luis): no actualices por tu cuenta; avisa a Luis.
- **Rama separada del remoto (divergida):** no edites; avisa a Luis.
- **Cambios sin commit de otros agentes o de Luis:** no son motivo para detenerte. No los toques, no los incluyas en tus commits (`git add` solo de tus archivos) y no edites esos mismos archivos; si necesitas uno de ellos, avisa a Luis.

## Verificación

Antes de pruebas costosas, comprueba puertos, servicios y configuración sin secretos.
Aísla o coordina las pruebas pesadas; no detengas procesos ajenos.

- Solo documentación interna: revisa enlaces, coherencia con README y `git diff --check`.
- Para cambios del sitio, sigue MANTENIMIENTO y ejecuta `npm run verify:sites` antes de preparar una publicación; revisa las superficies cambiadas en local.
- Reporta archivos cambiados, comprobaciones y pendientes; un build o push no acredita publicación en Sites.
