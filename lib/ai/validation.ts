export class AIModelValidator {
  static async validateResponse(question: string, response: string): Promise<{
    accuracy: number;
    confidence: number;
    flags: string[];
  }> {
    const flags: string[] = [];
    
    // Check for budget qualification
    if (question.toLowerCase().includes('budget') && !response.includes('$')) {
      flags.push('MISSING_BUDGET_QUALIFICATION');
    }
    
    // Check for timeline qualification
    if (question.toLowerCase().includes('timeline') && !/(days|weeks|months)/i.test(response)) {
      flags.push('MISSING_TIMELINE_QUALIFICATION');
    }
    
    // Check for appropriate response length
    if (response.length < 10) {
      flags.push('RESPONSE_TOO_SHORT');
    }
    
    // Check for revenue focus
    if (question.toLowerCase().includes('revenue') && !/(revenue|money|cost|budget)/i.test(response)) {
      flags.push('MISSING_REVENUE_CONTEXT');
    }
    
    return {
      accuracy: flags.length === 0 ? 0.95 : Math.max(0.5, 0.95 - (flags.length * 0.1)),
      confidence: 0.89,
      flags
    };
  }

  static async monitorAccuracyOverTime(responses: Array<{question: string, response: string}>) {
    const validations = await Promise.all(
      responses.map(r => this.validateResponse(r.question, r.response))
    );
    
    const averageAccuracy = validations.reduce((sum, v) => sum + v.accuracy, 0) / validations.length;
    const totalFlags = validations.reduce((sum, v) => sum + v.flags.length, 0);
    
    return {
      averageAccuracy,
      totalFlags,
      needsImprovement: averageAccuracy < 0.8 || totalFlags > responses.length * 0.3
    };
  }

  static createFallbackResponse(question: string): string {
    if (question.toLowerCase().includes('budget')) {
      return "To provide the best solution, could you share your budget range? Typically our solutions range from $7.5K to $47.5K depending on complexity.";
    }
    
    if (question.toLowerCase().includes('timeline')) {
      return "What's your ideal implementation timeline? We can deploy in as little as 2 weeks for standard solutions.";
    }
    
    return "I'd be happy to help! Could you provide more details about your specific revenue challenges?";
  }
}
