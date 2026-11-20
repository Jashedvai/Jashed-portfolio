import { useCallback, useEffect, useRef, useState } from 'react';
import { playClickThock, playHoverTick } from '../utils/soundEffects';

const MATRIX_GLYPHS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ.:/+*#';

interface MatrixNameProps {
  prefix?: string;
  highlight?: string;
  className?: string;
}

export function MatrixName({
  prefix = 'Md. Ahsanul Haque ',
  highlight = 'Jashed',
  className = '',
}: MatrixNameProps) {
  const fullText = `${prefix}${highlight}`;
  const [rendered, setRendered] = useState(fullText);
  const frameRef = useRef<number | null>(null);

  const runDecode = useCallback(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setRendered(fullText);
      return;
    }

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    const totalFrames = 24;
    let tick = 0;

    const step = () => {
      tick += 1;
      const progress = tick / totalFrames;
      const revealedCount = Math.floor(progress * fullText.length);

      let next = '';
      for (let i = 0; i < fullText.length; i++) {
        const ch = fullText[i];
        if (ch === ' ' || ch === '.') {
          next += ch;
        } else if (i < revealedCount) {
          next += ch;
        } else {
          next += MATRIX_GLYPHS[(i * 7 + tick * 3) % MATRIX_GLYPHS.length];
        }
      }

      setRendered(next);

      if (tick < totalFrames) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setRendered(fullText);
        frameRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(step);
  }, [fullText]);

  useEffect(() => {
    runDecode();
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [runDecode]);

  const prefixOut = rendered.slice(0, prefix.length);
  const highlightOut = rendered.slice(prefix.length);

  return (
    <span
      onMouseEnter={() => {
        playHoverTick();
        runDecode();
      }}
      onClick={() => {
        playClickThock();
        runDecode();
      }}
      title="Tap or hover to re-decode matrix signature"
      className={`inline-block font-matrix tracking-[0.03em] leading-[1.08] select-none cursor-pointer ${className}`}
    >
      <span className="text-[#fff1e8]">{prefixOut}</span>
      <span className="text-[#d39a6a] drop-shadow-[0_0_18px_rgba(211,154,106,0.35)]">
        {highlightOut}
      </span>
    </span>
  );
}
