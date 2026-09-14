'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // ─── Scene & Camera Setup ──────────────────────────────────────────────
    const scene = new THREE.Scene();

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    // Camera distance adapts to screen width
    const isMobile = width < 768;
    camera.position.z = isMobile ? 12 : 9.5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // ─── Master 3D Group ───────────────────────────────────────────────────
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Subtle downward shift on mobile to harmoniously align with hero text
    if (isMobile) {
      masterGroup.position.y = 0.2;
    }

    // ─── 1. Inner Faceted Crystal Core ─────────────────────────────────────
    const innerGeo = new THREE.IcosahedronGeometry(1.6, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a1f16,
      emissive: 0x184f35,
      emissiveIntensity: 0.7,
      roughness: 0.15,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.88,
      flatShading: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    masterGroup.add(innerMesh);

    // ─── 2. Outer Wireframe Lattice ────────────────────────────────────────
    const wireGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x64d99a,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    masterGroup.add(wireMesh);

    // ─── 3. Vertex Nodes on Outer Lattice ──────────────────────────────────
    const vertexPositions = wireGeo.attributes.position;
    const nodeCount = vertexPositions.count;
    const nodesGeo = new THREE.BufferGeometry();
    const nodeCoords = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount * 3; i++) {
      nodeCoords[i] = vertexPositions.array[i];
    }
    nodesGeo.setAttribute('position', new THREE.BufferAttribute(nodeCoords, 3));

    const nodesMat = new THREE.PointsMaterial({
      color: 0xa3f7cb,
      size: isMobile ? 0.08 : 0.09,
      transparent: true,
      opacity: 0.9,
    });
    const nodesPoints = new THREE.Points(nodesGeo, nodesMat);
    masterGroup.add(nodesPoints);

    // ─── 4. Gyroscopic Orbital Tech Rings ──────────────────────────────────
    const ringsGroup = new THREE.Group();
    masterGroup.add(ringsGroup);

    const createRing = (radius: number, tube: number, tiltX: number, tiltY: number, color: number) => {
      const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.5,
        roughness: 0.3,
        metalness: 0.7,
        transparent: true,
        opacity: 0.6,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = tiltX;
      ringMesh.rotation.y = tiltY;
      return ringMesh;
    };

    const ring1 = createRing(3.0, 0.015, Math.PI / 3, Math.PI / 6, 0x64d99a);
    const ring2 = createRing(3.6, 0.015, -Math.PI / 4, Math.PI / 4, 0x5eead4);
    const ring3 = createRing(4.2, 0.012, Math.PI / 2.3, -Math.PI / 5, 0x86efac);

    ringsGroup.add(ring1);
    ringsGroup.add(ring2);
    ringsGroup.add(ring3);

    // Satellites orbiting along rings
    const satCount = 6;
    const satellites: { mesh: THREE.Mesh; ringRadius: number; angle: number; speed: number; plane: 'xy' | 'xz' | 'yz' }[] = [];
    const satGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const satMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < satCount; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      const ringRadius = 3.0 + (i % 3) * 0.6;
      masterGroup.add(sat);
      satellites.push({
        mesh: sat,
        ringRadius,
        angle: (i * Math.PI * 2) / satCount,
        speed: 0.008 * (i % 2 === 0 ? 1 : -1.2),
        plane: i % 3 === 0 ? 'xy' : i % 3 === 1 ? 'xz' : 'yz',
      });
    }

    // ─── 5. Surrounding Quantum Particle Swarm ─────────────────────────────
    const particleCount = isMobile ? 180 : 350;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.4 + Math.random() * 3.8;

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
      particleScales[i] = Math.random() * 0.5 + 0.5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x64d99a,
      size: isMobile ? 0.045 : 0.055,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particlePoints);

    // ─── 6. Dynamic Illumination ───────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x64d99a, 3.2);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.4);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    const centerLight = new THREE.PointLight(0x64d99a, 4.0, 10);
    centerLight.position.set(0, 0, 0);
    masterGroup.add(centerLight);

    // ─── Interaction & Physics State ───────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let velocityX = 0;
    let velocityY = 0;

    // Pointer move (Parallax on desktop, drag on both)
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevPointerX;
        const deltaY = e.clientY - prevPointerY;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;

        velocityX = deltaX * 0.005;
        velocityY = deltaY * 0.005;

        targetRotY += velocityX;
        targetRotX += velocityY;
      } else {
        const normX = (e.clientX / window.innerWidth) * 2 - 1;
        const normY = -(e.clientY / window.innerHeight) * 2 + 1;
        mouseX = normX * 0.35;
        mouseY = normY * 0.35;
      }
    };

    // Pointer Down (Drag to rotate — works on Desktop & Mobile)
    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      velocityX = 0;
      velocityY = 0;
      setIsInteractive(true);
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    // ─── Resize Handling ───────────────────────────────────────────────────
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      const mobileNow = newWidth < 768;

      camera.aspect = newWidth / newHeight;
      camera.position.z = mobileNow ? 11.5 : 9.5;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // ─── Visibility Optimization (Intersection Observer) ───────────────────
    let isVisible = true;
    let animationFrameId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // ─── Animation Loop ────────────────────────────────────────────────────
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Inertia decay after dragging
      if (!isDragging) {
        targetRotY += velocityX;
        targetRotX += velocityY;
        velocityX *= 0.95;
        velocityY *= 0.95;

        // Base ambient spin
        targetRotY += 0.003;
      }

      currentRotX += (targetRotX + mouseY - currentRotX) * 0.05;
      currentRotY += (targetRotY + mouseX - currentRotY) * 0.05;

      masterGroup.rotation.x = currentRotX;
      masterGroup.rotation.y = currentRotY;

      innerMesh.rotation.y -= 0.005;
      wireMesh.rotation.y += 0.003;
      wireMesh.rotation.z += 0.0015;

      ring1.rotation.z += 0.008;
      ring2.rotation.z -= 0.006;
      ring3.rotation.z += 0.004;

      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        if (sat.plane === 'xy') {
          sat.mesh.position.set(
            Math.cos(sat.angle) * sat.ringRadius,
            Math.sin(sat.angle) * sat.ringRadius * 0.8,
            Math.sin(sat.angle) * 0.4
          );
        } else if (sat.plane === 'xz') {
          sat.mesh.position.set(
            Math.cos(sat.angle) * sat.ringRadius,
            Math.sin(sat.angle * 2) * 0.3,
            Math.sin(sat.angle) * sat.ringRadius
          );
        } else {
          sat.mesh.position.set(
            Math.sin(sat.angle * 2) * 0.3,
            Math.sin(sat.angle) * sat.ringRadius,
            Math.cos(sat.angle) * sat.ringRadius
          );
        }
      });

      centerLight.intensity = 3.5 + Math.sin(elapsedTime * 2.5) * 1.0;
      particlePoints.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      innerGeo.dispose();
      innerMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      nodesGeo.dispose();
      nodesMat.dispose();
      satGeo.dispose();
      satMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-auto"
      style={{ touchAction: 'none' }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing opacity-90 transition-opacity duration-1000"
      />

      {!isInteractive && (
        <div className="absolute bottom-6 right-6 pointer-events-none hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-[11px] text-white/50 backdrop-blur-md transition-opacity">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>Interactive 3D Core • Drag to Rotate</span>
        </div>
      )}
    </div>
  );
}
