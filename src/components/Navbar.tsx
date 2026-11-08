import React, { useState } from 'react';
import { ArrowUpRight, Download, Menu, X } from 'lucide-react';
import { CHAPTERS, PERSONAL_IDENTITY } from '../data/portfolioData';
import { ChapterId } from '../types/portfolio';

interface NavbarProps {
  activeChapter: ChapterId;
  onNavigate: (id: ChapterId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeChapter, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSelect = (id: ChapterId) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <header className="minimal-header" role="banner">
      <div className="minimal-header__inner">
        <button
          type="button"
          className="minimal-brand"
          onClick={() => handleSelect('introduction')}
          aria-label="Scroll to Introduction"
        >
          <span className="minimal-brand__mark" aria-hidden="true" />
          <span className="minimal-brand__name">{PERSONAL_IDENTITY.name}</span>
        </button>

        <nav className="minimal-nav" aria-label="Chapter Navigation">
          {CHAPTERS.map((chapter) => {
            const isActive = activeChapter === chapter.id;
            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => handleSelect(chapter.id)}
                className={`minimal-nav__link ${
                  isActive ? 'minimal-nav__link--active' : ''
                }`}
                aria-current={isActive ? 'location' : undefined}
              >
                <span className="minimal-nav__num">{chapter.number}</span>
                <span>{chapter.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="minimal-header__actions">
          <a
            href={PERSONAL_IDENTITY.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="minimal-action-link"
          >
            <span>LinkedIn</span>
            <ArrowUpRight size={14} />
          </a>

          <a
            href={PERSONAL_IDENTITY.resumeHref}
            download="Ritik_Thakre_Resume.pdf"
            className="minimal-resume-pill"
          >
            <Download size={14} />
            <span>Resume</span>
          </a>

          <button
            type="button"
            className="minimal-menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="minimal-mobile-sheet" role="dialog" aria-label="Navigation">
          <div className="minimal-mobile-sheet__list">
            {CHAPTERS.map((chapter) => (
              <button
                key={chapter.id}
                type="button"
                onClick={() => handleSelect(chapter.id)}
                className={`minimal-mobile-sheet__item ${
                  activeChapter === chapter.id ? 'minimal-mobile-sheet__item--active' : ''
                }`}
              >
                <span className="minimal-mobile-sheet__num">{chapter.number}</span>
                <span>{chapter.label}</span>
              </button>
            ))}
          </div>
          <div className="minimal-mobile-sheet__footer">
            <a
              href={PERSONAL_IDENTITY.resumeHref}
              download="Ritik_Thakre_Resume.pdf"
              className="minimal-resume-pill"
            >
              <Download size={14} />
              <span>Download Resume</span>
            </a>
            <a
              href={PERSONAL_IDENTITY.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="minimal-action-link"
            >
              <span>LinkedIn Profile</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
