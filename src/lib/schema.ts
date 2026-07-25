import { site } from '../data/site';

const SITE_URL = 'https://redrys.org';

export const ORGANIZATION_ID = `${SITE_URL}/#organizacion`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Nodo de la entidad REDRYS. Se emite en todas las páginas con un `@id`
 * estable para que el resto de nodos pueda referenciarlo sin duplicar datos.
 *
 * `ResearchOrganization` describe con mayor precisión que
 * `EducationalOrganization` la naturaleza de la red: la REDRYS no imparte
 * programas educativos, sino que promueve investigación aplicada (Reglamento,
 * Artículo 1).
 */
export function organizationNode() {
  return {
    '@type': 'ResearchOrganization',
    '@id': ORGANIZATION_ID,
    name: site.fullName,
    alternateName: site.name,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/images/logo-redrys-uagro.png`,
    description:
      'Red académica multidisciplinaria adscrita a la Facultad de Contaduría y Administración de la Universidad Autónoma de Guerrero, dedicada a promover la investigación aplicada con impacto social en Guerrero.',
    foundingDate: site.foundedISO,
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: site.institution,
      url: site.institutionUrl,
    },
    founder: {
      '@type': 'Person',
      name: site.coordinator,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.streetAddress,
      addressLocality: site.addressLocality,
      addressRegion: site.addressRegion,
      postalCode: site.postalCode,
      addressCountry: 'MX',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Coordinación',
      telephone: site.phoneInternational,
      email: site.email,
      areaServed: 'MX',
      availableLanguage: 'es',
    },
    knowsAbout: [
      'Dirección y liderazgo para el desarrollo sostenible',
      'Cultura tributaria y responsabilidad fiscal',
      'Políticas públicas para el desarrollo regional',
    ],
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: `${site.name} — ${site.fullName}`,
    inLanguage: 'es-MX',
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export function webPageNode({
  canonical,
  title,
  description,
  dateModified,
}: {
  canonical: string;
  title: string;
  description: string;
  dateModified?: string;
}) {
  return {
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    inLanguage: 'es-MX',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
    ...(dateModified ? { dateModified } : {}),
  };
}

export function breadcrumbNode(
  canonical: string,
  items: { label: string; href?: string }[],
) {
  const entries = [{ label: 'Inicio', href: '/' }, ...items];

  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.label,
      ...(entry.href ? { item: new URL(entry.href, SITE_URL).href } : {}),
    })),
  };
}

export function buildGraph(nodes: unknown[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}
