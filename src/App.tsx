import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CHAPTERS } from './data/portfolioData';
import { CapabilityId, ChapterId } from './types/portfolio';
import { IntroLoader } from './components/IntroLoader';
import { Navbar } from './components/Navbar';
import { VerificationCoreScene } from './components/canvas/VerificationCoreScene';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { CapabilitiesSection } from './components/sections/CapabilitiesSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ContactSection } from './components/sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [activeChapter, setActiveChapter] = useState<ChapterId>('introduction');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activePlatformIndex, setActivePlatformIndex] = useState<number>(0);
  const [activeCapabilityId, setActiveCapabilityId] =
    useState<CapabilityId>('quality-engineering');
  const [activeLensIndex, setActiveLensIndex] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const offsets = CHAPTERS.map((ch) => {
        const el = document.getElementById(ch.id);
        return el ? el.offsetTop : 0;
      });
      const n = offsets.length - 1;
      if (n <= 0) {
        setScrollProgress(0);
        return;
      }
      if (y <= offsets[0]) {
        setScrollProgress(0);
        return;
      }
      if (y >= offsets[n]) {
        setScrollProgress(1);
        return;
      }
      for (let i = 0; i < n; i++) {
        if (y >= offsets[i] && y <= offsets[i + 1]) {
          const span = Math.max(1, offsets[i + 1] - offsets[i]);
          const local = (y - offsets[i]) / span;
          setScrollProgress((i + local) / n);
          return;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const ctx = gsap.context(() => {
      CHAPTERS.forEach((chapter) => {
        const el = document.getElementById(chapter.id);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActiveChapter(chapter.id),
          onEnterBack: () => setActiveChapter(chapter.id),
        });

        if (!reducedMotion) {
          gsap.fromTo(
            el.querySelectorAll('.chapter-title, .hero-chapter__headline'),
            { opacity: 0.15, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, mainRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, [reducedMotion]);

  const handleNavigate = useCallback(
    (id: ChapterId) => {
      setActiveChapter(id);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    },
    [reducedMotion]
  );

  return (
    <div className="atelier-app">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {!isLoaded && <IntroLoader onComplete={() => setIsLoaded(true)} />}

      {/* Full-Screen Sculptural 3D World */}
      <VerificationCoreScene
        activeChapter={activeChapter}
        scrollProgress={scrollProgress}
        activePlatformIndex={activePlatformIndex}
        activeCapabilityId={activeCapabilityId}
        activeLensIndex={activeLensIndex}
        reducedMotion={reducedMotion}
      />

      {/* Minimal Floating Navigation */}
      <Navbar activeChapter={activeChapter} onNavigate={handleNavigate} />

      {/* Five Spatial Storytelling Chapters */}
      <main id="main-content" ref={mainRef} className="atelier-main">
        <HeroSection onNavigate={handleNavigate} />

        <AboutSection
          activePlatformIndex={activePlatformIndex}
          onSelectPlatform={setActivePlatformIndex}
        />

        <CapabilitiesSection
          activeCapabilityId={activeCapabilityId}
          onSelectCapability={setActiveCapabilityId}
          activeLensIndex={activeLensIndex}
          onSelectLens={setActiveLensIndex}
        />

        <ExperienceSection />

        <ContactSection />
      </main>
    </div>
  );
};

export default App;
