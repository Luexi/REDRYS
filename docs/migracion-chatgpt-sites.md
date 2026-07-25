# Migración de REDRYS a ChatGPT Sites

Esta bitácora registra el cambio de proveedor de alojamiento sin reemplazar el
repositorio de código. GitHub continúa siendo la fuente de verdad y el respaldo
del sitio.

## Baseline previo al cambio

- Fecha de auditoría: 24 de julio de 2026.
- Rama inicial: `main`.
- Commit previo: `41c5970b19afedb6d13b116ccd6400a9a8bd42ed`.
- Remoto: `https://github.com/Luexi/REDRYS.git`.
- GitHub Pages: publicación mediante `.github/workflows/deploy.yml`, custom
  domain `redrys.org` y Enforce HTTPS activado.
- Última ejecución de Pages: exitosa para el commit previo.
- Build: siete páginas estáticas, dos imágenes, dos PDFs, `robots.txt`,
  `sitemap-index.xml` y `sitemap-0.xml`.
- Rutas públicas:
  - `/`
  - `/la-red/`
  - `/objetivos/`
  - `/integrantes/`
  - `/contacto/`
  - `/galeria/`
  - `/repositorio/`
- DNS autoritativo: `ns301.cloud-mx-ns.net` a
  `ns305.cloud-mx-ns.net`.
- `ns301` tenía serial `2026041607`, los A `174.136.53.218`,
  `185.199.109.153` y `185.199.111.153`, además de un CNAME de `www` hacia
  `luexi.github.io`.
- `ns302` a `ns305` tenían serial `2026041623`, los A `174.136.53.218`,
  `185.199.109.153`, `185.199.110.153` y `185.199.111.153`, sin `www`.
- El A `174.136.53.218` era ajeno a GitHub Pages y
  `185.199.108.153` faltaba en todos los servidores.
- El servidor de GitHub entregaba un certificado con CN `*.github.io`, por lo
  que la validación TLS de `redrys.org` fallaba.
- Al consultar directamente un servidor de GitHub, las siete páginas,
  imágenes, PDFs, robots y sitemaps respondían 200; una ruta inexistente
  respondía 404.

## Arquitectura objetivo

- Código, historial y colaboración: este repositorio de GitHub.
- Generador: Astro con HTML estático rastreable.
- Empaquetado para Sites: el Worker ESM de `dist/server/index.js` sirve el HTML,
  robots y sitemaps generados por Astro; imágenes, estilos y PDFs permanecen
  intactos en `dist/client`. Esto permite aplicar por host el bloqueo de
  indexación del dominio temporal sin alterar `redrys.org`.
- Hosting público: ChatGPT Sites.
- Dominio canónico: `https://redrys.org`.
- DNS: administrado desde Neubox; los nameservers observados pertenecen a
  `cloud-mx-ns.net`, no a Cloudflare.
- Persistencia y autenticación: ninguna.
- Dominio temporal de Sites: bloqueado para indexación mediante robots y
  `X-Robots-Tag`.

## Estado operativo del corte

Estado registrado el 25 de julio de 2026:

- Se creó un único Site de REDRYS y se desplegó públicamente la versión
  candidata asociada al commit
  `5e084702731b47b6b0efe20273aa13a9573ca1c6`.
- La URL temporal pública es
  `https://redrys-org.luexig.chatgpt.site`; el Worker la mantiene con
  `noindex, nofollow` para evitar contenido duplicado.
- En Neubox se sustituyeron los registros de hosting anteriores por los dos A
  entregados por Sites para el apex y el CNAME entregado para `www`.
- Los cinco nameservers autoritativos responden únicamente con
  `162.159.143.30` y `172.66.3.26` para `redrys.org`.
- Los registros TXT de validación están publicados en los cinco nameservers y
  son visibles desde resolvers públicos.
- La sincronización de `www` sigue incompleta: `ns301` publica el CNAME de
  Sites y `ns302` a `ns305` todavía no lo entregan.
- Sites reconoce ambos dominios, pero el certificado HTTPS permanece en
  validación. La migración no se considera finalizada mientras TLS y los
  postchecks de producción estén pendientes.
- `.github/workflows/deploy.yml` y `public/CNAME` permanecen intactos hasta la
  autorización humana para retirar definitivamente GitHub Pages.

Un monitor comprueba periódicamente DNS, estado de Sites y HTTPS. Si los
nameservers de Neubox continúan inconsistentes 24 horas después del corte, se
debe abrir un ticket con la evidencia autoritativa antes de cambiar registros
de nuevo.

## Despliegue inicial y asociación del dominio

1. Ejecutar `npm ci`.
2. Ejecutar `npm run verify:sites`.
3. Guardar los cambios en una rama y hacer push a GitHub.
4. Guardar una versión en Sites asociada exactamente al SHA validado.
5. Desplegar primero con acceso exclusivo del propietario.
6. Tras revisión humana, publicar la misma versión para cualquier visitante.
7. Asociar el dominio y usar exclusivamente los registros DNS entregados por
   Sites.

El `project_id` de Sites se conserva en `.openai/hosting.json`. Ese archivo no
debe contener secretos, credenciales ni valores DNS.

## Actualizaciones posteriores

Para actualizaciones posteriores a la migración:

1. Crear y aprobar un commit en GitHub.
2. Ejecutar `npm run verify:sites` sobre ese commit.
3. Guardar una versión de Sites asociada al SHA exacto.
4. Desplegar explícitamente la versión seleccionada.
5. Ejecutar postchecks en `https://redrys.org`.

Un push a GitHub no despliega automáticamente ChatGPT Sites. El dominio
personalizado permanece asociado al mismo Site y no requiere cambios DNS en
cada actualización.

## Corte y retirada de Pages

Hasta que Sites tenga dominio validado y HTTPS correcto, se conservan el
workflow de GitHub Pages y `public/CNAME`. Después del corte y de una segunda
autorización humana:

1. Se desactiva GitHub Pages.
2. El workflow de despliegue se sustituye por validación de build.
3. Se retira `public/CNAME`.
4. GitHub permanece como repositorio y respaldo.

## Rollback

Si el corte a Sites falla antes de retirar Pages:

1. Confirmar que GitHub Pages siga habilitado, que su despliegue de respaldo
   responda correctamente y que pueda emitir HTTPS para el dominio.
2. Verificar en la documentación vigente de GitHub que continúen siendo
   oficiales los cuatro A registrados en el baseline del 24 de julio de 2026:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153` y
   `185.199.111.153`.
3. Restaurar esos cuatro A en Neubox.
4. Restaurar `www` como CNAME de `luexi.github.io`.
5. No restaurar `174.136.53.218`.
6. Confirmar que `public/CNAME` contiene `redrys.org`.
7. Volver a desplegar el commit
   `41c5970b19afedb6d13b116ccd6400a9a8bd42ed`.

Ese commit es el fallback histórico previo a la migración. Después de futuros
cambios de contenido, el procedimiento debe registrar y preferir el último
commit compatible que haya sido validado para Pages; nunca se debe asumir que
`HEAD` coincide con un despliegue de respaldo.

Si Pages ya fue retirado, reactivarlo en GitHub antes de restaurar DNS. Nunca
deben modificarse MX, NS, SPF, DKIM, DMARC ni registros de correo durante un
rollback de hosting.

## Hallazgos de mantenimiento fuera del alcance

`npm audit` informa alertas en Astro y dependencias de compilación. Astro no se
ejecuta en producción porque REDRYS se publica como HTML estático; una
actualización mayor se gestionará por separado para no mezclarla con el cambio
de alojamiento.
