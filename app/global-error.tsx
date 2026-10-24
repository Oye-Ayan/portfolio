'use client';

import { useEffect } from 'react';
import { FiRefreshCw, FiHome } from 'react-icons/fi';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Auto-heal if a chunk load error or deployment mismatch occurred
    const isChunkError =
      error.name === 'ChunkLoadError' ||
      error.message?.includes('Loading chunk') ||
      error.message?.includes('Failed to fetch dynamically imported module');

    if (isChunkError && typeof window !== 'undefined') {
      const lastReload = sessionStorage.getItem('chunk_reload');
      const now = Date.now();
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem('chunk_reload', now.toString());
        window.location.reload();
        return;
      }
    }

    console.error('Global layout error caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-[#0a0a0b] text-[#ececee] p-6 antialiased">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#121214] border border-white/10 shadow-2xl text-center">
          <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <FiRefreshCw className="text-2xl animate-spin-slow" />
          </div>

          <h2 className="text-2xl font-bold mb-3 tracking-tight">
            Application Load Interrupted
          </h2>

          <p className="text-sm text-zinc-400 leading-relaxed mb-8">
            A temporary connection or build asset mismatch occurred. Click below to reload cleanly.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') window.location.reload();
                else reset();
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-black font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              <FiRefreshCw className="text-base" />
              Reload Application
            </button>

            <button
              onClick={() => reset()}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1a1a1e] border border-white/10 text-white font-bold text-sm hover:border-emerald-500/40 transition-colors"
            >
              <FiHome className="text-base" />
              Retry
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
