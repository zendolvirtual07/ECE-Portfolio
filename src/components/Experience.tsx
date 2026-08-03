'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Presentation, Cpu, ChevronDown } from 'lucide-react';

const EXPERIENCES = [
  {
    role: "ES - IoT Intern (Electronic System & Internet of Things)",
    company: "Pragyatmika",
    duration: "2023 - Present",
    icon: Cpu,
    tasks: [
      "Architected and validated firmware routines for intelligent sensor monitoring endpoints utilizing low-power embedded C/C++ architectures.",
      "Engineered custom interfacing electronics and rigorously tested hardware communication buses (I2C, SPI, UART, RS485/Modbus) across multi-node wireless networks.",
      "Assisted in full-cycle hardware prototyping—spanning from initial circuit simulation and schematic capture to physical component assembly and empirical calibration."
    ],
    tech: ["C/C++ Firmware", "Embedded SOCs", "I2C / SPI / UART", "Wireless Networks", "Hardware Validation"]
  },
  {
    role: "Industrial Trainer - IoT, Embedded Systems & AI Automation",
    company: "Pragyatmika",
    duration: "2024 - Present",
    icon: Briefcase,
    tasks: [
      "Directed industrial training bootcamps and specialized engineering programs in Embedded Systems, Industrial IoT, AI edge computing, and industrial automation.",
      "Formulated comprehensive hands-on curriculums bridging ARM & ESP32 microcontroller firmware development with real-time cloud telemetry and predictive AI model execution on edge devices.",
      "Mentored engineering cohorts in designing automation control loops, precision sensor integration, and secure MQTT/WebSocket communication network topologies."
    ],
    tech: ["Industrial IoT", "Edge AI", "Industrial Automation", "Python", "MQTT / WebSockets", "ESP32 & ARM"]
  },
  {
    role: "Webinar Conductor & Prototyping Mentor",
    company: "College Engineering Outreach",
    duration: "2023 - Present",
    icon: Presentation,
    tasks: [
      "Conducted interactive nationwide engineering technical webinars addressing full-stack hardware and cloud IoT rapid prototyping strategies for college major project students.",
      "Demonstrated end-to-end system architectures, guiding students through PCB layout considerations, sensor calibration, and integrating real-time web dashboards.",
      "Provided customized architectural debugging and schematic guidance to student consortiums building autonomous robotic and wireless capstone innovations."
    ],
    tech: ["Rapid Prototyping", "Major Project Mentorship", "Technical Webinars", "Cloud Architectures", "System Debugging"]
  }
];

function ExperienceCard({ 
  exp, 
  idx, 
  inView, 
  isOpen, 
  onToggle 
}: { 
  exp: typeof EXPERIENCES[0]; 
  idx: number; 
  inView: boolean; 
  isOpen: boolean; 
  onToggle: () => void; 
}) {
  const Icon = exp.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: idx * 0.15 }}
      onClick={onToggle}
      className="glass-card p-6 md:p-8 cursor-pointer hover:border-electric-cyan/40 transition-all duration-300 group relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-electric-cyan to-neon-purple opacity-75 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-deep-black/90 border border-white/10 flex items-center justify-center group-hover:border-electric-cyan/60 group-hover:bg-electric-cyan/10 transition-colors shadow-lg flex-shrink-0">
            <Icon className="text-electric-cyan" size={28} />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-electric-cyan transition-colors">{exp.role}</h3>
            <p className="text-purple-400 font-semibold text-sm md:text-base">{exp.company}</p>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
          <span className="text-gray-300 text-xs md:text-sm font-mono bg-white/5 px-4 py-1.5 rounded-full border border-white/10 shadow-inner">
            {exp.duration}
          </span>
          <div className="flex items-center gap-1 text-electric-cyan font-semibold text-xs uppercase tracking-wider bg-electric-cyan/10 px-3 py-1.5 rounded-lg border border-electric-cyan/20">
            <span>{isOpen ? "Hide Details" : "View Details"}</span>
            <ChevronDown size={16} className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-6 mt-6 border-t border-white/10">
              <h4 className="text-xs uppercase text-gray-400 font-mono mb-3 tracking-wider">Key Responsibilities & Engineering Milestones</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-2.5 mb-6 text-sm md:text-base leading-relaxed">
                {exp.tasks.map((task, i) => (
                  <li key={i} className="pl-1 hover:text-white transition-colors">{task}</li>
                ))}
              </ul>
              
              <h4 className="text-xs uppercase text-gray-400 font-mono mb-2.5 tracking-wider">Applied Technology & Protocols</h4>
              <div className="flex flex-wrap gap-2">
                {exp.tech.map(tech => (
                  <span key={tech} className="px-3 py-1 text-xs font-mono bg-electric-cyan/15 text-electric-cyan border border-electric-cyan/30 rounded-full font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="experience" className="py-24 relative z-10 bg-midnight-blue/20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">
            Professional <span className="neon-text">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-electric-cyan mx-auto rounded-full mb-4" />
          <p className="text-gray-400 text-sm md:text-base">Click on any role to expand engineering responsibilities & tech specifications</p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {EXPERIENCES.map((exp, idx) => (
            <ExperienceCard 
              key={idx} 
              exp={exp} 
              idx={idx} 
              inView={inView} 
              isOpen={openIdx === idx}
              onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}