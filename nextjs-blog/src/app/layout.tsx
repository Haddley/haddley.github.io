import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";

const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Neil Haddley - Developer & Technical Consultant",
  description: "I help organizations to connect with clients, comply with regulations, and automate workflows.",
  keywords: "developer, consultant, Azure, Angular, Business Central, automation",
  authors: [{ name: "Neil Haddley" }],
  creator: "Neil Haddley",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://haddley.github.io",
    title: "Neil Haddley - Developer & Technical Consultant",
    description: "I help organizations to connect with clients, comply with regulations, and automate workflows.",
    siteName: "Neil Haddley",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neil Haddley - Developer & Technical Consultant",
    description: "I help organizations to connect with clients, comply with regulations, and automate workflows.",
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
        {/* eslint-disable @next/next/no-css-tags */}
        {/* Original Mobirise CSS files */}
        <link rel="stylesheet" href="/assets/web/assets/mobirise-icons2/mobirise2.css" />
        <link rel="stylesheet" href="/assets/web/assets/mobirise-icons-bold/mobirise-icons-bold.css" />
        <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap-grid.min.css" />
        <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap-reboot.min.css" />
        <link rel="stylesheet" href="/assets/dropdown/css/style.css" />
        <link rel="stylesheet" href="/assets/socicon/css/styles.css" />
        <link rel="stylesheet" href="/assets/theme/css/style.css" />
        <link rel="stylesheet" href="/assets/mobirise/css/mbr-additional.css" />
        <link rel="stylesheet" href="/prism.css" />
        {/* eslint-enable @next/next/no-css-tags */}
      </head>
      <body className={`${jost.className} antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}