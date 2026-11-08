import React, { useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Eye,
  GitCompare,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { AI_AGENT_TOOLS, AI_WORKFLOW_STAGES } from '../../data/portfolioData';
import { CoreSimulationState } from '../../types/portfolio';

interface AiEngineeringSectionProps {
  onChangeSimulationState: (state: CoreSimulationState) => void;
}

export const AiEngineeringSection: React.FC<AiEngineeringSectionProps> = ({
  onChangeSimulationState,
}) => {
  const [selectedStageId, setSelectedStageId] = useState<string>(
    AI_WORKFLOW_STAGES[1].id
  );
  const [selectedAgentName, setSelectedAgentName] = useState<string>(
    AI_AGENT_TOOLS[0].name
  );

  const activeStage =
    AI_WORKFLOW_STAGES.find((s) => s.id === selectedStageId) || AI_WORKFLOW_STAGES[0];

  const activeAgent =
    AI_AGENT_TOOLS.find((a) => a.name === selectedAgentName) || AI_AGENT_TOOLS[0];

  const handleSelectStage = (id: string) => {
    setSelectedStageId(id);
    onChangeSimulationState('ai_synthesis');
  };

  return (
    <section
      id="ai-engineering"
      className="portfolio-section ai-engineering-section"
      aria-labelledby="ai-engineering-heading"
    >
      <div className="section-container">
        <div className="section-header">
          <span className="telemetry-badge">
            05 // HUMAN-IN-THE-LOOP AI-ASSISTED SOFTWARE DEVELOPMENT
          </span>
          <h2 id="ai-engineering-heading" className="section-title">
            AI Coding Velocity. Human QA Discipline.
          </h2>
          <p className="section-subtitle">
            Practical engineering integration of <strong>OpenAI Codex</strong>,{' '}
            <strong>Antigravity</strong>, <strong>Cursor</strong>, and <strong>Claude</strong>{' '}
            for codebase exploration, PHP/Laravel &amp; Ionic feature implementation, UI
            improvements, and Playwright/Selenium test authoring—governed by mandatory human
            review and regression validation.
          </p>
        </div>

        {/* 4 AI Coding Agents Interactive Selector Grid */}
        <div className="ai-agents-grid" role="tablist" aria-label="AI Coding Agents">
          {AI_AGENT_TOOLS.map((agent) => {
            const isSelected = agent.name === activeAgent.name;
            return (
              <button
                key={agent.name}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setSelectedAgentName(agent.name);
                  onChangeSimulationState('ai_synthesis');
                }}
                className={`ai-agent-card ${isSelected ? 'ai-agent-card--active' : ''}`}
              >
                <div className="ai-agent-card__top">
                  <span className="ai-agent-card__icon">
                    <Cpu size={16} />
                  </span>
                  <span className="ai-agent-card__cat">{agent.category}</span>
                </div>
                <h3 className="ai-agent-card__name">{agent.name}</h3>
                <p className="ai-agent-card__use">{agent.primaryUse}</p>
                <div className="ai-agent-card__gate">
                  <ShieldCheck size={14} />
                  <span>{agent.humanVerificationGate}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Agent Capability Strip */}
        <div className="ai-agent-detail-bar">
          <div className="ai-agent-detail-bar__left">
            <Sparkles size={15} />
            <span>
              <strong>{activeAgent.name} Applied Capabilities:</strong>
            </span>
            <div className="ai-agent-detail-bar__pills">
              {activeAgent.capabilities.map((cap) => (
                <span key={cap} className="tech-pill">
                  {cap}
                </span>
              ))}
            </div>
          </div>
          {activeAgent.docUrl && (
            <a
              href={activeAgent.docUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="doc-reference-link"
            >
              <span>Platform Reference</span>
              <ArrowUpRight size={13} />
            </a>
          )}
        </div>

        {/* Interactive 4-Stage Human-in-the-Loop AI Engineering Workbench */}
        <div className="ai-workbench">
          <div className="ai-workbench__stages" role="tablist" aria-label="AI Engineering Workflow Stages">
            {AI_WORKFLOW_STAGES.map((stage) => {
              const isCurrent = stage.id === activeStage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  onClick={() => handleSelectStage(stage.id)}
                  className={`ai-stage-tab ${isCurrent ? 'ai-stage-tab--active' : ''}`}
                >
                  <div className="ai-stage-tab__meta">
                    <span className="ai-stage-tab__step">{stage.step}</span>
                    <span className="ai-stage-tab__actor">{stage.actor}</span>
                  </div>
                  <span className="ai-stage-tab__title">{stage.title}</span>
                </button>
              );
            })}
          </div>

          <div className="ai-workbench__inspector" role="tabpanel">
            <div className="ai-workbench__inspector-head">
              <div>
                <span className="telemetry-chip">{activeStage.step} // {activeStage.actor}</span>
                <h3>{activeStage.title}</h3>
              </div>
              <div className="human-gate-badge">
                <UserCheck size={15} />
                <span>HUMAN QA VERIFICATION REQUIRED</span>
              </div>
            </div>

            <p className="ai-workbench__summary">{activeStage.summary}</p>

            {/* Side-by-Side Comparison: Unverified Raw AI Output vs. Human-Verified Production Diff */}
            <div className="ai-diff-comparison">
              <div className="ai-diff-pane ai-diff-pane--raw">
                <div className="ai-diff-pane__header">
                  <Eye size={14} />
                  <span>UNVERIFIED / RAW AI OUTPUT (BEFORE HUMAN AUDIT)</span>
                </div>
                <pre className="ai-diff-pane__code">
                  <code>{activeStage.rawAiSnippet}</code>
                </pre>
              </div>

              <div className="ai-diff-pane ai-diff-pane--verified">
                <div className="ai-diff-pane__header">
                  <CheckCircle2 size={14} />
                  <span>HUMAN-REVIEWED &amp; REGRESSION-VERIFIED IMPLEMENTATION</span>
                </div>
                <pre className="ai-diff-pane__code">
                  <code>{activeStage.humanVerifiedSnippet}</code>
                </pre>
              </div>
            </div>

            <div className="ai-audit-footer">
              <div className="ai-audit-footer__item">
                <GitCompare size={15} />
                <span>
                  <strong>Verification Action:</strong> {activeStage.verificationAction}
                </span>
              </div>
              <div className="ai-audit-footer__item">
                <ShieldCheck size={15} />
                <span>
                  <strong>Human Review Audit Note:</strong> {activeStage.reviewAuditNote}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
