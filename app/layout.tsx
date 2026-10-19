import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vamintcommunity.vercel.app"),
  title: "VAMINT | Code. Collaborate. Evolve.",
  description:
    "VAMINT is the student tech community of our college — organizing hackathons, workshops, competitions, and soft-skills events to help students code, collaborate, and evolve together.",
  openGraph: {
    title: "VAMINT | Code. Collaborate. Evolve.",
    description:
      "VAMINT is the student tech community of our college — organizing hackathons, workshops, competitions, and soft-skills events to help students code, collaborate, and evolve together.",
    type: "website",
    url: "https://vamintcommunity.vercel.app",
    images: [
      {
        url: "/logo.jpg",
        width: 630,
        height: 630,
        alt: "VAMINT Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VAMINT | Code. Collaborate. Evolve.",
    description:
      "VAMINT is the student tech community of our college — organizing hackathons, workshops, competitions, and soft-skills events.",
    images: ["/logo.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary selection:bg-mustard-500 selection:text-bg-primary">
        {children}
      </body>
    </html>
  );
}

