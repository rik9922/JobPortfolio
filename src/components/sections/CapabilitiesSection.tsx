import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Cpu,
  Database,
  GitBranch,
  Layers,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { CAPABILITY_DOMAINS } from '../../data/portfolioData';

interface CapabilitiesSectionProps {
  activeCapabilityId: string;
  onSelectCapability: (id: string) => void;
}

const DOMAIN_ICONS: Record<string, React.ReactNode> = {
  'quality-engineering': <ShieldCheck size={17} />,
  'test-automation': <Terminal size={17} />,
  'api-data-validation': <Database size={17} />,
  'software-development': <Layers size={17} />,
  'ai-assisted-development': <Cpu size={17} />,
  'qa-processes': <GitBranch size={17} />,
};

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  activeCapabilityId,
  onSelectCapability,
}) => {
  const activeDomain =
    CAPABILITY_DOMAINS.find((d) => d.id === activeCapabilityId) || CAPABILITY_DOMAINS[0];

  const [selectedSkillName, setSelectedSkillName] = useState<string>(
    activeDomain.skills[0].name
  );
  const [showFullIndex, setShowFullIndex] = useState<boolean>(false);

  useEffect(() => {
    setSelectedSkillName(activeDomain.skills[0].name);
  }, [activeDomain]);

  const activeSkill =
    activeDomain.skills.find((s) => s.name === selectedSkillName) || activeDomain.skills[0];

  return (
    <section
      id="capabilities"
      className="portfolio-section capabilities-section"
      aria-labelledby="capabilities-heading"
    >
      <div className="section-container">
        <div className="section-header section-header--split">
          <div>
            <span className="telemetry-badge">
              03 // 3D ORBITAL CAPABILITY CONSTELLATION
            </span>
            <h2 id="capabilities-heading" className="section-title">
              Six Interconnected Engineering Disciplines.
            </h2>
            <p className="section-subtitle">
              Synchronized with the 6 orbital satellites in the 3D Verification Core. Select any
              domain below—or click a 3D node in the viewport—to inspect its technical architecture.
            </p>
          </div>
          <div className="section-header__actions">
            <button
              type="button"
              onClick={() => setShowFullIndex((prev) => !prev)}
              className="btn-secondary"
              aria-expanded={showFullIndex}
            >
              <span>
                {showFullIndex
                  ? 'FOCUS INTERACTIVE WORKBENCH'
                  : 'EXPAND FULL 6-DOMAIN SPECIFICATION'}
              </span>
            </button>
          </div>
        </div>

        {/* Interactive Orbital Command Workbench */}
        <div className="capabilities-workbench">
          {/* Left Rail: 6 Orbital Domain Nodes */}
          <div
            className="capability-domain-rail"
            role="tablist"
            aria-label="Engineering Capability Domains"
          >
            {CAPABILITY_DOMAINS.map((domain) => {
              const isSelected = domain.id === activeDomain.id;
              return (
                <button
                  key={domain.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onSelectCapability(domain.id)}
                  className={`domain-rail-node ${
                    isSelected ? 'domain-rail-node--active' : ''
                  }`}
                  style={{ '--domain-accent': domain.color } as React.CSSProperties}
                >
                  <div className="domain-rail-node__index-col">
                    <span className="domain-rail-node__idx">{domain.index}</span>
                    <span className="domain-rail-node__icon">
                      {DOMAIN_ICONS[domain.id]}
                    </span>
                  </div>
                  <div className="domain-rail-node__content">
                    <span className="domain-rail-node__title">{domain.title}</span>
                    <span className="domain-rail-node__sub">{domain.subtitle}</span>
                  </div>
                  <span className="domain-rail-node__count">
                    {domain.skills.length} NODES
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Panel: Active Domain Telemetry & Skill Architecture Inspector */}
          <div
            className="capability-inspector"
            role="tabpanel"
            style={{ '--domain-accent': activeDomain.color } as React.CSSProperties}
          >
            <div className="capability-inspector__header">
              <div className="capability-inspector__meta">
                <span className="capability-inspector__code">
                  ORBITAL NODE {activeDomain.index} // 3D TELEMETRY LINKED
                </span>
                <h3 className="capability-inspector__title">{activeDomain.title}</h3>
                <p className="capability-inspector__subtitle">{activeDomain.subtitle}</p>
              </div>
              <div className="capability-inspector__orbit-readout">
                <span>RADIAL: {activeDomain.orbitRadius.toFixed(2)}u</span>
                <span>ELEV: {activeDomain.orbitHeight >= 0 ? `+${activeDomain.orbitHeight}` : activeDomain.orbitHeight}u</span>
              </div>
            </div>

            <p className="capability-inspector__desc">{activeDomain.description}</p>

            <div className="capability-inspector__arch-note">
              <strong>Architectural Discipline:</strong> {activeDomain.architecturalSummary}
            </div>

            {/* Interactive Skill Matrix Pills */}
            <div className="skill-matrix-block">
              <div className="skill-matrix-block__header">
                <span>SELECT A CAPABILITY NODE TO INSPECT IMPLEMENTATION &amp; DOCS</span>
                <span>{activeDomain.skills.length} VERIFIED CAPABILITIES</span>
              </div>

              <div className="skill-node-grid" role="list">
                {activeDomain.skills.map((skill) => {
                  const isActiveSkill = skill.name === activeSkill.name;
                  return (
                    <button
                      key={skill.name}
                      type="button"
                      onClick={() => setSelectedSkillName(skill.name)}
                      className={`skill-node-pill ${
                        isActiveSkill ? 'skill-node-pill--active' : ''
                      }`}
                    >
                      <span className="skill-node-pill__dot" />
                      <span className="skill-node-pill__name">{skill.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Skill Deep-Dive Readout */}
            <div className="skill-deep-dive">
              <div className="skill-deep-dive__top">
                <div>
                  <span className="skill-deep-dive__kicker">SELECTED CAPABILITY SPECIFICATION</span>
                  <h4 className="skill-deep-dive__name">{activeSkill.name}</h4>
                  <span className="skill-deep-dive__role">{activeSkill.role}</span>
                </div>
                {activeSkill.docUrl && (
                  <a
                    href={activeSkill.docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="doc-reference-link"
                  >
                    <BookOpen size={14} />
                    <span>{activeSkill.docLabel || 'Official Documentation'}</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
              <p className="skill-deep-dive__note">{activeSkill.architectureNote}</p>
            </div>
          </div>
        </div>

        {/* Complete 6-Pillar Scannable Specification Matrix (Always accessible for rapid technical review) */}
        <div
          className={`capabilities-full-matrix ${
            showFullIndex ? 'capabilities-full-matrix--expanded' : ''
          }`}
        >
          <div className="capabilities-full-matrix__header">
            <span>COMPLETE 6-PILLAR CAPABILITY INDEX (ALL RESUME TECHNOLOGIES)</span>
          </div>
          <div className="capabilities-full-matrix__grid">
            {CAPABILITY_DOMAINS.map((domain) => (
              <div
                key={domain.id}
                className={`matrix-column ${
                  domain.id === activeDomain.id ? 'matrix-column--active' : ''
                }`}
                onClick={() => onSelectCapability(domain.id)}
              >
                <div className="matrix-column__head">
                  <span
                    className="matrix-column__idx"
                    style={{ color: domain.color }}
                  >
                    {domain.index}
                  </span>
                  <h4 className="matrix-column__title">{domain.title}</h4>
                </div>
                <ul className="matrix-column__list">
                  {domain.skills.map((s) => (
                    <li key={s.name}>{s.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
