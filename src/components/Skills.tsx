'use client';

import { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Sphere, OrbitControls, Billboard } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as THREE from 'three';

const SKILLS = [
  "C", "C++", "Python", "Java", "MATLAB",
  "HTML", "CSS", "JavaScript", "React", "Next.js",
  "Arduino", "ESP32", "8051", "Raspberry Pi",
  "PCB Design", "Circuit Analysis", "VLSI", "Digital Electronics",
  "Proteus", "Multisim", "LTspice", "AutoCAD",
  "GSM", "Bluetooth", "WiFi", "IoT"
];

function SkillNode({ text, position }: { text: string; position: [number, number, number] }) {
  return (
    <group position={position}>
      <Sphere args={[0.25, 16, 16]}>
        <meshStandardMaterial color="#111827" emissive="#00E5FF" emissiveIntensity={0.4} wireframe={true} />
      </Sphere>
      <Billboard>
        <Text
          position={[0, 0.4, 0]}
          fontSize={0.25}
          color="#F9FAFB"
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      </Billboard>
    </group>
  );
}

function SkillGalaxy() {
  const groupRef = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => {
    return SKILLS.map((skill, i) => {
      // Fibonacci sphere distribution
      const phi = Math.acos(-1 + (2 * i) / SKILLS.length);
      const theta = Math.sqrt(SKILLS.length * Math.PI) * phi;
      
      const r = 3.5; // radius
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);
      
      return { skill, position: [x, y, z] as [number, number, number] };
    });
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <SkillNode key={i} text={node.skill} position={node.position} />
      ))}
    </group>
  );
}

export default function Skills() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className="py-24 relative z-10" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">
            Technical <span className="neon-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-electric-cyan mx-auto rounded-full mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">Explore my technical universe. Drag to rotate the skill galaxy.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="w-full h-[500px] md:h-[600px] glass-card overflow-hidden cursor-grab active:cursor-grabbing"
        >
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00E5FF" />
            <Suspense fallback={null}>
              <SkillGalaxy />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
}