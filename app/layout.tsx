import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, Fraunces, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "VAMINT | Code. Collaborate. Evolve.",
  description: "VAMINT is the student tech community of our college — organizing hackathons, workshops, competitions, and soft-skills events to help students code, collaborate, and evolve together.",
  openGraph: {
    title: "VAMINT | Code. Collaborate. Evolve.",
    description: "VAMINT is the student tech community of our college — organizing hackathons, workshops, competitions, and soft-skills events to help students code, collaborate, and evolve together.",
    type: "website",
    url: "https://vamintcommunity.vercel.app",
    images: [{
      url: "/logo.jpg",
      width: 630,
      height: 630,
      alt: "VAMINT Logo",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VAMINT | Code. Collaborate. Evolve.",
    description: "VAMINT is the student tech community of our college — organizing hackathons, workshops, competitions, and soft-skills events.",
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
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${spaceMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary selection:bg-yellow-primary selection:text-ink">
        {children}
      </body>
    </html>
  );
}
