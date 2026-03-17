'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);

  const colors = [
    'rgba(0, 217, 255,',   // cyan
    'rgba(168, 85, 247,',  // purple
    'rgba(95, 251, 241,',  // cyan-light
    'rgba(192, 132, 252,', // purple-light
  ];

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const count = Math.min(60, Math.floor((width * height) / 20000));

    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const interactionRadius = 150;

      particlesRef.current.forEach((particle) => {
        // Drift movement
        particle.baseX += particle.speedX;
        particle.baseY += particle.speedY;

        // Wrap around edges
        if (particle.baseX < 0) particle.baseX = canvas.width;
        if (particle.baseX > canvas.width) particle.baseX = 0;
        if (particle.baseY < 0) particle.baseY = canvas.height;
        if (particle.baseY > canvas.height) particle.baseY = 0;

        // Cursor repulsion
        const dx = mouseX - particle.baseX;
        const dy = mouseY - particle.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < interactionRadius) {
          const force = (interactionRadius - dist) / interactionRadius;
          const angle = Math.atan2(dy, dx);
          particle.x = particle.baseX - Math.cos(angle) * force * 60;
          particle.y = particle.baseY - Math.sin(angle) * force * 60;
        } else {
          // Smoothly return to base position
          particle.x += (particle.baseX - particle.x) * 0.05;
          particle.y += (particle.baseY - particle.y) * 0.05;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color} ${particle.opacity})`;
        ctx.fill();

        // Draw connecting lines between nearby particles
        particlesRef.current.forEach((other) => {
          const lineDx = particle.x - other.x;
          const lineDy = particle.y - other.y;
          const lineDist = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

          if (lineDist < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 217, 255, ${0.05 * (1 - lineDist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.8 }}
    />
  );
}
