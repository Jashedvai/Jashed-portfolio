interface MarqueeDividerProps {
  items: string[];
  variant?: 'light' | 'dark';
}

export function MarqueeDivider({ items, variant = 'light' }: MarqueeDividerProps) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden py-3.5 border-y select-none ${
        variant === 'dark'
          ? 'bg-[#3e1f0f] border-[#d39a6a]/20 text-[#fff1e8]'
          : 'bg-[#fff1e8] border-[#3e1f0f]/10 text-[#5C341F]'
      }`}
    >
      <div className="animate-marquee">
        {repeated.map((item, idx) => (
          <div key={`${item}-${idx}`} className="flex items-center shrink-0">
            <span className="font-mono text-xs tracking-wide px-5 whitespace-nowrap">{item}</span>
            <span
              className={variant === 'dark' ? 'text-[#d39a6a] text-xs' : 'text-[#9a5a2e] text-xs'}
              aria-hidden="true"
            >
              ·
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
