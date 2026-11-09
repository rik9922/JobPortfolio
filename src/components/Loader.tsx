import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const FINAL = 'RITIK THAKRE';
const GLYPHS = 'QA01<>/#%$&';

interface LoaderProps {
  onComplete: () => void;
}

/** Reel-style opener: a single dot, then it resolves into the name. */
export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState('');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = rootRef.current;
    const dot = dotRef.current;
    if (!root || !dot) return;

    if (reduced) {
      onComplete();
      return;
    }

    let interval = 0;
    const tl = gsap.timeline();
    tl.fromTo(dot, { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' })
      .to(dot, { scale: 1.6, duration: 0.35, yoyo: true, repeat: 1, ease: 'sine.inOut' })
      .call(() => {
        const start = performance.now();
        const duration = 1500;
        interval = window.setInterval(() => {
          const progress = Math.min(1, (performance.now() - start) / duration);
          const revealed = Math.floor(progress * FINAL.length);
          let out = '';
          for (let i = 0; i < FINAL.length; i += 1) {
            const ch = FINAL[i];
            if (ch === ' ') out += ' ';
            else if (i < revealed) out += ch;
            else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
          setText(out);
          if (progress >= 1) {
            window.clearInterval(interval);
            setText(FINAL);
          }
        }, 45);
      })
      .to(dot, { opacity: 0, scale: 0, duration: 0.3 }, '<')
      .to({}, { duration: 1.9 })
      .to(root, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' })
      .call(onComplete);

    return () => {
      window.clearInterval(interval);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={rootRef} className="loader" role="status" aria-label="Loading portfolio">
      <span ref={dotRef} className="loader__dot" />
      <p className="loader__text" aria-hidden="true">
        {text}
      </p>
    </div>
  );
};

