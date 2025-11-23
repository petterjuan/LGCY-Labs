import { useMemo, useCallback, memo, lazy } from 'react';
import debounce from 'lodash.debounce';

// Memoized component factory
export const createMemoizedComponent = <P extends object>(
  Component: React.ComponentType<P>
) => memo(Component);

// Optimized hook for expensive calculations
export const useExpensiveCalculation = <T>(
  factory: () => T,
  deps: any[]
): T => useMemo(factory, deps);

// Debounced callback hook
export const useDebouncedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  deps: any[]
) => useCallback(debounce(callback, delay), deps);

// Virtual scrolling utilities
export const virtualScrollConfig = {
  itemHeight: 60,
  overscan: 5,
  useWindow: true
};

// Performance monitoring
export const performanceMonitor = {
  measure: (name: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${name}-start`);
    }
  },
  end: (name: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
    }
  }
};

// Lazy loading helper
export const lazyLoad = (importFn: () => Promise<any>) => {
  return lazy(importFn);
};
