import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Awesome Hardware Test",
  description: "Curated list of tested hardware components with benchmarks and reviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-zinc-900">
      <body
        className={`${inter.variable} antialiased bg-zinc-900 min-h-screen text-zinc-100`}
      >
        {children}
      </body>
    </html>
  );
}