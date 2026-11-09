// Photo-Realistic, Authentic Application Screens across 4 platforms:
// 1. Web: Real Enterprise SaaS Cloud Console (Chrome browser shell, KPI cards, area chart, live execution table)
// 2. PWA: Real Progressive Web App Storefront (Offline service worker, category chips, rich service cards, cart, bottom nav)
// 3. Android: Real Samsung Galaxy / Material You 3 App (Status bar, Google search pill, hero stability card, activity feed, FAB, Material nav)
// 4. iOS: Real Apple iPhone 15 Pro Native App (Dynamic Island live activity, Activity Rings widget, grouped inset table with SF-style icons, tab bar, Home indicator)

function rrect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * 01 · REAL WEB APP: Enterprise SaaS Cloud Platform (1600 x 1000)
 */
export function paintRealWebScreen(ctx: CanvasRenderingContext2D, t: number) {
  const W = ctx.canvas.width;
  const H = ctx.canvas.height;
  ctx.save();
  ctx.clearRect(0, 0, W, H);

  // Background
  ctx.fillStyle = '#0b0e14';
  ctx.fillRect(0, 0, W, H);

  // 1. Chrome Browser Header Bar (Dark Mode)
  ctx.fillStyle = '#141822';
  ctx.fillRect(0, 0, W, 48);

  // Window Controls (Red, Yellow, Green Mac traffic lights)
  ctx.fillStyle = '#ff5f56';
  ctx.beginPath(); ctx.arc(22, 24, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffbd2e';
  ctx.beginPath(); ctx.arc(42, 24, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#27c93f';
  ctx.beginPath(); ctx.arc(62, 24, 6, 0, Math.PI * 2); ctx.fill();

  // Active Tab
  ctx.fillStyle = '#1b2230';
  rrect(ctx, 92, 8, 260, 36, 8);
  ctx.fill();
  ctx.fillStyle = '#ff3322';
  ctx.beginPath(); ctx.arc(110, 26, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('SkyStone Cloud QA · Dashboard', 122, 30);

  // URL Box
  const urlX = 370;
  const urlW = W - urlX - 60;
  ctx.fillStyle = '#0a0d13';
  rrect(ctx, urlX, 10, urlW, 30, 6);
  ctx.fill();
  ctx.fillStyle = '#34d399';
  ctx.font = '700 11px monospace';
  ctx.fillText('🔒 https://cloud.skystone.tech/app/v2/analytics-dashboard', urlX + 16, 29);

  // 2. App Top Navigation Bar
  const navY = 48;
  const navH = 58;
  ctx.fillStyle = '#0f141f';
  ctx.fillRect(0, navY, W, navH);

  // Brand Logo
  ctx.fillStyle = '#ff3322';
  rrect(ctx, 24, navY + 12, 34, 34, 8);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 16px "Syne", sans-serif';
  ctx.fillText('SKYSTONE', 70, navY + 34);

  // App Navigation Items
  const navItems = ['Dashboard', 'Test Suites', 'API Gateway', 'PostgreSQL Explorer', 'Jira STLC', 'Settings'];
  let nx = 230;
  navItems.forEach((item, idx) => {
    const isSel = idx === 0;
    if (isSel) {
      ctx.fillStyle = '#ff3322';
      ctx.fillRect(nx, navY + navH - 3, 76, 3);
      ctx.fillStyle = '#ffffff';
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    }
    ctx.font = '700 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(item, nx + 6, navY + 34);
    nx += 120;
  });

  // Global Search Box with shortcut
  const searchX = W - 340;
  ctx.fillStyle = '#161d2b';
  rrect(ctx, searchX, navY + 14, 180, 30, 6);
  ctx.fill();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.font = '500 11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('🔍 Search (⌘K)...', searchX + 14, navY + 33);

  // Notifications Bell with Badge
  ctx.fillStyle = '#1c2436';
  ctx.beginPath(); ctx.arc(W - 120, navY + 29, 16, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ff3322';
  ctx.beginPath(); ctx.arc(W - 110, navY + 20, 5, 0, Math.PI * 2); ctx.fill();

  // User Profile Avatar
  ctx.fillStyle = 'rgba(255, 51, 34, 0.2)';
  ctx.beginPath(); ctx.arc(W - 60, navY + 29, 17, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#ff3322';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 11px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('RT', W - 60, navY + 33);
  ctx.textAlign = 'left';

  // 3. Left Navigation Sidebar
  const sbW = 240;
  const bodyY = navY + navH;
  ctx.fillStyle = '#0d111a';
  ctx.fillRect(0, bodyY, sbW, H - bodyY);

  const sidebarRows = [
    { icon: '📊', label: 'Executive Overview', active: true },
    { icon: '⚡', label: 'E2E Automation Suites', count: '148' },
    { icon: '🔍', label: 'Exploratory Workflows', count: '32' },
    { icon: '🌐', label: 'Postman REST APIs', count: '48' },
    { icon: '🗄', label: 'PostgreSQL Tables', count: '16' },
    { icon: '📈', label: 'TestNG Coverage Grid', count: '99%' },
    { icon: '📋', label: 'Jira Defect STLC', count: '0 bug' },
    { icon: '🚀', label: 'Production Releases', count: 'v4.2' },
  ];
  sidebarRows.forEach((row, i) => {
    const ry = bodyY + 24 + i * 42;
    if (row.active) {
      ctx.fillStyle = 'rgba(255, 51, 34, 0.15)';
      rrect(ctx, 14, ry - 14, sbW - 28, 34, 8);
      ctx.fill();
      ctx.fillStyle = '#ff3322';
      ctx.fillRect(14, ry - 14, 4, 34);
      ctx.fillStyle = '#ffffff';
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    }
    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`${row.icon}  ${row.label}`, 26, ry + 8);
    if (row.count) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.font = '700 11px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(row.count, sbW - 24, ry + 8);
      ctx.textAlign = 'left';
    }
  });

  // 4. Main Dashboard Area
  const mainX = sbW + 28;
  const mainY = bodyY + 24;
  const mainW = W - mainX - 28;

  // 3 Vibrant KPI Cards
  const kpiW = (mainW - 36) / 3;
  const kpiData = [
    {
      title: 'E2E SUITE RELIABILITY',
      val: '99.94% PASS',
      sub: '148 of 148 Tests Green · Zero Regressions',
      pill: '+0.8% vs last release',
      pillCol: '#34d399',
      borderCol: 'rgba(52, 211, 153, 0.25)',
    },
    {
      title: 'API GATEWAY COVERAGE',
      val: '48 ENDPOINTS · 200 OK',
      sub: 'Postman Verified · Avg latency 38ms',
      pill: '100% Contract Match',
      pillCol: '#38bdf8',
      borderCol: 'rgba(56, 189, 248, 0.25)',
    },
    {
      title: 'DATABASE TRANSACTIONS',
      val: '1,280 SQL ROWS COMMITTED',
      sub: 'PostgreSQL Foreign Keys Verified',
      pill: 'Zero Data Loss',
      pillCol: '#a855f7',
      borderCol: 'rgba(168, 85, 247, 0.25)',
    },
  ];

  kpiData.forEach((kpi, idx) => {
    const kx = mainX + idx * (kpiW + 18);
    ctx.fillStyle = '#121622';
    rrect(ctx, kx, mainY, kpiW, 115, 12);
    ctx.fill();
    ctx.strokeStyle = kpi.borderCol;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.font = '800 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(kpi.title, kx + 20, mainY + 28);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 20px "Syne", sans-serif';
    ctx.fillText(kpi.val, kx + 20, mainY + 58);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '500 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(kpi.sub, kx + 20, mainY + 82);

    // Pill
    ctx.fillStyle = kpi.pillCol;
    ctx.font = '700 11px monospace';
    ctx.fillText(`● ${kpi.pill}`, kx + 20, mainY + 102);
  });

  // 5. Visual Execution Wave / Area Graph
  const graphY = mainY + 135;
  const graphH = 140;
  ctx.fillStyle = '#111520';
  rrect(ctx, mainX, graphY, mainW, graphH, 12);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Execution Volume & Stability Curve (Mon – Fri)', mainX + 22, graphY + 28);

  // Smooth Area Curve
  const pts = [
    { x: 0, y: 0.65 },
    { x: 0.2, y: 0.35 },
    { x: 0.4, y: 0.45 },
    { x: 0.6, y: 0.2 },
    { x: 0.8, y: 0.3 },
    { x: 1.0, y: 0.15 },
  ];
  const chartW = mainW - 44;
  const chartH = 75;
  const chartY0 = graphY + 125;

  ctx.beginPath();
  ctx.moveTo(mainX + 22, chartY0);
  pts.forEach((pt, i) => {
    const px = mainX + 22 + pt.x * chartW;
    const py = chartY0 - (1 - pt.y) * chartH;
    if (i === 0) ctx.lineTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.lineTo(mainX + 22 + chartW, chartY0);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, graphY + 45, 0, chartY0);
  grad.addColorStop(0, 'rgba(255, 51, 34, 0.35)');
  grad.addColorStop(1, 'rgba(255, 51, 34, 0.0)');
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  pts.forEach((pt, i) => {
    const px = mainX + 22 + pt.x * chartW;
    const py = chartY0 - (1 - pt.y) * chartH;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.strokeStyle = '#ff3322';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // 6. Live Test Execution Data Table
  const tableY = graphY + graphH + 20;
  const tableH = H - tableY - 24;
  ctx.fillStyle = '#10141e';
  rrect(ctx, mainX, tableY, mainW, tableH, 12);
  ctx.fill();

  // Header row
  ctx.fillStyle = '#171c2a';
  rrect(ctx, mainX, tableY, mainW, 38, 12);
  ctx.fill();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('STATUS', mainX + 24, tableY + 24);
  ctx.fillText('FEATURE WORKFLOW', mainX + 110, tableY + 24);
  ctx.fillText('FRAMEWORK', mainX + 460, tableY + 24);
  ctx.fillText('DURATION', mainX + 700, tableY + 24);
  ctx.fillText('DATABASE RESULT', mainX + mainW - 180, tableY + 24);

  const testRows = [
    {
      status: 'PASS',
      name: 'User Authentication & Multi-Role Permission Gate',
      tool: 'Java + Selenium POM',
      dur: '1.24s',
      res: '200 OK · JWT Active',
    },
    {
      status: 'PASS',
      name: 'Multi-Step Checkout with Boundary Form Limits',
      tool: 'Playwright (Java)',
      dur: '2.18s',
      res: 'DB Row Committed',
    },
    {
      status: 'PASS',
      name: 'Inventory Bulk CSV Ingestion & Foreign Key Check',
      tool: 'TestNG DataProvider',
      dur: '3.42s',
      res: 'SQL 50 Rows OK',
    },
    {
      status: 'PASS',
      name: 'Async Payment Webhook Retries & Idempotency',
      tool: 'REST API + DB Mock',
      dur: '0.86s',
      res: 'Verified Idempotent',
    },
    {
      status: 'PASS',
      name: 'Cross-Browser Viewport Matrix (Chromium, WebKit)',
      tool: 'Maven Parallel Grid',
      dur: '4.10s',
      res: '100% Parity',
    },
  ];

  const pulseRow = Math.floor((t * 0.75) % testRows.length);
  testRows.forEach((r, idx) => {
    const ry = tableY + 48 + idx * 48;
    if (idx === pulseRow) {
      ctx.fillStyle = 'rgba(255, 51, 34, 0.12)';
      ctx.fillRect(mainX, ry - 10, mainW, 44);
      ctx.fillStyle = '#ff3322';
      ctx.fillRect(mainX, ry - 10, 4, 44);
    }

    // Pass Pill
    ctx.fillStyle = 'rgba(52, 211, 153, 0.15)';
    rrect(ctx, mainX + 24, ry - 4, 64, 24, 6);
    ctx.fill();
    ctx.fillStyle = '#34d399';
    ctx.font = '800 11px monospace';
    ctx.fillText(`✓ ${r.status}`, mainX + 32, ry + 12);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(r.name, mainX + 110, ry + 12);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.font = '500 12px monospace';
    ctx.fillText(r.tool, mainX + 460, ry + 12);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.font = '500 12px monospace';
    ctx.fillText(r.dur, mainX + 700, ry + 12);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 12px monospace';
    ctx.fillText(r.res, mainX + mainW - 180, ry + 12);
  });

  ctx.restore();
}

/**
 * 02 · REAL PWA: Apex Cloud Store & QA Services PWA (1400 x 1000)
 */
export function paintRealPwaScreen(ctx: CanvasRenderingContext2D, t: number) {
  const W = ctx.canvas.width;
  const H = ctx.canvas.height;
  ctx.save();
  ctx.clearRect(0, 0, W, H);

  // Background
  ctx.fillStyle = '#0a0d14';
  ctx.fillRect(0, 0, W, H);

  // 1. Top PWA Status / Installation Banner
  ctx.fillStyle = '#111726';
  ctx.fillRect(0, 0, W, 40);
  ctx.fillStyle = '#38bdf8';
  ctx.font = '700 11px monospace';
  ctx.fillText('⚡ PROGRESSIVE WEB APP · INSTALLED · OFFLINE SERVICE WORKER ACTIVE · REST API SYNCED', 24, 25);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#34d399';
  ctx.fillText('● ONLINE (100% CACHED)', W - 24, 25);
  ctx.textAlign = 'left';

  // 2. App Header
  const headY = 40;
  const headH = 68;
  ctx.fillStyle = '#0f1422';
  ctx.fillRect(0, headY, W, headH);

  // Logo
  ctx.fillStyle = '#38bdf8';
  rrect(ctx, 24, headY + 15, 38, 38, 10);
  ctx.fill();
  ctx.fillStyle = '#05070c';
  ctx.font = '800 20px "Syne", sans-serif';
  ctx.fillText('A', 36, headY + 41);

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 18px "Syne", sans-serif';
  ctx.fillText('APEX STORE', 74, headY + 35);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Ionic PWA Workspace & QA Suite', 74, headY + 50);

  // Search Bar
  const sW = 420;
  const sX = W / 2 - sW / 2;
  ctx.fillStyle = '#171e30';
  rrect(ctx, sX, headY + 16, sW, 36, 18);
  ctx.fill();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('🔍 Search automated modules, components...', sX + 18, headY + 39);

  // Cart Button with badge
  ctx.fillStyle = '#1c253b';
  rrect(ctx, W - 160, headY + 16, 136, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('🛒 Cart', W - 146, headY + 39);
  ctx.fillStyle = '#ff3322';
  rrect(ctx, W - 60, headY + 22, 24, 22, 11);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 11px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('3', W - 48, headY + 37);
  ctx.textAlign = 'left';

  // 3. Category Filter Carousel
  const catY = headY + headH + 18;
  const cats = ['★ All Services', 'Automated QA', 'REST API Contracts', 'SQL Persistence', 'Mobile Builds', 'Cloud Webhooks'];
  let cx = 24;
  cats.forEach((c, idx) => {
    const isSel = idx === 0;
    const catW = 140;
    if (isSel) {
      ctx.fillStyle = '#38bdf8';
      rrect(ctx, cx, catY, catW, 34, 17);
      ctx.fill();
      ctx.fillStyle = '#040d1a';
    } else {
      ctx.fillStyle = '#131926';
      rrect(ctx, cx, catY, catW, 34, 17);
      ctx.fill();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    }
    ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(c, cx + catW / 2, catY + 22);
    ctx.textAlign = 'left';
    cx += catW + 12;
  });

  // 4. Hero Promotion Banner
  const heroY = catY + 54;
  const heroH = 180;
  ctx.fillStyle = '#111728';
  rrect(ctx, 24, heroY, W - 48, heroH, 16);
  ctx.fill();
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Hero Text
  ctx.fillStyle = '#38bdf8';
  ctx.font = '800 12px monospace';
  ctx.fillText('AUTONOMOUS TEST PIPELINE v4.2 · PRODUCTION READY', 52, heroY + 40);

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 28px "Syne", sans-serif';
  ctx.fillText('Quality Engineering with AI-Assisted Precision', 52, heroY + 76);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '500 14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('End-to-end exploratory verification, Postman REST payloads & PostgreSQL data integrity.', 52, heroY + 106);

  // Hero CTA Buttons
  ctx.fillStyle = '#38bdf8';
  rrect(ctx, 52, heroY + 126, 180, 38, 19);
  ctx.fill();
  ctx.fillStyle = '#050a12';
  ctx.font = '800 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('⚡ Deploy Test Suite', 78, heroY + 150);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  rrect(ctx, 248, heroY + 126, 140, 38, 19);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Learn More ↗', 276, heroY + 150);

  // 5. Product / Service Cards Grid (3 Columns)
  const gridY = heroY + heroH + 24;
  const gridH = H - gridY - 80;
  const cardW = (W - 48 - 36) / 3;

  const pwaProducts = [
    {
      badge: 'E2E AUTOMATION',
      name: 'Java + Selenium & Playwright Suite',
      desc: 'Page Object Model with boundary and negative form assertions.',
      rating: '★★★★★ 4.9',
      price: '$499 / mo',
      tag: 'INSTANT DEPLOY',
      accentCol: '#38bdf8',
    },
    {
      badge: 'API CONTRACT',
      name: 'Postman REST Payload Gateway',
      desc: 'Automated 200 OK validations across 48 backend endpoints.',
      rating: '★★★★★ 5.0',
      price: '$299 / mo',
      tag: 'ZERO REGRESSION',
      accentCol: '#34d399',
    },
    {
      badge: 'DATA INTEGRITY',
      name: 'PostgreSQL Relational Verifier',
      desc: 'Foreign key checks, transaction rollback, and CRUD audit logs.',
      rating: '★★★★☆ 4.8',
      price: '$199 / mo',
      tag: 'SQL SYNCED',
      accentCol: '#ff7b72',
    },
  ];

  pwaProducts.forEach((p, idx) => {
    const px = 24 + idx * (cardW + 18);
    ctx.fillStyle = '#121828';
    rrect(ctx, px, gridY, cardW, gridH, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.stroke();

    // Top Card Accent Badge
    ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
    rrect(ctx, px + 20, gridY + 20, 130, 24, 6);
    ctx.fill();
    ctx.fillStyle = p.accentCol;
    ctx.font = '800 10px monospace';
    ctx.fillText(p.badge, px + 30, gridY + 36);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 17px "Syne", sans-serif';
    ctx.fillText(p.name, px + 20, gridY + 74);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.font = '500 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(p.desc, px + 20, gridY + 102);

    ctx.fillStyle = '#fbbf24';
    ctx.font = '700 13px sans-serif';
    ctx.fillText(p.rating, px + 20, gridY + 138);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 20px "Syne", sans-serif';
    ctx.fillText(p.price, px + 20, gridY + 172);

    // Add to Cart Button
    ctx.fillStyle = '#38bdf8';
    rrect(ctx, px + 20, gridY + 192, cardW - 40, 36, 10);
    ctx.fill();
    ctx.fillStyle = '#050a12';
    ctx.font = '800 12px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('+ Add to Workflow', px + cardW / 2, gridY + 215);
    ctx.textAlign = 'left';
  });

  // 6. Persistent Bottom PWA Navigation Bar
  const bNavY = H - 56;
  ctx.fillStyle = '#0d121c';
  ctx.fillRect(0, bNavY, W, 56);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.strokeRect(0, bNavY, W, 1);

  const bTabs = ['🏠 Home', '📦 Services', '⚡ E2E Pipeline', '📋 Cart (3)', '👤 Account'];
  const tabW = W / bTabs.length;
  bTabs.forEach((tab, i) => {
    ctx.fillStyle = i === 0 ? '#38bdf8' : 'rgba(255, 255, 255, 0.45)';
    ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(tab, i * tabW + tabW / 2, bNavY + 34);
    ctx.textAlign = 'left';
  });

  ctx.restore();
}

/**
 * 03 · REAL ANDROID: Samsung Galaxy S24 Ultra Flagship Material 3 App (750 x 1550)
 */
export function paintRealAndroidScreen(ctx: CanvasRenderingContext2D, t: number) {
  const W = ctx.canvas.width;
  const H = ctx.canvas.height;
  ctx.save();
  ctx.clearRect(0, 0, W, H);

  // Background
  ctx.fillStyle = '#0b120f';
  ctx.fillRect(0, 0, W, H);

  // 1. Android 14 Status Bar
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('9:41', 44, 56);

  ctx.textAlign = 'right';
  ctx.fillText('5G · 98% 🔋', W - 44, 56);
  ctx.textAlign = 'left';

  // 2. Material You 3 Floating Pill Search Bar
  const searchY = 78;
  const searchH = 68;
  ctx.fillStyle = '#14211a';
  rrect(ctx, 32, searchY, W - 64, searchH, 34);
  ctx.fill();
  ctx.strokeStyle = 'rgba(52, 211, 153, 0.2)';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Google G Icon / Search lens
  ctx.fillStyle = '#34d399';
  ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('🔍', 56, searchY + 43);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.font = '500 17px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Search tests, APIs & tickets...', 96, searchY + 42);

  // Mic & Lens Icons
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = '700 18px sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('🎙  📷', W - 56, searchY + 42);
  ctx.textAlign = 'left';

  // 3. Horizontal Filter Chips
  const chipY = searchY + searchH + 20;
  const chips = ['✓ All Workflows', 'Automated E2E', 'REST APIs', 'SQL Database', 'Jira STLC'];
  let chX = 32;
  chips.forEach((ch, idx) => {
    const isAct = idx === 0;
    const cW = 145;
    if (isAct) {
      ctx.fillStyle = '#34d399';
      rrect(ctx, chX, chipY, cW, 40, 20);
      ctx.fill();
      ctx.fillStyle = '#051910';
    } else {
      ctx.fillStyle = '#131e18';
      rrect(ctx, chX, chipY, cW, 40, 20);
      ctx.fill();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    }
    ctx.font = '700 14px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(ch, chX + cW / 2, chipY + 25);
    ctx.textAlign = 'left';
    chX += cW + 12;
  });

  // 4. Featured Material 3 Hero Card (Release Health)
  const heroY = chipY + 62;
  const heroH = 240;
  ctx.fillStyle = '#102219';
  rrect(ctx, 32, heroY, W - 64, heroH, 24);
  ctx.fill();
  ctx.strokeStyle = 'rgba(52, 211, 153, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#34d399';
  ctx.font = '800 13px monospace';
  ctx.fillText('PRODUCTION RELEASE HEALTH · v4.2', 58, heroY + 42);

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 46px "Syne", sans-serif';
  ctx.fillText('99.84%', 58, heroY + 98);

  ctx.fillStyle = '#34d399';
  ctx.font = '700 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('↑ +2.4% pass rate vs last sprint', 260, heroY + 94);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '500 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('148 Scenarios Verified · Zero Crashes · 100% Assertion Match', 58, heroY + 134);

  // 4 Quick Action Circular Buttons
  const actions = [
    { icon: '▶', label: 'Run Suite' },
    { icon: '⚡', label: 'Re-Test' },
    { icon: '📋', label: 'Jira STLC' },
    { icon: '🗄', label: 'Sync DB' },
  ];
  const actW = (W - 64 - 80) / 4;
  actions.forEach((act, i) => {
    const ax = 58 + i * (actW + 20);
    ctx.fillStyle = '#1a3326';
    ctx.beginPath(); ctx.arc(ax + 24, heroY + 180, 24, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#34d399';
    ctx.font = '800 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(act.icon, ax + 24, heroY + 186);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(act.label, ax + 24, heroY + 220);
    ctx.textAlign = 'left';
  });

  // 5. Section Title: Recent Test Activities
  const listY = heroY + heroH + 34;
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 22px "Syne", sans-serif';
  ctx.fillText('Recent Verification Activities', 36, listY);

  // Activity Feed Cards
  const feedItems = [
    {
      icon: '🛡',
      iconBg: '#1e3a5f',
      title: 'User Authentication & Multi-Factor',
      sub: 'Java Selenium POM · Regression Suite',
      pill: 'PASS · 200 OK',
      pillCol: '#34d399',
    },
    {
      icon: '💳',
      iconBg: '#3b2164',
      title: 'Stripe Multi-Currency Payment Intent',
      sub: 'Playwright (Java) · Boundary Form Tests',
      pill: 'COMMITTED',
      pillCol: '#38bdf8',
    },
    {
      icon: '🗄',
      iconBg: '#442d13',
      title: 'Relational DB Foreign Key Check',
      sub: 'PostgreSQL · 50 Rows Ingestion Match',
      pill: 'ZERO LOSS',
      pillCol: '#fbbf24',
    },
    {
      icon: '📋',
      iconBg: '#421616',
      title: 'Jira Defect Reproduction Lifecycle',
      sub: 'STLC Sprint Gate · Evidence Captured',
      pill: 'RESOLVED',
      pillCol: '#ff7b72',
    },
  ];

  const cardStartY = listY + 18;
  const feedH = 105;
  const feedGap = 16;
  feedItems.forEach((f, idx) => {
    const fy = cardStartY + idx * (feedH + feedGap);
    ctx.fillStyle = '#121e17';
    rrect(ctx, 32, fy, W - 64, feedH, 20);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.stroke();

    // App Icon Squircle
    ctx.fillStyle = f.iconBg;
    rrect(ctx, 52, fy + 22, 58, 58, 16);
    ctx.fill();
    ctx.font = '800 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(f.icon, 81, fy + 58);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 18px "Syne", sans-serif';
    ctx.fillText(f.title, 126, fy + 44);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.font = '500 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(f.sub, 126, fy + 72);

    // Pill
    ctx.fillStyle = f.pillCol;
    ctx.font = '800 12px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`● ${f.pill}`, W - 52, fy + 44);
    ctx.textAlign = 'left';
  });

  // 6. Floating Action Button (FAB) at bottom-right
  const fabX = W - 110;
  const fabY = H - 180;
  ctx.fillStyle = '#34d399';
  ctx.beginPath(); ctx.arc(fabX, fabY, 36, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#051910';
  ctx.font = '800 36px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('+', fabX, fabY + 12);
  ctx.textAlign = 'left';

  // 7. Material 3 Bottom Navigation Bar
  const bNavY = H - 90;
  ctx.fillStyle = '#0e1713';
  rrect(ctx, 32, bNavY, W - 64, 68, 22);
  ctx.fill();

  const navTabs = ['🏠 Home', '⚡ Workflows', '📈 Analytics', '👤 Settings'];
  const nW = (W - 64) / navTabs.length;
  navTabs.forEach((nt, i) => {
    if (i === 0) {
      // Material Pill for active item
      ctx.fillStyle = 'rgba(52, 211, 153, 0.2)';
      rrect(ctx, 32 + i * nW + 12, bNavY + 12, nW - 24, 44, 22);
      ctx.fill();
      ctx.fillStyle = '#34d399';
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    }
    ctx.font = '700 14px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(nt, 32 + i * nW + nW / 2, bNavY + 40);
    ctx.textAlign = 'left';
  });

  ctx.restore();
}

/**
 * 04 · REAL iOS: Apple iPhone 15 Pro Max iOS 17/18 Native App (750 x 1620)
 */
export function paintRealIosScreen(ctx: CanvasRenderingContext2D, t: number) {
  const W = ctx.canvas.width;
  const H = ctx.canvas.height;
  ctx.save();
  ctx.clearRect(0, 0, W, H);

  // OLED True Black
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, W, H);

  // 1. Dynamic Island Live Activity Bubble (top center)
  const diW = 280;
  const diH = 46;
  const diX = W / 2 - diW / 2;
  const diY = 18;
  ctx.fillStyle = '#08080c';
  rrect(ctx, diX, diY, diW, diH, 23);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Dynamic Island Content
  ctx.fillStyle = '#34d399';
  ctx.beginPath(); ctx.arc(diX + 24, diY + 23, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 13px -apple-system, "SF Pro Text", sans-serif';
  ctx.fillText('Test Suite Running', diX + 40, diY + 28);
  ctx.fillStyle = '#a855f7';
  ctx.font = '700 12px monospace';
  ctx.textAlign = 'right';
  ctx.fillText('99% PASS', diX + diW - 20, diY + 28);
  ctx.textAlign = 'left';

  // 2. iOS Status Bar
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 20px -apple-system, "SF Pro Text", sans-serif';
  ctx.fillText('9:41', 52, 52);

  ctx.textAlign = 'right';
  ctx.fillText('5G  􀛨  100%', W - 52, 52);
  ctx.textAlign = 'left';

  // 3. iOS Large Navigation Title
  const headY = 110;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.font = '700 13px -apple-system, "SF Pro Text", sans-serif';
  ctx.fillText('MONDAY, NOVEMBER 9', 44, headY);

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 38px "Syne", -apple-system, sans-serif';
  ctx.fillText('QA Diagnostics', 44, headY + 44);

  // User Avatar Icon in top-right
  ctx.fillStyle = '#1c1c28';
  ctx.beginPath(); ctx.arc(W - 68, headY + 26, 26, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 14px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('RT', W - 68, headY + 31);
  ctx.textAlign = 'left';

  // 4. Iconic Apple Activity Rings Widget (Three Concentric Rings)
  const ringCardY = headY + 70;
  const ringCardH = 220;
  ctx.fillStyle = '#12121c';
  rrect(ctx, 36, ringCardY, W - 72, ringCardH, 24);
  ctx.fill();
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.25)';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Activity Rings Visual (Left side)
  const rcX = 130;
  const rcY = ringCardY + 110;

  // Move Ring (Red)
  ctx.strokeStyle = 'rgba(255, 51, 34, 0.2)';
  ctx.lineWidth = 14;
  ctx.beginPath(); ctx.arc(rcX, rcY, 68, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = '#ff3322';
  ctx.beginPath(); ctx.arc(rcX, rcY, 68, -Math.PI / 2, Math.PI * 1.35); ctx.stroke();

  // Exercise Ring (Green)
  ctx.strokeStyle = 'rgba(52, 211, 153, 0.2)';
  ctx.lineWidth = 14;
  ctx.beginPath(); ctx.arc(rcX, rcY, 48, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = '#34d399';
  ctx.beginPath(); ctx.arc(rcX, rcY, 48, -Math.PI / 2, Math.PI * 1.55); ctx.stroke();

  // Stand Ring (Cyan)
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
  ctx.lineWidth = 14;
  ctx.beginPath(); ctx.arc(rcX, rcY, 28, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = '#38bdf8';
  ctx.beginPath(); ctx.arc(rcX, rcY, 28, -Math.PI / 2, Math.PI * 1.2); ctx.stroke();

  // Ring Data Metrics (Right side)
  const rx = 240;
  const ringsData = [
    { label: 'E2E TEST PASS RATE', val: '99.4%', col: '#ff3322', goal: '148 / 148 Passed' },
    { label: 'API CONTRACT GATE', val: '100%', col: '#34d399', goal: '48 / 48 Validated' },
    { label: 'SQL DATA INTEGRITY', val: '100%', col: '#38bdf8', goal: '1,280 Rows Synced' },
  ];
  ringsData.forEach((rd, i) => {
    const ry = ringCardY + 48 + i * 54;
    ctx.fillStyle = rd.col;
    ctx.beginPath(); ctx.arc(rx, ry + 12, 6, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 18px "Syne", -apple-system, sans-serif';
    ctx.fillText(`${rd.val}  `, rx + 16, ry + 18);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '600 13px -apple-system, sans-serif';
    ctx.fillText(`· ${rd.goal}`, rx + 95, ry + 17);
  });

  // 5. Section Title: Verified Inset Group
  const groupTitleY = ringCardY + ringCardH + 34;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.font = '700 13px -apple-system, sans-serif';
  ctx.fillText('CRITICAL USER JOURNEYS', 44, groupTitleY);

  // 6. Inset Grouped Table (Apple Settings / Health Style)
  const tableY = groupTitleY + 14;
  const tableH = 460;
  ctx.fillStyle = '#14141e';
  rrect(ctx, 36, tableY, W - 72, tableH, 22);
  ctx.fill();

  const iosRows = [
    {
      icon: '🏃',
      iconBg: '#ff9500', // Apple Orange
      title: 'Exploratory & Edge Scenarios',
      desc: 'Tested across iPhone 15 & iPad views',
      value: '18 / 18 Verified',
    },
    {
      icon: '⚡',
      iconBg: '#34c759', // Apple Green
      title: 'REST API Payload Contracts',
      desc: 'Postman Collections · 200 OK',
      value: '48 Endpoints',
    },
    {
      icon: '🗄',
      iconBg: '#af52de', // Apple Purple
      title: 'PostgreSQL Relational Sync',
      desc: 'Foreign key checks & zero data loss',
      value: 'Committed',
    },
    {
      icon: '🛡',
      iconBg: '#007aff', // Apple Blue
      title: 'Cross-Platform State Parity',
      desc: 'Business logic matches Web & Android',
      value: '100% Parity',
    },
  ];

  const rowH = tableH / iosRows.length;
  iosRows.forEach((row, i) => {
    const ry = tableY + i * rowH;

    // Divider line between rows
    if (i > 0) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(115, ry, W - 151, 1);
    }

    // Squircle Icon
    ctx.fillStyle = row.iconBg;
    rrect(ctx, 56, ry + 22, 46, 46, 12);
    ctx.fill();
    ctx.font = '700 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(row.icon, 79, ry + 54);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 18px -apple-system, sans-serif';
    ctx.fillText(row.title, 118, ry + 42);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '500 14px -apple-system, sans-serif';
    ctx.fillText(row.desc, 118, ry + 68);

    // Right value + Chevron
    ctx.fillStyle = '#a855f7';
    ctx.font = '700 14px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(row.value, W - 85, ry + 48);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.font = '600 20px -apple-system, sans-serif';
    ctx.fillText('›', W - 60, ry + 49);
    ctx.textAlign = 'left';
  });

  // 7. Frosted iOS Tab Bar
  const tabY = H - 110;
  ctx.fillStyle = 'rgba(18, 18, 28, 0.9)';
  ctx.fillRect(0, tabY, W, 110);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.strokeRect(0, tabY, W, 1);

  const tabs = ['Summary', 'Automation', 'Diagnostics', 'Profile'];
  const icons = ['📊', '⚡', '🔬', '👤'];
  const tw = W / tabs.length;
  tabs.forEach((tab, i) => {
    const isAct = i === 0;
    ctx.fillStyle = isAct ? '#a855f7' : 'rgba(255, 255, 255, 0.45)';
    ctx.font = '700 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(icons[i], i * tw + tw / 2, tabY + 40);

    ctx.font = '700 12px -apple-system, sans-serif';
    ctx.fillText(tab, i * tw + tw / 2, tabY + 62);
    ctx.textAlign = 'left';
  });

  // 8. Apple Home Indicator Bar
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  rrect(ctx, W / 2 - 90, H - 24, 180, 5, 2.5);
  ctx.fill();

  ctx.restore();
}
