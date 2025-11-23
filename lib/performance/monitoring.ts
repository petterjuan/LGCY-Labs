interface PerformanceMetrics {
  pageLoad: number;
  apiResponse: number;
  aiInference: number;
  buildTime: number;
}

export const PerformanceMonitor: {
  metrics: PerformanceMetrics;
  track: (metric: keyof PerformanceMetrics, value: number) => void;
  report: () => PerformanceMetrics & { health: string };
  benchmark: <T>(name: string, operation: () => Promise<T>) => Promise<{ result: T; duration: number }>;
} = {
  metrics: {
    pageLoad: 0,
    apiResponse: 0,
    aiInference: 0,
    buildTime: 0
  },
  
  track: (metric: keyof PerformanceMetrics, value: number) => {
    PerformanceMonitor.metrics[metric] = value;
    
    if (value > 1000) { // Threshold in ms
      console.warn(`⚠️ PERFORMANCE ALERT: ${String(metric)} took ${value}ms`);
    }
    
    // Log for analytics
    console.log(`📊 Performance: ${String(metric)}=${value}ms`);
  },
  
  report: () => ({
    ...PerformanceMonitor.metrics,
    health: PerformanceMonitor.metrics.pageLoad < 2000 ? 'GOOD' : 'NEEDS_OPTIMIZATION'
  }),
  
  benchmark: async <T>(name: string, operation: () => Promise<T>) => {
    const start = performance.now();
    const result = await operation();
    const duration = performance.now() - start;
    
    PerformanceMonitor.track('aiInference', duration);
    console.log(`⏱️ Benchmark ${name}: ${duration.toFixed(2)}ms`);
    
    return { result, duration };
  }
};
