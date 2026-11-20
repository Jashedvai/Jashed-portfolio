import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, Compass, Moon, Plus } from 'lucide-react';
import { GHUM_NOVEL_STORY } from '../data/portfolioData';
import { GhumStoryShowcase } from './GhumStoryShowcase';
import { playClickThock, playHoverTick } from '../utils/soundEffects';

interface GhumDetailPageProps {
  onBack: () => void;
}

export function GhumDetailPage({ onBack }: GhumDetailPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onBack]);

  const specs = [
    { label: 'ধরন · Format', value: 'পূর্ণাঙ্গ উপন্যাস · Literary Fiction' },
    { label: 'মূল চরিত্র · Protagonist', value: GHUM_NOVEL_STORY.protagonist.name },
    { label: 'পটভূমি · Setting', value: 'গ্রাম থেকে শহরের ভাড়াবাসার মেস' },
    { label: 'ভাষা · Language', value: 'বাংলা · Bengali Prose' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#fff1e8] text-[#3e1f0f] relative overflow-x-hidden"
    >
      {/* Warm Copper Ambient Depth Mesh + CAD Optical Dot Matrix */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden bg-cad-dots-light"
      >
        <div className="absolute -top-32 left-[-8%] w-[560px] h-[560px] rounded-full bg-radial from-[#d39a6a]/28 via-[#9a5a2e]/12 to-transparent blur-3xl" />
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-radial from-[#9a5a2e]/20 via-[#d39a6a]/12 to-transparent blur-3xl" />
      </div>

      {/* Frosted Copper Sticky Top Navigation */}
      <header className="sticky top-0 z-50 bg-[#fff1e8]/75 backdrop-blur-2xl border-b border-[#3e1f0f]/10">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <button
            type="button"
            onMouseEnter={playHoverTick}
            onClick={() => {
              playClickThock();
              onBack();
            }}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#3e1f0f] hover:text-[#9a5a2e] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-[#7A4B31] truncate">
            <span className="font-mono text-[#9a5a2e] font-semibold">01 · Literary Work</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-[#3e1f0f] truncate">
              {GHUM_NOVEL_STORY.title} ({GHUM_NOVEL_STORY.subtitle})
            </span>
          </div>

          <span className="hidden sm:inline-block font-mono text-xs text-[#9a5a2e] shrink-0">
            Jashed · Novel
          </span>
        </div>
      </header>

      <main className="relative z-10 max-w-[1200px] mx-auto px-6 py-12 lg:py-16 space-y-10">
        {/* Hero Overview Glass Panel */}
        <section className="relative rounded-3xl bg-white/55 backdrop-blur-2xl border border-[#d39a6a]/40 ring-1 ring-[#3e1f0f]/5 p-7 sm:p-10 shadow-[0_14px_45px_rgba(62,31,15,0.08)] space-y-6">
          <Plus aria-hidden="true" className="w-3 h-3 text-[#9a5a2e]/50 absolute top-4 left-4 pointer-events-none" />
          <Plus aria-hidden="true" className="w-3 h-3 text-[#9a5a2e]/50 absolute top-4 right-4 pointer-events-none" />
          <Plus aria-hidden="true" className="w-3 h-3 text-[#9a5a2e]/50 absolute bottom-4 left-4 pointer-events-none" />
          <Plus aria-hidden="true" className="w-3 h-3 text-[#9a5a2e]/50 absolute bottom-4 right-4 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#9a5a2e] font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Original Bengali Novel · Creative Writing</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#3e1f0f]">
                উপন্যাস: <span className="text-[#9a5a2e]">{GHUM_NOVEL_STORY.title}</span>{' '}
                <span className="text-2xl sm:text-3xl font-normal text-[#7A4B31]">
                  — {GHUM_NOVEL_STORY.subtitle}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#5C341F] leading-relaxed">
                {GHUM_NOVEL_STORY.premise}
              </p>

              <p className="inline-flex items-center gap-2 font-mono text-xs text-[#9a5a2e] font-medium pt-1">
                <Moon className="w-3.5 h-3.5" />
                <span>{GHUM_NOVEL_STORY.tagline}</span>
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {specs.map((spec, idx) => (
                <div
                  key={spec.label}
                  className="rounded-2xl bg-[#fff1e8]/80 backdrop-blur-lg border border-[#d39a6a]/35 px-4 py-3.5 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-mono text-[10px] text-[#9a5a2e] uppercase tracking-wider">
                      0{idx + 1} · {spec.label}
                    </p>
                    <p className="text-sm font-semibold text-[#3e1f0f] mt-0.5">{spec.value}</p>
                  </div>
                  <Compass className="w-4 h-4 text-[#d39a6a] shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full Interactive Ghum Story Dossier */}
        <GhumStoryShowcase />
      </main>
    </motion.div>
  );
}
