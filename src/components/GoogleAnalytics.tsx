'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timeout = setTimeout(() => {
      window.gtag?.('event', 'page_view', {
        page_path: pathname,
        page_title: document.title,
        send_to: measurementId,
      });
    }, 100);
    return () => clearTimeout(timeout);
  }, [pathname, measurementId]);

  return null;
}
