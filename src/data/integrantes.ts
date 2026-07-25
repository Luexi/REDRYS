export interface Integrante {
  /** Nombre tal como está aprobado para publicación. */
  name: string;
  /** Dependencia de adscripción: FCA o FACOM. */
  dependency: 'FCA' | 'FACOM';
  /** Cargo dentro de la REDRYS. */
  role: string;
  /**
   * Identificador de la página de perfil. Solo se define para las personas
   * cuyo perfil académico está documentado y cuyo nombre coincide exactamente
   * con la fuente de procedencia. Sin `slug` no se genera página individual.
   */
  slug?: string;
  /** Grado académico abreviado (Dr. / Dra.). */
  grado?: string;
  /** Semblanza académica breve. */
  semblanza?: string;
  /** Cuerpo académico UAGro de adscripción. */
  cuerpoAcademico?: string;
  /** Línea del cuerpo académico. No equivale a las líneas de la REDRYS. */
  lineaCuerpoAcademico?: string;
  /** Correo institucional, solo si su publicación está autorizada. */
  email?: string;
}

/**
 * Directorio de integrantes fundadores de la REDRYS.
 *
 * Lista confirmada por la coordinación el 25 de julio de 2026 (22 personas).
 *
 * Los campos de perfil académico (`grado`, `semblanza`, `cuerpoAcademico`,
 * `lineaCuerpoAcademico`) proceden del sitio público de la Maestría en
 * Dirección de Organizaciones de la FCA-UAGro y están pendientes de
 * ratificación por la coordinación de la REDRYS. Su procedencia y estado están
 * registrados en `docs/FUENTES-Y-PENDIENTES.md`.
 *
 * Las fotografías de integrantes están previstas para una fase posterior; ver
 * `roadmap.md`.
 */
export const integrantes: Integrante[] = [
  {
    name: 'Citlalli Arroyo Rosas',
    dependency: 'FCA',
    role: 'Miembro fundador',
    slug: 'citlalli-arroyo-rosas',
    grado: 'Dra.',
    semblanza:
      'Doctora en Administración Pública por el Instituto Internacional del Derecho y del Estado. Cuenta con Perfil PRODEP, es académica certificada por la ANFECA e integrante del Padrón Estatal de Investigadores de Guerrero.',
    cuerpoAcademico: 'UAGro-CA-229',
    lineaCuerpoAcademico: 'Gestión y comportamiento organizacional',
  },
  {
    name: 'Gabriela del Carmen Rivero Solana',
    dependency: 'FCA',
    role: 'Miembro fundador',
    slug: 'gabriela-del-carmen-rivero-solana',
    grado: 'Dra.',
    semblanza:
      'Doctora en Administración Pública por el Instituto Internacional del Derecho y del Estado. Cuenta con Perfil PRODEP, es académica certificada por la ANFECA e integrante del Padrón Estatal de Investigadores de Guerrero. Lidera el cuerpo académico UAGro-CA-229.',
    cuerpoAcademico: 'UAGro-CA-229',
    lineaCuerpoAcademico: 'Gestión y comportamiento organizacional',
  },
  { name: 'Azucena Salvador Flores', dependency: 'FCA', role: 'Miembro fundador' },
  {
    name: 'Irma Amalia Méndez Castrejón',
    dependency: 'FCA',
    role: 'Miembro fundador',
    slug: 'irma-amalia-mendez-castrejon',
    grado: 'Dra.',
    semblanza:
      'Doctora en Ciencias de la Educación por el Colegio Mayor de San Carlos. Integrante del Sistema Nacional de Investigadores en nivel candidata y de la Red Nacional de Productividad, Innovación y Competitividad Empresarial.',
    cuerpoAcademico: 'UAGro-CA-252',
    lineaCuerpoAcademico: 'Innovación y responsabilidad social en las organizaciones',
  },
  { name: 'Shaila Aleciram Cabrera Luna', dependency: 'FCA', role: 'Miembro fundador' },
  { name: 'René Felipe de Jesús Gutiérrez Agüero', dependency: 'FCA', role: 'Miembro fundador' },
  { name: 'Antolín Torres Diego', dependency: 'FCA', role: 'Miembro fundador' },
  { name: 'Emma Yesmin Trejo Kuri', dependency: 'FCA', role: 'Miembro fundador' },
  { name: 'Anakaren Gabriela Manrique Gómez', dependency: 'FCA', role: 'Miembro fundador' },
  { name: 'Karla de Monserrat Luna Gómez', dependency: 'FCA', role: 'Miembro fundador' },
  {
    name: 'Evelyn Janet Zavaleta Carbajal',
    dependency: 'FCA',
    role: 'Miembro fundador',
    slug: 'evelyn-janet-zavaleta-carbajal',
    grado: 'Dra.',
    semblanza:
      'Doctora en Administración Pública por el Instituto Internacional del Derecho y del Estado. Integrante del Sistema Nacional de Investigadores en nivel candidata, cuenta con Perfil PRODEP y coordina el cuerpo académico UAGro-CA-227.',
    cuerpoAcademico: 'UAGro-CA-227',
    lineaCuerpoAcademico: 'Educación virtual y responsabilidad social',
  },
  {
    name: 'Yanira Gallardo Moreno',
    dependency: 'FCA',
    role: 'Miembro fundador',
    slug: 'yanira-gallardo-moreno',
    grado: 'Dra.',
    semblanza:
      'Doctora en Administración por la Universidad Americana de Acapulco. Integrante del Sistema Nacional de Investigadores en nivel candidata y con Perfil PRODEP.',
    cuerpoAcademico: 'UAGro-CA-252',
    lineaCuerpoAcademico: 'Innovación y responsabilidad social en las organizaciones',
  },
  {
    name: 'David Antonio Reyes Peña',
    dependency: 'FCA',
    role: 'Miembro fundador',
    slug: 'david-antonio-reyes-pena',
    grado: 'Dr.',
    semblanza:
      'Doctor en Administración por la Universidad Autónoma de Guerrero. Integrante del Sistema Nacional de Investigadores nivel 1 y de la Red Mexicana de Investigadores en Estudios Organizacionales.',
    cuerpoAcademico: 'UAGro-CA-252',
    lineaCuerpoAcademico: 'Innovación y responsabilidad social en las organizaciones',
  },
  { name: 'Elsa Torres Cuevas', dependency: 'FCA', role: 'Miembro fundador' },
  {
    name: 'José Luis Susano García',
    dependency: 'FACOM',
    role: 'Miembro fundador',
    slug: 'jose-luis-susano-garcia',
    grado: 'Dr.',
    semblanza:
      'Doctor en Administración y Gestión Empresarial por la Universidad del Centro del Bajío. Integrante del Sistema Nacional de Investigadores nivel 1 y presidente de la Red Académica de Gestión de Mercadotecnia del Consorcio de Universidades Mexicanas.',
    cuerpoAcademico: 'UAGro-CA-209',
    lineaCuerpoAcademico: 'Responsabilidad social y gestión de las organizaciones',
  },
  {
    name: 'Remigio Marín Ibarra',
    dependency: 'FCA',
    role: 'Miembro fundador',
    slug: 'remigio-marin-ibarra',
    grado: 'Dr.',
    semblanza:
      'Doctor en Administración por Atlantic International University. Integrante del cuerpo académico UAGro-CA-210.',
    cuerpoAcademico: 'UAGro-CA-210',
    lineaCuerpoAcademico: 'Gestión, desarrollo y aspectos financieros de las empresas',
  },
  {
    name: 'Liliana Galeana Camacho',
    dependency: 'FCA',
    role: 'Miembro fundador',
    slug: 'liliana-galeana-camacho',
    grado: 'Dra.',
    semblanza:
      'Doctora en Administración Pública por el Instituto Internacional del Derecho y del Estado. Cuenta con Perfil PRODEP e integra el cuerpo académico UAGro-CA-227.',
    cuerpoAcademico: 'UAGro-CA-227',
    lineaCuerpoAcademico: 'Educación virtual y responsabilidad social',
  },
  { name: 'Moisés Carmona Serrano', dependency: 'FCA', role: 'Miembro fundador' },
  {
    name: 'Rosa Alejandra Vázquez Martínez',
    dependency: 'FCA',
    role: 'Miembro fundador',
    slug: 'rosa-alejandra-vazquez-martinez',
    grado: 'Dra.',
    semblanza:
      'Doctora en Administración por la Universidad IEXPRO. Cuenta con Perfil PRODEP.',
    cuerpoAcademico: 'UAGro-CA-227',
    lineaCuerpoAcademico: 'Educación virtual y responsabilidad social',
  },
  { name: 'Nallety Vázquez Martínez', dependency: 'FCA', role: 'Miembro fundador' },
  { name: 'Hugo Vázquez Mendoza', dependency: 'FCA', role: 'Miembro fundador' },
  {
    name: 'Rubén Hernández Chavarría',
    dependency: 'FCA',
    role: 'Fundador de la Red',
    slug: 'ruben-hernandez-chavarria',
    grado: 'Dr.',
    semblanza:
      'Doctor en Administración Pública por el Instituto Internacional del Derecho y del Estado. Integrante del Sistema Nacional de Investigadores en nivel candidato, académico certificado por la ANFECA y con Perfil PRODEP. Es coordinador regional de la Red Nacional de Productividad, Innovación y Competitividad Empresarial.',
    cuerpoAcademico: 'UAGro-CA-229',
    lineaCuerpoAcademico: 'Gestión y comportamiento organizacional',
    email: 'rhernandez@uagro.mx',
  },
];

/** Integrantes con página de perfil publicada. */
export const integrantesConPerfil = integrantes.filter(
  (integrante): integrante is Integrante & { slug: string } => Boolean(integrante.slug),
);

export const getIntegranteBySlug = (slug: string) =>
  integrantes.find((integrante) => integrante.slug === slug);
