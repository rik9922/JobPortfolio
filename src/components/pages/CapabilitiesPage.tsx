import React, { useState } from 'react';
import { CAPABILITY_ITEMS } from '../../data/portfolioData';
import { LaptopStage } from '../canvas/LaptopStage';

export const CapabilitiesPage: React.FC<{ reduced: boolean }> = ({ reduced }) => {
  const [active, setActive] = useState(0);
  const item = CAPABILITY_ITEMS[active];

  return (
    <section className="page page--scroll caps" aria-labelledby="caps-title">
      <div className="caps__head">
        <h1 id="caps-title" className="giant-word chrome">
          What I<br />
          can do
        </h1>
      </div>

      <div className="caps__grid">
        <div className="rows" role="list" aria-label="Capabilities">
          {CAPABILITY_ITEMS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="listitem"
              className={`row${active === i ? ' row--active' : ''}`}
              style={{ ['--accent' as string]: c.accentColor }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-expanded={active === i}
            >
              <span className="row__num">{c.number}</span>
              <span className="row__main">
                <span className="row__title">{c.title}</span>
                {active === i && (
                  <span className="row__detail">
                    <span>
                      <em className="row__quote">{c.storyHeadline}</em>
                    </span>
                    <span>{c.description}</span>
                    <span className="chips">
                      {c.skills.map((s) => (
                        <em key={s}>{s}</em>
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

        <div className="caps__stage">
          <LaptopStage index={active} accent={item.accentColor} label={item.title} reduced={reduced} />
          <p className="caps__caption">{item.subtitle}</p>
        </div>
      </div>
    </section>
  );
};

