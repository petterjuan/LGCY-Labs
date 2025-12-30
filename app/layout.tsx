import "./styles/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollRestoration from "../components/ScrollRestoration";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lgcylabs.vercel.app";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const metadata: Metadata = {
  title: "LGCY Labs — Stop Revenue Leaks with Self-Healing AI Systems",
  description: "Enterprise-grade AI systems that prevent revenue leaks and generate predictable growth. Fortune 500 reliability meets revenue-focused automation.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "LGCY Labs — Stop Revenue Leaks with Self-Healing AI Systems",
    description: "Enterprise-grade AI systems that prevent revenue leaks and generate predictable growth.",
    url: SITE_URL,
    siteName: "LGCY Labs",
    images: ["/images/og-image.svg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LGCY Labs — Stop Revenue Leaks with Self-Healing AI Systems",
    description: "Enterprise-grade AI systems that prevent revenue leaks and generate predictable growth.",
    images: ["/images/og-image.svg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral text-gray-800">
        {/* Google Analytics scripts inserted with Next Script to avoid head hydration mismatches */}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_ID}', { page_path: window.location.pathname });`}
            </Script>
          </>
        )}

        <ScrollRestoration />
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
