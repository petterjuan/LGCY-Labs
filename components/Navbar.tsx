"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Zap, Menu, X, TrendingUp } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUrgencyBar, setShowUrgencyBar] = useState(true);

  // Track scroll for enhanced shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nav = [
    { href: "#founder", label: "Founder" },
    { href: "#solutions", label: "Solutions" },
    { href: "#products", label: "Products" },
    { href: "#services", label: "Services" },
    { 
      href: "/arf", 
      label: "ARF", 
      isNew: true,
      isTrending: true,
      badge: "🔥 NEW"
    },
    { href: "/audit", label: "Audit" },
    { href: "/payments", label: "Payments" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <>
      {/* URGENCY BAR - Psychological Trigger #1 */}
      {showUrgencyBar && (
        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white py-2 px-4 text-center text-sm font-semibold relative animate-pulse">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>
              🔥 <strong>Trending on Hacker News NOW</strong> • ARF just launched • 
              <Link href="/arf" className="underline ml-1 hover:text-yellow-200">
                View Live Demo →
              </Link>
            </span>
            <button
              onClick={() => setShowUrgencyBar(false)}
              className="absolute right-4 text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* MAIN NAVBAR */}
      <header 
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b transition-shadow duration-300 \${
          scrolled ? 'shadow-lg border-gray-300' : 'shadow-sm border-gray-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* LOGO - Enhanced with Lightning Icon */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-md hover:shadow-lg transition-shadow">
                <Zap className="w-6 h-6" />
              </div>
              <Link 
                href="/" 
                className="font-bold text-lg text-gray-900 hover:text-primary transition-colors"
              >
                LGCY Labs
              </Link>
            </div>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden md:flex items-center gap-6">
              {nav.map((n) => {
                const NavLink = n.href.startsWith('#') ? 'a' : Link;
                
                return (
                  <NavLink
                    key={n.href}
                    href={n.href}
                    className={`relative group transition-colors duration-200 font-medium \${
                      n.isNew 
                        ? 'text-primary font-bold' 
                        : 'text-gray-600 hover:text-primary'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {n.label}
                      
                      {/* NEW BADGE - Psychological Trigger #2 (FOMO) */}
                      {n.isNew && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full animate-pulse font-bold">
                          NEW
                        </span>
                      )}
                      
                      {/* TRENDING INDICATOR - Psychological Trigger #3 (Social Proof) */}
                      {n.isTrending && (
                        <span className="text-orange-500 animate-bounce">
                          🔥
                        </span>
                      )}
                    </span>
                    
                    {/* Hover underline effect */}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                  </NavLink>
                );
              })}

              {/* PRIMARY CTA - Enhanced with urgency */}
              <a
                href="#contact"
                className="ml-4 relative bg-gradient-to-r from-primary to-secondary text-white px-6 py-2.5 rounded-lg font-bold transition-all duration-200 hover:shadow-xl hover:scale-105 group overflow-hidden"
              >
                <span className="relative z-10">Build With Us</span>
                
                {/* Subtle urgency indicator */}
                <span className="absolute top-0 right-0 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                </span>
              </a>
            </nav>

            {/* MOBILE MENU BUTTON */}
            <div className="md:hidden">
              <button 
                onClick={() => setOpen(!open)} 
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {open ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}
          {open && (
            <div className="md:hidden pb-4 animate-fadeIn">
              <div className="flex flex-col gap-2">
                {nav.map((n) => {
                  const NavLink = n.href.startsWith('#') ? 'a' : Link;
                  
                  return (
                    <NavLink
                      key={n.href}
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all font-medium \${
                        n.isNew
                          ? 'bg-blue-50 text-primary font-bold border-2 border-primary'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {n.label}
                        {n.isTrending && <span>🔥</span>}
                      </span>
                      
                      {n.isNew && (
                        <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-bold animate-pulse">
                          NEW
                        </span>
                      )}
                    </NavLink>
                  );
                })}

                {/* MOBILE CTA */}
                <a 
                  href="#contact" 
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 mt-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  <Zap className="w-4 h-4" />
                  Build With Us
                </a>

                {/* MOBILE ARF HIGHLIGHT */}
                <div className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-primary">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🚀</span>
                    <span className="font-bold text-primary">Just Launched!</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    Agentic Reliability Framework - Self-healing AI now trending on Hacker News
                  </p>
                  <Link
                    href="/arf"
                    onClick={() => setOpen(false)}
                    className="block text-center bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View Demo →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
