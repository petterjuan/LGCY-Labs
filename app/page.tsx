'use client';

import { useEffect } from 'react';
import Hero from "../components/Hero";
import Founder from "../sections/Founder";
import Solutions from "../sections/Solutions";
import Products from "../sections/Products";
import Services from "../sections/Services";
import Trust from "../sections/Trust";
import Contact from "../sections/Contact";

// Disable static generation to ensure useEffect runs
export const dynamic = 'force-dynamic';

export default function Home() {
  useEffect(() => {
    console.log('🚀 SCROLL FIX: Client-side useEffect running');
    
    // Nuclear scroll approach
    const scrollToTop = () => {
      console.log('🎯 SCROLL FIX: Executing scrollToTop, current position:', window.scrollY);
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    // Execute immediately
    scrollToTop();
    
    // Execute multiple times to ensure it works
    [10, 50, 100, 200, 500].forEach(timeout => {
      setTimeout(scrollToTop, timeout);
    });

    // Execute on window load
    window.addEventListener('load', scrollToTop);

    return () => {
      window.removeEventListener('load', scrollToTop);
    };
  }, []);

  return (
    <>
      <Hero />
      <div className="max-w-7xl mx-auto px-6">
        <Founder />
        <Trust />
        <Solutions />
        <Products />
        <Services />
        <Contact />
      </div>
    </>
  );
}
