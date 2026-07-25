import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Colecciones de contenido de REDRYS.
 *
 * El esquema es deliberadamente estricto: obliga a declarar la procedencia
 * institucional de cada texto (`fuente`) y su estado de aprobación
 * (`aprobacion`). Una ficha sin esos campos no compila, lo que impide publicar
 * contenido cuyo origen no esté registrado en `docs/FUENTES-Y-PENDIENTES.md`.
 */

const estadoAprobacion = z.enum([
  // Transcripción o resumen fiel de un documento institucional.
  'documento-institucional',
  // Redacción editorial pendiente de ratificación por la coordinación.
  'editorial-pendiente-de-aprobacion',
  // Redacción editorial aprobada por la coordinación en una fecha registrada.
  'editorial-aprobada',
]);

const lineas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lineas' }),
  schema: z.object({
    titulo: z.string(),
    tituloCorto: z.string(),
    orden: z.number(),
    resumen: z.string(),
    descripcionSEO: z.string(),
    // Objetivos del Art. 2 del reglamento con los que se relaciona la línea.
    objetivosRelacionados: z.array(z.string()).default([]),
    fuente: z.string(),
    aprobacion: estadoAprobacion,
    actualizado: z.coerce.date(),
  }),
});

const documentos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/documentos' }),
  schema: z.object({
    titulo: z.string(),
    tituloCorto: z.string(),
    /** Título de <title>. Máximo 70 caracteres para evitar truncamiento. */
    tituloSEO: z.string().max(70),
    orden: z.number(),
    resumen: z.string(),
    descripcionSEO: z.string(),
    tipo: z.enum(['Reglamento', 'Acta constitutiva']),
    fecha: z.coerce.date().optional(),
    // Ruta pública del PDF original, si su publicación está autorizada.
    archivo: z.string().optional(),
    archivoTamano: z.string().optional(),
    // true cuando el HTML reproduce el texto íntegro del documento.
    textoIntegro: z.boolean().default(false),
    fuente: z.string(),
    aprobacion: estadoAprobacion,
    actualizado: z.coerce.date(),
  }),
});

export const collections = { lineas, documentos };
