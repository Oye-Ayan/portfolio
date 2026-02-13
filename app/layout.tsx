import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Ayan Khan | Flutter & Full-Stack Developer",
  description: "Portfolio of Muhammad Ayan Khan - Flutter Developer, Full-Stack Engineer, and AI Enthusiast. Expertise in mobile app development, backend systems, and clean architecture.",
  keywords: ["Flutter Developer", "Full-Stack Developer", "Mobile App Development", "Firebase", "Supabase", "React", "Next.js", "Java Developer"],
  authors: [{ name: "Muhammad Ayan Khan" }],
  openGraph: {
    title: "Muhammad Ayan Khan | Flutter & Full-Stack Developer",
    description: "Portfolio showcasing mobile apps, full-stack projects, and innovative solutions",
    type: "website",
    locale: "en_US",
  },
   icons: {
    icon: "/favicon.ico",           
    shortcut: "/favicon-16x16.png",       
    apple: "/apple-touch-icon.png"        
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased custom-scrollbar">{children}</body>
    </html>
  );
}
