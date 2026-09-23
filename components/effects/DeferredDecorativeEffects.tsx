'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Code-split decorative ambient effects — they do not affect LCP or core content
const SmoothCursor = dynamic(() => import('@/components/effects/SmoothCursor'), { ssr: false });
const ParticleField = dynamic(() => import('@/components/effects/ParticleField'), { ssr: false });
const FloatingShapes = dynamic(() => import('@/components/effects/FloatingShapes'), { ssr: false });

export default function DeferredDecorativeEffects() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Mount decorative effects during browser idle time so they never contend with FCP/LCP
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const handle = requestIdleCallback(() => setReady(true), { timeout: 1500 });
      return () => cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(() => setReady(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!ready) return null;

  return (
    <>
      <SmoothCursor />
      <ParticleField />
      <FloatingShapes />
    </>
  );
}
