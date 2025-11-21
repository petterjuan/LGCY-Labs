import { OpenAI } from 'openai';

export class LeadScorer {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });
  }

  async scoreLead(formData: any) {
    const prompt = `
      As an AI revenue optimization expert, analyze this lead and provide:
      1. Priority: "urgent" (respond within 15min), "high" (2hrs), "medium" (24hrs)
      2. Revenue Potential: 0-100 scale
      3. Recommended Action: specific next steps
      4. Risk Score: likelihood of being spam/competitor

      Lead: ${JSON.stringify(formData)}

      Respond ONLY in JSON: {priority: string, revenuePotential: number, recommendedAction: string, riskScore: number}
    `;

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      });

      return JSON.parse(completion.choices[0].message.content || '{}');
    } catch (error) {
      console.error('AI analysis failed:', error);
      // Fallback analysis
      return {
        priority: 'medium',
        revenuePotential: 50,
        recommendedAction: 'Follow up within 24 hours',
        riskScore: 30
      };
    }
  }
}
