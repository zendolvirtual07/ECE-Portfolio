'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  // Generate 5000 particles
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    const colors = new Float32Array(5000 * 3);
    const colorOptions = [
      new THREE.Color('#00E5FF'), // cyan
      new THREE.Color('#8B5CF6'), // purple
      new THREE.Color('#39FF14'), // neon green
    ];

    for (let i = 0; i < 5000; i++) {
      // Random position in a sphere
      const r = 20 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return [positions, colors];
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 30;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function CircuitLines() {
  const lineRef = useRef<THREE.LineSegments>(null);
  
  const [positions, colors] = useMemo(() => {
    const pos = [];
    const cols = [];
    const color = new THREE.Color('#00E5FF');
    
    // Generate some abstract circuit-like horizontal/vertical lines
    for(let i=0; i<100; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 10 - 5;
      
      const length = Math.random() * 5 + 1;
      const isHorizontal = Math.random() > 0.5;
      
      pos.push(x, y, z);
      if (isHorizontal) {
        pos.push(x + length, y, z);
      } else {
        pos.push(x, y + length, z);
      }
      
      cols.push(color.r, color.g, color.b);
      cols.push(color.r, color.g, color.b);
    }
    return [new Float32Array(pos), new Float32Array(cols)];
  }, []);
  
  useFrame((state, delta) => {
    if (lineRef.current) {
      lineRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 2;
      lineRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.15} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

export default function GlobalCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-deep-black">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <fog attach="fog" args={['#09090B', 5, 25]} />
        <ambientLight intensity={0.2} />
        <ParticleField />
        <CircuitLines />
      </Canvas>
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-deep-black/80 to-deep-black" />
    </div>
  );
}