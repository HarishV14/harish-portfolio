import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import BackgroundParticles from "@/components/BackgroundParticles";
import GreetingAssistant from "@/components/assistant/GreetingAssistant";
import { VisitorProvider } from "@/context/VisitorContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import { siteMetadata } from "@/data/site";

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author }],
  creator: siteMetadata.author,
  metadataBase: new URL(siteMetadata.siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
  },
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteMetadata.author,
  jobTitle: "Full Stack Developer",
  url: siteMetadata.siteUrl,
  sameAs: [
    siteMetadata.social.github,
    siteMetadata.social.linkedin,
  ],
  description: siteMetadata.description,
  knowsAbout: ["Django", "React", "PostgreSQL", "Python", "REST APIs", "Full Stack Development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-sans bg-background text-foreground" suppressHydrationWarning>
        <VisitorProvider>
          <BackgroundParticles />
          <CustomCursor />
          <GreetingAssistant />
          <SmoothScroll>
            <Navbar />
            {children}
          </SmoothScroll>
        </VisitorProvider>
      </body>
    </html>
  );
}
