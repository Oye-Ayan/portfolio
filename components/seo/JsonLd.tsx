/**
 * JsonLd.tsx — Structured Data for Google Rich Results
 *
 * Provides five schema types:
 * 1. Person         — Who you are, occupation, credentials, social profiles
 * 2. WebSite        — Identifies your website to Google
 * 3. ProfilePage    — Marks this as a professional profile page
 * 4. BreadcrumbList — Navigation structure for rich results
 * 5. ItemList       — Top projects for knowledge panel enrichment
 *
 * Validated against https://schema.org and Google Rich Results Test
 */

export default function JsonLd() {
  const baseUrl = 'https://muhammad-ayan-khan.vercel.app';
  const now = new Date().toISOString();

  // Schema 1: Person — the most important for personal branding & E-E-A-T
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${baseUrl}/#person`,
    name: 'Muhammad Ayan Khan',
    givenName: 'Muhammad Ayan',
    familyName: 'Khan',
    jobTitle: 'Software Engineer & Flutter Developer',
    description:
      'Software Engineer and Flutter Developer specializing in high-performance mobile applications, backend microservices, clean architecture, and AI integration. Currently at eConceptions as a Junior Java Developer.',
    url: baseUrl,
    email: 'mailto:mayan921111@gmail.com',
    telephone: '+92-314-5313125',
    image: `${baseUrl}/web-app-manifest-512x512.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Wah Cantt',
      addressRegion: 'Punjab',
      addressCountry: 'PK',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'COMSATS University Islamabad, Wah Campus',
      url: 'https://www.comsats.edu.pk',
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      name: 'Bachelor of Science in Software Engineering',
      educationalLevel: 'Bachelor',
      recognizedBy: {
        '@type': 'EducationalOrganization',
        name: 'COMSATS University Islamabad',
      },
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Software Engineer',
      occupationLocation: {
        '@type': 'Country',
        name: 'Pakistan',
      },
      description:
        'Develops cross-platform mobile applications using Flutter and Dart, backend microservices with Java Spring and Grails, and AI-powered healthcare solutions.',
      skills: [
        'Flutter',
        'Dart',
        'Firebase',
        'Java',
        'Spring Boot',
        'Python',
        'Clean Architecture',
        'REST APIs',
        'TensorFlow Lite',
        'Groovy and Grails',
      ],
    },
    worksFor: {
      '@type': 'Organization',
      name: 'eConceptions',
      url: 'https://www.econceptions.mobi',
    },
    knowsAbout: [
      'Flutter',
      'Dart',
      'Firebase',
      'Supabase',
      'Java',
      'Spring Boot',
      'Grails',
      'Python',
      'PHP',
      'Laravel',
      'MySQL',
      'TensorFlow Lite',
      'Clean Architecture',
      'Mobile App Development',
      'Backend Development',
      'REST APIs',
      'Microservices',
      'AI Integration',
      'Cross-Platform Development',
    ],
    sameAs: [
      'https://github.com/Oye-Ayan',
      'https://www.linkedin.com/in/muhammadayankhan/',
    ],
  };

  // Schema 2: WebSite — helps Google understand the site itself
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'Muhammad Ayan Khan — Software Engineer Portfolio',
    description:
      'Portfolio of Muhammad Ayan Khan — Software Engineer & Flutter Developer. High-performance mobile apps, backend microservices, and clean architecture.',
    author: { '@id': `${baseUrl}/#person` },
    publisher: { '@id': `${baseUrl}/#person` },
    inLanguage: 'en-US',
  };

  // Schema 3: ProfilePage — marks this as a professional profile
  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${baseUrl}/#profilepage`,
    url: baseUrl,
    name: 'Muhammad Ayan Khan — Software Engineer Portfolio',
    description:
      'Professional portfolio showcasing mobile apps, full-stack projects, and innovative AI-powered solutions by Muhammad Ayan Khan.',
    mainEntity: { '@id': `${baseUrl}/#person` },
    dateCreated: '2024-08-15T00:00:00Z',
    dateModified: now,
    inLanguage: 'en-US',
  };

  // Schema 4: BreadcrumbList — navigation structure for rich results
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projects',
        item: `${baseUrl}/#projects`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Experience',
        item: `${baseUrl}/#experience`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Contact',
        item: `${baseUrl}/#contact`,
      },
    ],
  };

  // Schema 5: ItemList — top projects for knowledge panel enrichment
  const projectsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Projects by Muhammad Ayan Khan',
    description:
      'Selected software projects built by Muhammad Ayan Khan, Flutter Developer and Software Engineer.',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ArticuliCare',
        description:
          'On-device AI-powered speech pathology detection app built with Flutter and TensorFlow Lite.',
        url: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'eConceptions Backend Services',
        description:
          'Backend microservices and SOAP/REST API integrations built with Java Spring and Grails.',
        url: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'POF Internal Flutter Application',
        description:
          'Flutter-based internal mobile application with Firebase backend, built during internship at Pakistan Ordnance Factories.',
        url: baseUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
    </>
  );
}
