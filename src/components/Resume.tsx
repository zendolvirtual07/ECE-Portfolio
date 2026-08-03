'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, Download, ExternalLink } from 'lucide-react';

export default function Resume() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="resume" className="py-24 relative z-10" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">
            My <span className="neon-text">Resume</span>
          </h2>
          <div className="w-24 h-1 bg-electric-cyan mx-auto rounded-full mb-8" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 md:p-12 relative overflow-hidden group"
          >
            {/* Animated paper effect background using CSS pattern */}
            <div className="absolute inset-0 opacity-10 mix-blend-overlay group-hover:opacity-20 transition-opacity bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-24 h-24 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center mb-6 neon-glow">
                <FileText className="text-electric-cyan" size={48} />
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">Sri Shesha Sai Bingi - CV</h3>
              <p className="text-gray-400 mb-8 max-w-lg">
                View my complete professional history, educational background, technical skills, and project portfolio in my detailed resume.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-electric-cyan text-deep-black font-bold rounded-full hover:shadow-[0_0_20px_#00E5FF] transition-all w-full sm:w-auto"
                >
                  <Download size={20} />
                  Download PDF
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all border border-white/20 w-full sm:w-auto"
                >
                  <ExternalLink size={20} />
                  View Online
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}