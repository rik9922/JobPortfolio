import React, { useEffect, useRef } from 'react';

interface Cell {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  red: boolean;
}

const COLS = 112;
const ROWS = 58;
const LINES = ['TEST.', 'BREAK.', 'SHIP.'];

function sampleCells(): { hx: number; hy: number }[] {
  const off = document.createElement('canvas');
  off.width = COLS;
  off.height = ROWS;
  const ctx = off.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [];
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, COLS, ROWS);
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const lineH = ROWS / LINES.length;
  LINES.forEach((line, i) => {
    ctx.font = `800 ${Math.floor(lineH * 0.98)}px Syne, "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(line, COLS / 2, lineH * i + lineH / 2 + 1);
  });
  const data = ctx.getImageData(0, 0, COLS, ROWS).data;
  const cells: { hx: number; hy: number }[] = [];
  for (let y = 0; y < ROWS; y += 1) {
    for (let x = 0; x < COLS; x += 1) {
      if (data[(y * COLS + x) * 4] > 140) cells.push({ hx: x, hy: y });
    }
  }
  return cells;
}

export const PlayPage: React.FC<{ reduced: boolean }> = ({ reduced }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let cell = 10;
    let ox = 0;
    let oy = 0;
    let width = 0;
    let height = 0;
    const mouse = { x: -9999, y: -9999, active: false };
    let cells: Cell[] = [];
    let cancelled = false;

    // Grid coordinates are kept separately from pixel positions.
    let grid: { gx: number; gy: number }[] = [];
    const init = () => {
      const base = sampleCells();
      grid = base.map((b) => ({ gx: b.hx, gy: b.hy }));
      cells = base.map((_, i) => ({
        hx: 0,
        hy: 0,
        x: Math.random() * (canvas.clientWidth || 800),
        y: -50 - Math.random() * 400,
        vx: 0,
        vy: 0,
        red: i % 9 === 0,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = Math.min((width * 0.9) / COLS, (height * 0.6) / ROWS);
      ox = (width - cell * COLS) / 2;
      oy = (height - cell * ROWS) / 2 + height * 0.05;
      cells.forEach((c, i) => {
        c.hx = ox + grid[i].gx * cell;
        c.hy = oy + grid[i].gy * cell;
      });
    };

    const explode = (px: number, py: number) => {
      cells.forEach((c) => {
        const dx = c.x - px;
        const dy = c.y - py;
        const d = Math.max(20, Math.hypot(dx, dy));
        const f = Math.min(40, 9000 / d);
        c.vx += (dx / d) * f * (0.5 + Math.random());
        c.vy += (dy / d) * f * (0.5 + Math.random()) - Math.random() * 6;
      });
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      const radius = Math.max(70, cell * 9);
      for (let i = 0; i < cells.length; i += 1) {
        const c = cells[i];
        // spring to home
        c.vx += (c.hx - c.x) * 0.045;
        c.vy += (c.hy - c.y) * 0.045;
        if (mouse.active) {
          const dx = c.x - mouse.x;
          const dy = c.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < radius) {
            const f = (1 - d / radius) * 7;
            c.vx += (dx / (d || 1)) * f;
            c.vy += (dy / (d || 1)) * f;
          }
        }
        c.vx *= 0.84;
        c.vy *= 0.84;
        c.x += c.vx;
        c.y += c.vy;
        const speed = Math.abs(c.vx) + Math.abs(c.vy);
        ctx.fillStyle = c.red || speed > 6 ? '#ff3322' : '#f4f4f6';
        const s = cell * 0.86;
        ctx.fillRect(c.x, c.y, s, s);
      }
      raf = requestAnimationFrame(tick);
    };

    const setMouse = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onDown = (e: PointerEvent) => {
      setMouse(e);
      explode(mouse.x, mouse.y);
    };

    const start = () => {
      if (cancelled) return;
      init();
      resize();
      if (reduced) {
        cells.forEach((c) => {
          c.x = c.hx;
          c.y = c.hy;
        });
      }
      tick();
    };

    if (document.fonts && document.fonts.load) {
      document.fonts.load('800 40px Syne').then(start, start);
    } else {
      start();
    }

    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', setMouse);
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointerleave', onLeave);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', setMouse);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced]);

  return (
    <section className="page play" aria-labelledby="play-title">
      <div className="play__head">
        <p className="panel__eyebrow">Play</p>
        <h1 id="play-title" className="play__title">
          Break it <em>if you can.</em>
        </h1>
        <p className="play__hint">Move through it. Click to shatter. Quality means it always comes back together.</p>
      </div>
      <canvas ref={canvasRef} className="play__canvas" aria-label="Interactive pixel text reading Test, Break, Ship" role="img" />
    </section>
  );
};
