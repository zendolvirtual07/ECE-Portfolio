'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { ExternalLink, Code, ChevronDown } from 'lucide-react';

const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.3 5.3 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.5 5 1.9 5 1.9a5.3 5.3 0 0 0-.1 3.8A5.4 5.4 0 0 0 3 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path></svg>;

const CATEGORIES = ["All", "Embedded Systems", "IoT", "Robotics", "Communication", "Software"];

const PROJECTS = [
  {
    title: "Bike Infotainment & Telemetry System",
    category: "Embedded Systems",
    description: "An advanced multi-modal dashboard designed for motorcycles, utilizing a Raspberry Pi 4B integrated with high-speed CAN-FD bus controllers and IoT electronics to stream real-time engine ECU diagnostics, navigation maps, and media controls via a sleek web app interface.",
    stack: ["Raspberry Pi 4B", "CAN-FD Bus", "IoT Electronics", "Next.js", "WebSockets", "Python"],
    github: "#",
    live: "#"
  },
  {
    title: "All-Wheel Drive (AWD) Autonomous Vehicle",
    category: "Robotics",
    description: "A robust 4-wheel drive autonomous navigation rover powered by dual ESP32 microcontrollers. Features an engineered fully custom PCB design incorporating high-current H-bridge motor drivers, LiDAR obstacle avoidance algorithms, optical encoders, and internal inertial sensors.",
    stack: ["ESP32", "Custom PCB Design", "LiDAR", "Motor Drivers", "C++", "FreeRTOS"],
    github: "#",
    live: "#"
  },
  {
    title: "Gesture Controlled Robotic Arm",
    category: "Robotics",
    description: "A precise multi-axis robotic arm governed by real-time human hand motion tracking. Engineered using an intelligent wearable glove equipped with precision flex sensors and 6-axis MPU6050 gyroscopes/accelerometers, transmitting wireless kinematics over low-latency Bluetooth RF telemetry.",
    stack: ["Flex Sensors", "MPU6050 Gyroscope", "Bluetooth RF", "Servo Motor Drivers", "Arduino", "Embedded C"],
    github: "#",
    live: "#"
  },
  {
    title: "House Inverter Telemetry over RS485 & Cloud Analytics",
    category: "IoT",
    description: "An enterprise-grade smart energy monitoring gateway that reads live solar and hybrid house inverter registers using Modbus RTU protocol over industrial RS485 differential signaling. Powered by a NodeMCU, it pushes granular voltage, current, and grid frequency metrics to a cloud infrastructure for multi-device inspection.",
    stack: ["NodeMCU", "RS485 Modbus", "Cloud IoT Analytics", "REST APIs", "Time-Series DB", "C++"],
    github: "#",
    live: "#"
  },
  {
    title: "Bluetooth Controlled & Professional Line-Following Race Car",
    category: "Robotics",
    description: "A purpose-built competitive racing robot designed for professional high-speed line-tracking tournaments. Implements continuous real-time PID control loop algorithms scanning an array of high-sensitivity infrared reflectance sensors, complemented by a secondary wireless override mode over Bluetooth.",
    stack: ["PID Control Algorithms", "IR Sensor Arrays", "Bluetooth RF", "PWM Speed Tuning", "C++", "Altium Designer"],
    github: "#",
    live: "#"
  },
  {
    title: "Open Source MQTT Custom Local Hosting Dashboard",
    category: "Software",
    description: "A zero-dependency self-hosted IoT automation and visualization server created for localized telemetry monitoring. Integrates an optimized custom-built MQTT message broker and responsive web dashboard featuring live streaming charts, actuation controls, and local network encrypted privacy.",
    stack: ["MQTT Broker", "Local Hosting", "WebSockets", "Node.js", "Express", "Chart.js"],
    github: "#",
    live: "#"
  },
  {
    title: "Multi-Platform Gesture Control Air Mouse",
    category: "Embedded Systems",
    description: "A wireless driver-free inertial Human Interface Device (HID) empowering intuitive spatial hand motion tracking for computer desktop interaction. Operates seamlessly across Windows, Linux, and iOS/macOS machines utilizing advanced quaternion-based MPU6050 sensor fusion and Bluetooth Low Energy (BLE) protocol stacks.",
    stack: ["Sensor Fusion (IMU)", "Bluetooth Low Energy (BLE)", "HID Protocol", "Windows/Linux/iOS", "ESP32-C3", "C++"],
    github: "#",
    live: "#"
  },
  {
    title: "WSN (Wireless Sensor Network) for Plant Nurseries",
    category: "Communication",
    description: "A self-healing distributed agricultural mesh sensor topology deployed across extensive greenhouse facilities. Nodes communicate precision soil moisture, ambient humidity, and photosynthetically active radiation (PAR) levels via low-power sub-GHz RF transceivers to an automated watering hub.",
    stack: ["LoRa Mesh / RF", "WSN Protocols", "Low-Power ARM", "Soil Moisture Sensors", "C"],
    github: "#",
    live: "#"
  },
  {
    title: "Smart Home Automation System",
    category: "IoT",
    description: "A centralized IoT-based residential automation system using ESP32 microcontrollers, allowing instant remote scheduling, load profiling, and control of AC household appliances through an encrypted responsive web dashboard.",
    stack: ["ESP32", "React", "Node.js", "MQTT", "SSR Relays"],
    github: "#",
    live: "#"
  },
  {
    title: "IoT Weather Monitoring Station",
    category: "IoT",
    description: "A remote observation tower collecting real-time atmospheric pressure, ambient temperature, UV indexing, and relative humidity data, transmitting encrypted diagnostic telemetry to cloud databases for forecasting modeling.",
    stack: ["Raspberry Pi", "Python", "AWS IoT", "BME280 / UV Sensors"],
    github: "#",
    live: "#"
  },
  {
    title: "Automatic Street Light Conservation System",
    category: "Embedded Systems",
    description: "An adaptive urban lighting power-saving installation that intelligently scales illumination lumens using solid-state PWM dimming, analyzing ambient lux levels and vehicle approach trajectories via Doppler radar/PIR motion sensing logic.",
    stack: ["Arduino", "PWM Dimming", "LDR", "PIR / Radar", "C++"],
    github: "#",
    live: "#"
  },
  {
    title: "3D Interactive Engineering Portfolio",
    category: "Software",
    description: "This ultra-premium 3D responsive portfolio website featuring real-time WebGL interactive circuitry simulations, floating skill galaxies, and modern high-contrast glassmorphism design architecture.",
    stack: ["Next.js", "React Three Fiber", "Three.js", "TailwindCSS", "Framer Motion"],
    github: "#",
    live: "#"
  }
];

function ProjectCard({ 
  project, 
  isOpen, 
  onToggle 
}: { 
  project: typeof PROJECTS[0]; 
  isOpen: boolean; 
  onToggle: () => void; 
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      <Tilt
        tiltMaxAngleX={7}
        tiltMaxAngleY={7}
        glareEnable={true}
        glareMaxOpacity={0.08}
        glareColor="#00E5FF"
        glarePosition="all"
      >
        <div 
          onClick={onToggle}
          className="glass-card p-6 min-h-[220px] flex flex-col justify-between group relative overflow-hidden cursor-pointer hover:border-electric-cyan/40 transition-all duration-300 shadow-lg"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-cyan to-neon-purple transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          
          <div>
            <div className="flex justify-between items-start mb-3" onClick={(e) => e.stopPropagation()}>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover:border-electric-cyan/50 transition-colors">
                <Code className="text-electric-cyan" size={22} />
              </div>
              <div className="flex gap-3">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-1">
                  <GithubIcon />
                </a>
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-electric-cyan transition-colors p-1">
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
            
            <span className="text-xs text-purple-400 font-bold mb-1 uppercase tracking-wider block">{project.category}</span>
            <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-electric-cyan transition-colors mb-2">{project.title}</h3>
          </div>
          
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-electric-cyan font-mono tracking-wide group-hover:text-white transition-colors">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
              {isOpen ? "Close Specifications" : "View Specifications & Tech"}
            </span>
            <ChevronDown size={16} className={`transform transition-transform duration-300 ${isOpen ? "rotate-180 text-white" : "text-electric-cyan"}`} />
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden mt-3 pt-3 border-t border-white/10 text-left"
              >
                <p className="text-gray-300 text-sm mb-4 leading-relaxed bg-black/30 p-3.5 rounded-xl border-l-2 border-electric-cyan/60">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map(tech => (
                    <span key={tech} className="text-xs font-mono font-semibold text-electric-cyan bg-electric-cyan/15 px-2.5 py-1 rounded-md border border-electric-cyan/30 shadow-inner">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Tilt>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filteredProjects = activeCategory === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  // Show only 6 projects by default unless showAll is active
  const displayProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="py-24 relative z-10" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">
            Featured <span className="neon-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-electric-cyan mx-auto rounded-full mb-4" />
          <p className="text-gray-400 text-sm md:text-base mb-8">Click any project card to open engineering descriptions & architecture stack</p>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowAll(false); // Reset expansion when changing category
                  setExpandedProject(null); // Close any expanded card
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-electric-cyan text-deep-black shadow-[0_0_15px_#00E5FF]' 
                    : 'glass text-gray-300 hover:text-white hover:border-electric-cyan/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid with items-start to prevent awkward row height stretching */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          <AnimatePresence>
            {displayProjects.map((project) => (
              <ProjectCard 
                key={project.title} 
                project={project} 
                isOpen={expandedProject === project.title}
                onToggle={() => setExpandedProject(expandedProject === project.title ? null : project.title)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects Button */}
        {filteredProjects.length > 6 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 flex justify-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="relative group px-1 rounded-full p-[2px] font-heading overflow-hidden transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:shadow-[0_0_45px_rgba(0,229,255,0.7)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan via-neon-purple to-electric-cyan opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="relative px-8 py-3.5 bg-deep-black/95 rounded-full flex items-center justify-center gap-3 transition-all duration-300 group-hover:bg-deep-black/80">
                <span className="text-electric-cyan font-mono font-extrabold text-lg transition-transform duration-300 group-hover:-translate-x-1.5">⟨</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-electric-cyan to-white font-extrabold tracking-widest uppercase text-sm md:text-base drop-shadow-[0_0_8px_rgba(0,229,255,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(0,229,255,0.9)] transition-all">
                  {showAll ? "View Less Projects" : "View All Projects"}
                </span>
                <span className="text-electric-cyan font-mono font-extrabold text-lg transition-transform duration-300 group-hover:translate-x-1.5">⟩</span>
              </div>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}