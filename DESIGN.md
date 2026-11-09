# Design System — Ritik Thakre 3D & WebGL Portfolio

## 1. Visual Identity & Aesthetic Philosophy
- **Stage**: Pitch-black obsidian (`#050505`) with a warm crimson radial vignette on the hero stage (`#1c0705` → `#000000`).
- **Single Signature Accent**: Electric Crimson (`#ff3322`), paired with multi-stop metallic chrome display typography (`linear-gradient(180deg, #ffffff 0%, #cfd2d8 38%, #6c7078 52%, #d9dce1 74%, #ffffff 100%)`).
- **Floating Skill Accents (`Home`)**:
  - Crimson (`#ff5545`)
  - Cobalt (`#5aa2ff`)
  - Emerald (`#46d68a`)
  - Amber (`#ffb43a`)

## 2. Typography
- **Display (`--display`)**: `'Syne'`, weight `800`, tight tracking (`-0.04em` to `-0.045em`), used for the giant full-bleed hero name (`RITIK THAKRE`), chapter titles (`About`, `What I can do`, `Journey`, `Let's talk.`), and numbered row headers.
- **Editorial Serif (`--serif`)**: `'Instrument Serif'`, italic/regular, used for philosophical pull quotes, role subtitles, and stage captions.
- **UI & Body (`--sans`)**: `'Plus Jakarta Sans'`, weights `500`–`700`, used for navigation, capability descriptions, and technical skill chips.

## 3. Interactive 3D & Canvas Modules
1. **`src/components/canvas/PortraitParticles.tsx`**:
   - Samples `/ritik-cutout.png` on a `220×220` grid into custom GLSL points (`VERTEX` & `FRAGMENT` shaders).
   - Animates `uAssemble` from scattered 3D coordinates into the portrait and applies a velocity-sensitive pointer ripple (`uMouse`, `uRepel`).
2. **`src/components/canvas/LaptopStage.tsx`**:
   - Renders an anodized Space-Silver 3D MacBook (`RoundedBox` unibody chassis, backlit keyboard texture, studio `Lightformer` lighting) whose `THREE.CanvasTexture` screen updates dynamically when selecting any of the 6 capability rows.
3. **`src/components/canvas/BadgeScene.tsx`**:
   - Simulates a 2D rope-constrained pendulum in 3D space (`ANCHOR`, `ROPE`) with pointer capture dragging, viewport edge bounce guards, and click-to-flip `180°` Y-axis rotation showing front/back `THREE.CanvasTexture` faces.
4. **`src/components/pages/PlayPage.tsx`**:
   - Renders `TEST. BREAK. SHIP.` into an offscreen canvas and spawns interactive spring-physics pixel blocks that repel on pointer hover and shatter outward on click.
