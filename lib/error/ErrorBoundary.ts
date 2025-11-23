export class SystemError extends Error {
  constructor(
    message: string,
    public code: string,
    public severity: 'low' | 'medium' | 'high' = 'medium'
  ) {
    super(message);
    this.name = 'SystemError';
  }
}

export const ErrorCodes = {
  AI_INFERENCE_FAILED: 'AI_001',
  PAYMENT_PROCESSING_FAILED: 'PAY_001',
  LEAD_STORAGE_FAILED: 'LEAD_001',
  SECURITY_VIOLATION: 'SEC_001',
  NETWORK_ERROR: 'NET_001'
};

export const errorMonitor = {
  track: (error: SystemError) => {
    console.error('🚨 SYSTEM ERROR:', {
      code: error.code,
      message: error.message,
      severity: error.severity,
      timestamp: new Date().toISOString(),
      stack: error.stack
    });
    
    // In production, send to monitoring service
    if (error.severity === 'high') {
      console.warn('🆘 HIGH SEVERITY ERROR - IMMEDIATE ATTENTION REQUIRED');
    }
  }
};

export const createErrorBoundary = (component: string) => {
  return (error: Error) => {
    const systemError = new SystemError(
      `Component ${component} failed: ${error.message}`,
      'COMPONENT_FAILURE',
      'medium'
    );
    errorMonitor.track(systemError);
  };
};

export class ErrorRecovery {
  static async retryOperation<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        console.warn(`🔄 Retry attempt ${attempt}/${maxRetries} failed:`, error);
        
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    }
    
    throw lastError!;
  }
}
