import { ReactNode, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { DossierPageId } from '../types/navigation';
import { DOSSIER_ENTRIES } from './DossierDirectory';
import { playClickThock, playHoverTick } from '../utils/soundEffects';

const DOSSIER_ORDER: DossierPageId[] = ['about', 'journey', 'stack', 'gallery', 'resume', 'contact'];

interface SubPageShellProps {
  pageId: DossierPageId;
  onBack: () => void;
  onNavigatePage: (pageId: DossierPageId) => void;
  children: ReactNode;
}

export function SubPageShell({
  pageId,
  onBack,
  onNavigatePage,
  children,
}: SubPageShellProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageId]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onBack]);

  const entry = DOSSIER_ENTRIES.find((d) => d.id === pageId) ?? DOSSIER_ENTRIES[0];
  const currentIdx = DOSSIER_ORDER.indexOf(pageId);
  const prevPageId = DOSSIER_ORDER[(currentIdx - 1 + DOSSIER_ORDER.length) % DOSSIER_ORDER.length];
  const nextPageId = DOSSIER_ORDER[(currentIdx + 1) % DOSSIER_ORDER.length];
  const nextEntry = DOSSIER_ENTRIES.find((d) => d.id === nextPageId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen flex flex-col bg-[#fff1e8] text-[#3e1f0f]"
    >
      {/* Clean Sticky Sub-Page Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#fff1e8]/85 backdrop-blur-2xl border-b border-[#3e1f0f]/10">
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
            <span>Back to Home</span>
          </button>

          <div className="hidden md:flex items-center gap-2 text-xs text-[#7A4B31] truncate">
            <span className="font-mono text-[#9a5a2e] font-semibold">{entry.index}</span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-[#3e1f0f] truncate">{entry.title}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onMouseEnter={playHoverTick}
              onClick={() => {
                playClickThock();
                onNavigatePage(prevPageId);
              }}
              className="px-3.5 py-1.5 text-xs font-medium text-[#5C341F] hover:text-[#3e1f0f] bg-white/80 backdrop-blur-md border border-[#d39a6a]/40 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Prev
            </button>
            <button
              type="button"
              onMouseEnter={playHoverTick}
              onClick={() => {
                playClickThock();
                onNavigatePage(nextPageId);
              }}
              className="px-3.5 py-1.5 text-xs font-medium text-[#fff1e8] bg-[#3e1f0f] hover:bg-[#9a5a2e] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Next Page
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Clean Bottom Next-Dossier Bar */}
      {nextEntry && (
        <div className="bg-[#fff1e8] border-t border-[#3e1f0f]/10 py-10">
          <div className="max-w-[1200px] mx-auto px-6">
            <button
              type="button"
              onMouseEnter={playHoverTick}
              onClick={() => {
                playClickThock();
                onNavigatePage(nextPageId);
              }}
              className="w-full text-left rounded-3xl bg-white/65 hover:bg-white backdrop-blur-xl border border-[#d39a6a]/40 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all cursor-pointer group"
            >
              <div>
                <p className="font-mono text-xs text-[#9a5a2e]">
                  Next File · {nextEntry.index} · {nextEntry.category}
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#3e1f0f] group-hover:text-[#9a5a2e] transition-colors mt-1">
                  {nextEntry.title}
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3e1f0f] group-hover:bg-[#9a5a2e] text-[#fff1e8] text-xs font-semibold transition-colors whitespace-nowrap shrink-0">
                <span>Open Page</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
