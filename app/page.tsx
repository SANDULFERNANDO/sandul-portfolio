import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SkillsMarquee from '@/components/SkillsMarquee';
import Work from '@/components/Work';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';

export default function Home() {
  return (
    <>
      {/* Custom cursor — renders above everything, client-only */}
      <CustomCursor />

      <main>
        <Navbar />
        <Hero />

        {/* Skills marquee — full-width strip between hero and work */}
        <SkillsMarquee />

        <Work />

        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ height: '1px', background: 'var(--card-border)' }} />
        </div>

        <About />

        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ height: '1px', background: 'var(--card-border)' }} />
        </div>

        <Contact />
        <Footer />
      </main>
    </>
  );
}
