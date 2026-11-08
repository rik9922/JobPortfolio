import React from 'react';
import {
  Activity,
  ArrowUpRight,
  Compass,
  Cpu,
  Download,
  Linkedin,
  Mail,
  MapPin,
  ShieldAlert,
  Terminal,
} from 'lucide-react';
import { PERSONAL_BRAND } from '../../data/portfolioData';
import { CoreSimulationState, SectionId } from '../../types/portfolio';

interface HeroSectionProps {
  simulationState: CoreSimulationState;
  onChangeSimulationState: (state: CoreSimulationState) => void;
  inspectMode: boolean;
  onToggleInspect: () => void;
  onNavigate: (id: SectionId) => void;
}

const SIMULATION_MODES: {
  id: CoreSimulationState;
  label: string;
  protocol: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'nominal',
    label: 'Nominal Verification',
    protocol: 'ASSERTIONS: PASS',
    icon: <Activity size={13} />,
  },
  {
    id: 'executing',
    label: 'Automation Suite Run',
    protocol: 'W3C / CDP ACTIVE',
    icon: <Terminal size={13} />,
  },
  {
    id: 'defect_trace',
    label: 'Defect Investigation',
    protocol: 'BOUNDARY TRACE',
    icon: <ShieldAlert size={13} />,
  },
  {
    id: 'ai_synthesis',
    label: 'AI-Assisted Synthesis',
    protocol: 'HITL VERIFIED',
    icon: <Cpu size={13} />,
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  simulationState,
  onChangeSimulationState,
  inspectMode,
  onToggleInspect,
  onNavigate,
}) => {
  return (
    <section
      id="hero"
      className="portfolio-section hero-section"
      aria-labelledby="hero-identity-heading"
    >
      <div className="section-container hero-grid">
        <div className="hero-content">
          {/* Top Identity Telemetry Strip */}
          <div className="hero-telemetry-bar">
            <span className="telemetry-badge telemetry-badge--vermilion">
              01 // THE VERIFICATION CORE
            </span>
            <span className="telemetry-location">
              <MapPin size={13} />
              <span>{PERSONAL_BRAND.location}</span>
            </span>
          </div>

          {/* Primary Name & Professional Positioning */}
          <div className="hero-identity-block">
            <p className="hero-name-kicker" id="hero-identity-heading">
              {PERSONAL_BRAND.name.toUpperCase()}
            </p>
            <div className="hero-role-pills" role="list" aria-label="Professional Identity">
              {PERSONAL_BRAND.positioningPills.map((pill, idx) => (
                <span
                  key={pill}
                  role="listitem"
                  className={`hero-role-pill ${
                    idx === 0 ? 'hero-role-pill--primary' : ''
                  }`}
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Main Display Statement with Inline Technical Visual Punctuation */}
          <h1 className="hero-headline">
            <span className="hero-headline__line">
              <span>I Explore.</span>
              <span className="inline-visual-chip inline-visual-chip--emerald" aria-hidden="true">
                <span className="inline-visual-chip__dot" />
                <span>WEB • PWA • MOBILE</span>
              </span>
            </span>
            <span className="hero-headline__line">
              <span>I Automate.</span>
              <span className="inline-visual-chip inline-visual-chip--vermilion" aria-hidden="true">
                <span>JAVA • SELENIUM • PLAYWRIGHT</span>
              </span>
            </span>
            <span className="hero-headline__line">
              <span className="hero-headline__accent-word">I Engineer.</span>
              <span className="inline-visual-chip inline-visual-chip--violet" aria-hidden="true">
                <span>API • SQL • AI-ASSISTED DEV</span>
              </span>
            </span>
          </h1>

          {/* Professional Tagline */}
          <p className="hero-tagline">{PERSONAL_BRAND.tagline}</p>

          <p className="hero-lead">
            Independent application exploration, deterministic Java browser automation
            (Selenium WebDriver, TestNG, Playwright), REST API &amp; SQL validation, and
            human-verified AI-assisted software development.
          </p>

          {/* Primary Action Bar */}
          <div className="hero-actions">
            <button
              type="button"
              onClick={() => onNavigate('automation-lab')}
              className="btn-primary"
            >
              <span>ENTER AUTOMATION LAB</span>
              <ArrowUpRight size={15} />
            </button>

            <a
              href={PERSONAL_BRAND.resumeUrl}
              download="Ritik_Thakre_QA_Automation_Resume.pdf"
              className="btn-secondary"
            >
              <Download size={14} />
              <span>DOWNLOAD RESUME</span>
            </a>

            <a
              href={PERSONAL_BRAND.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Linkedin size={14} />
              <span>LINKEDIN</span>
              <ArrowUpRight size={13} />
            </a>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="btn-ghost"
            >
              <Mail size={14} />
              <span>CONTACT</span>
            </button>
          </div>

          {/* Interactive 3D Verification Core Telemetry Controller */}
          <div className="hero-core-console" aria-label="Interactive 3D Core State Controller">
            <div className="hero-core-console__header">
              <span className="hero-core-console__title">
                INTERACTIVE 3D CORE TELEMETRY STATE
              </span>
              <button
                type="button"
                onClick={onToggleInspect}
                className={`hero-orbit-btn ${inspectMode ? 'hero-orbit-btn--active' : ''}`}
              >
                <Compass size={13} />
                <span>{inspectMode ? 'LOCK SCROLL CAMERA' : 'FREE 3D ORBIT INSPECT'}</span>
              </button>
            </div>
            <div className="hero-core-console__modes">
              {SIMULATION_MODES.map((m) => {
                const active = simulationState === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onChangeSimulationState(m.id)}
                    className={`core-mode-btn ${active ? `core-mode-btn--active core-mode-btn--${m.id}` : ''}`}
                    aria-pressed={active}
                  >
                    <span className="core-mode-btn__top">
                      {m.icon}
                      <span className="core-mode-btn__protocol">{m.protocol}</span>
                    </span>
                    <span className="core-mode-btn__label">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Spatial Column: Interactive 3D Viewport Frame & Live Telemetry Readout */}
        <div className="hero-spatial-hud" aria-hidden="false">
          <div className="spatial-reticle-card">
            <div className="spatial-reticle-card__header">
              <span className="spatial-reticle-card__code">3D WEBGL // REAL-TIME SHADER CORE</span>
              <span className="spatial-reticle-card__status">INTERACTIVE</span>
            </div>
            <p className="spatial-reticle-card__hint">
              Move pointer to parallax the gyroscopic rings, click any orbital capability node in
              3D space, or toggle <strong>3D Orbit</strong> to rotate and zoom the Verification Core.
            </p>
            <div className="spatial-reticle-card__axes">
              <div>
                <span className="axis-label">RING I</span>
                <span className="axis-val">EXPLORATION</span>
              </div>
              <div>
                <span className="axis-label">RING II</span>
                <span className="axis-val">AUTOMATION</span>
              </div>
              <div>
                <span className="axis-label">RING III</span>
                <span className="axis-val">AI SYNTHESIS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
