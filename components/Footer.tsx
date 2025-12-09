import Link from "next/link";
import { Shield, CheckCircle, Award, Lock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="border-t border-b border-gray-700 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Shield className="w-10 h-10 text-green-400" />
              <div>
                <div className="font-bold text-white">Fortune 500 Proven</div>
                <div className="text-sm text-gray-400">NetApp Enterprise Grade</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="w-10 h-10 text-blue-400" />
              <div>
                <div className="font-bold text-white">99.4% Test Coverage</div>
                <div className="text-sm text-gray-400">Production Ready Systems</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Award className="w-10 h-10 text-yellow-400" />
              <div>
                <div className="font-bold text-white">60+ Deployments</div>
                <div className="text-sm text-gray-400">8x Average ROAS</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Lock className="w-10 h-10 text-purple-400" />
              <div>
                <div className="font-bold text-white">Secure Payments</div>
                <div className="text-sm text-gray-400">5 Payment Methods</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white shadow-lg">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="font-bold text-xl">LGCY Labs</div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Building resilient, agentic AI systems that grow revenue and reduce operational risk.
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span>Ex-NetApp Engineer</span>
              </div>
              <div className="flex items-center gap-2 text-blue-400">
                <CheckCircle className="w-4 h-4" />
                <span>Fortune 500 Proven</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-400">
                <CheckCircle className="w-4 h-4" />
                <span>\$1M+ Failures Handled</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Solutions</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a className="hover:text-white transition-colors flex items-center gap-2" href="#solutions">
                  <span className="text-blue-400">→</span>
                  Reliability Engineering
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors flex items-center gap-2" href="#solutions">
                  <span className="text-green-400">→</span>
                  Revenue-Focused AI
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors flex items-center gap-2" href="#solutions">
                  <span className="text-purple-400">→</span>
                  Scalable Architecture
                </a>
              </li>
              <li>
                <Link className="hover:text-white transition-colors flex items-center gap-2 font-semibold" href="/arf">
                  <span className="text-orange-400">🔥</span>
                  <span className="text-orange-400">ARF Framework</span>
                  <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">NEW</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Services</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a className="hover:text-white transition-colors flex items-center gap-2" href="#services">
                  <span className="text-green-400">\$7.5K</span>
                  Technical Audit
                  <span className="text-xs text-yellow-400">⭐</span>
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors flex items-center gap-2" href="#services">
                  <span className="text-blue-400">\$47.5K</span>
                  AI Implementation
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors flex items-center gap-2" href="#services">
                  <span className="text-purple-400">\$12.5K/mo</span>
                  Fractional CTO
                </a>
              </li>
              <li>
                <Link className="hover:text-white transition-colors flex items-center gap-2" href="/payments">
                  <span className="text-orange-400">→</span>
                  Payment Options
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Connect</h4>
            <ul className="space-y-3 text-gray-400 mb-6">
              <li>
                <a 
                  className="hover:text-white transition-colors flex items-center gap-2" 
                  href="https://linkedin.com/in/petterjuan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-blue-400">→</span>
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  className="hover:text-white transition-colors flex items-center gap-2" 
                  href="https://github.com/petterjuan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-gray-400">→</span>
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  className="hover:text-white transition-colors flex items-center gap-2" 
                  href="https://huggingface.co/petterjuan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-yellow-400">→</span>
                  Hugging Face
                </a>
              </li>
            </ul>

            <h4 className="font-bold text-sm mb-3 text-gray-300">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a className="hover:text-white transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Terms of Service</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} LGCY Labs. Building agentic systems, reliably.
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-green-500" />
                <span>Secure Checkout</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-blue-500" />
                <span>90-Day Guarantee</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-purple-500" />
                <span>Enterprise Grade</span>
              </div>
            </div>

            <div className="text-sm">
              <a 
                href="mailto:petter2025us@outlook.com" 
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                petter2025us@outlook.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}