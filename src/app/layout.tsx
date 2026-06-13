import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohammed Ihsan | Full Stack MERN Developer",
  description:
    "Product-focused Full Stack MERN Developer specializing in MongoDB, Express, React, Node.js, and Next.js. Building scalable, performant web applications with clean architecture.",
  metadataBase: new URL("https://mohammed-ihsan.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mohammed Ihsan | Full Stack MERN Developer",
    description:
      "Product-focused Full Stack MERN Developer specializing in MongoDB, Express, React, Node.js, and Next.js. Building scalable, performant web applications.",
    url: "https://mohammed-ihsan.vercel.app",
    siteName: "Mohammed Ihsan Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Ihsan | Full Stack MERN Developer",
    description:
      "Product-focused Full Stack MERN Developer specializing in MongoDB, Express, React, Node.js, and Next.js.",
    creator: "@itsihsaney",
  },
  icons: {
    icon: "/icon.PNG",
    apple: "/icon.PNG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mohammed Ihsan",
    "jobTitle": "Full Stack MERN Developer",
    "url": "https://mohammed-ihsan.vercel.app",
    "sameAs": [
      "https://github.com/mohammed-ihsan-dev",
      "https://www.linkedin.com/in/itsihsaney/"
    ],
    "knowsAbout": [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Web Development",
      "Clean Architecture"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "IGNOU"
    }
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-800 selection:text-zinc-100">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
