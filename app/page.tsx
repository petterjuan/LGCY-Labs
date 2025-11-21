'use client';

import { useEffect } from 'react';
import Hero from "../components/Hero";
import Founder from "../sections/Founder";
import Solutions from "../sections/Solutions";
import Products from "../sections/Products";
import Services from "../sections/Services";
import Trust from "../sections/Trust";
import Contact from "../sections/Contact";

export default function Home() {
  useEffect(() => {
    // Scroll to top on initial page load
    window.scrollTo(0, 0);
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
