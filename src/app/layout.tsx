import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaxJet | U.S. Expat & International Tax Specialists",
  description: "We help Americans worldwide navigate foreign income, overseas assets, and cross-border tax issues quickly, clearly, and without turbulence.",
  keywords: ["US expat taxes", "international tax services", "FBAR reporting", "foreign tax credit", "Americans abroad taxes", "expat tax preparation"],
  authors: [{ name: "TaxJet" }],
  openGraph: {
    title: "TaxJet | U.S. Expat & International Tax Specialists",
    description: "We help Americans worldwide navigate foreign income, overseas assets, and cross-border tax issues quickly, clearly, and without turbulence.",
    url: "https://taxjet.co",
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
