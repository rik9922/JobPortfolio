import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, PresentationControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const SW = 1600;
const SH = 1036;

const NO_TINT_PARTS = new Set([
  'Object_84',
  'Object_37',
  'Object_34',
  'Object_12',
  'Object_80',
  'Object_35',
  'Object_36',
  'Object_13',
  'Object_125',
  'Object_76',
  'Object_33',
  'Object_42',
  'Object_58',
  'Object_52',
  'Object_21',
  'Object_10',
]);

export interface LaptopStageProps {
  index: number;
  lensIndex: number;
  activeSkill: string | null;
  finishColor: string;
  label: string;
  subtitle: string;
  lenses: { id: string; label: string; caption: string }[];
  skills: string[];
  zoomed: boolean;
  runPulse: number;
  reduced: boolean;
  onSelectLens: (lensIdx: number) => void;
  onTriggerRun: () => void;
}

interface MacbookGLTF {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
  scene: THREE.Group;
}

function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + w, y, x + w, y + h, rad);
  ctx.arcTo(x + w, y + h, x, y + h, rad);
  ctx.arcTo(x, y + h, x, y, rad);
  ctx.arcTo(x, y, x + w, y, rad);
  ctx.closePath();
}

function drawCursorAndClick(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  clicking: boolean,
  tag?: string
) {
  ctx.save();
  ctx.translate(x, y);

  if (clicking) {
    ctx.strokeStyle = '#ff3322';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, 34, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255, 51, 34, 0.28)';
    ctx.fill();
  }

  // High-contrast pointer arrow
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#050507';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 34);
  ctx.lineTo(9, 26);
  ctx.lineTo(16, 40);
  ctx.lineTo(23, 36);
  ctx.lineTo(16, 22);
  ctx.lineTo(27, 22);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  if (tag) {
    ctx.font = '800 18px monospace';
    const tw = ctx.measureText(tag).width + 24;
    rrect(ctx, 26, 24, tw, 34, 8);
    ctx.fillStyle = '#ff3322';
    ctx.fill();
    ctx.fillStyle = '#050505';
    ctx.fillText(tag, 38, 47);
  }
  ctx.restore();
}

function drawLocatorBox(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  selector: string,
  color = '#38bdf8'
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3.5;
  ctx.setLineDash([10, 6]);
  rrect(ctx, x - 4, y - 4, w + 8, h + 8, 12);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.font = '800 16px monospace';
  const lw = ctx.measureText(selector).width + 22;
  const tagX = Math.max(x, x + w - lw);
  rrect(ctx, tagX, y - 32, lw, 28, 6);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.fillStyle = '#050505';
  ctx.fillText(selector, tagX + 11, y - 12);
  ctx.restore();
}

function drawLiveAutomationScreen(
  ctx: CanvasRenderingContext2D,
  t: number,
  idx: number,
  lensIdx: number,
  activeSkill: string | null,
  label: string,
  lenses: { id: string; label: string; caption: string }[],
  userCursor: { x: number; y: number; inside: boolean },
  isManualRun: boolean
) {
  const RED = '#ff3322';
  const GREEN = '#28c840';
  const CYAN = '#38bdf8';
  const AMBER = '#febc2e';

  // 4-step automation cycle (0..4, ~1.33s per step = 5.33s full loop)
  const cycle = (t * 0.75) % 4;
  const activeStep = Math.floor(cycle);
  const stepFrac = cycle - activeStep;
  const totalProgress = cycle / 4; // 0..1 across all 4 steps

  // 1. Crisp Dark Studio Background
  ctx.fillStyle = '#07080c';
  ctx.fillRect(0, 0, SW, SH);

  // Safe inner bezel bounds so the 3D MacBook frame & notch never clip content
  const BX = 56;
  const BY = 48;
  const BW = SW - 112; // 1488

  // 2. Top Browser / Automation Runner Bar (y: 48..122, height: 74px)
  rrect(ctx, BX, BY, BW, 74, 16);
  ctx.fillStyle = isManualRun ? '#19141d' : '#12141d';
  ctx.fill();
  ctx.strokeStyle = isManualRun ? RED : 'rgba(255,255,255,0.15)';
  ctx.lineWidth = isManualRun ? 3 : 2;
  ctx.stroke();

  // Live Workflow Progress Bar along bottom edge of Top Runner Bar
  rrect(ctx, BX + 12, BY + 66, (BW - 24) * totalProgress, 5, 3);
  ctx.fillStyle = isManualRun ? RED : GREEN;
  ctx.fill();

  // macOS Traffic Lights
  ['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(BX + 32 + i * 28, BY + 37, 10, 0, Math.PI * 2);
    ctx.fill();
  });

  // Live Recording Badge + Capability Title (Plus Jakarta Sans 800 avoids wide Syne overlap)
  ctx.fillStyle = RED;
  ctx.beginPath();
  ctx.arc(BX + 130, BY + 37, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 21px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`0${idx + 1} · ${label}`, BX + 148, BY + 45);

  // 3 Clickable Mode Tabs on the Top Right (x: 680..1524)
  lenses.forEach((l, li) => {
    const tx = 680 + li * 284;
    const ty = BY + 13;
    const tw = 272;
    const th = 48;
    const isSel = li === lensIdx;
    const isHov =
      userCursor.inside &&
      userCursor.x >= tx &&
      userCursor.x <= tx + tw &&
      userCursor.y >= ty &&
      userCursor.y <= ty + th;

    rrect(ctx, tx, ty, tw, th, 10);
    ctx.fillStyle = isSel ? RED : isHov ? 'rgba(255,255,255,0.16)' : '#1d202e';
    ctx.fill();
    ctx.strokeStyle = isSel ? RED : 'rgba(255,255,255,0.14)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = isSel ? '#050505' : '#f4f4f6';
    ctx.font = '800 18px "Plus Jakarta Sans", sans-serif';
    const shortLabel = l.label.length > 18 ? `${l.label.slice(0, 17)}…` : l.label;
    ctx.fillText(`0${li + 1} · ${shortLabel}`, tx + 16, ty + 31);
  });

  // Main Split Layout inside safe bezel bounds:
  // Left Pane (Live Automated Application Stage): x=56, y=136, w=916, h=776
  // Right Pane (Live Step-by-Step Execution Trace): x=990, y=136, w=554, h=776
  const lx = BX;
  const ly = 136;
  const lw = 916;
  const lh = 776;

  const rx = 990;
  const ry = 136;
  const rw = 554;
  const rh = 776;

  // Draw Left Live Viewport Frame
  rrect(ctx, lx, ly, lw, lh, 18);
  ctx.fillStyle = '#0d0f17';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.16)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Left Viewport URL / Context Bar
  ctx.fillStyle = '#161926';
  rrect(ctx, lx + 2, ly + 2, lw - 4, 58, 16);
  ctx.fill();

  const urls = [
    'https://app.sandbox.qa/checkout-flow  ·  Web · PWA · Android · iOS',
    'chromium://automation-runner  ·  Java + Selenium WebDriver + Playwright',
    'https://api.sandbox.qa/v1/orders  ↔  postgresql://db.sandbox.qa:5432',
    'http://localhost:8000/workflow  ·  Laravel API + Ionic PWA Hot-Reload',
    'agent://antigravity-codex-cursor  ·  AI Synthesis → Human QA Gate',
    'https://jira.sandbox.qa/boards/STLC  ·  RTM → Bug Retest → Release',
  ];
  ctx.fillStyle = CYAN;
  ctx.font = '700 19px monospace';
  ctx.fillText(urls[idx] ?? urls[0], lx + 24, ly + 38);

  let stepItems: [string, string, string][] = [];

  if (idx === 0) {
    // =========================================================================
    // 01: QUALITY ENGINEERING — Live Automated Browser Form & Scenario Flow
    // =========================================================================
    const isNeg = lensIdx === 1;
    const isReg = lensIdx === 2;

    // Platform switcher pills inside app
    ['Web Desktop', 'Ionic PWA', 'Android Build', 'iOS Build'].forEach((p, pi) => {
      const px = lx + 28 + pi * 216;
      const py = ly + 78;
      const activePlat = pi === activeStep % 4;
      rrect(ctx, px, py, 202, 44, 10);
      ctx.fillStyle = activePlat ? 'rgba(56, 189, 248, 0.2)' : '#151824';
      ctx.fill();
      ctx.strokeStyle = activePlat ? CYAN : 'rgba(255,255,255,0.1)';
      ctx.stroke();
      ctx.fillStyle = activePlat ? '#ffffff' : '#9ca3b5';
      ctx.font = '800 17px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(p, px + 20, py + 28);
    });

    // Live Application Card being tested
    const fx = lx + 32;
    const fy = ly + 142;
    const fw = lw - 64;
    rrect(ctx, fx, fy, fw, 604, 16);
    ctx.fillStyle = '#121521';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(
      isNeg
        ? 'BOUNDARY & NEGATIVE INPUT VALIDATION'
        : isReg
          ? 'SMOKE & REGRESSION VERIFICATION FLOW'
          : 'EXPLORATORY END-TO-END USER WORKFLOW',
      fx + 32,
      fy + 48
    );

    // Input Field 1: Account / Session Identifier
    ctx.fillStyle = '#9ca3b5';
    ctx.font = '700 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('1. USER WORKFLOW INPUT FIELD', fx + 32, fy + 98);

    const in1X = fx + 32;
    const in1Y = fy + 114;
    const in1W = fw - 64;
    const in1H = 68;
    rrect(ctx, in1X, in1Y, in1W, in1H, 12);
    ctx.fillStyle = '#080a10';
    ctx.fill();
    ctx.strokeStyle = activeStep === 0 ? CYAN : 'rgba(255,255,255,0.16)';
    ctx.lineWidth = activeStep === 0 ? 3 : 1.5;
    ctx.stroke();

    const fullText1 = isNeg ? 'invalid_boundary_overflow_999999!!' : 'verified.user@skyestone.qa';
    const typedLen1 = activeStep === 0 ? Math.floor(stepFrac * fullText1.length) : fullText1.length;
    ctx.fillStyle = isNeg && activeStep >= 1 ? '#ff5f57' : '#ffffff';
    ctx.font = '700 24px monospace';
    ctx.fillText(fullText1.slice(0, typedLen1) + (activeStep === 0 ? '▋' : ''), in1X + 22, in1Y + 43);

    // Input Field 2: Boundary / Quantity Value
    ctx.fillStyle = '#9ca3b5';
    ctx.font = '700 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('2. BOUNDARY & STATE CONDITION', fx + 32, fy + 226);

    const in2X = fx + 32;
    const in2Y = fy + 242;
    const in2W = fw - 64;
    const in2H = 68;
    rrect(ctx, in2X, in2Y, in2W, in2H, 12);
    ctx.fillStyle = '#080a10';
    ctx.fill();
    ctx.strokeStyle = activeStep === 1 ? CYAN : 'rgba(255,255,255,0.16)';
    ctx.lineWidth = activeStep === 1 ? 3 : 1.5;
    ctx.stroke();

    const val2 = isNeg ? 'QTY = -1  (BELOW MIN BOUNDARY 1..100)' : 'QTY = 100  (MAX BOUNDARY VALIDATED)';
    ctx.fillStyle = isNeg ? AMBER : GREEN;
    ctx.font = '700 23px monospace';
    ctx.fillText(val2, in2X + 22, in2Y + 43);

    // Action Submit Button
    const btnX = fx + 32;
    const btnY = fy + 344;
    const btnW = 340;
    const btnH = 68;
    rrect(ctx, btnX, btnY, btnW, btnH, 14);
    ctx.fillStyle = activeStep === 2 ? '#ffffff' : RED;
    ctx.fill();
    ctx.fillStyle = '#050505';
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('EXECUTE & VERIFY →', btnX + 36, btnY + 42);

    // Live Result / Assertion Toast Banner (Step 3)
    const bannerY = fy + 448;
    rrect(ctx, fx + 32, bannerY, fw - 64, 104, 14);
    const showResult = activeStep >= 2;
    ctx.fillStyle = showResult
      ? isNeg
        ? 'rgba(254, 188, 46, 0.16)'
        : 'rgba(40, 200, 64, 0.16)'
      : 'rgba(255,255,255,0.04)';
    ctx.fill();
    ctx.strokeStyle = showResult ? (isNeg ? AMBER : GREEN) : 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = showResult ? (isNeg ? AMBER : GREEN) : '#8b93a8';
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(
      showResult
        ? isNeg
          ? '✓ BOUNDARY GUARD VERIFIED: HTTP 422 REJECTED INVALID INPUT'
          : '✓ E2E WORKFLOW PASSED: UI + API + STATE SYNCED ACROSS PLATFORMS'
        : '⏳ WAITING FOR ACTION TRIGGER...',
      fx + 52,
      bannerY + 60
    );

    // Draw Locator Box & Moving Automation Cursor
    if (activeStep === 0) {
      drawLocatorBox(ctx, in1X, in1Y, in1W, in1H, 'input[name="workflowUser"]');
      drawCursorAndClick(ctx, in1X + 300 + stepFrac * 180, in1Y + 38, false, 'sendKeys()');
    } else if (activeStep === 1) {
      drawLocatorBox(ctx, in2X, in2Y, in2W, in2H, 'input[name="boundaryQty"]', AMBER);
      drawCursorAndClick(ctx, in2X + 260, in2Y + 38, stepFrac < 0.3, 'checkBoundary()');
    } else if (activeStep === 2) {
      drawLocatorBox(ctx, btnX, btnY, btnW, btnH, '[data-testid="verify-submit"]', RED);
      drawCursorAndClick(ctx, btnX + 180, btnY + 38, stepFrac < 0.45, 'click()');
    } else {
      drawLocatorBox(ctx, fx + 32, bannerY, fw - 64, 104, '#toast-assertion-verified', GREEN);
      drawCursorAndClick(ctx, fx + 380, bannerY + 54, false, 'assertVerified()');
    }

    stepItems = [
      ['01 · EXPLORE INPUT', 'Populate scenario data in field', '✓ PASS'],
      ['02 · BOUNDARY CHECK', 'Test min/max & negative limits', '✓ PASS'],
      ['03 · TRIGGER ACTION', 'Execute workflow state transition', '✓ PASS'],
      ['04 · VERIFY OUTCOME', 'Confirm cross-platform UI & state', '✓ DONE'],
    ];
  } else if (idx === 1) {
    // =========================================================================
    // 02: TEST AUTOMATION — Live Browser DOM Automation + Java Code Sync
    // =========================================================================
    const bx = lx + 28;
    const by = ly + 78;
    const bw = lw - 56;
    const bh = 356;
    rrect(ctx, bx, by, bw, bh, 16);
    ctx.fillStyle = '#121622';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.14)';
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('LIVE AUTOMATED BROWSER · PAGE OBJECT TARGETS', bx + 24, by + 40);

    const targets = [
      { label: 'Username Input', sel: '@FindBy(id="login-user")', val: 'qa_automation_bot', x: bx + 28, y: by + 68, w: bw - 56, h: 68 },
      { label: 'Action Button', sel: 'page.getByTestId("run-action")', val: 'CLICK TO SUBMIT WORKFLOW', x: bx + 28, y: by + 160, w: 420, h: 68 },
      { label: 'Status Badge', sel: 'Assert.assertEquals("VERIFIED")', val: 'STATUS: WORKFLOW_VERIFIED (200)', x: bx + 28, y: by + 252, w: bw - 56, h: 68 },
    ];

    targets.forEach((tg, ti) => {
      const isFocused = activeStep === ti || (activeStep === 3 && ti === 2);
      rrect(ctx, tg.x, tg.y, tg.w, tg.h, 12);
      ctx.fillStyle = ti === 1 ? (isFocused ? RED : '#25293a') : '#090b10';
      ctx.fill();
      ctx.strokeStyle = isFocused ? GREEN : 'rgba(255,255,255,0.14)';
      ctx.lineWidth = isFocused ? 3 : 1.5;
      ctx.stroke();

      ctx.fillStyle = ti === 1 && isFocused ? '#050505' : '#ffffff';
      ctx.font = '800 21px monospace';
      ctx.fillText(tg.val, tg.x + 22, tg.y + 42);
    });

    const curTarget = targets[Math.min(activeStep, 2)];
    drawLocatorBox(ctx, curTarget.x, curTarget.y, curTarget.w, curTarget.h, curTarget.sel, GREEN);
    drawCursorAndClick(
      ctx,
      curTarget.x + 250,
      curTarget.y + 38,
      stepFrac < 0.35,
      activeStep === 0 ? 'sendKeys()' : activeStep === 1 ? 'click()' : 'getText()'
    );

    // Bottom Half of Left Viewport: Synced Java + Selenium / Playwright Code Stepping Line-by-Line
    const cx2 = lx + 28;
    const cy2 = ly + 452;
    const cw2 = lw - 56;
    const ch2 = 298;
    rrect(ctx, cx2, cy2, cw2, ch2, 16);
    ctx.fillStyle = '#090b10';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.14)';
    ctx.stroke();

    ctx.fillStyle = RED;
    ctx.font = '800 20px monospace';
    ctx.fillText(
      lensIdx === 2
        ? '☕ PlaywrightWorkflowTest.java  (Playwright with Java)'
        : '☕ WorkflowRegressionTest.java  (Java · Selenium WebDriver · TestNG)',
      cx2 + 22,
      cy2 + 38
    );

    const codeLines =
      lensIdx === 2
        ? [
            '01  page.locator("#login-user").fill("qa_automation_bot");',
            '02  page.getByTestId("run-action").click();',
            '03  assertThat(page.locator("#status")).containsText("VERIFIED");',
            '04  // ✓ Playwright Java Test Passed (0.42s)',
          ]
        : [
            '01  wait.until(visibilityOf(userInput)).sendKeys("qa_automation_bot");',
            '02  wait.until(elementToBeClickable(actionBtn)).click();',
            '03  Assert.assertEquals(statusBadge.getText(), "WORKFLOW_VERIFIED");',
            '04  // ✓ TestNG Suite: 18 Passed · 0 Failed · Maven Verified',
          ];

    codeLines.forEach((cl, cli) => {
      const lyLine = cy2 + 88 + cli * 52;
      const isExecuting = cli === activeStep;
      if (isExecuting) {
        rrect(ctx, cx2 + 14, lyLine - 32, cw2 - 28, 44, 8);
        ctx.fillStyle = 'rgba(40, 200, 64, 0.2)';
        ctx.fill();
        ctx.strokeStyle = GREEN;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.fillStyle = isExecuting ? '#ffffff' : cli < activeStep ? GREEN : '#9ca3b5';
      ctx.font = '700 20px monospace';
      ctx.fillText(cl, cx2 + 26, lyLine - 3);
    });

    stepItems = [
      ['01 · LOCATE & INPUT', 'WebDriverWait + sendKeys()', '✓ 42ms'],
      ['02 · CLICK ELEMENT', 'Page Object actionBtn.click()', '✓ 28ms'],
      ['03 · ASSERT DOM', 'TestNG Assert.assertEquals()', '✓ PASS'],
      ['04 · MAVEN REPORT', '18/18 Regression Tests Green', '✓ DONE'],
    ];
  } else if (idx === 2) {
    // =========================================================================
    // 03: API & DATA VALIDATION — Live Postman Request → Packet → SQL Row Match
    // =========================================================================
    const px = lx + 28;
    const py = ly + 78;
    const pw = lw - 56;

    // 1. Top Box: Postman Request Dispatcher
    rrect(ctx, px, py, pw, 195, 16);
    ctx.fillStyle = '#121522';
    ctx.fill();
    ctx.strokeStyle = activeStep <= 1 ? AMBER : 'rgba(255,255,255,0.14)';
    ctx.lineWidth = activeStep <= 1 ? 3 : 1.5;
    ctx.stroke();

    rrect(ctx, px + 22, py + 20, 104, 42, 8);
    ctx.fillStyle = RED;
    ctx.fill();
    ctx.fillStyle = '#050505';
    ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(lensIdx === 1 ? 'PUT' : 'POST', px + 42, py + 48);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 22px monospace';
    ctx.fillText('https://api.sandbox.qa/v1/orders/validate', px + 144, py + 48);

    ctx.fillStyle = '#9ca3b5';
    ctx.font = '600 20px monospace';
    ctx.fillText('Payload: { "orderId": 1042, "status": "CONFIRMED", "amount": 2400 }', px + 22, py + 104);

    ctx.fillStyle = GREEN;
    ctx.font = '800 21px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('✓ HTTP 200 OK  ·  34 ms  ·  JSON Schema & Contract Validated', px + 22, py + 158);

    // 2. Middle Animated Network Conduit (Request Packet → Database)
    const midY = py + 212;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(px + 70, midY + 42);
    ctx.lineTo(px + pw - 70, midY + 42);
    ctx.stroke();

    const pktX = px + 70 + ((t * 0.85) % 1) * (pw - 140);
    rrect(ctx, pktX - 90, midY + 14, 180, 56, 28);
    ctx.fillStyle = CYAN;
    ctx.fill();
    ctx.fillStyle = '#050505';
    ctx.font = '800 19px monospace';
    ctx.fillText('JSON → SQL', pktX - 58, midY + 49);

    // 3. Bottom Box: Live SQL Query & Verified Database Row
    const sy = py + 298;
    rrect(ctx, px, sy, pw, 370, 16);
    ctx.fillStyle = '#10131e';
    ctx.fill();
    ctx.strokeStyle = activeStep >= 2 ? GREEN : 'rgba(255,255,255,0.14)';
    ctx.lineWidth = activeStep >= 2 ? 3 : 1.5;
    ctx.stroke();

    ctx.fillStyle = CYAN;
    ctx.font = '800 21px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('SQL DATABASE ENGINE · DATA INTEGRITY VERIFICATION', px + 24, sy + 44);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 20px monospace';
    ctx.fillText('SELECT order_id, status, amount, integrity FROM orders WHERE id = 1042;', px + 24, sy + 92);

    ctx.fillStyle = '#1b2032';
    ctx.fillRect(px + 24, sy + 122, pw - 48, 50);
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 20px monospace';
    ctx.fillText('ORDER_ID     STATUS         AMOUNT     DB_INTEGRITY', px + 42, sy + 154);

    const dbRows = [
      ['#1042', 'CONFIRMED', '2400.00', '✓ 100% API MATCH'],
      ['#1041', 'CONFIRMED', '1850.00', '✓ VERIFIED'],
      ['#1040', 'REJECTED_422', '0.00', '✓ ROLLBACK CLEAN'],
    ];
    dbRows.forEach((r, ri) => {
      const ryRow = sy + 184 + ri * 54;
      rrect(ctx, px + 24, ryRow, pw - 48, 46, 8);
      ctx.fillStyle = ri === 0 ? 'rgba(40, 200, 64, 0.2)' : 'rgba(255,255,255,0.03)';
      ctx.fill();
      ctx.fillStyle = ri === 0 ? GREEN : '#d5d9e6';
      ctx.font = '700 20px monospace';
      ctx.fillText(`${r[0]}        ${r[1].padEnd(12, ' ')}   ${r[2].padEnd(8, ' ')}   ${r[3]}`, px + 42, ryRow + 30);
    });

    stepItems = [
      ['01 · SEND REST API', 'POST /api/v1/orders in Postman', '✓ 200 OK'],
      ['02 · ASSERT PAYLOAD', 'Verify JSON schema & headers', '✓ VALID'],
      ['03 · RUN SQL QUERY', 'SELECT row from relational DB', '✓ 1 ROW'],
      ['04 · DATA INTEGRITY', 'API response == DB persisted row', '✓ MATCH'],
    ];
  } else if (idx === 3) {
    // =========================================================================
    // 04: SOFTWARE DEVELOPMENT — Code Editor + Live Mobile/PWA Preview
    // =========================================================================
    const codeW = 496;
    const cxBox = lx + 28;
    const cyBox = ly + 78;
    rrect(ctx, cxBox, cyBox, codeW, 670, 16);
    ctx.fillStyle = '#0b0d14';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.14)';
    ctx.stroke();

    const titles = ['WorkflowController.php', 'IonicPwaScreen.tsx', 'OrderService.java'];
    ctx.fillStyle = RED;
    ctx.font = '800 21px monospace';
    ctx.fillText(`⚡ ${titles[lensIdx] ?? titles[0]}`, cxBox + 22, cyBox + 44);

    const snippets =
      lensIdx === 0
        ? [
            'public function update(Request $req)',
            '{',
            '  $data = $req->validate([',
            '    "status" => "required|string",',
            '  ]);',
            '  $item = $this->repo->sync($data);',
            '  return response()->json([',
            '    "synced" => true,',
            '    "item"   => $item,',
            '  ], 200);',
            '}',
          ]
        : lensIdx === 1
          ? [
               'export const IonicPwaScreen = () => {',
              '  const { state, sync } = useStore();',
              '  return (',
              '    <IonPage>',
              '      <IonHeader title="PWA App" />',
              '      <IonContent>',
              '        <Badge ok={state.synced} />',
              '        <IonButton onClick={sync}>',
              '          Sync Live State',
              '        </IonButton>',
              '      </IonContent>',
              '    </IonPage>',
              '  );',
              '};',
            ]
          : [
              '@Service',
              '@Transactional',
              'public class OrderService {',
              '  @Autowired OrderRepository repo;',
              '',
              '  public Order saveVerified(Dto d) {',
              '    Order o = mapper.toEntity(d);',
              '    o.setVerified(true);',
              '    return repo.save(o);',
              '  }',
              '}',
            ];

    snippets.forEach((sn, si) => {
      const syLine = cyBox + 96 + si * 44;
      if (si === (activeStep * 2 + 2) % snippets.length) {
        ctx.fillStyle = 'rgba(255, 51, 34, 0.22)';
        ctx.fillRect(cxBox + 12, syLine - 28, codeW - 24, 38);
      }
      ctx.fillStyle = sn.includes('public') || sn.includes('return') || sn.includes('export') || sn.includes('@') ? RED : '#f4f4f6';
      ctx.font = '700 19px monospace';
      ctx.fillText(sn, cxBox + 22, syLine);
    });

    // Right inside Left Viewport: Live Ionic Mobile / PWA Device Simulator
    const dx = cxBox + codeW + 22;
    const dw = lw - codeW - 78;
    rrect(ctx, dx, cyBox, dw, 670, 30);
    ctx.fillStyle = '#131724';
    ctx.fill();
    ctx.strokeStyle = CYAN;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('LIVE IONIC PWA VIEW', dx + 48, cyBox + 50);

    rrect(ctx, dx + 24, cyBox + 80, dw - 48, 140, 16);
    ctx.fillStyle = '#090b10';
    ctx.fill();
    ctx.fillStyle = CYAN;
    ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('API STATE: 200 OK', dx + 42, cyBox + 130);
    ctx.fillStyle = GREEN;
    ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('✓ Backend & UI Synced', dx + 42, cyBox + 178);

    rrect(ctx, dx + 24, cyBox + 248, dw - 48, 70, 14);
    ctx.fillStyle = RED;
    ctx.fill();
    ctx.fillStyle = '#050505';
    ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('SYNC WORKFLOW', dx + 64, cyBox + 291);

    rrect(ctx, dx + 24, cyBox + 348, dw - 48, 270, 16);
    ctx.fillStyle = '#090b10';
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 19px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('✓ PHP / Laravel Endpoint', dx + 40, cyBox + 402);
    ctx.fillText('✓ Ionic PWA Component', dx + 40, cyBox + 456);
    ctx.fillText('✓ Java / Spring / JPA', dx + 40, cyBox + 510);
    ctx.fillStyle = GREEN;
    ctx.fillText('✓ QA Regression Green', dx + 40, cyBox + 564);

    drawCursorAndClick(ctx, dx + 165, cyBox + 290, activeStep === 2, 'Hot Reload');

    stepItems = [
      ['01 · BACKEND LOGIC', 'PHP/Laravel & Java/Spring', '✓ BUILT'],
      ['02 · IONIC PWA UI', 'Responsive mobile/web state', '✓ SYNC'],
      ['03 · REST CONTRACT', 'Controller ↔ UI integration', '✓ 200 OK'],
      ['04 · QA VERIFIED', 'Zero regression side effects', '✓ PASS'],
    ];
  } else if (idx === 4) {
    // =========================================================================
    // 05: AI-ASSISTED DEVELOPMENT — Live Agent Diff → Human QA Gate
    // =========================================================================
    const ax = lx + 28;
    const ay = ly + 78;
    const aw = lw - 56;

    // Top Agent Prompt Bar
    rrect(ctx, ax, ay, aw, 120, 16);
    ctx.fillStyle = '#141624';
    ctx.fill();
    ctx.strokeStyle = RED;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = RED;
    ctx.font = '800 19px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('AI CODING AGENT  ·  ANTIGRAVITY · OPENAI CODEX · CURSOR · CLAUDE', ax + 24, ay + 42);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('"Implement boundary validation guard + Playwright Java regression test"', ax + 24, ay + 88);

    // Middle Live Diff Box
    const dy = ay + 140;
    rrect(ctx, ax, dy, aw, 326, 16);
    ctx.fillStyle = '#090b10';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.14)';
    ctx.stroke();

    const diffs = [
      ['- ', 'return $this->service->save($payload);', '#ff5f57'],
      ['+ ', 'if (!$this->validator->checkBoundary($payload)) {', GREEN],
      ['+ ', '  return response()->json(["error" => "Boundary"], 422);', GREEN],
      ['+ ', '}', GREEN],
      ['+ ', '@Test void verifyBoundaryGuard() { assertStatus(422); }', CYAN],
    ];
    diffs.forEach((d, di) => {
      const lyD = dy + 58 + di * 54;
      ctx.fillStyle = d[2] === '#ff5f57' ? 'rgba(255,95,87,0.16)' : 'rgba(40,200,64,0.16)';
      ctx.fillRect(ax + 18, lyD - 32, aw - 36, 42);
      ctx.fillStyle = d[2];
      ctx.font = '700 20px monospace';
      ctx.fillText(`${d[0]}${d[1]}`, ax + 30, lyD - 4);
    });

    // Bottom Human Exploratory QA Gate Banner
    const gy = dy + 346;
    rrect(ctx, ax, gy, aw, 178, 16);
    ctx.fillStyle = 'rgba(40, 200, 64, 0.14)';
    ctx.fill();
    ctx.strokeStyle = GREEN;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = GREEN;
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('🛡️ HUMAN EXPLORATORY QA GATE: VERIFIED BEFORE MERGE', ax + 26, gy + 50);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('✓ Manually explored on Web, PWA, Android & iOS  ·  ✓ Regression Suite Green', ax + 26, gy + 98);

    rrect(ctx, ax + aw - 290, gy + 116, 260, 46, 10);
    ctx.fillStyle = GREEN;
    ctx.fill();
    ctx.fillStyle = '#050505';
    ctx.font = '800 19px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('✓ APPROVED BY QA', ax + aw - 255, gy + 146);

    drawCursorAndClick(ctx, ax + aw - 150, gy + 138, activeStep >= 2, 'Human Sign-Off');

    stepItems = [
      ['01 · AI CODE SCAN', 'Explore architecture with AI agent', '✓ DONE'],
      ['02 · SYNTHESIZE DIFF', 'Generate feature & Playwright test', '✓ DONE'],
      ['03 · HUMAN QA AUDIT', 'Verify real app behaviour manually', '✓ PASS'],
      ['04 · MERGE & SHIP', 'Checked across neighbor modules', '✓ OK'],
    ];
  } else {
    // =========================================================================
    // 06: QA PROCESSES — Live Animated STLC, Jira Defect & RTM Release Flow
    // =========================================================================
    const px = lx + 28;
    const py = ly + 78;
    const pw = lw - 56;

    const stages = [
      ['01 · REQUIREMENT & RTM', 'REQ-104 → 24 Traceable Scenarios & Test Cases Mapped', 'TRACEABLE'],
      ['02 · JIRA DEFECT LOGGED', 'BUG-204 · Steps to Reproduce + Video + SQL Evidence', 'JIRA LOGGED'],
      ['03 · FIX RETESTING & QA', 'Developer Fix Build Verified + Neighbor Regression', 'RETEST PASS'],
      ['04 · AGILE RELEASE GATE', 'Daily Client Progress Synced & Release Signed Off', '✓ SHIPPED'],
    ];

    stages.forEach((st, si) => {
      const syStage = py + si * 164;
      const isCur = si === activeStep;
      const isDone = si <= activeStep;

      rrect(ctx, px, syStage, pw, 144, 16);
      ctx.fillStyle = isCur ? 'rgba(255, 51, 34, 0.18)' : isDone ? 'rgba(40, 200, 64, 0.1)' : '#121520';
      ctx.fill();
      ctx.strokeStyle = isCur ? RED : isDone ? GREEN : 'rgba(255,255,255,0.14)';
      ctx.lineWidth = isCur ? 3.5 : 2;
      ctx.stroke();

      ctx.fillStyle = isCur ? RED : isDone ? GREEN : '#ffffff';
      ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(st[0], px + 28, syStage + 50);

      ctx.fillStyle = '#e4e6f0';
      ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(st[1], px + 28, syStage + 100);

      rrect(ctx, px + pw - 216, syStage + 22, 190, 42, 10);
      ctx.fillStyle = isDone ? GREEN : '#232738';
      ctx.fill();
      ctx.fillStyle = isDone ? '#050505' : '#ffffff';
      ctx.font = '800 17px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(st[2], px + pw - 196, syStage + 49);
    });

    const curY = py + activeStep * 164 + 68;
    drawCursorAndClick(ctx, px + pw - 130, curY, stepFrac < 0.35, 'STLC Gate');

    stepItems = [
      ['01 · RTM MATRIX', 'Requirement ↔ Scenario ↔ Case', '✓ MAPPED'],
      ['02 · JIRA DEFECT', 'Repro steps, logs & DB evidence', '✓ LOGGED'],
      ['03 · RETEST BUILD', 'Fix verified across all platforms', '✓ PASS'],
      ['04 · RELEASE GATE', 'Agile sprint & client approval', '✓ READY'],
    ];
  }

  // ===========================================================================
  // Right Pane: Live Step-by-Step Automation Execution Trace (x=990, w=554)
  // ===========================================================================
  rrect(ctx, rx, ry, rw, rh, 18);
  ctx.fillStyle = '#0d0f17';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.16)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#161926';
  rrect(ctx, rx + 2, ry + 2, rw - 4, 58, 16);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('LIVE AUTOMATION TRACE', rx + 24, ry + 38);

  ctx.save();
  ctx.textAlign = 'right';
  ctx.fillStyle = GREEN;
  ctx.font = '800 18px monospace';
  ctx.fillText(`STEP ${activeStep + 1}/4`, rx + rw - 24, ry + 38);
  ctx.restore();

  stepItems.forEach((st, si) => {
    const syCard = ry + 78 + si * 144;
    const isRunning = si === activeStep;
    const isPassed = si < activeStep || (activeStep === 3 && stepFrac > 0.5);

    rrect(ctx, rx + 20, syCard, rw - 40, 126, 14);
    ctx.fillStyle = isRunning
      ? 'rgba(255, 51, 34, 0.18)'
      : isPassed
        ? 'rgba(40, 200, 64, 0.12)'
        : '#131622';
    ctx.fill();
    ctx.strokeStyle = isRunning ? RED : isPassed ? GREEN : 'rgba(255,255,255,0.1)';
    ctx.lineWidth = isRunning ? 3 : 1.5;
    ctx.stroke();

    ctx.fillStyle = isRunning ? RED : isPassed ? GREEN : '#ffffff';
    ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(st[0], rx + 40, syCard + 46);

    ctx.fillStyle = '#c5cadb';
    ctx.font = '600 19px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(st[1], rx + 40, syCard + 88);

    ctx.save();
    ctx.textAlign = 'right';
    ctx.fillStyle = isRunning ? AMBER : GREEN;
    ctx.font = '800 18px monospace';
    ctx.fillText(isRunning ? '● RUNNING' : st[2], rx + rw - 40, syCard + 46);
    ctx.restore();
  });

  // Bottom Active Skill Focus Banner inside Right Pane
  const sby = ry + rh - 84;
  rrect(ctx, rx + 20, sby, rw - 40, 64, 12);
  ctx.fillStyle = '#161926';
  ctx.fill();
  ctx.strokeStyle = RED;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(
    activeSkill ? `SKILL: ${activeSkill.toUpperCase()}` : `MODE: ${lenses[lensIdx]?.label.toUpperCase()}`,
    rx + 38,
    sby + 39
  );

  // Bottom Status Strip inside safe bezel bounds (y: 924..986)
  rrect(ctx, BX, 924, BW, 62, 14);
  ctx.fillStyle = isManualRun ? 'rgba(255, 51, 34, 0.2)' : '#12141e';
  ctx.fill();
  ctx.strokeStyle = isManualRun ? RED : 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = isManualRun ? RED : GREEN;
  ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(
    isManualRun
      ? `⚡ EXECUTING WORKFLOW RUN · STEP ${activeStep + 1}/4 (${Math.round(totalProgress * 100)}%)`
      : '● LIVE 60FPS AUTOMATION ENGINE ACTIVE',
    BX + 24,
    962
  );
  ctx.save();
  ctx.textAlign = 'right';
  ctx.fillStyle = '#d4d4dc';
  ctx.font = '700 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('CLICK SCREEN TABS, TRACE STEPS, OR ▶ RUN WORKFLOW', BX + BW - 24, 962);
  ctx.restore();
}

const RealMacBookGLTF: React.FC<LaptopStageProps> = ({
  index,
  lensIndex,
  activeSkill,
  finishColor,
  label,
  lenses,
  zoomed,
  runPulse,
  reduced,
  onSelectLens,
  onTriggerRun,
}) => {
  const { nodes, materials, scene } = useGLTF('/macbook.glb', '/draco/') as unknown as MacbookGLTF;
  const group = useRef<THREE.Group>(null);
  const cursor = useRef<{ x: number; y: number; inside: boolean }>({ x: SW / 2, y: SH / 2, inside: false });
  const simTime = useRef(0);
  const manualRunTimer = useRef(0);

  const screenTex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = SW;
    c.height = SH;
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.generateMipmaps = false;
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.anisotropy = 16;
    return t;
  }, []);

  useEffect(() => {
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      if (NO_TINT_PARTS.has(obj.name)) return;
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach((m) => {
        if (m && 'color' in m && m.color instanceof THREE.Color) {
          m.color.set(finishColor);
        }
      });
    });
  }, [finishColor, scene]);

  // Reset workflow to Step 1 whenever capability or mode changes
  useEffect(() => {
    simTime.current = 0;
  }, [index, lensIndex]);

  // Restart workflow from Step 1 (0.00s) and highlight active run when ▶ Run Workflow is clicked
  useEffect(() => {
    if (runPulse > 0) {
      simTime.current = 0;
      manualRunTimer.current = 5.33;
    }
  }, [runPulse]);

  useFrame((state, delta) => {
    const clampedDelta = Math.min(delta, 0.1);
    simTime.current += clampedDelta;
    if (manualRunTimer.current > 0) {
      manualRunTimer.current = Math.max(0, manualRunTimer.current - clampedDelta);
    }

    const ctx = (screenTex.image as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      drawLiveAutomationScreen(
        ctx,
        simTime.current,
        index,
        lensIndex,
        activeSkill,
        label,
        lenses,
        cursor.current,
        manualRunTimer.current > 0
      );
      screenTex.needsUpdate = true;
    }

    if (!group.current) return;
    const px = reduced ? 0 : state.pointer.x;
    const py = reduced ? 0 : state.pointer.y;

    const targetScale = zoomed ? 0.132 : 0.106;
    const targetRotY = zoomed ? px * 0.03 : -0.13 + px * 0.14;
    const targetRotX = zoomed ? 0.04 - py * 0.02 : 0.09 - py * 0.05;
    const targetPosY = zoomed ? -1.16 : -0.78 + (reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.85) * 0.02);

    const curScale = THREE.MathUtils.damp(group.current.scale.x, targetScale, 4, clampedDelta);
    group.current.scale.setScalar(curScale);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetRotY, 4, clampedDelta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetRotX, 4, clampedDelta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetPosY, 4, clampedDelta);
  });

  const handleScreenMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (!e.uv) return;
    cursor.current = {
      x: e.uv.x * SW,
      y: (1 - e.uv.y) * SH,
      inside: true,
    };
    document.body.style.cursor = 'pointer';
  };

  const handleScreenLeave = () => {
    cursor.current.inside = false;
    document.body.style.cursor = '';
  };

  const handleScreenClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!e.uv) return;
    const x = e.uv.x * SW;
    const y = (1 - e.uv.y) * SH;

    // 1. Check top-right mode tabs (01, 02, 03)
    for (let li = 0; li < lenses.length; li += 1) {
      const tx = 680 + li * 284;
      const ty = 61;
      if (x >= tx && x <= tx + 272 && y >= ty && y <= ty + 48) {
        onSelectLens(li);
        return;
      }
    }

    // 2. Check Right-Pane Step Cards (click any step 1..4 to jump directly to that step)
    if (x >= 990 && x <= 1544) {
      for (let si = 0; si < 4; si += 1) {
        const syCard = 136 + 78 + si * 144;
        if (y >= syCard && y <= syCard + 126) {
          simTime.current = si / 0.75 + 0.05;
          manualRunTimer.current = 5.33 - (si / 4) * 5.33;
          return;
        }
      }
    }

    // 3. Clicking anywhere else on the screen restarts the 4-step workflow from Step 1
    onTriggerRun();
  };

  return (
    <group ref={group} scale={0.106} position={[0, -0.78, 0]} dispose={null}>
      <mesh geometry={nodes.Object_10.geometry} material={materials.PaletteMaterial001} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_16.geometry} material={materials.zhGRTuGrQoJflBD} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_20.geometry} material={materials.PaletteMaterial002} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_22.geometry} material={materials.lmWQsEjxpsebDlK} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_30.geometry} material={materials.LtEafgAVRolQqRw} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_32.geometry} material={materials.iyDJFXmHelnMTbD} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_34.geometry} material={materials.eJObPwhgFzvfaoZ} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_38.geometry} material={materials.nDsMUuDKliqGFdU} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_42.geometry} material={materials.CRQixVLpahJzhJc} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_48.geometry} material={materials.YYwBgwvcyZVOOAA} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_54.geometry} material={materials.SLGkCohDDelqXBu} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_58.geometry} material={materials.WnHKXHhScfUbJQi} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_66.geometry} material={materials.fNHiBfcxHUJCahl} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_74.geometry} material={materials.LpqXZqhaGCeSzdu} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_82.geometry} material={materials.gMtYExgrEUqPfln} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_96.geometry} material={materials.PaletteMaterial003} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_107.geometry} material={materials.JvMFZolVCdpPqjj} rotation={[Math.PI / 2, 0, 0]} />
      <mesh
        geometry={nodes.Object_123.geometry}
        rotation={[Math.PI / 2, 0, 0]}
        onPointerMove={handleScreenMove}
        onPointerOut={handleScreenLeave}
        onClick={handleScreenClick}
      >
        <meshBasicMaterial map={screenTex} toneMapped={false} />
      </mesh>
      <mesh geometry={nodes.Object_127.geometry} material={materials.ZCDwChwkbBfITSW} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  );
};

useGLTF.preload('/macbook.glb', '/draco/');

export const LaptopStage: React.FC<LaptopStageProps> = (props) => (
  <Canvas
    className="laptop-canvas"
    dpr={[1.5, 2]}
    camera={{ position: [0, 1.25, 4.45], fov: 40, near: 0.1, far: 100 }}
    gl={{ antialias: true, alpha: true }}
  >
    <ambientLight intensity={0.85} />
    <Environment resolution={256}>
      <group>
        <Lightformer
          form="rect"
          intensity={10}
          position={[-10, 5, -5]}
          scale={10}
          rotation-y={Math.PI / 2}
        />
        <Lightformer
          form="rect"
          intensity={10}
          position={[10, 0, 1]}
          scale={10}
          rotation-y={Math.PI / 2}
        />
        <Lightformer
          form="rect"
          intensity={4}
          position={[0, 8, 4]}
          scale={[8, 4, 1]}
          color="#ffffff"
        />
      </group>
    </Environment>
    <spotLight position={[-2, 10, 5]} angle={0.18} decay={0} intensity={Math.PI * 0.35} />
    <spotLight position={[0, -25, 10]} angle={0.18} decay={0} intensity={Math.PI * 0.25} />
    <spotLight position={[0, 15, 5]} angle={0.18} decay={0.1} intensity={Math.PI * 1.1} />

    <Suspense fallback={null}>
      <PresentationControls
        snap
        speed={1.2}
        zoom={1}
        polar={[-0.25, 0.35]}
        azimuth={[-0.6, 0.6]}
        config={{ mass: 1, tension: 170, friction: 26 }}
      >
        <RealMacBookGLTF {...props} />
      </PresentationControls>
      <ContactShadows position={[0, -0.88, 0]} opacity={0.75} scale={6.8} blur={2.4} far={3} />
    </Suspense>
  </Canvas>
);
