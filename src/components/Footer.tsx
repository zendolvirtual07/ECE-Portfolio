export default function Footer() {
  return (
    <footer className="py-8 bg-deep-black border-t border-white/10 relative z-10">
      <div className="container mx-auto px-4 text-center flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 font-medium">
          &copy; {new Date().getFullYear()} Sri Shesha Sai Bingi. All rights reserved.
        </p>
        <p className="text-gray-500 text-sm font-mono bg-white/5 px-4 py-2 rounded-full">
          Designed & Built with <span className="text-electric-cyan">Next.js</span> and <span className="text-neon-purple">Three.js</span>
        </p>
      </div>
    </footer>
  );
}