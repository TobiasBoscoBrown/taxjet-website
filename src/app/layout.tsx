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
      acceptedAnswer: { "@type": "Answer", text: "The FEIE lets eligible U.S. citizens living abroad exclude a portion of their foreign earned income from U.S. federal taxation each year if they meet the Bona Fide Residence or Physical Presence test." },
    },
    {
      "@type": "Question",
      name: "Do I need to file an FBAR?",
      acceptedAnswer: { "@type": "Answer", text: "File an FBAR (FinCEN Form 114) if the total value of your foreign financial accounts exceeded $10,000 at any point during the calendar year." },
    },
    {
      "@type": "Question",
      name: "Do I need to report foreign assets if I work in the U.S.?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Foreign assets may need to be reported using the FBAR and Form 8938. For 2025, unmarried individuals report assets over $50,000 at year end or $75,000 at any time; married filing jointly over $100,000 at year end or $150,000 at any time." },
    },
    {
      "@type": "Question",
      name: "What is a foreign tax credit and how do I claim it?",
      acceptedAnswer: { "@type": "Answer", text: "A foreign tax credit reduces your U.S. tax liability by the amount of foreign taxes paid. You claim it by filing Form 1116 with your U.S. return." },
    },
    {
      "@type": "Question",
      name: "How do I report foreign income on my U.S. tax return?",
      acceptedAnswer: { "@type": "Answer", text: "Report all foreign income on your U.S. return using forms like the 1040 and, where required, Form 8938." },
    },
    {
      "@type": "Question",
      name: "What is a tax treaty?",
      acceptedAnswer: { "@type": "Answer", text: "Tax treaties can reduce or eliminate double taxation on income earned in treaty countries. You claim benefits with the appropriate W-8 form and Form 8833, depending on your situation." },
    },
    {
      "@type": "Question",
      name: "What is the expatriation tax and how do I report it?",
      acceptedAnswer: { "@type": "Answer", text: "The expatriation tax applies to individuals who renounce U.S. citizenship or long-term residency, based on the net unrealized gain on all property. You report it on Form 8854." },
    },
    {
      "@type": "Question",
      name: "I have lived abroad for years and never filed. What now?",
      acceptedAnswer: { "@type": "Answer", text: "You can use the Streamlined Foreign Offshore Procedure to catch up on filings without facing penalties. Unused foreign tax credits can be carried forward up to 10 years or carried back." },
    },
    {
      "@type": "Question",
      name: "What is the Foreign Housing Exclusion?",
      acceptedAnswer: { "@type": "Answer", text: "It lets you exclude certain housing expenses from your taxable income if you live abroad and qualify for the FEIE." },
    },
    {
      "@type": "Question",
      name: "Do I need to report foreign gifts?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, above certain thresholds. For 2025, report gifts over $100,000 from a nonresident alien or foreign estate, or over about $20,116 from foreign corporations or partnerships." },
    },
    {
      "@type": "Question",
      name: "Do I pay U.S. taxes on foreign rental income?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. You must report and pay U.S. taxes on foreign rental income." },
    },
    {
      "@type": "Question",
      name: "How do I report foreign pensions?",
      acceptedAnswer: { "@type": "Answer", text: "Report foreign pensions as income on your U.S. return. You may be eligible for a foreign tax credit." },
    },
    {
      "@type": "Question",
      name: "What is the difference between a tax resident and a non-resident alien?",
      acceptedAnswer: { "@type": "Answer", text: "A tax resident is taxed on worldwide income, while a non-resident alien is taxed only on U.S. source income." },
    }
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
