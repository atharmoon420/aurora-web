"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Core() {
  const core = useRef<THREE.Points>(null);
  const shell = useRef<THREE.Mesh>(null);

  const { positions, colors } = useMemo(() => {
    const N = 1400;
    const positions = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    const a = new THREE.Color("#2DE2C8"), b = new THREE.Color("#7C5CFF"), c = new THREE.Color("#FF4D9D");
    for (let i = 0; i < N; i++) {
      const ph = Math.acos(2 * Math.random() - 1), th = 2 * Math.PI * Math.random(), r = 4.2;
      positions[i * 3] = r * Math.sin(ph) * Math.cos(th);
      positions[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      positions[i * 3 + 2] = r * Math.cos(ph);
      const m = Math.random();
      const col = m < 0.5 ? a.clone().lerp(b, m * 2) : b.clone().lerp(c, (m - 0.5) * 2);
      colors[i * 3] = col.r; colors[i * 3 + 1] = col.g; colors[i * 3 + 2] = col.b;
    }
    return { positions, colors };
  }, []);

  useFrame((_, dt) => {
    if (core.current) { core.current.rotation.y += dt * 0.12; core.current.rotation.x += dt * 0.04; }
    if (shell.current) { shell.current.rotation.y -= dt * 0.08; }
  });

  return (
    <group position={[3.4, 0, 0]}>
      <points ref={core}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.11} vertexColors transparent opacity={0.95} blending={THREE.AdditiveBlending} />
      </points>
      <mesh ref={shell}>
        <icosahedronGeometry args={[4.9, 1]} />
        <meshBasicMaterial color="#7C5CFF" wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function Stars() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const N = 1800, p = new Float32Array(N * 3);
    for (let i = 0; i < N * 3; i++) p[i] = (Math.random() - 0.5) * 60;
    return p;
  }, []);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.01; });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial size={0.06} color="#8fb6ff" transparent opacity={0.6} />
    </points>
  );
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 14], fov: 60 }} dpr={[1, 2]}>
      <Stars />
      <Core />
    </Canvas>
  );
}
