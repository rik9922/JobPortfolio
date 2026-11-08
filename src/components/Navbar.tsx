import React, { useState } from 'react';
import {
  Compass,
  Download,
  Eye,
  Menu,
  ShieldCheck,
  X,
} from 'lucide-react';
import { NAV_SECTIONS, PERSONAL_BRAND } from '../data/portfolioData';
import { CoreSimulationState, SectionId } from '../types/portfolio';

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
  inspectMode: boolean;
  onToggleInspect: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  simulationState: CoreSimulationState;
}

const STATE_LABELS: Record<CoreSimulationState, { label: string; dotClass: string }> = {
  nominal: { label: 'CORE: NOMINAL', dotClass: 'status-dot--emerald' },
  executing: { label: 'CORE: EXECUTING', dotClass: 'status-dot--vermilion' },
  defect_trace: { label: 'CORE: DEFECT TRACE', dotClass: 'status-dot--amber' },
  ai_synthesis: { label: 'CORE: AI SYNTHESIS', dotClass: 'status-dot--violet' },
};

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  inspectMode,
  onToggleInspect,
  reducedMotion,
  onToggleReducedMotion,
  simulationState,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentState = STATE_LABELS[simulationState];

  const handleNavClick = (id: SectionId) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <header className="hud-header" role="banner">
      <div className="hud-header__bar">
        <button
          type="button"
          className="hud-brand"
          onClick={() => handleNavClick('hero')}
          aria-label="Return to Ritik Thakre Hero Section"
        >
          <span className="hud-brand__monogram" aria-hidden="true">
            <ShieldCheck size={16} />
          </span>
          <span className="hud-brand__text">
            <span className="hud-brand__name">{PERSONAL_BRAND.name}</span>
            <span className="hud-brand__role">QA • AUTOMATION • AI DEV</span>
          </span>
        </button>

        <nav className="hud-nav" aria-label="Primary Portfolio Navigation">
          {NAV_SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => handleNavClick(sec.id)}
                className={`hud-nav__item ${isActive ? 'hud-nav__item--active' : ''}`}
                aria-current={isActive ? 'location' : undefined}
              >
                <span className="hud-nav__idx">{sec.index}</span>
                <span className="hud-nav__label">{sec.shortLabel}</span>
              </button>
            );
          })}
        </nav>

        <div className="hud-controls">
          <div className="hud-status-pill" aria-live="polite">
            <span className={`status-dot ${currentState.dotClass}`} />
            <span className="hud-status-pill__text">{currentState.label}</span>
          </div>

          <button
            type="button"
            onClick={onToggleInspect}
            className={`hud-control-btn ${inspectMode ? 'hud-control-btn--active' : ''}`}
            aria-pressed={inspectMode}
            title="Toggle interactive 3D camera orbit control"
          >
            <Compass size={15} />
            <span>{inspectMode ? 'EXIT 3D ORBIT' : '3D ORBIT'}</span>
          </button>

          <button
            type="button"
            onClick={onToggleReducedMotion}
            className={`hud-control-btn ${reducedMotion ? 'hud-control-btn--active' : ''}`}
            aria-pressed={reducedMotion}
            title="Toggle reduced motion accessibility mode"
          >
            <Eye size={15} />
            <span className="hud-control-btn__hide-tablet">
              {reducedMotion ? 'STATIC HUD' : 'MOTION ON'}
            </span>
          </button>

          <a
            href={PERSONAL_BRAND.resumeUrl}
            download="Ritik_Thakre_QA_Automation_Resume.pdf"
            className="hud-resume-btn"
          >
            <Download size={14} />
            <span>RESUME</span>
          </a>

          <button
            type="button"
            className="hud-mobile-toggle"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="hud-mobile-drawer" role="dialog" aria-label="Mobile Navigation Menu">
          <div className="hud-mobile-drawer__grid">
            {NAV_SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleNavClick(sec.id)}
                  className={`hud-mobile-drawer__link ${
                    isActive ? 'hud-mobile-drawer__link--active' : ''
                  }`}
                >
                  <span className="hud-mobile-drawer__idx">{sec.index}</span>
                  <span className="hud-mobile-drawer__label">{sec.label}</span>
                </button>
              );
            })}
          </div>
          <div className="hud-mobile-drawer__footer">
            <button
              type="button"
              onClick={() => {
                onToggleInspect();
                setMobileOpen(false);
              }}
              className={`hud-control-btn ${inspectMode ? 'hud-control-btn--active' : ''}`}
            >
              <Compass size={15} />
              <span>{inspectMode ? 'DISABLE 3D ORBIT' : 'INTERACT WITH 3D CORE'}</span>
            </button>
            <a
              href={PERSONAL_BRAND.resumeUrl}
              download="Ritik_Thakre_QA_Automation_Resume.pdf"
              className="hud-resume-btn"
            >
              <Download size={15} />
              <span>DOWNLOAD RESUME PDF</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

