import { NextRequest, NextResponse } from 'next/server';
import { generateInvoice } from '../../../../lib/payments/simple-payments';
import { storePayment } from '../../../../lib/storage/local-storage';

export async function POST(request: NextRequest) {
  try {
    const { customerEmail, service, amount } = await request.json();
    
    if (!customerEmail || !service || !amount) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate invoice
    const invoice = generateInvoice(customerEmail, service, amount);
    
    // Store payment record
    await storePayment({
      email: customerEmail,
      service,
      amount,
      invoiceId: invoice.id,
      status: 'pending'
    });

    return NextResponse.json({
      success: true,
      invoice,
      message: 'Invoice created successfully'
    });
    
  } catch (error) {
    console.error('Invoice creation failed:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}
