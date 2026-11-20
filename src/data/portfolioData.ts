export type ProjectCategory = 'all' | 'flagship' | 'applications' | 'experiments';

export type TechMaturity = 'All' | 'Hands-On' | 'Exploring' | 'Learning';

export interface ProjectFeatureStep {
  id: string;
  stepLabel: string;
  title: string;
  description: string;
  spec: string;
}

export interface ProjectSpecItem {
  label: string;
  value: string;
}

export interface ProjectFeatureDetail {
  title: string;
  detail: string;
}

export interface ProjectFutureMilestone {
  phase: string;
  title: string;
  detail: string;
}

export interface StudentProject {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  stage: string;
  summary: string;
  whatItDoes: string;
  architecture: string;
  highlights: string[];
  stack: string[];
  metric: string;
  screenshotPath?: string;
  screenshotAlt?: string;
  visualType:
    | 'panelflow'
    | 'stockpilot'
    | 'colorizer'
    | 'nova'
    | 'tricode'
    | 'cpitimeline'
    | 'medicine'
    | 'liquidmorph';
  demoType:
    | 'panelflow'
    | 'stockpilot'
    | 'colorizer'
    | 'tricode'
    | 'nova'
    | 'liquidmorph'
    | 'medicine'
    | 'cpitimeline';
  featureWalkthrough: ProjectFeatureStep[];
  specifications: ProjectSpecItem[];
  allFeatures: ProjectFeatureDetail[];
  futureRoadmap: ProjectFutureMilestone[];
}

export interface ExperimentalIdea {
  id: string;
  title: string;
  focus: string;
  description: string;
  stage: string;
}

export interface JourneyStep {
  id: string;
  phase: string;
  period: string;
  title: string;
  context: string;
  category: string;
  summary: string;
  outcome: string;
  details: string;
}

export interface PersonalWorkItem {
  id: string;
  index: string;
  title: string;
  medium: string;
  year: string;
  dimensions: string;
  description: string;
  sketchType:
    | 'flow-field'
    | 'orbital-harmonics'
    | 'bauhaus-grid'
    | 'topographic-wave'
    | 'recursive-tree'
    | 'kinetic-type';
  palette: [string, string, string];
  columnShift: 'slow' | 'medium' | 'fast';
}

export interface TechItem {
  name: string;
  maturity: Exclude<TechMaturity, 'All'>;
  relativeLevel: number;
  note: string;
  relatedProjectIds: string[];
}

export interface TechArea {
  id: string;
  title: string;
  subtitle: string;
  proficiencyLevel: number;
  proficiencySummary: string;
  items: TechItem[];
}

export interface CreativeInterest {
  id: string;
  index: string;
  title: string;
  domain: string;
  description: string;
  inspiration: string;
}

export const JASHED_PROFILE = {
  name: 'Md. Ahsanul Haque Jashed',
  shortName: 'Jashed',
  role: 'Independent Developer & Founder',
  tagline: 'Building beyond the ordinary.',
  headline: 'I build ideas into digital experiences.',
  institution: 'Chittagong Polytechnic Institute, Bangladesh',
  department: 'Computer Science & Technology',
  roll: '881524',
  email: 'jashed7118@gmail.com',
  githubStatus: 'Coming soon — documenting source repositories',
  philosophy: 'Think deeply. Build creatively. Learn continuously.',
  introSummary:
    "I'm a Computer Science & Technology student from Bangladesh exploring the intersection of software engineering, artificial intelligence, application architecture, and minimalist interactive interfaces.",
  aboutParagraphs: [
    "I'm Md. Ahsanul Haque Jashed, an aspiring independent developer and founder with an interest in creating technology that is both functional and meaningful.",
    "I don't want to limit myself to writing code. I want to understand the complete process of building digital products — from operating systems, backend architecture, and databases to AI-assisted applications, Android development, and tactile glassmorphic interfaces.",
    'Currently, I am strengthening my foundations at Chittagong Polytechnic Institute while developing independent software concepts, mobile UI prototypes, and technical experiments — presenting prototypes and concepts transparently alongside completed coursework.',
  ],
  metrics: [
    { label: 'Selected Collection', value: '08+', detail: 'Projects & product concepts' },
    { label: 'Core Disciplines', value: '03', detail: 'Engineering · Creative Tech · Product' },
    { label: 'Academic Track', value: 'CST', detail: 'Chittagong Polytechnic · Roll 881524' },
    { label: 'Portfolio Edition', value: '2026', detail: 'Independent Developer & Founder' },
  ],
  whatIDo: [
    {
      id: 'software',
      label: '01. Software Engineering',
      title: 'Structured Systems & Databases',
      body: 'Designing and developing applications with clean folder architecture, relational data modeling, authentication workflows, and maintainable code.',
      meta: 'Java · Python · Django · SQLite / MySQL',
    },
    {
      id: 'creative',
      label: '02. Creative Technology',
      title: 'Minimalist Glass & Motion',
      body: 'Exploring Apple-inspired minimalism, frosted glassmorphism, parallax depth, and fluid audio-reactive UI where visual clarity elevates utility.',
      meta: 'React · TypeScript · Motion · Glassmorphism',
    },
    {
      id: 'ai',
      label: '03. AI Applications',
      title: 'OCR, Vision & Automation',
      body: 'Researching practical ways to embed computer vision, speech bubble detection, and on-device inference into everyday reading and creative tools.',
      meta: 'PaddleOCR · YOLOv8 · ONNX Runtime · OpenCV',
    },
    {
      id: 'product',
      label: '04. Product Thinking',
      title: 'From Problem to Architecture',
      body: 'Identifying real-world bottlenecks—like pharmacy stock tracking or manga accessibility—and planning end-to-end digital product blueprints.',
      meta: 'System Design · UI Prototyping · Roadmap Planning',
    },
  ],
};

export const SELECTED_PROJECTS: StudentProject[] = [
  {
    id: 'panelflow-ai',
    index: '01',
    title: 'PanelFlow AI',
    subtitle: 'AI-Powered Manga Reading Assistant',
    category: 'flagship',
    categoryLabel: 'AI / Android / Accessibility',
    stage: 'UI Prototype & Architecture',
    summary:
      'An Android reading assistant designed to make manga and manhwa reading interactive through OCR, YOLOv8 speech-bubble detection, accessibility overlays, and TTS narration.',
    whatItDoes:
      'PanelFlow AI transforms static manga, manhwa, and PDF/TXT chapters into an interactive audio-visual reading experience. From a single Command Center, readers enable system Accessibility and Floating Overlay permissions, load pages from their Gallery or Library, detect speech bubbles automatically, extract dialogue text, and listen to natural voice narration without losing panel flow.',
    architecture:
      'Built around a dark command-center Android interface with Accessibility & Floating Overlay toggles, direct Gallery / PDF / TXT ingestion, and an on-device YOLOv8 + PaddleOCR + ONNX Runtime narration pipeline.',
    highlights: [
      'Command Center interface with one-tap Accessibility and Overlay controls',
      'Read directly from Gallery, PDF, or TXT chapter files inside My Library',
      'Planned YOLOv8 bubble localization paired with PaddleOCR & emotion-aware TTS',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'PaddleOCR', 'YOLOv8', 'ONNX Runtime'],
    metric: 'V8 Interface Prototype',
    screenshotPath: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_6.39.28_PM__4__cbf1e3fb.jpeg',
    screenshotAlt: 'PanelFlow AI V8 mobile interface showing Command Center, Accessibility, Overlay, and Read Gallery PDF TXT actions',
    visualType: 'panelflow',
    demoType: 'panelflow',
    featureWalkthrough: [
      {
        id: 'pf-command',
        stepLabel: 'Step 01',
        title: 'Command Center & System Overlay',
        description:
          'Users toggle system-wide Accessibility and floating Overlay permissions directly from the dark command dashboard before launching a chapter.',
        spec: 'Android AccessibilityService · Floating Bubble UI',
      },
      {
        id: 'pf-detect',
        stepLabel: 'Step 02',
        title: 'Speech Bubble & Panel Localization',
        description:
          'Ingests comic pages from Gallery, PDF, or TXT and isolates dialogue bubbles in reading order using a lightweight YOLOv8 detection pass.',
        spec: 'YOLOv8 + OpenCV · Reading-order sort',
      },
      {
        id: 'pf-tts',
        stepLabel: 'Step 03',
        title: 'PaddleOCR Extraction & Voice Narration',
        description:
          'Extracts text cleanly via PaddleOCR and streams dialogue into on-device ONNX TTS narration so chapters can be experienced hands-free.',
        spec: 'PaddleOCR → ONNX Runtime TTS',
      },
    ],
    specifications: [
      { label: 'Platform', value: 'Android (Kotlin · Jetpack Compose)' },
      { label: 'Version Stage', value: 'V8 Interface Prototype & Pipeline Architecture' },
      { label: 'Vision Model', value: 'YOLOv8 Speech-Bubble & Panel Localization' },
      { label: 'OCR Engine', value: 'PaddleOCR Multi-Orientation Text Recognition' },
      { label: 'Speech Synthesis', value: 'On-Device ONNX Runtime TTS' },
      { label: 'Input Formats', value: 'Gallery Images · PDF · TXT Chapters' },
      { label: 'System Permissions', value: 'Accessibility Service · Floating Screen Overlay' },
      { label: 'Target Users', value: 'Manga/Manhwa Readers & Visually Impaired Users' },
    ],
    allFeatures: [
      {
        title: 'Command Center Dashboard',
        detail: 'Central hub with one-tap switches for Accessibility and Floating Overlay permissions.',
      },
      {
        title: 'Multi-Source Reader',
        detail: 'Import and open chapters directly from device Gallery, PDF documents, or TXT files.',
      },
      {
        title: 'Personal Library Sync',
        detail: 'Keep favorite chapters, reading history, and saved voice presets organized in My Library.',
      },
      {
        title: 'Automatic Bubble Reading Order',
        detail: 'Detects dialogue balloons right-to-left (manga) or top-to-bottom (manhwa webtoon).',
      },
      {
        title: 'Emotion-Aware Voice Profiles',
        detail: 'Planned speaker pitch & pacing modulation based on exclamation, whisper, or narration boxes.',
      },
      {
        title: 'Offline-First Processing',
        detail: 'Designed to run OCR and TTS models locally on Android without relying on cloud latency.',
      },
    ],
    futureRoadmap: [
      {
        phase: 'Next Milestone',
        title: 'Real-Time On-Device Bubble Bounding Box Testbed',
        detail: 'Benchmark quantized YOLOv8n + PaddleOCR latency directly on mid-range Android devices.',
      },
      {
        phase: 'Phase 02',
        title: 'Multi-Character Voice Diarization',
        detail: 'Assign distinct voice timbres automatically to recurring characters across a chapter.',
      },
      {
        phase: 'Long-Term Vision',
        title: 'Live In-App Translation Overlay',
        detail: 'Instant Japanese/Korean-to-English & Bengali speech bubble translation rendered smoothly over panels.',
      },
    ],
  },
  {
    id: 'ai-manga-colorizer',
    index: '02',
    title: 'panelcolour — AI Manga Colorizer',
    subtitle: 'Linework-Preserving AI Colorization Studio',
    category: 'flagship',
    categoryLabel: 'AI / Computer Vision',
    stage: 'UI Prototype & Vision Concept',
    summary:
      'An AI-powered manga and sketch colorizer built to preserve crisp ink linework and character palettes across styles like Natural and Anime Cel Shading.',
    whatItDoes:
      'panelcolour takes black-and-white manga panels or raw pencil sketches and applies intelligent, style-controlled colorization without blurring the artist’s ink strokes. Creators can organize panels by chapter, toggle between Line Art Only drafts and Colored outputs, and lock character palettes so hair, skin, and outfits stay consistent page after page.',
    architecture:
      'Features a warm dark-amber studio UI organizing panels by chapter (e.g., Chapter 1 - Awakening Panel 4, Duet Sketch) with style selectors to switch between Natural rendering, Anime Cel Shading, and Line Art inspection.',
    highlights: [
      'Preserves original monochrome ink linework and screentone detail',
      'Style control modes including Natural and Anime Cel Shading',
      'Chapter panel organizer distinguishing Colored outputs vs. Line Art Only drafts',
    ],
    stack: ['Python', 'Computer Vision', 'OpenCV', 'Android UI'],
    metric: 'Style-Controlled Colorizer',
    screenshotPath: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_6.39.28_PM__3__ecd1b7f3.jpeg',
    screenshotAlt: 'panelcolour AI Manga Colorizer mobile interface showing Chapter 1 Awakening Panel 4 Colored and Duet Sketch Line Art Only',
    visualType: 'colorizer',
    demoType: 'colorizer',
    featureWalkthrough: [
      {
        id: 'pc-ingest',
        stepLabel: 'Step 01',
        title: 'Import Drawings & Manga Panels',
        description:
          'Add raw black-and-white drawings or manga chapters into the workspace, tracked cleanly as Line Art Only or Colored.',
        spec: 'Panel Library · Chapter Grouping',
      },
      {
        id: 'pc-style',
        stepLabel: 'Step 02',
        title: 'Choose Colorization Style',
        description:
          'Switch between Natural painterly tones and crisp Anime Cel Shading while locking character hair, outfit, and skin palettes.',
        spec: 'Natural · Anime Cel Shading · Palette Lock',
      },
      {
        id: 'pc-preserve',
        stepLabel: 'Step 03',
        title: 'Linework-Safe Synthesis',
        description:
          'Separates ink strokes from fill regions so fine cross-hatching and expressive facial lines remain sharp after color synthesis.',
        spec: 'OpenCV Edge Mask · Linework Preservation',
      },
    ],
    specifications: [
      { label: 'Platform', value: 'Mobile Studio UI + Python Vision Backend' },
      { label: 'Color Modes', value: 'Natural Painterly · Anime Cel Shading' },
      { label: 'Line Preservation', value: 'OpenCV Adaptive Ink & Screentone Masking' },
      { label: 'Project Workspace', value: 'Chapter & Panel Status Organization' },
      { label: 'Stage', value: 'UI Prototype & Vision Pipeline Concept' },
      { label: 'Target Users', value: 'Manga Readers · Fan Colorists · Illustrators' },
    ],
    allFeatures: [
      {
        title: 'Linework & Screentone Protection',
        detail: 'Isolates black ink lines on a protected layer before applying color gradients underneath.',
      },
      {
        title: 'Style Control Presets',
        detail: 'Choose between Natural soft shading or high-contrast Anime Cel Shading per panel.',
      },
      {
        title: 'Character Palette Locking',
        detail: 'Save reference swatches per character so colors never drift between consecutive panels.',
      },
      {
        title: 'Chapter-Level Panel Tracker',
        detail: 'Clear status labels distinguish Colored finishes from Line Art Only sketches.',
      },
    ],
    futureRoadmap: [
      {
        phase: 'Next Milestone',
        title: 'Batch Chapter Colorization Queue',
        detail: 'Process an entire 20-page chapter sequentially with shared scene lighting memory.',
      },
      {
        phase: 'Phase 02',
        title: 'Interactive Brush Hint Pinning',
        detail: 'Let artists tap a region with a color swatch to guide diffusion lighting in real time.',
      },
      {
        phase: 'Long-Term Vision',
        title: 'Direct Export to PanelFlow Reader',
        detail: 'Seamless bridge allowing readers to colorize monochrome chapters right inside PanelFlow AI.',
      },
    ],
  },
  {
    id: 'nova-os',
    index: '03',
    title: 'NOVA — Canvas Studio',
    subtitle: 'OS-Inspired Personalisation & Environment',
    category: 'applications',
    categoryLabel: 'System Architecture / Cross-Platform',
    stage: 'Interactive UI Prototype',
    summary:
      'A personalisation studio and OS-inspired environment where users preview live lock screens, widgets, and switch system presets like Nothing, Cupertino, One UI, and Ember in one tap.',
    whatItDoes:
      'NOVA Canvas Studio lets users design and preview custom mobile OS experiences in real time. Inside a live handset viewport showing clock typography, weather, steps, calendar events, and notification cards, visitors can switch complete aesthetic identities—Nothing dot-matrix, Cupertino frosted glass, One UI soft cards, or Ember high-contrast—in a single tap and fine-tune themes, icons, and lock widgets.',
    architecture:
      'Combines an interactive miniature handset lock-screen canvas (live clock, weather, steps, events, notification stack) with a 4-tab studio (Theme, Canvas, Icons, Lock) and planned Riverpod + Supabase sync.',
    highlights: [
      'Live lock-screen preview with weather (20°), steps (7.4k), events, and notifications',
      'One-tap system presets: Nothing (dot matrix), Cupertino (frosted glass), One UI, Ember',
      'Four-module editor covering Theme, Canvas, Icons, and Lock controls',
    ],
    stack: ['Flutter', 'Dart', 'Riverpod', 'Supabase', 'FastAPI'],
    metric: '4 System Presets',
    screenshotPath: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_6.39.28_PM__2__ff5f70e0.jpeg',
    screenshotAlt: 'Canvas Personalisation Studio mobile interface displaying live lock screen preview and Nothing, Cupertino, One UI, and Ember presets',
    visualType: 'nova',
    demoType: 'nova',
    featureWalkthrough: [
      {
        id: 'nv-preview',
        stepLabel: 'Step 01',
        title: 'Live Lock-Screen Canvas',
        description:
          'Preview real-time lock-screen telemetry including clock typography, weather, step count, calendar events, and notification cards.',
        spec: 'Real-Time Preview Frame · Undo / Redo',
      },
      {
        id: 'nv-presets',
        stepLabel: 'Step 02',
        title: 'One-Tap System Presets',
        description:
          'Switch the entire visual identity instantly between Nothing (monochrome dot matrix), Cupertino (frosted glass depth), One UI, and Ember.',
        spec: 'Nothing · Cupertino · One UI · Ember',
      },
      {
        id: 'nv-modules',
        stepLabel: 'Step 03',
        title: 'Theme, Canvas, Icons & Lock Tuning',
        description:
          'Customize individual OS layers across four tabs—designed to sync preferences across devices via Supabase and FastAPI.',
        spec: 'Theme · Canvas · Icons · Lock',
      },
    ],
    specifications: [
      { label: 'Framework', value: 'Flutter & Dart (Cross-Platform Mobile)' },
      { label: 'State Architecture', value: 'Riverpod Reactive State Store' },
      { label: 'Cloud & API', value: 'Supabase Auth/Storage + FastAPI Services' },
      { label: 'System Presets', value: 'Nothing · Cupertino · One UI · Ember' },
      { label: 'Studio Modules', value: 'Theme · Canvas · Icons · Lock' },
      { label: 'History Controls', value: 'Live Undo / Redo & Randomize Canvas' },
    ],
    allFeatures: [
      {
        title: 'Interactive Handset Viewport',
        detail: 'Real-time lock screen preview displaying clock, 20° weather, 7.4k steps, events, and live alerts.',
      },
      {
        title: 'Complete Look in One Tap',
        detail: 'Switch between Nothing monochrome dot-matrix, Cupertino frosted glass, One UI soft cards, and Ember.',
      },
      {
        title: 'Four-Layer Customizer',
        detail: 'Dedicated editors for Theme tokens, Canvas depth, Icon packs, and Lock-screen widgets.',
      },
      {
        title: 'Undo, Redo & Shuffle',
        detail: 'Experiment freely with instant state rollback or randomized preset combinations.',
      },
    ],
    futureRoadmap: [
      {
        phase: 'Next Milestone',
        title: 'Shareable Preset Pack Links',
        detail: 'Export custom NOVA setups as lightweight JSON theme packs synced via Supabase.',
      },
      {
        phase: 'Phase 02',
        title: '10-Module OS Ecosystem Expansion',
        detail: 'Add Smart Search launcher, Notes widget, Focus Timer, and Music widget inside the unified shell.',
      },
      {
        phase: 'Long-Term Vision',
        title: 'Custom Android Launcher Build',
        detail: 'Compile the Canvas Studio engine into a full daily-driver minimalist Android launcher.',
      },
    ],
  },
  {
    id: 'medicine-center',
    index: '04',
    title: 'Sahen Sah J.H. Medicine Center',
    subtitle: 'Pharmacy Sales, Tally & Inventory App',
    category: 'applications',
    categoryLabel: 'Business Software / Android',
    stage: 'Working UI & Analytics Prototype',
    summary:
      'A real-world pharmacy management and Bengali tally application tracking Total Sales, Total Profit, Avg Margin (99.6%), Receivable Due, 7-Day Performance charts, and Inventory Stats.',
    whatItDoes:
      'Designed for real daily pharmacy counter operations at Solaiman Building, Harinadighi, this app replaces paper tally ledgers with an instant financial and stock command view. Pharmacists see Total Sales, Total Profit, Average Margin, Receivable Dues, and a 7-Day Performance bar chart at a glance, then jump between six Bengali counter modules: টালি, ক্যাশবক্স, খরচ, বিলিং, কাস্টমার, and ক্যালকুলেটর.',
    architecture:
      'Built for daily pharmacy counter speed at Solaiman Building, Harinadighi—pairing clear high-contrast KPI cards with Bengali bottom navigation tabs (টালি, ক্যাশবক্স, খরচ, বিলিং, কাস্টমার, ক্যালকুলেটর).',
    highlights: [
      'Real-time tracking of Total Sales (Tk), Total Profit, Avg Margin, and Due Receivables',
      'Last 7 Days Performance bar chart and monthly Inventory Stats summary',
      'Accessible Bengali navigation bar for Tally, Cashbox, Expenses, Billing, Customers & Calculator',
    ],
    stack: ['Kotlin', 'Android', 'SQLite', 'MPAndroidChart'],
    metric: '6 Bengali Counter Modules',
    screenshotPath: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_6.39.28_PM_1785be90.jpeg',
    screenshotAlt: 'Sahen Sah J.H. Medicine Center app showing Total Sales Tk 500.00, Total Profit Tk 498.00, Avg Margin 99.6%, Last 7 Days Performance chart, and Bengali tabs',
    visualType: 'medicine',
    demoType: 'medicine',
    featureWalkthrough: [
      {
        id: 'mc-kpi',
        stepLabel: 'Step 01',
        title: 'Counter KPIs at a Glance',
        description:
          'Displays Total Sales, Total Profit, Avg Margin, Sales Growth, and Total Due (Receivable) immediately upon opening the app.',
        spec: 'Sales · Profit · Margin · Receivable Due',
      },
      {
        id: 'mc-chart',
        stepLabel: 'Step 02',
        title: '7-Day Performance & Inventory Stats',
        description:
          'Tracks weekly sales momentum alongside monthly inventory turnover and out-of-stock / expiry alerts.',
        spec: 'MPAndroidChart · Stock & Expiry Checks',
      },
      {
        id: 'mc-tally',
        stepLabel: 'Step 03',
        title: 'Bengali 6-Tab Pharmacy Workflow',
        description:
          'Navigate effortlessly between টালি (Tally), ক্যাশবক্স (Cashbox), খরচ (Expenses), বিলিং (Billing), কাস্টমার (Customers), and ক্যালকুলেটর (Calculator).',
        spec: 'Bilingual Counter UX · Offline SQLite',
      },
    ],
    specifications: [
      { label: 'Client Site', value: 'Sahen Sah J.H. Medicine Center, Harinadighi' },
      { label: 'Platform', value: 'Android Native (Kotlin · Offline-First SQLite)' },
      { label: 'Analytics Charting', value: 'Last 7 Days Sales Bar Graph & Margin KPIs' },
      { label: 'Counter Modules', value: 'টালি · ক্যাশবক্স · খরচ · বিলিং · কাস্টমার · ক্যালকুলেটর' },
      { label: 'Currency & Locale', value: 'Bangladeshi Taka (Tk) · Bilingual English/Bengali UI' },
      { label: 'Stage', value: 'Working UI & Analytics Prototype' },
    ],
    allFeatures: [
      {
        title: 'Instant Financial KPI Grid',
        detail: 'Tracks Total Sales, Total Profit, Average Margin %, Sales Growth %, and Receivable Due in Tk.',
      },
      {
        title: 'Last 7 Days Performance Graph',
        detail: 'Visual bar comparison showing daily sales velocity and monthly inventory totals.',
      },
      {
        title: 'Bengali 6-Tab Navigation',
        detail: 'One-tap access to Tally, Cashbox, Expenses, Customer Billing, Due Ledger, and Built-in Calculator.',
      },
      {
        title: 'Offline SQLite Reliability',
        detail: 'Works seamlessly at the pharmacy counter even without constant internet connectivity.',
      },
    ],
    futureRoadmap: [
      {
        phase: 'Next Milestone',
        title: 'Batch Expiry & Low-Stock Alerts',
        detail: 'Automated 30-day medicine expiry warnings and fast barcode/batch lookup during billing.',
      },
      {
        phase: 'Phase 02',
        title: 'Bluetooth Thermal Receipt Printing',
        detail: 'Print Bengali/English customer pharmacy invoices directly from the বিলিং tab.',
      },
      {
        phase: 'Long-Term Vision',
        title: 'Encrypted Cloud Backup & Multi-Counter Sync',
        detail: 'Daily automated encrypted ledger snapshots synced safely to cloud storage.',
      },
    ],
  },
  {
    id: 'liquid-morph-player',
    index: '05',
    title: 'Liquid Morph Music Player',
    subtitle: 'Real-Time Bass FFT Audio Visualizer',
    category: 'experiments',
    categoryLabel: 'Android / Creative UI',
    stage: 'Interactive UI & Starter Build',
    summary:
      'An experimental Android music player driven by real-time bass FFT audio analysis, featuring an organic morphing orb, 4 visual modes (Liquid, Flow, 3D, Wave), and direct audio URL streaming.',
    whatItDoes:
      'Liquid Morph Music Player turns sound frequencies into living geometry. Using real-time Fast Fourier Transform (FFT) bass extraction, a central glowing orb and waveform pulse dynamically with every kick drum and sub-bass drop. Listeners can load songs from device storage or direct audio URLs, switch between four visual shaders (LIQUID, FLOW, 3D, WAVE), and tune reactivity with the Bass Energy slider.',
    architecture:
      'Scaffolds Android Media3 playback controls with a custom Jetpack Compose canvas visualizer, dynamic Bass Energy boost slider (0–100%), and local + remote song queue ingestion.',
    highlights: [
      'Animated morphing audio orb reacting dynamically to bass FFT energy',
      'Four switchable visual modes: LIQUID, FLOW, 3D, and WAVE',
      'Supports local device audio files (+ ADD SONGS) as well as direct stream URLs',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Android Media3', 'FFT Audio'],
    metric: '4 Reactive Visual Modes',
    screenshotPath: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_6.39.28_PM__1__7875892f.jpeg',
    screenshotAlt: 'Liquid Morph music player mobile interface showing glowing fluid visualizer orb, waveform, Liquid/Flow/3D/Wave visual modes, and 72% Bass Energy slider',
    visualType: 'liquidmorph',
    demoType: 'liquidmorph',
    featureWalkthrough: [
      {
        id: 'lm-orb',
        stepLabel: 'Step 01',
        title: 'Real-Time Bass FFT Visualizer',
        description:
          'Computes low-frequency bass energy to deform the glowing central liquid orb and particle halo in sync with the beat.',
        spec: 'Media3 Audio Session · FFT Frequency Bins',
      },
      {
        id: 'lm-modes',
        stepLabel: 'Step 02',
        title: 'Four Visual Modes & Energy Boost',
        description:
          'Switch between LIQUID, FLOW, 3D, and WAVE rendering styles and fine-tune visual reactivity using the Bass Energy slider.',
        spec: 'Liquid · Flow · 3D · Wave',
      },
      {
        id: 'lm-source',
        stepLabel: 'Step 03',
        title: 'Local Tracks & Direct Stream URLs',
        description:
          'Load songs directly from device storage or paste an online audio stream URL for instant playback and visualization.',
        spec: 'Local Storage · Direct HTTP Audio URL',
      },
    ],
    specifications: [
      { label: 'Platform', value: 'Android (Kotlin · Jetpack Compose)' },
      { label: 'Playback Engine', value: 'Android Media3 ExoPlayer Session' },
      { label: 'Audio Analysis', value: 'Real-Time Visualizer FFT (Sub-Bass 20–160 Hz)' },
      { label: 'Visual Modes', value: 'LIQUID · FLOW · 3D · WAVE' },
      { label: 'Sensitivity Control', value: 'Bass Energy Reaction Boost (0% – 100%)' },
      { label: 'Audio Sources', value: 'Device Local Files + Direct Audio Stream URLs' },
    ],
    allFeatures: [
      {
        title: 'Glowing Bass-Reactive Orb',
        detail: 'Custom shader-inspired fluid ring that expands, morphs, and emits halo particles on beat transients.',
      },
      {
        title: '4 Live Visual Renderers',
        detail: 'Instant toggle between Liquid blob, Flow ribbons, 3D depth rings, and continuous Wave oscilloscope.',
      },
      {
        title: 'Bass Energy Boost Slider',
        detail: 'Fine-tune FFT gain sensitivity dynamically from calm ambient motion to high-energy club pulse.',
      },
      {
        title: 'Local + URL Queue Ingestion',
        detail: 'Pick tracks directly from phone storage (+ ADD SONGS) or paste any direct online audio URL.',
      },
    ],
    futureRoadmap: [
      {
        phase: 'Next Milestone',
        title: 'OpenGL / AGSL Shader Acceleration',
        detail: 'Move the Liquid and 3D morph renderers onto Android AGSL fragment shaders for locked 120Hz motion.',
      },
      {
        phase: 'Phase 02',
        title: '10-Band Parametric Equalizer & Presets',
        detail: 'Pair visual modes with custom Bass Boost, Vocal Clarity, and Late Night audio presets.',
      },
      {
        phase: 'Long-Term Vision',
        title: 'Lock-Screen & Ambient Always-On Visualizer',
        detail: 'Minimal low-power waveform strip integrated cleanly into lock-screen media controls.',
      },
    ],
  },
  {
    id: 'stockpilot',
    index: '06',
    title: 'StockPilot',
    subtitle: 'Inventory & Business Management Platform',
    category: 'flagship',
    categoryLabel: 'Full-Stack / Business Software',
    stage: 'Phase 1 Source Delivered',
    summary:
      'A database-driven inventory management platform featuring a structured dark dashboard, user authentication, role foundations, and planned stock and financial analytics.',
    whatItDoes:
      'StockPilot gives small and medium retail businesses a centralized dark-mode operations cockpit to manage product catalogs, supplier purchases, daily sales, and staff access roles. Phase 1 establishes secure Django authentication, user profiles, and the modular dashboard architecture ready to expand into automated stock-level alerts and profit analytics.',
    architecture:
      'Phase 1 implements the Django project core, authentication flows, user profiles, role-based access foundation, and dark management shell—architected to scale from SQLite in development to MySQL for full purchase/sales ledgers.',
    highlights: [
      'Delivered Phase 1: Django setup, authentication, profile views & role foundation',
      'Dark executive dashboard layout for product, purchase, and sales modules',
      'Planned financial reporting and low-stock validation workflows',
    ],
    stack: ['Python', 'Django', 'SQLite', 'MySQL', 'HTML / CSS / JS'],
    metric: 'Phase 1 codebase active',
    visualType: 'stockpilot',
    demoType: 'stockpilot',
    featureWalkthrough: [
      {
        id: 'sp-auth',
        stepLabel: 'Step 01',
        title: 'Django Auth & Role Foundation',
        description:
          'Phase 1 establishes secure user registration, login sessions, profile pages, and permission foundations.',
        spec: 'Django Auth · Role-Based Access',
      },
      {
        id: 'sp-stock',
        stepLabel: 'Step 02',
        title: 'Product & Stock Tracking',
        description:
          'Organized product catalog tracking incoming purchases, customer sales, and automatic reorder threshold alerts.',
        spec: 'SQLite Dev → MySQL Production Schema',
      },
      {
        id: 'sp-finance',
        stepLabel: 'Step 03',
        title: 'Financial & Margin Analytics',
        description:
          'Aggregates daily sales velocity and gross margin snapshots into a clean dark administrative dashboard.',
        spec: 'Inventory Ledger · Profit Reporting',
      },
    ],
    specifications: [
      { label: 'Backend Framework', value: 'Python · Django MTV Architecture' },
      { label: 'Database Path', value: 'SQLite (Dev) → MySQL (Production Ledger)' },
      { label: 'Security & Auth', value: 'Django Session Auth + Role-Based Access' },
      { label: 'Delivered Scope', value: 'Phase 1 Core Project, Auth, Profiles & UI Shell' },
      { label: 'Frontend Layer', value: 'Dark Responsive HTML5 · CSS3 · JavaScript' },
      { label: 'Core Domains', value: 'Products · Purchases · Sales · Financial Reports' },
    ],
    allFeatures: [
      {
        title: 'Role-Scoped Authentication',
        detail: 'Separate admin, manager, and cashier permissions built cleanly on Django user profiles.',
      },
      {
        title: 'Dark Operations Cockpit',
        detail: 'Low-glare dark management layout engineered for long counter and warehouse shifts.',
      },
      {
        title: 'Stock & Reorder Engine',
        detail: 'Tracks live unit quantities with instant low-stock flags before bestsellers run out.',
      },
      {
        title: 'Purchase & Sales Ledger',
        detail: 'Structured relational models connecting vendor restocks directly to customer checkout.',
      },
    ],
    futureRoadmap: [
      {
        phase: 'Phase 02',
        title: 'Automated Low-Stock & Invoice PDF Engine',
        detail: 'Complete full purchase/sale CRUD views with downloadable PDF invoices and CSV exports.',
      },
      {
        phase: 'Phase 03',
        title: 'MySQL Multi-Branch Store Sync',
        detail: 'Migrate production database to MySQL supporting multi-warehouse inventory transfers.',
      },
      {
        phase: 'Long-Term Vision',
        title: 'AI Demand & Restock Forecasting',
        detail: 'Predict weekly reorder quantities automatically using historical seasonal sales trends.',
      },
    ],
  },
  {
    id: 'tricode-nexus',
    index: '07',
    title: 'TriCode Nexus Calculator',
    subtitle: 'Collaborative Scientific Calculator',
    category: 'applications',
    categoryLabel: 'Academic Team Project / Java',
    stage: 'Academic Team Build',
    summary:
      'A three-person team Java calculator project delivering scientific mathematical operations inside a modern, glass-inspired interface styled with a custom #2C666E and #F0EDEE palette.',
    whatItDoes:
      'TriCode Nexus Calculator delivers fast arithmetic, trigonometry, roots, and algebraic evaluation inside a refined desktop interface inspired by Apple calculator ergonomics. Built by a 3-person Computer Science student team, it elevates standard academic Java assignments with custom typography, tactile button feedback, and a signature #2C666E teal & #F0EDEE alabaster visual language.',
    architecture:
      'Built collaboratively in Java by separating expression parsing and trigonometric evaluation from the minimalist scientific keypad surface.',
    highlights: [
      'Apple-inspired scientific calculator ergonomics and keypad hierarchy',
      'Custom architectural color palette (#2C666E deep teal & #F0EDEE alabaster)',
      'Developed as a 3-person Computer Science team collaboration',
    ],
    stack: ['Java', 'Swing / UI Design', 'Team Collaboration'],
    metric: '3-member student team',
    visualType: 'tricode',
    demoType: 'tricode',
    featureWalkthrough: [
      {
        id: 'tc-design',
        stepLabel: 'Step 01',
        title: 'Apple-Inspired Scientific Keypad',
        description:
          'Clean button hierarchy pairing crisp #F0EDEE surfaces with #2C666E primary operator keys.',
        spec: 'Java UI · Custom #2C666E Palette',
      },
      {
        id: 'tc-math',
        stepLabel: 'Step 02',
        title: 'Trigonometric & Power Operations',
        description:
          'Supports sine, cosine, square roots, exponents, and standard arithmetic with immediate evaluation.',
        spec: 'Scientific Parser · Degree Mode',
      },
      {
        id: 'tc-team',
        stepLabel: 'Step 03',
        title: 'Three-Person Academic Collaboration',
        description:
          'Built jointly by three CST students dividing math logic, UI styling, and QA edge-case testing.',
        spec: '3-Member Team Build',
      },
    ],
    specifications: [
      { label: 'Language & UI', value: 'Java SE · Custom Swing / Glass-Inspired UI' },
      { label: 'Color System', value: '#2C666E Deep Teal · #F0EDEE Alabaster' },
      { label: 'Math Capabilities', value: 'Arithmetic · Trigonometry · Roots · Powers' },
      { label: 'Team Structure', value: '3-Person CST Academic Collaboration' },
      { label: 'Stage', value: 'Completed Academic Team Build' },
      { label: 'Architecture', value: 'Decoupled Parser & Event-Driven Keypad' },
    ],
    allFeatures: [
      {
        title: 'Custom Architectural Palette',
        detail: 'Distinctive calm contrast (#2C666E & #F0EDEE) engineered for zero visual clutter.',
      },
      {
        title: 'Scientific & Standard Modes',
        detail: 'Instant access to sin, cos, tan, square roots, powers, and full chained arithmetic.',
      },
      {
        title: 'Safe Expression Evaluation',
        detail: 'Handles division-by-zero, invalid parentheses, and precision rounding gracefully.',
      },
      {
        title: 'Modular Java Class Design',
        detail: 'Clean separation of math engine, keyboard shortcuts, and UI styling components.',
      },
    ],
    futureRoadmap: [
      {
        phase: 'Next Milestone',
        title: 'Calculation History Tape Drawer',
        detail: 'Slide-out history log letting engineering students copy or re-insert previous formulas.',
      },
      {
        phase: 'Phase 02',
        title: '2D Function Graphing Canvas',
        detail: 'Plot y = f(x) trigonometric and polynomial curves directly inside a collapsible side panel.',
      },
      {
        phase: 'Long-Term Vision',
        title: 'Cross-Platform JavaFX / Web Port',
        detail: 'Package the scientific engine as an installable desktop utility and browser companion.',
      },
    ],
  },
  {
    id: 'cpitimeline',
    index: '08',
    title: 'CPITimeline',
    subtitle: 'Polytechnic Information & News Portal',
    category: 'applications',
    categoryLabel: 'Web Platform / Community',
    stage: 'Platform Concept',
    summary:
      'A proposed Bengali-language digital news and academic update hub built specifically for Chittagong Polytechnic Institute across all seven engineering departments.',
    whatItDoes:
      'CPITimeline centralizes campus notices, semester exam schedules, departmental updates, and student community highlights for Chittagong Polytechnic Institute into one searchable Bengali-first web portal. Students across all seven engineering departments can filter announcements relevant to their trade instead of digging through scattered social posts.',
    architecture:
      'Structured around department-specific information feeds (Civil, Mechanical, Power, Computer, Electrical, Electronics, and Environmental) with community notice integration.',
    highlights: [
      'Covers all 7 core departments of Chittagong Polytechnic Institute',
      'Accessible Bengali-language editorial interface for students',
      'Integrated campus noticeboard and community update streams',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'React', 'Bengali UI'],
    metric: '7 CPI departments',
    visualType: 'cpitimeline',
    demoType: 'cpitimeline',
    featureWalkthrough: [
      {
        id: 'cpi-depts',
        stepLabel: 'Step 01',
        title: '7-Department Academic Directory',
        description:
          'Dedicated channels for Computer, Civil, Mechanical, Power, Electrical, Electronics, and Environmental technology students.',
        spec: 'Chittagong Polytechnic Institute',
      },
      {
        id: 'cpi-bn',
        stepLabel: 'Step 02',
        title: 'Bengali-First Editorial Feed',
        description:
          'Presents exam schedules, semester notices, and campus stories in clear Bengali typography.',
        spec: 'Bengali Interface · Notice Stream',
      },
      {
        id: 'cpi-comm',
        stepLabel: 'Step 03',
        title: 'Community & Student Updates',
        description:
          'Bridges official polytechnic announcements with student club events and Facebook community feeds.',
        spec: 'Student Hub · Web Portal',
      },
    ],
    specifications: [
      { label: 'Target Campus', value: 'Chittagong Polytechnic Institute, Bangladesh' },
      { label: 'Departments Covered', value: '7 Core Engineering & Technology Departments' },
      { label: 'Primary Language', value: 'Bengali Editorial Interface + English Tags' },
      { label: 'Web Stack', value: 'HTML5 · CSS3 · JavaScript · React Architecture' },
      { label: 'Stage', value: 'Platform Concept & Information Architecture' },
      { label: 'Focus', value: 'Academic Notices · Routines · Campus Journalism' },
    ],
    allFeatures: [
      {
        title: 'Department-Filtered Feeds',
        detail: 'Quickly isolate notices for Computer, Civil, Electrical, Mechanical, Power, Electronics, or Environmental.',
      },
      {
        title: 'Clean Bengali Typography',
        detail: 'Readable article and notice cards designed for fast mobile scanning between classes.',
      },
      {
        title: 'Exam & Routine Spotlight',
        detail: 'Pinned priority cards for BTEB exam dates, lab submissions, and scholarship deadlines.',
      },
      {
        title: 'Student Community Stories',
        detail: 'Highlights campus projects, tech workshops, and club initiatives across CPI.',
      },
    ],
    futureRoadmap: [
      {
        phase: 'Next Milestone',
        title: 'Public Beta Portal & Notice Archive',
        detail: 'Deploy a searchable semester notice and BTEB routine archive for CPI students.',
      },
      {
        phase: 'Phase 02',
        title: 'Department Representative Publishing',
        detail: 'Verified student editors from each of the 7 departments can submit and curate updates.',
      },
      {
        phase: 'Long-Term Vision',
        title: 'Push Alerts & PWA Offline Reader',
        detail: 'Installable web app sending instant alerts whenever official polytechnic notices go live.',
      },
    ],
  },
];

export const EXPERIMENTAL_IDEAS: ExperimentalIdea[] = [
  {
    id: 'aura-os',
    title: 'AuraOS',
    focus: 'Productivity & Focus',
    description:
      'A futuristic productivity dashboard exploring focus analytics, habit streaks, and early burnout-awareness indicators.',
    stage: 'UI Concept',
  },
  {
    id: 'tallykatha',
    title: 'TallyKatha',
    focus: 'Business Accounting',
    description:
      'Offline-first accounting concept featuring payment reconciliation, audit trails, multi-branch ledgers, and backup sync.',
    stage: 'System Blueprint',
  },
  {
    id: 'remote-mouse',
    title: 'Remote Mouse Controller',
    focus: 'Android ↔ Desktop',
    description:
      'Controlling a laptop cursor and shortcuts wirelessly from an Android handset over local Wi-Fi or Bluetooth.',
    stage: 'Utility Prototype',
  },
  {
    id: 'glass-alarm',
    title: 'Glassmorphism Alarm Clock',
    focus: 'Motion & Surface UI',
    description:
      'Animated timekeeper experimenting with layered translucent surfaces, ambient gradients, and tactile wake transitions.',
    stage: 'Visual Study',
  },
  {
    id: 'luxbn',
    title: 'Luxbn',
    focus: 'Brand & E-Commerce',
    description:
      'Digital brand direction for a modern men’s fashion label centered around tailored denim and urban minimalism.',
    stage: 'Brand Concept',
  },
  {
    id: 'web-ii-assignment',
    title: 'Web Design & Development-II',
    focus: 'Responsive Foundations',
    description:
      'Academic web engineering coursework establishing semantic navbars, hero banners, feature cards, and clean footers.',
    stage: 'Completed Coursework',
  },
];

export const TECH_AREAS: TechArea[] = [
  {
    id: 'programming-web',
    title: 'Programming & Frontend',
    subtitle: 'Languages and web interfaces practiced in academic and personal builds.',
    proficiencyLevel: 72,
    proficiencySummary: 'Practiced Foundation',
    items: [
      {
        name: 'HTML, CSS & Responsive Layout',
        maturity: 'Hands-On',
        relativeLevel: 82,
        note: 'Implemented in portfolio iterations, CPITimeline concepts, and academic coursework.',
        relatedProjectIds: ['stockpilot', 'cpitimeline'],
      },
      {
        name: 'Java & JavaScript',
        maturity: 'Hands-On',
        relativeLevel: 74,
        note: 'Applied in TriCode Nexus Calculator and interactive web components.',
        relatedProjectIds: ['tricode-nexus', 'cpitimeline', 'stockpilot'],
      },
      {
        name: 'React & TypeScript',
        maturity: 'Learning',
        relativeLevel: 58,
        note: 'Building modular, parallax-driven interfaces and component architectures.',
        relatedProjectIds: ['cpitimeline'],
      },
      {
        name: 'Three.js & Motion Design',
        maturity: 'Exploring',
        relativeLevel: 44,
        note: 'Studying interactive 3D scenes, particle fields, and compositor scroll motion.',
        relatedProjectIds: ['liquid-morph-player'],
      },
    ],
  },
  {
    id: 'backend-data',
    title: 'Backend, Databases & Android',
    subtitle: 'Application engines, relational persistence, and mobile architecture.',
    proficiencyLevel: 60,
    proficiencySummary: 'Active Application',
    items: [
      {
        name: 'Python & Django',
        maturity: 'Hands-On',
        relativeLevel: 72,
        note: 'Delivered StockPilot Phase 1 authentication, profiles, and dark dashboard shell.',
        relatedProjectIds: ['stockpilot', 'ai-manga-colorizer'],
      },
      {
        name: 'SQLite & MySQL',
        maturity: 'Hands-On',
        relativeLevel: 68,
        note: 'Relational table design for inventory, pharmacy stock, and ledger planning.',
        relatedProjectIds: ['stockpilot', 'medicine-center'],
      },
      {
        name: 'Kotlin & Jetpack Compose',
        maturity: 'Learning',
        relativeLevel: 52,
        note: 'Practiced through Liquid Morph Player starter code and Android UI planning.',
        relatedProjectIds: ['panelflow-ai', 'liquid-morph-player', 'medicine-center'],
      },
      {
        name: 'FastAPI, Flutter & Firebase',
        maturity: 'Exploring',
        relativeLevel: 40,
        note: 'Researched for NOVA cross-platform state sync and lightweight REST APIs.',
        relatedProjectIds: ['nova-os'],
      },
    ],
  },
  {
    id: 'ai-design',
    title: 'Artificial Intelligence & Product UX',
    subtitle: 'Intelligent pipelines and futuristic interface directions under active study.',
    proficiencyLevel: 48,
    proficiencySummary: 'Research & Exploration',
    items: [
      {
        name: 'UI/UX & Glassmorphism Systems',
        maturity: 'Hands-On',
        relativeLevel: 76,
        note: 'Dark editorial layouts, custom palettes (#2C666E / #F0EDEE), and micro-interactions.',
        relatedProjectIds: ['tricode-nexus', 'nova-os', 'liquid-morph-player'],
      },
      {
        name: 'PaddleOCR & YOLOv8',
        maturity: 'Exploring',
        relativeLevel: 38,
        note: 'Researched for manga speech-bubble detection and dialogue recognition in PanelFlow AI.',
        relatedProjectIds: ['panelflow-ai'],
      },
      {
        name: 'ONNX Runtime & OpenCV',
        maturity: 'Exploring',
        relativeLevel: 36,
        note: 'Studied for on-device mobile inference and line-art preprocessing.',
        relatedProjectIds: ['panelflow-ai', 'ai-manga-colorizer'],
      },
      {
        name: 'Layered & Offline-First Architecture',
        maturity: 'Learning',
        relativeLevel: 54,
        note: 'Designing sync-resilient workflows for TallyKatha and management systems.',
        relatedProjectIds: ['nova-os', 'medicine-center'],
      },
    ],
  },
];

export const CREATIVE_INTERESTS: CreativeInterest[] = [
  {
    id: 'manga-manhwa',
    index: '01',
    title: 'Manga, Manhwa & Visual Reading',
    domain: 'Visual Culture',
    description:
      'An avid reader of serialized manga and manhwa. Studying panel pacing and visual framing directly inspired PanelFlow AI and panelcolour.',
    inspiration: 'Translating static sequential art into accessible, interactive experiences.',
  },
  {
    id: 'creative-writing',
    index: '02',
    title: 'Bengali Novel Writing — ঘুম',
    domain: 'Literature & Fiction',
    description:
      'একটি মধ্যবিত্ত জীবনের বাস্তবগল্প—"ঘুম" কোনো নিদ্রার গল্প নয়, এটি জেগে থাকার গল্প, যেখানে স্বপ্নের দাম হিসেব হয় টিউশন ফি আর গ্যাস বিলের মতো।',
    inspiration: 'Jashed (20), Jasim Uddin, Kamrun Nahar, Jihan · City & Village Bonds.',
  },
  {
    id: 'mythology',
    index: '03',
    title: 'Mythology & Epic Characters',
    domain: 'Narrative Lore',
    description:
      'Exploring timeless character archetypes, moral dilemmas, and dramatic scale from the Ramayana, Mahabharata, and classical epics.',
    inspiration: 'Giving digital products and brand concepts a strong sense of story.',
  },
  {
    id: 'visual-identity',
    index: '04',
    title: 'Cinematic Aesthetics & Branding',
    domain: 'Design Direction',
    description:
      'Passionate about dark editorial photography, modern grooming, urban minimalism (Luxbn), and crafting memorable digital identities.',
    inspiration: 'Treating every portfolio and app as a cohesive publication.',
  },
];

export const GHUM_NOVEL_STORY = {
  title: 'ঘুম (Ghum)',
  subtitle: 'মধ্যবিত্ত জীবনের এক জেগে থাকার উপন্যাস',
  tagline: '“ঘুম” কোনো নিদ্রার গল্প নয়—এটা জেগে থাকার গল্প।',
  premise:
    'এই কাহিনী কোনো বীরত্বের নয়, কোনো অশ্রুরও নয়। এটা সেই মধ্যবিত্ত জীবনের গল্প—যেখানে ঘাম, হাসি, চা, আর ভাড়াবাসার ছাদের নরম বাতাসে জেগে থাকে মানুষ, যাদের স্বপ্নের দাম হিসেব হয় টিউশন ফি আর গ্যাস বিলের মতো।',
  themeStatement:
    'এ গল্প কষ্টের নয়—এটা বাস্তবতার উষ্ণ রঙে আঁকা। এখানে বেদনা আছে, কিন্তু সেটা শেখায়; এখানে ভালোবাসা আছে, কিন্তু দাবি করে না; এখানে স্বপ্ন আছে, কিন্তু হালকা এক নিঃশ্বাসের মতো—চলে যায়, আবার ফিরে আসে। একজন সাধারণ ছেলের চোখ দিয়ে দেখা জীবন, যেখানে মধ্যবিত্ত মানে হার মানা নয়, বরং ধৈর্যের নাম।',
  dailyLife: [
    'ভোরে ঘুম ভাঙে না—ঘুম তার কাছে বিলাসিতা।',
    'কলেজে ক্লাস, তারপর আড্ডা, তারপর মেসে ফিরে একা সময় কাটানো। বাইরের কোলাহল ওর ভেতরের নীরবতা ভাঙতে পারে না।',
    'রাতে বিছানায় শুয়ে ফোন স্ক্রল করে, তারপর নিজের লেখা গল্প পড়ে—যেখানে চরিত্ররা তার মতোই মাঝরাতে বৃষ্টি শোনে।',
  ],
  protagonist: {
    name: 'জাশেদ',
    meta: 'বয়স: ২০ · উচ্চতা: ৫’১০” · কম্পিউটার ইঞ্জিনিয়ারিং ছাত্র',
    personality:
      'ভদ্র, নীরব, তবু গভীরভাবে পর্যবেক্ষণশীল। সে বেশি কথা বলে না, কিন্তু কথা বললে সবাই শোনে। একাকী, চিন্তাশীল, রাতজাগা—মাঝে মাঝে জানালার পাশে বসে বৃষ্টি দেখে ঘুমিয়ে পড়ে।',
    hobbies: 'গল্প-উপন্যাস পড়া, পুরনো গান শোনা, এবং মাঝে মাঝে ক্রিকেট বা ফুটবলের স্মৃতি মনে করা।',
    backstory:
      'গ্রামের স্কুলে ছিল তার প্রথম যুদ্ধক্ষেত্র—দুষ্টুমি, খেলার মাঠ, আর হাসির ঝিলিক। ক্লাস ফাইভে পায় তার প্রথম নীল রঙের পুরনো সাইকেল, যা তার স্বাধীনতার প্রতীক ছিল। ক্লাস টেনে GPA-5 পেয়ে সবাইকে অবাক করে শুরু হয় শহরমুখী জীবনের অধ্যায়।',
    present:
      'শহরে থাকে ভাড়া বাসায়—চারজন বন্ধুর সঙ্গে ছোট্ট একটা মেসে। দিন শুরু হয় চায়ের কাপে, শেষ হয় আলো নিভে যাওয়া ব্যালকনিতে। ভেতরে এক অদ্ভুত নিঃসঙ্গতা আছে—যেন ঘুম থেকে উঠেও পুরোপুরি জেগে উঠতে পারে না।',
  },
  family: [
    {
      role: 'বাবা',
      name: 'জসিম উদ্দিন',
      summary:
        'শৈশবেই মা হারিয়েছেন। চাষের মাঠ, সংসারের দায়িত্ব আর স্কুলের খাতা—সব কিছু মিলিয়ে বেড়ে উঠেছিলেন কষ্টের আগুনে। ডাক্তার হতে চেয়েছিলেন, কিন্তু ভাগ্য থামিয়েছে কলেজের দরজায়। আজ তিনি একজন সাধারণ ফার্মেসি মালিক—কিন্তু সন্তানের চোখে তিনি এক নায়ক।',
      quote: '“ছেলে আগে, বই পরে। জ্বর এলে কেউ খাতা পড়ে না।”',
      note: 'বিশ্বাস: “ছেলের প্রতি রাগ করলে ঈশ্বর রেগে যান।”',
    },
    {
      role: 'মা',
      name: 'কামরুন নাহার',
      summary:
        'গৃহিণী, কিন্তু মনের দিক থেকে তিনি এক যোদ্ধা। সংসার সামলে, স্বামীর দোকান দেখা, ছেলেকে পড়ানো—সবকিছুতেই এক ছন্দ। তিনি জানেন, দারিদ্র্য মানে শুধু অর্থের অভাব নয়, ভালোবাসারও ঘাটতি।',
      quote: '“মানুষ আগে, সফলতা পরে।”',
      note: 'সংসারের প্রতিটি মুহূর্তের নীরব শক্তি।',
    },
    {
      role: 'ছোট ভাই',
      name: 'জিহান',
      summary:
        'চঞ্চল, হাসিখুশি, মাঝে মাঝে ভাইয়ের ফোনে গেম খেলে লুকিয়ে। জাশেদের ছায়া হয়ে ঘুরে বেড়ায়, যেন ছোটবেলার জাশেদকেই প্রতিফলিত করে।',
      quote: 'শৈশবের প্রাণবন্ত ছায়া।',
      note: 'পারিবারিক বন্ধনের উষ্ণতা।',
    },
  ],
  friendships: [
    {
      group: 'শহরের বন্ধু',
      names: ['ওয়াকিল', 'আব্দুল্লাহ', 'সুহিম'],
      description:
        'তারা একসাথে চা খায়, বিকেলের রাস্তায় হাঁটে, ‘মিকচার’ খেয়ে পৃথিবীর রাজনীতি আলোচনা করে—মেস জীবনের প্রতিটি সন্ধ্যা ও ব্যালকনির সঙ্গী।',
    },
    {
      group: 'গ্রামের বন্ধু',
      names: ['কিষান', 'অন্তু', 'রবি'],
      description:
        'পুরনো খেলার মাঠ, ধুলো, নীল সাইকেলের দৌড়, আর নদীর ধারে বসা—সব স্মৃতির অংশ। তাদের কথা ভাবলেই জাশেদের চোখে ফিরে আসে কিশোর বয়সের হাসি।',
    },
  ],
};

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 'step-fundamentals',
    phase: 'Stage 01',
    period: 'Foundation',
    title: 'Computer Science & Programming Fundamentals',
    context: 'Chittagong Polytechnic Institute · CST',
    category: 'Academic Core',
    summary:
      'Began exploring how software works beneath the surface—learning core syntax, object-oriented principles in Java and Python, and structured web design.',
    outcome: 'Built TriCode Nexus Calculator & Web Design-II layouts',
    details:
      'Focused on understanding logic, clean component structure, and collaborative problem solving with classmates.',
  },
  {
    id: 'step-systems',
    phase: 'Stage 02',
    period: 'Systems & Data',
    title: 'Database-Driven Applications & Product Blueprints',
    context: 'Full-Stack & Business Software',
    category: 'Architecture',
    summary:
      'Moved beyond isolated scripts to design full application workflows—authentication, role-based access, inventory ledgers, and pharmacy stock validation.',
    outcome: 'Delivered StockPilot Phase 1 in Django & built Medicine Center UI',
    details:
      'Learned how relational databases, backend routes, and dark administrative dashboards work together as cohesive products.',
  },
  {
    id: 'step-ai-android',
    phase: 'Stage 03',
    period: 'Intelligent Systems',
    title: 'Exploring AI, Computer Vision & Android Ecosystems',
    context: 'Independent Research',
    category: 'AI & Mobile',
    summary:
      'Combined personal passions for manga, music, and OS design with technical research into PaddleOCR, YOLOv8, ONNX Runtime, Jetpack Compose, and Nothing OS-inspired workflows.',
    outcome: 'Prototyped PanelFlow AI, panelcolour, NOVA Canvas & Liquid Morph',
    details:
      'Focused on bridging theoretical AI models with human-centered mobile interfaces and accessibility.',
  },
  {
    id: 'step-next-chapter',
    phase: 'Stage 04',
    period: '2026 & Beyond',
    title: 'The Next Chapter: Shipping Tested, Public Software',
    context: 'Independent Developer & Founder',
    category: 'Roadmap',
    summary:
      'Turning architectural concepts into complete, tested, and publicly documented repositories on GitHub while refining interactive React and creative web craft.',
    outcome: 'Transitioning prototypes into verified open-source releases',
    details:
      'Goal: Take ideas from initial problem discovery all the way to polished, reliable digital products.',
  },
];

export const PERSONAL_GALLERY: PersonalWorkItem[] = [
  {
    id: 'work-01',
    index: 'Study 01',
    title: 'PanelFlow Bubble Vector Field',
    medium: 'HTML5 Canvas · Spatial OCR Study',
    year: '2026',
    dimensions: '1200 × 1500 px',
    description:
      'Directional vector gradients inspired by automated manga panel scanning and dialogue flow orientation.',
    sketchType: 'flow-field',
    palette: ['#0B0D14', '#2563EB', '#60A5FA'],
    columnShift: 'slow',
  },
  {
    id: 'work-02',
    index: 'Study 02',
    title: 'NOVA Glyph Orbital Resonance',
    medium: 'Generative Canvas · OS Ring Study',
    year: '2026',
    dimensions: '1200 × 1200 px',
    description:
      'Concentric harmonic rings echoing minimalist hardware glyph notifications and modular widget timing.',
    sketchType: 'orbital-harmonics',
    palette: ['#101423', '#38BDF8', '#E0F2FE'],
    columnShift: 'fast',
  },
  {
    id: 'work-03',
    index: 'Study 03',
    title: 'TriCode Nexus Ratio Grid',
    medium: 'Generative Layout · #2C666E Study',
    year: '2026',
    dimensions: '1200 × 1500 px',
    description:
      'Architectural geometric grid built directly around the custom #2C666E and #F0EDEE palette of TriCode Nexus.',
    sketchType: 'bauhaus-grid',
    palette: ['#F0EDEE', '#2C666E', '#14161F'],
    columnShift: 'medium',
  },
  {
    id: 'work-04',
    index: 'Study 04',
    title: 'ঘুম — Nocturne Wave Monograph',
    medium: 'Canvas Spline · Narrative Study',
    year: '2026',
    dimensions: '1200 × 1350 px',
    description:
      'Quiet layered midnight contours inspired by the emotional atmosphere and reflection of my Bengali novel draft ঘুম.',
    sketchType: 'topographic-wave',
    palette: ['#0B0D14', '#38BDF8', '#94A3B8'],
    columnShift: 'slow',
  },
  {
    id: 'work-05',
    index: 'Study 05',
    title: 'Recursive Architecture Canopy',
    medium: 'L-System Fractal · System Tree',
    year: '2025',
    dimensions: '1200 × 1400 px',
    description:
      'Branching structural study illustrating how foundational CS logic expands into modular applications.',
    sketchType: 'recursive-tree',
    palette: ['#F8FAFC', '#1E293B', '#2563EB'],
    columnShift: 'fast',
  },
  {
    id: 'work-06',
    index: 'Study 06',
    title: 'Liquid Morph Acoustic Matrix',
    medium: 'Interactive Grid · Bass Interference',
    year: '2026',
    dimensions: '1200 × 1200 px',
    description:
      'Radial wave modulation study exploring bass-reactive visual rhythms for the Liquid Morph Music Player.',
    sketchType: 'kinetic-type',
    palette: ['#0F172A', '#2563EB', '#E2E8F0'],
    columnShift: 'medium',
  },
];
