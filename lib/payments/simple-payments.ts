// Simple payment system using direct bank transfers and PayPal
// Free and compatible with Next.js 16

export interface PaymentLink {
  service: string;
  amount: number;
  paypalLink: string;
  bankTransferDetails: string;
}

export const paymentLinks: PaymentLink[] = [
  {
    service: "AI E-commerce Boilerplate",
    amount: 1997,
    paypalLink: "https://paypal.me/yourbiz/1997",
    bankTransferDetails: "Bank transfer for AI Boilerplate - $1,997"
  },
  {
    service: "Technical Growth Audit", 
    amount: 7500,
    paypalLink: "https://paypal.me/yourbiz/7500",
    bankTransferDetails: "Bank transfer for Growth Audit - $7,500"
  },
  {
    service: "Revenue-Generating AI System",
    amount: 47500,
    paypalLink: "https://paypal.me/yourbiz/47500", 
    bankTransferDetails: "Bank transfer for AI System - $47,500"
  }
];

export function generateInvoice(customerEmail: string, service: string, amount: number) {
  const invoiceId = `INV-${Date.now()}`;
  return {
    invoiceId,
    customerEmail,
    service,
    amount,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    status: 'pending' as const
  };
}
