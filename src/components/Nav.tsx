import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PAGES, PageId } from '../data/pages';

interface NavProps {
  active: PageId;
  onNavigate: (id: PageId) => void;
}

export const Nav: React.FC<NavProps> = ({ active, onNavigate }) => {
  const [open, setOpen] = useState(false);

  const go = (id: PageId) => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <header className="nav">
      <button type="button" className="nav__brand" onClick={() => go('home')} aria-label="Ritik Thakre, home">
        RITIK THAKRE
      </button>

      <nav className="nav__links" aria-label="Primary">
        {PAGES.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`nav__link${active === p.id ? ' nav__link--active' : ''}`}
            aria-current={active === p.id ? 'page' : undefined}
            onClick={() => go(p.id)}
          >
            {p.label}
          </button>
        ))}
      </nav>

      <button
        type="button"
        className="nav__toggle"
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="nav__sheet">
          {PAGES.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={`nav__sheet-item${active === p.id ? ' nav__sheet-item--active' : ''}`}
              onClick={() => go(p.id)}
            >
              <span>{String(i + 1).padStart(2, '0')}</span>
              {p.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

