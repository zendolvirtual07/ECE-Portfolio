'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  { text: "An exceptional student with a deep understanding of embedded systems and a rare talent for problem-solving.", author: "Dr. Robert Chen", role: "Professor, ECE Dept" },
  { text: "Delivered our IoT dashboard ahead of schedule with flawless execution. The custom firmware was highly optimized.", author: "Sarah Jenkins", role: "CEO, TechStart" },
  { text: "One of the best hardware designers I've worked with. The PCB designs were clean, efficient, and ready for manufacturing.", author: "Michael Chang", role: "Lead Engineer" },
  { text: "Outstanding leadership in the robotics club. Led the team to victory with innovative control algorithms.", author: "Prof. Alan Smith", role: "Robotics Advisor" },
];

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="testimonials" className="py-24 relative z-10 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">
            What People <span className="neon-text">Say</span>
          </h2>
          <div className="w-24 h-1 bg-electric-cyan mx-auto rounded-full mb-8" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-8 relative group"
            >
              <Quote className="absolute top-4 right-4 text-white/5 group-hover:text-electric-cyan/20 transition-colors" size={60} />
              <p className="text-gray-300 italic mb-6 relative z-10 text-lg leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-electric-cyan/20 border border-electric-cyan/50 flex items-center justify-center font-bold text-electric-cyan">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.author}</h4>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}