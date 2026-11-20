import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Code2, Sparkles, BrainCircuit, Compass, Plus } from 'lucide-react';
import { JASHED_PROFILE } from '../data/portfolioData';
import { HighlightKeywords } from './HighlightKeywords';
import { playClickThock, playHoverTick } from '../utils/soundEffects';

const DISCIPLINE_ICONS = {
  software: Code2,
  creative: Sparkles,
  ai: BrainCircuit,
  product: Compass,
} as const;

interface PortraitLayer {
  id: 'campus' | 'outdoor' | 'studio';
  src: string;
  alt: string;
  label: string;
  caption: string;
}

const PORTRAIT_LAYERS: PortraitLayer[] = [
  {
    id: 'campus',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_7.07._PM_cba373a6.jpeg',
    alt: 'Md. Ahsanul Haque Jashed on campus with backpack',
    label: '01 · Campus',
    caption: 'Chittagong Polytechnic · CST',
  },
  {
    id: 'outdoor',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_7.07.59_PM_8999fb4b.jpeg',
    alt: 'Md. Ahsanul Haque Jashed outdoor golden hour portrait',
    label: '02 · Portrait',
    caption: 'Md. Ahsanul Haque Jashed',
  },
  {
    id: 'studio',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_7.07.5_PM_105a3a44.jpeg',
    alt: 'Md. Ahsanul Haque Jashed wearing black blazer and clear glasses',
    label: '03 · Founder',
    caption: 'Independent Developer & Founder',
  },
];

export function AboutParallaxSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activePillar, setActivePillar] = useState(JASHED_PROFILE.whatIDo[0].id);
  const [focusedLayer, setFocusedLayer] = useState<PortraitLayer['id']>('outdoor');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Three distinct differential parallax speeds for the layered portrait composition
  const backPlaneY = useTransform(scrollYProgress, [0, 1], [44, -44]);
  const midPlaneY = useTransform(scrollYProgress, [0, 1], [20, -24]);
  const frontPlaneY = useTransform(scrollYProgress, [0, 1], [-18, 28]);

  const currentPillar =
    JASHED_PROFILE.whatIDo.find((p) => p.id === activePillar) ?? JASHED_PROFILE.whatIDo[0];
  const ActiveIcon =
    DISCIPLINE_ICONS[currentPillar.id as keyof typeof DISCIPLINE_ICONS] ?? Code2;

  const markFailed = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-[#fff1e8] border-b border-[#3e1f0f]/10 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Narrative + Interactive 4-Discipline Tabs */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="font-mono text-xs text-[#9a5a2e] tracking-wide mb-3">
                01 · About Me · What I Do
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#3e1f0f] [text-wrap:balance] mb-5">
                <span className="text-[#9a5a2e]">Curious</span> by nature. A{' '}
                <span className="text-[#3e1f0f] underline decoration-[#d39a6a] decoration-2 underline-offset-4">
                  builder
                </span>{' '}
                by choice.
              </h2>
              <div className="space-y-3.5 text-sm sm:text-base text-[#5C341F] leading-relaxed mb-8">
                {JASHED_PROFILE.aboutParagraphs.map((paragraph, idx) => (
                  <p key={idx}>
                    <HighlightKeywords text={paragraph} variant="light" />
                  </p>
                ))}
              </div>
            </div>

            {/* Interactive What I Do Selector */}
            <div className="space-y-4">
              <div
                role="tablist"
                aria-label="Core engineering and product disciplines"
                className="flex flex-wrap items-center gap-1.5 p-1 bg-[#3e1f0f]/[0.08] rounded-xl w-fit border border-[#3e1f0f]/10"
              >
                {JASHED_PROFILE.whatIDo.map((pillar) => {
                  const isActive = pillar.id === activePillar;
                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onMouseEnter={playHoverTick}
                      onClick={() => {
                        playClickThock();
                        setActivePillar(pillar.id);
                      }}
                      className={`px-3 py-2 text-xs font-medium rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-[#3e1f0f] text-[#fff1e8] shadow-sm'
                          : 'text-[#5C341F] hover:text-[#3e1f0f]'
                      }`}
                    >
                      {pillar.label}
                    </button>
                  );
                })}
              </div>

              <div className="bg-white/65 backdrop-blur-xl rounded-2xl border border-[#d39a6a]/40 p-6 min-h-[158px] flex flex-col justify-between shadow-xs">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPillar.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-2.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <ActiveIcon className="w-4 h-4 text-[#9a5a2e]" />
                      <h3 className="font-display text-lg font-bold text-[#3e1f0f]">
                        {currentPillar.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[#5C341F] leading-relaxed">
                      <HighlightKeywords text={currentPillar.body} variant="light" />
                    </p>
                    <p className="font-mono text-xs text-[#9a5a2e] pt-1">{currentPillar.meta}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column: 3-Layer Parallax Portrait Collage */}
          <div className="lg:col-span-6 relative min-h-[470px] sm:min-h-[540px] flex flex-col items-center justify-center">
            {/* Soft Ambient Depth + Precision CAD Optical Calibration Grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-4 rounded-3xl bg-cad-dots-light border border-[#3e1f0f]/10 bg-[radial-gradient(circle_at_30%_25%,rgba(211,154,106,0.28),transparent_58%),radial-gradient(circle_at_75%_75%,rgba(154,90,46,0.18),transparent_60%)]"
            >
              <div className="absolute inset-x-6 top-1/2 h-px bg-[#3e1f0f]/[0.08]" />
              <div className="absolute inset-y-6 left-1/2 w-px bg-[#3e1f0f]/[0.08]" />
              <Plus className="w-3 h-3 text-[#9a5a2e]/60 absolute top-3 left-3" />
              <Plus className="w-3 h-3 text-[#9a5a2e]/60 absolute top-3 right-3" />
              <Plus className="w-3 h-3 text-[#9a5a2e]/60 absolute bottom-3 left-3" />
              <Plus className="w-3 h-3 text-[#9a5a2e]/60 absolute bottom-3 right-3" />
            </div>

            <div className="relative w-full max-w-[480px] h-[440px] sm:h-[490px]">
              {/* Layer 1 (Back Slow Parallax): Campus Portrait */}
              <motion.button
                type="button"
                style={{ y: backPlaneY }}
                onMouseEnter={playHoverTick}
                onClick={() => {
                  playClickThock();
                  setFocusedLayer('campus');
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                aria-label="Bring campus portrait layer to front"
                className={`absolute top-0 left-0 sm:left-2 w-44 sm:w-52 aspect-[3/4] rounded-3xl p-2 backdrop-blur-2xl border transition-shadow duration-300 cursor-pointer text-left overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9a5a2e] ${
                  focusedLayer === 'campus'
                    ? 'z-30 bg-[#fff1e8]/90 border-[#9a5a2e]/55 shadow-[0_24px_60px_rgba(62,31,15,0.25)] -rotate-1'
                    : 'z-10 bg-white/70 border-[#d39a6a]/40 shadow-lg -rotate-3 hover:bg-[#fff1e8]/90'
                }`}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden relative bg-[#3e1f0f]/10">
                  {!failedImages['campus'] ? (
                    <img
                      src={PORTRAIT_LAYERS[0].src}
                      alt={PORTRAIT_LAYERS[0].alt}
                      referrerPolicy="no-referrer"
                      onError={() => markFailed('campus')}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[#5C341F] p-3 text-center">
                      Campus Portrait
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-[#241108]/85 via-[#3e1f0f]/45 to-transparent">
                    <p className="font-mono text-[10px] text-[#d39a6a]">
                      {PORTRAIT_LAYERS[0].label}
                    </p>
                    <p className="text-[11px] font-medium text-[#fff1e8] truncate">
                      {PORTRAIT_LAYERS[0].caption}
                    </p>
                  </div>
                </div>
              </motion.button>

              {/* Layer 2 (Mid Core Parallax): Golden-Hour Outdoor Portrait */}
              <motion.button
                type="button"
                style={{ y: midPlaneY }}
                onMouseEnter={playHoverTick}
                onClick={() => {
                  playClickThock();
                  setFocusedLayer('outdoor');
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                aria-label="Bring outdoor portrait layer to front"
                className={`absolute top-12 sm:top-10 left-1/2 -translate-x-1/2 w-56 sm:w-64 aspect-[3/4] rounded-3xl p-2 backdrop-blur-2xl border transition-shadow duration-300 cursor-pointer text-left overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9a5a2e] ${
                  focusedLayer === 'outdoor'
                    ? 'z-30 bg-[#3e1f0f]/92 border-[#d39a6a]/65 shadow-[0_28px_70px_rgba(62,31,15,0.42)]'
                    : 'z-20 bg-[#3e1f0f]/82 border-[#d39a6a]/35 shadow-2xl'
                }`}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden relative bg-[#241108]">
                  {!failedImages['outdoor'] ? (
                    <img
                      src={PORTRAIT_LAYERS[1].src}
                      alt={PORTRAIT_LAYERS[1].alt}
                      referrerPolicy="no-referrer"
                      onError={() => markFailed('outdoor')}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[#fff1e8] p-3 text-center">
                      Md. Ahsanul Haque Jashed
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-[#241108]/92 via-[#3e1f0f]/55 to-transparent">
                    <p className="font-mono text-[10px] text-[#d39a6a]">
                      {PORTRAIT_LAYERS[1].label} · CST {JASHED_PROFILE.roll}
                    </p>
                    <p className="font-display text-sm font-bold text-[#fff1e8] truncate mt-0.5">
                      {PORTRAIT_LAYERS[1].caption}
                    </p>
                  </div>
                </div>
              </motion.button>

              {/* Layer 3 (Front Fast Parallax): Studio Blazer Portrait */}
              <motion.button
                type="button"
                style={{ y: frontPlaneY }}
                onMouseEnter={playHoverTick}
                onClick={() => {
                  playClickThock();
                  setFocusedLayer('studio');
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                aria-label="Bring studio founder portrait layer to front"
                className={`absolute bottom-0 right-0 sm:right-2 w-44 sm:w-52 aspect-[3/4] rounded-3xl p-2 backdrop-blur-2xl border transition-shadow duration-300 cursor-pointer text-left overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9a5a2e] ${
                  focusedLayer === 'studio'
                    ? 'z-30 bg-[#fff1e8]/95 border-[#9a5a2e]/55 shadow-[0_26px_65px_rgba(62,31,15,0.28)] rotate-1'
                    : 'z-20 bg-white/80 border-[#d39a6a]/45 ring-1 ring-[#3e1f0f]/8 shadow-[0_20px_50px_rgba(62,31,15,0.16)] rotate-3 hover:bg-[#fff1e8]'
                }`}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden relative bg-gradient-to-b from-[#fff1e8] to-[#f4dfcf]">
                  {!failedImages['studio'] ? (
                    <img
                      src={PORTRAIT_LAYERS[2].src}
                      alt={PORTRAIT_LAYERS[2].alt}
                      referrerPolicy="no-referrer"
                      onError={() => markFailed('studio')}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[#3e1f0f] p-3 text-center">
                      Founder Portrait
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#241108]/90 via-[#3e1f0f]/45 to-transparent">
                    <p className="font-mono text-[10px] text-[#d39a6a]">
                      {PORTRAIT_LAYERS[2].label}
                    </p>
                    <p className="text-[11px] font-semibold text-[#fff1e8] truncate">
                      {PORTRAIT_LAYERS[2].caption}
                    </p>
                  </div>
                </div>
              </motion.button>
            </div>

            {/* Subtle Layer Switcher Beneath Parallax Portrait Stack */}
            <div className="mt-5 flex items-center gap-2 p-1 rounded-xl bg-white/75 backdrop-blur-xl border border-[#d39a6a]/35">
              {PORTRAIT_LAYERS.map((layer) => {
                const active = focusedLayer === layer.id;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onMouseEnter={playHoverTick}
                    onClick={() => {
                      playClickThock();
                      setFocusedLayer(layer.id);
                    }}
                    className={`px-3 py-1.5 text-[11px] font-mono rounded-lg transition-all cursor-pointer ${
                      active
                        ? 'bg-[#3e1f0f] text-[#fff1e8] shadow-xs'
                        : 'text-[#5C341F] hover:text-[#3e1f0f]'
                    }`}
                  >
                    {layer.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
