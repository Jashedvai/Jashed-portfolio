import { type PointerEvent, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'motion/react';
import { ArrowUpRight, Layers, LayoutGrid, Plus, X } from 'lucide-react';
import {
  ProjectCategory,
  SELECTED_PROJECTS,
  StudentProject,
} from '../data/portfolioData';
import { ProjectVisual } from './ProjectVisual';
import { Tilt3DCard } from './Tilt3DCard';
import { HighlightKeywords } from './HighlightKeywords';
import { playClickThock, playHoverTick } from '../utils/soundEffects';

const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Works' },
  { id: 'flagship', label: 'Flagship' },
  { id: 'applications', label: 'Applications' },
  { id: 'experiments', label: 'Creative UI' },
];

type OverviewLayerKey = 'visual' | 'overview' | 'roadmap';

export interface ActiveSkillFilter {
  label: string;
  projectIds: string[];
}

interface ProjectsBentoProps {
  activeSkillFilter: ActiveSkillFilter | null;
  onClearSkillFilter: () => void;
  onOpenProject: (projectId: string) => void;
}

export function ProjectsBento({
  activeSkillFilter,
  onClearSkillFilter,
  onOpenProject,
}: ProjectsBentoProps) {
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const [displayMode, setDisplayMode] = useState<'grid' | 'layers'>('grid');
  const [selectedLayerProjectIdx, setSelectedLayerProjectIdx] = useState(0);
  const [focusedDeckLayer, setFocusedDeckLayer] = useState<OverviewLayerKey>('visual');

  useEffect(() => {
    if (activeSkillFilter) {
      setFilter('all');
    }
  }, [activeSkillFilter]);

  const visibleProjects =
    filter === 'all'
      ? SELECTED_PROJECTS
      : SELECTED_PROJECTS.filter((project) => project.category === filter);

  const safeLayerIdx =
    selectedLayerProjectIdx < visibleProjects.length ? selectedLayerProjectIdx : 0;
  const activeLayerProject = visibleProjects[safeLayerIdx] ?? visibleProjects[0];

  const matchedCount = activeSkillFilter
    ? visibleProjects.filter((p) => activeSkillFilter.projectIds.includes(p.id)).length
    : 0;

  return (
    <section
      id="projects"
      className="relative py-20 lg:py-28 bg-[#fff1e8] bg-cad-grid-light border-b border-[#3e1f0f]/10"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header + Category Tabs + Grid / Layer System Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-xl">
            <p className="font-mono text-xs text-[#9a5a2e] tracking-wide mb-3">
              01 · Selected Works
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#3e1f0f] [text-wrap:balance]">
              Tap any project photo to explore{' '}
              <span className="text-[#9a5a2e]">full specifications</span>,{' '}
              <span className="text-[#3e1f0f] underline decoration-[#d39a6a] decoration-2 underline-offset-4">
                features
              </span>
              , and <span className="text-[#9a5a2e]">future roadmap</span>.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-white/75 backdrop-blur-2xl rounded-xl border border-[#d39a6a]/35 shadow-xs"
            >
              {CATEGORIES.map((cat) => {
                const active = filter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onMouseEnter={playHoverTick}
                    onClick={() => {
                      playClickThock();
                      setFilter(cat.id);
                      setSelectedLayerProjectIdx(0);
                    }}
                    className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#3e1f0f] text-[#fff1e8] shadow-sm'
                        : 'text-[#5C341F] hover:text-[#3e1f0f]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Grid vs Layered Overview View Switcher */}
            <div
              role="tablist"
              aria-label="Project showcase layout mode"
              className="inline-flex items-center gap-1 p-1 bg-white/75 backdrop-blur-2xl rounded-xl border border-[#d39a6a]/35 shadow-xs"
            >
              <button
                type="button"
                role="tab"
                aria-selected={displayMode === 'grid'}
                onMouseEnter={playHoverTick}
                onClick={() => {
                  playClickThock();
                  setDisplayMode('grid');
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  displayMode === 'grid'
                    ? 'bg-[#9a5a2e] text-[#fff1e8] shadow-xs'
                    : 'text-[#5C341F] hover:text-[#3e1f0f]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={displayMode === 'layers'}
                onMouseEnter={playHoverTick}
                onClick={() => {
                  playClickThock();
                  setDisplayMode('layers');
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  displayMode === 'layers'
                    ? 'bg-[#9a5a2e] text-[#fff1e8] shadow-xs'
                    : 'text-[#5C341F] hover:text-[#3e1f0f]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Layer View</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Active Skill Highlight Bar (shown only when filtered from Skills section) */}
        <AnimatePresence>
          {activeSkillFilter && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 rounded-2xl bg-white/85 backdrop-blur-2xl border border-[#9a5a2e]/40 px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#3e1f0f]">
                <span className="font-mono text-[#9a5a2e] font-semibold">Skill Filter</span>
                <span aria-hidden="true">·</span>
                <span>
                  Highlighting <strong className="tabular-nums">{matchedCount}</strong>{' '}
                  {matchedCount === 1 ? 'project' : 'projects'} using{' '}
                  <strong>{activeSkillFilter.label}</strong>
                </span>
              </div>

              <button
                type="button"
                onMouseEnter={playHoverTick}
                onClick={() => {
                  playClickThock();
                  onClearSkillFilter();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9a5a2e] hover:text-[#3e1f0f] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear Highlight</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {displayMode === 'grid' ? (
          /* Minimalist Photo + Name Project Gallery Grid with Scroll-Triggered Slide-Up */
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
          >
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, idx) => {
                const isLead = filter === 'all' && idx === 0;
                const isHighlighted = activeSkillFilter
                  ? activeSkillFilter.projectIds.includes(project.id)
                  : false;
                const isDimmed = Boolean(activeSkillFilter && !isHighlighted);

                return (
                  <SpotlightProjectCard
                    key={project.id}
                    project={project}
                    idx={idx}
                    isLead={isLead}
                    isHighlighted={isHighlighted}
                    isDimmed={isDimmed}
                    onOpenProject={onOpenProject}
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Layered System Overview View (2nd Section Layer Design) */
          activeLayerProject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              {/* Left Project Selector List */}
              <div className="lg:col-span-5 space-y-2.5">
                {visibleProjects.map((proj, idx) => {
                  const active = idx === safeLayerIdx;
                  return (
                    <button
                      key={proj.id}
                      type="button"
                      onMouseEnter={playHoverTick}
                      onClick={() => {
                        playClickThock();
                        setSelectedLayerProjectIdx(idx);
                      }}
                      className={`w-full text-left rounded-2xl px-4 py-3.5 border transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer ${
                        active
                          ? 'bg-[#3e1f0f] text-[#fff1e8] border-[#9a5a2e] shadow-md'
                          : 'bg-white/70 hover:bg-white text-[#3e1f0f] border-[#d39a6a]/30'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`font-mono text-xs tabular-nums ${
                            active ? 'text-[#d39a6a]' : 'text-[#9a5a2e]'
                          }`}
                        >
                          {proj.index}
                        </span>
                        <div className="min-w-0">
                          <p className="font-display text-sm sm:text-base font-bold truncate">
                            {proj.title}
                          </p>
                          <p
                            className={`text-[11px] truncate ${
                              active ? 'text-[#E8C9B5]' : 'text-[#7A4B31]'
                            }`}
                          >
                            {proj.subtitle}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight
                        className={`w-4 h-4 shrink-0 ${
                          active ? 'text-[#d39a6a]' : 'text-[#9a5a2e]/60'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right Interactive 3-Layer Overview Deck */}
              <div className="lg:col-span-7 relative min-h-[470px] sm:min-h-[520px] flex flex-col items-center justify-center">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2 rounded-3xl bg-cad-dots-light border border-[#3e1f0f]/10 bg-[radial-gradient(circle_at_30%_25%,rgba(211,154,106,0.28),transparent_58%),radial-gradient(circle_at_75%_75%,rgba(154,90,46,0.16),transparent_60%)]"
                >
                  <Plus className="w-3 h-3 text-[#9a5a2e]/60 absolute top-3 left-3" />
                  <Plus className="w-3 h-3 text-[#9a5a2e]/60 absolute top-3 right-3" />
                  <Plus className="w-3 h-3 text-[#9a5a2e]/60 absolute bottom-3 left-3" />
                  <Plus className="w-3 h-3 text-[#9a5a2e]/60 absolute bottom-3 right-3" />
                </div>

                <div className="relative w-full max-w-[520px] h-[410px] sm:h-[450px]">
                  {/* Back Layer: Roadmap & Future Scope */}
                  <motion.button
                    type="button"
                    onMouseEnter={playHoverTick}
                    onClick={() => {
                      playClickThock();
                      setFocusedDeckLayer('roadmap');
                    }}
                    animate={{
                      scale: focusedDeckLayer === 'roadmap' ? 1 : 0.92,
                      rotate: focusedDeckLayer === 'roadmap' ? 0 : -3,
                      x: focusedDeckLayer === 'roadmap' ? 0 : -14,
                      y: focusedDeckLayer === 'roadmap' ? 0 : -10,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                    className={`absolute inset-x-4 sm:inset-x-6 top-4 bottom-8 rounded-3xl p-5 sm:p-6 backdrop-blur-2xl border text-left cursor-pointer flex flex-col justify-between overflow-hidden ${
                      focusedDeckLayer === 'roadmap'
                        ? 'z-30 bg-[#fff1e8]/95 border-[#9a5a2e]/60 shadow-[0_26px_65px_rgba(62,31,15,0.22)]'
                        : 'z-10 bg-white/75 border-[#d39a6a]/45 shadow-lg opacity-85 hover:opacity-100'
                    }`}
                  >
                    <p className="font-mono text-xs text-[#9a5a2e] font-semibold">
                      03 · Future Roadmap &amp; Highlights
                    </p>
                    <div className="space-y-2.5 my-auto">
                      {activeLayerProject.futureRoadmap.map((step) => (
                        <div
                          key={step.title}
                          className="rounded-xl bg-white/80 border border-[#d39a6a]/30 p-3"
                        >
                          <p className="font-mono text-[10px] text-[#9a5a2e]">{step.phase}</p>
                          <p className="text-xs font-bold text-[#3e1f0f]">{step.title}</p>
                        </div>
                      ))}
                    </div>
                    <span className="font-mono text-[11px] text-[#7A4B31]">
                      Tap layer to focus · Click Open below
                    </span>
                  </motion.button>

                  {/* Mid Layer: Project Overview & Architecture */}
                  <motion.button
                    type="button"
                    onMouseEnter={playHoverTick}
                    onClick={() => {
                      playClickThock();
                      setFocusedDeckLayer('overview');
                    }}
                    animate={{
                      scale: focusedDeckLayer === 'overview' ? 1 : 0.94,
                      rotate: focusedDeckLayer === 'overview' ? 0 : 2.5,
                      x: focusedDeckLayer === 'overview' ? 0 : 14,
                      y: focusedDeckLayer === 'overview' ? 0 : 10,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                    className={`absolute inset-x-4 sm:inset-x-6 top-6 bottom-6 rounded-3xl p-5 sm:p-6 backdrop-blur-2xl border text-left cursor-pointer flex flex-col justify-between overflow-hidden ${
                      focusedDeckLayer === 'overview'
                        ? 'z-30 bg-[#241108]/95 text-[#fff1e8] border-[#d39a6a]/65 shadow-[0_28px_70px_rgba(36,17,8,0.45)]'
                        : 'z-20 bg-[#3e1f0f]/90 text-[#fff1e8] border-[#d39a6a]/35 shadow-xl opacity-90 hover:opacity-100'
                    }`}
                  >
                    <p className="font-mono text-xs text-[#d39a6a] font-semibold">
                      02 · Project Overview &amp; Architecture
                    </p>
                    <div className="space-y-3 my-auto">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#fff1e8]">
                        {activeLayerProject.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#E8C9B5] leading-relaxed line-clamp-4">
                        <HighlightKeywords text={activeLayerProject.whatItDoes} variant="dark" />
                      </p>
                      <p className="font-mono text-[11px] text-[#d39a6a]">
                        {activeLayerProject.stack.join(' · ')}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] text-[#E8C9B5]">
                      {activeLayerProject.metric}
                    </span>
                  </motion.button>

                  {/* Front Layer: Visual Interface Card */}
                  <motion.button
                    type="button"
                    onMouseEnter={playHoverTick}
                    onClick={() => {
                      playClickThock();
                      setFocusedDeckLayer('visual');
                    }}
                    animate={{
                      scale: focusedDeckLayer === 'visual' ? 1 : 0.91,
                      rotate: focusedDeckLayer === 'visual' ? 0 : -1.5,
                      x: focusedDeckLayer === 'visual' ? 0 : -6,
                      y: focusedDeckLayer === 'visual' ? 0 : 16,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                    className={`absolute inset-x-4 sm:inset-x-6 top-5 bottom-7 rounded-3xl p-4 backdrop-blur-2xl border text-left cursor-pointer flex flex-col justify-between overflow-hidden ${
                      focusedDeckLayer === 'visual'
                        ? 'z-30 bg-white/90 border-[#9a5a2e]/55 shadow-[0_26px_65px_rgba(62,31,15,0.24)]'
                        : 'z-10 bg-white/75 border-[#d39a6a]/40 shadow-lg opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div className="flex-1 overflow-hidden">
                      <ProjectVisual project={activeLayerProject} featured />
                    </div>
                    <div className="pt-3 px-2 flex items-center justify-between gap-3">
                      <span className="font-display text-base font-bold text-[#3e1f0f] truncate">
                        {activeLayerProject.title}
                      </span>
                      <span className="font-mono text-[11px] text-[#9a5a2e] shrink-0">
                        01 · Interface
                      </span>
                    </div>
                  </motion.button>
                </div>

                {/* Bottom Controls: Layer Switcher + Open Full Project Page CTA */}
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-white/80 backdrop-blur-xl border border-[#d39a6a]/35">
                    {(
                      [
                        { id: 'visual', label: '01 · Interface' },
                        { id: 'overview', label: '02 · Overview' },
                        { id: 'roadmap', label: '03 · Roadmap' },
                      ] as const
                    ).map((layer) => (
                      <button
                        key={layer.id}
                        type="button"
                        onMouseEnter={playHoverTick}
                        onClick={() => {
                          playClickThock();
                          setFocusedDeckLayer(layer.id);
                        }}
                        className={`px-3 py-1.5 text-[11px] font-mono rounded-lg transition-all cursor-pointer ${
                          focusedDeckLayer === layer.id
                            ? 'bg-[#3e1f0f] text-[#fff1e8] shadow-xs'
                            : 'text-[#5C341F] hover:text-[#3e1f0f]'
                        }`}
                      >
                        {layer.label}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onMouseEnter={playHoverTick}
                    onClick={() => {
                      playClickThock();
                      onOpenProject(activeLayerProject.id);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#fff1e8] bg-[#9a5a2e] hover:bg-[#3e1f0f] rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Open Full Project Page</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
}

interface SpotlightProjectCardProps {
  project: StudentProject;
  idx: number;
  isLead: boolean;
  isHighlighted: boolean;
  isDimmed: boolean;
  onOpenProject: (projectId: string) => void;
}

function SpotlightProjectCard({
  project,
  idx,
  isLead,
  isHighlighted,
  isDimmed,
  onOpenProject,
}: SpotlightProjectCardProps) {
  const trackerRef = useRef<HTMLElement>(null);
  const [isSpotlightActive, setIsSpotlightActive] = useState(false);

  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);
  const springX = useSpring(mouseX, { stiffness: 340, damping: 32, mass: 0.45 });
  const springY = useSpring(mouseY, { stiffness: 340, damping: 32, mass: 0.45 });

  const surfaceSpotlight = useMotionTemplate`radial-gradient(360px circle at ${springX}px ${springY}px, rgba(211, 154, 106, 0.24), rgba(154, 90, 46, 0.08) 46%, transparent 74%)`;
  const borderSpotlight = useMotionTemplate`radial-gradient(240px circle at ${springX}px ${springY}px, rgba(154, 90, 46, 0.68), rgba(211, 154, 106, 0.35) 45%, transparent 72%)`;

  const updatePointer = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return;
    const rect = trackerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.14 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      whileHover={{ y: -5 }}
      transition={{
        duration: 0.56,
        delay: (idx % 3) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      ref={trackerRef}
      onPointerEnter={(e) => {
        if (e.pointerType !== 'touch') {
          updatePointer(e);
          setIsSpotlightActive(true);
        }
      }}
      onPointerMove={updatePointer}
      onPointerLeave={() => setIsSpotlightActive(false)}
      className={isLead ? 'sm:col-span-2 lg:col-span-2 flex' : 'flex'}
    >
      <Tilt3DCard
        maxTilt={6}
        glareOpacity={0}
        onMouseEnter={playHoverTick}
        onClick={() => {
          playClickThock();
          onOpenProject(project.id);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            playClickThock();
            onOpenProject(project.id);
          }
        }}
        role="button"
        tabIndex={0}
        ariaLabel={`${project.title} — Open full specification, features, and roadmap`}
        className={`group w-full rounded-3xl border backdrop-blur-2xl transition-all duration-200 flex flex-col p-3.5 sm:p-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9a5a2e] ${
          isHighlighted
            ? 'bg-white/95 border-[#9a5a2e] ring-2 ring-[#d39a6a]/45 shadow-[0_14px_40px_rgba(154,90,46,0.18)]'
            : 'bg-white/75 border-[#d39a6a]/35 ring-1 ring-inset ring-white/80 hover:bg-white hover:border-[#9a5a2e]/50 shadow-[0_4px_24px_rgba(62,31,15,0.05)] hover:shadow-[0_22px_52px_rgba(62,31,15,0.14)]'
        }`}
      >
        {/* Framer Motion Pointer-Following Spotlight & Perimeter Rim Layers */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden z-10"
        >
          <motion.div
            style={{ background: surfaceSpotlight }}
            className={`absolute inset-0 transition-opacity duration-300 ${
              isSpotlightActive ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <motion.div
            style={{
              background: borderSpotlight,
              padding: '1.5px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
            className={`absolute inset-0 rounded-[inherit] transition-opacity duration-300 ${
              isSpotlightActive ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        <div
          style={{ transformStyle: 'preserve-3d' }}
          className={`relative z-20 flex-1 flex flex-col justify-between transition-opacity duration-200 ${
            isDimmed ? 'opacity-45 group-hover:opacity-100' : 'opacity-100'
          }`}
        >
          <div style={{ transform: 'translateZ(12px)' }}>
            <ProjectVisual project={project} featured={isLead} />
          </div>

          <div
            style={{ transform: 'translateZ(18px)' }}
            className="px-2 pt-4 pb-1.5 flex items-center justify-between gap-3"
          >
            <h3 className="font-display text-lg sm:text-xl font-bold text-[#3e1f0f] tracking-tight group-hover:text-[#9a5a2e] transition-colors truncate">
              {project.title}
            </h3>

            <ArrowUpRight className="w-4 h-4 text-[#9a5a2e]/70 group-hover:text-[#9a5a2e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </div>
        </div>
      </Tilt3DCard>
    </motion.article>
  );
}
