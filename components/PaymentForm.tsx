'use client';

import { useState } from 'react';
import MultiPaymentOptions from './MultiPaymentOptions';

export default function PaymentForm() {
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [useCustomAmount, setUseCustomAmount] = useState(false);

  const services = [
    { name: 'Technical Growth Audit', price: 7500 }, // $7,500
    { name: 'Revenue-Generating AI System', price: 47500 }, // $47,500
    { name: 'AI E-commerce Boilerplate', price: 1997 }, // $1,997
    { name: 'custom', price: 0, label: 'Custom Amount' }
  ];

  const getAmount = () => {
    if (useCustomAmount && customAmount) {
      return parseInt(customAmount); // Already in dollars - NO multiplication!
    }
    const service = services.find(s => s.name === selectedService);
    return service ? service.price : 0;
  };

  const getServiceName = () => {
    if (useCustomAmount) {
      return `Custom Payment - $${customAmount}`;
    }
    return selectedService;
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  const handleServiceChange = (serviceName: string) => {
    setSelectedService(serviceName);
    setUseCustomAmount(serviceName === 'custom');
    if (serviceName !== 'custom') {
      setCustomAmount('');
    }
  };

  const handleProceedToPayment = () => {
    if (email && (selectedService || useCustomAmount)) {
      setShowPaymentOptions(true);
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'begin_checkout', {
          currency: 'USD',
          value: getAmount(),
          items: [{ item_name: getServiceName() }]
        });
      }
    }
  };

  const amount = getAmount();
  const serviceName = getServiceName();

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
              Select Service or Custom Amount
            </label>
            <select
              value={selectedService}
              onChange={(e) => handleServiceChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              required
            >
              <option value="">Choose a service...</option>
              {services.map((service) => (
                <option key={service.name} value={service.name}>
                  {service.label || service.name} - {service.price > 0 ? formatPrice(service.price) : 'Enter custom amount'}
                </option>
              ))}
            </select>

            {useCustomAmount && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Amount ($)
                </label>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter amount in dollars"
                  min="1"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Enter the amount you'd like to pay</p>
              </div>
            )}
          </div>

          {(selectedService || (useCustomAmount && customAmount)) && email && (
            <button
              onClick={handleProceedToPayment}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Proceed to Payment - {formatPrice(amount)}
            </button>
          )}
        </div>
      ) : (
        <MultiPaymentOptions
          service={serviceName}
          amount={amount}
          email={email}
        />
      )}
    </div>
  );
}
