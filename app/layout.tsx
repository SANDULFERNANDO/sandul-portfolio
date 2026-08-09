import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const SPLINE_SCENE_URL =
  'https://prod.spline.design/nexbotbyaximoriscopycopy-oduNMXvfp3DrR218y3uecGwc/scene.splinecode';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sandul Fernando – Aspiring Project Manager",
  description:
    "3rd-year BSc Information Technology undergraduate at Rajarata University of Sri Lanka with a strong focus on project management. Combining technical understanding with leadership and structured delivery.",
  keywords: [
    "Sandul Fernando",
    "Project Manager",
    "Sri Lanka",
    "Agile",
    "Scrum",
    "IT undergraduate",
    "portfolio",
  ],
  authors: [{ name: "Sandul Fernando" }],
  creator: "Sandul Fernando",
  openGraph: {
    title: "Sandul Fernando – Aspiring Project Manager",
    description: "Think. Plan. Execute.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload Spline scene before scripts execute */}
        <link rel="preload" href={SPLINE_SCENE_URL} as="fetch" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${orbitron.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
