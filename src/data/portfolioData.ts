import {
  AiAgentTool,
  AiWorkflowStage,
  AutomationWorkflow,
  CameraWaypoint,
  CapabilityDomain,
  ExperienceResponsibility,
  PlatformExplorationLayer,
  SectionId,
} from '../types/portfolio';

export const PERSONAL_BRAND = {
  name: 'Ritik Thakre',
  role: 'QA ENGINEER',
  positioning: 'TEST AUTOMATION | AI-ASSISTED SOFTWARE DEVELOPMENT',
  positioningPills: ['QA ENGINEER', 'TEST AUTOMATION', 'AI-ASSISTED SOFTWARE DEVELOPMENT'],
  location: 'Nagpur, Maharashtra, India',
  coordinates: '21.1458° N, 79.0882° E',
  email: 'ritikthakre2020@gmail.com',
  phone: '+91 7038490070',
  phoneRaw: '+917038490070',
  linkedin: 'https://www.linkedin.com/in/ritik-thakre2020/',
  linkedinHandle: 'linkedin.com/in/ritik-thakre2020',
  resumeUrl: '/Ritik_Thakre_Resume.pdf',
  tagline: 'Engineering Quality. Automating Possibilities. Building with AI.',
  heroHeadline: 'I Explore. I Automate. I Engineer.',
  aboutParagraphs: [
    'QA Engineer with hands-on experience independently exploring application workflows, performing manual testing, and developing test automation across web, PWA, Android, and iOS applications.',
    'Experienced in Java-based Selenium and TestNG automation, Playwright with Java, API validation, and practical AI-assisted software development.',
    'Focus on understanding application behaviour, validating changes, investigating defects, and reducing regression risks.',
  ],
};

export const NAV_SECTIONS: { id: SectionId; index: string; label: string; shortLabel: string }[] = [
  { id: 'hero', index: '01', label: 'Verification Core', shortLabel: 'Core' },
  { id: 'about', index: '02', label: 'Exploration Matrix', shortLabel: 'About' },
  { id: 'capabilities', index: '03', label: 'Capabilities', shortLabel: 'Skills' },
  { id: 'automation-lab', index: '04', label: 'Automation Lab', shortLabel: 'Auto Lab' },
  { id: 'ai-engineering', index: '05', label: 'AI Engineering', shortLabel: 'AI Eng' },
  { id: 'experience', index: '06', label: 'Experience', shortLabel: 'Career' },
  { id: 'education', index: '07', label: 'Education', shortLabel: 'Degree' },
  { id: 'contact', index: '08', label: 'Transmission', shortLabel: 'Contact' },
];

export const CAMERA_WAYPOINTS: Record<SectionId, CameraWaypoint> = {
  hero: {
    position: [2.35, 0.45, 6.2],
    target: [0.85, 0.05, 0],
    coreRotation: [0.18, 0.42, 0.06],
    ringSpread: 1.0,
    accentIntensity: 1.0,
  },
  about: {
    position: [-2.4, 1.35, 5.8],
    target: [-0.45, 0.1, 0],
    coreRotation: [0.52, -0.65, 0.18],
    ringSpread: 1.18,
    accentIntensity: 0.9,
  },
  capabilities: {
    position: [0.0, 2.25, 6.8],
    target: [0.0, -0.1, 0],
    coreRotation: [0.78, 0.95, -0.12],
    ringSpread: 1.42,
    accentIntensity: 1.15,
  },
  'automation-lab': {
    position: [2.7, -0.35, 5.1],
    target: [0.65, -0.05, 0],
    coreRotation: [-0.28, 1.54, 0.32],
    ringSpread: 1.25,
    accentIntensity: 1.3,
  },
  'ai-engineering': {
    position: [-2.55, 0.25, 5.35],
    target: [-0.6, 0.05, 0],
    coreRotation: [0.38, -1.35, -0.26],
    ringSpread: 1.34,
    accentIntensity: 1.25,
  },
  experience: {
    position: [1.95, 1.65, 5.95],
    target: [0.4, 0.15, 0],
    coreRotation: [0.62, 2.1, 0.15],
    ringSpread: 1.12,
    accentIntensity: 1.0,
  },
  education: {
    position: [-1.85, -1.1, 5.75],
    target: [-0.35, -0.15, 0],
    coreRotation: [-0.45, 2.65, -0.2],
    ringSpread: 0.96,
    accentIntensity: 0.95,
  },
  contact: {
    position: [0.0, 0.85, 7.25],
    target: [0.0, 0.0, 0],
    coreRotation: [0.25, 3.14, 0.0],
    ringSpread: 1.28,
    accentIntensity: 1.1,
  },
};

export const PLATFORM_EXPLORATION_LAYERS: PlatformExplorationLayer[] = [
  {
    id: 'web',
    name: 'Web Applications',
    tag: 'DOM / W3C WebDriver / REST',
    summary:
      'End-to-end exploratory and automated verification of multi-role web platforms, dynamic search interfaces, asynchronous form workflows, and session state management.',
    explorationVectors: [
      'DOM state synchronization & dynamic AJAX/Fetch rendering',
      'Role-based access boundaries & session token expiration',
      'Form validation across positive, negative, and boundary inputs',
      'Cross-browser layout & functional consistency',
    ],
    validationFocus: 'Deterministic UI state assertions & end-to-end journey stability',
    tooling: ['Java', 'Selenium WebDriver', 'TestNG', 'Playwright', 'Chrome DevTools'],
  },
  {
    id: 'pwa',
    name: 'Progressive Web Apps (PWA)',
    tag: 'Service Workers / Ionic / Responsive',
    summary:
      'Deep functional testing and AI-assisted feature contributions across installable Ionic/Web PWAs, validating responsive viewports, cached assets, and state transitions.',
    explorationVectors: [
      'Responsive viewport breakpoints across desktop, tablet, and mobile drawers',
      'Client-side state persistence across page reloads and navigation stacks',
      'Interactive multi-party workflows (requests, approvals, status transitions)',
      'UI component improvements and regression verification',
    ],
    tooling: ['Ionic', 'Playwright (Java)', 'Selenium WebDriver', 'Browser Emulation', 'REST APIs'],
    validationFocus: 'Seamless parity between browser runtime and mobile-installed PWA shells',
  },
  {
    id: 'android',
    name: 'Android Applications',
    tag: 'Mobile Builds / Touch Flows / API Sync',
    summary:
      'Hands-on exploratory and regression testing across Android builds, verifying native/hybrid navigation gestures, location/service selection, and real-time backend synchronization.',
    explorationVectors: [
      'Lifecycle state preservation across background/foreground app switching',
      'Location, service selection, booking identifiers, and dynamic pricing calculation',
      'Network interruption recovery and API payload integrity',
      'Permission prompts, input keyboards, and hardware back-navigation',
    ],
    tooling: ['Android Builds', 'Manual Exploratory QA', 'Postman', 'SQL Verification', 'Jira'],
    validationFocus: 'End-to-end mobile booking & marketplace transaction reliability',
  },
  {
    id: 'ios',
    name: 'iOS Applications',
    tag: 'iOS Builds / Cross-Platform Parity',
    summary:
      'Systematic verification of iOS application builds alongside Android and PWA counterparts to guarantee identical business logic, status transitions, and user experience.',
    explorationVectors: [
      'Cross-platform state parity between iOS, Android, and Web/PWA endpoints',
      'Safe-area layout rendering, modal sheets, and touch target responsiveness',
      'End-to-end status transitions from creation through completion',
      'Release candidate smoke and regression sign-off',
    ],
    tooling: ['iOS Builds', 'Cross-Platform Test Matrices', 'Boundary Testing', 'Release Validation'],
    validationFocus: 'Zero behavioral drift across iOS, Android, and Web release targets',
  },
];

export const SCENARIO_VECTORS = [
  {
    id: 'positive',
    code: 'VEC-01',
    title: 'Positive Flow Verification',
    color: '#10B981',
    description:
      'Maps primary end-to-end user journeys using valid payloads, confirming that core business transactions, status transitions, and database records complete cleanly.',
    exampleCheck: 'Valid multi-step workflow submission -> HTTP 200/201 -> UI confirmation state -> SQL row verified.',
  },
  {
    id: 'negative',
    code: 'VEC-02',
    title: 'Negative & Fault Injection',
    color: '#FF4D29',
    description:
      'Deliberately supplies malformed inputs, unauthorized tokens, missing required fields, and invalid state transitions to verify graceful error handling and prevent silent crashes.',
    exampleCheck: 'Expired auth token or invalid payload -> HTTP 401/422 -> Descriptive validation message -> Zero corrupt DB writes.',
  },
  {
    id: 'boundary',
    code: 'VEC-03',
    title: 'Boundary Value Analysis',
    color: '#F59E0B',
    description:
      'Tests exact lower/upper numeric limits, string length thresholds, date-time cutoffs, and pagination edges where off-by-one defects and pricing inaccuracies hide.',
    exampleCheck: 'Min/Max character lengths, zero/negative quantities, overlapping schedule timestamps -> Strict constraint enforcement.',
  },
  {
    id: 'alternative',
    code: 'VEC-04',
    title: 'Alternative & Interrupt Flows',
    color: '#F4F4F0',
    description:
      'Explores non-linear user behavior: mid-flow cancellation, browser back/refresh actions, role switching, and concurrent state modifications across platforms.',
    exampleCheck: 'User modifies selection mid-checkout or switches platform session -> Idempotent state recovery without duplicate records.',
  },
];

export const CAPABILITY_DOMAINS: CapabilityDomain[] = [
  {
    id: 'quality-engineering',
    index: '01',
    title: 'QUALITY ENGINEERING',
    shortTitle: 'Quality Eng',
    subtitle: 'Exploratory Discovery & Multi-Platform Verification',
    color: '#10B981',
    orbitAngle: 0,
    orbitRadius: 2.85,
    orbitHeight: 0.9,
    description:
      'Driven by independent application exploration rather than passive reliance on predefined scripts. Builds a complete mental model of module interactions across Web, PWA, Android, and iOS prior to test execution.',
    architecturalSummary:
      'Combines unscripted exploratory investigation with structured functional, boundary, negative, integration, and regression matrices to isolate defects before production release.',
    skills: [
      {
        name: 'Manual Testing',
        role: 'Human-driven behavioral verification',
        architectureNote:
          'Executes comprehensive scenario matrices across Web, PWA, Android, and iOS interfaces to validate usability, visual fidelity, and real-world user flows.',
      },
      {
        name: 'Exploratory Testing',
        role: 'Unscripted workflow investigation',
        architectureNote:
          'Simultaneous learning, test design, and execution—mapping undocumented module interactions, state transitions, and edge-case failure modes.',
      },
      {
        name: 'Functional Testing',
        role: 'Business logic & specification validation',
        architectureNote:
          'Verifies every application feature against functional expectations across positive, negative, boundary, and alternative execution paths.',
      },
      {
        name: 'Regression Testing',
        role: 'Release stability & change-impact guardrails',
        architectureNote:
          'Assesses downstream impact of bug fixes, backend updates, and UI enhancements to ensure new deployments never break established functionality.',
      },
      {
        name: 'Smoke Testing',
        role: 'Build readiness & critical-path gatekeeping',
        architectureNote:
          'Rapid verification of core authentication, navigation, API health, and primary transaction flows immediately following build deployment.',
      },
      {
        name: 'Integration Testing',
        role: 'Inter-module & service contract verification',
        architectureNote:
          'Validates data handoffs between frontend UI components, REST API endpoints, third-party services, and relational database layers.',
      },
      {
        name: 'End-to-End Testing',
        role: 'Complete multi-actor journey validation',
        architectureNote:
          'Traces full user lifecycles from initial onboarding and search through scheduling, approval workflows, and final status completion.',
      },
      {
        name: 'Negative Testing',
        role: 'Resilience & exception path verification',
        architectureNote:
          'Challenges system boundaries with invalid inputs, unauthorized actions, and unexpected sequences to confirm controlled error recovery.',
      },
      {
        name: 'Boundary Testing',
        role: 'Threshold & edge-value verification',
        architectureNote:
          'Validates exact min/max boundaries, pricing calculations, schedule cutoffs, and input limits where off-by-one defects occur.',
      },
      {
        name: 'UI Testing',
        role: 'Interface state & visual interaction validation',
        architectureNote:
          'Verifies responsive component layouts, interactive modals, form states, and cross-viewport visual consistency.',
      },
      {
        name: 'System Testing',
        role: 'Integrated whole-system validation',
        architectureNote:
          'Evaluates the complete, integrated software system across frontend, backend API, and database layers against functional expectations.',
      },
      {
        name: 'Retesting',
        role: 'Targeted defect-fix verification',
        architectureNote:
          'Re-executes exact failure reproduction steps after developer fixes to confirm root-cause resolution before regression sweeps.',
      },
      {
        name: 'Cross-Platform Testing',
        role: 'Web, PWA, Android & iOS behavioral parity',
        architectureNote:
          'Ensures identical workflow behavior, status transitions, and data synchronization across Web, PWA, Android, and iOS builds.',
      },
    ],
  },
  {
    id: 'test-automation',
    index: '02',
    title: 'TEST AUTOMATION',
    shortTitle: 'Automation',
    subtitle: 'Java, Selenium WebDriver, TestNG & Playwright Architecture',
    color: '#FF4D29',
    orbitAngle: Math.PI / 3,
    orbitRadius: 2.95,
    orbitHeight: 0.35,
    description:
      'Develops maintainable, assertion-driven browser automation suites grounded in real application behavior using Java, Selenium WebDriver, TestNG, and Playwright with Java.',
    architecturalSummary:
      'Structured around the Page Object Model (POM), Maven dependency lifecycle, Git version control, and deterministic explicit waits to minimize flakiness in regression suites.',
    skills: [
      {
        name: 'Java',
        role: 'Primary automation & backend language',
        architectureNote:
          'Strongly-typed object-oriented foundation utilizing Java Collections, Streams, exception handling, and reusable utility abstractions for test frameworks.',
        docUrl: 'https://docs.oracle.com/en/java/',
        docLabel: 'Oracle Java Docs',
      },
      {
        name: 'Selenium WebDriver',
        role: 'W3C WebDriver browser automation',
        architectureNote:
          'Automates end-to-end web and PWA workflows via the W3C WebDriver protocol with resilient CSS/XPath locators and WebDriverWait synchronization.',
        docUrl: 'https://www.selenium.dev/documentation/webdriver/',
        docLabel: 'Selenium WebDriver Docs',
      },
      {
        name: 'TestNG',
        role: 'Test orchestration & assertion runner',
        architectureNote:
          'Manages suite execution via testng.xml, lifecycle annotations (@BeforeMethod, @Test, @AfterMethod), DataProviders, and hard/soft assertions.',
        docUrl: 'https://testng.org/',
        docLabel: 'TestNG Official Docs',
      },
      {
        name: 'Playwright with Java',
        role: 'Modern CDP automation with AI workflows',
        architectureNote:
          'Implements fast, isolated BrowserContext automation with built-in auto-waiting and strict locators, accelerated through AI-assisted development workflows.',
        docUrl: 'https://playwright.dev/java/docs/intro',
        docLabel: 'Playwright Java Docs',
      },
      {
        name: 'Maven',
        role: 'Build lifecycle & dependency management',
        architectureNote:
          'Configures pom.xml dependencies (Selenium, TestNG, Playwright) and standardized test compilation/execution lifecycles.',
        docUrl: 'https://maven.apache.org/guides/',
        docLabel: 'Apache Maven Guides',
      },
      {
        name: 'Git',
        role: 'Distributed version control & collaboration',
        architectureNote:
          'Tracks automation script evolution, feature branch reviews, and synchronized code contributions across QA and engineering teams.',
        docUrl: 'https://git-scm.com/doc',
        docLabel: 'Git Reference Docs',
      },
      {
        name: 'Page Object Model',
        role: 'Decoupled UI locator & action design pattern',
        architectureNote:
          'Encapsulates page-specific WebElements and interaction methods separately from TestNG assertion classes for clean maintenance.',
        docUrl: 'https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/',
        docLabel: 'Selenium POM Pattern',
      },
      {
        name: 'Automation Framework Development',
        role: 'Reusable regression suite engineering',
        architectureNote:
          'Combines base driver factories, configuration readers, synchronization utilities, and failure investigation logs into cohesive regression suites.',
      },
      {
        name: 'Assertions & Regression Automation',
        role: 'Deterministic state & release verification',
        architectureNote:
          'Implements hard and soft TestNG/Playwright assertions across automated regression scripts to detect behavioral regressions immediately.',
      },
    ],
  },
  {
    id: 'api-data-validation',
    index: '03',
    title: 'API AND DATA VALIDATION',
    shortTitle: 'API & SQL',
    subtitle: 'REST Contracts, HTTP Payloads & Relational Integrity',
    color: '#F59E0B',
    orbitAngle: (2 * Math.PI) / 3,
    orbitRadius: 2.85,
    orbitHeight: -0.45,
    description:
      'Verifies the critical data layer beneath the UI—validating RESTful API endpoints in Postman and executing SQL queries to guarantee database consistency.',
    architecturalSummary:
      'Inspects request/response headers, JSON schemas, HTTP status semantics, CRUD state mutations, and relational foreign-key constraints.',
    skills: [
      {
        name: 'Postman',
        role: 'API request construction & collection testing',
        architectureNote:
          'Executes parameterized REST requests, environment token workflows, and response payload inspections across staging and development APIs.',
        docUrl: 'https://learning.postman.com/docs/introduction/overview/',
        docLabel: 'Postman Learning Center',
      },
      {
        name: 'REST APIs',
        role: 'Stateless client-server contract validation',
        architectureNote:
          'Tests GET, POST, PUT, PATCH, and DELETE endpoints for authentication enforcement, query filtering, pagination, and error payload structure.',
        docUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods',
        docLabel: 'MDN HTTP Methods',
      },
      {
        name: 'CRUD Validation',
        role: 'Create, Read, Update, Delete lifecycle checks',
        architectureNote:
          'Verifies that entity creation, updates, and deletions via API or UI reflect accurately across subsequent GET reads and database tables.',
      },
      {
        name: 'HTTP Status Codes',
        role: 'Semantic protocol response verification',
        architectureNote:
          'Validates accurate status codes across nominal (200, 201, 204), client validation (400, 401, 403, 404, 422), and server fault (500) scenarios.',
        docUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status',
        docLabel: 'MDN HTTP Status Codes',
      },
      {
        name: 'JSON Validation',
        role: 'Payload schema & data-type verification',
        architectureNote:
          'Inspects nested JSON objects, arrays, mandatory keys, nullability, and data formatting returned by backend controllers.',
        docUrl: 'https://json-schema.org/specification',
        docLabel: 'JSON Schema Spec',
      },
      {
        name: 'SQL',
        role: 'Relational database querying & verification',
        architectureNote:
          'Writes SELECT, JOIN, WHERE, and aggregate queries to verify backend state persistence, status codes, and transaction records directly in the database.',
      },
      {
        name: 'Data Integrity',
        role: 'Cross-layer state consistency assurance',
        architectureNote:
          'Confirms zero discrepancy between frontend UI display, REST API JSON payload, and underlying relational database rows.',
      },
    ],
  },
  {
    id: 'software-development',
    index: '04',
    title: 'SOFTWARE DEVELOPMENT',
    shortTitle: 'Full-Stack Dev',
    subtitle: 'PHP/Laravel, Ionic PWA & Java/Spring Boot Foundations',
    color: '#38BDF8',
    orbitAngle: Math.PI,
    orbitRadius: 2.95,
    orbitHeight: -0.85,
    description:
      'Leverages deep product and workflow knowledge to expand beyond traditional QA—contributing directly to backend, PWA, and mobile application development.',
    architecturalSummary:
      'Combines practical PHP/Laravel and Ionic implementation with foundational Java, Spring Boot, Hibernate/JPA, and REST API development knowledge.',
    skills: [
      {
        name: 'PHP',
        role: 'Server-side backend scripting',
        architectureNote:
          'Implements backend business logic, request data processing, and controller actions within enterprise web applications.',
        docUrl: 'https://www.php.net/docs.php',
        docLabel: 'PHP Official Manual',
      },
      {
        name: 'Laravel',
        role: 'MVC backend framework & Eloquent ORM',
        architectureNote:
          'Contributes to routes, controllers, Eloquent models, validation rules, and API responses while preventing regressions against existing behavior.',
        docUrl: 'https://laravel.com/docs',
        docLabel: 'Laravel Documentation',
      },
      {
        name: 'Ionic',
        role: 'Cross-platform PWA & mobile UI framework',
        architectureNote:
          'Builds and refines responsive PWA and hybrid mobile UI components, modal workflows, and API integration layers.',
        docUrl: 'https://ionicframework.com/docs',
        docLabel: 'Ionic Framework Docs',
      },
      {
        name: 'Java',
        role: 'Object-oriented application programming',
        architectureNote:
          'Core language used across both enterprise backend services and automated verification frameworks.',
        docUrl: 'https://docs.oracle.com/en/java/',
        docLabel: 'Oracle Java Docs',
      },
      {
        name: 'Spring Boot',
        role: 'Java enterprise microservice & REST framework',
        architectureNote:
          'Structured around Dependency Injection, @RestController endpoints, service layers, and auto-configured application contexts.',
        docUrl: 'https://docs.spring.io/spring-boot/index.html',
        docLabel: 'Spring Boot Reference',
      },
      {
        name: 'Hibernate/JPA',
        role: 'Object-Relational Mapping (ORM) persistence',
        architectureNote:
          'Maps Java domain entities (@Entity) to relational database tables using Jakarta Persistence API repositories and transactional boundaries.',
        docUrl: 'https://hibernate.org/orm/documentation/',
        docLabel: 'Hibernate ORM Docs',
      },
      {
        name: 'REST API Development',
        role: 'Endpoint design & JSON serialization',
        architectureNote:
          'Implements clean request validation, structured JSON responses, and proper HTTP status handling across backend controllers.',
      },
    ],
  },
  {
    id: 'ai-assisted-development',
    index: '05',
    title: 'AI-ASSISTED DEVELOPMENT',
    shortTitle: 'AI Engineering',
    subtitle: 'Agentic Code Synthesis with Human QA Verification',
    color: '#A78BFA',
    orbitAngle: (4 * Math.PI) / 3,
    orbitRadius: 2.85,
    orbitHeight: -0.35,
    description:
      'Integrates modern AI coding agents into daily software engineering and QA workflows—pairing rapid AI implementation with rigorous human verification.',
    architecturalSummary:
      'Uses OpenAI Codex, Antigravity, Cursor, and Claude to accelerate backend logic, UI improvements, and Playwright/Selenium automation while preventing regressions.',
    skills: [
      {
        name: 'OpenAI Codex',
        role: 'AI code synthesis & refactoring engine',
        architectureNote:
          'Utilized to scaffold backend logic, functional updates, and automated test scripts grounded in explored application context.',
        docUrl: 'https://platform.openai.com/docs',
        docLabel: 'OpenAI Platform Docs',
      },
      {
        name: 'Antigravity',
        role: 'Agentic full-stack & QA workflow orchestration',
        architectureNote:
          'Employed for multi-file codebase exploration, PHP/Laravel and Ionic feature implementation, and end-to-end validation workflows.',
      },
      {
        name: 'Cursor',
        role: 'Context-aware AI IDE engineering',
        architectureNote:
          'Accelerates inline code completions, multi-file refactoring, locator hardening, and debugging across Java and web repositories.',
        docUrl: 'https://docs.cursor.com',
        docLabel: 'Cursor Documentation',
      },
      {
        name: 'Claude',
        role: 'Architectural reasoning & edge-case analysis',
        architectureNote:
          'Assists in analyzing complex workflow logic, deriving negative/boundary test scenarios, and reviewing code diffs for potential regressions.',
        docUrl: 'https://docs.anthropic.com',
        docLabel: 'Anthropic Claude Docs',
      },
    ],
  },
  {
    id: 'qa-processes',
    index: '06',
    title: 'QA PROCESSES',
    shortTitle: 'QA Governance',
    subtitle: 'STLC, SDLC, Agile/Scrum, Defect Lifecycle & Release Sign-Off',
    color: '#F4F4F0',
    orbitAngle: (5 * Math.PI) / 3,
    orbitRadius: 2.95,
    orbitHeight: 0.45,
    description:
      'Applies structured software quality governance across the full engineering lifecycle—from initial requirement traceability to client progress coordination and release validation.',
    architecturalSummary:
      'Ensures every explored workflow is backed by traceable scenarios, reproducible Jira defect reports, and systematic pre-release regression gates.',
    skills: [
      {
        name: 'STLC',
        role: 'Software Testing Life Cycle governance',
        architectureNote:
          'Executes requirement analysis, test planning, scenario derivation, environment setup, execution, and cycle closure.',
      },
      {
        name: 'SDLC',
        role: 'Software Development Life Cycle alignment',
        architectureNote:
          'Embeds quality verification early in development phases so defects are caught during implementation rather than post-release.',
      },
      {
        name: 'Agile/Scrum',
        role: 'Iterative sprint delivery & collaboration',
        architectureNote:
          'Aligns testing and AI-assisted development tasks with sprint increments, daily progress updates, and rapid feedback loops.',
      },
      {
        name: 'Jira',
        role: 'Defect tracking & issue lifecycle management',
        architectureNote:
          'Logs detailed defects with clear reproduction steps, environment metadata, expected vs. actual behavior, and visual/log evidence.',
        docUrl: 'https://www.atlassian.com/software/jira',
        docLabel: 'Atlassian Jira',
      },
      {
        name: 'Defect Lifecycle',
        role: 'End-to-end bug triage, tracking & retesting',
        architectureNote:
          'Manages issues from discovery and root-cause isolation through developer fix verification, retesting, and regression closure.',
      },
      {
        name: 'Test Scenarios',
        role: 'High-level workflow coverage mapping',
        architectureNote:
          'Derives positive, negative, boundary, and alternative test scenarios directly from independent hands-on application exploration.',
      },
      {
        name: 'Test Cases',
        role: 'Step-by-step deterministic verification specs',
        architectureNote:
          'Documents preconditions, test data, execution steps, and expected post-conditions for repeatable manual and automated validation.',
      },
      {
        name: 'RTM',
        role: 'Requirement Traceability Matrix',
        architectureNote:
          'Maps business requirements and user stories directly to corresponding test scenarios and automation scripts to ensure complete coverage.',
      },
      {
        name: 'Release Validation',
        role: 'Production deployment readiness sign-off',
        architectureNote:
          'Coordinates final smoke, regression, and cross-platform checks alongside client communication to support confident software releases.',
      },
    ],
  },
];

export const AUTOMATION_WORKFLOWS: AutomationWorkflow[] = [
  {
    id: 'selenium-testng-pom',
    title: 'Java + Selenium WebDriver + TestNG Suite',
    badge: 'W3C WEBDRIVER // POM ARCHITECTURE',
    stack: ['Java', 'Selenium WebDriver', 'TestNG', 'Maven', 'Page Object Model', 'Explicit Waits'],
    summary:
      'Conceptual visualization of how explored end-to-end web and PWA user flows are engineered into modular Page Object Model classes and TestNG assertion suites.',
    officialDocUrl: 'https://www.selenium.dev/documentation/webdriver/',
    officialDocLabel: 'Selenium W3C WebDriver Docs',
    codeLanguage: 'java',
    codeSnippet: `public class WorkflowVerificationTest extends BaseSuiteSetup {

    @Test(groups = {"regression", "web"}, description = "Verify end-to-end search & scheduling flow")
    public void verifyExploredSchedulingWorkflow() {
        SearchPortalPage portal = new SearchPortalPage(driver, wait);
        portal.selectLocationFilter("Nagpur_Zone_A")
              .submitEnquiryWithAssistant("Schedule property inspection slot");

        ScheduleConfirmationModal modal = portal.confirmPreferredSlot("10:30_AM");

        Assert.assertTrue(modal.isConfirmationBannerDisplayed(),
            "Expected scheduling confirmation banner after valid slot submission.");
        Assert.assertEquals(modal.getTransitionStatus(), "SCHEDULED_VERIFIED",
            "Workflow status transition mismatch in UI state.");
    }
}`,
    telemetryPayload: `{
  "protocol": "W3C WebDriver HTTP/JSON",
  "sessionCapabilities": { "browserName": "chrome", "pageLoadStrategy": "normal" },
  "synchronization": "WebDriverWait (ExpectedConditions.visibilityOfElementLocated)",
  "designPattern": "Page Object Model (Encapsulated Locators + TestNG Assertions)",
  "suiteRunner": "Maven Surefire -> testng.xml"
}`,
    stages: [
      {
        step: '01',
        title: 'Exploratory Workflow Mapping',
        protocol: 'HUMAN EXPLORATION -> DOM INSPECTION',
        verificationGate: 'Locator Resilience Gate',
        nominalDetail:
          'Independently explores the target web/PWA workflow first—identifying stable semantic attributes and dynamic state transitions before writing code.',
        defectDetail:
          'Detects brittle auto-generated DOM classes that shift across builds; replaces them with stable data attributes and structural XPath/CSS axes.',
        assertionCheck: 'All interactive elements mapped to encapsulated Page Object methods.',
      },
      {
        step: '02',
        title: 'W3C WebDriver Session & POM Binding',
        protocol: 'MAVEN -> TESTNG @BeforeMethod -> WEBDRIVER',
        verificationGate: 'Session Initialization Gate',
        nominalDetail:
          'Initializes a clean browser session via TestNG lifecycle hooks and binds Page Object classes with deterministic WebDriverWait instances.',
        defectDetail:
          'Isolates stale element reference risks (StaleElementReferenceException) during asynchronous modal re-renders by re-querying through explicit wait conditions.',
        assertionCheck: 'Driver session active; page readiness verified prior to interaction.',
      },
      {
        step: '03',
        title: 'Multi-Step Action & Synchronization',
        protocol: 'WEBDRIVER ELEMENT COMMANDS + EXPLICIT WAITS',
        verificationGate: 'Async State Synchronization',
        nominalDetail:
          'Executes multi-step user actions (filter selection, enquiry input, slot scheduling) while polling DOM visibility and clickability preconditions.',
        defectDetail:
          'Captures race condition where submit action fires before async validation completes—revealing a missing disabled-state guard on the UI button.',
        assertionCheck: 'ExpectedConditions.elementToBeClickable satisfied before dispatch.',
      },
      {
        step: '04',
        title: 'TestNG Assertion & Regression Report',
        protocol: 'TESTNG ASSERT -> JIRA EVIDENCE LOG',
        verificationGate: 'Deterministic Assertion Gate',
        nominalDetail:
          'Executes TestNG assertions validating confirmation banners, status badges, and URL routing; marks regression suite green.',
        defectDetail:
          'Assertion failure flags unexpected status transition; captures exact reproduction steps, DOM state, and stack trace for Jira defect logging.',
        assertionCheck: 'Assert.assertEquals(actualStatus, "SCHEDULED_VERIFIED") -> PASS',
      },
    ],
    defectScenario: {
      symptom: 'Intermittent TimeoutException & duplicate submission during rapid schedule confirmation clicks.',
      rootCause:
        'Asynchronous backend validation allowed a second click before the modal state transitioned to a locked submitting state.',
      resolution:
        'Logged reproducible defect in Jira with video/log evidence; verified UI button lock fix and updated TestNG regression assertion.',
    },
  },
  {
    id: 'playwright-java-ai',
    title: 'Playwright with Java (AI-Assisted Workflow)',
    badge: 'CDP WEBSOCKET // BROWSER CONTEXT ISOLATION',
    stack: ['Playwright (Java)', 'BrowserContext', 'Auto-Waiting', 'AI Coding Tools', 'Assertions'],
    summary:
      'Conceptual visualization of modern Playwright automation with Java—combining isolated BrowserContext sessions and auto-waiting locators with AI-assisted script authoring and human review.',
    officialDocUrl: 'https://playwright.dev/java/docs/intro',
    officialDocLabel: 'Playwright for Java Docs',
    codeLanguage: 'java',
    codeSnippet: `try (Playwright playwright = Playwright.create()) {
    Browser browser = playwright.chromium().launch();
    BrowserContext sellerCtx = browser.newContext();
    BrowserContext renterCtx = browser.newContext();

    Page sellerPage = sellerCtx.newPage();
    Page renterPage = renterCtx.newPage();

    // Multi-actor workflow verification across isolated contexts
    renterPage.navigate("https://app-staging.internal/listings");
    renterPage.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Request Rental")).click();
    assertThat(renterPage.locator("[data-status='PENDING_APPROVAL']")).isVisible();

    sellerPage.navigate("https://app-staging.internal/requests");
    sellerPage.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Approve Request")).click();
    assertThat(renterPage.locator("[data-status='APPROVED_READY']")).isVisible();
}`,
    telemetryPayload: `{
  "transport": "Bi-directional WebSocket / Chrome DevTools Protocol (CDP)",
  "isolation": "Dual hermetic BrowserContext instances (Multi-Role Simulation)",
  "actionability": "Built-in Auto-Wait (Attached, Visible, Stable, Enabled)",
  "aiWorkflow": "Scaffolded via AI Coding Agent -> Audited & Hardened by Human QA"
}`,
    stages: [
      {
        step: '01',
        title: 'Multi-Role Context Provisioning',
        protocol: 'PLAYWRIGHT.CREATE() -> BROWSER.NEWCONTEXT()',
        verificationGate: 'Hermetic Session Isolation',
        nominalDetail:
          'Spawns independent BrowserContext instances within a single browser process to simulate concurrent multi-role interactions (e.g., requester and approver).',
        defectDetail:
          'Detects cross-session state leakage when shared localStorage keys are mutated without tenant scoping.',
        assertionCheck: 'Isolated cookie and storage sandboxes initialized.',
      },
      {
        step: '02',
        title: 'AI-Assisted Locator Synthesis & Audit',
        protocol: 'AI AGENT SCAFFOLD -> HUMAN LOCATOR REVIEW',
        verificationGate: 'Human-in-the-Loop Code Audit',
        nominalDetail:
          'Uses AI coding tools to rapidly scaffold Playwright Java boilerplate from explored user stories, then manually audits locators for role/semantic resilience.',
        defectDetail:
          'Rejects AI-suggested positional nth-child selectors and replaces them with strict AriaRole and explicit state locators.',
        assertionCheck: 'Zero brittle selectors; all locators verified against live DOM.',
      },
      {
        step: '03',
        title: 'Auto-Waiting Actionability Execution',
        protocol: 'CDP ACTIONABILITY CHECKS -> DOM DISPATCH',
        verificationGate: 'Actionability Preconditions',
        nominalDetail:
          'Playwright automatically verifies elements are attached, visible, stable, and enabled before executing clicks or form fills—eliminating arbitrary Thread.sleep calls.',
        defectDetail:
          'Identifies overlay backdrop intercepting pointer events on mobile viewport breakpoints.',
        assertionCheck: 'Pointer event dispatched cleanly after layout stability check.',
      },
      {
        step: '04',
        title: 'Cross-Context State Transition Verification',
        protocol: 'PLAYWRIGHT ASSERTTHAT() -> STATE SYNC',
        verificationGate: 'End-to-End State Parity',
        nominalDetail:
          'Verifies that an approval action in the primary actor context accurately updates status badges across the secondary actor context.',
        defectDetail:
          'Flags stale UI badge that required a manual page refresh due to missing state re-fetch trigger.',
        assertionCheck: 'assertThat(locator("[data-status=\'APPROVED_READY\']")).isVisible()',
      },
    ],
    defectScenario: {
      symptom: 'Status transition updated in database but secondary user view remained stuck on PENDING state.',
      rootCause:
        'Frontend state store cached the initial response without re-fetching after status mutation.',
      resolution:
        'Documented cross-role reproduction flow; verified reactive state re-fetch fix across Web and PWA builds.',
    },
  },
  {
    id: 'api-sql-integrity',
    title: 'REST API + SQL CRUD & Data Integrity Pipeline',
    badge: 'POSTMAN // HTTP CONTRACTS // SQL VERIFICATION',
    stack: ['Postman', 'REST APIs', 'HTTP Status Codes', 'JSON Validation', 'SQL', 'Data Integrity'],
    summary:
      'Conceptual visualization of multi-layer backend validation—combining Postman REST API testing across CRUD operations with direct SQL queries to confirm relational data integrity.',
    officialDocUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status',
    officialDocLabel: 'MDN HTTP Protocol & Status Specs',
    codeLanguage: 'sql',
    codeSnippet: `-- 1. Verify REST POST /api/v1/bookings (HTTP 201 Created) persisted accurately
SELECT 
    b.booking_reference,
    b.status_code,
    b.calculated_total_amount,
    s.service_tier_name,
    u.account_state
FROM service_bookings b
INNER JOIN catalog_services s ON b.service_id = s.id
INNER JOIN client_accounts u ON b.user_id = u.id
WHERE b.booking_reference = 'BK-2026-8841'
  AND b.is_deleted = 0;

-- 2. Assert zero orphaned child records after DELETE / cancellation flow
SELECT COUNT(*) AS orphaned_rows
FROM booking_status_history h
LEFT JOIN service_bookings b ON h.booking_id = b.id
WHERE b.id IS NULL;`,
    telemetryPayload: `{
  "endpoint": "POST /api/v1/bookings -> PUT /api/v1/bookings/{id}/status",
  "httpStatusContract": "201 Created | 200 OK | 400 Bad Request | 422 Unprocessable Entity",
  "jsonValidation": "Required keys, identifier format, decimal pricing precision",
  "databaseCheck": "SQL INNER/LEFT JOIN verification for foreign-key & status parity"
}`,
    stages: [
      {
        step: '01',
        title: 'REST Request & Boundary Payload Dispatch',
        protocol: 'POSTMAN -> HTTP POST / PUT / GET / DELETE',
        verificationGate: 'Payload & Auth Contract Gate',
        nominalDetail:
          'Dispatches structured REST requests in Postman covering valid CRUD payloads, missing mandatory fields, boundary numeric values, and invalid auth tokens.',
        defectDetail:
          'Uncovers endpoint accepting negative pricing/quantity parameters without server-side validation when UI constraints are bypassed.',
        assertionCheck: 'Valid requests return 200/201; malformed payloads rejected with 400/422.',
      },
      {
        step: '02',
        title: 'HTTP Status & Error Contract Verification',
        protocol: 'HTTP RESPONSE HEADERS & STATUS SEMANTICS',
        verificationGate: 'Protocol Semantics Gate',
        nominalDetail:
          'Verifies that endpoints return semantic HTTP status codes rather than masking server exceptions inside HTTP 200 responses.',
        defectDetail:
          'Catches unhandled null-reference exception returning a raw 500 stack trace on optional filter parameters.',
        assertionCheck: 'Status code strictly matches REST specification contract.',
      },
      {
        step: '03',
        title: 'JSON Schema & Precision Validation',
        protocol: 'JSON PAYLOAD STRUCTURE & TYPE ASSERTION',
        verificationGate: 'Schema & Type Gate',
        nominalDetail:
          'Validates response JSON keys, booking identifiers, status enum strings, timestamp formats, and pricing calculation accuracy.',
        defectDetail:
          'Identifies floating-point rounding drift in discount calculation between API response and checkout summary.',
        assertionCheck: 'All JSON fields conform to expected types and domain constraints.',
      },
      {
        step: '04',
        title: 'SQL Relational & Referential Integrity Check',
        protocol: 'SQL SELECT / JOIN -> DATA INTEGRITY AUDIT',
        verificationGate: 'Database Persistence Gate',
        nominalDetail:
          'Executes SQL queries across primary and joined tables to confirm CRUD mutations, status transitions, and foreign-key constraints match API and UI states.',
        defectDetail:
          'Detects orphaned child records remaining in history table after parent record deletion.',
        assertionCheck: 'Zero orphaned rows; 100% parity between DB state, API JSON, and UI.',
      },
    ],
    defectScenario: {
      symptom: 'API returned HTTP 200 OK on status update, but subsequent reload reverted to previous status.',
      rootCause:
        'Backend controller mutated the in-memory model attribute but omitted the transactional save/commit call on a conditional branch.',
      resolution:
        'Confirmed missing persistence via SQL SELECT query; reported exact endpoint payload and verified fix across API and UI.',
    },
  },
  {
    id: 'cross-platform-regression',
    title: 'Cross-Platform Regression & Defect Investigation',
    badge: 'WEB // PWA // ANDROID // iOS PARITY',
    stack: ['Web', 'PWA', 'Android', 'iOS', 'Boundary Testing', 'Jira Defect Lifecycle', 'Retesting'],
    summary:
      'Conceptual visualization of cross-platform quality assurance—verifying behavioral consistency, status transitions, and regression safety across Web, PWA, Android, and iOS builds.',
    officialDocUrl: 'https://ionicframework.com/docs',
    officialDocLabel: 'Cross-Platform PWA & Mobile Docs',
    codeLanguage: 'json',
    codeSnippet: `{
  "verificationMatrix": "Cross-Platform Release Gate",
  "platformsTested": ["Web Browser", "Ionic PWA", "Android Build", "iOS Build"],
  "scenarioCoverage": [
    "Positive end-to-end journey completion",
    "Negative input & unauthorized role access",
    "Boundary value checks (pricing, dates, character limits)",
    "Cross-platform state synchronization (Create on Mobile -> Verify on Web)"
  ],
  "defectLifecycle": {
    "tracker": "Jira",
    "evidenceIncluded": ["Step-by-step reproduction", "Platform/OS build tag", "API/Console logs"],
    "closureCriteria": "Fix Retested + Downstream Regression Suite Verified"
  }
}`,
    telemetryPayload: `{
  "coverageScope": "Functional, UI, Integration, System, Smoke, Regression, Retesting",
  "platformTargets": "Web | Progressive Web App (PWA) | Android | iOS",
  "defectGovernance": "Root-Cause Isolation -> Jira Documentation -> Fix Verification -> Regression Assessment"
}`,
    stages: [
      {
        step: '01',
        title: 'Multi-Platform Journey Synchronization',
        protocol: 'WEB <-> PWA <-> ANDROID <-> iOS',
        verificationGate: 'Cross-Platform State Parity',
        nominalDetail:
          'Executes core user journeys across Web, PWA, Android, and iOS builds to verify that bookings, listings, and case workflows behave identically on every client.',
        defectDetail:
          'Identifies status transition badge updating on Web but failing to render on iOS/Android mobile viewports due to conditional CSS/template binding.',
        assertionCheck: 'State transitions verified across all four client platforms.',
      },
      {
        step: '02',
        title: 'Boundary, Negative & Edge-Case Probing',
        protocol: 'BOUNDARY + NEGATIVE + ALTERNATIVE SCENARIOS',
        verificationGate: 'Edge-Case Resilience Gate',
        nominalDetail:
          'Challenges forms, scheduling calendars, and pricing calculators with boundary values, empty states, and rapid navigation interrupts.',
        defectDetail:
          'Uncovers pricing calculation mismatch when user switches service tier back and forth before confirming booking.',
        assertionCheck: 'Pricing, identifiers, and status transitions remain deterministic.',
      },
      {
        step: '03',
        title: 'Root-Cause Investigation & Jira Logging',
        protocol: 'DEVTOOLS / LOGS / API TRACE -> JIRA ISSUE',
        verificationGate: 'Reproducible Evidence Gate',
        nominalDetail:
          'Investigates whether a failure stems from UI rendering, API payload mismatch, or test locator drift before logging a structured defect in Jira.',
        defectDetail:
          'Attaches exact reproduction steps, environment build details, network response payload, and screen recording so developers can resolve without guesswork.',
        assertionCheck: 'High-clarity Jira ticket logged with deterministic reproduction path.',
      },
      {
        step: '04',
        title: 'Fix Retesting & Regression Impact Sign-Off',
        protocol: 'RETESTING + REGRESSION SUITE EXECUTION',
        verificationGate: 'Release Validation Gate',
        nominalDetail:
          'Retests resolved defects on the target platform and executes surrounding regression checks to ensure the fix introduces zero side effects.',
        defectDetail:
          'Catches regression where a fix for mobile modal scrolling inadvertently hid the footer action bar on smaller viewports.',
        assertionCheck: 'Fix verified; zero regression impact across dependent modules.',
      },
    ],
    defectScenario: {
      symptom: 'Multi-step mobile booking flow retained stale pricing after changing location and service tier.',
      rootCause:
        'State reset handler cleared the service ID on location change but preserved the cached subtotal from the previous selection.',
      resolution:
        'Isolated exact sequence through exploratory boundary testing; verified fix across Android and iOS builds via full regression pass.',
    },
  },
];

export const AI_AGENT_TOOLS: AiAgentTool[] = [
  {
    name: 'OpenAI Codex',
    category: 'Code Synthesis & Refactoring Engine',
    primaryUse:
      'Accelerates implementation of PHP/Laravel backend logic, Ionic PWA components, and Java automation utilities based on explored workflow specifications.',
    humanVerificationGate:
      'Every synthesized function is audited against existing controller contracts, SQL constraints, and negative/boundary test scenarios before merge.',
    capabilities: [
      'Backend controller & service logic scaffolding',
      'Automated test helper & data-provider generation',
      'Refactoring repetitive validation patterns',
    ],
    docUrl: 'https://platform.openai.com/docs',
  },
  {
    name: 'Antigravity',
    category: 'Agentic Full-Stack & QA Orchestration',
    primaryUse:
      'Supports multi-file codebase exploration, cross-layer feature implementation across PHP/Laravel and Ionic, and end-to-end verification workflows.',
    humanVerificationGate:
      'Human engineer directs architectural scope, validates cross-module side effects, and executes manual + automated regression checks on every change.',
    capabilities: [
      'Cross-file repository exploration & dependency tracing',
      'Full-stack feature updates across backend & PWA layers',
      'Structured verification & regression impact checks',
    ],
  },
  {
    name: 'Cursor',
    category: 'Context-Aware AI IDE Workbench',
    primaryUse:
      'Enables rapid inline code authoring, Playwright/Selenium locator refactoring, and context-indexed debugging across Java and web codebases.',
    humanVerificationGate:
      'Inline diffs are inspected line-by-line to prevent brittle DOM locators, unhandled null states, or unintended state mutations.',
    capabilities: [
      'Multi-file context indexing & rapid navigation',
      'Playwright Java & Selenium POM class authoring',
      'UI layout & responsive component refinements',
    ],
    docUrl: 'https://docs.cursor.com',
  },
  {
    name: 'Claude',
    category: 'Architectural Reasoning & Edge-Case Analysis',
    primaryUse:
      'Assists in analyzing complex application workflows, deriving exhaustive negative and boundary test scenarios, and reviewing code changes for regression risks.',
    humanVerificationGate:
      'All proposed scenarios and code suggestions are grounded in real application exploration and verified against live staging environments.',
    capabilities: [
      'Deep edge-case & boundary scenario derivation',
      'Root-cause analysis of complex stack traces & API payloads',
      'Pre-release regression risk evaluation',
    ],
    docUrl: 'https://docs.anthropic.com',
  },
];

export const AI_WORKFLOW_STAGES: AiWorkflowStage[] = [
  {
    id: 'explore-context',
    step: 'STAGE 01',
    title: 'Independent Human Exploration & Codebase Mapping',
    actor: 'HUMAN ENGINEER',
    summary:
      'Before invoking any AI coding tool, I independently explore the live application and inspect the repository to understand real module interactions, data models, and expected behavior.',
    verificationAction:
      'Maps end-to-end user journeys, existing API contracts, and database schemas so AI prompts are grounded in real system architecture rather than assumptions.',
    rawAiSnippet: `// Unbounded prompt without exploration context (AVOIDED):
// "Fix the status update bug and write a test for it."
// Risk: AI guesses table names, invents endpoints, or breaks downstream status listeners.`,
    humanVerifiedSnippet: `// Context-grounded engineering brief prepared after human exploration:
// Target: StatusTransitionController (PHP/Laravel) + Ionic StatusModal
// Constraint: Preserve existing 'PENDING' -> 'APPROVED' webhook dispatch
// Validation: Verify HTTP 200 JSON contract + SQL status_history audit row`,
    reviewAuditNote:
      'Human exploration prevents AI hallucinations by supplying exact domain constraints and regression boundaries upfront.',
  },
  {
    id: 'ai-implementation',
    step: 'STAGE 02',
    title: 'AI-Assisted Feature & UI Implementation',
    actor: 'HYBRID COLLABORATION',
    summary:
      'Leverages OpenAI Codex, Antigravity, Cursor, and Claude to implement backend logic updates in PHP/Laravel, UI improvements in Ionic PWA, and mobile application refinements.',
    verificationAction:
      'Audits generated backend validation rules, Eloquent ORM queries, and Ionic UI state bindings to ensure clean error handling and responsive rendering.',
    rawAiSnippet: `// Raw AI-Generated Controller Update (Missing state transition guard)
public function updateStatus(Request $request, $id) {
    $record = WorkflowItem::findOrFail($id);
    $record->status = $request->input('status');
    $record->save();
    return response()->json($record);
}`,
    humanVerifiedSnippet: `// Human-Reviewed & Hardened Implementation (Strict validation + transaction)
public function updateStatus(UpdateStatusRequest $request, int $id): JsonResponse {
    return DB::transaction(function () use ($request, $id) {
        $record = WorkflowItem::lockForUpdate()->findOrFail($id);
        $record->assertValidTransitionTo($request->validated('status'));
        $record->update(['status' => $request->validated('status')]);
        return response()->json(['status' => 'verified', 'data' => $record], 200);
    });
}`,
    reviewAuditNote:
      'Added request validation, row locking, explicit state-transition assertion, and database transaction safety.',
  },
  {
    id: 'ai-test-synthesis',
    step: 'STAGE 03',
    title: 'AI-Assisted Playwright & Selenium Automation Authoring',
    actor: 'AI CODING AGENT',
    summary:
      'Uses AI coding tools to accelerate Playwright with Java and Selenium/TestNG script generation for newly explored or updated application workflows.',
    verificationAction:
      'Replaces brittle auto-generated selectors with deterministic Page Object locators, explicit waits, and meaningful functional assertions.',
    rawAiSnippet: `// Raw AI-Generated Test Snippet (Brittle selector & hard sleep)
page.locator("div.card > div:nth-child(3) > button").click();
Thread.sleep(3000);
assertTrue(page.url().contains("success"));`,
    humanVerifiedSnippet: `// Human-Engineered Playwright Java Verification (Semantic locator + auto-wait)
Locator confirmBtn = page.getByRole(AriaRole.BUTTON,
    new Page.GetByRoleOptions().setName("Confirm Schedule"));
confirmBtn.click();

assertThat(page.locator("[data-testid='booking-status-badge']"))
    .hasText("CONFIRMED");`,
    reviewAuditNote:
      'Eliminated arbitrary Thread.sleep(3000) and nth-child CSS path in favor of resilient role-based locators and state assertions.',
  },
  {
    id: 'human-qa-gate',
    step: 'STAGE 04',
    title: 'Human Review, API/SQL Validation & Regression Sign-Off',
    actor: 'HUMAN ENGINEER',
    summary:
      'Every AI-assisted code contribution or test script passes through a mandatory human QA gate—validating changes against existing application behavior to prevent regressions.',
    verificationAction:
      'Executes manual exploratory checks, Postman REST API validations, SQL data-integrity queries, and cross-platform regression suites across Web, PWA, Android, and iOS.',
    rawAiSnippet: `// Unverified assumption:
// "Code compiles and happy-path UI click works; ready for deployment."`,
    humanVerifiedSnippet: `// Mandatory Pre-Release Verification Checklist:
// [PASS] Positive, Negative, Boundary & Alternative UI flows (Web, PWA, Mobile)
// [PASS] Postman REST API CRUD & HTTP status code validation (200/400/422)
// [PASS] SQL database row & foreign-key integrity check
// [PASS] Downstream regression suite execution -> Zero broken workflows`,
    reviewAuditNote:
      'AI accelerates implementation speed; disciplined human QA engineering guarantees production reliability.',
  },
];

export const EXPERIENCE_DATA = {
  company: 'SKYESTONE AI TECH PRIVATE LIMITED',
  role: 'Jr. QA Engineer',
  location: 'Nagpur, Maharashtra',
  duration: '08 April 2026 – Present',
  summary:
    'Driving end-to-end quality engineering, Java-based browser automation (Selenium WebDriver, TestNG, Playwright), API/SQL verification, and practical AI-assisted full-stack development across Web, PWA, Android, and iOS platforms.',
};

export const EXPERIENCE_RESPONSIBILITIES: ExperienceResponsibility[] = [
  {
    id: 'exp-exploration',
    index: '01',
    category: 'QA & Exploration',
    title: 'Independent Application Exploration',
    description:
      'Independently explore application features, module interactions, and end-to-end user journeys to build a complete understanding of expected application behaviour prior to test execution and automation.',
    technologies: ['Exploratory Testing', 'Workflow Mapping', 'System Architecture Analysis'],
    verificationImpact: 'Establishes deep domain and behavioral understanding without relying on predefined scripts.',
  },
  {
    id: 'exp-manual-cross-platform',
    index: '02',
    category: 'QA & Exploration',
    title: 'Manual Testing Across Web, PWA & Mobile',
    description:
      'Identify positive, negative, boundary, and alternative scenarios through hands-on application exploration; execute manual functional, UI, integration, system, smoke, regression, and retesting across Web, PWA, Android, and iOS applications.',
    technologies: ['Web Testing', 'PWA Testing', 'Android Testing', 'iOS Testing', 'Boundary & Negative QA'],
    verificationImpact: 'Ensures consistent functional behavior and UI reliability across desktop and mobile platforms.',
  },
  {
    id: 'exp-selenium-testng',
    index: '03',
    category: 'Test Automation',
    title: 'Java, Selenium WebDriver & TestNG Automation',
    description:
      'Develop and maintain automation scripts and regression suites for explored workflows using Java, Selenium WebDriver, TestNG, Maven, Git, and assertions.',
    technologies: ['Java', 'Selenium WebDriver', 'TestNG', 'Maven', 'Git', 'Page Object Model', 'Assertions'],
    verificationImpact: 'Transforms critical explored user journeys into repeatable, assertion-backed regression suites.',
  },
  {
    id: 'exp-playwright-ai',
    index: '04',
    category: 'Test Automation',
    title: 'Playwright with Java Using AI Coding Tools',
    description:
      'Practical experience implementing Playwright automation with Java using AI-assisted development workflows, combining rapid script synthesis with human locator and assertion validation.',
    technologies: ['Playwright (Java)', 'BrowserContext', 'OpenAI Codex', 'Antigravity', 'Cursor', 'Claude'],
    verificationImpact: 'Accelerates modern browser automation coverage while maintaining strict human quality review.',
  },
  {
    id: 'exp-api-sql',
    index: '05',
    category: 'API & Data',
    title: 'REST API & SQL Database Validation',
    description:
      'Validate REST APIs using Postman across request/response payloads, HTTP status codes, CRUD operations, and error handling; execute SQL queries for database and data-integrity verification where applicable.',
    technologies: ['Postman', 'REST APIs', 'HTTP Status Codes', 'JSON Validation', 'SQL', 'Data Integrity'],
    verificationImpact: 'Guarantees backend contract compliance and accurate relational database persistence.',
  },
  {
    id: 'exp-defect-lifecycle',
    index: '06',
    category: 'QA & Exploration',
    title: 'Defect Investigation, Jira Logging & Retesting',
    description:
      'Investigate automation and functional failures, log detailed defects in Jira with reproduction steps and evidence, validate fixes, and assess regression impact to ensure changes do not break established application functionality.',
    technologies: ['Jira', 'Defect Lifecycle Management', 'Root-Cause Analysis', 'Retesting', 'Regression Analysis'],
    verificationImpact: 'Reduces turnaround time on bug resolution and prevents regressions during release cycles.',
  },
  {
    id: 'exp-fullstack-contrib',
    index: '07',
    category: 'Full-Stack & AI',
    title: 'PHP/Laravel & Ionic Development Contributions',
    description:
      'Apply accumulated application and workflow knowledge to contribute directly to ongoing backend, PWA, and mobile application features across PHP/Laravel and Ionic.',
    technologies: ['PHP', 'Laravel', 'Ionic', 'REST APIs', 'PWA Development'],
    verificationImpact: 'Bridges QA and software engineering by implementing features with built-in regression awareness.',
  },
  {
    id: 'exp-ai-assisted-dev',
    index: '08',
    category: 'Full-Stack & AI',
    title: 'AI-Assisted Software Development & Validation',
    description:
      'Utilize AI coding agents (OpenAI Codex, Antigravity, Cursor, and Claude) to implement backend logic, UI improvements, and functional updates while validating all changes against existing application behaviour.',
    technologies: ['OpenAI Codex', 'Antigravity', 'Cursor', 'Claude', 'Human-in-the-Loop QA'],
    verificationImpact: 'Combines AI development velocity with disciplined QA verification to prevent regressions.',
  },
  {
    id: 'exp-client-coord',
    index: '09',
    category: 'Collaboration',
    title: 'Client Communication & Release Coordination',
    description:
      'Share daily testing and development progress with clients and coordinate across QA and development activities to support smooth, validated software releases.',
    technologies: ['Agile/Scrum', 'Release Validation', 'Client Communication', 'Cross-Team Coordination'],
    verificationImpact: 'Maintains transparent stakeholder alignment and confident release delivery.',
  },
];

export const EDUCATION_DATA = {
  degree: 'B.Tech – Artificial Intelligence & Data Science',
  institution: 'Priyadarshini Engineering College, Nagpur',
  duration: '2021 – 2024',
  cgpa: '7.30 / 10',
  highlights: [
    {
      title: 'Artificial Intelligence & Algorithmic Foundations',
      detail:
        'Built academic foundations in artificial intelligence concepts, data structures, and computational problem-solving that now inform practical AI-assisted software development and verification.',
    },
    {
      title: 'Data Science & Relational Database Systems',
      detail:
        'Studied database management systems, SQL querying, and structured data analysis—directly supporting backend data-integrity verification and API payload validation.',
    },
    {
      title: 'Software Engineering & Object-Oriented Programming',
      detail:
        'Developed core proficiency in Java object-oriented programming, software lifecycle principles (SDLC/STLC), and modular system architecture.',
    },
  ],
};
