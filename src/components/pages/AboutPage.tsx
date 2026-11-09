import React, { useState } from 'react';
import { PHILOSOPHY_CONTENT, PLATFORM_STRATA } from '../../data/portfolioData';

export const AboutPage: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="page page--scroll about" aria-labelledby="about-title">
      <div className="about__top">
        <h1 id="about-title" className="giant-word chrome">
          About
        </h1>
        <div className="panel about__panel">
          <p className="panel__eyebrow">{PHILOSOPHY_CONTENT.eyebrow}</p>
          <p className="panel__lead">{PHILOSOPHY_CONTENT.lead}</p>
          <p className="panel__body">{PHILOSOPHY_CONTENT.body}</p>
        </div>
      </div>

      <div className="rows" role="list" aria-label="Platforms">
        {PLATFORM_STRATA.map((p, i) => (
          <button
            key={p.id}
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
              <span className="row__title">{p.title}</span>
              <span className="row__sub">{p.subtitle}</span>
              {active === i && (
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
        ))}
      </div>
    </section>
  );
};

