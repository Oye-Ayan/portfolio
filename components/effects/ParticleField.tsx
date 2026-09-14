'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '../theme/ThemeContext';

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseRadius: number;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const count = isMobile ? 65 : 140;
    const connectionDist3D = isMobile ? 140 : 180;
    const focalLength = isMobile ? 320 : 420;

    // Create 3D particles distributed in a spatial cube
    const particles: Particle3D[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 800 + 100,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: -0.35 - Math.random() * 0.4,
        baseRadius: Math.random() * 1.6 + 0.8,
      });
    }

    let targetAngleX = 0;
    let targetAngleY = 0;
    let currentAngleX = 0;
    let currentAngleY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) - 0.5;
      const normY = (e.clientY / window.innerHeight) - 0.5;
      targetAngleY = normX * 0.4;
      targetAngleX = -normY * 0.4;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    let clock = 0;

    const render = () => {
      clock += 0.01;

      if (isMobile) {
        targetAngleY = Math.sin(clock * 0.5) * 0.15;
        targetAngleX = Math.cos(clock * 0.4) * 0.1;
      }

      currentAngleX += (targetAngleX - currentAngleX) * 0.05;
      currentAngleY += (targetAngleY - currentAngleY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const isDark = themeRef.current === 'dark';

      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);
      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);

      const halfW = width / 2;
      const halfH = height / 2;

      const projected = [];

      for (let i = 0; i < count; i++) {
        const p = particles[i];

        p.z += p.vz;
        p.x += p.vx;
        p.y += p.vy;

        if (p.z < 80) p.z = 900;
        if (p.z > 900) p.z = 80;
        if (Math.abs(p.x) > width) p.x = (Math.random() - 0.5) * width;
        if (Math.abs(p.y) > height) p.y = (Math.random() - 0.5) * height;

        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        if (z2 <= 50) continue;

        const scale = focalLength / z2;
        const screenX = halfW + x1 * scale;
        const screenY = halfH + y1 * scale;

        const depthRatio = Math.max(0, Math.min(1, (1000 - z2) / 900));
        const alpha = depthRatio * (isDark ? 0.65 : 0.7);
        const radius = p.baseRadius * scale * 0.8;

        projected.push({
          x: screenX,
          y: screenY,
          z: z2,
          origX: p.x,
          origY: p.y,
          origZ: p.z,
          radius,
          alpha,
        });

        // Draw particle node
        ctx.beginPath();
        ctx.arc(screenX, screenY, Math.max(0.5, radius), 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(100, 217, 154, ${alpha})`
          : `rgba(5, 150, 105, ${alpha * 0.85})`;
        ctx.shadowBlur = radius * (isDark ? 4 : 2);
        ctx.shadowColor = isDark
          ? 'rgba(100, 217, 154, 0.4)'
          : 'rgba(5, 150, 105, 0.25)';
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      // Draw 3D spatial connections
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];

          const dx = p1.origX - p2.origX;
          const dy = p1.origY - p2.origY;
          const dz = p1.origZ - p2.origZ;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < connectionDist3D) {
            const lineAlpha = (1 - dist3D / connectionDist3D) * 0.18 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark
              ? `rgba(100, 217, 154, ${lineAlpha})`
              : `rgba(5, 150, 105, ${lineAlpha * 0.85})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-[5]"
      aria-hidden="true"
    />
  );
}
