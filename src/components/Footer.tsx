import { ArrowUp } from 'lucide-react';
import { JASHED_PROFILE } from '../data/portfolioData';
import { DossierPageId } from '../types/navigation';
import { playClickThock, playHoverTick } from '../utils/soundEffects';

interface FooterProps {
  onOpenDossier?: (pageId: DossierPageId) => void;
  onOpenGhum?: () => void;
}

export function Footer({ onOpenDossier, onOpenGhum }: FooterProps) {
  const handleJumpWorks = () => {
    playClickThock();
    const el = document.querySelector('#projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#241108] text-[#E8C9B5] border-t border-[#d39a6a]/20">
      <div className="max-w-[1240px] mx-auto px-6 pt-12 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#d39a6a]/20">
          <div className="md:col-span-5 space-y-2.5">
            <h3 className="font-display text-lg font-bold text-[#fff1e8]">
              {JASHED_PROFILE.name}
            </h3>
            <p className="text-sm text-[#E8C9B5] leading-relaxed max-w-sm">
              <span className="text-[#d39a6a] font-medium">{JASHED_PROFILE.role}</span> ·{' '}
              <span className="text-[#fff1e8]">{JASHED_PROFILE.tagline}</span>
            </p>
          </div>

          <div className="md:col-span-4 space-y-2">
            <h4 className="font-display text-sm font-semibold text-[#fff1e8]">Academic &amp; Contact</h4>
            <p className="text-sm text-[#d39a6a] font-mono">{JASHED_PROFILE.email}</p>
            <p className="text-sm text-[#E8C9B5]">
              {JASHED_PROFILE.institution} · Roll {JASHED_PROFILE.roll}
            </p>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="font-display text-sm font-semibold text-[#fff1e8]">Pages &amp; Works</h4>
            <ul className="space-y-1.5 text-sm text-[#E8C9B5]">
              <li>
                <button
                  type="button"
                  onMouseEnter={playHoverTick}
                  onClick={handleJumpWorks}
                  className="hover:text-[#fff1e8] transition-colors cursor-pointer"
                >
                  Selected Projects
                </button>
              </li>
              {onOpenDossier && (
                <li>
                  <button
                    type="button"
                    onMouseEnter={playHoverTick}
                    onClick={() => {
                      playClickThock();
                      onOpenDossier('about');
                    }}
                    className="hover:text-[#fff1e8] transition-colors cursor-pointer"
                  >
                    About &amp; Portraits
                  </button>
                </li>
              )}
              {onOpenGhum && (
                <li>
                  <button
                    type="button"
                    onMouseEnter={playHoverTick}
                    onClick={() => {
                      playClickThock();
                      onOpenGhum();
                    }}
                    className="hover:text-[#fff1e8] transition-colors cursor-pointer"
                  >
                    ঘুম (Ghum) Novel
                  </button>
                </li>
              )}
              {onOpenDossier && (
                <li>
                  <button
                    type="button"
                    onMouseEnter={playHoverTick}
                    onClick={() => {
                      playClickThock();
                      onOpenDossier('stack');
                    }}
                    className="hover:text-[#fff1e8] transition-colors cursor-pointer"
                  >
                    Tech Stack &amp; Lab
                  </button>
                </li>
              )}
              {onOpenDossier && (
                <li>
                  <button
                    type="button"
                    onMouseEnter={playHoverTick}
                    onClick={() => {
                      playClickThock();
                      onOpenDossier('contact');
                    }}
                    className="hover:text-[#fff1e8] transition-colors cursor-pointer"
                  >
                    Direct Contact
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#d39a6a]/80">
          <p>© 2026 {JASHED_PROFILE.name}. Building beyond the ordinary.</p>
          <button
            type="button"
            onMouseEnter={playHoverTick}
            onClick={() => {
              playClickThock();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-[#E8C9B5] hover:text-[#fff1e8] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
