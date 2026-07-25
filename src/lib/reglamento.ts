import { getEntry, render } from 'astro:content';

/**
 * Anclajes del texto íntegro del reglamento.
 *
 * Astro ya genera un `id` estable para cada encabezado del Markdown, pero hasta
 * ahora ninguna de las páginas que citan un artículo concreto los usaba: seis
 * páginas decían "Artículo 12" y dejaban al lector en la cabecera de un
 * documento de más de 3000 px sin índice.
 *
 * Estas funciones derivan los anclajes del propio contenido en tiempo de build.
 * No se escriben a mano: si cambia la redacción de un encabezado, el enlace lo
 * sigue. Si un artículo citado deja de existir, `articuloHref` falla el build en
 * lugar de publicar un enlace roto.
 */

export interface EncabezadoReglamento {
  depth: number;
  slug: string;
  text: string;
}

const RUTA_REGLAMENTO = 'documentos/reglamento/';

let cache: EncabezadoReglamento[] | null = null;

/** Encabezados de capítulo (nivel 2) y de artículo (nivel 3). */
export async function encabezadosReglamento(): Promise<EncabezadoReglamento[]> {
  if (cache) {
    return cache;
  }

  const documento = await getEntry('documentos', 'reglamento');

  if (!documento) {
    throw new Error('No existe la ficha de contenido `documentos/reglamento`.');
  }

  const { headings } = await render(documento);
  cache = headings.filter((heading) => heading.depth === 2 || heading.depth === 3);

  return cache;
}

/**
 * URL absoluta del artículo `numero` dentro del reglamento, con su anclaje.
 * Lanza si el artículo no existe en el documento publicado.
 */
export async function articuloHref(numero: number, base: string): Promise<string> {
  const headings = await encabezadosReglamento();
  const patron = new RegExp(`^Art[íi]culo\\s+${numero}\\b`, 'i');
  const heading = headings.find((item) => patron.test(item.text));

  if (!heading) {
    throw new Error(
      `El reglamento publicado no contiene un "Artículo ${numero}". ` +
        'Revisa la cita o el texto del documento antes de enlazarlo.',
    );
  }

  return `${base}${RUTA_REGLAMENTO}#${heading.slug}`;
}

/**
 * Resuelve varias citas de una vez. Devuelve un objeto indexado por número para
 * poder escribir `articulos[5]` en la plantilla.
 */
export async function articulosHref(
  numeros: number[],
  base: string,
): Promise<Record<number, string>> {
  const entradas = await Promise.all(
    numeros.map(async (numero) => [numero, await articuloHref(numero, base)] as const),
  );

  return Object.fromEntries(entradas);
}
