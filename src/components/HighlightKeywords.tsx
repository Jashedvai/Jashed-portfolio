import { Fragment } from 'react';

type HighlightTone = 'blue' | 'cyan' | 'indigo' | 'amber';

interface KeywordRule {
  pattern: RegExp;
  tone: HighlightTone;
}

const KEYWORD_RULES: KeywordRule[] = [
  {
    pattern:
      /\b(Independent Developer & Founder|digital experiences|PanelFlow AI|panelcolour|NOVA Canvas Studio|NOVA|StockPilot|Liquid Morph Music Player|Liquid Morph|TriCode Nexus Calculator|TriCode Nexus|CPITimeline|Sahen Sah J\.H\. Medicine Center)\b/g,
    tone: 'indigo',
  },
  {
    pattern:
      /\b(YOLOv8n?|PaddleOCR|ONNX Runtime|OpenCV|Jetpack Compose|Android Media3|FastAPI|Supabase|Riverpod|MPAndroidChart|PostgreSQL|MySQL|SQLite|Django|Kotlin|Flutter|Dart|Python|TypeScript|React|Java|OCR|TTS|FFT|AI|AGSL|OpenGL)\b/g,
    tone: 'cyan',
  },
  {
    pattern:
      /\b(Chittagong Polytechnic Institute|AccessibilityService|Accessibility|Floating Overlay|System Architecture|Offline-First|glassmorphism|frosted glass|Apple-style|Bilingual|Bengali|Harinadighi|real-world|futuristic|architecture|specifications|roadmap)\b/gi,
    tone: 'blue',
  },
  {
    pattern:
      /(ঘুম|\b(?:Phase [0-9]+|V8|99\.6%|100\.0%|120Hz|Total Sales|Total Profit|Avg Margin|Anime Cel Shading|Natural|Cupertino|Nothing|One UI|Ember)\b)/g,
    tone: 'amber',
  },
];

const LIGHT_TONE_CLASSES: Record<HighlightTone, string> = {
  blue: 'text-[#9a5a2e] font-semibold bg-[#9a5a2e]/[0.09] px-1 rounded-[4px]',
  cyan: 'text-[#7A411E] font-semibold bg-[#d39a6a]/[0.20] px-1 rounded-[4px]',
  indigo: 'text-[#3e1f0f] font-semibold bg-[#d39a6a]/[0.26] px-1 rounded-[4px]',
  amber: 'text-[#9a5a2e] font-semibold bg-[#fff1e8] border border-[#d39a6a]/45 px-1 rounded-[4px]',
};

const DARK_TONE_CLASSES: Record<HighlightTone, string> = {
  blue: 'text-[#d39a6a] font-semibold bg-[#d39a6a]/[0.16] px-1 rounded-[4px]',
  cyan: 'text-[#fff1e8] font-semibold bg-[#9a5a2e]/[0.45] px-1 rounded-[4px]',
  indigo: 'text-[#f0c7a4] font-semibold bg-[#d39a6a]/[0.18] px-1 rounded-[4px]',
  amber: 'text-[#fff1e8] font-semibold bg-[#9a5a2e]/[0.55] px-1 rounded-[4px]',
};

interface HighlightMatch {
  start: number;
  end: number;
  text: string;
  tone: HighlightTone;
}

interface HighlightKeywordsProps {
  text: string;
  variant?: 'light' | 'dark';
}

export function HighlightKeywords({ text, variant = 'light' }: HighlightKeywordsProps) {
  const matches: HighlightMatch[] = [];

  for (const rule of KEYWORD_RULES) {
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
    let m: RegExpExecArray | null;
    while ((m = regex.exec(text)) !== null) {
      if (m[0].length === 0) break;
      matches.push({
        start: m.index,
        end: m.index + m[0].length,
        text: m[0],
        tone: rule.tone,
      });
    }
  }

  // Sort by start offset, preferring longer matches on ties
  matches.sort((a, b) => a.start - b.start || b.end - a.end);

  // Filter out overlapping matches
  const nonOverlapping: HighlightMatch[] = [];
  let lastEnd = 0;
  for (const item of matches) {
    if (item.start >= lastEnd) {
      nonOverlapping.push(item);
      lastEnd = item.end;
    }
  }

  if (nonOverlapping.length === 0) {
    return <>{text}</>;
  }

  const toneClasses = variant === 'dark' ? DARK_TONE_CLASSES : LIGHT_TONE_CLASSES;
  const parts: Array<{ key: string; content: string; tone?: HighlightTone }> = [];
  let cursor = 0;

  nonOverlapping.forEach((m, idx) => {
    if (m.start > cursor) {
      parts.push({
        key: `txt-${idx}`,
        content: text.slice(cursor, m.start),
      });
    }
    parts.push({
      key: `hl-${idx}`,
      content: m.text,
      tone: m.tone,
    });
    cursor = m.end;
  });

  if (cursor < text.length) {
    parts.push({
      key: 'txt-end',
      content: text.slice(cursor),
    });
  }

  return (
    <>
      {parts.map((part) =>
        part.tone ? (
          <mark key={part.key} className={`${toneClasses[part.tone]} not-italic`}>
            {part.content}
          </mark>
        ) : (
          <Fragment key={part.key}>{part.content}</Fragment>
        )
      )}
    </>
  );
}
