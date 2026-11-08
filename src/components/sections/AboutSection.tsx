import React, { useState } from 'react';
import {
  CheckCircle2,
  Compass,
  Globe,
  Layers,
  ShieldCheck,
  Smartphone,
  TabletSmartphone,
} from 'lucide-react';
import {
  PERSONAL_BRAND,
  PLATFORM_EXPLORATION_LAYERS,
  SCENARIO_VECTORS,
} from '../../data/portfolioData';
import { CoreSimulationState } from '../../types/portfolio';

interface AboutSectionProps {
  onChangeSimulationState: (state: CoreSimulationState) => void;
}

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  web: <Globe size={18} />,
  pwa: <Layers size={18} />,
  android: <Smartphone size={18} />,
  ios: <TabletSmartphone size={18} />,
};

export const AboutSection: React.FC<AboutSectionProps> = ({ onChangeSimulationState }) => {
  const [activePlatformId, setActivePlatformId] = useState<string>(
    PLATFORM_EXPLORATION_LAYERS[0].id
  );
  const [activeVectorId, setActiveVectorId] = useState<string>(SCENARIO_VECTORS[0].id);

  const selectedPlatform =
    PLATFORM_EXPLORATION_LAYERS.find((p) => p.id === activePlatformId) ||
    PLATFORM_EXPLORATION_LAYERS[0];

  const selectedVector =
    SCENARIO_VECTORS.find((v) => v.id === activeVectorId) || SCENARIO_VECTORS[0];

  const handleSelectVector = (id: string) => {
    setActiveVectorId(id);
    if (id === 'negative' || id === 'boundary') {
      onChangeSimulationState('defect_trace');
    } else if (id === 'alternative') {
      onChangeSimulationState('executing');
    } else {
      onChangeSimulationState('nominal');
    }
  };

  return (
    <section
      id="about"
      className="portfolio-section about-section"
      aria-labelledby="about-heading"
    >
      <div className="section-container">
        <div className="section-header">
          <span className="telemetry-badge">02 // EXPLORATION &amp; VERIFICATION PHILOSOPHY</span>
          <h2 id="about-heading" className="section-title">
            Understanding Application Behaviour Before Writing Assertions.
          </h2>
        </div>

        <div className="about-layout">
          {/* Left Narrative & Scenario Vector Blueprint */}
          <div className="about-narrative-panel">
            <div className="about-narrative-copy">
              {PERSONAL_BRAND.aboutParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === 0 ? 'about-narrative-copy__lead' : 'about-narrative-copy__body'
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="scenario-vector-box">
              <div className="scenario-vector-box__header">
                <Compass size={16} />
                <span>EXPLORATORY SCENARIO DERIVATION ENGINE</span>
              </div>
              <div className="scenario-vector-tabs" role="tablist" aria-label="Test Scenario Vectors">
                {SCENARIO_VECTORS.map((vec) => {
                  const isActive = vec.id === activeVectorId;
                  return (
                    <button
                      key={vec.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleSelectVector(vec.id)}
                      className={`scenario-tab ${isActive ? 'scenario-tab--active' : ''}`}
                      style={{ '--vec-color': vec.color } as React.CSSProperties}
                    >
                      <span className="scenario-tab__code">{vec.code}</span>
                      <span className="scenario-tab__name">{vec.title}</span>
                    </button>
                  );
                })}
              </div>

              <div className="scenario-vector-detail" role="tabpanel">
                <p className="scenario-vector-detail__desc">{selectedVector.description}</p>
                <div className="scenario-vector-detail__trace">
                  <span className="scenario-vector-detail__trace-label">VERIFICATION TRACE:</span>
                  <code>{selectedVector.exampleCheck}</code>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive 4-Layer Cross-Platform Exploration Matrix */}
          <div className="platform-matrix-panel">
            <div className="platform-matrix-panel__top">
              <span className="panel-kicker">INTERACTIVE 4-PLATFORM ARCHITECTURE MATRIX</span>
              <span className="panel-sub">Select a target runtime to inspect verification vectors</span>
            </div>

            <div className="platform-selector-grid" role="tablist" aria-label="Target Application Platforms">
              {PLATFORM_EXPLORATION_LAYERS.map((layer) => {
                const isSelected = layer.id === activePlatformId;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActivePlatformId(layer.id)}
                    className={`platform-layer-btn ${
                      isSelected ? 'platform-layer-btn--active' : ''
                    }`}
                  >
                    <span className="platform-layer-btn__icon">
                      {PLATFORM_ICONS[layer.id]}
                    </span>
                    <span className="platform-layer-btn__meta">
                      <span className="platform-layer-btn__name">{layer.name}</span>
                      <span className="platform-layer-btn__tag">{layer.tag}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="platform-inspector-card" role="tabpanel">
              <div className="platform-inspector-card__header">
                <h3>{selectedPlatform.name}</h3>
                <span className="telemetry-chip">{selectedPlatform.tag}</span>
              </div>

              <p className="platform-inspector-card__summary">{selectedPlatform.summary}</p>

              <div className="platform-inspector-card__vectors">
                <span className="inspector-subhead">CORE EXPLORATION &amp; QA VECTORS</span>
                <ul>
                  {selectedPlatform.explorationVectors.map((vec) => (
                    <li key={vec}>
                      <CheckCircle2 size={14} className="list-icon-emerald" />
                      <span>{vec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="platform-inspector-card__footer">
                <div className="platform-focus-line">
                  <ShieldCheck size={15} />
                  <span>
                    <strong>Primary Gate:</strong> {selectedPlatform.validationFocus}
                  </span>
                </div>
                <div className="platform-tooling-pills">
                  {selectedPlatform.tooling.map((tool) => (
                    <span key={tool} className="tech-pill">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
