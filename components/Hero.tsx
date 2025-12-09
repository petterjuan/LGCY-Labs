"use client";

import { useState, useEffect } from "react";
import CTAButton from "./CTAButton";
import { TrendingUp, Shield, Zap, Users } from "lucide-react";

export default function Hero() {
  const [spotsLeft, setSpotsLeft] = useState(3);
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsUrgent(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-blue-700 to-secondary text-white py-24 md:py-32">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(30,64,175,0.3),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* SOCIAL PROOF + SCARCITY */}
        <div className="flex items-center justify-center mb-8">
          <div className={`inline-flex items-center gap-3 px-6 py-3 bg-red-500/20 backdrop-blur-md border border-red-400/30 rounded-full \${isUrgent ? 'animate-pulse' : ''}`}>
            <div className="flex -space-x-2">
              {[1,2,3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-white flex items-center justify-center text-xs font-bold">
                  {i}
                </div>
              ))}
            </div>
            <span className="text-sm font-bold">
              <span className="text-yellow-300">{spotsLeft} implementation spots</span> claimed this week
            </span>
          </div>
        </div>

        <div className="text-center max-w-5xl mx-auto">
          {/* AUTHORITY BADGES */}
          <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20">
              <Shield className="w-4 h-4 text-green-300" />
              <span className="text-sm font-semibold text-green-300">Ex-NetApp Reliability Engineer</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20">
              <Users className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-semibold text-blue-300">Fortune 500 Proven</span>
            </div>
          </div>

          {/* BENEFIT-DRIVEN HEADLINE */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6">
            <span className="block">Recover 15-30% of</span>
            <span className="block text-yellow-300">
              Leaked Revenue
            </span>
            <span className="block">with Self-Healing AI</span>
          </h1>

          {/* FEAR + SOLUTION */}
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-blue-100 leading-relaxed">
            <span className="font-bold text-red-300">Most AI automation fails silently</span>, costing you customers and revenue. 
            We build <span className="font-bold text-green-300">bulletproof agentic AI</span> that not only prevents catastrophic failures — 
            it actively <span className="font-bold text-yellow-300">identifies and captures missed revenue opportunities 24/7</span>.
          </p>

          {/* SPECIFIC BENEFITS */}
          <div className="mt-8 max-w-2xl mx-auto grid gap-3">
            <div className="flex items-start gap-3 text-left bg-white/5 backdrop-blur px-5 py-3 rounded-lg border border-white/10">
              <span className="text-green-400 text-xl flex-shrink-0 mt-1">✓</span>
              <span className="text-blue-100">
                <span className="font-bold text-white">Prevent system failures</span> before they impact customers (2-min MTTR vs 45-min manual)
              </span>
            </div>
            
            <div className="flex items-start gap-3 text-left bg-white/5 backdrop-blur px-5 py-3 rounded-lg border border-white/10">
              <span className="text-green-400 text-xl flex-shrink-0 mt-1">✓</span>
              <span className="text-blue-100">
                <span className="font-bold text-white">Automatically recover 99.9%</span> of abandoned carts and leads (\$124K+ saved per incident)
              </span>
            </div>
            
            <div className="flex items-start gap-3 text-left bg-white/5 backdrop-blur px-5 py-3 rounded-lg border border-white/10">
              <span className="text-green-400 text-xl flex-shrink-0 mt-1">✓</span>
              <span className="text-blue-100">
                <span className="font-bold text-white">Deploy revenue-generating AI</span> in weeks, not months (4-6 week turnkey)
              </span>
            </div>
          </div>

          {/* RISK REVERSAL CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <CTAButton href="#contact" variant="solid">
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Get Free Revenue Analysis
              </span>
            </CTAButton>
            
            <CTAButton href="#solutions" variant="outline">
              <span className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                See 8x ROI Case Studies
              </span>
            </CTAButton>
          </div>

          {/* URGENCY */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <p className="text-sm font-semibold">
              <span className="text-red-300">Only {spotsLeft} technical audit spots</span> available this week — 
              <span className="text-yellow-300 ml-1">Book yours now</span>
            </p>
          </div>

          {/* AUTHORITY - RESULTS */}
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-300">8x</div>
              <div className="text-sm text-blue-200">Average ROAS</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-300">99.9%</div>
              <div className="text-sm text-blue-200">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-300">\$1M+</div>
              <div className="text-sm text-blue-200">Failures Handled</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}