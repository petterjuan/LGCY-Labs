import { performanceMonitor } from '../../../lib/performance/optimizations';

export const withPerformanceMonitoring = async (
  handler: Function,
  endpoint: string
) => {
  performanceMonitor.measure(`api-${endpoint}`);
  try {
    const result = await handler();
    performanceMonitor.end(`api-${endpoint}`);
    return result;
  } catch (error) {
    performanceMonitor.end(`api-${endpoint}`);
    throw error;
  }
};
