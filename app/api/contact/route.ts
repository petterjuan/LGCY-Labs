import { NextRequest, NextResponse } from 'next/server';

class FreeAILeadScorer {
  private hf: any;

  constructor() {
    if (process.env.HUGGINGFACE_HUB_TOKEN) {
      import('@huggingface/inference').then((module) => {
        this.hf = new module.HfInference(process.env.HUGGINGFACE_HUB_TOKEN);
      }).catch(error => {
        console.log('Hugging Face import failed:', error.message);
      });
    }
  }

  async scoreLead(formData: any) {
    console.log('🎯 [API] AI Analysis Started for:', formData.email);
    
    const aiAnalysis = await this.tryHuggingFace(formData);
    if (aiAnalysis) return aiAnalysis;

    return { ...this.smartFallback(formData), aiEnabled: false, aiProvider: 'fallback' };
  }

  private async tryHuggingFace(formData: any) {
    if (!this.hf || !process.env.HUGGINGFACE_HUB_TOKEN) {
      console.log('🔧 [API] No Hugging Face token available');
      return null;
    }

    try {
      console.log('🚀 [API] Calling FREE Hugging Face AI...');
      
      const prompt = `Analyze this business lead: ${JSON.stringify(formData)}. Respond with JSON: {priority: string, revenuePotential: number, recommendedAction: string, riskScore: number}`;
      
      const response = await this.hf.textGeneration({
        model: "microsoft/DialoGPT-large",
        inputs: prompt,
        parameters: { max_new_tokens: 150, temperature: 0.3 }
      });

      console.log('📨 [API] Hugging Face Response:', response);

      if (response.generated_text) {
        const jsonMatch = response.generated_text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const analysis = JSON.parse(jsonMatch[0]);
          console.log('✅ [API] AI Analysis Success:', analysis);
          return { ...analysis, aiEnabled: true, aiProvider: 'huggingface' };
        }
      }
    } catch (error) {
      console.log('❌ [API] Hugging Face Error:', error.message);
    }
    return null;
  }

  private smartFallback(formData: any) {
    console.log('🔄 [API] Using smart fallback analysis');
    const email = formData.email?.toLowerCase() || '';
    const message = formData.message?.toLowerCase() || '';
    const name = formData.name || '';
    
    let priority: 'urgent' | 'high' | 'medium' | 'low' = 'medium';
    let revenuePotential = 50;
    let recommendedAction = 'Follow up within 24 hours';
    let riskScore = 30;

    if (message.includes('urgent') || message.includes('$') || message.includes('revenue loss')) {
      priority = 'urgent';
      revenuePotential = 85;
      recommendedAction = 'Contact within 15 minutes';
    } else if (message.includes('enterprise') || name.includes('ceo') || name.includes('director')) {
      priority = 'high';
      revenuePotential = 75;
      recommendedAction = 'Schedule demo today';
    }

    console.log('📊 [API] Fallback Analysis Result:', { priority, revenuePotential, riskScore });
    return { priority, revenuePotential, recommendedAction, riskScore };
  }
}

export async function POST(request: NextRequest) {
  console.log('📥 [API] Contact form received request');
  
  try {
    const formData = await request.json();
    console.log('👤 [API] Lead Details:', { name: formData.name, email: formData.email });
    
    const scorer = new FreeAILeadScorer();
    const analysis = await scorer.scoreLead(formData);

    console.log('🎯 [API] FINAL ANALYSIS COMPLETE:');
    console.log('   Email:', formData.email);
    console.log('   Priority:', analysis.priority);
    console.log('   Revenue Potential:', analysis.revenuePotential);
    console.log('   Risk Score:', analysis.riskScore);
    console.log('   AI Provider:', analysis.aiProvider);
    console.log('   --- END ANALYSIS ---');

    return NextResponse.json({ 
      success: true, 
      message: 'AI analysis complete',
      analysis 
    });

  } catch (error) {
    console.error('💥 [API] Contact Form Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process lead' },
      { status: 500 }
    );
  }
}
