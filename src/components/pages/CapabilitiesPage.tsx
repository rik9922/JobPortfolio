import React, { useState } from 'react';
import { CAPABILITY_ITEMS } from '../../data/portfolioData';
import { LaptopStage } from '../canvas/LaptopStage';

const MACBOOK_FINISHES = [
  { id: 'silver', label: 'Silver', hex: '#adb5bd' },
  { id: 'midnight', label: 'Midnight', hex: '#2e2c2e' },
  { id: 'starlight', label: 'Starlight', hex: '#d8cfc2' },
  { id: 'skyblue', label: 'Sky Blue', hex: '#8ea4b8' },
];

export const CapabilitiesPage: React.FC<{ reduced: boolean }> = ({ reduced }) => {
  const [active, setActive] = useState(0);
  const [lensIndex, setLensIndex] = useState(0);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [finish, setFinish] = useState(MACBOOK_FINISHES[0]);
  const [zoomed, setZoomed] = useState(false);
  const [runPulse, setRunPulse] = useState(0);

  const item = CAPABILITY_ITEMS[active];

  const selectCapability = (idx: number) => {
    if (idx === active) return;
    setActive(idx);
    setLensIndex(0);
    setActiveSkill(null);
  };

  return (
    <section className="page page--scroll caps" aria-labelledby="caps-title">
      <div className="caps__top">
        <div>
          <p className="panel__eyebrow">03 · TECHNICAL CAPABILITIES & LIVE WORKBENCH</p>
          <h1 id="caps-title" className="giant-word chrome">
            What I can do
          </h1>
        </div>
        <p className="caps__intro">
          Drag to rotate the <strong>MacBook Air M5</strong>, click directly on the live macOS screen tabs, or switch
          modes and skills on the left to inspect each engineering workflow in real time.
        </p>
      </div>

      <div className="caps__grid">
        <div className="rows" role="list" aria-label="Capabilities">
          {CAPABILITY_ITEMS.map((c, i) => {
            const isOpen = active === i;
            return (
              <div
                key={c.id}
                role="listitem"
                className={`row row--box${isOpen ? ' row--active' : ''}`}
                onMouseEnter={() => selectCapability(i)}
              >
                <span className="row__num">{c.number}</span>
                <div className="row__main">
                  <button
                    type="button"
                    className="row__trigger"
                    onClick={() => selectCapability(i)}
                    aria-expanded={isOpen}
                  >
                    <span className="row__title">{c.title}</span>
                    <span className="row__sub">{c.subtitle}</span>
                  </button>

                  {isOpen && (
                    <div className="row__detail">
                      <em className="row__quote">{c.storyHeadline}</em>
                      <p className="row__desc">{c.description}</p>

                      {/* 3 Interactive Screen Modes synced with the MacBook display */}
                      <div className="lens-bar" role="group" aria-label="Interactive screen modes">
                        {c.interactiveLenses.map((l, li) => (
                          <button
                            key={l.id}
                            type="button"
                            className={`lens-btn${lensIndex === li ? ' lens-btn--active' : ''}`}
                            onClick={() => setLensIndex(li)}
                          >
                            <span>0{li + 1}</span>
                            {l.label}
                          </button>
                        ))}
                      </div>

                      {/* Interactive Skill Chips synced with the MacBook display */}
                      <div className="chips" role="list" aria-label={`${c.title} skills`}>
                        {c.skills.map((s) => (
                          <button
                            key={s}
                            type="button"
                            className={`chip-btn${activeSkill === s ? ' chip-btn--active' : ''}`}
                            onMouseEnter={() => setActiveSkill(s)}
                            onMouseLeave={() => setActiveSkill(null)}
                            onClick={() => setActiveSkill(activeSkill === s ? null : s)}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="row__arrow-btn"
                  onClick={() => selectCapability(i)}
                  aria-label={`Select ${c.title}`}
                >
                  <span className="row__arrow" aria-hidden="true">
                    ↗
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="caps__stage">
          <div className="caps__stage-bar">
            <div className="caps__swatches" role="group" aria-label="MacBook Air finish">
              <span className="caps__swatch-label">MacBook Air M5 · {finish.label}</span>
              {MACBOOK_FINISHES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`swatch-dot${finish.id === f.id ? ' swatch-dot--active' : ''}`}
                  style={{ background: f.hex }}
                  onClick={() => setFinish(f)}
                  aria-label={`Select ${f.label} finish`}
                  title={f.label}
                />
              ))}
            </div>

            <div className="caps__stage-controls">
              <button
                type="button"
                className="stage-btn"
                onClick={() => setRunPulse((n) => n + 1)}
              >
                ▶ Run Workflow
              </button>
              <button
                type="button"
                className={`stage-btn${zoomed ? ' stage-btn--active' : ''}`}
                onClick={() => setZoomed((z) => !z)}
              >
                {zoomed ? '💻 3D Angle' : '🔍 Zoom Screen'}
              </button>
            </div>
          </div>

          <div className="caps__canvas-wrap">
            <LaptopStage
              index={active}
              lensIndex={lensIndex}
              activeSkill={activeSkill}
              finishColor={finish.hex}
              label={item.title}
              subtitle={item.subtitle}
              lenses={item.interactiveLenses}
              skills={item.skills}
              zoomed={zoomed}
              runPulse={runPulse}
              reduced={reduced}
              onSelectLens={setLensIndex}
              onTriggerRun={() => setRunPulse((n) => n + 1)}
            />
          </div>

          <div className="caps__footer">
            <p className="caps__caption">
              {item.interactiveLenses[lensIndex]?.caption ?? item.subtitle}
            </p>
            <span className="caps__hint">DRAG TO ROTATE MACBOOK · CLICK SCREEN TABS TO SWITCH MODES</span>
          </div>
        </div>
      </div>
    </section>
  );
};
