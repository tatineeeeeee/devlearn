import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header, Footer, BackToTop, WebsiteSchema } from "@/components";
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
  title: {
    default: "DevLearn - Learn Modern Web Development",
    template: "%s | DevLearn",
  },
  description:
    "Free tutorials and guides for learning Next.js, React, Tailwind CSS, TypeScript, and modern web development. Perfect for beginners and experienced developers.",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "TypeScript",
    "JavaScript",
    "Web Development",
    "Tutorials",
    "Programming",
  ],
  authors: [{ name: "DevLearn Team" }],
  metadataBase: new URL("https://devlearn.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devlearn.dev",
    siteName: "DevLearn",
    title: "DevLearn - Learn Modern Web Development",
    description:
      "Free tutorials and guides for learning modern web development.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevLearn - Learn Modern Web Development",
    description:
      "Free tutorials and guides for learning modern web development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <WebsiteSchema />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-[var(--accent-primary)] focus:text-white"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </div>
      </body>
    </html>
  );
}
