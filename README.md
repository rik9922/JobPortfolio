# Ritik Thakre — Interactive 3D & WebGL Portfolio

**QA Engineer · Test Automation · AI-Assisted Software Development**  
*"I Explore. I Automate. I Engineer."*

---

## 1. Creative Direction & 3-Reel Synthesis

Designed as an interactive, multi-page WebGL & 3D stage on pitch black (`#050505`) with liquid-chrome display typography (**Syne** 800) and a single high-contrast crimson accent (`#ff3322`), this portfolio synthesizes three distinct interactive showcase paradigms:

1. **WebGL Stipple Particle Portrait & Chrome Poster Stage (`Home`)**:
   - **Loader**: A glowing white dot on pitch black that scrambles through glyphs into `RITIK THAKRE` before lifting a red GSAP curtain.
   - **Interactive WebGL Particle Portrait (`src/components/canvas/PortraitParticles.tsx`)**: Over 22,000 custom GLSL shader points sampled from Ritik's authentic cutout portrait (`/ritik-cutout.png`) that assemble from 3D space and ripple interactively in response to pointer velocity.
   - **Floating Color-Coded Skill Pills & Giant Chrome Typography**: Orbiting skill badges (`QA Engineer`, `Test Automation`, `AI-Assisted Development`, `Java · Selenium · TestNG`, `Playwright`, `REST API · SQL`) framing the full-viewport metallic chrome `RITIK THAKRE` headline.
2. **Tactile 3D Objects You Can Touch (`Capabilities` & `Contact`)**:
   - **3D Studio MacBook Stage (`src/components/canvas/LaptopStage.tsx`)**: A 3D anodized Space-Silver MacBook Pro rendered with React Three Fiber whose screen dynamically paints a custom visual diagram for each of the 6 core engineering capabilities (`01`–`06`).
   - **Physics-Driven 3D Lanyard ID Badge (`src/components/canvas/BadgeScene.tsx`)**: A swinging 3D ID card suspended from a crimson lanyard that responds to pointer dragging, pendulum rope physics, and click-to-flip 180° rotation between the photo ID front and the `SAY HELLO / Let's talk.` back.
3. **Curtain-Wipe Multi-Page Architecture & Destructible Pixel Playground (`About`, `Journey`, `Play`)**:
   - **GSAP Red Curtain Page Transitions (`src/App.tsx`)**: Full-screen chapter transitions (`Home`, `About`, `Capabilities`, `Journey`, `Play`, `Contact`) with keyboard arrow navigation (`←` / `→`).
   - **Numbered Interactive Accordion Rows (`01`–`06`)**: Editorial service/capability rows with rotating red `↗` arrows across `About`, `Capabilities`, and `Journey`.
   - **"Break it if you can" Playground (`src/components/pages/PlayPage.tsx`)**: An interactive 2D physics canvas rendering `TEST. BREAK. SHIP.` out of hundreds of square pixels that repel around the cursor and shatter in red on click before springing back into formation.

---

## 2. Multi-Page Architecture

| Page | ID | Interactive Highlight | Content Focus |
| :--- | :--- | :--- | :--- |
| **01 · Home** | `home` | WebGL GLSL Particle Portrait (`PortraitParticles.tsx`) + Floating Skill Pills | Full-viewport introduction, `RITIK THAKRE` chrome display typography, role bar, Resume download, and LinkedIn link. |
| **02 · About** | `about` | Giant Chrome Editorial Header + Expandable Platform Rows (`01`–`04`) | Engineering philosophy (`I Explore. I Automate. I Engineer.`) and cross-platform verification across **Web**, **PWA**, **Android**, and **iOS**. |
| **03 · Capabilities** | `capabilities` | Interactive 3D MacBook Stage (`LaptopStage.tsx`) + Rows (`01`–`06`) | `QUALITY ENGINEERING`, `TEST AUTOMATION`, `API & DATA VALIDATION`, `SOFTWARE DEVELOPMENT`, `AI-ASSISTED DEVELOPMENT`, and `QA PROCESSES`. |
| **04 · Journey** | `journey` | Experience & Responsibility Rows (`01`–`04`) + Academic Panel | **SKYESTONE AI TECH PRIVATE LIMITED** (`Jr. QA Engineer`, `08 April 2026 – Present`) and **B.Tech – Artificial Intelligence & Data Science** (`2021 – 2024`, `CGPA: 7.30 / 10`). |
| **05 · Play** | `play` | Destructible Pixel-Matrix Canvas (`PlayPage.tsx`) | Interactive `"Break it if you can."` physics sandbox (`TEST. BREAK. SHIP.`). |
| **06 · Contact** | `contact` | Draggable & Flippable 3D Lanyard ID Badge (`BadgeScene.tsx`) | Direct email (`ritikthakre2020@gmail.com`), phone (`+91 7038490070`), LinkedIn, location (`Nagpur, Maharashtra, India`), and Resume PDF. |

---

## 3. Public Content & Privacy Guardrails

This public portfolio strictly adheres to professional confidentiality standards:
- **Zero Confidential Project or Client Names**: Contains no references to internal project names, client brands, private application URLs, internal API endpoints, or database schemas.
- **No Project-Shaped Code or Synthetic Scenarios**: Capabilities are communicated through engineering principles and abstract visual stages rather than synthetic domain scenarios or project-shaped SQL/code snippets.
- **Verified Resume Accuracy**: Exclusively presents verified credentials from Ritik Thakre's approved resume (`SKYESTONE AI TECH PRIVATE LIMITED`, `B.Tech – Artificial Intelligence & Data Science`, and verified technical skills).

---

## 4. Technical Stack

- **3D & WebGL Rendering**: `three`, `@react-three/fiber`, `@react-three/drei` (`RoundedBox`, `Environment`, `Lightformer`, custom GLSL `ShaderMaterial`)
- **Motion & Page Choreography**: `gsap`
- **Frontend Architecture**: React 19, TypeScript, Vite 6, Lucide Icons

---

## 5. Local Development & Production Build

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Type-check and build production bundle
npm run build

# Preview production build
npm run preview
```
