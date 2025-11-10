"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const nav = [
    { href: "#founder", label: "Founder" },
    { href: "#solutions", label: "Solutions" },
    { href: "#products", label: "Products" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <Link href="/" className="font-semibold text-lg">
              LGCY Labs
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-gray-600 hover:text-primary transition">
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-4 bg-primary text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Build With Us
            </a>
          </nav>

          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((s) => !s)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {open ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-3">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded">
                  {n.label}
                </a>
              ))}
              <a href="#contact" className="block px-3 py-2 bg-primary text-white rounded">
                Build With Us
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
