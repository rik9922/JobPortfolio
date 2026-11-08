export type ChapterId =
  | 'introduction'
  | 'philosophy'
  | 'capabilities'
  | 'journey'
  | 'contact';

export type CapabilityId =
  | 'quality-engineering'
  | 'test-automation'
  | 'api-data-validation'
  | 'software-development'
  | 'ai-assisted-development'
  | 'qa-processes';

export interface ChapterWaypoint {
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  ambientColor: string;
  keyLightColor: string;
}

export interface InteractiveVisualLens {
  id: string;
  label: string;
  caption: string;
  visualFocus: number;
}

export interface CapabilityChapterItem {
  id: CapabilityId;
  number: string;
  title: string;
  subtitle: string;
  accentColor: string;
  secondaryColor: string;
  storyHeadline: string;
  description: string;
  visualMetaphorLabel: string;
  skills: string[];
  interactiveLenses: InteractiveVisualLens[];
}

export interface PlatformStratum {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  focusAreas: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  highlights: {
    title: string;
    detail: string;
    tags: string[];
  }[];
}
