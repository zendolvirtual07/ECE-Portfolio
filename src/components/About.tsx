'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Brain, Lightbulb, Wifi, Cpu, Network, BookOpen } from 'lucide-react';
import { useRef } from 'react';
import * as THREE from 'three';

const CARDS = [
  { title: "Problem Solving", icon: Brain, color: "text-electric-cyan" },
  { title: "Innovation", icon: Lightbulb, color: "text-neon-green" },
  { title: "Communication Systems", icon: Wifi, color: "text-soft-blue" },
  { title: "Embedded Systems", icon: Cpu, color: "text-neon-purple" },
  { title: "IoT Development", icon: Network, color: "text-electric-cyan" },
  { title: "Continuous Learning", icon: BookOpen, color: "text-white" },
];

const STATS = [
  { label: "Projects Completed", value: 15, suffix: "+", decimals: 0 },
  { label: "Certifications", value: 8, suffix: "", decimals: 0 },
  { label: "Technical Skills", value: 25, suffix: "+", decimals: 0 },
  { label: "Workshops Attended", value: 12, suffix: "", decimals: 0 },
];

function AbstractAvatar() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]}>
      <MeshDistortMaterial
        color="#00E5FF"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        wireframe={true}
      />
    </Sphere>
  );
}

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">
            About <span className="neon-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-electric-cyan mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: 3D Avatar Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="h-[400px] md:h-[500px] w-full relative glass-card overflow-hidden"
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={1} />
              <directionalLight position={[5, 5, 5]} intensity={2} color="#8B5CF6" />
              <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <AbstractAvatar />
              </Float>
            </Canvas>
          </motion.div>

          {/* Right: Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-300 text-lg leading-relaxed mb-8"
            >
              Passionate Electronics Engineer specializing in high-performance embedded systems, industrial IoT, and next-generation automation. Translating complex engineering challenges into streamlined, intelligent hardware, my expertise spans across deep-tech IoT, advanced robotics, and real-time communication systems.
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {CARDS.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                    className="glass p-4 rounded-xl flex flex-col items-center text-center gap-3 hover:bg-white/10 transition-colors"
                  >
                    <Icon className={card.color} size={28} />
                    <span className="text-sm font-medium text-gray-200">{card.title}</span>
                  </motion.div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-heading font-bold text-electric-cyan mb-1">
                    {inView ? (
                      <CountUp 
                        end={stat.value} 
                        duration={2.5} 
                        decimals={stat.decimals}
                        suffix={stat.suffix}
                      />
                    ) : '0'}
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}