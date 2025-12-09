import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Zap, TrendingUp, Shield, Code2, Clock, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Agentic Reliability Framework | LGCY Labs',
  description: 'Multi-agent AI that self-heals production failures in 2 minutes. Built with Fortune 500 reliability patterns.',
  openGraph: {
    title: 'Agentic Reliability Framework | LGCY Labs',
    description: 'Multi-agent AI that self-heals production failures in 2 minutes.',
    type: 'website',
  },
};

export default function ARFPage() {
  return (
    <main className="min-h-screen bg-neutral">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-purple-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-bold">
              OPEN SOURCE
            </span>
            <span className="px-4 py-2 bg-red-500 rounded-full text-sm font-bold animate-pulse">
              🔥 TRENDING ON HACKER NEWS
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Agentic Reliability<br/>Framework
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl">
            Fortune 500-grade multi-agent AI that self-heals production failures 
            in 2 minutes (vs 45-minute manual response)
          </p>
          
          <div className="flex flex-wrap gap-4 mb-12">
            <a 
              href="https://huggingface.co/spaces/petter2025/agentic-reliability-framework"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl"
            >
              <Zap className="w-5 h-5" />
              Try Live Demo →
            </a>
            <a 
              href="https://github.com/petterjuan/agentic-reliability-framework"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur border-2 border-white hover:bg-white/20 transition rounded-lg font-bold"
            >
              <Code2 className="w-5 h-5" />
              View GitHub
            </a>
            <Link 
              href="/payments?service=arf_implementation"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition rounded-lg font-bold shadow-xl"
            >
              <DollarSign className="w-5 h-5" />
              Book Implementation
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span>30+ GitHub stars</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>99.4% test coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Fortune 500 grade</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* The Problem */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            The \$125,000 Problem
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Every production incident without automation costs this much
          </p>
          
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200">
              <div className="text-4xl mb-3">⚠️</div>
              <div className="text-sm text-gray-500 mb-2">2:00 AM</div>
              <div className="font-semibold text-gray-900">Production fails</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200">
              <div className="text-4xl mb-3">🔔</div>
              <div className="text-sm text-gray-500 mb-2">2:05 AM</div>
              <div className="font-semibold text-gray-900">Alert fires</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200">
              <div className="text-4xl mb-3">🔧</div>
              <div className="text-sm text-gray-500 mb-2">2:45 AM</div>
              <div className="font-semibold text-gray-900">Engineer fixes</div>
            </div>
            
            <div className="bg-red-50 border-2 border-red-500 p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-3">💸</div>
              <div className="text-sm text-red-600 font-semibold mb-2">Impact</div>
              <div className="font-bold text-red-600 text-xl">\$125K lost</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* The Solution */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            The ARF Solution
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            Three specialized AI agents working in concert
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg border border-blue-200">
              <div className="text-5xl mb-4">🕵️</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Detective Agent</h3>
              <p className="text-gray-700 mb-4">
                Detects anomalies in milliseconds using FAISS vector memory 
                to recall similar past incidents
              </p>
              <div className="bg-blue-100 border border-blue-300 p-3 rounded-lg text-sm font-mono text-gray-800">
                "We've seen this before. Last time it was the DB pool."
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl shadow-lg border border-purple-200">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Diagnostician Agent</h3>
              <p className="text-gray-700 mb-4">
                Performs root cause analysis with causal reasoning and 
                evidence correlation
              </p>
              <div className="bg-purple-100 border border-purple-300 p-3 rounded-lg text-sm font-mono text-gray-800">
                "CPU steady, memory climbing. Request handler leak."
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-lg border border-green-200">
              <div className="text-5xl mb-4">🔮</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Predictive Agent</h3>
              <p className="text-gray-700 mb-4">
                Forecasts failures 15 minutes ahead with time-series analysis 
                and risk assessment
              </p>
              <div className="bg-green-100 border border-green-300 p-3 rounded-lg text-sm font-mono text-gray-800">
                "At current rate, critical in 12min. Scale now."
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Results */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Real Results
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200">
              <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-4xl font-bold text-green-600 mb-2">2 min</div>
              <div className="text-sm text-gray-600 mb-1">Mean Time To Recovery</div>
              <div className="text-xs text-green-600 font-semibold">vs 45 min manual</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-4xl font-bold text-blue-600 mb-2">15-30%</div>
              <div className="text-sm text-gray-600 mb-1">Revenue Recovery</div>
              <div className="text-xs text-blue-600 font-semibold">Automated leak detection</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200">
              <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-4xl font-bold text-purple-600 mb-2">99.4%</div>
              <div className="text-sm text-gray-600 mb-1">Test Coverage</div>
              <div className="text-xs text-purple-600 font-semibold">157/158 tests passing</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200">
              <Code2 className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <div className="text-4xl font-bold text-orange-600 mb-2">42K</div>
              <div className="text-sm text-gray-600 mb-1">Documentation Words</div>
              <div className="text-xs text-orange-600 font-semibold">Enterprise-grade</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Professional Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Professional Implementation
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            Need this deployed in your infrastructure?
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Technical Audit */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Technical Audit</h3>
              <div className="text-4xl font-bold text-primary mb-6">\$7,500</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">1-week assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Infrastructure analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Custom recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">ROI projections</span>
                </li>
              </ul>
              <Link 
                href="/payments?service=arf_audit"
                className="block w-full py-3 px-6 bg-primary hover:bg-blue-800 text-white font-semibold rounded-lg text-center transition"
              >
                Book Discovery Call
              </Link>
            </div>
            
            {/* Full Implementation */}
            <div className="bg-gradient-to-br from-primary to-secondary text-white p-8 rounded-xl shadow-2xl transform scale-105 border-4 border-accent relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="inline-block px-4 py-2 bg-accent text-gray-900 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2 mt-4">Full Implementation</h3>
              <div className="text-4xl font-bold mb-6">\$47,500</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>4-6 week deployment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Custom integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Team training</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>3 months support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>90-day ROI guarantee</span>
                </li>
              </ul>
              <Link 
                href="/payments?service=arf_implementation"
                className="block w-full py-3 px-6 bg-white text-primary hover:bg-gray-100 font-semibold rounded-lg text-center transition"
              >
                Schedule Implementation
              </Link>
            </div>
            
            {/* Fractional Leadership */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Fractional AI Leadership</h3>
              <div className="text-4xl font-bold text-purple-600 mb-6">\$12.5K/mo</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Weekly strategy sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Team mentoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Architecture reviews</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Ongoing optimization</span>
                </li>
              </ul>
              <Link 
                href="/payments?service=fractional_ai"
                className="block w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg text-center transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Eliminate Production Firefighting?
          </h2>
          <p className="text-xl mb-12 text-blue-100">
            Join companies recovering 15-30% revenue through automated reliability
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="https://huggingface.co/spaces/petter2025/agentic-reliability-framework"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-blue-50 transition-all shadow-xl text-lg"
            >
              <Zap className="w-5 h-5" />
              Try Live Demo →
            </a>
            <Link 
              href="/payments?service=arf_implementation"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition shadow-xl text-lg"
            >
              <DollarSign className="w-5 h-5" />
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
