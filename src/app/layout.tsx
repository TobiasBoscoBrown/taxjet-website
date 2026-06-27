import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import JetstreamAnimation from "@/components/JetstreamAnimation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaxJet | U.S. Expat & International Tax Specialists",
  description: "We help Americans worldwide navigate foreign income, overseas assets, and cross-border tax issues quickly, clearly, and without turbulence.",
  keywords: ["US expat taxes", "international tax services", "FBAR reporting", "foreign tax credit", "Americans abroad taxes", "expat tax preparation"],
  authors: [{ name: "TaxJet" }],
  openGraph: {
    title: "TaxJet | U.S. Expat & International Tax Specialists",
    description: "We help Americans worldwide navigate foreign income, overseas assets, and cross-border tax issues quickly, clearly, and without turbulence.",
    url: "https://taxjet-website.vercel.app",
    siteName: "TaxJet",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaxJet | U.S. Expat & International Tax Specialists",
    description: "We help Americans worldwide navigate foreign income, overseas assets, and cross-border tax issues quickly, clearly, and without turbulence.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Foreign Earned Income Exclusion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Foreign Earned Income Exclusion (FEIE) allows eligible U.S. citizens living abroad to exclude up to $126,500 (for 2024) of their foreign-earned income from U.S. federal taxation."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to file FBAR?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You must file FBAR (FinCEN Form 114) if you have a financial interest in or signature authority over foreign financial accounts whose aggregate value exceeded $10,000 at any point during the calendar year."
      }
    },
    {
      "@type": "Question",
      "name": "What tax forms do expats need to file?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Expats typically need to file Form 1040, Form 2555 (for FEIE) or Form 1116 (for Foreign Tax Credit), FBAR (FinCEN Form 114), and potentially Form 8938 if assets exceed certain thresholds."
      }
    },
    {
      "@type": "Question",
      "name": "How can TaxJet help me?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TaxJet provides comprehensive international tax services including tax return preparation, FBAR reporting, foreign tax credit optimization, and cross-border tax planning for Americans living abroad."
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className={inter.className}>
        <JetstreamAnimation />
        {children}
      </body>
    </html>
  );
}
