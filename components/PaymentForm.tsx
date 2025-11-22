'use client';

import { useState } from 'react';
import PaymentButton from './PaymentButton';
import MultiPaymentOptions from './MultiPaymentOptions';

export default function PaymentForm() {
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const services = [
    { name: 'Technical Growth Audit', price: 7500 },
    { name: 'Revenue-Generating AI System', price: 47500 },
    { name: 'AI E-commerce Boilerplate', price: 1997 }
  ];

  const handleProceedToPayment = () => {
    if (email && selectedService) {
      setShowPaymentOptions(true);
      // Track payment initiation
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'begin_checkout', {
          currency: 'USD',
          value: services.find(s => s.name === selectedService)?.price / 100,
          items: [{ item_name: selectedService }]
        });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold mb-4">Secure Payment</h3>
      
      {!showPaymentOptions ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Work Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Service
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Choose a service...</option>
              {services.map((service) => (
                <option key={service.name} value={service.name}>
                  {service.name} - ${service.price}
                </option>
              ))}
            </select>
          </div>

          {selectedService && email && (
            <button
              onClick={handleProceedToPayment}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Proceed to Payment - ${services.find(s => s.name === selectedService)?.price}
            </button>
          )}
        </div>
      ) : (
        <MultiPaymentOptions
          service={selectedService}
          amount={services.find(s => s.name === selectedService)?.price || 0}
          email={email}
        />
      )}
    </div>
  );
}
