import {
  CapabilityChapterItem,
  ChapterId,
  ChapterWaypoint,
  ExperienceItem,
  PlatformStratum,
} from '../types/portfolio';

export const PERSONAL_IDENTITY = {
  name: 'Ritik Thakre',
  primaryRole: 'QA ENGINEER',
  disciplines: ['QA ENGINEER', 'TEST AUTOMATION', 'AI-ASSISTED SOFTWARE DEVELOPMENT'],
  headline: 'I EXPLORE. I AUTOMATE. I ENGINEER.',
  tagline: 'Engineering Quality. Automating Possibilities. Building with AI.',
  location: 'Nagpur, Maharashtra, India',
  email: 'ritikthakre2020@gmail.com',
  phone: '+91 7038490070',
  phoneHref: '+917038490070',
  linkedin: 'https://www.linkedin.com/in/ritik-thakre2020/',
  linkedinLabel: 'linkedin.com/in/ritik-thakre2020',
  resumeHref: '/Ritik_Thakre_Resume.pdf',
};

export const CHAPTERS: { id: ChapterId; number: string; label: string }[] = [
  { id: 'introduction', number: '01', label: 'Introduction' },
  { id: 'philosophy', number: '02', label: 'Philosophy' },
  { id: 'capabilities', number: '03', label: 'Capabilities' },
  { id: 'journey', number: '04', label: 'Journey' },
  { id: 'contact', number: '05', label: 'Contact' },
];

export const CHAPTER_WAYPOINTS: Record<ChapterId, ChapterWaypoint> = {
  introduction: {
    cameraPosition: [0.65, 0.25, 6.2],
    cameraTarget: [1.15, 0.05, 0],
    ambientColor: '#1a1824',
    keyLightColor: '#E85D3F',
  },
  philosophy: {
    cameraPosition: [0.25, 0.32, -9.8],
    cameraTarget: [0.45, -0.05, -16.0],
    ambientColor: '#162026',
    keyLightColor: '#6EE7B7',
  },
  capabilities: {
    cameraPosition: [0.3, 0.25, -25.8],
    cameraTarget: [0.5, -0.08, -32.0],
    ambientColor: '#1d1928',
    keyLightColor: '#E85D3F',
  },
  journey: {
    cameraPosition: [0.25, 0.35, -41.8],
    cameraTarget: [0.45, -0.05, -48.0],
    ambientColor: '#1f1c18',
    keyLightColor: '#D6C7B2',
  },
  contact: {
    cameraPosition: [0.0, 0.25, -57.8],
    cameraTarget: [0.0, 0.05, -64.0],
    ambientColor: '#181d24',
    keyLightColor: '#6EE7B7',
  },
};

export const PHILOSOPHY_CONTENT = {
  eyebrow: 'About & Engineering Philosophy',
  headline: 'Exploration comes before automation.',
  lead: 'QA Engineer with hands-on experience across Web, Progressive Web Applications (PWA), Android, and iOS platforms—driven by independent application exploration and end-to-end workflow understanding rather than reliance on predefined test cases.',
  body: 'By mapping how features, interfaces, APIs, and data layers interact in real usage, I derive meaningful positive, negative, boundary, and alternative scenarios, build maintainable Java automation suites, and contribute to AI-assisted software development while helping prevent regressions.',
};

export const PLATFORM_STRATA: PlatformStratum[] = [
  {
    id: 'web',
    title: 'Web Applications',
    subtitle: 'End-to-End Browser Workflows',
    description:
      'Independent exploration of multi-step web journeys, dynamic UI states, and form validations, paired with Java, Selenium WebDriver, TestNG, and Playwright automation.',
    focusAreas: ['Exploratory Testing', 'UI & Functional Validation', 'Browser Automation'],
  },
  {
    id: 'pwa',
    title: 'Progressive Web Apps (PWA)',
    subtitle: 'Responsive & Cross-Viewport Continuity',
    description:
      'Testing and contributing to Ionic and web-based PWAs across desktop and mobile viewports, validating state transitions, navigation flows, and UI updates.',
    focusAreas: ['PWA Workflow Validation', 'Ionic UI Contributions', 'Regression Testing'],
  },
  {
    id: 'android',
    title: 'Android Applications',
    subtitle: 'Mobile Journey & State Verification',
    description:
      'Hands-on manual functional, negative, boundary, and regression testing on Android builds to verify multi-step user flows and backend synchronization.',
    focusAreas: ['Android Build Testing', 'Boundary & Negative Flows', 'Fix Retesting'],
  },
  {
    id: 'ios',
    title: 'iOS Applications',
    subtitle: 'Cross-Platform Consistency',
    description:
      'Validating end-to-end user journeys on iOS alongside Android and web platforms to check consistent behaviour across release updates.',
    focusAreas: ['iOS Build Testing', 'Cross-Platform Checks', 'Release Validation'],
  },
];

export const CAPABILITY_ITEMS: CapabilityChapterItem[] = [
  {
    id: 'quality-engineering',
    number: '01',
    title: 'QUALITY ENGINEERING',
    subtitle: 'Behavioral Discovery & Multi-Scenario Verification',
    accentColor: '#6EE7B7',
    secondaryColor: '#D6C7B2',
    storyHeadline: 'Illuminating application behaviour from every angle.',
    description:
      'Rather than following static scripts blindly, I explore application features and module interactions independently to uncover how workflows behave under normal, boundary, and unexpected conditions.',
    visualMetaphorLabel: 'Conceptual 3D Visualization — Multi-Angle Behavioural Prism',
    skills: [
      'Manual Testing',
      'Exploratory Testing',
      'Functional Testing',
      'Regression Testing',
      'Smoke Testing',
      'Integration Testing',
      'End-to-End Testing',
      'Negative Testing',
      'Boundary Testing',
      'UI Testing',
      'System Testing',
      'Retesting',
      'Cross-Platform Testing',
      'Web Application Testing',
      'PWA Testing',
      'Android Testing',
      'iOS Testing',
    ],
    interactiveLenses: [
      {
        id: 'positive-flow',
        label: 'Positive & E2E Flows',
        caption: 'Tracing complete user journeys across Web, PWA, Android, and iOS interfaces.',
        visualFocus: 0,
      },
      {
        id: 'boundary-negative',
        label: 'Negative & Boundary',
        caption: 'Challenging input limits, edge conditions, and invalid state transitions.',
        visualFocus: 1,
      },
      {
        id: 'regression-smoke',
        label: 'Smoke & Regression',
        caption: 'Validating critical paths and assessing change impact across release updates.',
        visualFocus: 2,
      },
    ],
  },
  {
    id: 'test-automation',
    number: '02',
    title: 'TEST AUTOMATION',
    subtitle: 'Java, Selenium WebDriver, TestNG & Playwright',
    accentColor: '#E85D3F',
    secondaryColor: '#F5F2EB',
    storyHeadline: 'Turning explored workflows into structured browser automation.',
    description:
      'I develop and maintain automation scripts and regression suites grounded in real application behaviour using Java, Selenium WebDriver, and TestNG, alongside practical Playwright automation with Java using AI-assisted workflows.',
    visualMetaphorLabel: 'Conceptual 3D Visualization — Layered Browser & Page Object Architecture',
    skills: [
      'Java',
      'Selenium WebDriver',
      'TestNG',
      'Playwright with Java',
      'Maven',
      'Git',
      'Page Object Model',
      'Automation Framework Development',
      'Assertions',
      'Automation Scripts',
      'Regression Automation',
    ],
    interactiveLenses: [
      {
        id: 'pom-layers',
        label: 'Page Object Layers',
        caption: 'Separating UI element locators and page actions from test assertion logic.',
        visualFocus: 0,
      },
      {
        id: 'selenium-testng',
        label: 'Selenium & TestNG',
        caption: 'Executing Java WebDriver scripts orchestrated with TestNG annotations and assertions.',
        visualFocus: 1,
      },
      {
        id: 'playwright-java',
        label: 'Playwright with Java',
        caption: 'Implementing modern browser automation workflows with AI-assisted development.',
        visualFocus: 2,
      },
    ],
  },
  {
    id: 'api-data-validation',
    number: '03',
    title: 'API & DATA VALIDATION',
    subtitle: 'REST Payloads, HTTP Contracts & SQL Checks',
    accentColor: '#F59E0B',
    secondaryColor: '#6EE7B7',
    storyHeadline: 'Verifying the conversation between interface, API, and database.',
    description:
      'Quality extends beneath the user interface. I validate REST APIs in Postman across request/response payloads, HTTP status codes, CRUD operations, and error handling, and execute SQL queries for database and data-integrity checks.',
    visualMetaphorLabel: 'Conceptual 3D Visualization — Request, Response & Relational Conduit',
    skills: [
      'Postman',
      'REST APIs',
      'CRUD Validation',
      'HTTP Status Codes',
      'JSON Validation',
      'SQL',
      'Data Integrity',
    ],
    interactiveLenses: [
      {
        id: 'rest-payload',
        label: 'REST & JSON Payloads',
        caption: 'Inspecting request bodies, response structures, and HTTP status codes in Postman.',
        visualFocus: 0,
      },
      {
        id: 'crud-lifecycle',
        label: 'CRUD & Error Handling',
        caption: 'Validating create, read, update, and delete operations alongside negative responses.',
        visualFocus: 1,
      },
      {
        id: 'sql-integrity',
        label: 'SQL & Data Integrity',
        caption: 'Running SQL queries to verify that application actions persist accurately in the database.',
        visualFocus: 2,
      },
    ],
  },
  {
    id: 'software-development',
    number: '04',
    title: 'SOFTWARE DEVELOPMENT',
    subtitle: 'Backend, PWA & Cross-Platform Foundations',
    accentColor: '#38BDF8',
    secondaryColor: '#D6C7B2',
    storyHeadline: 'Bridging quality engineering with hands-on software development.',
    description:
      'Deep product and workflow understanding enables me to contribute directly to ongoing PHP/Laravel backend, Ionic PWA, and mobile application updates—while applying foundational knowledge of Java, Spring Boot, and Hibernate/JPA.',
    visualMetaphorLabel: 'Conceptual 3D Visualization — Interlocking Application Strata',
    skills: [
      'PHP',
      'Laravel',
      'Ionic',
      'Java',
      'Spring Boot',
      'Hibernate/JPA',
      'REST API Development',
    ],
    interactiveLenses: [
      {
        id: 'laravel-backend',
        label: 'PHP & Laravel Backend',
        caption: 'Contributing to backend workflow logic, controllers, and API endpoints.',
        visualFocus: 0,
      },
      {
        id: 'ionic-pwa',
        label: 'Ionic PWA & Mobile UI',
        caption: 'Implementing UI improvements and functional updates across PWA and mobile views.',
        visualFocus: 1,
      },
      {
        id: 'java-spring',
        label: 'Java, Spring Boot & JPA',
        caption: 'Foundational object-oriented backend and relational persistence architecture.',
        visualFocus: 2,
      },
    ],
  },
  {
    id: 'ai-assisted-development',
    number: '05',
    title: 'AI-ASSISTED DEVELOPMENT',
    subtitle: 'Human-Guided Engineering with AI Coding Agents',
    accentColor: '#C084FC',
    secondaryColor: '#E85D3F',
    storyHeadline: 'Pairing AI coding speed with human exploratory verification.',
    description:
      'I use OpenAI Codex, Antigravity, Cursor, and Claude to assist with codebase exploration, PHP/Laravel and Ionic feature implementation, UI improvements, and Playwright/Selenium test authoring—always validating changes against existing application behaviour.',
    visualMetaphorLabel: 'Conceptual 3D Visualization — Human & AI Agent Symbiosis',
    skills: ['OpenAI Codex', 'Antigravity', 'Cursor', 'Claude'],
    interactiveLenses: [
      {
        id: 'code-exploration',
        label: 'Exploration & Assistance',
        caption: 'Navigating multi-file codebases and scaffolding backend or UI updates with AI tools.',
        visualFocus: 0,
      },
      {
        id: 'test-synthesis',
        label: 'AI-Assisted Test Authoring',
        caption: 'Accelerating Playwright with Java and automation script implementation.',
        visualFocus: 1,
      },
      {
        id: 'human-validation',
        label: 'Human Review & QA Gate',
        caption: 'Validating every AI-assisted update against real application behaviour to prevent regressions.',
        visualFocus: 2,
      },
    ],
  },
  {
    id: 'qa-processes',
    number: '06',
    title: 'QA PROCESSES',
    subtitle: 'Lifecycle Governance, Traceability & Release Coordination',
    accentColor: '#D6C7B2',
    secondaryColor: '#6EE7B7',
    storyHeadline: 'Structured quality practices from scenario design to release sign-off.',
    description:
      'Disciplined adherence to STLC, SDLC, and Agile/Scrum workflows—deriving traceable test scenarios, logging clear defects in Jira with reproduction steps and evidence, verifying fixes, and coordinating daily release progress.',
    visualMetaphorLabel: 'Conceptual 3D Visualization — Quality Lifecycle Continuum',
    skills: [
      'STLC',
      'SDLC',
      'Agile/Scrum',
      'Jira',
      'Defect Lifecycle',
      'Test Scenarios',
      'Test Cases',
      'RTM',
      'Release Validation',
    ],
    interactiveLenses: [
      {
        id: 'scenarios-rtm',
        label: 'Scenarios, Cases & RTM',
        caption: 'Structuring test scenarios, test cases, and requirement traceability matrices.',
        visualFocus: 0,
      },
      {
        id: 'jira-defect',
        label: 'Jira & Defect Lifecycle',
        caption: 'Logging reproducible defects with evidence, retesting fixes, and checking regression impact.',
        visualFocus: 1,
      },
      {
        id: 'agile-release',
        label: 'Agile & Release Validation',
        caption: 'Sharing daily progress with clients and coordinating across QA and development for releases.',
        visualFocus: 2,
      },
    ],
  },
];

export const EXPERIENCE_TIMELINE: ExperienceItem = {
  company: 'SKYESTONE AI TECH PRIVATE LIMITED',
  role: 'Jr. QA Engineer',
  location: 'Nagpur, Maharashtra',
  period: '08 April 2026 – Present',
  summary:
    'Working across exploratory and manual quality assurance, Java browser automation, REST API and SQL validation, and AI-assisted full-stack development across Web, PWA, Android, and iOS platforms.',
  highlights: [
    {
      title: 'Independent Exploration & Multi-Platform Manual QA',
      detail:
        'Independently explore application features, module interactions, and end-to-end user journeys to identify positive, negative, boundary, and alternative scenarios; execute functional, UI, integration, system, smoke, regression, and retesting across Web, PWA, Android, and iOS applications.',
      tags: ['Web', 'PWA', 'Android', 'iOS', 'Exploratory & Regression QA'],
    },
    {
      title: 'Java, Selenium WebDriver, TestNG & Playwright Automation',
      detail:
        'Develop and maintain automation scripts and regression suites for explored workflows using Java, Selenium WebDriver, TestNG, Maven, Git, and assertions, alongside practical experience implementing Playwright automation with Java using AI-assisted workflows.',
      tags: ['Java', 'Selenium WebDriver', 'TestNG', 'Playwright (Java)', 'Maven', 'Git'],
    },
    {
      title: 'Defect Investigation, REST API & SQL Validation',
      detail:
        'Investigate automation and functional failures, log detailed defects in Jira with reproduction steps and evidence, validate fixes, and assess regression impact; validate REST APIs in Postman and execute SQL queries for database and data-integrity checks.',
      tags: ['Jira', 'Postman', 'REST APIs', 'HTTP Status Codes', 'SQL', 'Data Integrity'],
    },
    {
      title: 'AI-Assisted Development & Client Coordination',
      detail:
        'Apply accumulated application and workflow knowledge to contribute to AI-assisted software development across PHP/Laravel backend, Ionic PWA, and mobile features using OpenAI Codex, Antigravity, Cursor, and Claude; share daily progress with clients to support releases.',
      tags: ['PHP', 'Laravel', 'Ionic', 'OpenAI Codex', 'Antigravity', 'Cursor', 'Claude'],
    },
  ],
};

export const EDUCATION_RECORD = {
  degree: 'B.Tech – Artificial Intelligence & Data Science',
  institution: 'Priyadarshini Engineering College, Nagpur',
  period: '2021 – 2024',
  score: 'CGPA: 7.30 / 10',
  summary:
    'Academic foundation in artificial intelligence concepts, data structures, relational databases, and software engineering principles supporting practical quality engineering and AI-assisted development.',
};
