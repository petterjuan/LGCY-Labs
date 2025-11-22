import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, service, amount, paymentMethod } = await request.json();
    
    // Generate payment instructions based on method
    const instructions = {
      venmo: `Send $${amount} to @YourVenmoUsername with note: "${service}"`,
      cashapp: `Send $${amount} to $YourCashTag with note: "${service}"`,
      crypto: `Send equivalent of $${amount} in BTC/USDC to: [Your Crypto Wallet Address]`,
      giftcard: `Purchase $${amount} Amazon/Visa/Apple gift card and email code to us`,
      paypal: `Pay $${amount} via PayPal.me/YourUsername`
    };

    const instruction = instructions[paymentMethod as keyof typeof instructions] || 'Payment instructions';

    // In production, you would:
    // 1. Save to database
    // 2. Send email with instructions
    // 3. Create invoice record

    console.log('💰 Payment instructions generated:', {
      email,
      service,
      amount,
      paymentMethod,
      instruction
    });

    return NextResponse.json({
      success: true,
      instructions: instruction,
      nextSteps: `We've sent detailed payment instructions to ${email}. Check your inbox within 5 minutes.`
    });

  } catch (error) {
    console.error('Payment instructions error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate payment instructions' },
      { status: 500 }
    );
  }
}
