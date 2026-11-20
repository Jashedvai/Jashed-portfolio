import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Check, Copy, Filter, Send, X } from 'lucide-react';
import { JASHED_PROFILE, TECH_AREAS, TechMaturity } from '../data/portfolioData';
import type { ActiveSkillFilter } from './ProjectsBento';
import { HighlightKeywords } from './HighlightKeywords';

const MATURITY_FILTERS: TechMaturity[] = ['All', 'Hands-On', 'Learning', 'Exploring'];

const QUICK_PROJECT_SKILLS: { label: string; projectIds: string[] }[] = [
  { label: 'Python & Django', projectIds: ['stockpilot', 'ai-manga-colorizer'] },
  { label: 'Kotlin & Compose', projectIds: ['panelflow-ai', 'liquid-morph-player', 'medicine-center'] },
  { label: 'PaddleOCR & YOLOv8', projectIds: ['panelflow-ai'] },
  { label: 'Java & JS', projectIds: ['tricode-nexus', 'cpitimeline', 'stockpilot'] },
  { label: 'SQLite & MySQL', projectIds: ['stockpilot', 'medicine-center'] },
  { label: 'Flutter & FastAPI', projectIds: ['nova-os'] },
  { label: 'UI/UX & Motion', projectIds: ['tricode-nexus', 'nova-os', 'liquid-morph-player'] },
];

interface SkillsAndContactProps {
  activeSkillFilter: ActiveSkillFilter | null;
  onSelectSkillFilter: (
    filter: ActiveSkillFilter | null,
    scrollToProjects?: boolean
  ) => void;
  section?: 'skills' | 'contact' | 'both';
  onJumpToProjects?: () => void;
}

export function SkillsAndContact({
  activeSkillFilter,
  onSelectSkillFilter,
  section = 'both',
  onJumpToProjects,
}: SkillsAndContactProps) {
  const [activeGroupId, setActiveGroupId] = useState(TECH_AREAS[0].id);
  const [maturityFilter, setMaturityFilter] = useState<TechMaturity>('All');
  const [copied, setCopied] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const activeGroup = TECH_AREAS.find((g) => g.id === activeGroupId) ?? TECH_AREAS[0];
  const visibleItems =
    maturityFilter === 'All'
      ? activeGroup.items
      : activeGroup.items.filter((item) => item.maturity === maturityFilter);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(JASHED_PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError('Please fill in your name, email address, and message.');
      return;
    }
    setFormError('');
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  const scrollToProjects = () => {
    if (onJumpToProjects) {
      onJumpToProjects();
      return;
    }
    const el = document.querySelector('#projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showSkills = section === 'skills' || section === 'both';
  const showContact = section === 'contact' || section === 'both';

  return (
    <>
      {/* Honest Technology & Tools Matrix */}
      {showSkills && (
      <section id="skills" className="py-16 lg:py-24 bg-[#fff1e8] bg-cad-grid-light border-b border-[#9a5a2e]/15">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-xl">
              <p className="font-mono text-xs text-[#9a5a2e] tracking-wide mb-3">
                04 · Technology &amp; Tools
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#3e1f0f] [text-wrap:balance]">
                Separating <span className="text-[#9a5a2e]">hands-on tools</span> from
                technologies I am <span className="text-[#7A4421]">learning</span> or{' '}
                <span className="text-[#9a5a2e]">exploring</span>.
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Technology domains"
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#d39a6a]/20 border border-[#9a5a2e]/15 rounded-xl self-start lg:self-auto"
            >
              {TECH_AREAS.map((group) => {
                const active = group.id === activeGroupId;
                return (
                  <motion.button
                    key={group.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveGroupId(group.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    className={`relative px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'text-[#3e1f0f]'
                        : 'text-[#5C341F] hover:text-[#3e1f0f]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="tech-domain-active"
                        transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                        aria-hidden="true"
                        className="absolute inset-0 bg-white rounded-lg shadow-sm"
                      />
                    )}
                    <span className="relative z-10">{group.title}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Skill Category Relative Proficiency Progress Bars */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {TECH_AREAS.map((area, idx) => {
              const isActiveArea = area.id === activeGroupId;
              return (
                <motion.button
                  key={area.id}
                  type="button"
                  onClick={() => setActiveGroupId(area.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  className={`text-left rounded-2xl border p-5 space-y-3 transition-all duration-150 cursor-pointer ${
                    isActiveArea
                      ? 'bg-white border-[#9a5a2e] ring-2 ring-[#9a5a2e]/20 shadow-sm'
                      : 'bg-white/75 border-[#9a5a2e]/15 hover:border-[#9a5a2e]/35 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-sm font-bold text-[#3e1f0f]">
                        <span className="font-mono text-[11px] text-[#9a5a2e] mr-1.5 tabular-nums">
                          0{idx + 1}
                        </span>
                        {area.title}
                      </p>
                      <p className="text-xs text-[#7A4B31] mt-0.5">{area.proficiencySummary}</p>
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#9a5a2e] tabular-nums shrink-0">
                      {area.proficiencyLevel}%
                    </span>
                  </div>

                  <div
                    role="progressbar"
                    aria-label={`${area.title} relative proficiency`}
                    aria-valuenow={area.proficiencyLevel}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    className="h-2 w-full rounded-full bg-[#d39a6a]/20 overflow-hidden"
                  >
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: area.proficiencyLevel / 100 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.65,
                        delay: idx * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`h-full w-full origin-left rounded-full transition-colors duration-200 ${
                        isActiveArea ? 'bg-[#9a5a2e]' : 'bg-[#d39a6a]'
                      }`}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Interactive Skill-to-Project Bento Filter Bar */}
          <div className="mb-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-[#9a5a2e]/15 p-5 space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-medium text-[#3e1f0f]">
                <Filter className="w-3.5 h-3.5 text-[#9a5a2e]" />
                <span>Highlight matching projects in the Bento Grid</span>
              </div>

              {activeSkillFilter && (
                <div className="flex items-center gap-3">
                  <motion.button
                    type="button"
                    onClick={scrollToProjects}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.14 }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#9a5a2e] hover:text-[#7A4421] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Jump to Highlighted Projects</span>
                    <ArrowUp className="w-3.5 h-3.5" />
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => onSelectSkillFilter(null, false)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.14 }}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#7A4B31] hover:text-[#3e1f0f] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </motion.button>
                </div>
              )}
            </div>

            <div
              role="group"
              aria-label="Filter projects by technology"
              className="flex flex-wrap items-center gap-2"
            >
              <motion.button
                type="button"
                aria-pressed={activeSkillFilter === null}
                onClick={() => onSelectSkillFilter(null, false)}
                whileHover={{ y: -1.5, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  activeSkillFilter === null
                    ? 'bg-[#3e1f0f] text-[#fff1e8] border-[#3e1f0f] ring-2 ring-[#3e1f0f]/20 shadow-sm'
                    : 'bg-[#fff1e8]/70 text-[#5C341F] border-[#9a5a2e]/20 hover:text-[#3e1f0f] hover:border-[#9a5a2e]/40'
                }`}
              >
                All Projects
              </motion.button>

              {QUICK_PROJECT_SKILLS.map((skill) => {
                const isSelected = activeSkillFilter?.label === skill.label;
                return (
                  <motion.button
                    key={skill.label}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() =>
                      onSelectSkillFilter(
                        isSelected ? null : skill,
                        !isSelected
                      )
                    }
                    whileHover={{ y: -1.5, scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#9a5a2e] text-[#fff1e8] border-[#9a5a2e] ring-2 ring-[#9a5a2e]/25 shadow-sm'
                        : 'bg-[#fff1e8]/70 text-[#5C341F] border-[#9a5a2e]/20 hover:border-[#9a5a2e]/45 hover:bg-[#d39a6a]/20 hover:text-[#3e1f0f]'
                    }`}
                  >
                    <span>{skill.label}</span>
                    <span
                      className={`ml-1.5 font-mono text-[11px] tabular-nums ${
                        isSelected ? 'text-[#fff1e8]/90' : 'text-[#7A4B31]'
                      }`}
                    >
                      ({skill.projectIds.length})
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <p className="text-sm text-[#5C341F]">{activeGroup.subtitle}</p>

            {/* Maturity Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter by experience level"
              className="inline-flex items-center gap-1 p-1 bg-white/85 border border-[#9a5a2e]/15 rounded-lg self-start sm:self-auto"
            >
              {MATURITY_FILTERS.map((level) => {
                const active = maturityFilter === level;
                return (
                  <motion.button
                    key={level}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setMaturityFilter(level)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 480, damping: 30 }}
                    className={`relative px-2.5 py-1 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'text-[#fff1e8]'
                        : 'text-[#5C341F] hover:text-[#3e1f0f]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="maturity-filter-active"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        aria-hidden="true"
                        className="absolute inset-0 bg-[#9a5a2e] rounded-md"
                      />
                    )}
                    <span className="relative z-10">{level}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {visibleItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {visibleItems.map((item, idx) => {
                const isCardHighlighted = activeSkillFilter?.label === item.name;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className={`rounded-2xl border p-6 flex flex-col justify-between gap-4 transition-all duration-150 ${
                      isCardHighlighted
                        ? 'bg-white border-[#9a5a2e] ring-2 ring-[#9a5a2e]/25 shadow-sm'
                        : 'bg-white/85 border-[#9a5a2e]/15 hover:border-[#9a5a2e]/35'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-base font-bold text-[#3e1f0f]">
                          {item.name}
                        </h3>
                        <span className="font-mono text-xs text-[#9a5a2e] whitespace-nowrap shrink-0">
                          {item.maturity}
                        </span>
                      </div>
                      <p className="text-sm text-[#5C341F] leading-relaxed">
                        <HighlightKeywords text={item.note} variant="light" />
                      </p>

                      {/* Individual Skill Relative Familiarity Bar */}
                      <div className="pt-2 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#7A4B31]">
                          <span>Relative familiarity</span>
                          <span className="tabular-nums text-[#3e1f0f]">
                            {item.relativeLevel}%
                          </span>
                        </div>
                        <div
                          role="progressbar"
                          aria-label={`${item.name} relative familiarity`}
                          aria-valuenow={item.relativeLevel}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          className="h-1.5 w-full rounded-full bg-[#d39a6a]/20 overflow-hidden"
                        >
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: item.relativeLevel / 100 }}
                            transition={{
                              duration: 0.5,
                              delay: idx * 0.05,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className={`h-full w-full origin-left rounded-full ${
                              item.maturity === 'Hands-On'
                                ? 'bg-[#9a5a2e]'
                                : item.maturity === 'Learning'
                                ? 'bg-[#d39a6a]'
                                : 'bg-[#7A4B31]/60'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#9a5a2e]/10 flex items-center justify-between gap-3">
                      <span className="font-mono text-xs text-[#7A4B31] tabular-nums">
                        {item.relatedProjectIds.length}{' '}
                        {item.relatedProjectIds.length === 1 ? 'project' : 'projects'}
                      </span>

                      <motion.button
                        type="button"
                        aria-pressed={isCardHighlighted}
                        onClick={() =>
                          onSelectSkillFilter(
                            isCardHighlighted
                              ? null
                              : { label: item.name, projectIds: item.relatedProjectIds },
                            !isCardHighlighted
                          )
                        }
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                          isCardHighlighted
                            ? 'bg-[#9a5a2e] text-[#fff1e8] border-[#9a5a2e] ring-2 ring-[#9a5a2e]/25 shadow-sm'
                            : 'bg-[#fff1e8] text-[#3e1f0f] border-[#9a5a2e]/15 hover:bg-[#d39a6a]/20 hover:border-[#9a5a2e]/35 hover:text-[#9a5a2e]'
                        }`}
                      >
                        {isCardHighlighted ? (
                          <>
                            <X className="w-3.5 h-3.5" />
                            <span>Clear Highlight</span>
                          </>
                        ) : (
                          <>
                            <span>Highlight in Bento</span>
                            <ArrowUp className="w-3.5 h-3.5" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl bg-white/85 border border-[#9a5a2e]/15 p-8 text-center">
              <p className="text-sm text-[#5C341F]">
                No entries in this category for &ldquo;{maturityFilter}&rdquo;. Switch to{' '}
                <button
                  type="button"
                  onClick={() => setMaturityFilter('All')}
                  className="text-[#9a5a2e] font-medium underline cursor-pointer"
                >
                  All
                </button>{' '}
                to view the full stack.
              </p>
            </div>
          )}

          <p className="mt-6 text-xs text-[#7A4B31]">
            Note: This list reflects a transparent mix of hands-on coursework, prototype builds,
            and technologies I am actively researching—not claims of senior mastery.
          </p>
        </div>
      </section>
      )}

      {/* Contact & Collaboration Section */}
      {showContact && (
      <section id="contact" className="py-20 lg:py-28 bg-[#F9E6D8] bg-cad-dots-light">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="font-mono text-xs text-[#9a5a2e] tracking-wide mb-3">
                  05 · Let&apos;s Connect
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#3e1f0f] [text-wrap:balance]">
                  Have an <span className="text-[#9a5a2e]">idea</span> or{' '}
                  <span className="text-[#7A4421]">product</span> worth building together?
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#5C341F] leading-relaxed">
                I&apos;m interested in connecting with people who care about{' '}
                <span className="text-[#9a5a2e] font-semibold bg-[#9a5a2e]/10 px-1 rounded-[4px]">
                  software architecture
                </span>
                ,{' '}
                <span className="text-[#7A4421] font-semibold bg-[#d39a6a]/25 px-1 rounded-[4px]">
                  AI-powered tools
                </span>
                , creative interfaces, and building meaningful digital products.
              </p>

              <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-[#9a5a2e]/15 p-6 space-y-4 shadow-xs">
                <div>
                  <p className="text-xs text-[#7A4B31]">Direct Email</p>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <span className="font-mono text-sm font-medium text-[#3e1f0f] truncate">
                      {JASHED_PROFILE.email}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#3e1f0f] bg-[#fff1e8] border border-[#9a5a2e]/20 hover:border-[#9a5a2e]/40 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#9a5a2e]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#7A4B31]" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="h-px bg-[#9a5a2e]/15" />

                <div className="flex items-center justify-between text-xs text-[#5C341F]">
                  <span>GitHub</span>
                  <span className="font-mono text-[#7A4B31]">{JASHED_PROFILE.githubStatus}</span>
                </div>

                <div className="h-px bg-[#9a5a2e]/15" />

                <div className="flex items-center justify-between text-xs text-[#5C341F]">
                  <span>{JASHED_PROFILE.institution}</span>
                  <span className="font-mono tabular-nums">Roll {JASHED_PROFILE.roll}</span>
                </div>
              </div>
            </div>

            {/* Interactive Message Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-3xl bg-white/85 backdrop-blur-2xl border border-[#9a5a2e]/15 p-6 sm:p-8 space-y-5 shadow-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-[#3e1f0f]"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (submitted) setSubmitted(false);
                      }}
                      placeholder="Amina Rahman"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#9a5a2e]/20 rounded-lg text-[#3e1f0f] placeholder:text-[#7A4B31]/55 focus:outline-none focus:ring-2 focus:ring-[#9a5a2e]/30 focus:border-[#9a5a2e]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-[#3e1f0f]"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (submitted) setSubmitted(false);
                      }}
                      placeholder="amina@example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#9a5a2e]/20 rounded-lg text-[#3e1f0f] placeholder:text-[#7A4B31]/55 focus:outline-none focus:ring-2 focus:ring-[#9a5a2e]/30 focus:border-[#9a5a2e]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-[#3e1f0f]"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (submitted) setSubmitted(false);
                    }}
                    placeholder="Share a product idea, collaboration, or engineering discussion..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#9a5a2e]/20 rounded-lg text-[#3e1f0f] placeholder:text-[#7A4B31]/55 focus:outline-none focus:ring-2 focus:ring-[#9a5a2e]/30 focus:border-[#9a5a2e] resize-y"
                  />
                </div>

                {formError && (
                  <p role="alert" className="text-xs font-medium text-rose-700">
                    {formError}
                  </p>
                )}

                {submitted && (
                  <p role="status" className="text-xs font-medium text-[#9a5a2e]">
                    Message prepared for {JASHED_PROFILE.name}. Thank you for reaching out.
                  </p>
                )}

                <div className="flex items-center justify-between gap-4 pt-1">
                  <span className="text-xs text-[#7A4B31]">
                    {JASHED_PROFILE.tagline}
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#fff1e8] bg-[#9a5a2e] hover:bg-[#7A4421] active:scale-[0.98] rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      )}
    </>
  );
}
