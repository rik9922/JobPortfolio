import React from 'react';
import { PHILOSOPHY_CONTENT, PLATFORM_STRATA } from '../../data/portfolioData';

interface AboutSectionProps {
  activePlatformIndex: number;
  onSelectPlatform: (index: number) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  activePlatformIndex,
  onSelectPlatform,
}) => {
  return (
    <section
      id="philosophy"
      className="chapter-section philosophy-chapter"
      aria-labelledby="philosophy-heading"
    >
      <div className="chapter-container philosophy-chapter__grid">
        <div className="philosophy-chapter__prose">
          <span className="chapter-eyebrow">02 — {PHILOSOPHY_CONTENT.eyebrow}</span>
          <h2 id="philosophy-heading" className="chapter-title">
            Understanding how software behaves{' '}
            <span className="serif-italic">before</span> automating it.
          </h2>
          <p className="chapter-lead">{PHILOSOPHY_CONTENT.lead}</p>
          <p className="chapter-body">{PHILOSOPHY_CONTENT.body}</p>

          <div
            className="platform-strata-list"
            role="tablist"
            aria-label="Cross-Platform Exploration Layers"
          >
            {PLATFORM_STRATA.map((stratum, idx) => {
              const isSelected = idx === activePlatformIndex;
              return (
                <button
                  key={stratum.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onSelectPlatform(idx)}
                  onMouseEnter={() => onSelectPlatform(idx)}
                  className={`stratum-card ${isSelected ? 'stratum-card--active' : ''}`}
                >
                  <div className="stratum-card__header">
                    <span className="stratum-card__num">0{idx + 1}</span>
                    <div>
                      <h3 className="stratum-card__title">{stratum.title}</h3>
                      <span className="stratum-card__sub">{stratum.subtitle}</span>
                    </div>
                  </div>
                  <p className="stratum-card__desc">{stratum.description}</p>
                  <div className="stratum-card__pills">
                    {stratum.focusAreas.map((area) => (
                      <span key={area} className="atelier-tag">
                        {area}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
