import { HfInference } from '@huggingface/inference';
import { NextRequest, NextResponse } from 'next/server';

const hf = new HfInference(process.env.HUGGINGFACE_HUB_TOKEN);

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    
    if (!messages) {
      return NextResponse.json({ error: 'No messages' }, { status: 400 });
    }

    // Get last user message
    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop()?.content || '';
    
    const prompt = `You are an AI sales qualifier for LGCY Labs. Ask about business challenges and suggest AI solutions. User: ${lastUserMessage}\nAssistant:`;

    const encoder = new TextEncoder();
    
    const stream = new ReadableStream({
      async start(controller) {
        try {
          if (!hf) throw new Error('Hugging Face not configured');

          const response = await hf.textGenerationStream({
            model: "microsoft/DialoGPT-large",
            inputs: prompt,
            parameters: { max_new_tokens: 100 }
          });

          for await (const chunk of response) {
            if (chunk.token.text) {
              controller.enqueue(encoder.encode(chunk.token.text));
            }
          }
          controller.close();

        } catch (error) {
          controller.enqueue(encoder.encode("I'd love to help with your business challenges. What are you working on?"));
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
