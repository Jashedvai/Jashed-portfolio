import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUp, FolderKanban, Mail } from 'lucide-react';
import { playClickThock, playHoverTick } from '../utils/soundEffects';

type QuickTargetId = 'top' | 'projects' | 'contact';

const QUICK_TARGETS: {
  id: QuickTargetId;
  label: string;
  icon: typeof ArrowUp;
}[] = [
  { id: 'top', label: 'Hero', icon: ArrowUp },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export function QuickActionsMenu() {
  const [activeTarget, setActiveTarget] = useState<QuickTargetId>('top');

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.4;
      const contactEl = document.getElementById('contact');
      const projectsEl = document.getElementById('projects');

      if (contactEl && scrollY >= contactEl.offsetTop) {
        setActiveTarget('contact');
      } else if (projectsEl && scrollY >= projectsEl.offsetTop) {
        setActiveTarget('projects');
      } else {
        setActiveTarget('top');
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, []);

  const handleJump = (id: QuickTargetId) => {
    playClickThock();
    setActiveTarget(id);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      aria-label="Quick Actions"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40"
    >
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-[#241108]/88 backdrop-blur-2xl border border-[#d39a6a]/30 shadow-[0_16px_40px_rgba(62,31,15,0.45)]">
        <span className="hidden sm:inline-block font-mono text-[11px] text-[#d39a6a] pl-1.5 pr-2.5 border-r border-[#d39a6a]/20 whitespace-nowrap shrink-0">
          Quick Actions
        </span>

        {QUICK_TARGETS.map((target) => {
          const isActive = activeTarget === target.id;
          const Icon = target.icon;
          return (
            <motion.button
              key={target.id}
              type="button"
              onMouseEnter={playHoverTick}
              onClick={() => handleJump(target.id)}
              aria-current={isActive ? 'location' : undefined}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 480, damping: 28 }}
              className={`relative inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] sm:min-h-[36px] text-xs font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d39a6a] ${
                isActive ? 'text-[#fff1e8]' : 'text-[#E8C9B5] hover:text-[#fff1e8]'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="quick-actions-active"
                  transition={{ type: 'spring', stiffness: 460, damping: 34 }}
                  aria-hidden="true"
                  className="absolute inset-0 bg-[#9a5a2e] rounded-lg"
                />
              )}
              <Icon className="relative z-10 w-3.5 h-3.5 shrink-0" />
              <span className="relative z-10">{target.label}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}
