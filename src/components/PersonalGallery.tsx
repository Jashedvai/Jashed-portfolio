import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'motion/react';
import {
  ArrowUpRight,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Pause,
  Play,
} from 'lucide-react';
import {
  CREATIVE_INTERESTS,
  GHUM_NOVEL_STORY,
  PERSONAL_GALLERY,
  PersonalWorkItem,
} from '../data/portfolioData';
import { GenerativeArtwork } from './GenerativeArtwork';
import { HighlightKeywords } from './HighlightKeywords';
import { Tilt3DCard } from './Tilt3DCard';
import { playClickThock, playHoverTick } from '../utils/soundEffects';

interface PersonalGalleryProps {
  onOpenGhum: () => void;
}

export function PersonalGallery({ onOpenGhum }: PersonalGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeItem, setActiveItem] = useState<PersonalWorkItem | null>(null);
  const [seed, setSeed] = useState(1);
  const [paused, setPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Differential museum-column parallax transforms on desktop
  const colSlowY = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const colMedY = useTransform(scrollYProgress, [0, 1], [-12, 16]);
  const colFastY = useTransform(scrollYProgress, [0, 1], [32, -34]);

  const getColumnY = (shift: PersonalWorkItem['columnShift']) => {
    if (shift === 'slow') return colSlowY;
    if (shift === 'fast') return colFastY;
    return colMedY;
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === 'Escape') {
        setActiveItem(null);
      } else if (e.key === 'ArrowRight') {
        const idx = PERSONAL_GALLERY.findIndex((i) => i.id === activeItem.id);
        setActiveItem(PERSONAL_GALLERY[(idx + 1) % PERSONAL_GALLERY.length]);
      } else if (e.key === 'ArrowLeft') {
        const idx = PERSONAL_GALLERY.findIndex((i) => i.id === activeItem.id);
        setActiveItem(
          PERSONAL_GALLERY[(idx - 1 + PERSONAL_GALLERY.length) % PERSONAL_GALLERY.length]
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeItem]);

  const navigateLightbox = (direction: -1 | 1) => {
    if (!activeItem) return;
    const idx = PERSONAL_GALLERY.findIndex((i) => i.id === activeItem.id);
    const nextIdx = (idx + direction + PERSONAL_GALLERY.length) % PERSONAL_GALLERY.length;
    setActiveItem(PERSONAL_GALLERY[nextIdx]);
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-[#fff1e8] bg-cad-grid-light border-b border-[#3e1f0f]/10 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Beyond Code — The Creative Side */}
        <div className="mb-20 pb-16 border-b border-[#3e1f0f]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <p className="font-mono text-xs text-[#9a5a2e] tracking-wide mb-3">
                04 · Beyond Code · Creative World
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#3e1f0f] [text-wrap:balance] mb-4">
                The <span className="text-[#9a5a2e]">creative side</span> that shapes how I{' '}
                <span className="text-[#d39a6a] drop-shadow-[0_1px_0_rgba(62,31,15,0.2)]">
                  design software
                </span>
                .
              </h2>
              <p className="text-sm sm:text-base text-[#5C341F] leading-relaxed">
                Technology is only half the story.{' '}
                <span className="text-[#9a5a2e] font-semibold">Novels</span>,{' '}
                <span className="text-[#3e1f0f] font-semibold">manga</span>, classical{' '}
                <span className="text-[#9a5a2e] font-semibold">mythology</span>, and warm
                minimalist aesthetics directly inspire the interfaces and products I build.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {CREATIVE_INTERESTS.map((interest) => (
                <div
                  key={interest.id}
                  className="rounded-2xl bg-white/75 backdrop-blur-xl border border-[#d39a6a]/35 p-5 space-y-2.5 shadow-xs"
                >
                  <div className="flex items-center gap-2 text-xs text-[#7A4B31]">
                    <span className="font-mono text-[#9a5a2e] font-medium">{interest.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{interest.domain}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#3e1f0f]">
                    {interest.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C341F] leading-relaxed">
                    <HighlightKeywords text={interest.description} variant="light" />
                  </p>
                  <p className="text-xs font-mono text-[#7A4B31] pt-1">{interest.inspiration}</p>
                  {interest.id === 'creative-writing' && (
                    <button
                      type="button"
                      onMouseEnter={playHoverTick}
                      onClick={() => {
                        playClickThock();
                        onOpenGhum();
                      }}
                      className="pt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#9a5a2e] hover:text-[#3e1f0f] transition-colors cursor-pointer"
                    >
                      <span>Open ঘুম Project Details →</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Minimalist Name-Only Clickable Card for ঘুম (Ghum) */}
          <div className="mt-10">
            <Tilt3DCard
              maxTilt={4}
              glareOpacity={0.22}
              onMouseEnter={playHoverTick}
              onClick={() => {
                playClickThock();
                onOpenGhum();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  playClickThock();
                  onOpenGhum();
                }
              }}
              role="button"
              tabIndex={0}
              ariaLabel={`Open ${GHUM_NOVEL_STORY.title} (${GHUM_NOVEL_STORY.subtitle}) project details page`}
              className="group w-full rounded-3xl bg-[#3e1f0f] hover:bg-[#4b2714] text-[#fff1e8] border border-[#d39a6a]/40 px-7 py-6 sm:px-9 sm:py-7 flex items-center justify-between gap-4 shadow-[0_14px_40px_rgba(62,31,15,0.22)] transition-colors cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d39a6a]"
            >
              <h3
                style={{ transform: 'translateZ(16px)' }}
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#fff1e8] group-hover:text-[#d39a6a] transition-colors"
              >
                {GHUM_NOVEL_STORY.title}{' '}
                <span className="font-normal text-[#d39a6a]">
                  ({GHUM_NOVEL_STORY.subtitle})
                </span>
              </h3>

              <ArrowUpRight
                style={{ transform: 'translateZ(16px)' }}
                className="w-6 h-6 text-[#d39a6a] group-hover:text-[#fff1e8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
              />
            </Tilt3DCard>
          </div>
        </div>

        {/* Personal Work Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="font-mono text-xs text-[#9a5a2e] tracking-wide mb-3">
              Personal Creative Gallery
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#3e1f0f] [text-wrap:balance]">
              <span className="text-[#9a5a2e]">Generative visual studies</span> inspired by my{' '}
              <span className="text-[#3e1f0f] underline decoration-[#d39a6a] decoration-2 underline-offset-4">
                projects
              </span>{' '}
              and <span className="text-[#9a5a2e]">storytelling</span>.
            </h2>
          </div>
          <p className="text-sm text-[#5C341F] max-w-sm">
            Click any piece to launch the interactive lightbox—regenerate pattern seeds or pause
            motion in real time.
          </p>
        </div>

        {/* Staggered Parallax Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-start">
          {PERSONAL_GALLERY.map((item, idx) => (
            <motion.figure
              key={item.id}
              style={{ y: getColumnY(item.columnShift) }}
              className={idx % 3 === 1 ? 'lg:mt-8' : ''}
            >
              <Tilt3DCard
                maxTilt={6}
                glareOpacity={0.18}
                className="group rounded-3xl bg-white/80 backdrop-blur-xl border border-[#d39a6a]/35 overflow-hidden transition-all duration-200 hover:bg-white hover:border-[#9a5a2e]/50 shadow-xs hover:shadow-lg"
              >
              <button
                type="button"
                onMouseEnter={playHoverTick}
                onClick={() => {
                  playClickThock();
                  setPaused(false);
                  setActiveItem(item);
                }}
                className="w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9a5a2e]"
              >
                <div className="relative overflow-hidden border-b border-[#3e1f0f]/10">
                  <GenerativeArtwork
                    type={item.sketchType}
                    palette={item.palette}
                    seed={seed + idx}
                    interactive={false}
                    className="w-full h-64 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />

                  <div className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-[#3e1f0f]/85 text-[#fff1e8] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <figcaption className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#7A4B31]">
                    <span className="font-mono text-[#9a5a2e]">{item.index}</span>
                    <span className="font-mono tabular-nums">{item.year}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#3e1f0f] group-hover:text-[#9a5a2e] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5C341F]">{item.medium}</p>
                </figcaption>
              </button>
              </Tilt3DCard>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* Fullscreen Interactive Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#241108]/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveItem(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl rounded-3xl bg-[#2B150A]/90 backdrop-blur-2xl border border-[#d39a6a]/30 text-[#fff1e8] overflow-hidden shadow-2xl"
            >
              {/* Top Bar */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs font-mono text-[#E8C9B5]">
                  <span className="text-[#d39a6a]">{activeItem.index}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeItem.medium}</span>
                  <span aria-hidden="true" className="hidden sm:inline">
                    ·
                  </span>
                  <span className="hidden sm:inline tabular-nums">{activeItem.dimensions}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  aria-label="Close gallery lightbox"
                  className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-[#E8C9B5] hover:text-[#fff1e8] hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Interactive Canvas Stage */}
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-8 bg-[#1E0E06] border-b lg:border-b-0 lg:border-r border-white/10 relative">
                  <GenerativeArtwork
                    type={activeItem.sketchType}
                    palette={activeItem.palette}
                    seed={seed}
                    paused={paused}
                    interactive={true}
                    className="w-full h-72 sm:h-[420px]"
                  />
                </div>

                {/* Monograph Caption & Live Controls */}
                <div className="lg:col-span-4 p-6 flex flex-col justify-between gap-6">
                  <div className="space-y-3">
                    <h3 id="lightbox-title" className="font-display text-2xl font-bold text-[#fff1e8]">
                      {activeItem.title}
                    </h3>
                    <p className="text-sm text-[#E8C9B5] leading-relaxed">
                      {activeItem.description}
                    </p>
                    <p className="font-mono text-xs text-[#d39a6a] pt-1">
                      Author: Md. Ahsanul Haque Jashed · {activeItem.year}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSeed((s) => s + 1)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#9a5a2e] hover:bg-[#b06938] text-[#fff1e8] rounded-lg transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>New Seed</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaused((p) => !p)}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-white/10 hover:bg-white/15 rounded-lg transition-colors cursor-pointer"
                      >
                        {paused ? (
                          <>
                            <Play className="w-3.5 h-3.5" />
                            <span>Resume</span>
                          </>
                        ) : (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            <span>Pause</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => navigateLightbox(-1)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#E8C9B5] hover:text-[#fff1e8] cursor-pointer py-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateLightbox(1)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#E8C9B5] hover:text-[#fff1e8] cursor-pointer py-1"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
