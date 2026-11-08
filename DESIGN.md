# Design System & Creative Direction: Ritik Thakre — Immersive 3D Live Portfolio

## 1. Visual Theme & Creative Direction
**Concept**: *The Verification Core — An Interactive Precision Engineering & Telemetry Observatory*

Rather than a conventional resume template or generic floating geometric shapes, this portfolio functions as a real-time 3D engineering instrument. It visualizes the intersection of **Exploratory Quality Engineering**, **Enterprise Test Automation**, and **Human-in-the-Loop AI-Assisted Software Development**.

- **Atmosphere**: Swiss precision telemetry instrument meets Awwwards-grade WebGL storytelling. Tactile, industrial, dark-room calibrated, and architecturally disciplined.
- **Density**: `6 / 10` — Balanced architectural whitespace paired with structured technical telemetry inspection panels.
- **Variance**: `8 / 10` — Asymmetric editorial grids, custom interactive matrices, and non-linear 3D spatial exploration.
- **Motion**: `9 / 10` — Scroll-choreographed 3D camera flights via GSAP ScrollTrigger, damped pointer parallax, procedural GLSL scanline/Fresnel shaders, and spring-driven UI transitions.

---

## 2. Color System & Atmospheric Polarity
**Intentional Dark Mode (Obsidian Telemetry Calibration)** — avoids pure `#000000` and bans generic AI purple/neon gradients.

| Token Name | Hex / Value | Functional Role |
| :--- | :--- | :--- |
| **Obsidian Carbon** | `#090A0D` | Primary viewport canvas & deep 3D void background |
| **Graphite Alloy** | `#111318` | Elevated interactive console surfaces & inspection modules |
| **Anodized Slate** | `#171A21` | Hover states, secondary control surfaces, code wells |
| **Alabaster Ivory** | `#F4F4F0` | Primary display typography & high-contrast headlines |
| **Machined Titanium** | `#9CA3AF` | Body copy, technical narratives, architecture explanations |
| **Muted Coordinate** | `#646B78` | Index numbers, axis coordinates, metadata labels |
| **Hairline Structure** | `rgba(244, 244, 240, 0.09)` | `1px` architectural grid borders and dividers |
| **Signal Vermilion** | `#FF4D29` | Primary brand accent — interactive CTAs, active 3D nodes, laser telemetry |
| **Verification Emerald** | `#10B981` | Assertion pass states, verified API responses, nominal system status |
| **Diagnostic Amber** | `#F59E0B` | Boundary testing, defect investigation triggers, inspection highlights |

---

## 3. Typography & Scannable Hierarchy
- **Display (`--font-display`)**: `'Syne'`, `'Space Grotesk'`, sans-serif — architectural, high-character display headlines with tight tracking (`-0.03em`) and fluid scaling via `clamp()`.
- **UI & Technical Prose (`--font-sans`)**: `'Plus Jakarta Sans'`, sans-serif — crisp, high-legibility body copy constrained to `60ch–68ch` with relaxed `1.65` line height.
- **Telemetry & Code (`--font-mono`)**: `'JetBrains Mono'`, monospace — `font-variant-numeric: tabular-nums` for coordinates, protocol traces, Java/Selenium/Playwright snippets, and HTTP status codes.

---

## 4. 3D Scene Architecture & Scroll Choreography
Built with **Three.js**, **React Three Fiber**, **Drei**, custom **GLSL Shaders**, and **GSAP ScrollTrigger**:

1. **The Verification Core (Central 3D Assembly)**:
   - **Inner Crystalline Kernel**: Custom GLSL shader combining Fresnel rim illumination, procedural telemetry scanlines, and state-reactive color shifts (`Nominal Emerald`, `Signal Vermilion`, `Diagnostic Amber`).
   - **Triple Gyroscopic Calibration Rings**: Machined metallic rings rotating on orthogonal axes representing *Exploration*, *Automation*, and *AI-Assisted Engineering*.
   - **Six Orbital Capability Satellites**: Interactive 3D nodes positioned in orbital space corresponding to the 6 core engineering pillars. Hovering or clicking a capability domain dynamically aims the 3D core and illuminates data conduits.
   - **Telemetry Particle Field & Architectural Horizon Grid**: Over 1,000 instanced spatial particles and a perspective reference plane that responds to scroll velocity and pointer coordinates.

2. **Chapter-Based Camera Path**:
   - **00 / INTRO LOADER**: Calibration sequence with real-time system readiness steps and smooth curtain reveal into the 3D canvas.
   - **01 / HERO**: Asymmetric left-aligned typography with the 3D Verification Core anchored to the right, reacting to cursor parallax and interactive mode toggles.
   - **02 / ABOUT**: Camera orbits into an angled inspection view alongside an interactive **4-Layer Platform Exploration Matrix** (Web, PWA, Android, iOS).
   - **03 / CAPABILITIES**: High-angle orbital command view paired with an interactive **6-Domain Spatial Capability Matrix** and official documentation references.
   - **04 / AUTOMATION LAB**: Equatorial close-up of data conduits paired with a live interactive **Execution & Protocol Simulator** (Selenium 4 W3C WebDriver, Playwright Java CDP Contexts, REST API + SQL CRUD Validation, Cross-Platform Regression & Defect Investigation).
   - **05 / AI ENGINEERING**: Dual-hemisphere view paired with an interactive **Human-in-the-Loop AI Engineering Workbench** showcasing OpenAI Codex, Antigravity, Cursor, and Claude workflows with mandatory human QA validation gates.
   - **06 / EXPERIENCE**: Vertical camera track along the **Chronos Pillar** highlighting Ritik Thakre's role as **Jr. QA Engineer at SKYESTONE AI TECH PRIVATE LIMITED** (`08 April 2026 – Present`).
   - **07 / EDUCATION**: Focus on the **Foundational AI & Data Science Monolith** (`B.Tech – Artificial Intelligence & Data Science`, Priyadarshini Engineering College, Nagpur, `2021–2024`, `CGPA: 7.30 / 10`).
   - **08 / CONTACT**: High-altitude orbital overview with the **Direct Transmission Terminal** (`mailto:`, `tel:`, LinkedIn, vCard download, and quick message composer).

---

## 5. Strict Content & Privacy Guardrails
- **Zero Confidential Project Names**: No previous or current internal project names or client names appear anywhere in the UI, source code, metadata, or downloadable resume PDF.
- **Approved Employer Only**: `SKYESTONE AI TECH PRIVATE LIMITED` (`Jr. QA Engineer`, `08 April 2026 – Present`, `Nagpur, Maharashtra`).
- **Zero Fabricated Metrics**: No invented percentages, fake test counts, or unverified claims. All technical explanations are grounded in Ritik's real skill set and official documentation (W3C WebDriver, Playwright Java, TestNG, Postman/REST, PHP/Laravel, Ionic, Spring Boot).

