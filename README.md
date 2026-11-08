# Ritik Thakre — Immersive 3D Live Portfolio ("The Verification Core")

An interactive 3D personal portfolio and real-time engineering telemetry observatory built for **Ritik Thakre** (**QA Engineer | Test Automation | AI-Assisted Software Development**).

---

## 1. Environment Requirements

- **Node.js**: `>= 18.0.0` (recommended `v20+` or `v22+`)
- **npm**: `>= 9.0.0`
- **Browser**: Modern desktop or mobile browser with WebGL 1/2 support (includes automatic schematic fallback if WebGL is unavailable and full `prefers-reduced-motion` accessibility support).

---

## 2. Installation & Local Development Instructions

```bash
# 1. Navigate into the project workspace
cd /Users/ritik/Documents/Portfolio

# 2. Install dependencies
npm install

# 3. Start the live Vite development server (http://localhost:5173)
npm run dev

# 4. Run TypeScript verification & production bundle build
npm run build

# 5. Preview production build locally
npm run preview
```

---

## 3. Technology Stack & Architecture

- **Frontend Framework**: React 18 + TypeScript + Vite
- **Real-Time 3D Engine**: Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
- **Custom Shaders**: Procedural GLSL Vertex & Fragment Shaders (`VERTEX_SHADER`, `FRAGMENT_SHADER`) powering Fresnel rim illumination, geometric lattice displacement, and telemetry scanlines
- **Motion & Scroll Choreography**: GSAP (`gsap`) + `ScrollTrigger` synchronized with frame-rate-independent 3D camera waypoints (`THREE.MathUtils.damp`)
- **Design System**: Intentional Dark Mode (*Obsidian Telemetry Calibration* — `#090A0D` Obsidian Carbon, `#111318` Graphite Alloy, `#FF4D29` Signal Vermilion, `#10B981` Verification Emerald, `#F59E0B` Diagnostic Amber) documented in `DESIGN.md`

### Directory Structure

```text
/Users/ritik/Documents/Portfolio
├── DESIGN.md                                      # Design System & Art Direction specification
├── index.html                                     # Entry HTML with Syne, Plus Jakarta Sans & JetBrains Mono
├── package.json                                   # Dependencies & build scripts
├── vite.config.ts                                 # Vite bundler & manual chunk splitting config
├── public/
│   ├── favicon.svg                                # Custom Verification Core vector emblem
│   └── Ritik_Thakre_Resume.pdf                    # Public-safe, ATS-ready downloadable resume PDF
└── src/
    ├── main.tsx                                   # Application bootstrap
    ├── App.tsx                                    # ScrollTrigger orchestrator & 3D/DOM state bridge
    ├── index.css                                  # Complete responsive design system & layout rules
    ├── types/
    │   └── portfolio.ts                           # Strict TypeScript interfaces
    ├── data/
    │   └── portfolioData.ts                       # Verified resume content, capabilities & lab data
    └── components/
        ├── IntroLoader.tsx                        # Telemetry calibration loading sequence
        ├── Navbar.tsx                             # Persistent HUD navigation, 3D Orbit & Motion controls
        ├── canvas/
        │   └── VerificationCoreScene.tsx          # Real-time 3D WebGL scene, custom GLSL shaders & satellites
        └── sections/
            ├── HeroSection.tsx                    # Asymmetric editorial hero & 3D Core Mode Console
            ├── AboutSection.tsx                   # 4-Platform Exploration Matrix & Scenario Derivation Engine
            ├── CapabilitiesSection.tsx            # 6-Domain Orbital Command Matrix & Doc Inspector
            ├── AutomationLabSection.tsx           # Interactive Execution, API/SQL & Defect Simulator
            ├── AiEngineeringSection.tsx           # Human-in-the-Loop AI Engineering Workbench
            ├── ExperienceSection.tsx              # SKYESTONE AI TECH PRIVATE LIMITED interactive timeline
            ├── EducationSection.tsx               # B.Tech AI & Data Science academic monolith
            └── ContactSection.tsx                 # Direct Transmission Terminal & Email Dispatcher
```

---

## 4. Asset Inventory

| Asset / Module | Path | Description |
| :--- | :--- | :--- |
| **GLSL Crystalline Kernel** | `src/components/canvas/VerificationCoreScene.tsx` | Custom procedural vertex displacement & fragment scanline/Fresnel shader |
| **3D Gyroscopic Rings & Satellites** | `src/components/canvas/VerificationCoreScene.tsx` | Triple calibration rings, 4 cross-platform planes, 6 interactive orbital capability nodes, and 950+ instanced spatial coordinates |
| **Vector Emblem Favicon** | `public/favicon.svg` | Custom SVG telemetry core icon |
| **Sanitized Public Resume PDF** | `public/Ritik_Thakre_Resume.pdf` | Clean, public-safe downloadable resume PDF with zero confidential project names |

---

## 5. Deployment Instructions

The production build (`npm run build`) outputs a static, pre-chunked bundle in `dist/`:
- **Vercel / Netlify / Cloudflare Pages**:
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`
  - **Node Version**: `20.x`
- **GitHub Pages / Static Hosting**: Upload the contents of `dist/` to any static web server or CDN.
