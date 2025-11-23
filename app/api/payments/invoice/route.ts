import { generateInvoice } from '../../../../lib/payments/simple-payments';
import { storePayment } from '../../../../lib/storage/local-storage';

export async function POST(request: Request) {
  try {
    const { customerEmail, service, amount } = await request.json();
    
    if (!customerEmail || !service || !amount) {
      return Response.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate invoice
    const invoice = generateInvoice(customerEmail, service, amount);
    
    // Store payment attempt
    await storePayment({
      type: 'invoice_created',
      invoiceId: invoice.id,
      customerEmail,
      service,
      amount,
      status: 'pending'
    });

    const paypalUsername = process.env.NEXT_PUBLIC_PAYPAL_USERNAME || 'yourbiz';
    
    return Response.json({
      success: true,
      invoice,
      paymentMethods: [
        {
          type: 'paypal',
          link: `https://paypal.me/${paypalUsername}/${amount}`,
          instructions: `Pay $${amount} via PayPal.me/${paypalUsername}`
        },
        {
          type: 'venmo', 
          instructions: `Send $${amount} to @YourVenmoUsername with note: "${service}"`
        },
        {
          type: 'cashapp',
          instructions: `Send $${amount} to $YourCashApp with note: "${service}"`
        }
      ]
    });
    
  } catch (error) {
    console.error('Invoice creation failed:', error);
    return Response.json(
      { success: false, message: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}
