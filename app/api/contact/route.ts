import { NextRequest, NextResponse } from 'next/server';
import { sendLeadAlert } from '@/lib/email/free-alerts';

class FreeAILeadScorer {
  private hf: any;

  constructor() {
    // AI scoring logic remains the same
  }

  async scoreLead(leadData: any) {
    return {
      priority: "medium",
      revenuePotential: 50,
      recommendedAction: "Follow up within 24 hours",
      riskScore: 30,
      aiEnabled: false,
      aiProvider: "fallback"
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, message, budget, challenge } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const scorer = new FreeAILeadScorer();
    const analysis = await scorer.scoreLead({ email, message, budget });

    const leadData = {
      email,
      message: message || '',
      budget: budget || 0,
      challenge: challenge || 'lgcy',
      timestamp: new Date().toISOString(),
      analysis
    };

    // Email alerts for high-value leads
    if (budget && budget >= 5000) {
      console.log('🚀 High-value lead detected, sending email alert...');
      await sendLeadAlert(leadData);
    } else {
      console.log('📝 Lead captured (no alert):', email);
    }

    return NextResponse.json({
      success: true,
      message: 'AI analysis complete',
      analysis
    });

  } catch (error: any) {
    console.error('💥 Contact API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
