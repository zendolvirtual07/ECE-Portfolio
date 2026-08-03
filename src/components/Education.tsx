'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar } from 'lucide-react';

const SUBJECTS = [
  "Digital Electronics", "Microprocessors", "VLSI", "Communication Systems",
  "Control Systems", "Signal Processing", "Embedded Systems", "Wireless Communication"
];

export default function Education() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="education" className="py-24 relative z-10 bg-midnight-blue/20 border-y border-white/5">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">
            My <span className="neon-text">Education</span>
          </h2>
          <div className="w-24 h-1 bg-electric-cyan mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-electric-cyan/50 via-neon-purple/50 to-transparent -translate-x-1/2" />

          {/* Timeline Node */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex flex-col md:flex-row items-center w-full mb-12"
          >
            {/* Glowing Node */}
            <div className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-deep-black border-4 border-electric-cyan neon-glow -translate-x-1/2 z-10" />

            {/* Left Side: College Info */}
            <div className="ml-12 md:ml-0 md:w-1/2 md:pr-16 text-left md:text-right w-full">
              <h3 className="text-2xl font-bold text-white mb-2">B.Tech Electronics & Communication Engineering</h3>
              <div className="flex items-center md:justify-end gap-2 text-electric-cyan mb-2">
                <GraduationCap size={18} />
                <span className="font-semibold">Methodist College of Engineering and Technology</span>
              </div>
              <div className="flex items-center md:justify-end gap-2 text-gray-400">
                <Calendar size={16} />
                <span>2020 - 2024</span>
              </div>
            </div>

            {/* Right Side: Subjects */}
            <div className="ml-12 md:ml-0 md:w-1/2 md:pl-16 mt-6 md:mt-0 w-full">
              <div className="glass p-6 rounded-2xl relative group hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <h4 className="text-lg font-semibold text-white mb-4 font-sora">Core Subjects</h4>
                <div className="flex flex-wrap gap-2">
                  {SUBJECTS.map((sub, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1.5 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-gray-300 hover:text-electric-cyan hover:border-electric-cyan/50 transition-colors shadow-sm"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}