import type { Metadata, Viewport } from "next";
import "./globals.css";

const BASE_URL = 'https://muhammad-ayan-khan.vercel.app';

export const viewport: Viewport = {
  themeColor: '#64d99a',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  // ── Base URL for resolving relative OG images, canonical, etc. ──
  metadataBase: new URL(BASE_URL),

  // ── Core Meta ──
  title: {
    default: "Muhammad Ayan Khan | Software Engineer & Flutter Developer",
    template: "%s | Muhammad Ayan Khan",
  },
  description:
    "Portfolio of Muhammad Ayan Khan — Software Engineer & Flutter Developer based in Pakistan. Specializing in high-performance mobile apps (Flutter, Firebase, Supabase), backend microservices (Java, Spring, Grails), clean architecture, and AI integration.",

  // ── Long-tail keywords targeting branded + specialization searches ──
  keywords: [
    "Muhammad Ayan Khan",
    "Muhammad Ayan Khan portfolio",
    "Muhammad Ayan Khan software engineer",
    "Software Engineer Pakistan",
    "Flutter Developer Pakistan",
    "Flutter Developer portfolio",
    "Mobile App Developer Wah Cantt",
    "Full-Stack Developer",
    "Java Developer Pakistan",
    "Firebase Flutter developer",
    "Supabase developer",
    "Clean Architecture developer",
    "AI integration mobile apps",
    "TensorFlow Lite Flutter",
    "ArticuliCare app",
    "eConceptions developer",
    "Cross-platform mobile development",
    "Backend microservices Java",
    "PHP Laravel developer",
    "Python developer Pakistan",
    "Muhammad Ayan Khan github",
    "Muhammad Ayan Khan linkedin",
    "Muhammad Ayan Khan twitter",
    "Muhammad Ayan Khan instagram",
    "Muhammad Ayan Khan facebook",
    "Muhammad Ayan Khan whatsapp",
    "Muhammad Ayan Khan Telegram",
    "Muhammad Ayan Khan whatsapp",
    "Muhammad Ayan Khan Telegram",
    "Artificial Intelligence Developer",
    "Machine Learning Engineer",
    "AI Developer Pakistan",
    "Machine Learning Engineer Pakistan",
    "AI Developer Wah Cantt",
    "Machine Learning Engineer Wah Cantt",
    "AI Developer portfolio",
    "Machine Learning Engineer portfolio",
    "AI Developer github",
    "Machine Learning Engineer github",
    "AI Developer linkedin",
    "Machine Learning Engineer linkedin",
    "AI Developer twitter",
    "Machine Learning Engineer twitter",
    "AI Developer instagram",
    "Machine Learning Engineer instagram",
    "AI Developer facebook",
    "Machine Learning Engineer facebook",
    "AI Developer whatsapp",
    "Machine Learning Engineer whatsapp",
    "AI Developer Telegram",
    "Machine Learning Engineer Telegram",
  ],

  authors: [{ name: "Muhammad Ayan Khan", url: BASE_URL }],
  creator: "Muhammad Ayan Khan",
  publisher: "Muhammad Ayan Khan",

  // ── Canonical URL — prevents duplicate content ──
  alternates: {
    canonical: BASE_URL,
  },

  // ── Open Graph (Facebook, LinkedIn, WhatsApp) ──
  openGraph: {
    title: "Muhammad Ayan Khan | Software Engineer & Flutter Developer",
    description:
      "Portfolio showcasing high-performance mobile apps, full-stack projects, AI-powered healthcare solutions, and clean architecture expertise.",
    url: BASE_URL,
    siteName: "Muhammad Ayan Khan — Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Ayan Khan — Software Engineer & Flutter Developer Portfolio",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X Card ──
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ayan Khan | Software Engineer & Flutter Developer",
    description:
      "Portfolio showcasing mobile apps, backend microservices, AI integration, and clean architecture.",
    images: ["/opengraph-image.png"],
    creator: "@muhammadayankhan",
  },

  // ── Icons ──
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // ── Manifest for PWA ──
  manifest: "/manifest.json",

  // ── Robots ──
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Google Search Console verification ──
  verification: {
    google: "3c3f9f1308fd91bb",
  },

  // ── Category ──
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to critical third-party origins for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />

        {/* Google Analytics Tracking */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8J93HDK4N3" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8J93HDK4N3');
            `,
          }}
        />
      </head>
      <body className="antialiased custom-scrollbar noise-overlay">{children}</body>
    </html>
  );
}
