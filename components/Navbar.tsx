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
    { href: "/payments", label: "Payments" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <Link href="/" className="font-semibold text-lg text-gray-900">
              LGCY Labs
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n) => (
              n.href.startsWith('#') ? (
                <a key={n.href} href={n.href} className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium">
                  {n.label}
                </a>
              ) : (
                <Link key={n.href} href={n.href} className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium">
                  {n.label}
                </Link>
              )
            ))}
            <a
              href="#contact"
              className="ml-4 bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200 hover:shadow-lg font-semibold"
            >
              Build With Us
            </a>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="p-2">
              <div className="w-6 h-6 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-gray-600 transition-all ${open ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                <span className={`w-full h-0.5 bg-gray-600 transition-all ${open ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-gray-600 transition-all ${open ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-3">
              {nav.map((n) => (
                n.href.startsWith('#') ? (
                  <a key={n.href} href={n.href} className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-primary rounded transition-colors font-medium">
                    {n.label}
                  </a>
                ) : (
                  <Link key={n.href} href={n.href} className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-primary rounded transition-colors font-medium">
                    {n.label}
                  </Link>
                )
              ))}
              <a href="#contact" className="block px-3 py-2.5 bg-primary text-white rounded font-semibold hover:bg-blue-700 transition-colors">
                Build With Us
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
