import { HfInference } from '@huggingface/inference';
import { NextRequest, NextResponse } from 'next/server';

const hf = new HfInference(process.env.HUGGINGFACE_HUB_TOKEN);

// Enhanced number extraction for revenue quantification
const extractNumbers = (text: string) => {
  const dollarMatch = text.match(/\$?(\d+[,.]?\d*)[kK]?\b/);
  const percentMatch = text.match(/(\d+)%|(\d+)\s*percent/);
  
  const dollarAmount = dollarMatch ? 
    parseInt(dollarMatch[1].replace(/[,.]/g, '')) * (text.toLowerCase().includes('k') ? 1000 : 1) : null;
  const percentAmount = percentMatch ? parseInt(percentMatch[1] || percentMatch[2]) : null;
  
  return { dollarAmount, percentAmount };
};

// Enhanced: Check entire conversation for cart context and numbers
const getConversationContext = (conversation: string[], lastUserMessage: string) => {
  const fullText = conversation.join(' ') + ' ' + lastUserMessage;
  const hasCartContext = fullText.toLowerCase().includes('cart') || fullText.toLowerCase().includes('abandonment');
  
  // Extract numbers from entire conversation
  const currentNumbers = extractNumbers(lastUserMessage);
  const historyNumbers = extractNumbers(conversation.join(' '));
  
  // Use numbers from anywhere in conversation
  const dollarAmount = currentNumbers.dollarAmount || historyNumbers.dollarAmount;
  const percentAmount = currentNumbers.percentAmount || historyNumbers.percentAmount;
  
  return {
    hasCartContext,
    dollarAmount,
    percentAmount,
    hasNumbers: !!(dollarAmount || percentAmount)
  };
};

// Enhanced fallback responses with conversation-aware number intelligence
const getIntelligentFallback = (lastUserMessage: string, conversation: string[]) => {
  const context = getConversationContext(conversation, lastUserMessage);
  const lowerMessage = lastUserMessage.toLowerCase();
  
  // Cart abandonment with numbers from anywhere in conversation
  if (context.hasCartContext && context.hasNumbers) {
    if (context.dollarAmount && context.percentAmount) {
      const monthlyRecovery = Math.round(context.dollarAmount * context.percentAmount / 100);
      const monthlyLoss = Math.round(context.dollarAmount * (1 - context.percentAmount / 100));
      const annualLoss = monthlyLoss * 12;
      const potentialRecoveryMin = Math.round(context.dollarAmount * 0.15);
      const potentialRecoveryMax = Math.round(context.dollarAmount * 0.30);
      
      return `At $${context.dollarAmount.toLocaleString()} monthly with ${context.percentAmount}% recovery, you're losing $${monthlyLoss.toLocaleString()} monthly ($${annualLoss.toLocaleString()} annually). Our $47,500 Revenue-Generating AI System typically recovers 15-30% of lost revenue - that's $${potentialRecoveryMin.toLocaleString()}-$${potentialRecoveryMax.toLocaleString()} additional monthly. What e-commerce platform are you using?`;
    } else if (context.dollarAmount) {
      const annualImpact = context.dollarAmount * 12;
      const potentialRecoveryMin = Math.round(context.dollarAmount * 0.15);
      const potentialRecoveryMax = Math.round(context.dollarAmount * 0.30);
      
      return `At $${context.dollarAmount.toLocaleString()} monthly cart abandonment ($${annualImpact.toLocaleString()} annually), our $47,500 system typically recovers 15-30% - that's $${potentialRecoveryMin.toLocaleString()}-$${potentialRecoveryMax.toLocaleString()} additional monthly. What's your current recovery rate?`;
    }
  }
  
  // Cart abandonment without numbers
  if (context.hasCartContext) {
    return "I understand you're dealing with cart abandonment. How much monthly revenue are you losing from abandoned carts, and what's your current recovery rate?";
  }
  
  // Workflow inefficiency context
  if (lowerMessage.includes('workflow') || lowerMessage.includes('inefficient') || lowerMessage.includes('manual')) {
    return "Workflow inefficiencies can be costly. How many hours per week is your team spending on manual processes that could be automated?";
  }
  
  // Enterprise context
  if (lowerMessage.includes('enterprise') || lowerMessage.includes('scale') || lowerMessage.includes('fortune')) {
    return "For enterprise-scale challenges, we specialize in Fortune 500-grade reliability. What's the scale of your operations and specific pain points?";
  }
  
  // Default intelligent response
  return "I'd love to help with your business challenges. What's the specific impact you're seeing?";
};

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    
    if (!messages) {
      return NextResponse.json({ error: 'No messages' }, { status: 400 });
    }

    // Get conversation context
    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop()?.content || '';
    const conversationHistory = messages.map((m: any) => m.content).slice(0, -1); // All but last message
    
    const encoder = new TextEncoder();
    
    const stream = new ReadableStream({
      async start(controller) {
        try {
          if (!hf) {
            // Use enhanced intelligent fallback
            const intelligentResponse = getIntelligentFallback(lastUserMessage, conversationHistory);
            controller.enqueue(encoder.encode(intelligentResponse));
            controller.close();
            return;
          }

          // [Keep existing Hugging Face logic here...]
          const prompt = `You are an expert AI sales qualifier for LGCY Labs. Conversation: ${conversationHistory.join(' ')}. User: ${lastUserMessage}. Respond intelligently.`;
          
          const response = await hf.textGenerationStream({
            model: "microsoft/DialoGPT-large",
            inputs: prompt,
            parameters: { max_new_tokens: 150, temperature: 0.7 }
          });

          for await (const chunk of response) {
            if (chunk.token.text) {
              controller.enqueue(encoder.encode(chunk.token.text));
            }
          }
          controller.close();

        } catch (error) {
          // Enhanced fallback with conversation-aware intelligence
          const intelligentResponse = getIntelligentFallback(lastUserMessage, conversationHistory);
          controller.enqueue(encoder.encode(intelligentResponse));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
