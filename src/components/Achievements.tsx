'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Medal, Star, Presentation, Users, BookOpen, Award } from 'lucide-react';

const ACHIEVEMENTS = [
  { title: "1st Prize, Osmania IIoT Workshop", icon: Trophy, desc: "Received the prestigious Certificate of Merit for standout engineering design in Industrial IoT.", color: "text-electric-cyan" },
  { title: "Best Paper Award", icon: Presentation, desc: "IEEE Conference on Wireless Communications.", color: "text-neon-purple" },
  { title: "Robotics Competition Winner", icon: Medal, desc: "Line follower and maze solver robot.", color: "text-neon-green" },
  { title: "Faculty, C-DAC Drone Program", icon: Users, desc: "Served as resource training faculty for the C-DAC Drone Development Program at Stanley College of Engineering and Technology.", color: "text-soft-blue" },
  { title: "Ramanujan Maths 1st Place Award", icon: Award, desc: "First place in Ramanujan mathematics competition in district level.", color: "text-white" },
  { title: "Workshop Co-Facilitator", icon: BookOpen, desc: "Organized multiple 2-3 days workshops on Embedded system and IIoT in the past year", color: "text-electric-cyan" },
];

export default function Achievements() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="achievements" className="py-24 relative z-10" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">
            Key <span className="neon-text">Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-electric-cyan mx-auto rounded-full mb-8" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {ACHIEVEMENTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-card p-6 flex flex-col items-center text-center group relative overflow-hidden"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative mb-6 p-4 rounded-full bg-midnight-blue border border-white/10 group-hover:border-electric-cyan/50 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all">
                  <Icon className={`${item.color} group-hover:scale-110 transition-transform relative z-10`} size={40} />
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-electric-cyan" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}