"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COMMANDS = [
  { prefix: "$ ", text: "git clone vamint-community", delay: 0 },
  { prefix: "  ", text: "Cloning into 'vamint-community'...", delay: 0.1 },
  { prefix: "$ ", text: "npm install collaboration", delay: 0.25 },
  { prefix: "  ", text: "+ 160 members added", delay: 0.35 },
  { prefix: "$ ", text: "vamint --code --collaborate --evolve", delay: 0.55 },
  { prefix: "✓ ", text: "Welcome to VAMINT", delay: 0.72, highlight: true },
  {
    prefix: "  ",
    text: "Code. Collaborate. Evolve.",
    delay: 0.82,
    tagline: true,
  },
];

// ─── 3D terminal frame (floating box) ───────────────────────────────────────
function TerminalMesh({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    // Gentle float + slight tilt driven by scroll
    groupRef.current.rotation.x =
      Math.sin(t * 0.4) * 0.04 - scrollProgress * 0.08;
    groupRef.current.rotation.y =
      Math.sin(t * 0.25) * 0.06 + scrollProgress * 0.05;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.06;
  });

  return (
    <group ref={groupRef}>
      {/* Terminal window body */}
      <mesh>
        <boxGeometry args={[4.6, 2.8, 0.06]} />
        <meshStandardMaterial color="#0A0D0C" metalness={0.3} roughness={0.6} />
      </mesh>
      {/* Window border glow */}
      <mesh>
        <boxGeometry args={[4.65, 2.85, 0.055]} />
        <meshStandardMaterial
          color="#F2B90F"
          transparent
          opacity={0.08 + scrollProgress * 0.12}
          wireframe
        />
      </mesh>
      {/* Title bar */}
      <mesh position={[0, 1.25, 0.04]}>
        <boxGeometry args={[4.6, 0.3, 0.01]} />
        <meshStandardMaterial color="#121613" metalness={0.2} roughness={0.8} />
      </mesh>
      {/* Traffic light dots */}
      {[-0.8, -0.5, -0.2].map((x, i) => (
        <mesh key={i} position={[x + 1.7, 1.25, 0.06]}>
          <circleGeometry args={[0.06, 16]} />
          <meshStandardMaterial
            color={["#F06565", "#F2B90F", "#35E2A6"][i]}
            emissive={["#F06565", "#F2B90F", "#35E2A6"][i]}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color="#F2B90F" />
      <pointLight position={[-3, -2, 2]} intensity={0.4} color="#ffffff" />
      <TerminalMesh scrollProgress={scrollProgress} />
    </>
  );
}

// ─── HTML terminal overlay (the text that types in) ──────────────────────────
function TerminalText({ scrollProgress }: { scrollProgress: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        className="w-[340px] md:w-[420px] font-mono text-xs leading-relaxed"
        style={{ marginTop: "-2px" }}
      >
        {COMMANDS.map((cmd, i) => {
          const visible = scrollProgress >= cmd.delay;
          return (
            <div
              key={i}
              className={`transition-all duration-500 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span
                className={
                  cmd.highlight
                    ? "text-mustard-500"
                    : cmd.tagline
                      ? "text-text-primary font-semibold"
                      : cmd.prefix === "$ "
                        ? "text-mustard-500"
                        : "text-text-tertiary"
                }
              >
                {cmd.prefix}
              </span>
              <span
                className={
                  cmd.highlight
                    ? "text-mustard-500 font-semibold"
                    : cmd.tagline
                      ? "text-text-primary"
                      : cmd.prefix === "$ "
                        ? "text-text-primary"
                        : "text-text-secondary"
                }
              >
                {cmd.text}
              </span>
            </div>
          );
        })}
        {/* blinking cursor */}
        <span className="inline-block w-2 h-3.5 bg-mustard-500 animate-blink ml-0.5" />
      </div>
    </div>
  );
}

// ─── Reduced-motion fallback ──────────────────────────────────────────────────
function StaticFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="border border-mustard-500/20 rounded-lg bg-bg-surface/50 p-6 max-w-xs font-mono text-xs text-text-secondary space-y-1">
        <div>
          <span className="text-mustard-500">$ </span>git clone vamint-community
        </div>
        <div>
          <span className="text-mustard-500">$ </span>vamint --code
          --collaborate --evolve
        </div>
        <div className="text-mustard-500 font-semibold">
          ✓ Welcome to VAMINT
        </div>
        <div className="text-text-primary">Code. Collaborate. Evolve.</div>
      </div>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function TerminalScene() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = setTimeout(() => setPrefersReducedMotion(mq.matches), 0);

    const hero = document.getElementById("hero-section");
    const handleScroll = () => {
      const heroHeight = hero ? hero.offsetHeight : window.innerHeight;
      const progress = Math.min(
        Math.max(window.scrollY / (heroHeight * 0.9), 0),
        1,
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <StaticFallback />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-60 md:opacity-80">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 1.5]}>
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
      <TerminalText scrollProgress={scrollProgress} />
    </div>
  );
}
