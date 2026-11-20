import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'motion/react';
import { ArrowDownRight, ArrowRight, Check, FileDown, Plus } from 'lucide-react';
import { JASHED_PROFILE, SELECTED_PROJECTS } from '../data/portfolioData';
import { HighlightKeywords } from './HighlightKeywords';
import { MatrixName } from './MatrixName';
import { ThreeHeroCanvas } from './ThreeHeroCanvas';
import { Tilt3DCard } from './Tilt3DCard';
import { playClickThock, playHoverTick } from '../utils/soundEffects';
import { downloadResumePdf } from '../utils/resumePdf';
import type { DossierPageId } from '../types/navigation';

interface ParallaxHeroProps {
  onOpenProject: (projectId: string) => void;
  onOpenDossier: (pageId: DossierPageId) => void;
}

const INTRO_TOPICS = [
  {
    id: 'identity',
    label: '01. Identity',
    summary:
      "I'm Md. Ahsanul Haque Jashed — a Computer Science & Technology student at Chittagong Polytechnic Institute (Roll 881524) turning ideas into calm, human-centered products.",
  },
  {
    id: 'engineering',
    label: '02. Engineering',
    summary:
      'Building full-cycle software across Kotlin, Jetpack Compose, Python, Django, YOLOv8, PaddleOCR, and SQLite/MySQL — from accessible AI readers to retail tally systems.',
  },
  {
    id: 'design3d',
    label: '03. Creative Craft',
    summary:
      'Blending Three.js 3D geometry, frosted glassmorphism, dot-matrix typography, and subtle mechanical sound design alongside original Bengali fiction like ঘুম (Ghum).',
  },
] as const;

const HERO_PORTRAITS = [
  {
    id: 'studio',
    index: '01',
    label: 'Studio Portrait',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_7.07.5_PM_105a3a44.jpeg',
    alt: 'Md. Ahsanul Haque Jashed wearing black blazer and clear glasses',
    caption: 'Independent Developer & Founder',
    detail: 'Software Architecture · 3D & Interactive UI',
  },
  {
    id: 'outdoor',
    index: '02',
    label: 'Golden Hour',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_7.07.59_PM_8999fb4b.jpeg',
    alt: 'Md. Ahsanul Haque Jashed outdoor golden hour portrait',
    caption: 'Creative Technologist · Bangladesh',
    detail: 'Think deeply · Build creatively · Learn continuously',
  },
  {
    id: 'campus',
    index: '03',
    label: 'Campus CPI',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_7.07._PM_cba373a6.jpeg',
    alt: 'Md. Ahsanul Haque Jashed at Chittagong Polytechnic Institute campus',
    caption: 'Chittagong Polytechnic Institute',
    detail: 'Computer Science & Technology · Roll 881524',
  },
] as const;

export function ParallaxHero({ onOpenProject, onOpenDossier }: ParallaxHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [introTopicId, setIntroTopicId] = useState<(typeof INTRO_TOPICS)[number]['id']>('identity');
  const [activePortraitIdx, setActivePortraitIdx] = useState(0);
  const [imgFailedMap, setImgFailedMap] = useState<Record<string, boolean>>({});
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const [pulseTrigger, setPulseTrigger] = useState(0);
  const [resumeSaved, setResumeSaved] = useState(false);

  const handleDownloadResume = () => {
    playClickThock();
    setPulseTrigger((c) => c + 1);
    downloadResumePdf();
    setResumeSaved(true);
    window.setTimeout(() => setResumeSaved(false), 2400);
  };

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const textLayerY = useTransform(scrollYProgress, [0, 1], [0, 38]);
  const portraitLayerY = useTransform(scrollYProgress, [0, 1], [0, -34]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setPointerPos({ x: nx, y: ny });
  };

  const scrollToProjects = () => {
    playClickThock();
    setPulseTrigger((c) => c + 1);
    const target = document.querySelector('#projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectPortrait = (idx: number) => {
    playClickThock();
    setActivePortraitIdx(idx);
    setPulseTrigger((c) => c + 1);
  };

  const activeIntro = INTRO_TOPICS.find((t) => t.id === introTopicId) ?? INTRO_TOPICS[0];
  const activePortrait = HERO_PORTRAITS[activePortraitIdx] ?? HERO_PORTRAITS[0];
  const leftPeekPortrait =
    HERO_PORTRAITS[(activePortraitIdx + 2) % HERO_PORTRAITS.length];
  const rightPeekPortrait =
    HERO_PORTRAITS[(activePortraitIdx + 1) % HERO_PORTRAITS.length];
  const flagshipProject = SELECTED_PROJECTS[0];

  return (
    <section
      id="top"
      ref={heroRef}
      onPointerMove={handlePointerMove}
      className="relative overflow-hidden bg-[#241108] text-[#fff1e8] border-b border-[#d39a6a]/15"
    >
      {/* Calm Ambient Copper Studio Rim Light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 right-[-4%] w-[640px] h-[640px] rounded-full bg-radial from-[#d39a6a]/22 via-[#9a5a2e]/14 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 w-[500px] h-[500px] rounded-full bg-radial from-[#9a5a2e]/16 via-[#3e1f0f]/24 to-transparent blur-3xl"
      />

      {/* Real-Time Three.js 3D Burnished Copper Orbital Rig */}
      <ThreeHeroCanvas
        pointerX={pointerPos.x}
        pointerY={pointerPos.y}
        pulseTrigger={pulseTrigger}
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 pt-12 pb-12 lg:pt-16 lg:pb-16">
        {/* Minimal Floating Icon-Based Download Resume Button */}
        <motion.button
          type="button"
          onMouseEnter={playHoverTick}
          onClick={handleDownloadResume}
          whileHover={{ y: -2, scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          aria-label="Download Resume as PDF"
          title="Download Resume (PDF)"
          className="group absolute top-5 right-6 z-30 inline-flex items-center gap-2 h-11 px-3 sm:px-3.5 rounded-2xl bg-[#3e1f0f]/80 hover:bg-[#9a5a2e] backdrop-blur-2xl border border-[#d39a6a]/45 hover:border-[#fff1e8]/45 text-[#fff1e8] shadow-[0_14px_36px_rgba(0,0,0,0.45)] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d39a6a]"
        >
          {resumeSaved ? (
            <Check className="w-4 h-4 text-[#fff1e8] shrink-0" />
          ) : (
            <FileDown className="w-4 h-4 text-[#d39a6a] group-hover:text-[#fff1e8] transition-colors shrink-0" />
          )}
          <span className="hidden sm:inline font-mono text-[11px] tracking-wide whitespace-nowrap">
            {resumeSaved ? 'CV Saved' : 'Download Resume'}
          </span>
        </motion.button>

        <div className="relative flex items-center gap-6 lg:gap-10">
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Matrix Name + Interactive Personal Intro + Flagship Inset */}
            <motion.div
              style={{ y: textLayerY, opacity: heroOpacity }}
              className="lg:col-span-6 flex flex-col justify-between space-y-6"
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-xs sm:text-sm text-[#d39a6a] tracking-wide pr-28 sm:pr-0"
              >
                {JASHED_PROFILE.role} ·{' '}
                <span className="text-[#E8C9B5]">{JASHED_PROFILE.institution}</span>
              </motion.p>

              {/* Matrix-Style Interactive Full Name */}
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl lg:text-[3.35rem] font-extrabold tracking-tight [text-wrap:balance]"
              >
                <span
                  onClick={() => setPulseTrigger((c) => c + 1)}
                  className="inline-block"
                >
                  <MatrixName prefix="Md. Ahsanul Haque " highlight="Jashed" />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-xl sm:text-2xl font-bold text-[#fff1e8] tracking-tight max-w-xl"
              >
                Creative designer &amp; engineer building calm software with tactile 3D craft.
              </motion.p>

              {/* Clean Interactive 3-Facet Intro Switcher */}
              <div className="space-y-3 pt-1 max-w-xl">
                <div
                  role="tablist"
                  aria-label="Jashed interactive intro tabs"
                  className="flex flex-wrap items-center gap-5 border-b border-[#d39a6a]/20 pb-2"
                >
                  {INTRO_TOPICS.map((topic) => {
                    const active = topic.id === introTopicId;
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onMouseEnter={playHoverTick}
                        onClick={() => {
                          playClickThock();
                          setIntroTopicId(topic.id);
                          setPulseTrigger((c) => c + 1);
                        }}
                        className={`relative pb-1.5 text-xs font-mono transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          active
                            ? 'text-[#fff1e8]'
                            : 'text-[#E8C9B5]/65 hover:text-[#fff1e8]'
                        }`}
                      >
                        {topic.label}
                        {active && (
                          <motion.span
                            layoutId="hero-intro-underline"
                            transition={{ type: 'spring', stiffness: 460, damping: 34 }}
                            aria-hidden="true"
                            className="absolute inset-x-0 -bottom-[9px] h-[2px] bg-[#d39a6a]"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeIntro.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="text-sm sm:text-base text-[#E8C9B5] leading-relaxed min-h-[72px]"
                  >
                    <HighlightKeywords text={activeIntro.summary} variant="dark" />
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="button"
                  onMouseEnter={playHoverTick}
                  onClick={scrollToProjects}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#fff1e8] bg-[#9a5a2e] hover:bg-[#b06938] active:scale-[0.98] rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-lg shadow-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d39a6a]"
                >
                  <span>Explore Works</span>
                  <ArrowDownRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onMouseEnter={playHoverTick}
                  onClick={() => {
                    playClickThock();
                    onOpenDossier('about');
                  }}
                  className="group inline-flex items-center gap-2 px-4 py-3 text-xs font-mono uppercase tracking-[0.15em] text-[#E8C9B5] hover:text-[#fff1e8] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d39a6a]"
                >
                  <span>Open Full Bio</span>
                  <ArrowRight className="w-4 h-4 text-[#d39a6a] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Clean Bottom-Left Flagship Case Study Inset (Inspired by Reference Image) */}
              {flagshipProject && (
                <div className="pt-2">
                  <button
                    type="button"
                    onMouseEnter={playHoverTick}
                    onClick={() => {
                      playClickThock();
                      onOpenProject(flagshipProject.id);
                    }}
                    aria-label={`Open ${flagshipProject.title} flagship case study`}
                    className="group inline-flex items-center gap-4 p-2 pr-4 rounded-2xl bg-[#3e1f0f]/55 hover:bg-[#3e1f0f]/85 backdrop-blur-xl border border-[#d39a6a]/25 hover:border-[#d39a6a]/60 transition-all duration-200 cursor-pointer shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d39a6a]"
                  >
                    <div className="w-20 h-14 rounded-xl bg-[#160A04] border border-[#d39a6a]/25 overflow-hidden flex items-center justify-center shrink-0">
                      {flagshipProject.screenshotPath ? (
                        <img
                          src={flagshipProject.screenshotPath}
                          alt={flagshipProject.screenshotAlt || flagshipProject.title}
                          referrerPolicy="no-referrer"
                          className="h-full w-auto object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <span className="font-mono text-[10px] text-[#d39a6a]">01</span>
                      )}
                    </div>
                    <div className="text-left min-w-0">
                      <p className="font-mono text-[10px] text-[#d39a6a] uppercase tracking-wider">
                        Featured Case Study
                      </p>
                      <p className="text-xs font-semibold text-[#fff1e8] truncate max-w-[165px]">
                        {flagshipProject.title} →
                      </p>
                    </div>
                  </button>
                </div>
              )}
            </motion.div>

            {/* Right Column: Unique 3D Fanned Portrait Prism Stage */}
            <motion.div
              style={{ y: portraitLayerY }}
              className="lg:col-span-6 flex items-center justify-center py-6 lg:py-4"
            >
              <div className="relative w-full max-w-[430px] h-[440px] sm:h-[500px] flex items-center justify-center">
                {/* Architectural Orbital Aperture Halo Synced Behind Portrait */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] rounded-full border border-[#d39a6a]/25"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute w-[290px] h-[290px] sm:w-[340px] sm:h-[340px] rounded-full border border-dashed border-[#d39a6a]/20"
                />

                {/* Left Diagonal Depth Card (Previous Photo Layer — Click to Focus) */}
                <motion.button
                  type="button"
                  onMouseEnter={playHoverTick}
                  onClick={() =>
                    selectPortrait(
                      (activePortraitIdx + 2) % HERO_PORTRAITS.length
                    )
                  }
                  whileHover={{ x: -10, rotate: -9, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                  aria-label={`Focus ${leftPeekPortrait.label} portrait`}
                  className="hidden sm:block absolute left-1 sm:left-2 top-12 w-44 sm:w-52 aspect-[3/4] rounded-[24px] overflow-hidden border border-[#d39a6a]/30 bg-[#1B0C05] -rotate-6 opacity-55 hover:opacity-90 shadow-2xl cursor-pointer transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d39a6a]"
                >
                  {!imgFailedMap[leftPeekPortrait.id] && (
                    <img
                      src={leftPeekPortrait.src}
                      alt={leftPeekPortrait.alt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setImgFailedMap((p) => ({ ...p, [leftPeekPortrait.id]: true }))
                      }
                      className="w-full h-full object-cover object-top"
                    />
                  )}
                  <div className="absolute inset-0 bg-[#241108]/45" />
                </motion.button>

                {/* Right Diagonal Depth Card (Next Photo Layer — Click to Focus) */}
                <motion.button
                  type="button"
                  onMouseEnter={playHoverTick}
                  onClick={() =>
                    selectPortrait(
                      (activePortraitIdx + 1) % HERO_PORTRAITS.length
                    )
                  }
                  whileHover={{ x: 10, rotate: 9, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                  aria-label={`Focus ${rightPeekPortrait.label} portrait`}
                  className="hidden sm:block absolute right-1 sm:right-2 bottom-10 w-44 sm:w-52 aspect-[3/4] rounded-[24px] overflow-hidden border border-[#d39a6a]/30 bg-[#1B0C05] rotate-6 opacity-55 hover:opacity-90 shadow-2xl cursor-pointer transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d39a6a]"
                >
                  {!imgFailedMap[rightPeekPortrait.id] && (
                    <img
                      src={rightPeekPortrait.src}
                      alt={rightPeekPortrait.alt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setImgFailedMap((p) => ({ ...p, [rightPeekPortrait.id]: true }))
                      }
                      className="w-full h-full object-cover object-top"
                    />
                  )}
                  <div className="absolute inset-0 bg-[#241108]/45" />
                </motion.button>

                {/* Center Focal 3D Perspective Aperture Portrait */}
                <div className="relative z-10 w-64 sm:w-76 aspect-[3/4] lg:[transform:perspective(1200px)_rotateY(-5deg)] lg:hover:[transform:perspective(1200px)_rotateY(0deg)] transition-transform duration-500 ease-out">
                  <Tilt3DCard
                    maxTilt={9}
                    glareOpacity={0.26}
                    onMouseEnter={playHoverTick}
                    onClick={() =>
                      selectPortrait(
                        (activePortraitIdx + 1) % HERO_PORTRAITS.length
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        selectPortrait(
                          (activePortraitIdx + 1) % HERO_PORTRAITS.length
                        );
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    ariaLabel={`Cycle featured portrait (currently ${activePortrait.label})`}
                    className="group w-full h-full rounded-[28px] bg-[#1A0B05] p-2 border border-[#d39a6a]/55 ring-1 ring-inset ring-white/15 shadow-[0_32px_80px_rgba(0,0,0,0.65)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d39a6a]"
                  >
                    {/* Floating Optical Viewfinder Registration Marks */}
                    <Plus
                      aria-hidden="true"
                      style={{ transform: 'translateZ(24px)' }}
                      className="w-3.5 h-3.5 text-[#d39a6a]/75 absolute top-3.5 left-3.5 z-30 pointer-events-none"
                    />
                    <Plus
                      aria-hidden="true"
                      style={{ transform: 'translateZ(24px)' }}
                      className="w-3.5 h-3.5 text-[#d39a6a]/75 absolute top-3.5 right-3.5 z-30 pointer-events-none"
                    />

                    <div
                      style={{ transform: 'translateZ(14px)' }}
                      className="relative w-full h-full rounded-[20px] overflow-hidden bg-gradient-to-b from-[#3e1f0f] to-[#1A0B05]"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activePortrait.id}
                          initial={{ opacity: 0, scale: 1.06 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0"
                        >
                          {!imgFailedMap[activePortrait.id] ? (
                            <img
                              src={activePortrait.src}
                              alt={activePortrait.alt}
                              referrerPolicy="no-referrer"
                              onError={() =>
                                setImgFailedMap((p) => ({
                                  ...p,
                                  [activePortrait.id]: true,
                                }))
                              }
                              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center p-6 text-center">
                              <span className="font-matrix text-xl text-[#fff1e8]">
                                {JASHED_PROFILE.shortName}
                              </span>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Measured 4.5:1 Contrast Glass Footer Scrim */}
                      <div
                        style={{ transform: 'translateZ(26px)' }}
                        className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#160903]/95 via-[#241108]/75 to-transparent"
                      >
                        <p className="font-mono text-[10px] text-[#d39a6a] uppercase tracking-wider">
                          {activePortrait.index} · {activePortrait.label}
                        </p>
                        <p className="font-display text-sm sm:text-base font-bold text-[#fff1e8] mt-0.5">
                          {activePortrait.caption}
                        </p>
                        <p className="text-[11px] text-[#E8C9B5] truncate">
                          {activePortrait.detail}
                        </p>
                      </div>
                    </div>
                  </Tilt3DCard>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Vertical Portrait Slide Rail on Right Edge (Inspired by Reference Image) */}
          <nav
            aria-label="Portrait perspective selector"
            className="hidden sm:flex flex-col items-center gap-3 pl-2 shrink-0"
          >
            {HERO_PORTRAITS.map((item, idx) => {
              const isActive = idx === activePortraitIdx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={playHoverTick}
                  onClick={() => selectPortrait(idx)}
                  aria-label={`View ${item.label} portrait (${item.index})`}
                  aria-current={isActive ? 'true' : undefined}
                  title={item.label}
                  className="p-1 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d39a6a] rounded-full"
                >
                  <span
                    className={`block w-1.5 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'h-6 bg-[#fff1e8] shadow-[0_0_12px_rgba(255,241,232,0.6)]'
                        : 'h-3 bg-[#d39a6a]/35 group-hover:bg-[#d39a6a]/85'
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Horizontal Portrait Switcher */}
        <div className="sm:hidden flex items-center justify-center gap-2 mt-4">
          {HERO_PORTRAITS.map((item, idx) => {
            const isActive = idx === activePortraitIdx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectPortrait(idx)}
                aria-label={`View ${item.label} portrait`}
                className="p-1.5 cursor-pointer"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-200 ${
                    isActive ? 'w-6 bg-[#fff1e8]' : 'w-2.5 bg-[#d39a6a]/40'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Clean 4-Column Metrics Strip */}
        <div className="mt-12 pt-8 border-t border-[#d39a6a]/15 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {JASHED_PROFILE.metrics.map((item, idx) => (
            <div
              key={item.label}
              className={`space-y-1 ${idx > 0 ? 'lg:border-l lg:border-[#d39a6a]/15 lg:pl-6' : ''}`}
            >
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono text-[10px] text-[#d39a6a]/75 tabular-nums">
                  0{idx + 1}
                </span>
                <p className="font-matrix text-2xl sm:text-3xl font-bold text-[#fff1e8] tabular-nums">
                  {item.value}
                </p>
              </div>
              <p className="text-xs font-semibold text-[#d39a6a]">{item.label}</p>
              <p className="text-xs text-[#E8C9B5]/80">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
