import { HfInference } from '@huggingface/inference';
import { NextRequest } from 'next/server';

const HF_TOKEN = process.env.HUGGINGFACE_HUB_TOKEN;
const hf = new HfInference(HF_TOKEN);

export async function POST(request: NextRequest) {
  const { messages } = await request.json();
  
  if (!messages || messages.length === 0) {
    return new Response('No messages provided', { status: 400 });
  }

  const conversationHistory = messages.map((msg: any) => `${msg.role}: ${msg.content}`).join('\n');
  const lastUserMessage = messages[messages.length - 1]?.content || '';

  // REVENUE-FOCUSED QUALIFICATION PROMPT
  const prompt = `You are a RUTHLESS revenue qualification AI for LGCY Labs. Your ONLY goal is to identify qualified buyers.

CONVERSATION HISTORY:
${conversationHistory}

USER'S LAST MESSAGE:
${lastUserMessage}

QUALIFICATION CRITERIA (Must identify within 3 messages):
1. BUDGET: Must be $7,500+ (ask directly: "What's your budget range?")
2. AUTHORITY: Decision-maker status (ask: "Are you the final decision-maker?")
3. TIMELINE: Implementation urgency (ask: "What's your implementation timeline?")
4. PAIN: Specific revenue leak amount (ask: "How much revenue is this costing monthly?")

RESPONSE STRATEGY:
- If ANY criteria missing: Ask DIRECTLY for the missing piece
- Push HARD for numbers: "I need specific budget to see if we can help"
- Create URGENCY: "We have 2 implementation spots left this month"
- Disqualify gently if no budget: "Let's reconnect when you have budget allocated"

RESPOND AGGRESSIVELY TO QUALIFY OR DISQUALIFY:
`;

  try {
    const response = await hf.textGenerationStream({
      model: "microsoft/DialoGPT-large",
      inputs: prompt,
      parameters: { 
        max_new_tokens: 150, 
        temperature: 0.7,
        repetition_penalty: 1.2
      }
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            if (chunk.token.text) {
              controller.enqueue(encoder.encode(chunk.token.text));
            }
          }
          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(stream);
  } catch (error) {
    console.error('HF API error:', error);
    return new Response('Error generating response', { status: 500 });
  }
}
