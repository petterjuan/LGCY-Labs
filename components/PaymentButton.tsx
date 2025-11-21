'use client';

import { useState } from 'react';

interface PaymentButtonProps {
  service: string;
  amount: number;
  email: string;
  variant?: 'primary' | 'secondary';
}

export default function PaymentButton({ service, amount, email, variant = 'primary' }: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      // Generate invoice
      const response = await fetch('/api/payments/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerEmail: email, service, amount })
      });

      const result = await response.json();
      
      if (result.success) {
        // Open PayPal link in new tab
        const paypalUsername = process.env.NEXT_PUBLIC_PAYPAL_USERNAME || 'yourbiz';
        window.open(`https://paypal.me/${paypalUsername}/${amount}`, '_blank');
        
        // Track conversion
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'purchase', {
            currency: 'USD',
            value: amount / 100,
            items: [{ item_name: service }]
          });
        }
        
        console.log('💰 Payment initiated:', result.invoice);
      }
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading || !email}
      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
        variant === 'primary' 
          ? 'bg-blue-600 text-white hover:bg-blue-700' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isLoading ? 'Processing...' : `Pay $${amount}`}
    </button>
  );
}
