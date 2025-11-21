#!/usr/bin/env python3

# Create QualifierBot.tsx
qualifier_bot_content = '''\'use client\';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function QualifierBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm the LGCY Labs AI qualifier. I help businesses understand how agentic AI systems can drive revenue and reduce costs. What's your biggest operational challenge right now?",
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    const userMessageObj: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessageObj]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessageObj].map(m => ({ 
            role: m.role, 
            content: m.content 
          }))
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      let assistantMessage = '';
      const assistantMessageObj: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessageObj]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        assistantMessage += text;
        
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.role === 'assistant') {
            lastMessage.content = assistantMessage;
          }
          return newMessages;
        });
      }

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting. Please email Juan directly at petter2025us@outlook.com",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-t-lg">
        <h3 className="text-white font-semibold">LGCY Labs AI Qualifier</h3>
        <p className="text-blue-100 text-sm">Building reliable agentic systems</p>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800 border border-gray-300'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your business challenge..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}
'''

# Create updated Contact.tsx
contact_content = '''\'use client\';
import { useState } from 'react';
import QualifierBot from '../components/QualifierBot';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: string, message: string} | null>(null);

  const trackConversion = (type: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', type, {
        event_category: 'conversion',
        event_label: 'contact_form',
        value: 1
      });
    }
    console.log(`📈 Conversion tracked: ${type}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
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
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Stop Leaving Revenue on the Table
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            While you're reading this, your current systems are likely missing revenue opportunities. 
            Get instant AI qualification or book a free revenue gap analysis.
          </p>
        </div>

        {/* AI Qualifier Bot Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              🤖 Instant AI Qualification
            </h3>
            <p className="text-gray-600">
              Chat with our AI to instantly see if our agentic systems can solve your revenue challenges
            </p>
          </div>
          <QualifierBot />
        </div>

        {/* Primary CTA - Calendly Booking */}
        <div className="mb-16 p-8 bg-white rounded-2xl shadow-lg border border-green-100 text-center">
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

        {/* Traditional Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Or Send Me a Message Directly
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
        
        <p className="mt-8 text-gray-600 text-center">
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
'''

# Write the files
with open('components/QualifierBot.tsx', 'w') as f:
    f.write(qualifier_bot_content)

with open('sections/Contact.tsx', 'w') as f:
    f.write(contact_content)

print("✅ Files created successfully!")
print("📁 QualifierBot.tsx created in components/")
print("📁 Contact.tsx updated in sections/")
