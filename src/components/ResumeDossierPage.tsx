import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  Check,
  Copy,
  FileDown,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { JASHED_PROFILE } from '../data/portfolioData';
import {
  downloadResumePdf,
  formatPlainTextResume,
  getStructuredResumeData,
  ResumeTrack,
} from '../utils/resumePdf';
import { playClickThock, playHoverTick } from '../utils/soundEffects';

const TRACK_OPTIONS: { id: ResumeTrack; label: string; focus: string }[] = [
  {
    id: 'general',
    label: 'All-Round Engineer',
    focus: 'Full-Stack, Android & Applied AI',
  },
  {
    id: 'fullstack',
    label: 'Full-Stack & Backend',
    focus: 'Django · React · TypeScript · SQL',
  },
  {
    id: 'mobile-ai',
    label: 'Android & Applied AI',
    focus: 'Kotlin · Compose · YOLOv8 · OCR',
  },
];

export function ResumeDossierPage() {
  const [track, setTrack] = useState<ResumeTrack>('general');
  const [pdfSaved, setPdfSaved] = useState(false);
  const [atsCopied, setAtsCopied] = useState(false);

  const resume = getStructuredResumeData(track);

  const handleDownloadPdf = () => {
    playClickThock();
    downloadResumePdf(track);
    setPdfSaved(true);
    window.setTimeout(() => setPdfSaved(false), 2400);
  };

  const handleCopyAts = async () => {
    playClickThock();
    const plain = formatPlainTextResume(track);
    try {
      await navigator.clipboard.writeText(plain);
      setAtsCopied(true);
      window.setTimeout(() => setAtsCopied(false), 2400);
    } catch {
      // Fallback copy via textarea if clipboard permission is restricted
      const el = document.createElement('textarea');
      el.value = plain;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setAtsCopied(true);
      window.setTimeout(() => setAtsCopied(false), 2400);
    }
  };

  return (
    <section className="py-14 lg:py-20 bg-[#fff1e8] bg-cad-grid-light">
      <div className="max-w-[1060px] mx-auto px-6 space-y-8">
        {/* Top Recruiter Action & Track Tailoring Bar */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div className="max-w-xl">
            <p className="font-mono text-xs text-[#9a5a2e] tracking-wide mb-2">
              Executive CV · ATS-Structured · 2-Page PDF
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#3e1f0f] [text-wrap:balance]">
              Role-Tailored{' '}
              <span className="text-[#9a5a2e]">Curriculum Vitae</span>
            </h1>
            <p className="mt-2 text-sm text-[#5C341F] leading-relaxed">
              Switch target role emphasis to reorder projects and tailor core competencies before exporting the 2-page PDF or copying ATS plain text.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onMouseEnter={playHoverTick}
              onClick={handleCopyAts}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#3e1f0f] bg-white/85 hover:bg-white border border-[#d39a6a]/45 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {atsCopied ? (
                <>
                  <Check className="w-4 h-4 text-[#9a5a2e]" />
                  <span>ATS Text Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#9a5a2e]" />
                  <span>Copy ATS Plain-Text</span>
                </>
              )}
            </button>

            <button
              type="button"
              onMouseEnter={playHoverTick}
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#fff1e8] bg-[#3e1f0f] hover:bg-[#9a5a2e] rounded-xl shadow-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {pdfSaved ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>2-Page PDF Saved</span>
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4 text-[#d39a6a]" />
                  <span>Download Executive PDF</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Role Track Selector */}
        <div
          role="tablist"
          aria-label="Tailor CV by target engineering track"
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {TRACK_OPTIONS.map((opt) => {
            const active = track === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="tab"
                aria-selected={active}
                onMouseEnter={playHoverTick}
                onClick={() => {
                  playClickThock();
                  setTrack(opt.id);
                }}
                className={`text-left rounded-2xl px-4 py-3.5 border transition-all cursor-pointer ${
                  active
                    ? 'bg-[#241108] text-[#fff1e8] border-[#9a5a2e] shadow-md'
                    : 'bg-white/80 hover:bg-white text-[#3e1f0f] border-[#d39a6a]/35'
                }`}
              >
                <p
                  className={`font-display text-sm font-bold ${
                    active ? 'text-[#fff1e8]' : 'text-[#3e1f0f]'
                  }`}
                >
                  {opt.label}
                </p>
                <p
                  className={`font-mono text-[11px] mt-0.5 ${
                    active ? 'text-[#d39a6a]' : 'text-[#7A4B31]'
                  }`}
                >
                  {opt.focus}
                </p>
              </button>
            );
          })}
        </div>

        {/* Crisp Executive CV Document Sheet */}
        <motion.article
          key={track}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-white border border-[#d39a6a]/45 shadow-[0_24px_70px_rgba(62,31,15,0.10)] overflow-hidden"
        >
          {/* Executive Header Band */}
          <div className="bg-[#241108] text-[#fff1e8] px-7 sm:px-10 py-8 border-b-2 border-[#9a5a2e]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] text-[#d39a6a] uppercase tracking-widest mb-1.5">
                  Curriculum Vitae · {resume.trackLabel}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#fff1e8]">
                  {JASHED_PROFILE.name.toUpperCase()}
                </h2>
                <p className="text-sm sm:text-base text-[#E8C9B5] font-medium mt-1">
                  {resume.headline}
                </p>
              </div>

              <div className="space-y-1 text-xs font-mono text-[#E8C9B5] md:text-right shrink-0">
                <p className="inline-flex items-center gap-1.5 md:justify-end">
                  <Mail className="w-3.5 h-3.5 text-[#d39a6a]" />
                  <span>{JASHED_PROFILE.email}</span>
                </p>
                <p className="flex items-center gap-1.5 md:justify-end">
                  <MapPin className="w-3.5 h-3.5 text-[#d39a6a]" />
                  <span>{resume.location}</span>
                </p>
                <p className="text-[#d39a6a]">
                  CST Roll {JASHED_PROFILE.roll} · Chittagong Polytechnic
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#d39a6a]/20 flex items-center gap-2 text-xs text-[#E8C9B5]">
              <Briefcase className="w-3.5 h-3.5 text-[#d39a6a] shrink-0" />
              <span>{resume.availability}</span>
            </div>
          </div>

          <div className="p-7 sm:p-10 space-y-8 text-[#3e1f0f]">
            {/* Executive Summary */}
            <section className="space-y-2">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#9a5a2e] pb-1.5 border-b border-[#d39a6a]/40">
                Executive Summary
              </h3>
              <p className="text-sm text-[#5C341F] leading-relaxed">{resume.summary}</p>
            </section>

            {/* Technical Competencies */}
            <section className="space-y-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#9a5a2e] pb-1.5 border-b border-[#d39a6a]/40">
                Technical Competencies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {resume.competencies.map((comp) => (
                  <div
                    key={comp.category}
                    className="rounded-xl bg-[#fff1e8]/65 border border-[#d39a6a]/30 px-4 py-3"
                  >
                    <p className="font-mono text-[11px] font-bold text-[#9a5a2e] uppercase">
                      {comp.category}
                    </p>
                    <p className="text-xs sm:text-sm text-[#3e1f0f] font-medium mt-1 leading-relaxed">
                      {comp.items}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Engineering & Product Projects */}
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#d39a6a]/40">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#9a5a2e]">
                  Key Engineering &amp; Product Projects
                </h3>
                <span className="font-mono text-[11px] text-[#7A4B31]">
                  Ordered for {resume.trackLabel}
                </span>
              </div>

              <div className="space-y-5">
                {resume.featuredProjects.map((proj) => (
                  <div key={proj.id} className="space-y-1.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-display text-base font-bold text-[#3e1f0f]">
                        {proj.title}
                      </h4>
                      <span className="font-mono text-[11px] font-semibold text-[#9a5a2e]">
                        {proj.stage}
                      </span>
                    </div>
                    <p className="font-mono text-[11px] text-[#7A4B31]">
                      {proj.roleTag} · Stack: {proj.stack}
                    </p>
                    <ul className="space-y-1 pt-1 text-xs sm:text-sm text-[#5C341F]">
                      {proj.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 leading-relaxed">
                          <span aria-hidden="true" className="text-[#9a5a2e] font-bold mt-0.5">
                            —
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Collaborative & Platform Builds */}
            <section className="space-y-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#9a5a2e] pb-1.5 border-b border-[#d39a6a]/40">
                Collaborative &amp; Platform Builds
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {resume.additionalBuilds.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl bg-[#fff1e8]/55 border border-[#d39a6a]/30 p-4 space-y-1.5"
                  >
                    <p className="font-display text-sm font-bold text-[#3e1f0f] leading-snug">
                      {item.title}
                    </p>
                    <p className="font-mono text-[10px] text-[#9a5a2e]">{item.stack}</p>
                    <p className="text-xs text-[#5C341F] leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education & Differentiators */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
              <section className="lg:col-span-5 rounded-2xl bg-[#fff1e8]/70 border border-[#d39a6a]/35 p-5 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#9a5a2e]">
                  <GraduationCap className="w-4 h-4" />
                  <span>Education</span>
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-[#3e1f0f]">
                    {resume.education.degree}
                  </h4>
                  <p className="text-xs font-medium text-[#5C341F] mt-0.5">
                    {resume.education.institution}
                  </p>
                  <p className="font-mono text-[11px] text-[#9a5a2e] mt-1">
                    {resume.education.meta}
                  </p>
                </div>
                <ul className="space-y-1 text-xs text-[#5C341F] pt-1 border-t border-[#d39a6a]/25">
                  {resume.education.coursework.map((cw) => (
                    <li key={cw} className="flex items-start gap-1.5">
                      <Layers className="w-3 h-3 text-[#9a5a2e] shrink-0 mt-1" />
                      <span>{cw}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="lg:col-span-7 rounded-2xl bg-[#241108] text-[#fff1e8] border border-[#d39a6a]/35 p-5 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#d39a6a]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Why Hire Me First · Engineering Differentiators</span>
                </div>
                <div className="space-y-2.5">
                  {resume.differentiators.map((diff) => (
                    <div
                      key={diff.title}
                      className="rounded-xl bg-white/[0.05] border border-[#d39a6a]/20 p-3"
                    >
                      <p className="text-xs font-bold text-[#fff1e8]">{diff.title}</p>
                      <p className="text-xs text-[#E8C9B5] leading-relaxed mt-0.5">
                        {diff.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
