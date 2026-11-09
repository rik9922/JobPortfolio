import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { PAGES, PageId, isPageId } from './data/pages';
import { Loader } from './components/Loader';
import { Nav } from './components/Nav';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { CapabilitiesPage } from './components/pages/CapabilitiesPage';
import { JourneyPage } from './components/pages/JourneyPage';
import { PlayPage } from './components/pages/PlayPage';
import { ContactPage } from './components/pages/ContactPage';

const initialPage = (): PageId => {
  const hash = window.location.hash.replace('#', '');
  return isPageId(hash) ? hash : 'home';
};

const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState<PageId>(initialPage);
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const busy = useRef(false);
  const curtain = useRef<HTMLDivElement>(null);
  const curtainLabel = useRef<HTMLSpanElement>(null);
  const pageRef = useRef(page);
  pageRef.current = page;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const handleLoaded = useCallback(() => setLoaded(true), []);

  const navigate = useCallback(
    (id: PageId) => {
      if (busy.current || id === pageRef.current) return;
      const swap = () => {
        setPage(id);
        window.history.replaceState(null, '', `#${id}`);
        window.scrollTo(0, 0);
      };
      if (reduced || !curtain.current) {
        swap();
        return;
      }
      busy.current = true;
      if (curtainLabel.current) {
        curtainLabel.current.textContent = PAGES.find((p) => p.id === id)?.label ?? '';
      }
      gsap
        .timeline({
          onComplete: () => {
            busy.current = false;
          },
        })
        .set(curtain.current, { yPercent: 100, display: 'flex' })
        .to(curtain.current, { yPercent: 0, duration: 0.65, ease: 'power4.inOut' })
        .call(swap)
        .to({}, { duration: 0.2 })
        .to(curtain.current, { yPercent: -100, duration: 0.65, ease: 'power4.inOut' })
        .set(curtain.current, { display: 'none' });
    },
    [reduced]
  );

  return (
    <div className="app">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {!loaded && <Loader onComplete={handleLoaded} />}

      {loaded && (
        <>
          <Nav active={page} onNavigate={navigate} />
          <main id="main" key={page} className="stage">
            {page === 'home' && <HomePage reduced={reduced} />}
            {page === 'about' && <AboutPage reduced={reduced} onNavigate={navigate} />}
            {page === 'capabilities' && <CapabilitiesPage reduced={reduced} />}
            {page === 'journey' && <JourneyPage />}
            {page === 'play' && <PlayPage reduced={reduced} />}
            {page === 'contact' && <ContactPage reduced={reduced} />}
          </main>
        </>
      )}

      <div ref={curtain} className="curtain" aria-hidden="true">
        <span ref={curtainLabel} />
      </div>
    </div>
  );
};

export default App;
