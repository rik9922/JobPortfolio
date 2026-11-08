import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Play,
  RotateCcw,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { AUTOMATION_WORKFLOWS } from '../../data/portfolioData';
import { CoreSimulationState } from '../../types/portfolio';

interface AutomationLabSectionProps {
  onChangeSimulationState: (state: CoreSimulationState) => void;
}

export const AutomationLabSection: React.FC<AutomationLabSectionProps> = ({
  onChangeSimulationState,
}) => {
  const [activeWorkflowId, setActiveWorkflowId] = useState<string>(
    AUTOMATION_WORKFLOWS[0].id
  );
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const [mode, setMode] = useState<'nominal' | 'defect'>('nominal');
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const workflow =
    AUTOMATION_WORKFLOWS.find((w) => w.id === activeWorkflowId) ||
    AUTOMATION_WORKFLOWS[0];

  const currentStage = workflow.stages[activeStageIdx] || workflow.stages[0];

  useEffect(() => {
    if (!isRunning) return;
    onChangeSimulationState('executing');

    const timer = window.setInterval(() => {
      setActiveStageIdx((prev) => {
        if (prev < workflow.stages.length - 1) {
          return prev + 1;
        }
        setIsRunning(false);
        onChangeSimulationState(mode === 'defect' ? 'defect_trace' : 'nominal');
        return prev;
      });
    }, 650);

    return () => window.clearInterval(timer);
  }, [isRunning, mode, onChangeSimulationState, workflow.stages.length]);

  const handleSelectWorkflow = (id: string) => {
    setIsRunning(false);
    setActiveWorkflowId(id);
    setActiveStageIdx(0);
    onChangeSimulationState(mode === 'defect' ? 'defect_trace' : 'nominal');
  };

  const handleRunSimulation = () => {
    setActiveStageIdx(0);
    setIsRunning(true);
  };

  const handleToggleMode = (nextMode: 'nominal' | 'defect') => {
    setIsRunning(false);
    setMode(nextMode);
    onChangeSimulationState(nextMode === 'defect' ? 'defect_trace' : 'nominal');
  };

  return (
    <section
      id="automation-lab"
      className="portfolio-section automation-lab-section"
      aria-labelledby="automation-lab-heading"
    >
      <div className="section-container">
        <div className="section-header">
          <span className="telemetry-badge telemetry-badge--vermilion">
            04 // INTERACTIVE AUTOMATION &amp; PROTOCOL LABORATORY
          </span>
          <h2 id="automation-lab-heading" className="section-title">
            Conceptual Execution &amp; Verification Simulator.
          </h2>
          <p className="section-subtitle">
            Interactive architectural explanations of how I explore workflows, engineer Java
            Selenium/TestNG and Playwright suites, validate REST APIs &amp; SQL data integrity,
            and investigate defects across Web, PWA, Android, and iOS.
          </p>
        </div>

        {/* Workflow Selector Bar */}
        <div
          className="lab-workflow-tabs"
          role="tablist"
          aria-label="Automation Engineering Workflows"
        >
          {AUTOMATION_WORKFLOWS.map((wf, idx) => {
            const isSelected = wf.id === workflow.id;
            return (
              <button
                key={wf.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleSelectWorkflow(wf.id)}
                className={`lab-workflow-tab ${
                  isSelected ? 'lab-workflow-tab--active' : ''
                }`}
              >
                <span className="lab-workflow-tab__num">LAB 0{idx + 1}</span>
                <span className="lab-workflow-tab__title">{wf.title}</span>
                <span className="lab-workflow-tab__badge">{wf.badge}</span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Lab Console */}
        <div className="lab-console">
          {/* Top Control Bar */}
          <div className="lab-console__toolbar">
            <div className="lab-console__meta">
              <div className="lab-console__stack-pills">
                {workflow.stack.map((tech) => (
                  <span key={tech} className="tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="lab-console__summary">{workflow.summary}</p>
            </div>

            <div className="lab-console__actions">
              <div className="lab-mode-switch" role="group" aria-label="Simulation Inspection Mode">
                <button
                  type="button"
                  onClick={() => handleToggleMode('nominal')}
                  className={`lab-mode-btn ${
                    mode === 'nominal' ? 'lab-mode-btn--nominal-active' : ''
                  }`}
                >
                  <CheckCircle2 size={14} />
                  <span>NOMINAL PASS</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleMode('defect')}
                  className={`lab-mode-btn ${
                    mode === 'defect' ? 'lab-mode-btn--defect-active' : ''
                  }`}
                >
                  <AlertTriangle size={14} />
                  <span>DEFECT INVESTIGATION</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleRunSimulation}
                className="btn-primary lab-run-btn"
              >
                {isRunning ? <RotateCcw size={15} /> : <Play size={15} />}
                <span>{isRunning ? 'STEPPING PIPELINE...' : 'RUN CONCEPTUAL PIPELINE'}</span>
              </button>
            </div>
          </div>

          <div className="lab-console__body">
            {/* Left Column: 4-Stage Pipeline Stepper + Active Stage Telemetry */}
            <div className="lab-pipeline-col">
              <div className="lab-pipeline-steps" role="list" aria-label="Workflow Execution Stages">
                {workflow.stages.map((st, idx) => {
                  const isCurrent = idx === activeStageIdx;
                  const isPassed = idx < activeStageIdx;
                  return (
                    <button
                      key={st.step}
                      type="button"
                      onClick={() => {
                        setIsRunning(false);
                        setActiveStageIdx(idx);
                      }}
                      className={`pipeline-step-btn ${
                        isCurrent ? 'pipeline-step-btn--current' : ''
                      } ${isPassed ? 'pipeline-step-btn--passed' : ''} ${
                        mode === 'defect' && isCurrent ? 'pipeline-step-btn--defect' : ''
                      }`}
                    >
                      <div className="pipeline-step-btn__top">
                        <span className="pipeline-step-btn__idx">STAGE {st.step}</span>
                        <span className="pipeline-step-btn__gate">{st.verificationGate}</span>
                      </div>
                      <span className="pipeline-step-btn__title">{st.title}</span>
                      <span className="pipeline-step-btn__proto">{st.protocol}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Inspection Readout */}
              <div
                className={`stage-telemetry-card ${
                  mode === 'defect' ? 'stage-telemetry-card--defect' : ''
                }`}
              >
                <div className="stage-telemetry-card__header">
                  <div>
                    <span className="stage-telemetry-card__step">
                      STAGE {currentStage.step} // {currentStage.protocol}
                    </span>
                    <h3>{currentStage.title}</h3>
                  </div>
                  <span
                    className={`stage-status-chip ${
                      mode === 'defect'
                        ? 'stage-status-chip--amber'
                        : 'stage-status-chip--emerald'
                    }`}
                  >
                    {mode === 'defect' ? 'DEFECT ISOLATION TRACE' : 'GATE VERIFIED'}
                  </span>
                </div>

                <p className="stage-telemetry-card__detail">
                  {mode === 'nominal'
                    ? currentStage.nominalDetail
                    : currentStage.defectDetail}
                </p>

                <div className="stage-assertion-bar">
                  <ShieldCheck size={15} />
                  <span>
                    <strong>Assertion Contract:</strong> {currentStage.assertionCheck}
                  </span>
                </div>
              </div>

              {/* Defect Root-Cause & Jira Lifecycle Card */}
              <div className="defect-investigation-box">
                <div className="defect-investigation-box__head">
                  <AlertTriangle size={15} />
                  <span>DEFECT INVESTIGATION &amp; JIRA RETESTING SCENARIO</span>
                </div>
                <div className="defect-investigation-box__grid">
                  <div>
                    <span className="defect-label">OBSERVED SYMPTOM</span>
                    <p>{workflow.defectScenario.symptom}</p>
                  </div>
                  <div>
                    <span className="defect-label">ISOLATED ROOT CAUSE</span>
                    <p>{workflow.defectScenario.rootCause}</p>
                  </div>
                  <div>
                    <span className="defect-label">JIRA LOGGING &amp; FIX VERIFICATION</span>
                    <p>{workflow.defectScenario.resolution}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Code Blueprint & Protocol Telemetry */}
            <div className="lab-code-col">
              <div className="code-terminal-card">
                <div className="code-terminal-card__header">
                  <div className="code-terminal-card__title">
                    <Code2 size={15} />
                    <span>CONCEPTUAL ARCHITECTURE BLUEPRINT ({workflow.codeLanguage.toUpperCase()})</span>
                  </div>
                  <a
                    href={workflow.officialDocUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="doc-reference-link"
                  >
                    <BookOpen size={13} />
                    <span>{workflow.officialDocLabel}</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>
                <pre className="code-terminal-card__pre">
                  <code>{workflow.codeSnippet}</code>
                </pre>
              </div>

              <div className="protocol-payload-card">
                <div className="protocol-payload-card__header">
                  <Terminal size={14} />
                  <span>PROTOCOL &amp; ENVIRONMENT SPECIFICATION</span>
                </div>
                <pre className="protocol-payload-card__pre">
                  <code>{workflow.telemetryPayload}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
