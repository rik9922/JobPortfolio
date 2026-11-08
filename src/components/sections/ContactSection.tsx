import React, { useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { PERSONAL_BRAND } from '../../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [senderName, setSenderName] = useState('');
  const [senderOrg, setSenderOrg] = useState('');
  const [inquiryTopic, setInquiryTopic] = useState('QA Automation / Engineering Role');
  const [messageBody, setMessageBody] = useState('');

  const handleCopy = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 2200);
    } catch {
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 2200);
    }
  };

  const handleDispatchEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[Portfolio Inquiry] ${inquiryTopic}${senderOrg ? ` — ${senderOrg}` : ''}`
    );
    const bodyLines = [
      `Hi Ritik,`,
      ``,
      messageBody ||
        `I explored your 3D portfolio and would like to connect regarding a QA / Test Automation / AI-Assisted Engineering opportunity.`,
      ``,
      senderName ? `Name: ${senderName}` : '',
      senderOrg ? `Organization: ${senderOrg}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    window.location.href = `mailto:${PERSONAL_BRAND.email}?subject=${subject}&body=${encodeURIComponent(
      bodyLines
    )}`;
  };

  return (
    <section
      id="contact"
      className="portfolio-section contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="section-container">
        <div className="section-header">
          <span className="telemetry-badge telemetry-badge--vermilion">
            08 // DIRECT TRANSMISSION TERMINAL
          </span>
          <h2 id="contact-heading" className="section-title">
            Initiate Engineering Collaboration.
          </h2>
          <p className="section-subtitle">
            Available for QA Engineering, Test Automation (Java, Selenium WebDriver, TestNG,
            Playwright), API &amp; SQL Validation, and AI-Assisted Software Development
            opportunities.
          </p>
        </div>

        <div className="contact-terminal-grid">
          {/* Left Column: Direct Channels & Identity Card */}
          <div className="contact-channels-col">
            <div className="contact-channel-card">
              <div className="contact-channel-card__top">
                <span className="channel-label">ELECTRONIC MAIL</span>
                <button
                  type="button"
                  onClick={() => handleCopy(PERSONAL_BRAND.email, 'email')}
                  className="copy-chip-btn"
                  aria-label="Copy email address"
                >
                  {copiedField === 'email' ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedField === 'email' ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
              <a href={`mailto:${PERSONAL_BRAND.email}`} className="contact-channel-card__link">
                <Mail size={18} />
                <span>{PERSONAL_BRAND.email}</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="contact-channel-card">
              <div className="contact-channel-card__top">
                <span className="channel-label">DIRECT TELEPHONY</span>
                <button
                  type="button"
                  onClick={() => handleCopy(PERSONAL_BRAND.phone, 'phone')}
                  className="copy-chip-btn"
                  aria-label="Copy phone number"
                >
                  {copiedField === 'phone' ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedField === 'phone' ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
              <a href={`tel:${PERSONAL_BRAND.phoneRaw}`} className="contact-channel-card__link">
                <Phone size={18} />
                <span>{PERSONAL_BRAND.phone}</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="contact-channel-card">
              <div className="contact-channel-card__top">
                <span className="channel-label">PROFESSIONAL NETWORK</span>
                <span className="channel-tag">VERIFIED PROFILE</span>
              </div>
              <a
                href={PERSONAL_BRAND.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel-card__link"
              >
                <Linkedin size={18} />
                <span>{PERSONAL_BRAND.linkedinHandle}</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="contact-channel-card">
              <div className="contact-channel-card__top">
                <span className="channel-label">BASE OF OPERATIONS</span>
                <span className="channel-tag">{PERSONAL_BRAND.coordinates}</span>
              </div>
              <div className="contact-channel-card__static">
                <MapPin size={18} />
                <span>{PERSONAL_BRAND.location}</span>
              </div>
            </div>

            <div className="contact-closing-banner">
              <ShieldCheck size={18} />
              <div>
                <p className="contact-closing-banner__quote">
                  &ldquo;{PERSONAL_BRAND.tagline}&rdquo;
                </p>
                <p className="contact-closing-banner__sub">
                  Every workflow explored. Every assertion verified. Built with engineering
                  discipline.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Transmission Composer */}
          <form className="contact-composer-card" onSubmit={handleDispatchEmail}>
            <div className="contact-composer-card__header">
              <span>STRUCTURED TRANSMISSION DISPATCHER</span>
              <span className="telemetry-chip">MAILTO PROTOCOL</span>
            </div>

            <div className="form-row-2">
              <div className="form-field">
                <label htmlFor="sender-name">YOUR NAME</label>
                <input
                  id="sender-name"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Recruiter / Engineering Lead"
                />
              </div>

              <div className="form-field">
                <label htmlFor="sender-org">ORGANIZATION</label>
                <input
                  id="sender-org"
                  type="text"
                  value={senderOrg}
                  onChange={(e) => setSenderOrg(e.target.value)}
                  placeholder="Company or Team"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="inquiry-topic">COLLABORATION FOCUS</label>
              <select
                id="inquiry-topic"
                value={inquiryTopic}
                onChange={(e) => setInquiryTopic(e.target.value)}
              >
                <option value="QA Engineer / Test Automation Role">
                  QA Engineer / Test Automation Role
                </option>
                <option value="Java Selenium / Playwright Automation">
                  Java Selenium / Playwright Automation
                </option>
                <option value="AI-Assisted Software Development & QA">
                  AI-Assisted Software Development &amp; QA
                </option>
                <option value="General Engineering Connection">
                  General Engineering Connection
                </option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="inquiry-message">TRANSMISSION PAYLOAD</label>
              <textarea
                id="inquiry-message"
                rows={4}
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                placeholder="Share role details, engineering team stack, or discussion topic..."
              />
            </div>

            <div className="contact-composer-card__actions">
              <button type="submit" className="btn-primary">
                <Send size={15} />
                <span>DISPATCH EMAIL TO RITIK</span>
              </button>

              <a
                href={PERSONAL_BRAND.resumeUrl}
                download="Ritik_Thakre_QA_Automation_Resume.pdf"
                className="btn-secondary"
              >
                <Download size={15} />
                <span>DOWNLOAD RESUME PDF</span>
              </a>
            </div>
          </form>
        </div>

        {/* Footer Telemetry Bar */}
        <footer className="portfolio-footer" role="contentinfo">
          <div className="portfolio-footer__left">
            <span className="portfolio-footer__brand">
              {PERSONAL_BRAND.name.toUpperCase()} — {PERSONAL_BRAND.role}
            </span>
            <span className="portfolio-footer__pos">{PERSONAL_BRAND.positioning}</span>
          </div>
          <div className="portfolio-footer__right">
            <span>{PERSONAL_BRAND.location}</span>
            <span>•</span>
            <a href={`mailto:${PERSONAL_BRAND.email}`}>{PERSONAL_BRAND.email}</a>
            <span>•</span>
            <a
              href={PERSONAL_BRAND.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
};
