import { NextRequest, NextResponse } from 'next/server';
import { generateInvoice } from '../../../../lib/payments/simple-payments';

export async function POST(request: NextRequest) {
  try {
    const { customerEmail, service, amount } = await request.json();
    
    const invoice = generateInvoice(customerEmail, service, amount);
    
    // In a real app, save to database
    console.log('💰 Invoice generated:', invoice);
    
    const paypalUsername = process.env.NEXT_PUBLIC_PAYPAL_USERNAME || 'yourbiz';
    
    return NextResponse.json({ 
      success: true, 
      invoice,
      paymentMethods: [
        {
          type: 'paypal',
          link: `https://paypal.me/${paypalUsername}/${amount}`
        },
        {
          type: 'bank_transfer', 
          instructions: 'Contact for bank details'
        }
      ]
    });
    
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}
