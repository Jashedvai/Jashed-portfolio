import { motion } from 'motion/react';
import { EXPERIMENTAL_IDEAS } from '../data/portfolioData';
import { playHoverTick } from '../utils/soundEffects';

export function ExperimentalLabSection() {
  return (
    <section className="py-16 lg:py-20 bg-[#fff1e8] border-b border-[#3e1f0f]/10">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
        >
          <div>
            <p className="font-mono text-xs text-[#9a5a2e] tracking-wide mb-2">
              Experimental Lab &amp; Research Concepts
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#3e1f0f]">
              Smaller explorations beyond conventional coursework
            </h2>
          </div>
          <p className="text-xs text-[#7A4B31] max-w-xs">
            Early prototypes and architectural concepts—kept separate from primary software
            releases.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXPERIMENTAL_IDEAS.map((idea, idx) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.36,
                delay: Math.min(idx * 0.05, 0.25),
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={playHoverTick}
              className="rounded-2xl bg-white/80 backdrop-blur-xl border border-[#d39a6a]/35 ring-1 ring-inset ring-white/80 p-5 space-y-2.5 hover:bg-white hover:border-[#9a5a2e]/45 transition-all shadow-xs"
            >
              <div className="flex items-center justify-between gap-2 text-xs text-[#7A4B31]">
                <span className="font-mono text-[#9a5a2e] tabular-nums">
                  0{idx + 1} · {idea.stage}
                </span>
                <span className="truncate font-mono text-[11px]">{idea.focus}</span>
              </div>
              <h3 className="font-display text-base font-bold text-[#3e1f0f]">{idea.title}</h3>
              <p className="text-xs sm:text-sm text-[#5C341F] leading-relaxed">
                {idea.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
