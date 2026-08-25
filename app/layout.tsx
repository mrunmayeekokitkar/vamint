import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "VAMINT | Code. Collaborate. Evolve.",
  description: "Official website of VAMINT, the college coding community. Building together, learning together.",
  openGraph: {
    title: "VAMINT | Code. Collaborate. Evolve.",
    description: "Official website of VAMINT, the college coding community. Building together, learning together.",
    type: "website",
    url: "https://vamintcommunity.vercel.app",
    // TODO(content): Add actual logo image
    // images: [{
    //   url: "/og-image.png",
    //   width: 1200,
    //   height: 630,
    //   alt: "VAMINT Logo",
    // }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VAMINT | Code. Collaborate. Evolve.",
    description: "Official website of VAMINT, the college coding community.",
    // TODO(content): Add actual logo image
    // images: ["/og-image.png"],
  },
  // TODO(content): Add favicon
  // icons: {
  //   icon: "/favicon.ico",
  //   apple: "/apple-touch-icon.png",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary selection:bg-mustard-500 selection:text-bg-primary">
        {children}
      </body>
    </html>
  );
}
