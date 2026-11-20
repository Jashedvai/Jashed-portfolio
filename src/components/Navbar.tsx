import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { JASHED_PROFILE } from '../data/portfolioData';
import { DossierPageId } from '../types/navigation';
import { playClickThock, playHoverTick } from '../utils/soundEffects';

interface NavbarProps {
  onOpenDossier: (pageId: DossierPageId) => void;
  onOpenGhum: () => void;
}

const NAV_ITEMS: {
  label: string;
  action: { type: 'scroll'; target: string } | { type: 'dossier'; target: DossierPageId } | { type: 'ghum' };
}[] = [
  { label: 'Works', action: { type: 'scroll', target: '#projects' } },
  { label: 'About', action: { type: 'dossier', target: 'about' } },
  { label: 'ঘুম', action: { type: 'ghum' } },
  { label: 'Stack', action: { type: 'dossier', target: 'stack' } },
  { label: 'Gallery', action: { type: 'dossier', target: 'gallery' } },
];

export function Navbar({ onOpenDossier, onOpenGhum }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleAction = (item: (typeof NAV_ITEMS)[number]['action']) => {
    playClickThock();
    setMobileOpen(false);
    if (item.type === 'dossier') {
      onOpenDossier(item.target);
    } else if (item.type === 'ghum') {
      onOpenGhum();
    } else {
      const el = document.querySelector(item.target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#241108]/90 backdrop-blur-2xl border-b border-[#d39a6a]/15">
      <div className="max-w-[1240px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#top"
          onMouseEnter={playHoverTick}
          onClick={(e) => {
            e.preventDefault();
            playClickThock();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-xl font-bold tracking-tight text-[#fff1e8] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d39a6a] rounded-sm"
        >
          {JASHED_PROFILE.shortName}
          <span className="text-[#d39a6a]">.</span>
        </a>

        {/* Zone 2: 5 concise single-line links opening Works / dedicated pages */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
          {NAV_ITEMS.map((link) => (
            <button
              key={link.label}
              type="button"
              onMouseEnter={playHoverTick}
              onClick={() => handleAction(link.action)}
              className="group relative text-sm font-medium text-[#E8C9B5] hover:text-[#fff1e8] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d39a6a] rounded-sm"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px bg-[#d39a6a] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
              />
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onMouseEnter={playHoverTick}
            onClick={() => {
              playClickThock();
              setMobileOpen(false);
              onOpenDossier('contact');
            }}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-[#fff1e8] bg-[#9a5a2e] hover:bg-[#b06938] active:scale-[0.98] rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d39a6a]"
          >
            Connect
          </button>

          <button
            type="button"
            onMouseEnter={playHoverTick}
            onClick={() => {
              playClickThock();
              setMobileOpen((prev) => !prev);
            }}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#fff1e8] hover:text-[#d39a6a] rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden bg-[#241108] border-t border-[#d39a6a]/20 px-6 py-4 flex flex-col gap-2"
        >
          {NAV_ITEMS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleAction(link.action)}
              className="py-2.5 text-left text-sm font-medium text-[#E8C9B5] hover:text-[#fff1e8] transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              playClickThock();
              setMobileOpen(false);
              onOpenDossier('contact');
            }}
            className="mt-2 w-full py-2.5 px-4 text-sm font-semibold text-[#fff1e8] bg-[#9a5a2e] hover:bg-[#b06938] rounded-lg transition-colors cursor-pointer"
          >
            Connect
          </button>
        </nav>
      )}
    </header>
  );
}
