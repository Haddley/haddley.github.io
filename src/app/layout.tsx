import type { Metadata } from "next";
import { Jost, Kalam } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Layout from "@/components/Layout";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import BlogAgentLoader from "@/components/BlogAgentLoader";

const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

// Handwritten font for callout titles and annotations.
const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-hand",
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
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* eslint-disable @next/next/no-css-tags */}
        {/* Original Mobirise CSS files */}
        <link rel="stylesheet" href="/assets/web/assets/mobirise-icons/mobirise-icons.css" />
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
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${jost.className} ${kalam.variable} antialiased`}>
        {/* The site once registered a service worker that made every page cross-origin isolated (WebLLM needed
            SharedArrayBuffer) and reloaded any page that was not. Nothing needs that now, and it reloaded
            /topics/ forever because the worker never covered it. This removes the worker for visitors who
            still have it installed; the registration and the reload are gone. */}
        <Script id="coi-cleanup" strategy="beforeInteractive">{`
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(function (regs) {
              regs.forEach(function (r) {
                var worker = r.active || r.waiting || r.installing;
                if (worker && worker.scriptURL.indexOf('/coi-serviceworker.js') !== -1) r.unregister();
              });
            });
          }
        `}</Script>
        <Layout>{children}</Layout>
        <BlogAgentLoader />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}