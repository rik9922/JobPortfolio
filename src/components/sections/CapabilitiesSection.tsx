import React from 'react';
import { CAPABILITY_ITEMS } from '../../data/portfolioData';
import { CapabilityId } from '../../types/portfolio';

interface CapabilitiesSectionProps {
  activeCapabilityId: CapabilityId;
  onSelectCapability: (id: CapabilityId) => void;
  activeLensIndex: number;
  onSelectLens: (index: number) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  activeCapabilityId,
  onSelectCapability,
  activeLensIndex,
  onSelectLens,
}) => {
  const activeDomain =
    CAPABILITY_ITEMS.find((item) => item.id === activeCapabilityId) ||
    CAPABILITY_ITEMS[0];

  const activeLens =
    activeDomain.interactiveLenses[activeLensIndex] ||
    activeDomain.interactiveLenses[0];

  return (
    <section
      id="capabilities"
      className="chapter-section capabilities-chapter"
      aria-labelledby="capabilities-heading"
    >
      <div className="chapter-container">
        <div className="capabilities-chapter__intro">
          <span className="chapter-eyebrow">03 — Technical Capabilities</span>
          <h2 id="capabilities-heading" className="chapter-title">
            Six disciplines shaped into{' '}
            <span className="serif-italic">interactive</span> form.
          </h2>
        </div>

        {/* 6 Capability Pillars Navigation Rail */}
        <div
          className="capability-Step-nav"
          role="tablist"
          aria-label="Professional Capability Disciplines"
        >
          {CAPABILITY_ITEMS.map((item) => {
            const isSelected = item.id === activeDomain.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  onSelectCapability(item.id);
                  onSelectLens(0);
                }}
                className={`capability-pillar-btn ${
                  isSelected ? 'capability-pillar-btn--active' : ''
                }`}
                style={{ '--pillar-accent': item.accentColor } as React.CSSProperties}
              >
                <span className="capability-pillar-btn__num">{item.number}</span>
                <span className="capability-pillar-btn__title">{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Capability Editorial Story & 3D Visual Lens Controls */}
        <div className="capability-stage-layout">
          <div
            className="capability-story-card"
            role="tabpanel"
            style={{ '--pillar-accent': activeDomain.accentColor } as React.CSSProperties}
          >
            <div className="capability-story-card__meta">
              <span className="capability-story-card__index">
                DISCIPLINE {activeDomain.number}
              </span>
              <span className="capability-story-card__metaphor">
                {activeDomain.visualMetaphorLabel}
              </span>
            </div>

            <h3 className="capability-story-card__title">{activeDomain.title}</h3>
            <p className="capability-story-card__headline">
              <em>{activeDomain.storyHeadline}</em>
            </p>
            <p className="capability-story-card__desc">{activeDomain.description}</p>

            {/* Interactive 3D Visual Perspective Switcher */}
            <div className="capability-lenses">
              <span className="capability-lenses__label">
                Interactive 3D Perspective (Shifts 3D Sculpture)
              </span>
              <div className="capability-lenses__row">
                {activeDomain.interactiveLenses.map((lens, idx) => {
                  const isCurrentLens = idx === activeLensIndex;
                  return (
                    <button
                      key={lens.id}
                      type="button"
                      onClick={() => onSelectLens(idx)}
                      className={`visual-lens-pill ${
                        isCurrentLens ? 'visual-lens-pill--active' : ''
                      }`}
                    >
                      {lens.label}
                    </button>
                  );
                })}
              </div>
              <p className="capability-lenses__caption">{activeLens.caption}</p>
            </div>

            {/* Clean Resume Skill Tags */}
            <div className="capability-skills-group">
              <span className="capability-lenses__label">Core Skills &amp; Tools</span>
              <div className="capability-skills-cloud" role="list">
                {activeDomain.skills.map((skill) => (
                  <span key={skill} role="listitem" className="atelier-skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
