import { HfInference } from '@huggingface/inference';
import { NextRequest, NextResponse } from 'next/server';

const hf = new HfInference(process.env.HUGGINGFACE_HUB_TOKEN);

// Intelligent prompt engineering for revenue-focused qualification
const createIntelligentPrompt = (conversation: string[], lastUserMessage: string) => {
  const fullConversation = conversation.map(m => `${m.role}: ${m.content}`).join('\n');
  
  // Detect context and create targeted response
  const lowerMessage = lastUserMessage.toLowerCase();
  
  if (lowerMessage.includes('cart') || lowerMessage.includes('abandonment') || lowerMessage.includes('revenue loss')) {
    return `You are an expert AI sales qualifier for LGCY Labs, specializing in revenue recovery and e-commerce optimization.

CONVERSATION HISTORY:
${fullConversation}

USER'S LAST MESSAGE: ${lastUserMessage}

ANALYSIS: The user is experiencing cart abandonment/revenue leakage issues.

RESPONSE STRATEGY:
1. Ask quantifying questions to understand scale
2. Identify specific pain points  
3. Position relevant solutions based on their answers
4. Move toward technical audit offering

CURRENT SITUATION: User mentioned cart abandonment/revenue loss.

INTELLIGENT RESPONSE: Based on the conversation about cart abandonment, I should ask: "How much monthly revenue are you losing from abandoned carts, and what's your current recovery rate?" This helps quantify the problem and position our $47,500 Revenue-Generating AI System that typically recovers 15-30% of lost revenue.

Your response should be helpful, curious, and move toward quantifying the opportunity.`;
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
            // Fallback intelligent responses
            const lowerMessage = lastUserMessage.toLowerCase();
            let intelligentResponse = "I'd love to help with your business challenges. What are you working on?";
            
            if (lowerMessage.includes('cart') || lowerMessage.includes('abandonment')) {
              intelligentResponse = "I understand you're dealing with cart abandonment. How much monthly revenue are you losing from abandoned carts, and what's your current recovery rate?";
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
            parameters: { max_new_tokens: 100, temperature: 0.7 }
          });

          for await (const chunk of response) {
            if (chunk.token.text) {
              controller.enqueue(encoder.encode(chunk.token.text));
            }
          }
          controller.close();

        } catch (error) {
          // Intelligent fallback responses
          const lowerMessage = lastUserMessage.toLowerCase();
          let fallbackResponse = "I'd love to help with your business challenges. What's the specific impact you're seeing?";
          
          if (lowerMessage.includes('cart') || lowerMessage.includes('abandonment')) {
            fallbackResponse = "Cart abandonment is a common revenue leak. How much are you losing monthly, and what recovery systems do you have in place?";
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
