import React from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import { PERSONAL_IDENTITY } from '../../data/portfolioData';
import { PortraitParticles } from '../canvas/PortraitParticles';

const TAGS: { label: string; tone: 'red' | 'blue' | 'green' | 'amber'; className: string }[] = [
  { label: 'QA Engineer', tone: 'red', className: 'tag--a' },
  { label: 'Test Automation', tone: 'blue', className: 'tag--b' },
  { label: 'AI-Assisted Development', tone: 'green', className: 'tag--c' },
  { label: 'Java · Selenium · TestNG', tone: 'amber', className: 'tag--d' },
  { label: 'Playwright', tone: 'blue', className: 'tag--e' },
  { label: 'REST API · SQL', tone: 'green', className: 'tag--f' },
];

export const HomePage: React.FC<{ reduced: boolean }> = ({ reduced }) => (
  <section className="page home" aria-labelledby="home-title">
    <PortraitParticles reduced={reduced} />

    <div className="home__tags" aria-hidden="true">
      {TAGS.map((t) => (
        <span key={t.label} className={`tag tag--${t.tone} ${t.className}`}>
          <i />
          {t.label}
        </span>
      ))}
    </div>

    <h1 id="home-title" className="home__title" aria-label="Ritik Thakre">
      <span className="chrome">RITIK</span>
      <span className="chrome chrome--b">THAKRE</span>
    </h1>

    <div className="home__meta">
      <p className="home__role">
        QA ENGINEER <b>/</b> TEST AUTOMATION <b>/</b> AI-ASSISTED SOFTWARE DEVELOPMENT
      </p>
      <p className="home__line">I EXPLORE. I AUTOMATE. I ENGINEER.</p>
    </div>

    <div className="home__actions">
      <a className="btn btn--solid" href={PERSONAL_IDENTITY.resumeHref} download="Ritik_Thakre_Resume.pdf">
        <Download size={15} /> Resume
      </a>
      <a className="btn btn--line" href={PERSONAL_IDENTITY.linkedin} target="_blank" rel="noopener noreferrer">
        LinkedIn <ArrowUpRight size={15} />
      </a>
    </div>
  </section>
);

