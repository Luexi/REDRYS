export const site = {
  name: 'REDRYS',
  fullName: 'Red de Educación para el Desarrollo Regional y Sostenible',
  tagline: 'Conocimiento para el desarrollo sostenible',
  email: 'redrys@uagro.mx',
  phone: '7441069320',
  phoneInternational: '+527441069320',
  address: 'Edificio de Posgrado, Facultad de Contaduría y Administración, UAGro',
  streetAddress: 'Av. Adolfo Ruiz Cortines s/n, Alta Progreso',
  postalCode: '39610',
  city: 'Acapulco de Juárez, Guerrero',
  addressLocality: 'Acapulco de Juárez',
  addressRegion: 'Guerrero',
  coordinator: 'Dr. Rubén Hernández Chavarría',
  coordinatorRole: 'Fundador de la Red',
  founded: '28 de octubre de 2024',
  foundedISO: '2024-10-28',
  sede: 'Facultad de Contaduría y Administración, Universidad Autónoma de Guerrero',
  institution: 'Universidad Autónoma de Guerrero',
  institutionUrl: 'https://www.uagro.mx',
  faculty: 'Facultad de Contaduría y Administración',
  facultyShort: 'FCA',
};

/**
 * Navegación principal.
 *
 * `Documentos` estaba únicamente en el pie. El acta de creación y el reglamento
 * son la prueba de que la red existe y la ruta que sigue quien viene a
 * verificarla, así que su ausencia del menú se leía como que no estaban
 * publicados. `Objetivos` sale del menú porque su contenido pertenece al mismo
 * ámbito que `La Red`, que ya enlaza a él; sigue accesible desde el pie, desde
 * la portada y desde las tres líneas de investigación.
 */
export const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'La Red', href: '/la-red/' },
  { label: 'Líneas', href: '/lineas-investigacion/' },
  { label: 'Integrantes', href: '/integrantes/' },
  { label: 'Documentos', href: '/documentos/' },
  { label: 'Contacto', href: '/contacto/' },
];

export const footerLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'La Red', href: '/la-red/' },
  { label: 'Líneas de investigación', href: '/lineas-investigacion/' },
  { label: 'Objetivos', href: '/objetivos/' },
  { label: 'Integrantes', href: '/integrantes/' },
  { label: 'Documentos', href: '/documentos/' },
  { label: 'Colaborar', href: '/colaborar/' },
  { label: 'Contacto', href: '/contacto/' },
  { label: 'Galería', href: '/galeria/' },
  { label: 'Repositorio', href: '/repositorio/' },
];
