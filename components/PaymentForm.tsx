'use client';

import { useState } from 'react';
import PaymentButton from './PaymentButton';

export default function PaymentForm() {
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const services = [
    { name: 'Technical Growth Audit', price: 7500 },
    { name: 'Revenue-Generating AI System', price: 47500 },
    { name: 'AI E-commerce Boilerplate', price: 1997 }
  ];

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold mb-4">Secure Payment</h3>
      
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
          <div className="pt-4 border-t border-gray-200">
            <PaymentButton
              service={selectedService}
              amount={services.find(s => s.name === selectedService)?.price || 0}
              email={email}
              variant="primary"
            />
            <p className="text-xs text-gray-500 mt-2">
              You'll be redirected to PayPal to complete payment
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
