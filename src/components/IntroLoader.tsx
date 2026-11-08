import React, { useEffect, useState } from 'react';
import { PERSONAL_IDENTITY } from '../data/portfolioData';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let rafId: number;
    const start = performance.now();
    const duration = 850;

    const tick = (now: number) => {
      const pct = Math.min(100, Math.round(((now - start) / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        window.setTimeout(onComplete, 320);
      }
    };

    rafId = requestAnimationFrame(tick);
    const fallbackTimer = window.setTimeout(() => {
      setExiting(true);
      onComplete();
    }, 1250);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(fallbackTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`atelier-curtain ${exiting ? 'atelier-curtain--exit' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Opening Ritik Thakre Portfolio"
    >
      <div className="atelier-curtain__center">
        <p className="atelier-curtain__eyebrow">
          {PERSONAL_IDENTITY.disciplines.join('  ·  ')}
        </p>
        <h1 className="atelier-curtain__name">{PERSONAL_IDENTITY.name.toUpperCase()}</h1>
        <div className="atelier-curtain__line-wrap">
          <div
            className="atelier-curtain__line-fill"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </div>
    </div>
  );
};
