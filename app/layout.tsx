import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
});

const BASE_URL = 'https://muhammad-ayan-khan.vercel.app';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#64d99a' },
    { media: '(prefers-color-scheme: light)', color: '#059669' },
  ],
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

  // ── Focused keywords — quality over quantity ──
  keywords: [
    "Muhammad Ayan Khan",
    "Muhammad Ayan Khan portfolio",
    "Muhammad Ayan Khan software engineer",
    "Flutter Developer Pakistan",
    "Software Engineer Wah Cantt",
    "Flutter Developer portfolio",
    "Java Developer Pakistan",
    "ArticuliCare app",
    "eConceptions developer",
    "Mobile App Developer Pakistan",
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
        secureUrl: `${BASE_URL}/opengraph-image.png`,
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

  // ── Search Console verifications ──
  verification: {
    google: "3c3f9f1308fd91bb",
    // Add your Bing Webmaster Tools verification code at https://www.bing.com/webmasters
    // bing: "YOUR_BING_VERIFY_CODE",
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
    <html lang="en" suppressHydrationWarning className={`scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <head>
        {/* Anti-flash theme initialization script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var isDark = stored ? stored === 'dark' : (window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased custom-scrollbar noise-overlay">
        <ThemeProvider>
          {children}
        </ThemeProvider>

        {/* Google Analytics — deferred to lazyOnload to completely eliminate network hang/render-blocking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8J93HDK4N3"
          strategy="lazyOnload"
        />
        <Script id="ga-config" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8J93HDK4N3');
          `}
        </Script>
      </body>
    </html>
  );
}
