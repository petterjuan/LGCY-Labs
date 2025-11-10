import "./styles/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const metadata: Metadata = {
  title: "LGCY Labs — Agentic Reliability & Revenue AI",
  description:
    "LGCY Labs crafts agentic AI systems that fuse enterprise reliability engineering with revenue-driven automation. Founded by Juan Petter.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "LGCY Labs — Agentic Reliability & Revenue AI",
    description:
      "Agentic AI systems that combine reliability engineering with revenue-driving automation.",
    url: SITE_URL,
    siteName: "LGCY Labs",
    images: ["/images/og-image.svg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LGCY Labs — Agentic Reliability & Revenue AI",
    description:
      "Agentic AI systems that combine reliability engineering with revenue-driving automation.",
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

        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
