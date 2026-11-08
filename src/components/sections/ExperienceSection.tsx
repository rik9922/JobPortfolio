import React, { useState } from 'react';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import {
  EXPERIENCE_DATA,
  EXPERIENCE_RESPONSIBILITIES,
} from '../../data/portfolioData';
import { ExperienceResponsibility } from '../../types/portfolio';

const CATEGORIES: Array<'ALL' | ExperienceResponsibility['category']> = [
  'ALL',
  'QA & Exploration',
  'Test Automation',
  'API & Data',
  'Full-Stack & AI',
  'Collaboration',
];

export const ExperienceSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    'ALL' | ExperienceResponsibility['category']
  >('ALL');
  const [activeRespId, setActiveRespId] = useState<string>(
    EXPERIENCE_RESPONSIBILITIES[0].id
  );

  const filteredList =
    selectedCategory === 'ALL'
      ? EXPERIENCE_RESPONSIBILITIES
      : EXPERIENCE_RESPONSIBILITIES.filter((r) => r.category === selectedCategory);

  const activeResp =
    filteredList.find((r) => r.id === activeRespId) || filteredList[0];

  return (
    <section
      id="experience"
      className="portfolio-section experience-section"
      aria-labelledby="experience-heading"
    >
      <div className="section-container">
        <div className="section-header">
          <span className="telemetry-badge">06 // PROFESSIONAL EXPERIENCE CHRONOLOGY</span>
          <h2 id="experience-heading" className="section-title">
            Production Quality Engineering &amp; Full-Stack Contribution.
          </h2>
        </div>

        {/* Employer Primary Telemetry Header Card */}
        <div className="experience-employer-banner">
          <div className="experience-employer-banner__left">
            <div className="employer-role-pill">
              <Briefcase size={15} />
              <span>{EXPERIENCE_DATA.role}</span>
            </div>
            <h3 className="employer-company-name">{EXPERIENCE_DATA.company}</h3>
            <p className="employer-summary">{EXPERIENCE_DATA.summary}</p>
          </div>

          <div className="experience-employer-banner__right">
            <div className="employer-meta-item">
              <Calendar size={15} />
              <div>
                <span className="employer-meta-label">TENURE</span>
                <span className="employer-meta-value">{EXPERIENCE_DATA.duration}</span>
              </div>
            </div>
            <div className="employer-meta-item">
              <MapPin size={15} />
              <div>
                <span className="employer-meta-label">LOCATION</span>
                <span className="employer-meta-value">{EXPERIENCE_DATA.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Category Filter */}
        <div
          className="experience-filter-bar"
          role="tablist"
          aria-label="Filter Professional Responsibilities"
        >
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setSelectedCategory(cat);
                  const nextFirst =
                    cat === 'ALL'
                      ? EXPERIENCE_RESPONSIBILITIES[0]
                      : EXPERIENCE_RESPONSIBILITIES.find((r) => r.category === cat);
                  if (nextFirst) setActiveRespId(nextFirst.id);
                }}
                className={`exp-filter-pill ${active ? 'exp-filter-pill--active' : ''}`}
              >
                {cat === 'ALL' ? 'All Responsibilities (09)' : cat}
              </button>
            );
          })}
        </div>

        {/* Interactive Timeline & Responsibility Inspector */}
        <div className="experience-timeline-layout">
          <div className="experience-timeline-list" role="list">
            {filteredList.map((item) => {
              const isSelected = item.id === activeResp.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveRespId(item.id)}
                  className={`timeline-node-card ${
                    isSelected ? 'timeline-node-card--active' : ''
                  }`}
                >
                  <div className="timeline-node-card__marker">
                    <span className="timeline-node-card__idx">{item.index}</span>
                  </div>
                  <div className="timeline-node-card__body">
                    <div className="timeline-node-card__top">
                      <span className="timeline-node-card__cat">{item.category}</span>
                    </div>
                    <h4 className="timeline-node-card__title">{item.title}</h4>
                    <p className="timeline-node-card__desc">{item.description}</p>
                    <div className="timeline-node-card__tags">
                      {item.technologies.map((tech) => (
                        <span key={tech} className="tech-pill">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sticky Responsibility Deep-Dive Telemetry Panel */}
          <aside className="experience-focus-panel" aria-label="Selected Responsibility Detail">
            <div className="experience-focus-panel__card">
              <span className="telemetry-chip">
                RESPONSIBILITY LOG {activeResp.index} // {activeResp.category.toUpperCase()}
              </span>
              <h3>{activeResp.title}</h3>
              <p className="experience-focus-panel__desc">{activeResp.description}</p>

              <div className="experience-focus-panel__impact">
                <ShieldCheck size={16} />
                <div>
                  <span className="impact-label">ENGINEERING &amp; QUALITY IMPACT</span>
                  <p>{activeResp.verificationImpact}</p>
                </div>
              </div>

              <div className="experience-focus-panel__stack">
                <span className="impact-label">APPLIED TECHNOLOGIES &amp; PRACTICES</span>
                <ul className="experience-focus-panel__list">
                  {activeResp.technologies.map((t) => (
                    <li key={t}>
                      <CheckCircle2 size={14} className="list-icon-emerald" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
