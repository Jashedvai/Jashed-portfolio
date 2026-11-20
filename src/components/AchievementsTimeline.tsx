import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ChevronDown, Compass } from 'lucide-react';
import { JASHED_PROFILE, JOURNEY_STEPS } from '../data/portfolioData';
import { HighlightKeywords } from './HighlightKeywords';

export function AchievementsTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string>(JOURNEY_STEPS[0].id);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 65%'],
  });

  // Smooth compositor-only vertical track progress
  const trackScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="journey"
      className="py-20 lg:py-28 bg-[#fff1e8] bg-cad-dots-light border-b border-[#9a5a2e]/15"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Sticky Journey & Vision Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div>
              <p className="font-mono text-xs text-[#9a5a2e] tracking-wide mb-3">
                03 · Journey &amp; Vision
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#3e1f0f] [text-wrap:balance] mb-4">
                An ongoing process of <span className="text-[#9a5a2e]">learning</span>,{' '}
                <span className="text-[#7A4421]">experimenting</span>, and{' '}
                <span className="text-[#9a5a2e]">building</span>.
              </h2>
              <p className="text-sm sm:text-base text-[#5C341F] leading-relaxed">
                My journey isn&apos;t defined by a single language. It&apos;s an evolving path from
                CST fundamentals toward becoming an{' '}
                <span className="text-[#9a5a2e] font-semibold bg-[#9a5a2e]/10 px-1 rounded-[4px]">
                  independent developer and founder
                </span>{' '}
                who takes ideas from concept to reliable software.
              </p>
            </div>

            <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-[#9a5a2e]/15 p-5 space-y-4 shadow-xs">
              <div>
                <p className="font-mono text-xs text-[#9a5a2e]">Long-Term Vision</p>
                <p className="font-display text-base font-bold text-[#3e1f0f] mt-1">
                  Create. Experiment. Build something meaningful.
                </p>
              </div>
              <div className="h-px bg-[#9a5a2e]/15" />
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#7A4B31]">Institution</span>
                <span className="font-medium text-[#3e1f0f]">CPI · Bangladesh</span>
              </div>
              <div className="h-px bg-[#9a5a2e]/15" />
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#7A4B31]">Department · Roll</span>
                <span className="font-mono font-medium text-[#3e1f0f] tabular-nums">
                  CST · {JASHED_PROFILE.roll}
                </span>
              </div>
            </div>
          </div>

          {/* Right Scroll-Driven Journey Timeline */}
          <div ref={containerRef} className="lg:col-span-8 relative pl-7 sm:pl-10">
            {/* Background Hairline Rail */}
            <div
              aria-hidden="true"
              className="absolute left-2 sm:left-3 top-2 bottom-2 w-px bg-[#d39a6a]/35"
            />
            {/* Scroll-Animated Progress Rail */}
            <motion.div
              style={{ scaleY: trackScaleY }}
              aria-hidden="true"
              className="absolute left-2 sm:left-3 top-2 bottom-2 w-px bg-[#9a5a2e] origin-top"
            />

            <div className="space-y-5">
              {JOURNEY_STEPS.map((item, idx) => {
                const isExpanded = expandedId === item.id;
                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.4,
                      delay: idx * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative"
                  >
                    {/* Precision Machined Square Marker on Engineering Rail */}
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[25px] sm:-left-[33px] top-6 w-2.5 h-2.5 rounded-[3px] border-2 transition-colors duration-200 ${
                        isExpanded
                          ? 'bg-[#9a5a2e] border-[#9a5a2e]'
                          : 'bg-[#fff1e8] border-[#d39a6a]'
                      }`}
                    />

                    <div
                      className={`rounded-2xl bg-white/85 backdrop-blur-xl border transition-all duration-200 ${
                        isExpanded
                          ? 'border-[#9a5a2e]/35 bg-white shadow-sm'
                          : 'border-[#9a5a2e]/15 hover:bg-white'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedId((prev) => (prev === item.id ? '' : item.id))
                        }
                        aria-expanded={isExpanded}
                        className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
                      >
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#7A4B31]">
                            <span className="font-mono font-medium text-[#9a5a2e]">
                              {item.phase}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{item.period}</span>
                            <span aria-hidden="true">·</span>
                            <span>{item.category}</span>
                          </div>

                          <h3 className="font-display text-lg sm:text-xl font-bold text-[#3e1f0f]">
                            {item.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-[#7A4B31]">
                            {item.context} ·{' '}
                            <span className="font-medium text-[#3e1f0f]">{item.outcome}</span>
                          </p>
                        </div>

                        <ChevronDown
                          className={`w-5 h-5 text-[#9a5a2e]/60 shrink-0 mt-1 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-[#9a5a2e]' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#9a5a2e]/10 space-y-3">
                              <p className="text-sm text-[#5C341F] leading-relaxed">
                                <HighlightKeywords text={item.summary} variant="light" />
                              </p>
                              <div className="flex items-start gap-2 text-xs font-mono text-[#7A4B31]">
                                <Compass className="w-3.5 h-3.5 text-[#9a5a2e] shrink-0 mt-0.5" />
                                <span>{item.details}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
