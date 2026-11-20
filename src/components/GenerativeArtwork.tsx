import { useEffect, useRef } from 'react';
import { PersonalWorkItem } from '../data/portfolioData';

interface GenerativeArtworkProps {
  type: PersonalWorkItem['sketchType'];
  palette: [string, string, string];
  seed?: number;
  paused?: boolean;
  interactive?: boolean;
  className?: string;
}

export function GenerativeArtwork({
  type,
  palette,
  seed = 1,
  paused = false,
  interactive = false,
  className = 'w-full h-64',
}: GenerativeArtworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth || 420;
    const height = canvas.clientHeight || 320;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let animId = 0;
    let time = seed * 1.37;

    const [bg, primary, secondary] = palette;

    const drawFrame = () => {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      if (type === 'flow-field') {
        const rows = 14;
        const cols = 18;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = ((c + 0.5) / cols) * width;
            const y = ((r + 0.5) / rows) * height;
            const angle =
              Math.sin(c * 0.28 + time * 0.5 + seed) * 1.4 +
              Math.cos(r * 0.34 - time * 0.4) * 1.1;
            const len = 14 + Math.sin(r + c + time) * 4;
            ctx.strokeStyle = (r + c) % 3 === 0 ? secondary : primary;
            ctx.globalAlpha = 0.72;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(x - Math.cos(angle) * len * 0.5, y - Math.sin(angle) * len * 0.5);
            ctx.lineTo(x + Math.cos(angle) * len * 0.5, y + Math.sin(angle) * len * 0.5);
            ctx.stroke();
          }
        }
        ctx.globalAlpha = 1;
      } else if (type === 'orbital-harmonics') {
        const cx = width / 2;
        const cy = height / 2;
        const maxR = Math.min(width, height) * 0.38;

        for (let ring = 1; ring <= 6; ring++) {
          const r = (ring / 6) * maxR;
          ctx.strokeStyle = ring % 2 === 0 ? primary : secondary;
          ctx.globalAlpha = 0.25 + ring * 0.08;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();

          const orbAngle = time * (0.4 + ring * 0.14) + ring * seed;
          const ox = cx + Math.cos(orbAngle) * r;
          const oy = cy + Math.sin(orbAngle) * r;
          ctx.fillStyle = ring % 2 === 0 ? secondary : '#FFFFFF';
          ctx.globalAlpha = 0.95;
          ctx.beginPath();
          ctx.arc(ox, oy, 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      } else if (type === 'bauhaus-grid') {
        const cols = 4;
        const rows = 4;
        const cellW = width / cols;
        const cellH = height / rows;
        const radius = Math.min(cellW, cellH) * 0.42;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = c * cellW + cellW / 2;
            const y = r * cellH + cellH / 2;
            const variant = (r * 3 + c + seed) % 4;
            ctx.fillStyle = (r + c) % 2 === 0 ? secondary : primary;
            ctx.beginPath();
            if (variant === 0) {
              ctx.arc(x, y, radius * 0.72, 0, Math.PI * 2);
            } else if (variant === 1) {
              const offset = Math.sin(time * 0.7 + r) * 0.15;
              ctx.moveTo(x, y);
              ctx.arc(x, y, radius, offset, Math.PI + offset);
            } else if (variant === 2) {
              ctx.rect(x - radius * 0.65, y - radius * 0.65, radius * 1.3, radius * 1.3);
            } else {
              ctx.moveTo(x - radius * 0.7, y + radius * 0.7);
              ctx.lineTo(x + radius * 0.7, y + radius * 0.7);
              ctx.lineTo(x, y - radius * 0.7);
            }
            ctx.closePath();
            ctx.fill();
          }
        }
      } else if (type === 'topographic-wave') {
        const lines = 16;
        for (let i = 0; i < lines; i++) {
          const baseY = ((i + 1.5) / (lines + 2)) * height;
          ctx.beginPath();
          ctx.strokeStyle = i % 3 === 0 ? primary : secondary;
          ctx.globalAlpha = 0.35 + (i / lines) * 0.55;
          ctx.lineWidth = 1.5;
          for (let x = 0; x <= width; x += 6) {
            const norm = x / width;
            const ridge =
              Math.exp(-Math.pow((norm - 0.5) * 3.1, 2)) *
              (22 + Math.sin(norm * 10 + i * 0.55 + time + seed) * 14);
            const y = baseY - ridge;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      } else if (type === 'recursive-tree') {
        const drawBranch = (
          x: number,
          y: number,
          len: number,
          angle: number,
          depth: number
        ) => {
          if (depth === 0) return;
          const x2 = x + Math.cos(angle) * len;
          const y2 = y + Math.sin(angle) * len;
          ctx.strokeStyle = depth <= 2 ? secondary : primary;
          ctx.lineWidth = Math.max(1, depth * 0.85);
          ctx.globalAlpha = 0.4 + depth * 0.08;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x2, y2);
          ctx.stroke();

          const sway = Math.sin(time * 0.8 + depth) * 0.04;
          const spread = 0.36 + (seed % 3) * 0.05;
          drawBranch(x2, y2, len * 0.74, angle - spread + sway, depth - 1);
          drawBranch(x2, y2, len * 0.74, angle + spread + sway, depth - 1);
        };
        drawBranch(width / 2, height * 0.88, height * 0.21, -Math.PI / 2, 7);
        ctx.globalAlpha = 1;
      } else if (type === 'kinetic-type') {
        const cols = 12;
        const rows = 9;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = ((c + 0.5) / cols) * width;
            const y = ((r + 0.5) / rows) * height;
            const dist = Math.hypot(c - cols / 2, r - rows / 2);
            const wave = (Math.sin(dist * 0.85 - time * 1.4 + seed) + 1) * 0.5;
            const radius = 2 + wave * 6.5;
            ctx.fillStyle = wave > 0.55 ? primary : secondary;
            ctx.globalAlpha = 0.35 + wave * 0.65;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      }

      if (interactive && !paused) {
        time += 0.018;
        animId = requestAnimationFrame(drawFrame);
      }
    };

    drawFrame();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [type, palette, seed, paused, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`block ${className}`}
      aria-label={`Generative visual artwork: ${type}`}
    />
  );
}
