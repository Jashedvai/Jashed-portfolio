import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Heart, Moon, Users } from 'lucide-react';
import { GHUM_NOVEL_STORY } from '../data/portfolioData';

type GhumTab = 'premise' | 'jashed' | 'family' | 'friends';

const GHUM_TABS: { id: GhumTab; label: string; icon: typeof BookOpen }[] = [
  { id: 'premise', label: 'মূল প্রেক্ষাপট ও থিম', icon: BookOpen },
  { id: 'jashed', label: 'প্রধান চরিত্র · জাশেদ', icon: Moon },
  { id: 'family', label: 'পরিবার', icon: Heart },
  { id: 'friends', label: 'বন্ধুত্বের জগৎ', icon: Users },
];

export function GhumStoryShowcase() {
  const [activeTab, setActiveTab] = useState<GhumTab>('premise');

  return (
    <div
      id="ghum-novel-dossier"
      className="rounded-3xl bg-[#3e1f0f] text-[#fff1e8] border border-[#d39a6a]/30 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden"
    >
      {/* Subtle Burnished Copper Ambient Literary Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-[-8%] w-96 h-96 rounded-full bg-radial from-[#d39a6a]/24 via-[#9a5a2e]/14 to-transparent blur-3xl"
      />

      <div className="relative z-10 space-y-8">
        {/* Header + Interactive Story Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#d39a6a]/20">
          <div className="space-y-2 max-w-xl">
            <p className="font-mono text-xs text-[#d39a6a] tracking-wide">
              Story Architecture &amp; Characters
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#fff1e8]">
              উপন্যাস: <span className="text-[#d39a6a]">ঘুম</span>{' '}
              <span className="text-[#E8C9B5] font-normal text-lg sm:text-xl">
                — {GHUM_NOVEL_STORY.subtitle}
              </span>
            </h2>
            <p className="text-sm text-[#d39a6a] font-medium">
              {GHUM_NOVEL_STORY.tagline}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Explore ঘুম novel characters and themes"
            className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-[#241108]/60 backdrop-blur-xl rounded-2xl border border-[#d39a6a]/25 self-start lg:self-auto"
          >
            {GHUM_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#9a5a2e] text-[#fff1e8] shadow-sm'
                      : 'text-[#E8C9B5] hover:text-[#fff1e8] hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Story World Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'premise' && (
            <motion.div
              key="premise"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              <div className="lg:col-span-7 space-y-5">
                <div className="rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-[#d39a6a]/25 p-6 space-y-3">
                  <p className="font-mono text-[11px] text-[#d39a6a] uppercase tracking-wider">
                    মূল প্রেক্ষাপট
                  </p>
                  <p className="text-base sm:text-lg text-[#fff1e8] leading-relaxed">
                    {GHUM_NOVEL_STORY.premise}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/[0.04] border border-[#d39a6a]/20 p-6 space-y-2.5">
                  <p className="font-mono text-[11px] text-[#d39a6a] uppercase tracking-wider">
                    জীবনের থিম ও টোন
                  </p>
                  <p className="text-sm sm:text-base text-[#E8C9B5] leading-relaxed">
                    {GHUM_NOVEL_STORY.themeStatement}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-[#d39a6a]/25 p-6 space-y-4">
                <p className="font-mono text-[11px] text-[#d39a6a] uppercase tracking-wider">
                  জাশেদের দৈনন্দিন জীবন
                </p>
                <ul className="space-y-3.5">
                  {GHUM_NOVEL_STORY.dailyLife.map((line, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#fff1e8]/90 leading-relaxed">
                      <span className="font-mono text-xs text-[#d39a6a] font-semibold mt-0.5 shrink-0">
                        0{i + 1}
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'jashed' && (
            <motion.div
              key="jashed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <div className="rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-[#d39a6a]/25 p-6 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-display text-xl font-bold text-[#fff1e8]">
                    {GHUM_NOVEL_STORY.protagonist.name}
                  </h4>
                  <span className="font-mono text-xs text-[#d39a6a]">প্রধান চরিত্র</span>
                </div>
                <p className="font-mono text-xs text-[#d39a6a]">
                  {GHUM_NOVEL_STORY.protagonist.meta}
                </p>
                <p className="text-sm text-[#fff1e8]/90 leading-relaxed">
                  {GHUM_NOVEL_STORY.protagonist.personality}
                </p>
                <p className="text-xs text-[#E8C9B5] pt-1">
                  <span className="text-[#d39a6a] font-semibold">শখ:</span>{' '}
                  {GHUM_NOVEL_STORY.protagonist.hobbies}
                </p>
              </div>

              <div className="space-y-5">
                <div className="rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-[#d39a6a]/25 p-5 space-y-2">
                  <p className="font-mono text-[11px] text-[#d39a6a] uppercase tracking-wider">
                    পূর্ব ইতিহাস · নীল সাইকেল ও জিপিএ-৫
                  </p>
                  <p className="text-sm text-[#fff1e8]/90 leading-relaxed">
                    {GHUM_NOVEL_STORY.protagonist.backstory}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-[#d39a6a]/25 p-5 space-y-2">
                  <p className="font-mono text-[11px] text-[#d39a6a] uppercase tracking-wider">
                    বর্তমান · শহরের মেস ও নিঃসঙ্গতা
                  </p>
                  <p className="text-sm text-[#fff1e8]/90 leading-relaxed">
                    {GHUM_NOVEL_STORY.protagonist.present}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'family' && (
            <motion.div
              key="family"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {GHUM_NOVEL_STORY.family.map((member) => (
                <div
                  key={member.name}
                  className="rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-[#d39a6a]/25 p-6 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2.5">
                    <span className="font-mono text-xs text-[#d39a6a] font-semibold">
                      {member.role}
                    </span>
                    <h4 className="font-display text-xl font-bold text-[#fff1e8]">{member.name}</h4>
                    <p className="text-sm text-[#E8C9B5] leading-relaxed">{member.summary}</p>
                  </div>

                  <div className="pt-3 border-t border-[#d39a6a]/20 space-y-1.5">
                    <p className="text-sm font-medium text-[#d39a6a] leading-snug">
                      {member.quote}
                    </p>
                    <p className="text-xs text-[#E8C9B5]/85">{member.note}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'friends' && (
            <motion.div
              key="friends"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {GHUM_NOVEL_STORY.friendships.map((circle, idx) => (
                <div
                  key={circle.group}
                  className="rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-[#d39a6a]/25 p-6 space-y-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="font-display text-lg font-bold text-[#fff1e8]">{circle.group}</h4>
                    <span className="font-mono text-xs text-[#d39a6a]">
                      {idx === 0 ? 'City Mess Circle' : 'Village Childhood'}
                    </span>
                  </div>

                  <p className="font-mono text-sm text-[#d39a6a] font-semibold">
                    {circle.names.join(' · ')}
                  </p>

                  <p className="text-sm text-[#E8C9B5] leading-relaxed">{circle.description}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
