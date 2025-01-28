import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "piclo",
  description: "Find a better way to explore, travel and share your experiences!",
  metadataBase: new URL('https://piclo.app'),
  openGraph: {
    title: 'piclo',
    description: "Find a better way to explore, travel and share your experiences!",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'piclo'
      }
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="logo.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
