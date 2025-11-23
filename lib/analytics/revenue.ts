export function trackRevenueEvent(event: string, data: any) {
  // Track in console for now
  console.log('💰 Revenue Event:', event, data);
  
  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', event, {
      currency: 'USD',
      value: data.amount || 0,
      items: data.items || []
    });
  }
  
  return true;
}

export const RevenueEvents = {
  LEAD_CAPTURED: 'lead_captured',
  INVOICE_CREATED: 'invoice_created', 
  PAYMENT_STARTED: 'payment_started',
  PAYMENT_COMPLETED: 'payment_completed'
};
