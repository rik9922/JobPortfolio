import React, { useState } from 'react';
import { EDUCATION_RECORD, EXPERIENCE_TIMELINE } from '../../data/portfolioData';

export const JourneyPage: React.FC = () => {
  const [active, setActive] = useState(0);
  const exp = EXPERIENCE_TIMELINE;

  return (
    <section className="page page--scroll journey" aria-labelledby="journey-title">
      <div className="about__top">
        <h1 id="journey-title" className="giant-word chrome">
          Journey
        </h1>
        <div className="panel about__panel">
          <p className="panel__eyebrow">
            {exp.period} · {exp.location}
          </p>
          <p className="journey__company">{exp.company}</p>
          <p className="journey__role">
            <em>{exp.role}</em>
          </p>
          <p className="panel__body">{exp.summary}</p>
        </div>
      </div>

      <div className="rows" role="list" aria-label="Responsibilities">
        {exp.highlights.map((h, i) => (
          <button
            key={h.title}
            type="button"
            role="listitem"
            className={`row${active === i ? ' row--active' : ''}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-expanded={active === i}
          >
            <span className="row__num">{String(i + 1).padStart(2, '0')}</span>
            <span className="row__main">
              <span className="row__title">{h.title}</span>
              {active === i && (
                <span className="row__detail">
                  <span>{h.detail}</span>
                  <span className="chips">
                    {h.tags.map((t) => (
                      <em key={t}>{t}</em>
                    ))}
                  </span>
                </span>
              )}
            </span>
            <span className="row__arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
      </div>

      <div className="panel edu">
        <p className="panel__eyebrow">Education · {EDUCATION_RECORD.period}</p>
        <p className="journey__company">{EDUCATION_RECORD.degree}</p>
        <p className="journey__role">
          <em>
            {EDUCATION_RECORD.institution} — {EDUCATION_RECORD.score}
          </em>
        </p>
        <p className="panel__body">{EDUCATION_RECORD.summary}</p>
      </div>
    </section>
  );
};

