import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAPABILITY_DOMAINS, NAV_SECTIONS } from './data/portfolioData';
import { CoreSimulationState, SectionId } from './types/portfolio';
import { IntroLoader } from './components/IntroLoader';
import { Navbar } from './components/Navbar';
import { VerificationCoreScene } from './components/canvas/VerificationCoreScene';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { CapabilitiesSection } from './components/sections/CapabilitiesSection';
import { AutomationLabSection } from './components/sections/AutomationLabSection';
import { AiEngineeringSection } from './components/sections/AiEngineeringSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { EducationSection } from './components/sections/EducationSection';
import { ContactSection } from './components/sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

const SECTION_DEFAULT_SIMULATION: Record<SectionId, CoreSimulationState> = {
  hero: 'nominal',
  about: 'nominal',
  capabilities: 'nominal',
  'automation-lab': 'executing',
  'ai-engineering': 'ai_synthesis',
  experience: 'nominal',
  education: 'nominal',
  contact: 'nominal',
};

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeCapabilityId, setActiveCapabilityId] = useState<string>(
    CAPABILITY_DOMAINS[0].id
  );
  const [simulationState, setSimulationState] =
    useState<CoreSimulationState>('nominal');
  const [inspectMode, setInspectMode] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const mainRef = useRef<HTMLElement>(null);

  // Detect OS prefers-reduced-motion changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Escape key exits 3D orbit inspect mode
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && inspectMode) {
        setInspectMode(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [inspectMode]);

  // Global scroll progress & GSAP ScrollTrigger section choreography
  useEffect(() => {
    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
      setScrollProgress(ratio);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const ctx = gsap.context(() => {
      NAV_SECTIONS.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: 'top 52%',
          end: 'bottom 48%',
          onEnter: () => {
            setActiveSection(sec.id);
            setSimulationState(SECTION_DEFAULT_SIMULATION[sec.id]);
          },
          onEnterBack: () => {
            setActiveSection(sec.id);
            setSimulationState(SECTION_DEFAULT_SIMULATION[sec.id]);
          },
        });

        if (!reducedMotion) {
          const headerEl = el.querySelector('.section-header');
          if (headerEl) {
            gsap.fromTo(
              headerEl,
              { opacity: 0.25, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 82%',
                  toggleActions: 'play none none none',
                },
              }
            );
          }
        }
      });
    }, mainRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, [reducedMotion]);

  const handleNavigate = useCallback((id: SectionId) => {
    setInspectMode(false);
    setActiveSection(id);
    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  }, [reducedMotion]);

  const handleSelectCapability = useCallback((domainId: string) => {
    setActiveCapabilityId(domainId);
  }, []);

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {!isLoaded && <IntroLoader onComplete={() => setIsLoaded(true)} />}

      {/* Fixed Real-Time 3D WebGL Environment */}
      <VerificationCoreScene
        activeSection={activeSection}
        scrollProgress={scrollProgress}
        activeCapabilityId={activeCapabilityId}
        onSelectCapability={handleSelectCapability}
        simulationState={simulationState}
        inspectMode={inspectMode}
        reducedMotion={reducedMotion}
      />

      {/* Persistent Telemetry HUD Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        inspectMode={inspectMode}
        onToggleInspect={() => setInspectMode((prev) => !prev)}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion((prev) => !prev)}
        simulationState={simulationState}
      />

      {/* Interactive 3D Orbit Mode Floating Banner */}
      {inspectMode && (
        <div className="orbit-mode-banner" role="status" aria-live="polite">
          <span>
            <strong>3D ORBIT INSPECTION ACTIVE:</strong> Drag to rotate • Scroll to zoom • Click any
            orbital satellite node
          </span>
          <button
            type="button"
            onClick={() => setInspectMode(false)}
            className="orbit-mode-banner__exit"
          >
            RETURN TO SCROLL STORYTELLING (ESC)
          </button>
        </div>
      )}

      {/* Scroll-Driven Storytelling DOM Overlay */}
      <main
        id="main-content"
        ref={mainRef}
        className={`portfolio-main ${inspectMode ? 'portfolio-main--inspect-dim' : ''}`}
      >
        <HeroSection
          simulationState={simulationState}
          onChangeSimulationState={setSimulationState}
          inspectMode={inspectMode}
          onToggleInspect={() => setInspectMode((prev) => !prev)}
          onNavigate={handleNavigate}
        />

        <AboutSection onChangeSimulationState={setSimulationState} />

        <CapabilitiesSection
          activeCapabilityId={activeCapabilityId}
          onSelectCapability={handleSelectCapability}
        />

        <AutomationLabSection onChangeSimulationState={setSimulationState} />

        <AiEngineeringSection onChangeSimulationState={setSimulationState} />

        <ExperienceSection />

        <EducationSection />

        <ContactSection />
      </main>
    </div>
  );
};

export default App;
