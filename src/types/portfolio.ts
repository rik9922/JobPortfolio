export type SectionId =
  | 'hero'
  | 'about'
  | 'capabilities'
  | 'automation-lab'
  | 'ai-engineering'
  | 'experience'
  | 'education'
  | 'contact';

export type CoreSimulationState = 'nominal' | 'executing' | 'defect_trace' | 'ai_synthesis';

export interface CameraWaypoint {
  position: [number, number, number];
  target: [number, number, number];
  coreRotation: [number, number, number];
  ringSpread: number;
  accentIntensity: number;
}

export interface SkillItem {
  name: string;
  role: string;
  architectureNote: string;
  docUrl?: string;
  docLabel?: string;
}

export interface CapabilityDomain {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  color: string;
  orbitAngle: number;
  orbitRadius: number;
  orbitHeight: number;
  description: string;
  architecturalSummary: string;
  skills: SkillItem[];
}

export interface AutomationStage {
  step: string;
  title: string;
  protocol: string;
  verificationGate: string;
  nominalDetail: string;
  defectDetail: string;
  assertionCheck: string;
}

export interface AutomationWorkflow {
  id: string;
  title: string;
  badge: string;
  stack: string[];
  summary: string;
  officialDocUrl: string;
  officialDocLabel: string;
  stages: AutomationStage[];
  codeSnippet: string;
  codeLanguage: string;
  telemetryPayload: string;
  defectScenario: {
    symptom: string;
    rootCause: string;
    resolution: string;
  };
}

export interface AiAgentTool {
  name: string;
  category: string;
  primaryUse: string;
  humanVerificationGate: string;
  capabilities: string[];
  docUrl?: string;
}

export interface AiWorkflowStage {
  id: string;
  step: string;
  title: string;
  actor: 'HUMAN ENGINEER' | 'AI CODING AGENT' | 'HYBRID COLLABORATION';
  summary: string;
  verificationAction: string;
  rawAiSnippet: string;
  humanVerifiedSnippet: string;
  reviewAuditNote: string;
}

export interface ExperienceResponsibility {
  id: string;
  index: string;
  category: 'QA & Exploration' | 'Test Automation' | 'API & Data' | 'Full-Stack & AI' | 'Collaboration';
  title: string;
  description: string;
  technologies: string[];
  verificationImpact: string;
}

export interface PlatformExplorationLayer {
  id: string;
  name: string;
  tag: string;
  summary: string;
  explorationVectors: string[];
  validationFocus: string;
  tooling: string[];
}
