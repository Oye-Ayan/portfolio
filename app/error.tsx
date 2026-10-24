'use client';

import { useEffect } from 'react';
import { FiRefreshCw, FiHome } from 'react-icons/fi';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Check for stale chunk deployment mismatches
    const isChunkError =
      error.name === 'ChunkLoadError' ||
      error.message?.includes('Loading chunk') ||
      error.message?.includes('Failed to fetch dynamically imported module');

    if (isChunkError && typeof window !== 'undefined') {
      const lastReload = sessionStorage.getItem('chunk_reload');
      const now = Date.now();
      // Auto-refresh once if a deployment happened while user had older version loaded
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem('chunk_reload', now.toString());
        window.location.reload();
        return;
      }
    }

    console.error('Application Error Boundary caught error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-6 py-20 text-text-primary">
      <div className="max-w-md w-full p-8 rounded-3xl bg-surface border border-border shadow-2xl text-center">
        <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
          <FiRefreshCw className="text-2xl animate-spin-slow" />
        </div>

        <h2 className="text-2xl font-display font-bold mb-3 tracking-tight">
          Page Load Interrupted
        </h2>

        <p className="text-sm text-text-secondary leading-relaxed mb-8">
          A temporary network or script initialization issue was encountered. Click below to reload and continue browsing smoothly.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.location.reload();
              else reset();
            }}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-dark font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-accent/20"
          >
            <FiRefreshCw className="text-base" />
            Reload Page
          </button>

          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface border border-border text-text-primary font-bold text-sm hover:border-accent/40 transition-colors"
          >
            <FiHome className="text-base" />
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
