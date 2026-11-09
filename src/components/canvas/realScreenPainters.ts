// Photo-Realistic, Authentic Multi-Screen Application Painters
// 3 Complete High-Fidelity Screens per device platform (12 production screens total):
// 1. Web: 0) Cloud QA Dashboard, 1) E2E Test Suite Terminal, 2) Postman REST API Explorer
// 2. PWA: 0) Storefront & Catalog, 1) Checkout & Payment Modal, 2) Service Worker Cache Inspector
// 3. Android: 0) Material 3 Release Health, 1) Mobile Gesture Automation, 2) Network Traffic Inspector
// 4. iOS: 0) QA Diagnostics & Vitals, 1) XCTest Automation Suite, 2) Cross-Platform Parity Matrix

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

/* ==========================================================================
   01 · WEB APPLICATIONS (Apple Studio Display 32" · 1600 x 1000)
   ========================================================================== */
export function paintRealWebScreen(
  ctx: CanvasRenderingContext2D,
  t: number,
  screenIdx: number = 0
) {
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
  const tabTitles = [
    'SkyStone Cloud QA · Executive Dashboard',
    'Playwright & Selenium · E2E Test Runner',
    'Postman REST API · Contract Gateway',
  ];
  const curTab = tabTitles[screenIdx % 3];

  ctx.fillStyle = '#1b2230';
  rrect(ctx, 92, 8, 290, 36, 8);
  ctx.fill();
  ctx.fillStyle = '#ff3322';
  ctx.beginPath(); ctx.arc(110, 26, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(curTab, 122, 30);

  // URL Box
  const urlX = 400;
  const urlW = W - urlX - 60;
  ctx.fillStyle = '#0a0d13';
  rrect(ctx, urlX, 10, urlW, 30, 6);
  ctx.fill();
  ctx.fillStyle = '#34d399';
  ctx.font = '700 11px monospace';
  const urls = [
    '🔒 https://cloud.skystone.tech/app/v2/analytics-dashboard',
    '🔒 https://cloud.skystone.tech/app/v2/runner/e2e-suite',
    '🔒 https://cloud.skystone.tech/app/v2/api-contracts/postman',
  ];
  ctx.fillText(urls[screenIdx % 3], urlX + 16, 29);

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
  const navItems = ['Dashboard', 'E2E Suites', 'API Contracts', 'PostgreSQL Explorer', 'Jira STLC', 'Settings'];
  let nx = 230;
  navItems.forEach((item, idx) => {
    const isSel = idx === screenIdx % 3;
    if (isSel) {
      ctx.fillStyle = '#ff3322';
      ctx.fillRect(nx, navY + navH - 3, 85, 3);
      ctx.fillStyle = '#ffffff';
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    }
    ctx.font = '700 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(item, nx + 6, navY + 34);
    nx += 125;
  });

  // Screen Switcher Pill in Top Bar
  const pillW = 200;
  const pillX = W - pillW - 120;
  ctx.fillStyle = '#182030';
  rrect(ctx, pillX, navY + 14, pillW, 30, 15);
  ctx.fill();
  ctx.fillStyle = '#38bdf8';
  ctx.font = '800 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`VIEW: SCREEN 0${(screenIdx % 3) + 1} OF 03`, pillX + pillW / 2, navY + 33);
  ctx.textAlign = 'left';

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
    { icon: '📊', label: 'Executive Overview', active: screenIdx % 3 === 0 },
    { icon: '⚡', label: 'E2E Automation Suites', active: screenIdx % 3 === 1, count: '148' },
    { icon: '🌐', label: 'Postman REST APIs', active: screenIdx % 3 === 2, count: '48' },
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

  // 4. Main Canvas Area
  const mainX = sbW + 28;
  const mainY = bodyY + 24;
  const mainW = W - mainX - 28;

  if (screenIdx % 3 === 0) {
    // SCREEN 0: Executive QA Dashboard
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

      ctx.fillStyle = kpi.pillCol;
      ctx.font = '700 11px monospace';
      ctx.fillText(`● ${kpi.pill}`, kx + 20, mainY + 102);
    });

    // Area Curve
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
    pts.forEach((pt) => {
      const px = mainX + 22 + pt.x * chartW;
      const py = chartY0 - (1 - pt.y) * chartH;
      ctx.lineTo(px, py);
    });
    ctx.lineTo(mainX + 22 + chartW, chartY0);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, graphY + 45, 0, chartY0);
    grad.addColorStop(0, 'rgba(255, 51, 34, 0.35)');
    grad.addColorStop(1, 'rgba(255, 51, 34, 0.0)');
    ctx.fillStyle = grad;
    ctx.fill();

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

    // Table
    const tableY = graphY + graphH + 20;
    const tableH = H - tableY - 24;
    ctx.fillStyle = '#10141e';
    rrect(ctx, mainX, tableY, mainW, tableH, 12);
    ctx.fill();

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
      { status: 'PASS', name: 'User Authentication & Multi-Role Permission Gate', tool: 'Java + Selenium POM', dur: '1.24s', res: '200 OK · JWT Active' },
      { status: 'PASS', name: 'Multi-Step Checkout with Boundary Form Limits', tool: 'Playwright (Java)', dur: '2.18s', res: 'DB Row Committed' },
      { status: 'PASS', name: 'Inventory Bulk CSV Ingestion & Foreign Key Check', tool: 'TestNG DataProvider', dur: '3.42s', res: 'SQL 50 Rows OK' },
      { status: 'PASS', name: 'Async Payment Webhook Retries & Idempotency', tool: 'REST API + DB Mock', dur: '0.86s', res: 'Verified Idempotent' },
      { status: 'PASS', name: 'Cross-Browser Viewport Matrix (Chromium, WebKit)', tool: 'Maven Parallel Grid', dur: '4.10s', res: '100% Parity' },
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
  } else if (screenIdx % 3 === 1) {
    // SCREEN 1: Playwright / Selenium Automated Test Terminal & Execution Trace
    ctx.fillStyle = '#0f131c';
    rrect(ctx, mainX, mainY, mainW, H - mainY - 24, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.2)';
    ctx.stroke();

    // Terminal Titlebar
    ctx.fillStyle = '#161c29';
    rrect(ctx, mainX, mainY, mainW, 44, 14);
    ctx.fill();
    ctx.fillStyle = '#34d399';
    ctx.font = '800 12px monospace';
    ctx.fillText('▶ PLAYWRIGHT (JAVA) & SELENIUM WEBDRIVER · LIVE TEST SUITE EXECUTION', mainX + 24, mainY + 28);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('148/148 PASSED · DURATION: 12.8s', mainX + mainW - 24, mainY + 28);
    ctx.textAlign = 'left';

    const testLogs = [
      { time: '00:00.12', type: 'INFO', text: '[Context] Initialized Chromium headless browser in 1920x1080 viewport matrix', col: '#a5d6ff' },
      { time: '00:01.04', type: 'STEP', text: 'page.navigate("https://cloud.skystone.tech/auth/login") -> 200 OK received in 42ms', col: '#7ee787' },
      { time: '00:01.35', type: 'ACTION', text: 'page.locator("#email").fill("ritik.thakre@skystone.ai") -> DOM Value Bound', col: '#d2a8ff' },
      { time: '00:01.55', type: 'ACTION', text: 'page.locator("#password").fill("••••••••••••") -> Masked boundary input verified', col: '#d2a8ff' },
      { time: '00:02.10', type: 'STEP', text: 'page.locator("button#submit").click() -> Triggered POST /api/v2/auth/session', col: '#7ee787' },
      { time: '00:02.48', type: 'ASSERT', text: 'expect(page.locator(".dashboard-header")).toBeVisible() -> PASS (Assertion matched)', col: '#34d399' },
      { time: '00:03.12', type: 'STEP', text: 'OrderWorkflow.initiateCheckout(items=[UUID_491, UUID_812], currency="USD")', col: '#ffa657' },
      { time: '00:04.20', type: 'ASSERT', text: 'expect(response.status()).toBe(200) & expect(payload.order_status).toBe("COMMITTED")', col: '#34d399' },
      { time: '00:05.15', type: 'SQL', text: 'SELECT * FROM orders WHERE id = 89201; -> Confirmed 1 row persisted with foreign keys', col: '#ff7b72' },
      { time: '00:06.02', type: 'TEARDOWN', text: 'Session trace and DOM video recorded -> Saved to artifacts/e2e-suite-run.zip', col: '#8b949e' },
    ];

    testLogs.forEach((l, idx) => {
      const ly = mainY + 76 + idx * 42;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '500 12px monospace';
      ctx.fillText(l.time, mainX + 24, ly);

      ctx.fillStyle = l.col;
      ctx.font = '800 12px monospace';
      ctx.fillText(`[${l.type}]`, mainX + 110, ly);

      ctx.fillStyle = '#ffffff';
      ctx.font = '600 13px monospace';
      ctx.fillText(l.text, mainX + 220, ly);
    });

    // Big green footer banner
    const footY = H - 90;
    ctx.fillStyle = 'rgba(52, 211, 153, 0.12)';
    rrect(ctx, mainX + 24, footY, mainW - 48, 50, 10);
    ctx.fill();
    ctx.fillStyle = '#34d399';
    ctx.font = '800 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('✓ 100% REGRESSION PARITY · ZERO ASSERTION FAILURES · READY FOR RELEASE SIGN-OFF', mainX + 44, footY + 31);
  } else {
    // SCREEN 2: Postman REST API Contract Gateway & JSON Payloads
    ctx.fillStyle = '#10141e';
    rrect(ctx, mainX, mainY, mainW, H - mainY - 24, 14);
    ctx.fill();

    // Split Left: Endpoints List, Right: JSON Payload Editor
    const col1W = 380;
    const col2X = mainX + col1W + 18;
    const col2W = mainW - col1W - 18;

    // Col 1 Title
    ctx.fillStyle = '#171d2b';
    rrect(ctx, mainX, mainY, col1W, 40, 12);
    ctx.fill();
    ctx.fillStyle = '#38bdf8';
    ctx.font = '800 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('POSTMAN COLLECTION · 48 ENDPOINTS', mainX + 20, mainY + 26);

    const endpoints = [
      { method: 'POST', ep: '/api/v2/auth/session', status: '200 OK', time: '34ms' },
      { method: 'GET', ep: '/api/v2/catalog/items', status: '200 OK', time: '18ms' },
      { method: 'POST', ep: '/api/v2/checkout/intent', status: '201 CREATED', time: '48ms' },
      { method: 'PUT', ep: '/api/v2/inventory/sync', status: '200 OK', time: '62ms' },
      { method: 'POST', ep: '/api/v2/webhooks/stripe', status: '200 OK', time: '22ms' },
      { method: 'GET', ep: '/api/v2/analytics/audit', status: '200 OK', time: '41ms' },
    ];
    endpoints.forEach((ep, i) => {
      const ey = mainY + 54 + i * 58;
      ctx.fillStyle = i === 2 ? 'rgba(56, 189, 248, 0.15)' : '#141a27';
      rrect(ctx, mainX + 12, ey, col1W - 24, 50, 8);
      ctx.fill();

      ctx.fillStyle = ep.method === 'POST' ? '#ff7b72' : ep.method === 'PUT' ? '#d2a8ff' : '#7ee787';
      ctx.font = '800 11px monospace';
      ctx.fillText(ep.method, mainX + 26, ey + 30);

      ctx.fillStyle = '#ffffff';
      ctx.font = '600 12px monospace';
      ctx.fillText(ep.ep, mainX + 80, ey + 30);

      ctx.fillStyle = '#34d399';
      ctx.font = '700 10px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`${ep.status} (${ep.time})`, mainX + col1W - 24, ey + 30);
      ctx.textAlign = 'left';
    });

    // Col 2: Contract Schema Inspector
    ctx.fillStyle = '#171d2b';
    rrect(ctx, col2X, mainY, col2W, 40, 12);
    ctx.fill();
    ctx.fillStyle = '#34d399';
    ctx.font = '800 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('REQUEST / RESPONSE CONTRACT PAYLOAD · SCHEMA STRICT', col2X + 20, mainY + 26);

    const jsonLines = [
      '{',
      '  "status": "SUCCESS",',
      '  "http_code": 201,',
      '  "data": {',
      '    "order_id": 89201,',
      '    "customer_uuid": "e814a0cb-419b-4b2a-89a5-48b0a11e24bc",',
      '    "payment_intent": "pi_3M2eFk2eZvKYlo2C1f82P0",',
      '    "currency": "USD",',
      '    "amount_cents": 49900,',
      '    "items": [',
      '      { "sku": "QA-AUTO-E2E", "quantity": 1, "verified": true },',
      '      { "sku": "POSTMAN-API-GATE", "quantity": 1, "verified": true }',
      '    ],',
      '    "database_sync": {',
      '      "postgres_committed": true,',
      '      "foreign_key_match": 100,',
      '      "audit_logged_at": "2026-11-09T14:00:00Z"',
      '    }',
      '  }',
      '}'
    ];
    ctx.font = '500 13px monospace';
    jsonLines.forEach((jl, i) => {
      const jy = mainY + 70 + i * 22;
      if (jl.includes('true') || jl.includes('201') || jl.includes('100')) ctx.fillStyle = '#7ee787';
      else if (jl.includes('"status"') || jl.includes('"order_id"') || jl.includes('"database_sync"')) ctx.fillStyle = '#79c0ff';
      else ctx.fillStyle = '#c9d1d9';
      ctx.fillText(jl, col2X + 24, jy);
    });
  }

  ctx.restore();
}

/* ==========================================================================
   02 · PROGRESSIVE WEB APPS (Liquid Retina iPad Pro · 1400 x 1000)
   ========================================================================== */
export function paintRealPwaScreen(
  ctx: CanvasRenderingContext2D,
  t: number,
  screenIdx: number = 0
) {
  const W = ctx.canvas.width;
  const H = ctx.canvas.height;
  ctx.save();
  ctx.clearRect(0, 0, W, H);

  // Background
  ctx.fillStyle = '#0a0d14';
  ctx.fillRect(0, 0, W, H);

  // 1. Top PWA Status Banner
  ctx.fillStyle = '#111726';
  ctx.fillRect(0, 0, W, 40);
  ctx.fillStyle = '#38bdf8';
  ctx.font = '700 11px monospace';
  ctx.fillText('⚡ PROGRESSIVE WEB APP · SERVICE WORKER INSTALLED · CACHE: 100% · REST: SYNCED', 24, 25);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#34d399';
  ctx.fillText('● ONLINE (REST COMMITTED)', W - 24, 25);
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
  ctx.fillText('APEX STORE · PWA', 74, headY + 35);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Ionic Progressive Web App & Offline Architecture', 74, headY + 50);

  // Search Bar
  const sW = 380;
  const sX = W / 2 - sW / 2;
  ctx.fillStyle = '#171e30';
  rrect(ctx, sX, headY + 16, sW, 36, 18);
  ctx.fill();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('🔍 Search products, components, APIs...', sX + 18, headY + 39);

  // Screen Switcher Pill
  ctx.fillStyle = '#1c253b';
  rrect(ctx, W - 240, headY + 16, 216, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#38bdf8';
  ctx.font = '700 11px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`TAB: 0${(screenIdx % 3) + 1} / 03 · CLICK TO SWITCH`, W - 132, headY + 38);
  ctx.textAlign = 'left';

  if (screenIdx % 3 === 0) {
    // SCREEN 0: Storefront & Service Hub
    const catY = headY + headH + 18;
    const cats = ['★ All Services', 'Automated QA', 'REST API Contracts', 'SQL Persistence', 'Mobile Builds', 'Cloud Webhooks'];
    let cx = 24;
    cats.forEach((c, idx) => {
      const isSel = idx === 0;
      const catW = 140;
      ctx.fillStyle = isSel ? '#38bdf8' : '#131926';
      rrect(ctx, cx, catY, catW, 34, 17);
      ctx.fill();
      ctx.fillStyle = isSel ? '#040d1a' : 'rgba(255, 255, 255, 0.7)';
      ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(c, cx + catW / 2, catY + 22);
      ctx.textAlign = 'left';
      cx += catW + 12;
    });

    const heroY = catY + 54;
    const heroH = 180;
    ctx.fillStyle = '#111728';
    rrect(ctx, 24, heroY, W - 48, heroH, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = '800 12px monospace';
    ctx.fillText('AUTONOMOUS TEST PIPELINE v4.2 · PRODUCTION READY', 52, heroY + 40);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 28px "Syne", sans-serif';
    ctx.fillText('Quality Engineering with AI-Assisted Precision', 52, heroY + 76);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.font = '500 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('End-to-end exploratory verification, Postman REST payloads & PostgreSQL data integrity.', 52, heroY + 106);

    ctx.fillStyle = '#38bdf8';
    rrect(ctx, 52, heroY + 126, 180, 38, 19);
    ctx.fill();
    ctx.fillStyle = '#050a12';
    ctx.font = '800 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('⚡ Deploy Test Suite', 78, heroY + 150);

    // 3 Product Cards
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
        accentCol: '#38bdf8',
      },
      {
        badge: 'API CONTRACT',
        name: 'Postman REST Payload Gateway',
        desc: 'Automated 200 OK validations across 48 backend endpoints.',
        rating: '★★★★★ 5.0',
        price: '$299 / mo',
        accentCol: '#34d399',
      },
      {
        badge: 'DATA INTEGRITY',
        name: 'PostgreSQL Relational Verifier',
        desc: 'Foreign key checks, transaction rollback, and CRUD audit logs.',
        rating: '★★★★☆ 4.8',
        price: '$199 / mo',
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

      ctx.fillStyle = '#38bdf8';
      rrect(ctx, px + 20, gridY + 192, cardW - 40, 36, 10);
      ctx.fill();
      ctx.fillStyle = '#050a12';
      ctx.font = '800 12px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('+ Add to Workflow', px + cardW / 2, gridY + 215);
      ctx.textAlign = 'left';
    });
  } else if (screenIdx % 3 === 1) {
    // SCREEN 1: Interactive Cart & Checkout Modal
    const modalW = 860;
    const modalH = 580;
    const mX = W / 2 - modalW / 2;
    const mY = headY + headH + 40;

    ctx.fillStyle = '#111726';
    rrect(ctx, mX, mY, modalW, modalH, 18);
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 24px "Syne", sans-serif';
    ctx.fillText('Order Summary & Checkout Verification', mX + 36, mY + 48);

    const cartItems = [
      { name: 'Java + Selenium E2E Automation Engine', plan: 'Enterprise License · 1 Year', price: '$499.00' },
      { name: 'Postman REST API Contract Test Suite', plan: 'Continuous CI/CD Gate · 48 Endpoints', price: '$299.00' },
      { name: 'PostgreSQL Relational Data Integrity Validator', plan: 'Zero Data Loss Protocol', price: '$199.00' },
    ];
    cartItems.forEach((ci, i) => {
      const cy = mY + 85 + i * 78;
      ctx.fillStyle = '#161e30';
      rrect(ctx, mX + 36, cy, modalW - 72, 64, 10);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 15px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(ci.name, mX + 54, cy + 28);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '500 12px monospace';
      ctx.fillText(ci.plan, mX + 54, cy + 48);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 17px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(ci.price, mX + modalW - 54, cy + 38);
      ctx.textAlign = 'left';
    });

    // Total
    const totY = mY + 345;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(mX + 36, totY, modalW - 72, 1);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 20px "Syne", sans-serif';
    ctx.fillText('TOTAL DUE:', mX + 36, totY + 40);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#34d399';
    ctx.font = '800 28px "Syne", sans-serif';
    ctx.fillText('$997.00 USD', mX + modalW - 36, totY + 44);
    ctx.textAlign = 'left';

    // Checkout Button
    ctx.fillStyle = '#34d399';
    rrect(ctx, mX + 36, totY + 70, modalW - 72, 54, 14);
    ctx.fill();
    ctx.fillStyle = '#051910';
    ctx.font = '800 17px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🔒 Complete Order & Commit to PostgreSQL (200 OK)', mX + modalW / 2, totY + 104);
    ctx.textAlign = 'left';
  } else {
    // SCREEN 2: Service Worker & Offline Cache Inspector
    const boxW = W - 48;
    const boxH = 580;
    const bY = headY + headH + 30;

    ctx.fillStyle = '#0f1422';
    rrect(ctx, 24, bY, boxW, boxH, 16);
    ctx.fill();

    ctx.fillStyle = '#38bdf8';
    ctx.font = '800 13px monospace';
    ctx.fillText('OFFLINE ARCHITECTURE · SERVICE WORKER & INDEXEDDB CACHE', 52, bY + 40);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 24px "Syne", sans-serif';
    ctx.fillText('Seamless Offline & Online Continuity Verification', 52, bY + 76);

    const cacheRows = [
      { key: 'CACHE_STORAGE', val: 'sw-precache-v4.2 · 42 assets (100% cached)', stat: 'HEALTHY' },
      { key: 'OFFLINE_DATABASE', val: 'IndexedDB "skystone_orders" · 3 orders queued', stat: 'SYNCHRONIZED' },
      { key: 'BACKGROUND_SYNC', val: 'SyncManager tag "sync-orders" · Next sync on reconnect', stat: 'LISTENING' },
      { key: 'SERVICE_WORKER', val: 'sw.js active & running · Scope: https://apex-store.pwa/', stat: 'ACTIVE' },
    ];
    cacheRows.forEach((cr, i) => {
      const ry = bY + 110 + i * 85;
      ctx.fillStyle = '#141c2e';
      rrect(ctx, 52, ry, boxW - 56, 70, 10);
      ctx.fill();

      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 12px monospace';
      ctx.fillText(cr.key, 72, ry + 28);

      ctx.fillStyle = '#ffffff';
      ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(cr.val, 72, ry + 52);

      ctx.fillStyle = '#34d399';
      ctx.font = '800 12px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`● ${cr.stat}`, boxW - 40, ry + 40);
      ctx.textAlign = 'left';
    });
  }

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

/* ==========================================================================
   03 · ANDROID APPLICATIONS (Samsung Galaxy S24 Ultra · 750 x 1550)
   ========================================================================== */
export function paintRealAndroidScreen(
  ctx: CanvasRenderingContext2D,
  t: number,
  screenIdx: number = 0
) {
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

  // Screen Indicator Pill
  ctx.fillStyle = 'rgba(52, 211, 153, 0.15)';
  rrect(ctx, W / 2 - 110, 36, 220, 28, 14);
  ctx.fill();
  ctx.fillStyle = '#34d399';
  ctx.font = '800 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`ANDROID SCREEN 0${(screenIdx % 3) + 1} OF 03`, W / 2, 54);
  ctx.textAlign = 'left';

  if (screenIdx % 3 === 0) {
    // SCREEN 0: Material You 3 Release Health Dashboard
    const searchY = 78;
    const searchH = 68;
    ctx.fillStyle = '#14211a';
    rrect(ctx, 32, searchY, W - 64, searchH, 34);
    ctx.fill();
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.2)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.fillStyle = '#34d399';
    ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('🔍', 56, searchY + 43);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.font = '500 17px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Search tests, APIs & tickets...', 96, searchY + 42);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '700 18px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('🎙  📷', W - 56, searchY + 42);
    ctx.textAlign = 'left';

    const chipY = searchY + searchH + 20;
    const chips = ['✓ All Workflows', 'Automated E2E', 'REST APIs', 'SQL Database'];
    let chX = 32;
    chips.forEach((ch, idx) => {
      const isAct = idx === 0;
      const cW = 155;
      ctx.fillStyle = isAct ? '#34d399' : '#131e18';
      rrect(ctx, chX, chipY, cW, 40, 20);
      ctx.fill();
      ctx.fillStyle = isAct ? '#051910' : 'rgba(255, 255, 255, 0.7)';
      ctx.font = '700 14px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(ch, chX + cW / 2, chipY + 25);
      ctx.textAlign = 'left';
      chX += cW + 12;
    });

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

    const listY = heroY + heroH + 34;
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 22px "Syne", sans-serif';
    ctx.fillText('Recent Verification Activities', 36, listY);

    const feedItems = [
      { icon: '🛡', iconBg: '#1e3a5f', title: 'User Authentication & Multi-Factor', sub: 'Java Selenium POM · Regression Suite', pill: 'PASS · 200 OK', pillCol: '#34d399' },
      { icon: '💳', iconBg: '#3b2164', title: 'Stripe Multi-Currency Payment Intent', sub: 'Playwright (Java) · Boundary Form Tests', pill: 'COMMITTED', pillCol: '#38bdf8' },
      { icon: '🗄', iconBg: '#442d13', title: 'Relational DB Foreign Key Check', sub: 'PostgreSQL · 50 Rows Ingestion Match', pill: 'ZERO LOSS', pillCol: '#fbbf24' },
      { icon: '📋', iconBg: '#421616', title: 'Jira Defect Reproduction Lifecycle', sub: 'STLC Sprint Gate · Evidence Captured', pill: 'RESOLVED', pillCol: '#ff7b72' },
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

      ctx.fillStyle = f.pillCol;
      ctx.font = '800 12px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`● ${f.pill}`, W - 52, fy + 44);
      ctx.textAlign = 'left';
    });
  } else if (screenIdx % 3 === 1) {
    // SCREEN 1: Mobile Gesture & Touch Automation Runner
    const barY = 85;
    ctx.fillStyle = '#121e17';
    rrect(ctx, 32, barY, W - 64, 80, 20);
    ctx.fill();
    ctx.fillStyle = '#34d399';
    ctx.font = '800 13px monospace';
    ctx.fillText('MOBILE GESTURE & TOUCH REGRESSION SUITE', 54, barY + 34);
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 22px "Syne", sans-serif';
    ctx.fillText('Galaxy S24 Ultra · Dynamic AMOLED 120Hz', 54, barY + 62);

    const gestureTests = [
      { gesture: '👆 Single Tap', target: 'Button #checkout-intent', result: '200 OK · Navigation Triggered', dur: '18ms' },
      { gesture: '↔ Horizontal Swipe', target: 'ViewPager #product-cards', result: 'Page 3 of 5 Swiped with Haptic', dur: '42ms' },
      { gesture: '↕ Vertical Scroll', target: 'RecyclerView #transactions', result: '60 FPS Smooth Inertia Render', dur: '12ms' },
      { gesture: '🤏 Pinch-to-Zoom', target: 'ImageView #product-schematic', result: 'Scaled 2.5x without Memory Spike', dur: '30ms' },
      { gesture: '📱 Deep Link Intent', target: 'skystone://verify/order/89201', result: 'Activity Resolved in 0.22s', dur: '22ms' },
    ];
    gestureTests.forEach((gt, i) => {
      const gy = barY + 104 + i * 115;
      ctx.fillStyle = '#101a14';
      rrect(ctx, 32, gy, W - 64, 100, 18);
      ctx.fill();
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.18)';
      ctx.stroke();

      ctx.fillStyle = '#34d399';
      ctx.font = '800 17px "Syne", sans-serif';
      ctx.fillText(gt.gesture, 52, gy + 36);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.font = '500 13px monospace';
      ctx.fillText(`Target: ${gt.target}`, 52, gy + 62);

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 14px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`✓ ${gt.result}`, 52, gy + 84);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 13px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(gt.dur, W - 52, gy + 36);
      ctx.textAlign = 'left';
    });
  } else {
    // SCREEN 2: Android REST API & Network Inspector
    const netY = 85;
    ctx.fillStyle = '#101c15';
    rrect(ctx, 32, netY, W - 64, 110, 20);
    ctx.fill();
    ctx.fillStyle = '#38bdf8';
    ctx.font = '800 13px monospace';
    ctx.fillText('REAL-TIME MOBILE NETWORK & API MONITOR', 54, netY + 38);
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 22px "Syne", sans-serif';
    ctx.fillText('Bearer Session · 200 OK Status Active', 54, netY + 68);
    ctx.fillStyle = '#34d399';
    ctx.font = '700 13px monospace';
    ctx.fillText('● Average Latency: 22ms · 0 Dropped Packets', 54, netY + 94);

    const apiLogs = [
      { m: 'POST', u: '/v1/android/session', res: '200 OK', s: '1.2 KB', lat: '18ms' },
      { m: 'GET', u: '/v1/android/config/flags', res: '200 OK', s: '4.8 KB', lat: '12ms' },
      { m: 'POST', u: '/v1/orders/create', res: '201 CREATED', s: '12.4 KB', lat: '44ms' },
      { m: 'PUT', u: '/v1/user/biometrics/verify', res: '200 OK', s: '0.8 KB', lat: '16ms' },
      { m: 'GET', u: '/v1/telemetry/health', res: '200 OK', s: '2.1 KB', lat: '24ms' },
    ];
    apiLogs.forEach((al, i) => {
      const ay = netY + 130 + i * 110;
      ctx.fillStyle = '#121e17';
      rrect(ctx, 32, ay, W - 64, 96, 18);
      ctx.fill();

      ctx.fillStyle = al.m === 'POST' ? '#ff7b72' : al.m === 'PUT' ? '#d2a8ff' : '#7ee787';
      ctx.font = '800 13px monospace';
      ctx.fillText(al.m, 54, ay + 36);

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 16px monospace';
      ctx.fillText(al.u, 120, ay + 36);

      ctx.fillStyle = '#34d399';
      ctx.font = '800 14px monospace';
      ctx.fillText(`✓ ${al.res}`, 54, ay + 72);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.font = '500 13px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`Size: ${al.s} · Lat: ${al.lat}`, W - 54, ay + 72);
      ctx.textAlign = 'left';
    });
  }

  // Floating Action Button (FAB) at bottom-right
  const fabX = W - 110;
  const fabY = H - 180;
  ctx.fillStyle = '#34d399';
  ctx.beginPath(); ctx.arc(fabX, fabY, 36, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#051910';
  ctx.font = '800 36px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('+', fabX, fabY + 12);
  ctx.textAlign = 'left';

  // Material 3 Bottom Navigation Bar
  const bNavY = H - 90;
  ctx.fillStyle = '#0e1713';
  rrect(ctx, 32, bNavY, W - 64, 68, 22);
  ctx.fill();

  const navTabs = ['🏠 Home', '⚡ Workflows', '📈 Analytics', '👤 Settings'];
  const nW = (W - 64) / navTabs.length;
  navTabs.forEach((nt, i) => {
    if (i === 0) {
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

/* ==========================================================================
   04 · iOS APPLICATIONS (Apple iPhone 15 Pro Max · 750 x 1620)
   ========================================================================== */
export function paintRealIosScreen(
  ctx: CanvasRenderingContext2D,
  t: number,
  screenIdx: number = 0
) {
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

  const screenTitles = ['QA Diagnostics', 'XCTest Automation', 'Parity Matrix'];
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 38px "Syne", -apple-system, sans-serif';
  ctx.fillText(screenTitles[screenIdx % 3], 44, headY + 44);

  // Screen indicator badge
  ctx.fillStyle = 'rgba(168, 85, 247, 0.2)';
  rrect(ctx, W - 180, headY + 12, 136, 32, 16);
  ctx.fill();
  ctx.fillStyle = '#a855f7';
  ctx.font = '800 11px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`SCREEN 0${(screenIdx % 3) + 1}/03`, W - 112, headY + 32);
  ctx.textAlign = 'left';

  if (screenIdx % 3 === 0) {
    // SCREEN 0: Apple Health / Diagnostics Vitals with Activity Rings
    const ringCardY = headY + 70;
    const ringCardH = 220;
    ctx.fillStyle = '#12121c';
    rrect(ctx, 36, ringCardY, W - 72, ringCardH, 24);
    ctx.fill();
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.25)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

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

    const groupTitleY = ringCardY + ringCardH + 34;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.font = '700 13px -apple-system, sans-serif';
    ctx.fillText('CRITICAL USER JOURNEYS', 44, groupTitleY);

    const tableY = groupTitleY + 14;
    const tableH = 460;
    ctx.fillStyle = '#14141e';
    rrect(ctx, 36, tableY, W - 72, tableH, 22);
    ctx.fill();

    const iosRows = [
      { icon: '🏃', iconBg: '#ff9500', title: 'Exploratory & Edge Scenarios', desc: 'Tested across iPhone 15 & iPad views', value: '18 / 18 Verified' },
      { icon: '⚡', iconBg: '#34c759', title: 'REST API Payload Contracts', desc: 'Postman Collections · 200 OK', value: '48 Endpoints' },
      { icon: '🗄', iconBg: '#af52de', title: 'PostgreSQL Relational Sync', desc: 'Foreign key checks & zero data loss', value: 'Committed' },
      { icon: '🛡', iconBg: '#007aff', title: 'Cross-Platform State Parity', desc: 'Business logic matches Web & Android', value: '100% Parity' },
    ];

    const rowH = tableH / iosRows.length;
    iosRows.forEach((row, i) => {
      const ry = tableY + i * rowH;
      if (i > 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fillRect(115, ry, W - 151, 1);
      }

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

      ctx.fillStyle = '#a855f7';
      ctx.font = '700 14px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(row.value, W - 85, ry + 48);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.font = '600 20px -apple-system, sans-serif';
      ctx.fillText('›', W - 60, ry + 49);
      ctx.textAlign = 'left';
    });
  } else if (screenIdx % 3 === 1) {
    // SCREEN 1: Apple XCTest Suite & TestFlight Release Pipeline
    const xcY = headY + 70;
    const xcH = 720;
    ctx.fillStyle = '#12121b';
    rrect(ctx, 36, xcY, W - 72, xcH, 22);
    ctx.fill();

    ctx.fillStyle = '#34d399';
    ctx.font = '800 13px monospace';
    ctx.fillText('XCTEST HARNESS · iOS 18 SIMULATOR & DEVICE MATRIX', 58, xcY + 38);
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 24px "Syne", sans-serif';
    ctx.fillText('148 Tests Executed · 100% Passed', 58, xcY + 70);

    const testSuites = [
      { name: 'AuthenticationTests.swift', tests: '6 tests passed', time: '0.42s' },
      { name: 'CartCheckoutFlowTests.swift', tests: '12 tests passed', time: '1.24s' },
      { name: 'DynamicIslandLiveActivityTests.swift', tests: '4 tests passed', time: '0.18s' },
      { name: 'BiometricFaceIDSecurityTests.swift', tests: '3 tests passed', time: '0.31s' },
      { name: 'OfflineCoreDataSyncTests.swift', tests: '8 tests passed', time: '0.85s' },
      { name: 'NetworkPayloadContractTests.swift', tests: '16 tests passed', time: '1.10s' },
    ];
    testSuites.forEach((ts, i) => {
      const sy = xcY + 100 + i * 95;
      ctx.fillStyle = '#161624';
      rrect(ctx, 54, sy, W - 108, 80, 14);
      ctx.fill();

      ctx.fillStyle = '#34d399';
      ctx.font = '800 18px monospace';
      ctx.fillText('✓', 74, sy + 44);

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 17px -apple-system, sans-serif';
      ctx.fillText(ts.name, 104, sy + 36);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.font = '500 13px monospace';
      ctx.fillText(ts.tests, 104, sy + 62);

      ctx.fillStyle = '#a855f7';
      ctx.font = '800 13px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(ts.time, W - 74, sy + 46);
      ctx.textAlign = 'left';
    });
  } else {
    // SCREEN 2: Cross-Platform Parity Matrix (iOS, Android, Web)
    const pmY = headY + 70;
    const pmH = 720;
    ctx.fillStyle = '#12121b';
    rrect(ctx, 36, pmY, W - 72, pmH, 22);
    ctx.fill();

    ctx.fillStyle = '#a855f7';
    ctx.font = '800 13px monospace';
    ctx.fillText('CROSS-PLATFORM CONTINUITY & PARITY SIGN-OFF', 58, pmY + 38);
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 24px "Syne", sans-serif';
    ctx.fillText('Triple-Viewport Business Logic Parity', 58, pmY + 70);

    const parityRows = [
      { feature: 'Multi-Role User Auth', web: 'PASS', android: 'PASS', ios: 'PASS' },
      { feature: 'Stripe Payment Intent', web: 'PASS', android: 'PASS', ios: 'PASS' },
      { feature: 'SQL Foreign Key Integrity', web: 'PASS', android: 'PASS', ios: 'PASS' },
      { feature: 'Push Notifications & Webhooks', web: 'PASS', android: 'PASS', ios: 'PASS' },
      { feature: 'Offline Service Worker Cache', web: 'PASS', android: 'PASS', ios: 'PASS' },
    ];

    parityRows.forEach((pr, i) => {
      const py = pmY + 110 + i * 110;
      ctx.fillStyle = '#161624';
      rrect(ctx, 54, py, W - 108, 92, 16);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 17px -apple-system, sans-serif';
      ctx.fillText(pr.feature, 74, py + 38);

      ctx.fillStyle = '#34d399';
      ctx.font = '800 12px monospace';
      ctx.fillText(`WEB: ✓ ${pr.web}   ANDROID: ✓ ${pr.android}   iOS: ✓ ${pr.ios}`, 74, py + 68);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 14px monospace';
      ctx.textAlign = 'right';
      ctx.fillText('100% PARITY', W - 74, py + 48);
      ctx.textAlign = 'left';
    });
  }

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
