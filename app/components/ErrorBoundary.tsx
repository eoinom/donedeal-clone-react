'use client';

import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

function DefaultFallback() {
  return (
    <div className='text-2xl text-center font-semibold mt-12 text-red-600'>
      Something went wrong. Please try again later.
    </div>
  );
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      fallback={fallback || <DefaultFallback />}
      onError={(error, errorInfo) => {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
