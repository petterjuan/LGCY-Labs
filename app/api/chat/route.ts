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

// Intelligent prompt engineering for revenue-focused qualification
const createIntelligentPrompt = (conversation: string[], lastUserMessage: string) => {
  const fullConversation = conversation.map(m => `${m.role}: ${m.content}`).join('\n');
  
  // Enhanced context detection with number recognition
  const currentNumbers = extractNumbers(lastUserMessage);
  const historyNumbers = extractNumbers(fullConversation);
  
  // Detect context and create targeted response
  const lowerMessage = lastUserMessage.toLowerCase();
  
  // Enhanced cart abandonment with number processing
  if (lowerMessage.includes('cart') || lowerMessage.includes('abandonment') || lowerMessage.includes('revenue loss')) {
    let analysis = "The user is experiencing cart abandonment/revenue leakage issues.";
    let strategy = "1. Ask quantifying questions to understand scale\n2. Identify specific pain points\n3. Position relevant solutions\n4. Move toward technical audit";
    let calculations = "";
    
    // If numbers are provided, calculate business impact
    if (currentNumbers.dollarAmount || historyNumbers.dollarAmount) {
      const amount = currentNumbers.dollarAmount || historyNumbers.dollarAmount;
      const percent = currentNumbers.percentAmount || historyNumbers.percentAmount;
      
      analysis = "The user provided specific revenue numbers for cart abandonment - this is a qualified lead.";
      strategy = "1. Calculate and acknowledge the business impact\n2. Position ROI-based solution\n3. Ask about platform specifics\n4. Move toward $47,500 system";
      
      if (amount && percent) {
        calculations = `\nCALCULATIONS:
- Monthly loss: $${amount.toLocaleString()}
- Current recovery: ${percent}% = $${Math.round(amount * percent / 100).toLocaleString()}
- Unrecovered: $${Math.round(amount * (1 - percent / 100)).toLocaleString()} monthly
- Annual opportunity: $${Math.round(amount * 12 * (1 - percent / 100)).toLocaleString()}
- Our solution (15-30% recovery): $${Math.round(amount * 0.15).toLocaleString()} - $${Math.round(amount * 0.30).toLocaleString()} additional monthly`;
      } else if (amount) {
        calculations = `\nCALCULATIONS:
- Monthly loss: $${amount.toLocaleString()}
- Annual impact: $${(amount * 12).toLocaleString()}
- Typical recovery: $${Math.round(amount * 0.15).toLocaleString()} - $${Math.round(amount * 0.30).toLocaleString()} monthly`;
      }
    }

    return `You are an expert AI sales qualifier for LGCY Labs, specializing in revenue recovery and e-commerce optimization.

CONVERSATION HISTORY:
${fullConversation}

USER'S LAST MESSAGE: ${lastUserMessage}
${calculations}

ANALYSIS: ${analysis}

RESPONSE STRATEGY:
${strategy}

INTELLIGENT RESPONSE: Based on the conversation about cart abandonment${calculations ? ' with specific numbers provided' : ''}, respond with a calculated, ROI-focused message that positions our $47,500 Revenue-Generating AI System and asks about their e-commerce platform.`;
  }

  if (lowerMessage.includes('workflow') || lowerMessage.includes('inefficient') || lowerMessage.includes('manual')) {
    return `You are an expert AI sales qualifier for LGCY Labs, specializing in workflow automation and operational efficiency.

CONVERSATION HISTORY:
${fullConversation}

USER'S LAST MESSAGE: ${lastUserMessage}

ANALYSIS: The user has workflow efficiency issues.

RESPONSE STRATEGY:
1. Understand team size and processes affected
2. Quantify time/cost of manual work
3. Identify automation opportunities
4. Position relevant solutions

INTELLIGENT RESPONSE: Ask: "How many hours per week is your team spending on manual workflows, and what's the impact on your operational costs?" This positions our $7,500 Technical Growth Audit that typically identifies 80% automation opportunities.`;
  }

  if (lowerMessage.includes('enterprise') || lowerMessage.includes('scale') || lowerMessage.includes('team')) {
    return `You are an expert AI sales qualifier for LGCY Labs, specializing in enterprise AI systems.

CONVERSATION HISTORY:
${fullConversation}

USER'S LAST MESSAGE: ${lastUserMessage}

ANALYSIS: Enterprise-level needs detected.

RESPONSE STRATEGY:
1. Understand company scale and complexity
2. Identify specific enterprise pain points
3. Position enterprise-grade solutions
4. Move toward executive conversation

INTELLIGENT RESPONSE: Ask: "What's the scale of your operations, and are you looking for enterprise-grade reliability with 99.9% uptime guarantees?" This positions our $47,500 Revenue-Generating AI System designed for Fortune 500 reliability.`;
  }

  // Default intelligent qualifier
  return `You are an expert AI sales qualifier for LGCY Labs. Your goal is to understand business challenges and route to the right solution.

CONVERSATION HISTORY:
${fullConversation}

USER'S LAST MESSAGE: ${lastUserMessage}

RESPONSE STRATEGY:
- Be curious and ask specific, quantifying questions
- Identify pain points and their business impact
- Gently steer toward relevant LGCY Labs solutions
- Build rapport while gathering qualification data

INTELLIGENT RESPONSE: Ask a specific question that helps understand their business challenge better and quantify the impact. For example: "What's the specific business impact you're seeing from this challenge?"`;
};

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    
    if (!messages) {
      return NextResponse.json({ error: 'No messages' }, { status: 400 });
    }

    // Get conversation context
    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop()?.content || '';
    const conversation = messages.slice(-4); // Last 4 messages for context

    // Create intelligent prompt based on conversation
    const prompt = createIntelligentPrompt(conversation, lastUserMessage);

    const encoder = new TextEncoder();
    
    const stream = new ReadableStream({
      async start(controller) {
        try {
          if (!hf) {
            // Enhanced fallback intelligent responses with number recognition
            const numbers = extractNumbers(lastUserMessage);
            const lowerMessage = lastUserMessage.toLowerCase();
            let intelligentResponse = "I'd love to help with your business challenges. What's the specific impact you're seeing?";
            
            if (lowerMessage.includes('cart') || lowerMessage.includes('abandonment')) {
              if (numbers.dollarAmount && numbers.percentAmount) {
                const monthlyRecovery = Math.round(numbers.dollarAmount * numbers.percentAmount / 100);
                const monthlyLoss = Math.round(numbers.dollarAmount * (1 - numbers.percentAmount / 100));
                intelligentResponse = `At $${numbers.dollarAmount.toLocaleString()} monthly with ${numbers.percentAmount}% recovery, you're losing $${monthlyLoss.toLocaleString()} monthly ($${(monthlyLoss * 12).toLocaleString()} annually). Our $47,500 system typically recovers 15-30% - that's $${Math.round(numbers.dollarAmount * 0.15).toLocaleString()}-$${Math.round(numbers.dollarAmount * 0.30).toLocaleString()} additional monthly. What e-commerce platform are you using?`;
              } else {
                intelligentResponse = "I understand you're dealing with cart abandonment. How much monthly revenue are you losing from abandoned carts, and what's your current recovery rate?";
              }
            } else if (lowerMessage.includes('workflow') || lowerMessage.includes('inefficient')) {
              intelligentResponse = "Workflow inefficiencies can be costly. How many hours per week is your team spending on manual processes that could be automated?";
            } else if (lowerMessage.includes('enterprise') || lowerMessage.includes('scale')) {
              intelligentResponse = "For enterprise-scale challenges, we specialize in Fortune 500-grade reliability. What's the scale of your operations and specific pain points?";
            }
            
            controller.enqueue(encoder.encode(intelligentResponse));
            controller.close();
            return;
          }

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
          // Enhanced fallback responses with number recognition
          const numbers = extractNumbers(lastUserMessage);
          const lowerMessage = lastUserMessage.toLowerCase();
          let fallbackResponse = "I'd love to help with your business challenges. What's the specific impact you're seeing?";
          
          if (lowerMessage.includes('cart') || lowerMessage.includes('abandonment')) {
            if (numbers.dollarAmount && numbers.percentAmount) {
              const monthlyLoss = Math.round(numbers.dollarAmount * (1 - numbers.percentAmount / 100));
              fallbackResponse = `Cart abandonment is costing you $${monthlyLoss.toLocaleString()} monthly. Our $47,500 system typically recovers 15-30% of lost revenue. What platform are you using?`;
            } else {
              fallbackResponse = "Cart abandonment is a common revenue leak. How much are you losing monthly, and what recovery systems do you have in place?";
            }
          } else if (lowerMessage.includes('workflow') || lowerMessage.includes('manual')) {
            fallbackResponse = "Manual workflows cost businesses significantly. How many hours weekly does your team spend on repetitive tasks?";
          }
          
          controller.enqueue(encoder.encode(fallbackResponse));
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
