import React, { useRef, useState } from 'react';
import { ArrowUpRight, Download, Layers, RotateCw } from 'lucide-react';
import {
  EDUCATION_RECORD,
  EXPERIENCE_TIMELINE,
  PERSONAL_IDENTITY,
  PHILOSOPHY_CONTENT,
  PLATFORM_STRATA,
} from '../../data/portfolioData';
import { PageId } from '../../data/pages';
import { AboutStage } from '../canvas/AboutStage';

interface AboutPageProps {
  reduced?: boolean;
  onNavigate?: (id: PageId) => void;
}

const MARQUEE_ROW_1 = [
  'Manual & Exploratory QA',
  'Java',
  'Selenium WebDriver',
  'TestNG',
  'Playwright (Java)',
  'Page Object Model',
  'Postman REST APIs',
  'SQL Data Integrity',
  'Regression & Smoke Suites',
  'Boundary & Negative Testing',
];

const MARQUEE_ROW_2 = [
  'PHP & Laravel',
  'Ionic PWA',
  'Web Applications',
  'Android & iOS QA',
  'Spring Boot & Hibernate/JPA',
  'OpenAI Codex',
  'Antigravity',
  'Cursor',
  'Claude',
  'Jira & Agile / Scrum STLC',
];

interface NarrativeSegment {
  text: string;
  lens?: 'explore' | 'automate' | 'fullstack' | 'ai';
}

const NARRATIVE_SEGMENTS: NarrativeSegment[] = [
  { text: 'I engineer software quality by ' },
  {
    text: 'exploring application features and user workflows independently',
    lens: 'explore',
  },
  {
    text: ' across Web, Ionic PWA, Android, and iOS—uncovering positive, negative, and boundary behaviour before writing a single script. ',
    lens: 'explore',
  },
  {
    text: 'Every critical flow is verified end-to-end across ',
  },
  {
    text: 'Postman REST APIs (payloads, CRUD, HTTP status codes) and relational SQL databases',
    lens: 'fullstack',
  },
  { text: ', then structured into maintainable ' },
  {
    text: 'Java, Selenium WebDriver, TestNG, Maven, and Playwright automation suites',
    lens: 'automate',
  },
  { text: '. Alongside QA, I use ' },
  {
    text: 'OpenAI Codex, Antigravity, Cursor, and Claude to contribute directly to PHP/Laravel backend and Ionic PWA updates',
    lens: 'ai',
  },
  { text: '—always gating every change against real application behaviour.' },
];

const LENS_FILTERS: { id: 'all' | 'explore' | 'automate' | 'fullstack' | 'ai'; label: string }[] = [
  { id: 'all', label: 'Full Narrative' },
  { id: 'explore', label: '01 · Exploratory QA' },
  { id: 'fullstack', label: '02 · API & SQL Depth' },
  { id: 'automate', label: '03 · Java Automation' },
  { id: 'ai', label: '04 · AI + Dev Symbiosis' },
];

export const AboutPage: React.FC<AboutPageProps> = ({ reduced = false, onNavigate }) => {
  const [activePlatform, setActivePlatform] = useState(0);
  const [activeScreen, setActiveScreen] = useState(0);
  const [viewAngle, setViewAngle] = useState<'front' | 'side' | 'back' | 'free'>('front');
  const [autoSpin, setAutoSpin] = useState(false);
  const [viewMode, setViewMode] = useState<'all' | 'single'>('all');
  const [xrayFlipped, setXrayFlipped] = useState(false);
  const [activeLens, setActiveLens] = useState<'all' | 'explore' | 'automate' | 'fullstack' | 'ai'>('all');
  const [readProgress, setReadProgress] = useState(0.76);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--spot-x', `${x}px`);
    el.style.setProperty('--spot-y', `${y}px`);

    // Map cursor position across card to word illumination progress (like Reel 3 Intro card)
    const norm = Math.min(1, Math.max(0.25, (y / rect.height) * 0.75 + (x / rect.width) * 0.45));
    setReadProgress(norm);
  };

  // Flatten narrative into word tokens so each word illuminates smoothly like Reel 3 (f_07.png)
  const words = React.useMemo(() => {
    const list: { word: string; lens?: NarrativeSegment['lens'] }[] = [];
    NARRATIVE_SEGMENTS.forEach((seg) => {
      const parts = seg.text.split(/(\s+)/);
      parts.forEach((part) => {
        if (part.length > 0) {
          list.push({ word: part, lens: seg.lens });
        }
      });
    });
    return list;
  }, []);

  const currentPlatform = PLATFORM_STRATA[activePlatform] ?? PLATFORM_STRATA[0];

  return (
    <section className="page page--scroll about" aria-labelledby="about-title">
      {/* =====================================================================
          REEL 3 DUAL-ROW INFINITE SKILL MARQUEE TICKER (f_08.png)
          ===================================================================== */}
      <div className="about__ticker" aria-label="Core engineering and quality stack">
        <div className="about__ticker-track">
          {[...MARQUEE_ROW_1, ...MARQUEE_ROW_1].map((item, idx) => (
            <span key={`r1-${idx}`} className="about__ticker-item">
              <i className="about__ticker-dot" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
        <div className="about__ticker-track about__ticker-track--reverse">
          {[...MARQUEE_ROW_2, ...MARQUEE_ROW_2].map((item, idx) => (
            <span key={`r2-${idx}`} className="about__ticker-item">
              <i className="about__ticker-dot" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* =====================================================================
          REEL 3 INTRO SPLIT: Giant Chrome "Intro" + Cursor-Illuminated Bio
          ===================================================================== */}
      <div className="about__intro-split">
        <div className="about__intro-left">
          <p className="panel__eyebrow">02 · ABOUT ME</p>
          <h1 id="about-title" className="about__intro-word chrome">
            Intro
          </h1>
          <p className="about__intro-quote">“{PHILOSOPHY_CONTENT.headline}”</p>

          <div className="about__meta-strip">
            <div className="about__meta-item">
              <span>ROLE</span>
              <strong>{EXPERIENCE_TIMELINE.role}</strong>
              <em>{EXPERIENCE_TIMELINE.company}</em>
            </div>
            <div className="about__meta-divider" aria-hidden="true" />
            <div className="about__meta-item">
              <span>DEGREE</span>
              <strong>{EDUCATION_RECORD.degree}</strong>
              <em>
                {EDUCATION_RECORD.institution} · {EDUCATION_RECORD.score}
              </em>
            </div>
          </div>

          <div className="about__cta-row">
            {onNavigate && (
              <button
                type="button"
                className="btn btn--solid"
                onClick={() => onNavigate('capabilities')}
              >
                What I Can Do <ArrowUpRight size={15} />
              </button>
            )}
            {onNavigate && (
              <button
                type="button"
                className="btn btn--line"
                onClick={() => onNavigate('journey')}
              >
                Experience &amp; Journey <ArrowUpRight size={15} />
              </button>
            )}
            <a
              className="btn btn--line"
              href={PERSONAL_IDENTITY.resumeHref}
              download="Ritik_Thakre_Resume.pdf"
            >
              <Download size={15} /> Resume
            </a>
          </div>
        </div>

        <div className="about__intro-right">
          {/* Reel 3 Glassmorphic Cursor-Spotlight Narrative Card */}
          <div
            ref={cardRef}
            className="about__spotlight-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setReadProgress(1)}
          >
            <div className="about__lens-bar" role="group" aria-label="Highlight engineering lens">
              {LENS_FILTERS.map((lf) => (
                <button
                  key={lf.id}
                  type="button"
                  className={`about__lens-chip${activeLens === lf.id ? ' about__lens-chip--active' : ''}`}
                  onClick={() => setActiveLens(lf.id)}
                >
                  {lf.label}
                </button>
              ))}
            </div>

            <p className="about__illuminated-copy">
              {words.map((tok, i) => {
                const ratio = i / Math.max(1, words.length - 1);
                const isLitByCursor = activeLens === 'all' ? ratio <= readProgress : tok.lens === activeLens;
                const isAccent = activeLens !== 'all' && tok.lens === activeLens;
                return (
                  <span
                    key={i}
                    className={`about__word${isLitByCursor ? ' about__word--lit' : ''}${
                      isAccent ? ' about__word--accent' : ''
                    }`}
                  >
                    {tok.word}
                  </span>
                );
              })}
            </p>

            <div className="about__spotlight-foot">
              <span className="about__foot-hint">
                <i className="about__pulse-dot" /> MOVE CURSOR ACROSS TEXT OR SELECT A LENS TO ILLUMINATE
              </span>
              <span className="about__foot-loc">{PERSONAL_IDENTITY.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          REEL 2 + REEL 3 SYNTHESIS: Numbered 01-04 Rows + Seamless 3D Hardware Stage
          ===================================================================== */}
      <div className="about__stage-section">
        <div className="about__rows-col">
          <div className="about__section-head">
            <p className="panel__eyebrow">MULTI-PLATFORM ECOSYSTEM</p>
            <h2 className="about__section-title">Where I explore, automate &amp; build</h2>
          </div>

          <div className="rows" role="list" aria-label="Platforms">
            {PLATFORM_STRATA.map((p, i) => {
              const isSelected = activePlatform === i;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="listitem"
                  className={`row${isSelected ? ' row--active' : ''}`}
                  onMouseEnter={() => setActivePlatform(i)}
                  onFocus={() => setActivePlatform(i)}
                  onClick={() => setActivePlatform(i)}
                  aria-expanded={isSelected}
                >
                  <span className="row__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="row__main">
                    <span className="row__title">{p.title.toUpperCase()}</span>
                    <span className="row__sub">{p.subtitle}</span>
                    {isSelected && (
                      <span className="row__detail">
                        <span>{p.description}</span>
                        <span className="chips">
                          {p.focusAreas.map((f) => (
                            <em key={f}>{f}</em>
                          ))}
                        </span>
                      </span>
                    )}
                  </span>
                  <span className="row__arrow" aria-hidden="true">
                    ↗
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Seamless Borderless 3D Hardware Constellation (Reel 2 tactile 3D devices) */}
        <div className="about__canvas-col">
          <div className="about__canvas-toolbar">
            <div className="about__platform-Tabs" role="tablist" aria-label="3D Hardware Platform">
              <button
                type="button"
                className={`stage-btn${viewMode === 'all' ? ' stage-btn--active' : ''}`}
                onClick={() => {
                  setViewMode('all');
                  setAutoSpin(false);
                }}
              >
                ◫ View All 4
              </button>
              {PLATFORM_STRATA.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={viewMode === 'single' && activePlatform === idx}
                  className={`stage-btn${viewMode === 'single' && activePlatform === idx ? ' stage-btn--active' : ''}`}
                  onClick={() => {
                    setActivePlatform(idx);
                    setViewMode('single');
                    setViewAngle('front');
                  }}
                >
                  0{idx + 1} · {p.title.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Screen Selector for the Active Device */}
            <div className="about__screen-tabs" role="tablist" aria-label="Device Screens">
              <span className="about__screen-label">SCREEN:</span>
              {['01 · Dashboard', '02 · Automation', '03 · API & Data'].map((s, idx) => (
                <button
                  key={s}
                  type="button"
                  role="tab"
                  aria-selected={activeScreen === idx}
                  className={`stage-btn stage-btn--sm${activeScreen === idx ? ' stage-btn--active' : ''}`}
                  onClick={() => setActiveScreen(idx)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 360° Hardware Inspection Toolbar (Inspect Front, Rails, Backside & Cameras) */}
          <div className="about__inspect-toolbar">
            <span className="about__inspect-label">
              {viewMode === 'all' ? '360° INSPECT (TAP ANY):' : '360° INSPECT STUDIO:'}
            </span>
            <div className="about__inspect-btns">
              <button
                type="button"
                className={`stage-btn stage-btn--sm${viewMode === 'single' && viewAngle === 'front' && !autoSpin ? ' stage-btn--active' : ''}`}
                onClick={() => {
                  setViewMode('single');
                  setAutoSpin(false);
                  setViewAngle('front');
                }}
              >
                📱 Front Screen
              </button>
              <button
                type="button"
                className={`stage-btn stage-btn--sm${viewMode === 'single' && viewAngle === 'side' && !autoSpin ? ' stage-btn--active' : ''}`}
                onClick={() => {
                  setViewMode('single');
                  setAutoSpin(false);
                  setViewAngle('side');
                }}
              >
                📐 Side Profile & Rails
              </button>
              <button
                type="button"
                className={`stage-btn stage-btn--sm${viewMode === 'single' && viewAngle === 'back' && !autoSpin ? ' stage-btn--active' : ''}`}
                onClick={() => {
                  setViewMode('single');
                  setAutoSpin(false);
                  setViewAngle('back');
                }}
              >
                🔍 Backside & Cameras (180°)
              </button>
              <button
                type="button"
                className={`stage-btn stage-btn--sm${viewMode === 'single' && autoSpin ? ' stage-btn--active' : ''}`}
                onClick={() => {
                  setViewMode('single');
                  setAutoSpin(!autoSpin);
                  setViewAngle('free');
                }}
              >
                {viewMode === 'single' && autoSpin ? '⏸ Pause Spin' : '🔄 360° Auto-Spin'}
              </button>
            </div>
          </div>

          <AboutStage
            activePlatform={activePlatform}
            onSelectPlatform={(idx) => {
              setActivePlatform(idx);
              setViewMode('single');
              setViewAngle('front');
            }}
            viewMode={viewMode}
            activeScreen={activeScreen}
            onSelectScreen={(s) => setActiveScreen(s)}
            viewAngle={viewAngle}
            onSelectViewAngle={(a) => setViewAngle(a)}
            autoSpin={autoSpin}
            onToggleAutoSpin={() => setAutoSpin(!autoSpin)}
            xrayFlipped={false}
            reduced={reduced}
          />

          <div className="about__canvas-caption">
            <p className="about__caption-quote">{currentPlatform.subtitle}</p>
            <span className="about__caption-sub">
              REAL HARDWARE CHASSIS (WEB MONITOR, PWA TABLET, GALAXY S24 ULTRA, iPHONE 15 PRO) · 360° DRAG TO INSPECT ALL CORNERS & BACKSIDE · CLICK SCREEN TO ADVANCE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
