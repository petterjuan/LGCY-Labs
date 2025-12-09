"use client";

import { useState } from "react";
import { CheckCircle, Clock, TrendingUp, Mail, Calendar } from "lucide-react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleQuickCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full mb-4">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <span className="text-sm font-bold">2 Technical Audit Spots Left This Week</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get Your Free Revenue Analysis
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover where you're leaking 15-30% of potential revenue. 
            <span className="font-bold text-primary"> Qualified leads get a free 30-minute technical audit with Juan</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-primary">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Fast Track: Email Only
              </h3>
              <p className="text-gray-600">
                Get instant access to our Revenue Leak Assessment Tool
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleQuickCapture} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-gray-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Get Free Assessment
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-gray-500">
                  ✅ No credit card required • ✅ Instant access • ✅ Unsubscribe anytime
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email!</h3>
                <p className="text-gray-600">
                  We sent your Revenue Leak Assessment Tool to <span className="font-semibold">{email}</span>
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  Takes 5 minutes. Discover where you're losing \$50K-\$250K/year.
                </p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="font-bold text-gray-900">60+</div>
                <div className="text-gray-600 text-xs">Audits Done</div>
              </div>
              <div>
                <div className="font-bold text-gray-900">\$1.2M+</div>
                <div className="text-gray-600 text-xs">Avg Found</div>
              </div>
              <div>
                <div className="font-bold text-gray-900">5 min</div>
                <div className="text-gray-600 text-xs">To Complete</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:border-primary transition-all hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    Book 30-Min Technical Call
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Talk directly with Juan. Discuss your challenges, get immediate insights.
                  </p>
                  <a
                    href="https://calendly.com/petter2025us/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-800 transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule Now
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:border-green-600 transition-all hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    Email Directly
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Send details about your project. Get a response within 24 hours.
                  </p>
                  <a
                    href="mailto:petter2025us@outlook.com?subject=Revenue%20Analysis%20Request"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    Send Email
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:border-blue-600 transition-all hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    Message on LinkedIn
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Connect and message directly. I respond within hours.
                  </p>
                  <a
                    href="https://linkedin.com/in/petterjuan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                    Connect Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Clock className="w-10 h-10 text-blue-600" />
              <div>
                <div className="font-bold text-gray-900">Response Time</div>
                <div className="text-sm text-gray-600">Usually within 4 hours</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="w-10 h-10 text-green-600" />
              <div>
                <div className="font-bold text-gray-900">No Sales Pitch</div>
                <div className="text-sm text-gray-600">Honest technical assessment</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <TrendingUp className="w-10 h-10 text-purple-600" />
              <div>
                <div className="font-bold text-gray-900">Free Insights</div>
                <div className="text-sm text-gray-600">Value even if we don't work together</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}