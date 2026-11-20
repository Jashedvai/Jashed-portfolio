import { JASHED_PROFILE } from '../data/portfolioData';

export type ResumeTrack = 'general' | 'fullstack' | 'mobile-ai';

export interface ResumeProjectItem {
  id: string;
  title: string;
  roleTag: string;
  stage: string;
  stack: string;
  bullets: string[];
}

export interface ResumeData {
  track: ResumeTrack;
  trackLabel: string;
  headline: string;
  availability: string;
  location: string;
  summary: string;
  competencies: { category: string; items: string }[];
  featuredProjects: ResumeProjectItem[];
  additionalBuilds: { title: string; stack: string; detail: string }[];
  education: {
    degree: string;
    institution: string;
    location: string;
    meta: string;
    coursework: string[];
  };
  differentiators: { title: string; detail: string }[];
}

const ALL_RESUME_PROJECTS: Record<string, ResumeProjectItem> = {
  panelflow: {
    id: 'panelflow-ai',
    title: 'PanelFlow AI — AI-Powered Manga Reading Assistant',
    roleTag: 'Sole Architect & Mobile Prototype Lead',
    stage: 'V8 UI Prototype & Pipeline Architecture',
    stack: 'Kotlin, Jetpack Compose, YOLOv8, PaddleOCR, ONNX Runtime, OpenCV',
    bullets: [
      'Architected an end-to-end Android reading assistant featuring a dark Command Center with one-tap AccessibilityService and Floating Overlay controls.',
      'Designed multi-format chapter ingestion supporting device Gallery images, PDF documents, and TXT files with organized My Library history.',
      'Specified an offline-first inference pipeline combining YOLOv8n speech-bubble localization, reading-order sorting (manga/webtoon), PaddleOCR extraction, and ONNX Runtime TTS.',
    ],
  },
  stockpilot: {
    id: 'stockpilot',
    title: 'StockPilot — Inventory & Business Management Platform',
    roleTag: 'Full-Stack Developer',
    stage: 'Phase 1 Codebase Delivered',
    stack: 'Python, Django, SQLite, MySQL, HTML5, CSS3, JavaScript',
    bullets: [
      'Delivered Phase 1 Django backend foundation implementing secure user authentication, profile views, and role-based access scaffolding for retail operations.',
      'Engineered a dark executive management cockpit structuring product catalog, vendor purchase, customer sales, and low-stock monitoring modules.',
      'Designed relational schemas structured for seamless transition from SQLite in local development to MySQL for multi-module production ledgers.',
    ],
  },
  medicine: {
    id: 'medicine-center',
    title: 'Sahen Sah J.H. Medicine Center — Pharmacy Tally & Inventory App',
    roleTag: 'Product Engineer & Android UI Developer',
    stage: 'Working UI & Analytics Prototype',
    stack: 'Kotlin, Android, SQLite, MPAndroidChart',
    bullets: [
      'Built an offline-first pharmacy operations app tailored to real daily counter workflows at Harinadighi, replacing manual paper tally notebooks.',
      'Implemented live financial KPI cards (Total Sales, Total Profit, Avg Margin, Receivable Due) paired with a 7-Day Performance bar graph via MPAndroidChart.',
      'Crafted a high-speed bilingual Bengali/English 6-tab counter navigation system covering Tally, Cashbox, Expenses, Billing, Customers, and Calculator.',
    ],
  },
  nova: {
    id: 'nova-os',
    title: 'NOVA Canvas Studio — OS-Inspired Personalisation Engine',
    roleTag: 'Cross-Platform UI & State Architect',
    stage: 'Interactive Prototype',
    stack: 'Flutter, Dart, Riverpod, Supabase, FastAPI',
    bullets: [
      'Built an interactive live mobile lock-screen canvas displaying real-time clock typography, weather, step telemetry, calendar events, and notification cards.',
      'Engineered one-tap aesthetic preset switching across four system visual languages (Nothing dot-matrix, Cupertino frosted glass, One UI, and Ember).',
      'Structured four modular theme editors (Theme, Canvas, Icons, Lock) with undo/redo state history and planned Riverpod + Supabase synchronization.',
    ],
  },
  panelcolour: {
    id: 'ai-manga-colorizer',
    title: 'panelcolour — Linework-Preserving AI Manga Colorizer',
    roleTag: 'Computer Vision & Studio UI Designer',
    stage: 'UI Prototype & Vision Concept',
    stack: 'Python, OpenCV, Android UI',
    bullets: [
      'Designed a creator studio organizing black-and-white panels by chapter with clear Line Art Only vs. Colored status tracking.',
      'Architected an OpenCV edge-masking approach to isolate crisp ink strokes and screentones prior to style synthesis.',
      'Specified Natural Painterly and Anime Cel Shading modes alongside character palette locking for cross-panel visual consistency.',
    ],
  },
  liquidmorph: {
    id: 'liquid-morph-player',
    title: 'Liquid Morph Music Player — Real-Time Bass FFT Visualizer',
    roleTag: 'Android & Audio Visualization Developer',
    stage: 'Interactive UI & Starter Build',
    stack: 'Kotlin, Jetpack Compose, Android Media3, FFT Audio',
    bullets: [
      'Integrated Android Media3 ExoPlayer audio sessions with real-time Fast Fourier Transform (FFT) sub-bass frequency extraction (20-160 Hz).',
      'Developed four switchable visual shader modes (LIQUID, FLOW, 3D, WAVE) driven by a live 0-100% Bass Energy reaction slider.',
      'Enabled seamless playback from both local device storage (+ ADD SONGS) and direct online audio stream URLs.',
    ],
  },
};

const TRACK_CONFIG: Record<
  ResumeTrack,
  {
    label: string;
    headline: string;
    summary: string;
    projectOrder: (keyof typeof ALL_RESUME_PROJECTS)[];
    competencies: { category: string; items: string }[];
  }
> = {
  general: {
    label: 'All-Round Software Engineer',
    headline: 'Software Engineer | Full-Stack Web, Android (Kotlin) & Applied AI Builder',
    summary:
      'Computer Science & Technology (CST) builder with proven hands-on ownership across Django/React full-stack systems, native Android (Kotlin/Jetpack Compose), and applied computer vision pipelines. Combines structured relational architecture and real-world business ergonomics with high-craft interactive interfaces.',
    projectOrder: ['panelflow', 'stockpilot', 'medicine', 'nova', 'panelcolour', 'liquidmorph'],
    competencies: [
      {
        category: 'Languages',
        items: 'Kotlin, Python, Java, TypeScript, JavaScript, Dart, SQL, HTML5, CSS3',
      },
      {
        category: 'Web & Cross-Platform',
        items: 'React, Django, Flutter, Riverpod, Tailwind CSS, Three.js, Framer Motion',
      },
      {
        category: 'Mobile & Applied AI',
        items: 'Jetpack Compose, Android Media3, YOLOv8, PaddleOCR, ONNX Runtime, OpenCV',
      },
      {
        category: 'Databases & Architecture',
        items: 'SQLite, MySQL, Supabase, FastAPI, Role-Based Auth, Offline-First Design',
      },
    ],
  },
  fullstack: {
    label: 'Full-Stack & Backend Engineer',
    headline: 'Full-Stack Software Engineer | Python, Django, React, TypeScript & Relational Data',
    summary:
      'Product-minded Computer Science & Technology engineer experienced in designing database-driven web platforms, role-based authentication, and responsive React/TypeScript interfaces. Focused on shipping maintainable architectures from relational schema modeling to low-latency frontend execution.',
    projectOrder: ['stockpilot', 'medicine', 'nova', 'panelflow', 'panelcolour', 'liquidmorph'],
    competencies: [
      {
        category: 'Backend & APIs',
        items: 'Python, Django, FastAPI, Supabase, Java SE, Role-Based Auth, REST Architecture',
      },
      {
        category: 'Frontend Engineering',
        items: 'React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Three.js, Framer Motion',
      },
      {
        category: 'Databases & Data Flow',
        items: 'MySQL, SQLite, Relational Schema Design, Offline-First Tally & Sync Architecture',
      },
      {
        category: 'Mobile & Ecosystem',
        items: 'Kotlin, Jetpack Compose, Flutter, Dart, Riverpod, Git Workflows',
      },
    ],
  },
  'mobile-ai': {
    label: 'Android & Applied AI Engineer',
    headline: 'Android & Applied AI Engineer | Kotlin, Jetpack Compose, Computer Vision & Edge Inference',
    summary:
      'Computer Science & Technology builder specializing in mobile-first product architecture, Android system overlays, real-time audio/vision processing, and assistive workflows. Experienced in scoping on-device YOLOv8, PaddleOCR, ONNX Runtime, and Media3 pipelines inside clean Jetpack Compose & Flutter interfaces.',
    projectOrder: ['panelflow', 'medicine', 'liquidmorph', 'panelcolour', 'nova', 'stockpilot'],
    competencies: [
      {
        category: 'Mobile Engineering',
        items: 'Kotlin, Jetpack Compose, Android Media3, AccessibilityService, Flutter, Dart, Riverpod',
      },
      {
        category: 'Applied AI & Vision',
        items: 'YOLOv8, PaddleOCR, ONNX Runtime, OpenCV, Edge Inference, FFT Audio Analysis',
      },
      {
        category: 'Backend & Persistence',
        items: 'SQLite (Offline-First), Python, Django, FastAPI, Supabase, MySQL',
      },
      {
        category: 'Web & Design Systems',
        items: 'React, TypeScript, Glassmorphism Systems, Interactive 3D & Motion Prototyping',
      },
    ],
  },
};

export function getStructuredResumeData(track: ResumeTrack = 'general'): ResumeData {
  const cfg = TRACK_CONFIG[track];
  return {
    track,
    trackLabel: cfg.label,
    headline: cfg.headline,
    availability: 'Open to Software Engineering Internships, Junior Engineer & Product Builder Roles',
    location: 'Chittagong, Bangladesh (Remote & On-Site Ready)',
    summary: cfg.summary,
    competencies: cfg.competencies,
    featuredProjects: cfg.projectOrder.map((key) => ALL_RESUME_PROJECTS[key]),
    additionalBuilds: [
      {
        title: 'TriCode Nexus Calculator (Academic Team Build)',
        stack: 'Java SE, Swing, Custom Architectural UI',
        detail:
          'Co-engineered a scientific calculator in a 3-member CST team, decoupling the trigonometry/expression evaluation engine from an Apple-inspired #2C666E / #F0EDEE keypad.',
      },
      {
        title: 'CPITimeline — 7-Department Polytechnic Portal',
        stack: 'React, JavaScript, HTML5, CSS3, Bengali UI',
        detail:
          'Designed an accessible Bengali-first campus news and academic routine portal indexing updates across all 7 Chittagong Polytechnic Institute engineering departments.',
      },
      {
        title: 'Applied Systems & Hardware Prototypes',
        stack: 'Systems R&D · TallyKatha · Remote Mouse Controller · AuraOS',
        detail:
          'Prototyped an offline-first multi-branch accounting ledger blueprint (TallyKatha), an Android-to-Desktop wireless HID utility (Wi-Fi/Bluetooth), and focus analytics studies.',
      },
    ],
    education: {
      degree: 'Diploma in Computer Science & Technology (CST)',
      institution: JASHED_PROFILE.institution,
      location: 'Chittagong, Bangladesh',
      meta: `Student Roll: ${JASHED_PROFILE.roll} | Active Academic & Independent Engineering Track`,
      coursework: [
        'Object-Oriented Programming (Java & Python)',
        'Relational Database Management (SQLite / MySQL)',
        'Web Design & Full-Stack Development (HTML/CSS/JS, Django, React)',
        'Mobile Application Architecture & System Interfaces',
      ],
    },
    differentiators: [
      {
        title: 'End-to-End Product Ownership',
        detail:
          'Capable of taking an ambiguous problem—from observing daily pharmacy counter bottlenecks to writing relational schemas, API routes, and polished UI—to concrete deliverables.',
      },
      {
        title: 'Transparent Engineering Rigor',
        detail:
          'Separates delivered codebases (StockPilot Phase 1, TriCode Nexus, Medicine Center UI) from active AI/mobile research prototypes with clear technical roadmaps.',
      },
      {
        title: 'Human-Centered & Bilingual Craft',
        detail:
          'Combines accessibility-first AI workflows (OCR/TTS overlays) and Bengali counter ergonomics with interactive Three.js 3D, React motion, and literary discipline (Ghum).',
      },
    ],
  };
}

export function formatPlainTextResume(track: ResumeTrack = 'general'): string {
  const data = getStructuredResumeData(track);
  const lines: string[] = [
    JASHED_PROFILE.name.toUpperCase(),
    data.headline,
    `${data.location} | ${JASHED_PROFILE.email} | ${data.education.institution} (Roll ${JASHED_PROFILE.roll})`,
    data.availability,
    '',
    'EXECUTIVE SUMMARY',
    data.summary,
    '',
    'TECHNICAL COMPETENCIES',
    ...data.competencies.map((c) => `- ${c.category}: ${c.items}`),
    '',
    'KEY ENGINEERING & PRODUCT PROJECTS',
  ];

  for (const proj of data.featuredProjects) {
    lines.push(`${proj.title} | ${proj.stage}`);
    lines.push(`Role: ${proj.roleTag} | Stack: ${proj.stack}`);
    for (const b of proj.bullets) {
      lines.push(`  * ${b}`);
    }
    lines.push('');
  }

  lines.push('COLLABORATIVE & PLATFORM BUILDS');
  for (const extra of data.additionalBuilds) {
    lines.push(`- ${extra.title} (${extra.stack}): ${extra.detail}`);
  }
  lines.push('');
  lines.push('EDUCATION');
  lines.push(`${data.education.degree} — ${data.education.institution}`);
  lines.push(data.education.meta);
  lines.push(`Relevant Coursework: ${data.education.coursework.join(', ')}`);
  lines.push('');
  lines.push('DIFFERENTIATORS & LEADERSHIP');
  for (const diff of data.differentiators) {
    lines.push(`- ${diff.title}: ${diff.detail}`);
  }

  return lines.join('\n');
}

function sanitizePdfText(input: string): string {
  return input
    .replace(/—/g, '-')
    .replace(/–/g, '-')
    .replace(/·/g, '|')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/৳/g, 'Tk ')
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .trim();
}

function wrapText(text: string, maxChars: number): string[] {
  const clean = sanitizePdfText(text);
  const words = clean.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    if (!current) {
      current = word;
    } else if (current.length + 1 + word.length <= maxChars) {
      current += ` ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

interface PdfPageBuffer {
  ops: string[];
  annots: { rect: [number, number, number, number]; uri: string }[];
  y: number;
}

function buildResumePdfBlob(track: ResumeTrack = 'general'): Blob {
  const data = getStructuredResumeData(track);

  const PAGE_W = 612;
  const PAGE_H = 792;
  const LEFT = 46;
  const RIGHT = 566;
  const BOTTOM_LIMIT = 56;

  const pages: PdfPageBuffer[] = [];

  const startNewPage = (isFirstPage: boolean): PdfPageBuffer => {
    const ops: string[] = [];
    if (isFirstPage) {
      // Crisp top executive accent stripe (Burnished Espresso & Copper line)
      ops.push(`0.14 0.07 0.03 rg 0 ${PAGE_H - 8} ${PAGE_W} 8 re f`);
      ops.push(`0.60 0.35 0.18 rg 0 ${PAGE_H - 10} ${PAGE_W} 2 re f`);
    } else {
      // Subtle continuation header bar on page 2+
      ops.push(`0.60 0.35 0.18 rg 0 ${PAGE_H - 6} ${PAGE_W} 6 re f`);
      ops.push(
        `BT /F2 8 Tf 0.48 0.29 0.19 rg 1 0 0 1 ${LEFT} ${PAGE_H - 30} Tm (${sanitizePdfText(
          `${JASHED_PROFILE.name.toUpperCase()}  |  CURRICULUM VITAE  |  ${data.trackLabel.toUpperCase()}`
        )}) Tj ET`
      );
      ops.push(`0.83 0.60 0.42 RG 0.5 w ${LEFT} ${PAGE_H - 38} m ${RIGHT} ${PAGE_H - 38} l S`);
    }

    const page: PdfPageBuffer = {
      ops,
      annots: [],
      y: isFirstPage ? PAGE_H - 38 : PAGE_H - 58,
    };
    pages.push(page);
    return page;
  };

  let currentPage = startNewPage(true);

  const ensureSpace = (neededHeight: number) => {
    if (currentPage.y - neededHeight < BOTTOM_LIMIT) {
      currentPage = startNewPage(false);
    }
  };

  const addLine = (
    text: string,
    options?: {
      font?: 'F1' | 'F2';
      size?: number;
      gap?: number;
      colorRgb?: string;
      indent?: number;
      rightLabel?: string;
      rightColorRgb?: string;
    }
  ) => {
    const font = options?.font ?? 'F1';
    const size = options?.size ?? 9.5;
    const gap = options?.gap ?? 12.5;
    const color = options?.colorRgb ?? '0.20 0.11 0.06';
    const x = LEFT + (options?.indent ?? 0);

    ensureSpace(gap + 2);
    currentPage.ops.push(
      `BT /${font} ${size} Tf ${color} rg 1 0 0 1 ${x} ${currentPage.y} Tm (${sanitizePdfText(text)}) Tj ET`
    );

    if (options?.rightLabel) {
      const cleanRight = sanitizePdfText(options.rightLabel);
      const approxWidth = cleanRight.length * (size * 0.47);
      const rx = Math.max(x + 180, RIGHT - approxWidth);
      const rColor = options.rightColorRgb ?? '0.60 0.35 0.18';
      currentPage.ops.push(
        `BT /F1 ${Math.max(8, size - 1)} Tf ${rColor} rg 1 0 0 1 ${rx.toFixed(1)} ${
          currentPage.y
        } Tm (${cleanRight}) Tj ET`
      );
    }

    currentPage.y -= gap;
  };

  const addSectionHeading = (title: string) => {
    ensureSpace(32);
    currentPage.y -= 4;
    currentPage.ops.push(
      `BT /F2 9.5 Tf 0.60 0.35 0.18 rg 1 0 0 1 ${LEFT} ${currentPage.y} Tm (${sanitizePdfText(
        title
      )}) Tj ET`
    );
    currentPage.y -= 5;
    currentPage.ops.push(`0.82 0.60 0.42 RG 0.85 w ${LEFT} ${currentPage.y} m ${RIGHT} ${currentPage.y} l S`);
    currentPage.y -= 13;
  };

  // --- PAGE 1 HEADER ---
  addLine(JASHED_PROFILE.name.toUpperCase(), {
    font: 'F2',
    size: 19,
    gap: 20,
    colorRgb: '0.14 0.07 0.03',
  });
  addLine(data.headline, {
    font: 'F2',
    size: 10.5,
    gap: 14,
    colorRgb: '0.60 0.35 0.18',
  });

  // Contact line + clickable mailto annotation
  const contactY = currentPage.y;
  addLine(
    `${data.location}  |  ${JASHED_PROFILE.email}  |  ${JASHED_PROFILE.institution} (Roll ${JASHED_PROFILE.roll})`,
    { size: 8.6, gap: 12, colorRgb: '0.32 0.19 0.12' }
  );
  // Register clickable mailto bounding box cleanly around email area
  currentPage.annots.push({
    rect: [LEFT + 190, contactY - 3, LEFT + 320, contactY + 10],
    uri: `mailto:${JASHED_PROFILE.email}`,
  });

  addLine(data.availability, {
    font: 'F2',
    size: 8.5,
    gap: 14,
    colorRgb: '0.36 0.20 0.12',
  });

  // --- EXECUTIVE SUMMARY ---
  addSectionHeading('EXECUTIVE SUMMARY');
  for (const line of wrapText(data.summary, 96)) {
    addLine(line, { size: 9.2, gap: 12.2, colorRgb: '0.20 0.11 0.06' });
  }
  currentPage.y -= 2;

  // --- TECHNICAL COMPETENCIES ---
  addSectionHeading('TECHNICAL COMPETENCIES');
  for (const comp of data.competencies) {
    const wrapped = wrapText(`${comp.category}: ${comp.items}`, 96);
    wrapped.forEach((line, idx) => {
      if (idx === 0) {
        const colonIdx = line.indexOf(':');
        if (colonIdx !== -1) {
          const catPart = line.slice(0, colonIdx + 1);
          const restPart = line.slice(colonIdx + 1).trim();
          ensureSpace(13);
          currentPage.ops.push(
            `BT /F2 9 Tf 0.24 0.12 0.06 rg 1 0 0 1 ${LEFT} ${currentPage.y} Tm (${sanitizePdfText(
              catPart
            )}) Tj ET`
          );
          const offset = Math.max(122, catPart.length * 5.2 + 8);
          currentPage.ops.push(
            `BT /F1 9 Tf 0.26 0.15 0.09 rg 1 0 0 1 ${LEFT + offset} ${
              currentPage.y
            } Tm (${sanitizePdfText(restPart)}) Tj ET`
          );
          currentPage.y -= 12.5;
          return;
        }
      }
      addLine(line, { size: 9, gap: 12, indent: 122, colorRgb: '0.26 0.15 0.09' });
    });
  }

  // --- KEY ENGINEERING & PRODUCT PROJECTS ---
  addSectionHeading('KEY ENGINEERING & PRODUCT PROJECTS');
  for (const proj of data.featuredProjects) {
    // Keep project header + stack + first bullet together
    ensureSpace(46);
    addLine(proj.title, {
      font: 'F2',
      size: 9.8,
      gap: 11.5,
      colorRgb: '0.14 0.07 0.03',
      rightLabel: proj.stage,
      rightColorRgb: '0.60 0.35 0.18',
    });
    addLine(`${proj.roleTag}  |  Stack: ${proj.stack}`, {
      font: 'F1',
      size: 8.3,
      gap: 11.5,
      colorRgb: '0.48 0.29 0.19',
    });

    for (const bullet of proj.bullets) {
      const bLines = wrapText(bullet, 91);
      bLines.forEach((line, idx) => {
        addLine(idx === 0 ? `- ${line}` : line, {
          size: 8.7,
          gap: 11.2,
          indent: idx === 0 ? 8 : 16,
          colorRgb: '0.22 0.12 0.07',
        });
      });
    }
    currentPage.y -= 5;
  }

  // --- COLLABORATIVE & PLATFORM BUILDS ---
  addSectionHeading('COLLABORATIVE & PLATFORM BUILDS');
  for (const extra of data.additionalBuilds) {
    ensureSpace(30);
    addLine(extra.title, {
      font: 'F2',
      size: 9.3,
      gap: 11.5,
      colorRgb: '0.14 0.07 0.03',
      rightLabel: extra.stack,
    });
    for (const line of wrapText(extra.detail, 92)) {
      addLine(line, { size: 8.7, gap: 11.2, indent: 8, colorRgb: '0.26 0.15 0.09' });
    }
    currentPage.y -= 3;
  }

  // --- EDUCATION ---
  addSectionHeading('EDUCATION & TECHNICAL FOUNDATION');
  ensureSpace(48);
  addLine(data.education.degree, {
    font: 'F2',
    size: 9.8,
    gap: 12,
    colorRgb: '0.14 0.07 0.03',
    rightLabel: data.education.location,
  });
  addLine(`${data.education.institution}  |  ${data.education.meta}`, {
    size: 8.8,
    gap: 12,
    colorRgb: '0.42 0.24 0.14',
  });
  for (const line of wrapText(`Core Coursework: ${data.education.coursework.join(' | ')}`, 94)) {
    addLine(line, { size: 8.7, gap: 11.5, indent: 8, colorRgb: '0.24 0.13 0.07' });
  }

  // --- ENGINEERING DIFFERENTIATORS ---
  addSectionHeading('ENGINEERING DIFFERENTIATORS & CREATIVE CRAFT');
  for (const diff of data.differentiators) {
    const lines = wrapText(`${diff.title}: ${diff.detail}`, 93);
    lines.forEach((line, idx) => {
      addLine(idx === 0 ? `- ${line}` : line, {
        font: idx === 0 ? 'F1' : 'F1',
        size: 8.8,
        gap: 11.5,
        indent: idx === 0 ? 6 : 14,
        colorRgb: '0.22 0.12 0.07',
      });
    });
    currentPage.y -= 2;
  }

  // Stamp clean footers across all generated pages
  const totalPages = pages.length;
  pages.forEach((page, index) => {
    page.ops.push(`0.85 0.72 0.62 RG 0.5 w ${LEFT} 38 m ${RIGHT} 38 l S`);
    page.ops.push(
      `BT /F1 7.8 Tf 0.48 0.29 0.19 rg 1 0 0 1 ${LEFT} 26 Tm (${sanitizePdfText(
        `${JASHED_PROFILE.name}  |  ${JASHED_PROFILE.email}  |  ${data.trackLabel}`
      )}) Tj ET`
    );
    const pageNumText = `Page ${index + 1} of ${totalPages}`;
    page.ops.push(
      `BT /F1 7.8 Tf 0.48 0.29 0.19 rg 1 0 0 1 ${RIGHT - 48} 26 Tm (${pageNumText}) Tj ET`
    );
  });

  // Assemble PDF 1.4 objects cleanly
  // Obj 1: Catalog
  // Obj 2: Pages
  // Obj 3: Font Helvetica
  // Obj 4: Font Helvetica-Bold
  // Then per page: [PageObj, ContentObj, ...AnnotObjs]
  const objects: string[] = [];
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  const pagesObjPlaceholderIndex = objects.length;
  objects.push(''); // placeholder for 2 0 obj
  objects.push('3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n');
  objects.push('4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n');

  let nextObjId = 5;
  const pageObjIds: number[] = [];

  for (const page of pages) {
    const pageId = nextObjId++;
    const contentId = nextObjId++;
    const annotIds: number[] = page.annots.map(() => nextObjId++);

    pageObjIds.push(pageId);

    const annotsEntry =
      annotIds.length > 0 ? `/Annots [${annotIds.map((id) => `${id} 0 R`).join(' ')}] ` : '';

    objects.push(
      `${pageId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> ${annotsEntry}/Contents ${contentId} 0 R >>\nendobj\n`
    );

    const stream = page.ops.join('\n');
    objects.push(
      `${contentId} 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n`
    );

    page.annots.forEach((annot, aIdx) => {
      const annotId = annotIds[aIdx];
      const [x1, y1, x2, y2] = annot.rect;
      objects.push(
        `${annotId} 0 obj\n<< /Type /Annot /Subtype /Link /Rect [${x1} ${y1} ${x2} ${y2}] /Border [0 0 0] /A << /S /URI /URI (${sanitizePdfText(
          annot.uri
        )}) >> >>\nendobj\n`
      );
    });
  }

  objects[pagesObjPlaceholderIndex] = `2 0 obj\n<< /Type /Pages /Kids [${pageObjIds
    .map((id) => `${id} 0 R`)
    .join(' ')}] /Count ${pageObjIds.length} >>\nendobj\n`;

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];
  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
}

export function downloadResumePdf(track: ResumeTrack = 'general'): void {
  const blob = buildResumePdfBlob(track);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const suffix =
    track === 'fullstack'
      ? '_FullStack'
      : track === 'mobile-ai'
      ? '_Android_AI'
      : '';
  link.download = `Md_Ahsanul_Haque_Jashed_CV${suffix}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
