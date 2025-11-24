import { HfInference } from '@huggingface/inference';
import { NextRequest, NextResponse } from 'next/server';

const HF_TOKEN = process.env.HUGGINGFACE_HUB_TOKEN;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    
    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'No messages provided' }, 
        { status: 400 }
      );
    }

    // Check if Hugging Face token is available
    if (!HF_TOKEN) {
      console.warn('Hugging Face token not configured, using fallback response');
      return NextResponse.json({
        response: "I'd be happy to help you with AI automation! Since our AI service is temporarily unavailable, please email petter2025us@outlook.com directly for immediate assistance with your $75K+ project.",
        aiEnabled: false
      });
    }

    const hf = new HfInference(HF_TOKEN);
    const conversationHistory = messages.map((msg: any) => `${msg.role}: ${msg.content}`).join('\n');
    const lastUserMessage = messages[messages.length - 1]?.content || '';

    // REVENUE-FOCUSED QUALIFICATION PROMPT
    const prompt = `You are a RUTHLESS revenue qualification AI for LGCY Labs. Your ONLY goal is to identify qualified buyers.

CONVERSATION HISTORY:
${conversationHistory}

LATEST MESSAGE: ${lastUserMessage}

QUALIFICATION CRITERIA:
- Budget: $7.5K-$250K for AI automation
- Timeline: Ready to implement in 1-4 weeks  
- Pain point: Revenue leaks, manual processes, scaling issues

RESPONSE STRATEGY:
1. If qualified: Push for technical audit ($7.5K) or direct consultation
2. If unsure: Ask about budget, timeline, specific challenges
3. If unqualified: Polite redirect to email for basic questions

Respond in 1-2 sentences max. Be direct and revenue-focused.`;

    const response = await hf.textGeneration({
      model: "microsoft/DialoGPT-large",
      inputs: prompt,
      parameters: { 
        max_new_tokens: 150, 
        temperature: 0.7,
        repetition_penalty: 1.2
      }
    });

    return NextResponse.json({
      response: response.generated_text,
      aiEnabled: true
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      response: "I'm experiencing high demand right now. For immediate assistance with your AI automation needs, please email petter2025us@outlook.com directly.",
      aiEnabled: false,
      error: "Service temporarily unavailable"
    });
  }
}
