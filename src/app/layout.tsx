import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import JetstreamAnimation from "@/components/JetstreamAnimation";
import AtmosphericTextures from "@/components/AtmosphericTextures";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://taxjet-website.vercel.app"),
  title: {
    default: "TaxJet | U.S. Expat & International Tax Specialists",
    template: "%s | TaxJet",
  },
  description:
    "TaxJet helps Americans abroad navigate foreign income, overseas assets, and cross-border tax rules with clarity and calm. Expat-focused, full-service, stress-free.",
  keywords: [
    "US expat taxes",
    "international tax services",
    "FBAR reporting",
    "foreign tax credit",
    "Americans abroad taxes",
    "expat tax preparation",
  ],
  authors: [{ name: "TaxJet" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "TaxJet | U.S. Expat & International Tax Specialists",
    description:
      "Foreign income, overseas assets, and cross-border tax rules handled with clarity and calm, for Americans living abroad.",
    url: "https://taxjet-website.vercel.app",
    siteName: "TaxJet",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaxJet | U.S. Expat & International Tax Specialists",
    description:
      "Foreign income, overseas assets, and cross-border tax rules handled with clarity and calm.",
  },
  robots: { index: true, follow: true },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Foreign Earned Income Exclusion?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Foreign Earned Income Exclusion (FEIE) lets eligible U.S. citizens living abroad exclude a portion of their foreign-earned income from U.S. federal taxation each year.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to file an FBAR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You must file an FBAR (FinCEN Form 114) if you have a financial interest in or signature authority over foreign financial accounts whose aggregate value exceeded $10,000 at any point during the calendar year.",
      },
    },
    {
      "@type": "Question",
      name: "What tax forms do expats usually file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Expats commonly file Form 1040, Form 2555 (FEIE) or Form 1116 (Foreign Tax Credit), the FBAR (FinCEN Form 114), and Form 8938 if foreign assets exceed certain thresholds.",
      },
    },
    {
      "@type": "Question",
      name: "How can TaxJet help me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TaxJet provides international tax return preparation, FBAR reporting, foreign tax credit planning, and cross-border tax strategy for Americans living abroad.",
      },
    },
  ],
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "TaxJet",
  description: "U.S. expat and international tax specialists for Americans living abroad.",
  url: "https://taxjet-website.vercel.app",
  areaServed: "Worldwide",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="font-sans antialiased text-ink">
        <AtmosphericTextures />
        <JetstreamAnimation />
        {children}
      </body>
    </html>
  );
}
