export interface PaymentEvent {
  type: 'invoice_created' | 'payment_started' | 'payment_completed' | 'payment_failed';
  invoiceId: string;
  customerEmail: string;
  service: string;
  amount: number;
  timestamp: Date;
  metadata?: any;
}

export class PaymentTracker {
  private static instance: PaymentTracker;
  
  static getInstance(): PaymentTracker {
    if (!PaymentTracker.instance) {
      PaymentTracker.instance = new PaymentTracker();
    }
    return PaymentTracker.instance;
  }

  track(event: PaymentEvent) {
    console.log('💰 Payment Event:', event);
    
    // In production, send to your analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'payment_' + event.type, {
        currency: 'USD',
        value: event.amount,
        items: [{
          item_id: event.service,
          item_name: event.service,
          price: event.amount,
          quantity: 1
        }]
      });
    }
    
    return event;
  }
}

export const paymentTracker = PaymentTracker.getInstance();
