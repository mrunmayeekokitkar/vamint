"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Individual Particle/Node simulation
function ParticleNetwork({ scrollProgress }: { scrollProgress: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const lineSegmentsRef = useRef<THREE.LineSegments>(null);
  
  // Configuration
  const particleCount = 70;
  
  // Store start positions, target positions, and active velocities
  const [positionsData] = useState(() => {
    const start = [];
    const target = [];
    for (let i = 0; i < particleCount; i++) {
      // Dispersed outer state (scroll = 0)
      start.push(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      );
      // Compact gathered network state (scroll = 1)
      target.push(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3
      );
    }
    return {
      start: new Float32Array(start),
      target: new Float32Array(target),
      current: new Float32Array(start),
    };
  });

  // Animation frame loop
  useFrame((state) => {
    if (!pointsRef.current || !lineSegmentsRef.current) return;

    const time = state.clock.getElapsedTime();
    const geom = pointsRef.current.geometry;
    const currentPositions = geom.attributes.position.array as Float32Array;

    // Line drawing calculation data
    const lineCoords = [];
    const lineThreshold = 2.0;

    // Interpolate positions based on scrollProgress + add subtle ambient drift
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      
      // Target position based on scroll interpolation
      const targetX = THREE.MathUtils.lerp(positionsData.start[idx], positionsData.target[idx], scrollProgress);
      const targetY = THREE.MathUtils.lerp(positionsData.start[idx + 1], positionsData.target[idx + 1], scrollProgress);
      const targetZ = THREE.MathUtils.lerp(positionsData.start[idx + 2], positionsData.target[idx + 2], scrollProgress);

      // Subtle wave drift to keep it alive
      const driftX = Math.sin(time * 0.2 + i) * 0.08;
      const driftY = Math.cos(time * 0.15 + i) * 0.08;

      currentPositions[idx] = targetX + driftX;
      currentPositions[idx + 1] = targetY + driftY;
      currentPositions[idx + 2] = targetZ;
    }

    geom.attributes.position.needsUpdate = true;

    // Find connections between nearby nodes to draw lines
    for (let i = 0; i < particleCount; i++) {
      const idxA = i * 3;
      const xA = currentPositions[idxA];
      const yA = currentPositions[idxA + 1];
      const zA = currentPositions[idxA + 2];

      for (let j = i + 1; j < particleCount; j++) {
        const idxB = j * 3;
        const xB = currentPositions[idxB];
        const yB = currentPositions[idxB + 1];
        const zB = currentPositions[idxB + 2];

        // Euclidean distance
        const dist = Math.sqrt((xA - xB) ** 2 + (yA - yB) ** 2 + (zA - zB) ** 2);
        
        // Draw line if close enough (more lines drawn as scrollProgress increases)
        const activeThreshold = lineThreshold * (0.3 + scrollProgress * 0.7);
        if (dist < activeThreshold) {
          lineCoords.push(xA, yA, zA, xB, yB, zB);
        }
      }
    }

    // Update lines
    const lineGeom = lineSegmentsRef.current.geometry;
    lineGeom.setAttribute("position", new THREE.Float32BufferAttribute(lineCoords, 3));
    lineGeom.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      {/* Nodes / Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positionsData.current, 3]}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          color="#FFD700"
          size={0.12}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </points>

      {/* Connecting Lines */}
      <lineSegments ref={lineSegmentsRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.15 + scrollProgress * 0.25}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

export default function NetworkScene() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Reduced motion check
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = setTimeout(() => {
      setPrefersReducedMotion(mediaQuery.matches);
    }, 0);
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Map scroll progress across first 1.2 viewports
      const progress = Math.min(scrollY / (windowHeight * 1.2), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fallback if user prefers reduced motion
  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
        <svg width="100%" height="100%" className="w-full h-full max-w-lg text-mustard-500/20">
          <circle cx="20%" cy="30%" r="4" fill="currentColor" />
          <circle cx="45%" cy="40%" r="5" fill="currentColor" />
          <circle cx="75%" cy="60%" r="3" fill="currentColor" />
          <circle cx="30%" cy="70%" r="4" fill="currentColor" />
          <line x1="20%" y1="30%" x2="45%" y2="40%" stroke="currentColor" strokeWidth="1" />
          <line x1="45%" y1="40%" x2="75%" y2="60%" stroke="currentColor" strokeWidth="1" />
          <line x1="30%" y1="70%" x2="45%" y2="40%" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-40 md:opacity-60">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ParticleNetwork scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
