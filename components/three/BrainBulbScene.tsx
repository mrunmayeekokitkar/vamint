"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Brain/Bulb particle system with scroll-driven animation
function BrainBulbParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const lineSegmentsRef = useRef<THREE.LineSegments>(null);
  const scroll = useScroll();
  
  const particleCount = 150;
  
  // Define three states: Code (sparse), Collaborate (connecting), Evolve (bulb shape)
  const positionsDataRef = useRef<{
    code: Float32Array;
    collaborate: Float32Array;
    evolve: Float32Array;
    current: Float32Array;
  } | null>(null);

  if (!positionsDataRef.current) {
    // State 1: Code - sparse scattered particles
    const codeState = [];
    for (let i = 0; i < particleCount; i++) {
      codeState.push(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4
      );
    }
    
    // State 2: Collaborate - brain-like cluster with connections
    const collaborateState = [];
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 0.5;
      collaborateState.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }
    
    // State 3: Evolve - bulb shape (sphere + filament)
    const evolveState = [];
    for (let i = 0; i < particleCount; i++) {
      if (i < particleCount * 0.7) {
        // Bulb sphere
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 1.8 + Math.random() * 0.3;
        evolveState.push(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) + 1,
          r * Math.cos(phi)
        );
      } else {
        // Filament/base
        evolveState.push(
          (Math.random() - 0.5) * 0.8,
          -1.5 - Math.random() * 1,
          (Math.random() - 0.5) * 0.8
        );
      }
    }
    
    positionsDataRef.current = {
      code: new Float32Array(codeState),
      collaborate: new Float32Array(collaborateState),
      evolve: new Float32Array(evolveState),
      current: new Float32Array(codeState),
    };
  }

  const positionsData = positionsDataRef.current;

  useFrame((state) => {
    if (!pointsRef.current || !lineSegmentsRef.current) return;

    const time = state.clock.getElapsedTime();
    const geom = pointsRef.current.geometry;
    const currentPositions = geom.attributes.position.array as Float32Array;

    // Determine which stage we're in based on scroll
    // 0-0.33: Code, 0.33-0.66: Collaborate, 0.66-1: Evolve
    let targetPositions: Float32Array;
    let connectionThreshold = 1.5;
    const scrollProgress = scroll.offset;
    
    // Update line segments material opacity
    if (lineSegmentsRef.current) {
      const material = lineSegmentsRef.current.material as THREE.LineBasicMaterial;
      if (material) {
        material.opacity = 0.2 + scrollProgress * 0.3;
      }
    }
    
    if (scrollProgress < 0.33) {
      const localProgress = scrollProgress / 0.33;
      targetPositions = positionsData.code;
      connectionThreshold = 0.5 + localProgress * 0.5;
    } else if (scrollProgress < 0.66) {
      const localProgress = (scrollProgress - 0.33) / 0.33;
      targetPositions = positionsData.collaborate;
      connectionThreshold = 1.0 + localProgress * 0.5;
    } else {
      const localProgress = (scrollProgress - 0.66) / 0.34;
      targetPositions = positionsData.evolve;
      connectionThreshold = 1.5 + localProgress * 0.3;
    }

    // Interpolate positions with subtle animation
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      
      const targetX = THREE.MathUtils.lerp(
        positionsData.current[idx],
        targetPositions[idx],
        0.05
      );
      const targetY = THREE.MathUtils.lerp(
        positionsData.current[idx + 1],
        targetPositions[idx + 1],
        0.05
      );
      const targetZ = THREE.MathUtils.lerp(
        positionsData.current[idx + 2],
        targetPositions[idx + 2],
        0.05
      );

      // Add subtle breathing animation
      const breath = Math.sin(time * 0.5 + i * 0.1) * 0.02;
      
      currentPositions[idx] = targetX + breath;
      currentPositions[idx + 1] = targetY + breath;
      currentPositions[idx + 2] = targetZ + breath;
      
      // Update stored current positions
      positionsData.current[idx] = currentPositions[idx];
      positionsData.current[idx + 1] = currentPositions[idx + 1];
      positionsData.current[idx + 2] = currentPositions[idx + 2];
    }

    geom.attributes.position.needsUpdate = true;

    // Draw connections between nearby particles
    const lineCoords = [];
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

        const dist = Math.sqrt((xA - xB) ** 2 + (yA - yB) ** 2 + (zA - zB) ** 2);
        
        if (dist < connectionThreshold) {
          lineCoords.push(xA, yA, zA, xB, yB, zB);
        }
      }
    }

    const lineGeom = lineSegmentsRef.current.geometry;
    lineGeom.setAttribute("position", new THREE.Float32BufferAttribute(lineCoords, 3));
    lineGeom.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positionsData.current, 3]}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          color="#F2B90F"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.9}
        />
      </points>

      <lineSegments ref={lineSegmentsRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#F2B90F"
          transparent
          opacity={0.2}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

export default function BrainBulbScene() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = setTimeout(() => {
      setPrefersReducedMotion(mediaQuery.matches);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
        <svg width="100%" height="100%" className="w-full h-full max-w-lg text-mustard-500/20" viewBox="0 0 200 200">
          <circle cx="100" cy="80" r="50" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="100" y1="130" x2="100" y2="170" stroke="currentColor" strokeWidth="2" />
          <line x1="80" y1="170" x2="120" y2="170" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-50 md:opacity-70">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
        <ScrollControls pages={1} damping={0.3}>
          <BrainBulbParticles />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
