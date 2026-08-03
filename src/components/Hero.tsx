'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Box, Cylinder, Line, OrbitControls, Environment } from '@react-three/drei';
import { ArrowDown } from 'lucide-react';
import * as THREE from 'three';

const ROLES = [
  "Electronics Engineer",
  "Embedded Systems Developer",
  "IoT Enthusiast",
  "Communication Systems Learner",
  "PCB Designer",
  "Tech Innovator"
];

function TypingText() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentRole = ROLES[currentRoleIndex];

      if (!isDeleting) {
        setText(currentRole.substring(0, text.length + 1));
        if (text.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(currentRole.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, currentRoleIndex]);

  return (
    <span className="text-electric-cyan font-mono border-r-2 border-electric-cyan pr-1 animate-pulse">
      {text}
    </span>
  );
}

function Microchip() {
  return (
    <group>
      {/* PCB Base - Vibrant Blue */}
      <Box args={[4.5, 0.1, 4.5]} position={[0, -0.15, 0]}>
        <meshStandardMaterial color="#0A3A82" metalness={0.5} roughness={0.4} />
      </Box>
      
      {/* IC Body - Bright Ceramic/Metallic Silver */}
      <Box args={[2.5, 0.3, 2.5]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color="#E2E8F0" metalness={0.9} roughness={0.1} />
      </Box>
      
      {/* IC Center glowing core */}
      <Box args={[1.5, 0.32, 1.5]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color="#111" metalness={1} roughness={0} />
      </Box>
      <Box args={[1.2, 0.35, 1.2]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={1} wireframe />
      </Box>

      {/* Golden Pins along the sides */}
      {Array.from({ length: 8 }).map((_, i) => {
        const offset = (i - 3.5) * 0.28;
        return (
          <group key={i}>
            <Box args={[0.1, 0.2, 0.4]} position={[offset, -0.05, -1.35]}>
              <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
            </Box>
            <Box args={[0.1, 0.2, 0.4]} position={[offset, -0.05, 1.35]}>
              <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
            </Box>
            <Box args={[0.4, 0.2, 0.1]} position={[-1.35, -0.05, offset]}>
              <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
            </Box>
            <Box args={[0.4, 0.2, 0.1]} position={[1.35, -0.05, offset]}>
              <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
            </Box>
          </group>
        );
      })}

      {/* Extra Surface Components (Capacitors, Resistors) to make it colorful */}
      {/* Orange Tantalum Capacitors */}
      <Box args={[0.3, 0.15, 0.2]} position={[1.8, -0.05, 1.8]}>
        <meshStandardMaterial color="#FF8C00" metalness={0.3} roughness={0.6} />
      </Box>
      <Box args={[0.3, 0.15, 0.2]} position={[1.8, -0.05, 1.4]}>
        <meshStandardMaterial color="#FF8C00" metalness={0.3} roughness={0.6} />
      </Box>
      
      {/* Small blue ceramic capacitors */}
      <Box args={[0.15, 0.15, 0.15]} position={[-1.8, -0.05, 1.8]}>
        <meshStandardMaterial color="#00BFFF" metalness={0.2} roughness={0.5} />
      </Box>
      <Box args={[0.15, 0.15, 0.15]} position={[-1.5, -0.05, 1.8]}>
        <meshStandardMaterial color="#00BFFF" metalness={0.2} roughness={0.5} />
      </Box>

      {/* Red Resistors */}
      <Cylinder args={[0.08, 0.08, 0.4]} position={[-1.8, -0.05, -1.5]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#FF3333" metalness={0.1} roughness={0.8} />
      </Cylinder>
      <Cylinder args={[0.08, 0.08, 0.4]} position={[-1.8, -0.05, -1.0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#FF3333" metalness={0.1} roughness={0.8} />
      </Cylinder>

      {/* Circuit Traces on the PCB (Glowing lines) */}
      <group position={[0, -0.08, 0]}>
        <Line points={[[-1.5, 0, -1.5], [-1.8, 0, -1.8], [-1.8, 0, -2.1]]} color="#39FF14" lineWidth={3} />
        <Line points={[[1.5, 0, 1.5], [1.8, 0, 1.8], [2.1, 0, 1.8]]} color="#B026FF" lineWidth={3} />
        <Line points={[[-1.5, 0, 1.5], [-1.8, 0, 1.8], [-2.1, 0, 1.8]]} color="#00E5FF" lineWidth={3} />
        <Line points={[[1.5, 0, -1.5], [1.8, 0, -1.8], [1.8, 0, -2.1]]} color="#FFD700" lineWidth={3} />
      </group>
    </group>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-gray-400 font-mono mb-2 tracking-wider">Hello, I&apos;m</p>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4 text-white">
            <span className="neon-text">Sri Shesha Sai</span> Bingi
          </h1>
          <h2 className="text-xl md:text-2xl font-sora text-gray-300 mb-6">
            Electronics & Communication Engineer
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg leading-relaxed text-lg">
            Recent Graduate | Embedded Systems Enthusiast | IoT Developer | Problem Solver.
            <br className="mb-2" />
            Currently exploring <TypingText />
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.a
              href="#resume"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-electric-cyan text-deep-black font-semibold rounded-full hover:shadow-[0_0_20px_#00E5FF] transition-all"
            >
              Download Resume
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 glass text-white font-semibold rounded-full hover:bg-white/10 transition-all border border-electric-cyan/30"
            >
              Explore Portfolio
            </motion.a>
          </div>
        </motion.div>

        {/* 3D Hologram Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-[400px] lg:h-[600px] w-full relative"
        >
          <Canvas camera={{ position: [0, 4, 8], fov: 45 }}>
            {/* Realistic Environment Reflections for metals and ceramics */}
            <Environment preset="city" />
            
            <ambientLight intensity={0.8} />
            {/* Bright key light specifically targeting the chip */}
            <directionalLight position={[5, 10, 7]} intensity={3} color="#ffffff" />
            {/* Cool cyan rim light to separate it from the background */}
            <pointLight position={[-5, 2, -5]} intensity={2.5} color="#00E5FF" />
            {/* Warm purple fill light */}
            <pointLight position={[5, -2, 5]} intensity={2} color="#8B5CF6" />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate={true}
              autoRotateSpeed={1.5}
            />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <Microchip />
            </Float>
          </Canvas>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="text-electric-cyan opacity-80" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}