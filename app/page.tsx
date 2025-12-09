'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Zap, TrendingUp, Clock } from 'lucide-react';

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
      
      {/* ARF Showcase Section - NEW */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-full animate-pulse">
              🔥 NEW
            </span>
            <span className="px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-full">
              TRENDING ON HN
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Agentic Reliability Framework
              </h2>
              
              <p className="text-xl text-gray-700 mb-6">
                Multi-agent AI that self-heals production failures in 2 minutes 
                (vs 45-minute manual response)
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="text-3xl font-bold text-primary">95%</div>
                  <div className="text-sm text-gray-600">Faster</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="text-3xl font-bold text-green-600">2min</div>
                  <div className="text-sm text-gray-600">MTTR</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="text-3xl font-bold text-purple-600">15-30%</div>
                  <div className="text-sm text-gray-600">Revenue</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://huggingface.co/spaces/petter2025/agentic-reliability-framework"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-blue-800 text-white font-semibold rounded-lg transition shadow-lg"
                >
                  <Zap className="w-5 h-5" />
                  Try Live Demo →
                </a>
                <Link 
                  href="/arf"
                  className="px-6 py-3 bg-white hover:bg-gray-50 text-primary font-semibold rounded-lg transition border-2 border-primary"
                >
                  Learn More
                </Link>
                <a 
                  href="https://news.ycombinator.com/item?id=46207273"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition"
                >
                  🔥 HN Discussion
                </a>
              </div>
            </div>
            
            {/* Right: Visual */}
            <div className="relative">
              <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-sm text-gray-600">Production Incident</span>
                </div>
                
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">🕵️</span>
                    <div>
                      <div className="text-gray-500 text-xs">Detective Agent</div>
                      <div className="text-gray-800">Anomaly detected: Latency spike 450ms</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">🔍</span>
                    <div>
                      <div className="text-gray-500 text-xs">Diagnostician Agent</div>
                      <div className="text-gray-800">Root cause: DB connection pool exhausted</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">🔮</span>
                    <div>
                      <div className="text-gray-500 text-xs">Predictive Agent</div>
                      <div className="text-gray-800">Forecasting: Critical in 12 minutes</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                    <div className="text-green-700 font-semibold">✅ Self-healed in 2 minutes</div>
                    <div className="text-green-600 text-xs">Revenue saved: \$124,167</div>
                  </div>
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                <div className="text-xs text-gray-500">Open Source</div>
                <div className="text-lg font-bold">⭐ 30+</div>
              </div>
            </div>
          </div>
          
          {/* Tech stack badges */}
          <div className="mt-8 flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Python 3.12</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">FAISS</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Multi-Agent</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">99.4% Tests</span>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">Fortune 500 Grade</span>
          </div>
        </div>
      </section>
      
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
