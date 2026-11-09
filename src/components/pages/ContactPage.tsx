import React from 'react';
import { ArrowUpRight, Download, Mail, MapPin, Phone } from 'lucide-react';
import { PERSONAL_IDENTITY } from '../../data/portfolioData';
import { BadgeScene } from '../canvas/BadgeScene';

export const ContactPage: React.FC<{ reduced: boolean }> = ({ reduced }) => (
  <section className="page page--scroll contact" aria-labelledby="contact-title">
    <div className="contact__badge">
      <BadgeScene reduced={reduced} />
      <p className="contact__hint">Drag the badge · click to flip</p>
    </div>

    <div className="contact__info">
      <p className="panel__eyebrow">Contact</p>
      <h1 id="contact-title" className="giant-word chrome contact__title">
        Let&apos;s
        <br />
        talk.
      </h1>
      <ul className="contact__list">
        <li>
          <Mail size={18} />
          <a href={`mailto:${PERSONAL_IDENTITY.email}`}>{PERSONAL_IDENTITY.email}</a>
        </li>
        <li>
          <Phone size={18} />
          <a href={`tel:${PERSONAL_IDENTITY.phoneHref}`}>{PERSONAL_IDENTITY.phone}</a>
        </li>
        <li>
          <ArrowUpRight size={18} />
          <a href={PERSONAL_IDENTITY.linkedin} target="_blank" rel="noopener noreferrer">
            {PERSONAL_IDENTITY.linkedinLabel}
          </a>
        </li>
        <li>
          <MapPin size={18} />
          <span>{PERSONAL_IDENTITY.location}</span>
        </li>
      </ul>
      <div className="home__actions contact__actions">
        <a className="btn btn--solid" href={PERSONAL_IDENTITY.resumeHref} download="Ritik_Thakre_Resume.pdf">
          <Download size={15} /> Resume
        </a>
        <a className="btn btn--line" href={`mailto:${PERSONAL_IDENTITY.email}`}>
          Email me <ArrowUpRight size={15} />
        </a>
      </div>
    </div>
  </section>
);

