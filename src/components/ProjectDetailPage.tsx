import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  Cpu,
  Layers,
  Pause,
  Play,
  Plus,
  Rocket,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { SELECTED_PROJECTS, StudentProject } from '../data/portfolioData';
import { InteractiveProjectDemo, ProjectVisual } from './ProjectVisual';
import { HighlightKeywords } from './HighlightKeywords';
import { playClickThock, playHoverTick } from '../utils/soundEffects';

interface ProjectDetailPageProps {
  project: StudentProject;
  onBack: () => void;
  onSelectProject: (projectId: string) => void;
}

type SystemLayerId = 'interface' | 'architecture' | 'specs';

const SYSTEM_LAYER_TABS: { id: SystemLayerId; label: string }[] = [
  { id: 'interface', label: '01 · Interface' },
  { id: 'architecture', label: '02 · Architecture' },
  { id: 'specs', label: '03 · Core Specs' },
];

const TECHNICAL_READING_WPM = 190;

function calculateProjectReadingTime(project: StudentProject): {
  minutes: number;
  wordCount: number;
} {
  const sections: string[] = [
    project.title,
    project.subtitle,
    project.summary,
    project.whatItDoes,
    project.architecture,
    ...project.highlights,
    ...project.stack,
    ...project.specifications.flatMap((spec) => [spec.label, spec.value]),
    ...project.featureWalkthrough.flatMap((step) => [
      step.stepLabel,
      step.title,
      step.description,
      step.spec,
    ]),
    ...project.allFeatures.flatMap((feat) => [feat.title, feat.detail]),
    ...project.futureRoadmap.flatMap((milestone) => [
      milestone.phase,
      milestone.title,
      milestone.detail,
    ]),
  ];

  const wordCount = sections
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.max(1, Math.ceil(wordCount / TECHNICAL_READING_WPM));
  return { minutes, wordCount };
}

export function ProjectDetailPage({
  project,
  onBack,
  onSelectProject,
}: ProjectDetailPageProps) {
  const [activeLayer, setActiveLayer] = useState<SystemLayerId>('interface');
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [viewMode, setViewMode] = useState<'interactive' | 'screenshot'>('interactive');
  const [imgError, setImgError] = useState(false);

  // Reset layer, step & image state when switching projects
  useEffect(() => {
    setActiveLayer('interface');
    setActiveStepIdx(0);
    setAutoPlay(false);
    setViewMode('interactive');
    setImgError(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.id]);

  // Auto-advance walkthrough when user enables Auto-Play Features
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActiveStepIdx((prev) => (prev + 1) % project.featureWalkthrough.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [autoPlay, project.featureWalkthrough.length]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onBack]);

  const currentIdx = SELECTED_PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject =
    SELECTED_PROJECTS[(currentIdx - 1 + SELECTED_PROJECTS.length) % SELECTED_PROJECTS.length];
  const nextProject = SELECTED_PROJECTS[(currentIdx + 1) % SELECTED_PROJECTS.length];
  const currentStep = project.featureWalkthrough[activeStepIdx] ?? project.featureWalkthrough[0];
  const readingStats = useMemo(() => calculateProjectReadingTime(project), [project]);

  const glassSectionCard =
    'rounded-3xl bg-white/55 backdrop-blur-2xl border border-[#d39a6a]/40 ring-1 ring-[#3e1f0f]/5 shadow-[0_10px_40px_rgba(62,31,15,0.08)]';
  const glassNestedTile =
    'rounded-2xl bg-[#fff1e8]/65 backdrop-blur-lg border border-[#d39a6a]/35 ring-1 ring-[#3e1f0f]/5';

  const selectLayer = (layer: SystemLayerId) => {
    playClickThock();
    setActiveLayer(layer);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#fff1e8] text-[#3e1f0f] relative overflow-x-hidden"
    >
      {/* Layered Warm Copper Ambient Color Mesh + Optical Calibration Dot Matrix */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden bg-cad-dots-light">
        <div className="absolute -top-32 left-[-8%] w-[560px] h-[560px] rounded-full bg-radial from-[#d39a6a]/28 via-[#9a5a2e]/14 to-transparent blur-3xl" />
        <div className="absolute top-[28%] right-[-10%] w-[620px] h-[620px] rounded-full bg-radial from-[#9a5a2e]/20 via-[#d39a6a]/12 to-transparent blur-3xl" />
        <div className="absolute bottom-[-12%] left-[20%] w-[520px] h-[520px] rounded-full bg-radial from-[#d39a6a]/22 via-[#3e1f0f]/10 to-transparent blur-3xl" />
      </div>

      {/* Frosted Copper Apple-Style Sticky Top Navigation */}
      <header className="sticky top-0 z-50 bg-[#fff1e8]/80 backdrop-blur-2xl border-b border-[#3e1f0f]/10">
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

          <div className="hidden md:flex items-center gap-2 text-xs text-[#7A4B31] truncate">
            <span className="font-mono text-[#9a5a2e] font-semibold">{project.index}</span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-[#3e1f0f] truncate">{project.title}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 font-mono text-[#9a5a2e] shrink-0 tabular-nums">
              <Clock className="w-3 h-3" aria-hidden="true" />
              <span>{readingStats.minutes} min read</span>
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onMouseEnter={playHoverTick}
              onClick={() => {
                playClickThock();
                onSelectProject(prevProject.id);
              }}
              className="px-3.5 py-1.5 text-xs font-medium text-[#5C341F] hover:text-[#3e1f0f] bg-white/75 backdrop-blur-md border border-[#d39a6a]/40 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Prev
            </button>
            <button
              type="button"
              onMouseEnter={playHoverTick}
              onClick={() => {
                playClickThock();
                onSelectProject(nextProject.id);
              }}
              className="px-3.5 py-1.5 text-xs font-medium text-[#fff1e8] bg-[#3e1f0f] hover:bg-[#9a5a2e] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Next Project
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-[1200px] mx-auto px-6 py-12 lg:py-16 space-y-12">
        {/* 1. Project Overview in Interactive 3-Layer System Design */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#7A4B31]">
              <span className="font-mono text-[#9a5a2e] font-semibold">{project.index}</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-[#3e1f0f]">{project.stage}</span>
              <span aria-hidden="true">·</span>
              <span>{project.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span
                className="inline-flex items-center gap-1 font-mono text-[#9a5a2e] tabular-nums"
                title={`Estimated ${readingStats.wordCount} words across overview, architecture specs, features, and roadmap`}
              >
                <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{readingStats.minutes} min read</span>
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#3e1f0f] [text-wrap:balance]">
                {project.title}
              </h1>
              <p className="text-lg sm:text-xl text-[#5C341F] font-medium">{project.subtitle}</p>
            </div>

            <div className={`${glassSectionCard} p-6 space-y-2.5`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-mono text-xs text-[#9a5a2e] font-semibold">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Layer 00 · Project Overview</span>
                </div>
                <span className="font-mono text-[11px] text-[#7A4B31] tabular-nums">
                  ~{readingStats.minutes} min read · {readingStats.wordCount} words
                </span>
              </div>
              <p className="text-sm sm:text-base text-[#5C341F] leading-relaxed">
                <HighlightKeywords text={project.whatItDoes} variant="light" />
              </p>
            </div>

            <div className={`${glassNestedTile} px-5 py-4 flex flex-wrap items-center justify-between gap-3 text-xs`}>
              <span className="font-mono text-[#5C341F]">{project.stack.join(' · ')}</span>
              <span className="font-mono font-semibold text-[#9a5a2e]">{project.metric}</span>
            </div>
          </div>

          {/* Right Column: Interactive 3-Layer System View Stack (Matching Photo Layer Aesthetic) */}
          <div className="lg:col-span-7 relative min-h-[490px] sm:min-h-[540px] flex flex-col items-center justify-center">
            {/* Optical Calibration Backdrop Behind System Stack */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-2 rounded-3xl bg-cad-dots-light border border-[#3e1f0f]/10 bg-[radial-gradient(circle_at_30%_25%,rgba(211,154,106,0.28),transparent_58%),radial-gradient(circle_at_75%_75%,rgba(154,90,46,0.16),transparent_60%)]"
            >
              <div className="absolute inset-x-6 top-1/2 h-px bg-[#3e1f0f]/[0.08]" />
              <div className="absolute inset-y-6 left-1/2 w-px bg-[#3e1f0f]/[0.08]" />
              <Plus className="w-3 h-3 text-[#9a5a2e]/60 absolute top-3 left-3" />
              <Plus className="w-3 h-3 text-[#9a5a2e]/60 absolute top-3 right-3" />
              <Plus className="w-3 h-3 text-[#9a5a2e]/60 absolute bottom-3 left-3" />
              <Plus className="w-3 h-3 text-[#9a5a2e]/60 absolute bottom-3 right-3" />
            </div>

            <div className="relative w-full max-w-[540px] h-[420px] sm:h-[465px]">
              {/* Layer 3 (Core Specs Plane — Top-Left Stagger) */}
              <motion.button
                type="button"
                onMouseEnter={playHoverTick}
                onClick={() => selectLayer('specs')}
                animate={{
                  scale: activeLayer === 'specs' ? 1 : 0.92,
                  rotate: activeLayer === 'specs' ? 0 : -3,
                  x: activeLayer === 'specs' ? 0 : -14,
                  y: activeLayer === 'specs' ? 0 : -12,
                }}
                whileHover={{ scale: activeLayer === 'specs' ? 1.01 : 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                aria-label="Bring Core Specs system layer to front"
                className={`absolute inset-x-4 sm:inset-x-8 top-4 bottom-8 rounded-3xl p-5 sm:p-6 backdrop-blur-2xl border text-left transition-shadow duration-300 cursor-pointer flex flex-col justify-between overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9a5a2e] ${
                  activeLayer === 'specs'
                    ? 'z-30 bg-[#fff1e8]/95 border-[#9a5a2e]/60 shadow-[0_28px_70px_rgba(62,31,15,0.22)]'
                    : 'z-10 bg-white/75 border-[#d39a6a]/45 shadow-lg opacity-85 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#3e1f0f]/10">
                  <span className="font-mono text-xs text-[#9a5a2e] font-semibold">
                    Layer 03 · Specifications &amp; Roadmap
                  </span>
                  <Cpu className="w-4 h-4 text-[#9a5a2e]" />
                </div>

                <div className="grid grid-cols-2 gap-3 my-auto py-3">
                  {project.specifications.slice(0, 4).map((spec) => (
                    <div
                      key={spec.label}
                      className="rounded-xl bg-white/80 border border-[#d39a6a]/30 p-3 space-y-1"
                    >
                      <p className="font-mono text-[10px] text-[#7A4B31] uppercase">
                        {spec.label}
                      </p>
                      <p className="text-xs font-semibold text-[#3e1f0f] line-clamp-2">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#3e1f0f]/10 flex items-center justify-between text-xs">
                  <span className="text-[#5C341F] truncate pr-2">
                    Next: {project.futureRoadmap[0]?.title}
                  </span>
                  <span className="font-mono text-[#9a5a2e] shrink-0">Tap layer</span>
                </div>
              </motion.button>

              {/* Layer 2 (Architecture & Pipeline Plane — Bottom-Right Stagger) */}
              <motion.button
                type="button"
                onMouseEnter={playHoverTick}
                onClick={() => selectLayer('architecture')}
                animate={{
                  scale: activeLayer === 'architecture' ? 1 : 0.94,
                  rotate: activeLayer === 'architecture' ? 0 : 2.5,
                  x: activeLayer === 'architecture' ? 0 : 14,
                  y: activeLayer === 'architecture' ? 0 : 12,
                }}
                whileHover={{ scale: activeLayer === 'architecture' ? 1.01 : 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                aria-label="Bring System Architecture layer to front"
                className={`absolute inset-x-4 sm:inset-x-8 top-6 bottom-6 rounded-3xl p-5 sm:p-6 backdrop-blur-2xl border text-left transition-shadow duration-300 cursor-pointer flex flex-col justify-between overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d39a6a] ${
                  activeLayer === 'architecture'
                    ? 'z-30 bg-[#241108]/95 text-[#fff1e8] border-[#d39a6a]/65 shadow-[0_30px_75px_rgba(36,17,8,0.45)]'
                    : 'z-20 bg-[#3e1f0f]/88 text-[#fff1e8] border-[#d39a6a]/35 shadow-xl opacity-90 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#d39a6a]/20">
                  <span className="font-mono text-xs text-[#d39a6a] font-semibold">
                    Layer 02 · System Architecture Flow
                  </span>
                  <Layers className="w-4 h-4 text-[#d39a6a]" />
                </div>

                <div className="space-y-2.5 my-auto py-2">
                  <p className="text-xs text-[#E8C9B5] leading-relaxed line-clamp-2">
                    {project.architecture}
                  </p>
                  {project.featureWalkthrough.slice(0, 3).map((step, sIdx) => (
                    <div
                      key={step.id}
                      className="rounded-xl bg-white/[0.06] border border-[#d39a6a]/25 px-3.5 py-2.5 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] text-[#d39a6a]">
                          STAGE 0{sIdx + 1} · {step.stepLabel}
                        </p>
                        <p className="text-xs font-semibold text-[#fff1e8] truncate">
                          {step.title}
                        </p>
                      </div>
                      <span className="font-mono text-[10px] text-[#E8C9B5] shrink-0">
                        {step.spec}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#d39a6a]/20 flex items-center justify-between text-xs text-[#E8C9B5]">
                  <span>{project.stack.slice(0, 3).join(' · ')}</span>
                  <span className="font-mono text-[#d39a6a]">Tap layer</span>
                </div>
              </motion.button>

              {/* Layer 1 (Primary Interface Plane — Center Focal Layer) */}
              <motion.button
                type="button"
                onMouseEnter={playHoverTick}
                onClick={() => selectLayer('interface')}
                animate={{
                  scale: activeLayer === 'interface' ? 1 : 0.91,
                  rotate: activeLayer === 'interface' ? 0 : -1.5,
                  x: activeLayer === 'interface' ? 0 : -6,
                  y: activeLayer === 'interface' ? 0 : 18,
                }}
                whileHover={{ scale: activeLayer === 'interface' ? 1.01 : 0.94 }}
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                aria-label="Bring Live App Interface layer to front"
                className={`absolute inset-x-4 sm:inset-x-8 top-5 bottom-7 rounded-3xl p-4 sm:p-5 backdrop-blur-2xl border text-left transition-shadow duration-300 cursor-pointer flex flex-col justify-between overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9a5a2e] ${
                  activeLayer === 'interface'
                    ? 'z-30 bg-white/85 border-[#9a5a2e]/55 shadow-[0_28px_72px_rgba(62,31,15,0.26)]'
                    : 'z-10 bg-white/70 border-[#d39a6a]/40 shadow-lg opacity-85 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#3e1f0f]/10">
                  <span className="font-mono text-xs text-[#9a5a2e] font-semibold">
                    Layer 01 · Interface Preview
                  </span>
                  <Smartphone className="w-4 h-4 text-[#9a5a2e]" />
                </div>

                <div className="flex-1 my-2.5 flex items-center justify-center overflow-hidden">
                  {project.screenshotPath && !imgError ? (
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#241108] via-[#3e1f0f] to-[#5C2E16] p-4 flex items-center justify-center relative overflow-hidden border border-[#d39a6a]/30">
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(211,154,106,0.28),transparent_65%)]"
                      />
                      <div className="relative z-10 h-full max-h-[265px] aspect-[9/19.5] rounded-[22px] bg-[#160A04] p-1.5 border border-[#d39a6a]/45 shadow-2xl overflow-hidden">
                        <img
                          src={project.screenshotPath}
                          alt={project.screenshotAlt || `${project.title} interface`}
                          referrerPolicy="no-referrer"
                          onError={() => setImgError(true)}
                          className="w-full h-full object-cover object-top rounded-[16px]"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full">
                      <ProjectVisual project={project} featured />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-[#5C341F]">
                  <span className="truncate pr-2">{project.subtitle}</span>
                  <span className="font-mono text-[#9a5a2e] shrink-0">{project.metric}</span>
                </div>
              </motion.button>
            </div>

            {/* Subtle Layer Switcher Beneath System Stack */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-white/80 backdrop-blur-xl border border-[#d39a6a]/35">
              {SYSTEM_LAYER_TABS.map((tab) => {
                const isActive = activeLayer === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onMouseEnter={playHoverTick}
                    onClick={() => selectLayer(tab.id)}
                    className={`px-3 py-1.5 text-[11px] font-mono rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#3e1f0f] text-[#fff1e8] shadow-xs'
                        : 'text-[#5C341F] hover:text-[#3e1f0f]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 2. Layer 01 — Full Technical Specifications */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.14 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`${glassSectionCard} p-6 sm:p-10 space-y-6`}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#9a5a2e] tracking-wide mb-2">
                <Cpu className="w-3.5 h-3.5" />
                <span>Layer 01 · Full Specifications</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#3e1f0f]">
                System &amp; <span className="text-[#9a5a2e]">Architecture</span> Specs
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5C341F] max-w-md">
              <HighlightKeywords text={project.architecture} variant="light" />
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.specifications.map((spec, idx) => (
              <div key={spec.label} className={`${glassNestedTile} p-4 space-y-1.5`}>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-[11px] text-[#7A4B31] uppercase tracking-wider">
                    {spec.label}
                  </p>
                  <span className="font-mono text-[10px] text-[#9a5a2e] tabular-nums">
                    0{idx + 1}
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#3e1f0f] leading-snug">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>

          {/* System Architecture Signal Pipeline */}
          <div className="pt-2 space-y-3">
            <p className="font-mono text-[11px] text-[#7A4B31] uppercase tracking-wider">
              System Execution Pipeline
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
              {project.featureWalkthrough.slice(0, 3).map((stage, idx) => (
                <div key={stage.id} className="flex items-center gap-2">
                  <div className={`${glassNestedTile} flex-1 px-4 py-3.5 space-y-1`}>
                    <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
                      <span className="text-[#9a5a2e] font-semibold">
                        STAGE 0{idx + 1}
                      </span>
                      <span className="text-[#7A4B31]">{stage.spec}</span>
                    </div>
                    <p className="font-display text-sm font-bold text-[#3e1f0f] truncate">
                      {stage.title}
                    </p>
                  </div>
                  {idx < 2 && (
                    <ChevronRight
                      aria-hidden="true"
                      className="hidden md:block w-4 h-4 text-[#9a5a2e]/70 shrink-0"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 3. Layer 02 — Interactive Feature Walkthrough + Live Demo */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.14 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`${glassSectionCard} p-6 sm:p-10 space-y-8`}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs text-[#9a5a2e] tracking-wide mb-2">
                Layer 02 · Interactive Feature Walkthrough
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#3e1f0f]">
                Watch what {project.title} does step by step
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onMouseEnter={playHoverTick}
                onClick={() => {
                  playClickThock();
                  setAutoPlay((p) => !p);
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  autoPlay
                    ? 'bg-[#9a5a2e] text-[#fff1e8] border-[#9a5a2e]'
                    : 'bg-white/75 backdrop-blur-md text-[#3e1f0f] border-[#d39a6a]/40 hover:bg-white'
                }`}
              >
                {autoPlay ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause Tour</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Auto-Play Features</span>
                  </>
                )}
              </button>

              {project.screenshotPath && (
                <div className="inline-flex items-center gap-1 p-1 bg-white/60 backdrop-blur-md rounded-xl border border-[#d39a6a]/35">
                  <button
                    type="button"
                    onMouseEnter={playHoverTick}
                    onClick={() => {
                      playClickThock();
                      setViewMode('interactive');
                    }}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg cursor-pointer transition-colors ${
                      viewMode === 'interactive'
                        ? 'bg-[#3e1f0f] text-[#fff1e8] shadow-sm'
                        : 'text-[#5C341F]'
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Live Demo</span>
                  </button>
                  <button
                    type="button"
                    onMouseEnter={playHoverTick}
                    onClick={() => {
                      playClickThock();
                      setViewMode('screenshot');
                    }}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg cursor-pointer transition-colors ${
                      viewMode === 'screenshot'
                        ? 'bg-[#3e1f0f] text-[#fff1e8] shadow-sm'
                        : 'text-[#5C341F]'
                    }`}
                  >
                    <Smartphone className="w-3 h-3" />
                    <span>UI Screen</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              {project.featureWalkthrough.map((step, idx) => {
                const isActive = idx === activeStepIdx;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onMouseEnter={playHoverTick}
                    onClick={() => {
                      playClickThock();
                      setAutoPlay(false);
                      setActiveStepIdx(idx);
                    }}
                    className={`w-full text-left rounded-2xl p-5 backdrop-blur-xl border transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-[#d39a6a]/[0.20] border-[#9a5a2e] ring-2 ring-[#d39a6a]/35 shadow-sm'
                        : 'bg-[#fff1e8]/65 border-[#d39a6a]/30 ring-1 ring-[#3e1f0f]/5 hover:bg-white/80'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                      <span className={isActive ? 'text-[#9a5a2e] font-semibold' : 'text-[#7A4B31]'}>
                        {step.stepLabel}
                      </span>
                      <span className="text-[#7A4B31]">{step.spec}</span>
                    </div>
                    <h3 className="font-display text-base font-bold text-[#3e1f0f]">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C341F] leading-relaxed mt-1.5">
                      <HighlightKeywords text={step.description} variant="light" />
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 space-y-4">
              <AnimatePresence mode="wait">
                {viewMode === 'screenshot' && project.screenshotPath && !imgError ? (
                  <motion.div
                    key="real-ui"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-2xl bg-[#241108]/95 backdrop-blur-xl border border-[#d39a6a]/30 p-6 flex flex-col items-center justify-center"
                  >
                    <img
                      src={project.screenshotPath}
                      alt={project.screenshotAlt || project.title}
                      referrerPolicy="no-referrer"
                      className="max-h-[460px] w-auto rounded-2xl border border-[#d39a6a]/35 shadow-2xl"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="interactive-demo"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <InteractiveProjectDemo demoType={project.demoType} />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={`${glassNestedTile} px-5 py-4 flex flex-wrap items-center justify-between gap-3`}>
                <div className="text-xs text-[#5C341F]">
                  <span className="font-mono text-[#9a5a2e] font-semibold">
                    {currentStep.stepLabel}:
                  </span>{' '}
                  {currentStep.title}
                </div>
                <span className="font-mono text-xs text-[#7A4B31]">{currentStep.spec}</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 4. Layer 03 — All Features Grid */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.14 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`${glassSectionCard} p-6 sm:p-10 space-y-6`}
        >
          <div>
            <p className="font-mono text-xs text-[#9a5a2e] tracking-wide mb-2">
              Layer 03 · Complete Feature Set
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#3e1f0f]">
              All Features Built &amp; Designed
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.allFeatures.map((feat, idx) => (
              <div key={feat.title} className={`${glassNestedTile} p-5 space-y-2`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#9a5a2e] shrink-0 mt-0.5" />
                    <h3 className="font-display text-base font-bold text-[#3e1f0f] leading-snug">
                      {feat.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-[#9a5a2e]/75 tabular-nums shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5C341F] leading-relaxed pl-6">
                  <HighlightKeywords text={feat.detail} variant="light" />
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 5. Layer 04 — Future Roadmap & Long-Term Vision */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.14 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-[#3e1f0f]/92 backdrop-blur-2xl text-[#fff1e8] p-6 sm:p-10 border border-[#d39a6a]/30 ring-1 ring-inset ring-white/10 shadow-[0_24px_60px_rgba(62,31,15,0.35)] space-y-6 relative overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 -right-24 w-96 h-96 rounded-full bg-[#d39a6a]/22 blur-3xl"
          />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#d39a6a] tracking-wide mb-2">
                <Rocket className="w-3.5 h-3.5" />
                <span>Layer 04 · Future Roadmap &amp; Expansion</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#fff1e8]">
                Where <span className="text-[#d39a6a]">{project.title}</span> goes{' '}
                <span className="text-[#fff1e8] underline decoration-[#d39a6a] decoration-2 underline-offset-4">
                  next
                </span>
              </h2>
            </div>
            <p className="text-xs text-[#E8C9B5] max-w-sm">
              Planned engineering upgrades, production hardening, and long-term capabilities on the roadmap.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.futureRoadmap.map((milestone) => (
              <div
                key={milestone.title}
                className="rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-[#d39a6a]/25 ring-1 ring-inset ring-white/5 p-5 space-y-2"
              >
                <span className="font-mono text-[11px] text-[#d39a6a] uppercase tracking-wider font-semibold">
                  {milestone.phase}
                </span>
                <h3 className="font-display text-base font-bold text-[#fff1e8] leading-snug">
                  {milestone.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#E8C9B5] leading-relaxed">
                  <HighlightKeywords text={milestone.detail} variant="dark" />
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Next Project Translucent Glass Navigation Card */}
        <section className="pt-2">
          <button
            type="button"
            onMouseEnter={playHoverTick}
            onClick={() => {
              playClickThock();
              onSelectProject(nextProject.id);
            }}
            className="w-full text-left rounded-3xl bg-white/60 hover:bg-white/85 backdrop-blur-2xl border border-[#d39a6a]/40 ring-1 ring-[#3e1f0f]/5 p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all shadow-[0_10px_40px_rgba(62,31,15,0.08)] hover:shadow-[0_18px_48px_rgba(62,31,15,0.14)] cursor-pointer group"
          >
            <div className="space-y-1.5">
              <p className="font-mono text-xs text-[#9a5a2e]">
                Up Next · {nextProject.index} · {nextProject.stage}
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#3e1f0f] group-hover:text-[#9a5a2e] transition-colors">
                {nextProject.title}
              </h3>
              <p className="text-sm text-[#5C341F]">{nextProject.subtitle}</p>
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#3e1f0f] group-hover:bg-[#9a5a2e] text-[#fff1e8] text-sm font-semibold transition-colors whitespace-nowrap shrink-0">
              <span>Open Project Page</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </section>
      </main>
    </motion.div>
  );
}
