import React from 'react';
import { EDUCATION_RECORD, EXPERIENCE_TIMELINE } from '../../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="journey"
      className="chapter-section journey-chapter"
      aria-labelledby="journey-heading"
    >
      <div className="chapter-container journey-chapter__layout">
        <div className="journey-chapter__content">
          <span className="chapter-eyebrow">04 — Professional Journey &amp; Education</span>
          <h2 id="journey-heading" className="chapter-title">
            Engineering experience grounded in{' '}
            <span className="serif-italic">real</span> application behaviour.
          </h2>

          {/* Current Employer Block */}
          <article className="journey-career-block">
            <div className="journey-career-block__header">
              <div>
                <span className="journey-role-badge">{EXPERIENCE_TIMELINE.role}</span>
                <h3 className="journey-company">{EXPERIENCE_TIMELINE.company}</h3>
              </div>
              <div className="journey-meta">
                <span>{EXPERIENCE_TIMELINE.period}</span>
                <span>{EXPERIENCE_TIMELINE.location}</span>
              </div>
            </div>

            <p className="journey-summary">{EXPERIENCE_TIMELINE.summary}</p>

            <div className="journey-highlights-grid">
              {EXPERIENCE_TIMELINE.highlights.map((item) => (
                <div key={item.title} className="journey-highlight-card">
                  <h4 className="journey-highlight-card__title">{item.title}</h4>
                  <p className="journey-highlight-card__detail">{item.detail}</p>
                  <div className="journey-highlight-card__tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="atelier-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Academic Foundation Block */}
          <article className="journey-education-block" aria-labelledby="education-degree-title">
            <div className="journey-education-block__header">
              <div>
                <span className="chapter-eyebrow">Academic Foundation</span>
                <h3 id="education-degree-title" className="journey-education-degree">
                  {EDUCATION_RECORD.degree}
                </h3>
                <p className="journey-education-inst">{EDUCATION_RECORD.institution}</p>
              </div>
              <div className="journey-education-meta">
                <span className="journey-education-period">{EDUCATION_RECORD.period}</span>
                <span className="journey-education-score">{EDUCATION_RECORD.score}</span>
              </div>
            </div>
            <p className="journey-education-summary">{EDUCATION_RECORD.summary}</p>
          </article>
        </div>
      </div>
    </section>
  );
};
