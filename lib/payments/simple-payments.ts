export interface Invoice {
  id: string;
  amount: number;
  service: string;
  customerEmail: string;
  createdAt: Date;
}

export function generateInvoice(email: string, service: string, amount: number): Invoice {
  return {
    id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    amount,
    service,
    customerEmail: email,
    createdAt: new Date()
  };
}

export const paymentMethods = {
  venmo: { 
    username: process.env.VENMO_USERNAME || 'YourVenmoUsername',
    instructions: (amount: number, service: string) => 
      `Send $${amount} to @YourVenmoUsername with note: "${service}"`
  },
  paypal: { 
    username: process.env.PAYPAL_USERNAME || 'yourbiz',
    instructions: (amount: number, service: string) =>
      `Pay $${amount} via PayPal.me/yourbiz`
  },
  cashapp: { 
    username: process.env.CASHAPP_USERNAME || 'YourCashApp',
    instructions: (amount: number, service: string) =>
      `Send $${amount} to $YourCashApp with note: "${service}"`
  },
  crypto: {
    instructions: (amount: number, service: string) =>
      `Contact for crypto wallet details - $${amount} for "${service}"`
  },
  giftcard: {
    instructions: (amount: number, service: string) =>
      `Purchase $${amount} Amazon/Visa gift card for "${service}"`
  }
};
