'use client';

import { useState } from 'react';

interface PaymentOption {
  id: string;
  name: string;
  type: 'venmo' | 'cashapp' | 'crypto' | 'giftcard' | 'paypal';
  instructions: string;
  details: string;
}

export default function MultiPaymentOptions({ service, amount, email }: { service: string; amount: number; email: string }) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const paymentOptions: PaymentOption[] = [
    {
      id: 'venmo',
      name: 'Venmo',
      type: 'venmo',
      instructions: 'Send to @YourVenmoUsername',
      details: 'Instant transfer - no fees'
    },
    {
      id: 'cashapp',
      name: 'Cash App',
      type: 'cashapp', 
      instructions: 'Send to $YourCashTag',
      details: 'Instant payment - works immediately'
    },
    {
      id: 'crypto',
      name: 'Crypto (BTC/USDC)',
      type: 'crypto',
      instructions: 'Bitcoin or USDC accepted',
      details: 'Send to crypto wallet address'
    },
    {
      id: 'giftcard',
      name: 'Gift Card',
      type: 'giftcard',
      instructions: 'Amazon, Visa, or Apple gift cards',
      details: 'Email gift card code after purchase'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      type: 'paypal',
      instructions: 'PayPal.me/YourUsername',
      details: 'Standard PayPal payment'
    }
  ];

  const handlePaymentSelection = (optionId: string) => {
    setSelectedOption(optionId);
    // Track payment method selection
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'select_payment_method', {
        payment_method: optionId,
        currency: 'USD',
        value: amount / 100
      });
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-lg">Choose Payment Method</h4>
      
      {paymentOptions.map((option) => (
        <div
          key={option.id}
          className={`border rounded-lg p-4 cursor-pointer transition-all ${
            selectedOption === option.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => handlePaymentSelection(option.id)}
        >
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium">{option.name}</h5>
              <p className="text-sm text-gray-600">{option.instructions}</p>
              <p className="text-xs text-gray-500">{option.details}</p>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 ${
              selectedOption === option.id ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
            }`} />
          </div>
        </div>
      ))}

      {selectedOption && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h5 className="font-semibold text-green-800">Next Steps for {paymentOptions.find(o => o.id === selectedOption)?.name}</h5>
          <p className="text-sm text-green-700 mt-1">
            Amount: ${amount} | Service: {service}
          </p>
          <p className="text-sm text-green-600 mt-2">
            We'll email payment instructions to {email} within 5 minutes.
          </p>
        </div>
      )}
    </div>
  );
}
