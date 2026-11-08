import React from 'react';
import { ArrowDownRight, ArrowUpRight, Download } from 'lucide-react';
import { PERSONAL_IDENTITY } from '../../data/portfolioData';
import { ChapterId } from '../../types/portfolio';

interface HeroSectionProps {
  onNavigate: (id: ChapterId) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section
      id="introduction"
      className="chapter-section hero-chapter"
      aria-labelledby="hero-name-heading"
    >
      <div className="chapter-container hero-chapter__layout">
        <div className="hero-chapter__editorial">
          <p id="hero-name-heading" className="hero-chapter__name">
            {PERSONAL_IDENTITY.name.toUpperCase()}
          </p>

          <div className="hero-chapter__disciplines" role="list" aria-label="Professional Identity">
            {PERSONAL_IDENTITY.disciplines.map((item) => (
              <span key={item} role="listitem" className="hero-chapter__discipline">
                {item}
              </span>
            ))}
          </div>

          <h1 className="hero-chapter__headline">
            <span className="hero-chapter__headline-row">I EXPLORE.</span>
            <span className="hero-chapter__headline-row">I AUTOMATE.</span>
            <span className="hero-chapter__headline-row hero-chapter__headline-row--accent">
              I ENGINEER.
            </span>
          </h1>

          <p className="hero-chapter__tagline">
            <em>{PERSONAL_IDENTITY.tagline}</em>
          </p>

          <div className="hero-chapter__cta-group">
            <button
              type="button"
              onClick={() => onNavigate('capabilities')}
              className="atelier-btn atelier-btn--primary"
            >
              <span>Explore Capabilities</span>
              <ArrowDownRight size={16} />
            </button>

            <a
              href={PERSONAL_IDENTITY.resumeHref}
              download="Ritik_Thakre_Resume.pdf"
              className="atelier-btn atelier-btn--glass"
            >
              <Download size={15} />
              <span>Download Resume</span>
            </a>

            <a
              href={PERSONAL_IDENTITY.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="atelier-btn atelier-btn--minimal"
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
