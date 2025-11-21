'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change, but only if no hash is present
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
