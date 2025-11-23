'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface LeadData {
  email: string;
  company: string;
  challenge: string;
  detectedTier: string;
  budget: string;
  timestamp: Date;
}

export default function EnhancedQualifierBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [capturedLead, setCapturedLead] = useState<LeadData | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm LGCY's Revenue Qualification AI. We help companies recover 15-30% of leaked revenue with self-healing AI systems.

To see if we can help, I need 3 quick details:
1. What's the biggest revenue leak costing you money?
2. Do you have budget allocated? (Typically $7.5K-$47.5K)
3. What's your implementation timeline?

This helps me determine if we can deliver the 3-8x ROI our clients expect.",
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

  const detectTierFromConversation = (conversation: string): string => {
    const lower = conversation.toLowerCase();
    
    // Tier detection logic
    if (lower.includes('enterprise') || lower.includes('fortune') || lower.includes('$100k') || lower.includes('$1m')) {
      return 'enterprise';
    } else if (lower.includes('agency') || lower.includes('team') || lower.includes('scale')) {
      return 'growth';
    } else if (lower.includes('startup') || lower.includes('small') || lower.includes('solo')) {
      return 'starter';
    }
    return 'growth'; // default
  };

  const getTierDetails = (tier: string) => {
    const tiers = {
      'starter': { price: '$1,997', service: 'AI E-commerce Boilerplate' },
      'growth': { price: '$7,500', service: 'Technical Growth Audit' },
      'enterprise': { price: '$47,500', service: 'Revenue-Generating AI System' }
    };
    return tiers[tier as keyof typeof tiers] || tiers.growth;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userMessage = input.trim();
    if (!userMessage) return;
    
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

      const reader = response.body?.getReader();
      let assistantMessage = '';
      
      const assistantMessageObj: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessageObj]);

      while (true) {
        const { done, value } = await reader!.read();
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

      // After 2-3 messages, show email capture
      if (messages.length >= 2 && !showEmailCapture && !capturedLead) {
        setShowEmailCapture(true);
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

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const fullConversation = messages.map(m => `${m.role}: ${m.content}`).join('\n');
    const detectedTier = detectTierFromConversation(fullConversation);
    const tierDetails = getTierDetails(detectedTier);

    const leadData: LeadData = {
      email,
      company,
      challenge: fullConversation,
      detectedTier,
      budget: tierDetails.price,
      timestamp: new Date()
    };

    // Save lead to JSON file via API
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });

      setCapturedLead(leadData);
      setShowEmailCapture(false);

      // Add success message
      const successMessage: Message = {
        id: (Date.now() + 3).toString(),
        role: 'assistant',
        content: `Thanks ${company ? company + ' team' : ''}! Based on your needs, I recommend our ${tierDetails.service} (${tierDetails.price}). Juan will contact you at ${email} within 24 hours with specific recommendations.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, successMessage]);

    } catch (error) {
      console.error('Lead save error:', error);
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
        
        {showEmailCapture && !capturedLead && (
          <div className="flex justify-start">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-[80%]">
              <h4 className="font-semibold text-yellow-800 mb-2">Get $50K Revenue Recovery Blueprint</h4>
              <form onSubmit={handleLeadCapture} className="space-y-3">
                <input
                  type="email"
                  placeholder="Your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Company name (optional)"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                >
                  Get Priority Access → Limited Spots
                </button>
              </form>
            </div>
          </div>
        )}

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
            disabled={isLoading || showEmailCapture}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || showEmailCapture}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}
