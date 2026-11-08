import React, { useEffect, useRef, useState } from 'react';
import { PERSONAL_BRAND } from '../data/portfolioData';

interface IntroLoaderProps {
  onComplete: () => void;
}

const CALIBRATION_STEPS = [
  'INITIALIZING GLSL VERIFICATION KERNEL & GYROSCOPIC RINGS',
  'MOUNTING W3C WEBDRIVER & PLAYWRIGHT JAVA TELEMETRY NODES',
  'CALIBRATING REST API, SQL & CROSS-PLATFORM QA MATRICES',
  'ENGAGING HUMAN-IN-THE-LOOP AI ENGINEERING WORKBENCH',
];

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const start = performance.now();
    const duration = 900; // Crisp, fast calibration sequence
    let completed = false;

    const timer = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100 && !completed) {
        completed = true;
        window.clearInterval(timer);
        setExiting(true);
        window.setTimeout(() => {
          onCompleteRef.current();
        }, 240);
      }
    }, 30);

    return () => window.clearInterval(timer);
  }, []);

  const activeStepIndex = Math.min(
    CALIBRATION_STEPS.length - 1,
    Math.floor((progress / 100) * CALIBRATION_STEPS.length)
  );

  return (
    <div
      className={`intro-loader ${exiting ? 'intro-loader--exit' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Ritik Thakre 3D Portfolio"
    >
      <div className="intro-loader__inner">
        <div className="intro-loader__header">
          <span className="telemetry-tag">SYS-BOOT // VERIFICATION OBSERVATORY</span>
          <span className="telemetry-tag">{PERSONAL_BRAND.coordinates}</span>
        </div>

        <div className="intro-loader__identity">
          <p className="intro-loader__kicker">
            {PERSONAL_BRAND.role} — {PERSONAL_BRAND.positioning}
          </p>
          <h1 className="intro-loader__title">{PERSONAL_BRAND.name.toUpperCase()}</h1>
          <p className="intro-loader__statement">&ldquo;{PERSONAL_BRAND.heroHeadline}&rdquo;</p>
        </div>

        <div className="intro-loader__meter-wrap">
          <div className="intro-loader__meter-meta">
            <span className="intro-loader__step">{CALIBRATION_STEPS[activeStepIndex]}</span>
            <span className="intro-loader__pct">{String(progress).padStart(3, '0')}%</span>
          </div>
          <div className="intro-loader__bar-track">
            <div
              className="intro-loader__bar-fill"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
          <div className="intro-loader__actions">
            <button
              type="button"
              onClick={() => onCompleteRef.current()}
              className="intro-loader__skip-btn"
            >
              ENTER OBSERVATORY IMMEDIATELY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
