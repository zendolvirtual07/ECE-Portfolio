'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cpu, Wifi, Maximize, Zap, Monitor, Code2 } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const SERVICES = [
  { title: "Embedded Systems", desc: "Custom firmware development for microcontrollers including ARM, AVR, and PIC architectures.", icon: Cpu, color: "text-electric-cyan" },
  { title: "IoT Solutions", desc: "End-to-end IoT architecture from sensor data acquisition to cloud dashboard integration.", icon: Wifi, color: "text-neon-purple" },
  { title: "PCB Design", desc: "Schematic capture and multi-layer PCB layout ensuring EMI/EMC compliance and signal integrity.", icon: Maximize, color: "text-neon-green" },
  { title: "Electronics Prototyping", desc: "Rapid prototyping of electronic circuits, hardware debugging, and validation.", icon: Zap, color: "text-soft-blue" },
  { title: "Web Development", desc: "Responsive and interactive web applications using modern stacks like React and Next.js.", icon: Monitor, color: "text-white" },
  { title: "Python Programming", desc: "Data analysis, automation scripts, and backend API development.", icon: Code2, color: "text-electric-cyan" },
];

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" className="py-24 relative z-10 bg-midnight-blue/20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">
            My <span className="neon-text">Services</span>
          </h2>
          <div className="w-24 h-1 bg-electric-cyan mx-auto rounded-full mb-8" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full"
              >
                <Tilt
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  glareEnable={true}
                  glareMaxOpacity={0.15}
                  glareColor="#00E5FF"
                  glarePosition="all"
                  className="h-full"
                >
                  <div className="glass-card p-8 h-full flex flex-col items-center text-center group border-t-2 border-t-transparent hover:border-t-electric-cyan transition-colors">
                    <div className="w-20 h-20 rounded-2xl bg-deep-black border border-white/10 flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                      <Icon className={`${service.color} group-hover:animate-pulse`} size={40} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}