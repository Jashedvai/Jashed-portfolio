import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { DossierDirectoryEntry, DossierPageId } from '../types/navigation';
import { playClickThock, playHoverTick } from '../utils/soundEffects';

export const DOSSIER_ENTRIES: DossierDirectoryEntry[] = [
  {
    id: 'about',
    index: '01',
    title: 'About & Portrait Studio',
    category: 'Biography · 3D Photo Layers',
    summary: 'Background at Chittagong Polytechnic Institute, core engineering pillars, and interactive 3-layer portraits.',
    targetType: 'dossier',
  },
  {
    id: 'ghum',
    index: '02',
    title: 'ঘুম (Ghum) — Original Novel',
    category: 'Fiction · Character Dossier',
    summary: 'Full story backdrop, lead character profile of Jashed, and narrative motifs dedicated to middle-class dreams.',
    targetType: 'project',
  },
  {
    id: 'journey',
    index: '03',
    title: 'Journey & Academic Timeline',
    category: 'Milestones · Vision',
    summary: 'Chronological track from CST fundamentals in Bangladesh to independent AI and mobile architecture.',
    targetType: 'dossier',
  },
  {
    id: 'stack',
    index: '04',
    title: 'Technology Stack & Experimental Lab',
    category: 'Tools · Research Concepts',
    summary: 'Transparent skills matrix paired with 6 early product prototypes and hardware/UI explorations.',
    targetType: 'dossier',
  },
  {
    id: 'gallery',
    index: '05',
    title: 'Generative Gallery & Creative World',
    category: 'Visual Studies · Canvas',
    summary: 'Interactive generative canvas pieces, anime/manga storytelling influences, and fullscreen lightbox.',
    targetType: 'dossier',
  },
  {
    id: 'resume',
    index: '06',
    title: 'Executive CV & Role-Tailored Resume',
    category: 'Career Dossier · 2-Page PDF · ATS',
    summary: 'Switch role tracks (All-Round, Full-Stack, Android/AI), copy plain-text ATS copy, or export the 2-page PDF CV.',
    targetType: 'dossier',
  },
  {
    id: 'contact',
    index: '07',
    title: 'Connect & Direct Contact',
    category: 'Collaboration · Email',
    summary: 'Copy direct email, academic credentials, and send a project collaboration inquiry.',
    targetType: 'dossier',
  },
];

interface DossierDirectoryProps {
  onOpenDossier: (pageId: DossierPageId) => void;
  onOpenGhum: () => void;
}

export function DossierDirectory({ onOpenDossier, onOpenGhum }: DossierDirectoryProps) {
  return (
    <section
      id="dossiers"
      className="py-20 lg:py-28 bg-[#fff1e8] border-b border-[#3e1f0f]/10"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="font-mono text-xs text-[#9a5a2e] tracking-wide mb-3">
              02 · Files &amp; Dedicated Pages
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#3e1f0f] [text-wrap:balance]">
              Every <span className="text-[#9a5a2e]">dossier</span> and{' '}
              <span className="text-[#3e1f0f] underline decoration-[#d39a6a] decoration-2 underline-offset-4">
                important file
              </span>{' '}
              lives on its own clean page.
            </h2>
          </div>

          <p className="text-sm text-[#5C341F] max-w-sm">
            Select any file below to inspect it in a calm, distraction-free full-page view.
          </p>
        </div>

        {/* Clean Editorial Index List — Inspired by Minimalist Studio Directories */}
        <div className="border-t border-[#3e1f0f]/15">
          {DOSSIER_ENTRIES.map((entry, idx) => (
            <motion.button
              key={entry.id}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.35,
                delay: Math.min(idx * 0.04, 0.22),
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={playHoverTick}
              onClick={() => {
                playClickThock();
                if (entry.targetType === 'project') {
                  onOpenGhum();
                } else {
                  onOpenDossier(entry.id as DossierPageId);
                }
              }}
              className="group w-full text-left py-6 sm:py-7 border-b border-[#3e1f0f]/15 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center hover:bg-white/60 px-3 sm:px-5 -mx-3 sm:-mx-5 rounded-2xl transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9a5a2e]"
            >
              <div className="md:col-span-5 flex items-baseline gap-4 min-w-0">
                <span className="font-mono text-xs text-[#9a5a2e] tabular-nums shrink-0">
                  {entry.index}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#3e1f0f] group-hover:text-[#9a5a2e] transition-colors truncate">
                    {entry.title}
                  </h3>
                  <p className="font-mono text-[11px] text-[#7A4B31] mt-0.5">
                    {entry.category}
                  </p>
                </div>
              </div>

              <p className="md:col-span-5 text-xs sm:text-sm text-[#5C341F] leading-relaxed">
                {entry.summary}
              </p>

              <div className="md:col-span-2 flex items-center md:justify-end gap-1.5 text-xs font-semibold text-[#9a5a2e] group-hover:text-[#3e1f0f] transition-colors whitespace-nowrap shrink-0">
                <span>Open Page</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
