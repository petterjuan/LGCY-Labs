'use client';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: string, message: string} | null>(null);

  const trackConversion = (type: string) => {
    // Track in Vercel Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', type, {
        event_category: 'conversion',
        event_label: 'contact_form',
        value: 1
      });
    }
    
    // Log for debugging
    console.log(`📈 Conversion tracked: ${type}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Track successful conversion
        trackConversion('contact_form_success');
        setSubmitStatus({ type: 'success', message: 'Message sent successfully! I will get back to you within 24 hours.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        trackConversion('contact_form_error');
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const trackCalendlyClick = () => {
    trackConversion('calendly_booking_click');
    window.open('https://calendly.com/petter2025us/30min', '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Stop Leaving Revenue on the Table
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          While you're reading this, your current systems are likely missing revenue opportunities. Book a free revenue gap analysis to identify your biggest automation leaks and exact path to recovery.
        </p>
        
        {/* Primary CTA - Calendly Booking */}
        <div className="mb-16 p-8 bg-white rounded-2xl shadow-lg border border-green-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            🚀 Free Revenue Gap Analysis (Limited Availability)
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get a customized 30-minute session where we'll identify your top 3 revenue leaks and map your quickest path to AI automation.
          </p>
          <button 
            onClick={trackCalendlyClick}
            className="bg-green-600 text-white py-4 px-8 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg shadow-lg hover:shadow-xl"
          >
            Book Your Free Session Now
          </button>
          <p className="text-sm text-gray-500 mt-3">
            Only 3 spots available this month • 30 minutes • Custom revenue analysis
          </p>
        </div>

        {/* Secondary Option - Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Or Send Me a Message
          </h3>
          
          {submitStatus && (
            <div className={`mb-6 p-4 rounded-lg ${
              submitStatus.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {submitStatus.message}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-left mb-2">
                  Your full name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Juan Petter"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 text-left mb-2">
                Message *
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Tell us about your current revenue challenges and what you'd like to automate..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => trackConversion('contact_form_submit')}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
        
        <p className="mt-8 text-gray-600">
          Prefer email? Contact me directly:{" "}
          <a 
            href="mailto:petter2025us@outlook.com"
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            onClick={() => trackConversion('email_click')}
          >
            petter2025us@outlook.com
          </a>
        </p>
      </div>
    </section>
  );
}
