import { useState } from 'react';
import { motion } from 'motion/react';
import { StudentProject } from '../data/portfolioData';

interface ProjectVisualProps {
  project: Pick<
    StudentProject,
    'visualType' | 'screenshotPath' | 'screenshotAlt' | 'title' | 'subtitle'
  >;
  featured?: boolean;
}

export function ProjectVisual({ project, featured = false }: ProjectVisualProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const heightClass = featured ? 'h-72 sm:h-80' : 'h-64 sm:h-72';

  if (project.screenshotPath && !imgFailed) {
    return (
      <div
        className={`${heightClass} w-full rounded-2xl bg-gradient-to-br from-[#241108] via-[#3e1f0f] to-[#5C2E16] p-5 flex items-center justify-center overflow-hidden relative border border-[#d39a6a]/25 shadow-inner`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(211,154,106,0.28),transparent_65%)]"
        />
        <div className="relative z-10 h-full max-h-full aspect-[9/19] rounded-[22px] bg-[#160A04] p-1.5 border border-[#d39a6a]/45 ring-1 ring-inset ring-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-[1.04]">
          <img
            src={project.screenshotPath}
            alt={project.screenshotAlt || `${project.title} mobile interface screenshot`}
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover object-top rounded-[16px]"
          />
        </div>
      </div>
    );
  }

  // StockPilot or fallback architectural previews
  if (project.visualType === 'stockpilot') {
    const bars = [48, 72, 60, 86, 68, 94, 78];
    return (
      <div
        className={`${heightClass} w-full rounded-2xl bg-gradient-to-br from-[#241108] to-[#3e1f0f] border border-[#d39a6a]/25 p-5 flex flex-col justify-between overflow-hidden`}
      >
        <div className="flex items-center justify-between text-[11px] font-mono text-[#E8C9B5]">
          <span>Django Dark Dashboard · Phase 1</span>
          <span className="text-[#d39a6a] tabular-nums">Auth + Roles</span>
        </div>
        <div className="flex items-end gap-2 h-24 pt-2">
          {bars.map((h, idx) => (
            <div
              key={idx}
              style={{ height: `${h}%` }}
              className={`flex-1 rounded-t-sm ${
                idx === 5 ? 'bg-[#d39a6a]' : idx >= 3 ? 'bg-[#9a5a2e]' : 'bg-[#fff1e8]/25'
              }`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between font-mono text-[10px] text-[#E8C9B5]">
          <span>SQLite → MySQL Schema</span>
          <span className="tabular-nums text-[#d39a6a]">Stock · Purchase · Sales</span>
        </div>
      </div>
    );
  }

  if (project.visualType === 'tricode') {
    return (
      <div
        className={`${heightClass} w-full rounded-2xl bg-[#fff1e8] border border-[#d39a6a]/40 p-5 flex flex-col justify-between`}
      >
        <div className="rounded-xl bg-white/90 backdrop-blur-md border border-[#d39a6a]/35 px-3.5 py-2.5 flex items-center justify-between shadow-sm">
          <span className="font-mono text-[11px] text-[#7A4B31]">sin(45°) + √16</span>
          <span className="font-mono text-base font-bold text-[#9a5a2e] tabular-nums">4.7071</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {['sin', 'cos', '√', '÷', '7', '8', '9', '='].map((k) => (
            <div
              key={k}
              className={`h-8 rounded-lg flex items-center justify-center font-mono text-xs font-semibold ${
                k === '=' || k === '÷'
                  ? 'bg-[#3e1f0f] text-[#fff1e8]'
                  : 'bg-white text-[#3e1f0f] border border-[#d39a6a]/35'
              }`}
            >
              {k}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (project.visualType === 'cpitimeline') {
    return (
      <div
        className={`${heightClass} w-full rounded-2xl bg-gradient-to-br from-[#fff1e8] to-[#f4dfcf] border border-[#d39a6a]/40 p-5 flex flex-col justify-between`}
      >
        <div className="flex items-center justify-between text-[11px] font-mono text-[#9a5a2e]">
          <span>চট্টগ্রাম পলিটেকনিক · Portal</span>
          <span>7 Depts</span>
        </div>
        <div className="space-y-2">
          {['Computer Science & Tech', 'Electrical · Mechanical', 'Civil · Power · Electronics'].map(
            (dept) => (
              <div
                key={dept}
                className="px-3 py-2 rounded-xl bg-white/85 backdrop-blur-md border border-[#d39a6a]/30 text-xs text-[#3e1f0f] font-medium truncate"
              >
                {dept}
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  // Fallback styled container if an uploaded screenshot fails to load
  return (
    <div
      className={`${heightClass} w-full rounded-2xl bg-gradient-to-br from-[#241108] via-[#3e1f0f] to-[#5C2E16] border border-[#d39a6a]/25 p-6 flex flex-col justify-between text-[#fff1e8]`}
    >
      <span className="font-mono text-xs text-[#d39a6a]">Interface Preview</span>
      <div>
        <p className="font-display text-xl font-bold">{project.title}</p>
        <p className="text-xs text-[#E8C9B5] mt-1">{project.subtitle}</p>
      </div>
    </div>
  );
}

interface InteractiveProjectDemoProps {
  demoType: StudentProject['demoType'];
}

export function InteractiveProjectDemo({ demoType }: InteractiveProjectDemoProps) {
  // PanelFlow OCR demo state
  const [showOverlay, setShowOverlay] = useState(true);
  const [activePanelIdx, setActivePanelIdx] = useState(0);

  // StockPilot demo state
  const [unitsSold, setUnitsSold] = useState(18);
  const initialStock = 60;
  const remainingStock = initialStock - unitsSold;
  const unitMargin = 140;

  // Colorizer split slider & style state
  const [splitPercent, setSplitPercent] = useState(55);
  const [colorStyle, setColorStyle] = useState<'natural' | 'cel'>('natural');

  // TriCode Nexus calculator state
  const [calcExpr, setCalcExpr] = useState('45');
  const [calcResult, setCalcResult] = useState('45');

  // NOVA Canvas preset state
  const [novaPreset, setNovaPreset] = useState<'Nothing' | 'Cupertino' | 'One UI' | 'Ember'>(
    'Cupertino'
  );

  // Liquid Morph state
  const [visualMode, setVisualMode] = useState<'LIQUID' | 'FLOW' | '3D' | 'WAVE'>('LIQUID');
  const [bassEnergy, setBassEnergy] = useState(72);

  // Medicine Center state
  const [medTab, setMedTab] = useState<'টালি' | 'বিলিং' | 'কাস্টমার' | 'ইনভেন্টরি'>('টালি');

  // CPITimeline department state
  const [cpiDept, setCpiDept] = useState('Computer');

  if (demoType === 'panelflow') {
    const panels = [
      {
        label: 'Bubble 01 · YOLOv8',
        ocr: '"Ready to narrate your next chapter with natural voice."',
        confidence: '98.4%',
        emotion: 'Calm Narration',
      },
      {
        label: 'Bubble 02 · PaddleOCR',
        ocr: '"Accessibility overlay reading panel dialogue in sequence."',
        confidence: '96.9%',
        emotion: 'Expressive',
      },
    ];
    const current = panels[activePanelIdx];

    return (
      <div className="rounded-2xl bg-[#241108]/95 backdrop-blur-xl border border-[#d39a6a]/25 p-5 text-[#fff1e8] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-[#E8C9B5]">
            Toggle YOLOv8 detection boxes and tap a dialogue bubble to test OCR &amp; TTS
            extraction.
          </p>
          <button
            type="button"
            onClick={() => setShowOverlay((s) => !s)}
            className="px-3 py-1.5 text-xs font-medium bg-[#9a5a2e] hover:bg-[#b06938] text-[#fff1e8] rounded-lg cursor-pointer transition-colors"
          >
            {showOverlay ? 'Hide Overlay Boxes' : 'Show Overlay Boxes'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {panels.map((p, idx) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setActivePanelIdx(idx)}
              className={`p-4 rounded-xl text-left transition-all cursor-pointer border ${
                showOverlay
                  ? activePanelIdx === idx
                    ? 'border-[#d39a6a] bg-[#9a5a2e]/35'
                    : 'border-dashed border-[#d39a6a]/45 bg-[#3e1f0f]/60'
                  : 'border-white/10 bg-[#3e1f0f]/50'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[11px] text-[#d39a6a]">
                <span>{p.label}</span>
                {showOverlay && <span className="tabular-nums">{p.confidence}</span>}
              </div>
              <p className="text-sm text-[#fff1e8] mt-2">{p.ocr}</p>
            </button>
          ))}
        </div>

        <div className="rounded-xl bg-white/[0.05] border border-[#d39a6a]/20 p-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <span className="text-[#E8C9B5]">
            Active TTS Output: <strong className="text-[#fff1e8]">{current.emotion}</strong>
          </span>
          <span className="text-[#d39a6a]">Source: Gallery / PDF / TXT</span>
        </div>
      </div>
    );
  }

  if (demoType === 'colorizer') {
    return (
      <div className="rounded-2xl bg-[#241108]/95 backdrop-blur-xl border border-[#d39a6a]/20 p-5 text-[#fff1e8] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-[#E8C9B5]">
            Switch color style and drag the slider to compare monochrome line art vs. colorized
            rendering.
          </p>
          <div className="inline-flex items-center gap-1 p-1 bg-[#fff1e8]/10 rounded-lg">
            {(['natural', 'cel'] as const).map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setColorStyle(style)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md cursor-pointer transition-colors ${
                  colorStyle === style ? 'bg-[#9a5a2e] text-[#fff1e8]' : 'text-[#E8C9B5]'
                }`}
              >
                {style === 'natural' ? 'Natural' : 'Cel Shading'}
              </button>
            ))}
          </div>
        </div>

        <div className="relative h-44 rounded-xl overflow-hidden border border-[#d39a6a]/25 bg-[#fff1e8]">
          <div className="absolute inset-0 flex items-center justify-center bg-[#fff1e8]">
            <svg viewBox="0 0 320 140" className="w-full h-full" aria-hidden="true">
              <path
                d="M 20 120 Q 90 25, 175 80 T 300 40"
                fill="none"
                stroke="#3e1f0f"
                strokeWidth="3"
              />
              <circle cx="135" cy="56" r="22" fill="none" stroke="#3e1f0f" strokeWidth="2.5" />
              <path d="M 30 105 L 290 105" stroke="#9a5a2e" strokeOpacity="0.45" strokeWidth="1.2" strokeDasharray="4 4" />
            </svg>
          </div>

          <div
            style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
            className={`absolute inset-0 flex items-center justify-center ${
              colorStyle === 'natural'
                ? 'bg-gradient-to-br from-[#3e1f0f] via-[#9a5a2e] to-[#d39a6a]'
                : 'bg-gradient-to-br from-[#241108] via-[#7A4421] to-[#d39a6a]'
            }`}
          >
            <svg viewBox="0 0 320 140" className="w-full h-full" aria-hidden="true">
              <path
                d="M 20 120 Q 90 25, 175 80 T 300 40 L 300 140 L 20 140 Z"
                fill="rgba(255,241,232,0.18)"
              />
              <path
                d="M 20 120 Q 90 25, 175 80 T 300 40"
                fill="none"
                stroke="#fff1e8"
                strokeWidth="3"
              />
              <circle cx="135" cy="56" r="22" fill="#d39a6a" stroke="#fff1e8" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="range"
            min={5}
            max={95}
            value={splitPercent}
            onChange={(e) => setSplitPercent(Number(e.target.value))}
            aria-label="Compare colorized pass with line art"
            className="flex-1 accent-[#d39a6a] cursor-pointer"
          />
          <span className="font-mono text-xs text-[#d39a6a] tabular-nums w-10 text-right">
            {splitPercent}%
          </span>
        </div>
      </div>
    );
  }

  if (demoType === 'nova') {
    const presetStyles: Record<
      typeof novaPreset,
      { bg: string; accent: string; desc: string }
    > = {
      Nothing: {
        bg: 'from-[#160A05] to-[#241108]',
        accent: 'text-[#fff1e8] border-[#d39a6a]/30',
        desc: 'Monochrome · dot matrix',
      },
      Cupertino: {
        bg: 'from-[#241108] via-[#3e1f0f] to-[#5C2E16]',
        accent: 'text-[#d39a6a] border-[#d39a6a]/35',
        desc: 'Frosted glass · depth',
      },
      'One UI': {
        bg: 'from-[#2D160B] to-[#3e1f0f]',
        accent: 'text-[#E8C9B5] border-[#d39a6a]/25',
        desc: 'Soft cards · bold type',
      },
      Ember: {
        bg: 'from-[#3e1f0f] to-[#9a5a2e]',
        accent: 'text-[#fff1e8] border-[#d39a6a]/45',
        desc: 'Burnished · high contrast',
      },
    };
    const activeStyle = presetStyles[novaPreset];

    return (
      <div className="rounded-2xl bg-[#241108]/95 backdrop-blur-xl border border-[#d39a6a]/20 p-5 text-[#fff1e8] space-y-4">
        <p className="text-xs text-[#E8C9B5]">
          Tap a system preset below to preview how Canvas Studio transforms the live lock-screen
          environment:
        </p>

        <div
          className={`rounded-2xl bg-gradient-to-br ${activeStyle.bg} border ${activeStyle.accent} p-5 text-center space-y-3 transition-all duration-300`}
        >
          <p className="font-mono text-[11px] opacity-80">Tue, Oct 27 · {activeStyle.desc}</p>
          <p className="font-display text-4xl font-bold tracking-tight tabular-nums text-[#fff1e8]">
            12:10
          </p>
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto pt-1">
            <div className="rounded-xl bg-[#fff1e8]/10 backdrop-blur-md py-2 px-1">
              <p className="text-xs font-semibold text-[#fff1e8]">20°</p>
              <p className="text-[10px] text-[#E8C9B5]">Clear</p>
            </div>
            <div className="rounded-xl bg-[#fff1e8]/10 backdrop-blur-md py-2 px-1">
              <p className="text-xs font-semibold text-[#fff1e8] tabular-nums">7.4k</p>
              <p className="text-[10px] text-[#E8C9B5]">Steps</p>
            </div>
            <div className="rounded-xl bg-[#fff1e8]/10 backdrop-blur-md py-2 px-1">
              <p className="text-xs font-semibold text-[#fff1e8] tabular-nums">3</p>
              <p className="text-[10px] text-[#E8C9B5]">Events</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(['Nothing', 'Cupertino', 'One UI', 'Ember'] as const).map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setNovaPreset(preset)}
              className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                novaPreset === preset
                  ? 'bg-[#9a5a2e] text-[#fff1e8] border-[#d39a6a]/60'
                  : 'bg-[#fff1e8]/5 text-[#E8C9B5] border-[#d39a6a]/15 hover:bg-[#fff1e8]/10'
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (demoType === 'liquidmorph') {
    const scaleFactor = 0.85 + (bassEnergy / 100) * 0.35;
    return (
      <div className="rounded-2xl bg-[#241108]/95 backdrop-blur-xl border border-[#d39a6a]/20 p-5 text-[#fff1e8] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs text-[#d39a6a]">
            Mode: {visualMode} · Bass Energy {bassEnergy}%
          </span>
          <div className="flex items-center gap-1.5">
            {(['LIQUID', 'FLOW', '3D', 'WAVE'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setVisualMode(m)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded-lg cursor-pointer transition-colors ${
                  visualMode === m
                    ? 'bg-[#9a5a2e] text-[#fff1e8]'
                    : 'bg-[#fff1e8]/10 text-[#E8C9B5] hover:bg-[#fff1e8]/20'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="h-36 flex items-center justify-center relative">
          <motion.div
            animate={{
              scale: [scaleFactor, scaleFactor * 1.08, scaleFactor],
              borderRadius:
                visualMode === 'LIQUID'
                  ? ['42% 58% 60% 40% / 44% 48% 52% 56%', '58% 42% 44% 56% / 56% 52% 48% 44%']
                  : visualMode === 'WAVE'
                  ? ['28%', '50%']
                  : ['50%', '46%'],
            }}
            transition={{ duration: 2.2, repeat: Infinity, repeatType: 'reverse' }}
            className="w-24 h-24 bg-gradient-to-tr from-[#3e1f0f] via-[#9a5a2e] to-[#d39a6a] shadow-[0_0_40px_rgba(211,154,106,0.45)]"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono text-[#E8C9B5]">
            <span>Real-Time FFT Reaction Boost</span>
            <span className="tabular-nums text-[#d39a6a]">{bassEnergy}%</span>
          </div>
          <input
            type="range"
            min={20}
            max={100}
            value={bassEnergy}
            onChange={(e) => setBassEnergy(Number(e.target.value))}
            aria-label="Adjust bass energy boost"
            className="w-full accent-[#d39a6a] cursor-pointer"
          />
        </div>
      </div>
    );
  }

  if (demoType === 'medicine') {
    const tabContent: Record<typeof medTab, { title: string; metric: string; detail: string }> = {
      টালি: {
        title: 'Daily Counter Summary',
        metric: 'Tk 500.00 Sales · Tk 498.00 Profit',
        detail: 'Avg Margin 99.6% · Total Due Receivable Tk 0.00',
      },
      বিলিং: {
        title: 'Customer Prescription Billing',
        metric: 'Instant Stock Quantity Validation',
        detail: 'Prevents overselling out-of-stock or expired batches at the counter.',
      },
      কাস্টমার: {
        title: 'Customer Receivable Ledger',
        metric: 'Zero Unpaid Dues Today',
        detail: 'Tracks regular pharmacy customers and partial payment settlements.',
      },
      ইনভেন্টরি: {
        title: 'Expiry & Stock Monitoring',
        metric: 'Available / Out-of-Stock Filter',
        detail: 'Flags approaching expiry dates and low stock thresholds automatically.',
      },
    };
    const activeMed = tabContent[medTab];

    return (
      <div className="rounded-2xl bg-[#3e1f0f] border border-[#d39a6a]/25 p-5 text-[#fff1e8] space-y-4">
        <p className="text-xs text-[#E8C9B5]">
          Switch across the Bengali pharmacy counter tabs to inspect live counter capabilities:
        </p>

        <div className="rounded-xl bg-[#fff1e8]/8 border border-[#d39a6a]/20 p-4 space-y-1.5">
          <p className="font-mono text-xs text-[#d39a6a]">{activeMed.title}</p>
          <p className="font-display text-lg font-bold text-[#fff1e8] tabular-nums">
            {activeMed.metric}
          </p>
          <p className="text-xs text-[#E8C9B5]">{activeMed.detail}</p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {(['টালি', 'বিলিং', 'কাস্টমার', 'ইনভেন্টরি'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setMedTab(t)}
              className={`py-2 px-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                medTab === t
                  ? 'bg-[#9a5a2e] text-[#fff1e8]'
                  : 'bg-[#fff1e8]/10 text-[#E8C9B5] hover:bg-[#fff1e8]/15'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (demoType === 'stockpilot') {
    return (
      <div className="rounded-2xl bg-[#3e1f0f] border border-[#d39a6a]/25 p-5 text-[#fff1e8] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-[#E8C9B5]">
            Simulate StockPilot inventory depletion &amp; profit calculation (Phase 2 roadmap
            preview).
          </p>
          <span className="font-mono text-xs text-[#d39a6a] tabular-nums">
            {remainingStock <= 15 ? 'Low Stock Alert' : 'Healthy Stock'}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span>Units Sold Today: {unitsSold}</span>
            <span className="tabular-nums">Initial Stock: {initialStock}</span>
          </div>
          <input
            type="range"
            min={0}
            max={55}
            value={unitsSold}
            onChange={(e) => setUnitsSold(Number(e.target.value))}
            aria-label="Simulate units sold"
            className="w-full accent-[#d39a6a] cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-[#fff1e8]/[0.06] border border-[#d39a6a]/20 p-3">
            <p className="text-[11px] text-[#E8C9B5]">Remaining</p>
            <p className="font-mono text-lg font-bold tabular-nums mt-0.5">{remainingStock}</p>
          </div>
          <div className="rounded-xl bg-[#fff1e8]/[0.06] border border-[#d39a6a]/20 p-3">
            <p className="text-[11px] text-[#E8C9B5]">Est. Profit</p>
            <p className="font-mono text-lg font-bold text-[#d39a6a] tabular-nums mt-0.5">
              ৳{(unitsSold * unitMargin).toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl bg-[#fff1e8]/[0.06] border border-[#d39a6a]/20 p-3">
            <p className="text-[11px] text-[#E8C9B5]">Status</p>
            <p className="font-mono text-xs font-semibold mt-2">
              {remainingStock <= 15 ? 'Reorder' : 'Optimal'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (demoType === 'cpitimeline') {
    const deptFeeds: Record<string, string> = {
      Computer: 'CST Semester Routine & Lab Project Submission Notices',
      Electrical: 'Power Distribution Lab Schedule & Workshop Safety Brief',
      Civil: 'Surveying Field Camp Dates & Structural Drawing Submissions',
      Mechanical: 'Machine Shop Practical Assessment & CAD Timetable',
    };
    return (
      <div className="rounded-2xl bg-white/85 backdrop-blur-xl border border-[#9a5a2e]/15 p-5 space-y-4">
        <p className="text-xs text-[#5C341F]">
          Select a Chittagong Polytechnic Institute department to preview its campus feed:
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.keys(deptFeeds).map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setCpiDept(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                cpiDept === dept
                  ? 'bg-[#9a5a2e] text-[#fff1e8]'
                  : 'bg-[#fff1e8] text-[#3e1f0f] hover:bg-[#d39a6a]/25'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
        <div className="rounded-xl bg-[#fff1e8]/80 border border-[#9a5a2e]/15 p-4">
          <p className="font-mono text-xs text-[#9a5a2e]">{cpiDept} Department Feed</p>
          <p className="text-sm font-medium text-[#3e1f0f] mt-1">{deptFeeds[cpiDept]}</p>
        </div>
      </div>
    );
  }

  // tricode scientific calculator sandbox
  const applyOp = (op: 'sin' | 'cos' | 'sqrt' | 'sq' | 'clear') => {
    const val = parseFloat(calcExpr) || 0;
    if (op === 'clear') {
      setCalcExpr('0');
      setCalcResult('0');
    } else if (op === 'sin') {
      setCalcResult(Math.sin((val * Math.PI) / 180).toFixed(4));
    } else if (op === 'cos') {
      setCalcResult(Math.cos((val * Math.PI) / 180).toFixed(4));
    } else if (op === 'sqrt') {
      setCalcResult(val >= 0 ? Math.sqrt(val).toFixed(4) : 'Undefined');
    } else if (op === 'sq') {
      setCalcResult((val * val).toFixed(2));
    }
  };

  return (
    <div className="rounded-2xl bg-[#fff1e8]/85 border border-[#9a5a2e]/20 p-5 space-y-4">
      <p className="text-xs text-[#9a5a2e] font-medium">
        TriCode Nexus Scientific Demo · Live Expression Sandbox
      </p>

      <div className="rounded-xl bg-white/90 border border-[#9a5a2e]/15 p-4 flex items-center justify-between gap-4">
        <input
          type="number"
          value={calcExpr}
          onChange={(e) => setCalcExpr(e.target.value)}
          aria-label="Input value for scientific calculation"
          className="w-28 px-3 py-1.5 rounded-lg border border-[#9a5a2e]/25 font-mono text-sm text-[#3e1f0f] bg-[#fff1e8]/40"
        />
        <div className="text-right">
          <p className="text-[11px] font-mono text-[#7A4B31]">Output</p>
          <p className="font-mono text-xl font-bold text-[#9a5a2e] tabular-nums">{calcResult}</p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {(
          [
            { id: 'sin', label: 'sin(x°)' },
            { id: 'cos', label: 'cos(x°)' },
            { id: 'sqrt', label: '√x' },
            { id: 'sq', label: 'x²' },
            { id: 'clear', label: 'AC' },
          ] as const
        ).map((btn) => (
          <button
            key={btn.id}
            type="button"
            onClick={() => applyOp(btn.id)}
            className={`py-2 text-xs font-mono font-semibold rounded-lg transition-colors cursor-pointer ${
              btn.id === 'clear'
                ? 'bg-[#3e1f0f] text-[#fff1e8] hover:bg-[#241108]'
                : 'bg-[#9a5a2e] text-[#fff1e8] hover:bg-[#7A4421]'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
