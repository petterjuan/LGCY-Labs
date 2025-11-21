import { HfInference } from '@huggingface/inference';
import { NextRequest, NextResponse } from 'next/server';

const hf = new HfInference(process.env.HUGGINGFACE_HUB_TOKEN);

// Enhanced number extraction for revenue quantification
const extractNumbers = (text: string) => {
  const dollarMatch = text.match(/\$?(\d+[,.]?\d*)[kK]?\b/);
  const percentMatch = text.match(/(\d+[.,]\d+)%|(\d+)%\s*uptime|uptime\s*of\s*(\d+[.,]\d+)%/);
  const uptimeMatch = text.match(/(\d+[.,]\d+)%\s*uptime|uptime\s*of\s*(\d+[.,]\d+)%/);
  
  const dollarAmount = dollarMatch ? 
    parseInt(dollarMatch[1].replace(/[,.]/g, '')) * (text.toLowerCase().includes('k') ? 1000 : 1) : null;
  
  let percentAmount = null;
  if (percentMatch) {
    percentAmount = parseFloat(percentMatch[1] || percentMatch[2] || percentMatch[3] || percentMatch[4]);
  }
  
  return { dollarAmount, percentAmount };
};

// Enhanced: Check entire conversation for context
const getConversationContext = (conversation: string[], lastUserMessage: string) => {
  const fullText = conversation.join(' ') + ' ' + lastUserMessage;
  const lowerFullText = fullText.toLowerCase();
  const lowerMessage = lastUserMessage.toLowerCase();
  
  // Enhanced context detection
  const hasCartContext = lowerFullText.includes('cart') || lowerFullText.includes('abandonment');
  const hasEnterpriseContext = lowerFullText.includes('fortune') || lowerFullText.includes('enterprise') || 
                              lowerFullText.includes('financial transaction') || lowerFullText.includes('uptime');
  const hasWorkflowContext = lowerFullText.includes('workflow') || lowerFullText.includes('manual') || 
                            lowerFullText.includes('inefficient');
  
  // Extract numbers from entire conversation
  const currentNumbers = extractNumbers(lastUserMessage);
  const historyNumbers = extractNumbers(conversation.join(' '));
  
  // Use numbers from anywhere in conversation
  const dollarAmount = currentNumbers.dollarAmount || historyNumbers.dollarAmount;
  const percentAmount = currentNumbers.percentAmount || historyNumbers.percentAmount;
  
  return {
    hasCartContext,
    hasEnterpriseContext,
    hasWorkflowContext,
    dollarAmount,
    percentAmount,
    hasNumbers: !!(dollarAmount || percentAmount),
    isUptimeContext: lowerFullText.includes('uptime') && percentAmount
  };
};

// Enhanced fallback responses with enterprise intelligence
const getIntelligentFallback = (lastUserMessage: string, conversation: string[]) => {
  const context = getConversationContext(conversation, lastUserMessage);
  const lowerMessage = lastUserMessage.toLowerCase();
  
  // Enterprise context with uptime and financial numbers
  if (context.hasEnterpriseContext && context.hasNumbers) {
    if (context.dollarAmount && context.percentAmount && context.isUptimeContext) {
      const annualImpact = context.dollarAmount * 12;
      const uptimeGap = 99.99 - context.percentAmount; // Calculate uptime improvement needed
      
      return `At $${context.dollarAmount.toLocaleString()} monthly impact from ${context.percentAmount}% uptime (needing 99.99%), that's $${annualImpact.toLocaleString()} annually in failed transactions. Our $47,500 Enterprise AI System delivers 99.9% uptime guarantees and typically reduces transaction failures by 80-90%. What specific financial systems are affected?`;
    } else if (context.dollarAmount && context.hasEnterpriseContext) {
      const annualImpact = context.dollarAmount * 12;
      return `At $${context.dollarAmount.toLocaleString()} monthly impact ($${annualImpact.toLocaleString()} annually), our $47,500 Enterprise AI System is designed for Fortune 500 reliability with 99.9% uptime guarantees. What specific systems are causing the reliability issues?`;
    }
  }
  
  // Enterprise context without specific numbers
  if (context.hasEnterpriseContext) {
    return "For enterprise-scale challenges, we specialize in Fortune 500-grade reliability. What's the scale of your operations and specific pain points?";
  }
  
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
  if (context.hasWorkflowContext) {
    return "Workflow inefficiencies can be costly. How many hours per week is your team spending on manual processes that could be automated?";
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
