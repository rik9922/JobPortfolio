import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy, Download, Mail, MapPin, Phone } from 'lucide-react';
import { PERSONAL_IDENTITY } from '../../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState<'email' | 'phone' | null>(null);

  const copyValue = async (text: string, key: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback
    }
    setCopied(key);
    window.setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section
      id="contact"
      className="chapter-section contact-chapter"
      aria-labelledby="contact-heading"
    >
      <div className="chapter-container contact-chapter__center">
        <span className="chapter-eyebrow">05 — Contact</span>
        <h2 id="contact-heading" className="contact-chapter__title">
          Let&rsquo;s build reliable software{' '}
          <span className="serif-italic">together.</span>
        </h2>
        <p className="contact-chapter__lead">
          Open to QA Engineering, Test Automation, and AI-Assisted Software Development
          opportunities.
        </p>

        <div className="contact-cards-grid">
          <div className="contact-card">
            <div className="contact-card__top">
              <span className="contact-card__label">Email</span>
              <button
                type="button"
                onClick={() => copyValue(PERSONAL_IDENTITY.email, 'email')}
                className="contact-copy-btn"
              >
                {copied === 'email' ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied === 'email' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <a href={`mailto:${PERSONAL_IDENTITY.email}`} className="contact-card__value">
              <Mail size={17} />
              <span>{PERSONAL_IDENTITY.email}</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-card__top">
              <span className="contact-card__label">Phone</span>
              <button
                type="button"
                onClick={() => copyValue(PERSONAL_IDENTITY.phone, 'phone')}
                className="contact-copy-btn"
              >
                {copied === 'phone' ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied === 'phone' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <a href={`tel:${PERSONAL_IDENTITY.phoneHref}`} className="contact-card__value">
              <Phone size={17} />
              <span>{PERSONAL_IDENTITY.phone}</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-card__top">
              <span className="contact-card__label">LinkedIn</span>
              <span className="contact-card__sub">Connect</span>
            </div>
            <a
              href={PERSONAL_IDENTITY.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card__value"
            >
              <span>{PERSONAL_IDENTITY.linkedinLabel}</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-card__top">
              <span className="contact-card__label">Location</span>
              <span className="contact-card__sub">India</span>
            </div>
            <div className="contact-card__static">
              <MapPin size={17} />
              <span>{PERSONAL_IDENTITY.location}</span>
            </div>
          </div>
        </div>

        <div className="contact-chapter__actions">
          <a
            href={`mailto:${PERSONAL_IDENTITY.email}?subject=${encodeURIComponent(
              'Engineering Opportunity — Ritik Thakre Portfolio'
            )}`}
            className="atelier-btn atelier-btn--primary"
          >
            <Mail size={16} />
            <span>Send Direct Email</span>
          </a>

          <a
            href={PERSONAL_IDENTITY.resumeHref}
            download="Ritik_Thakre_Resume.pdf"
            className="atelier-btn atelier-btn--glass"
          >
            <Download size={15} />
            <span>Download Resume PDF</span>
          </a>
        </div>

        <footer className="atelier-footer" role="contentinfo">
          <span>
            {PERSONAL_IDENTITY.name} — {PERSONAL_IDENTITY.disciplines.join(' · ')}
          </span>
          <span>{PERSONAL_IDENTITY.location}</span>
        </footer>
      </div>
    </section>
  );
};
