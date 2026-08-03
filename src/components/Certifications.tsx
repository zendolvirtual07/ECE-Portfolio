'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShieldCheck, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const CERTS = [
  { title: "Embedded Systems Specialization", org: "Coursera", date: "Aug 2023", id: "CS-12345", category: "Embedded Systems" },
  { title: "IoT Cloud Architect", org: "AWS", date: "Dec 2023", id: "AWS-IOT-999", category: "IoT" },
  { title: "Advanced PCB Design", org: "Altium", date: "Jan 2024", id: "ALT-PCB-77", category: "PCB Design" },
  { title: "Python for Data Science", org: "IBM", date: "Feb 2024", id: "IBM-PY-55", category: "Programming" },
  { title: "VLSI Design & Architecture", org: "NPTEL", date: "Mar 2024", id: "NPTEL-VLSI-2", category: "VLSI" },
];

export default function Certifications() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const next = () => setCurrentIndex((prev) => (prev + 1) % CERTS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + CERTS.length) % CERTS.length);

  return (
    <section id="certifications" className="py-24 relative z-10 overflow-hidden bg-midnight-blue/20 border-y border-white/5" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">
            Licenses & <span className="neon-text">Certifications</span>
          </h2>
          <div className="w-24 h-1 bg-electric-cyan mx-auto rounded-full mb-8" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto h-[400px] flex items-center justify-center perspective-[1000px]">
          <AnimatePresence mode="popLayout">
            {CERTS.map((cert, idx) => {
              const isActive = idx === currentIndex;
              const isPrev = idx === (currentIndex - 1 + CERTS.length) % CERTS.length;
              const isNext = idx === (currentIndex + 1) % CERTS.length;

              if (!isActive && !isPrev && !isNext) return null;

              let x = 0;
              let z = 0;
              let rotateY = 0;
              let opacity = 1;
              let scale = 1;
              let zIndex = 0;

              if (isActive) {
                x = 0; z = 50; rotateY = 0; scale = 1; opacity = 1; zIndex = 20;
              } else if (isPrev) {
                x = -200; z = -100; rotateY = 30; scale = 0.8; opacity = 1; zIndex = 10;
              } else if (isNext) {
                x = 200; z = -100; rotateY = -30; scale = 0.8; opacity = 1; zIndex = 10;
              }

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0 }}
                  animate={{ x, z, rotateY, scale, opacity, zIndex }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
                  className="absolute w-full max-w-md"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className={`glass-card p-8 border ${isActive ? 'border-electric-cyan/50 shadow-[0_0_30px_rgba(0,229,255,0.2)]' : 'border-white/10'} h-full flex flex-col`}>
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-white/5 rounded-full">
                        <ShieldCheck className="text-electric-cyan" size={32} />
                      </div>
                      <span className="text-xs font-mono text-neon-purple bg-neon-purple/10 px-3 py-1 rounded-full">
                        {cert.category}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">{cert.title}</h3>
                    <p className="text-electric-cyan text-sm mb-4 font-semibold">{cert.org}</p>
                    
                    <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center text-sm">
                      <div className="text-gray-400">
                        <p>Issued: {cert.date}</p>
                        <p className="font-mono text-xs mt-1 opacity-70">ID: {cert.id}</p>
                      </div>
                      
                      <button className="flex items-center gap-2 text-white hover:text-electric-cyan transition-colors">
                        Verify <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 md:px-0 pointer-events-none z-20">
            <button onClick={prev} className="pointer-events-auto p-3 rounded-full glass hover:bg-white/10 transition-colors text-white transform -translate-x-full md:-translate-x-12">
              <ChevronLeft size={24} />
            </button>
            <button onClick={next} className="pointer-events-auto p-3 rounded-full glass hover:bg-white/10 transition-colors text-white transform translate-x-full md:translate-x-12">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}