import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Achievements from '@/components/Achievements';
import Experience from '@/components/Experience';
import Resume from '@/components/Resume';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import GlobalCanvas from '@/components/GlobalCanvas';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <GlobalCanvas />
      
      <main className="relative z-10 w-full flex flex-col">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Certifications />
        <Achievements />
        <Experience />
        <Resume />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      
      <Footer />
    </SmoothScroll>
  );
}