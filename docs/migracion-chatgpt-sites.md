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
- Empaquetado para Sites: la salida de Astro se conserva sin transformaciones
  dentro de `dist/client`, junto al Worker ESM de `dist/server/index.js`.
- Hosting público: ChatGPT Sites.
- Dominio canónico: `https://redrys.org`.
- DNS: administrado desde Neubox; los nameservers observados pertenecen a
  `cloud-mx-ns.net`, no a Cloudflare.
- Persistencia y autenticación: ninguna.
- Dominio temporal de Sites: bloqueado para indexación mediante robots y
  `X-Robots-Tag`.

## Publicación

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

1. Restaurar en Neubox los cuatro A oficiales de GitHub Pages:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153` y
   `185.199.111.153`.
2. Restaurar `www` como CNAME de `luexi.github.io` si se desea mantenerlo.
3. No restaurar `174.136.53.218`.
4. Confirmar que `public/CNAME` contiene `redrys.org`.
5. Volver a desplegar el commit
   `41c5970b19afedb6d13b116ccd6400a9a8bd42ed`.

Si Pages ya fue retirado, reactivarlo en GitHub antes de restaurar DNS. Nunca
deben modificarse MX, NS, SPF, DKIM, DMARC ni registros de correo durante un
rollback de hosting.

## Hallazgos de mantenimiento fuera del alcance

`npm audit` informa alertas en Astro y dependencias de compilación. Astro no se
ejecuta en producción porque REDRYS se publica como HTML estático; una
actualización mayor se gestionará por separado para no mezclarla con el cambio
de alojamiento.
