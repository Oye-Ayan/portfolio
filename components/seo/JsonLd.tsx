/**
 * JsonLd.tsx — Structured Data for Google Rich Results
 * 
 * Provides three schema types:
 * 1. Person — Who you are, your job, skills, social profiles
 * 2. WebSite — Identifies your website to Google
 * 3. ProfilePage — Marks this as a professional profile page
 * 
 * Validated against https://schema.org and Google Rich Results Test
 */

export default function JsonLd() {
  const baseUrl = 'https://muhammad-ayan-khan.vercel.app';

  // Schema 1: Person — the most important for personal branding
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
    dateCreated: "2024-08-15T00:00:00Z",
    dateModified: "2026-08-25T00:00:00Z",
    inLanguage: 'en-US',
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
    </>
  );
}
