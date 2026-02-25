'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { ErrorFallback } from '@/shared/components';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service like Sentry
    console.error('Route Boundary Error:', error);
  }, [error]);

  return <ErrorFallback error={error} reset={reset} />;
}