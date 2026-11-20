import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';

interface SurfaceRipple {
  id: number;
  x: number;
  y: number;
  interactive: boolean;
}

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label[for], [data-touchable="true"]';

export function TouchableSurfaceMouse() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<SurfaceRipple[]>([]);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Tight spring for the tactile surface lens, slightly softer spring for the ambient field
  const lensX = useSpring(rawX, { stiffness: 620, damping: 38, mass: 0.35 });
  const lensY = useSpring(rawY, { stiffness: 620, damping: 38, mass: 0.35 });
  const fieldX = useSpring(rawX, { stiffness: 260, damping: 30, mass: 0.65 });
  const fieldY = useSpring(rawY, { stiffness: 260, damping: 30, mass: 0.65 });

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    const mediaQuery = window.matchMedia('(pointer: fine)');
    const syncPointerSupport = () => setEnabled(mediaQuery.matches);
    syncPointerSupport();

    mediaQuery.addEventListener('change', syncPointerSupport);
    return () => mediaQuery.removeEventListener('change', syncPointerSupport);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    let rippleCounter = 0;

    const resolveInteractive = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return Boolean(target.closest(INTERACTIVE_SELECTOR));
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible((prev) => (prev ? prev : true));

      const nextInteractive = resolveInteractive(e.target);
      setIsInteractive((prev) => (prev === nextInteractive ? prev : nextInteractive));
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
      setIsPressed(true);

      const interactiveHit = resolveInteractive(e.target);
      setIsInteractive(interactiveHit);

      rippleCounter += 1;
      const id = rippleCounter;
      setRipples((prev) => [
        ...prev.slice(-3),
        { id, x: e.clientX, y: e.clientY, interactive: interactiveHit },
      ]);

      window.setTimeout(() => {
        setRipples((prev) => prev.filter((item) => item.id !== id));
      }, 480);
    };

    const handlePointerUp = () => {
      setIsPressed(false);
    };

    const handleMouseLeave = () => {
      setVisible(false);
      setIsPressed(false);
      setIsInteractive(false);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointercancel', handlePointerUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] overflow-hidden"
    >
      {/* 1. GPU-Composited Ambient Copper Surface Contact Field */}
      <motion.div
        style={{ x: fieldX, y: fieldY }}
        animate={{
          opacity: visible ? (isPressed ? 0.95 : isInteractive ? 0.78 : 0.45) : 0,
          scale: isPressed ? 0.84 : isInteractive ? 1.15 : 1,
        }}
        transition={{
          opacity: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
          scale: { type: 'spring', stiffness: 320, damping: 26 },
        }}
        className="fixed top-0 left-0 -ml-[135px] -mt-[135px] w-[270px] h-[270px] rounded-full will-change-transform bg-[radial-gradient(circle,rgba(211,154,106,0.22)_0%,rgba(154,90,46,0.08)_42%,transparent_72%)]"
      />

      {/* 2. Morphing Tactile Surface Pad Ring */}
      <motion.div
        style={{ x: lensX, y: lensY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: isPressed ? 0.76 : isInteractive ? 1.85 : 1,
        }}
        transition={{
          opacity: { duration: 0.16 },
          scale: { type: 'spring', stiffness: 460, damping: 28 },
        }}
        className={`fixed top-0 left-0 -ml-3 -mt-3 w-6 h-6 rounded-full will-change-transform transition-colors duration-200 ${
          isPressed
            ? 'border border-[#9a5a2e]/80 bg-[#d39a6a]/24 ring-1 ring-[#fff1e8]/60 shadow-[0_0_16px_rgba(211,154,106,0.35)]'
            : isInteractive
            ? 'border border-[#9a5a2e]/55 bg-[#d39a6a]/14 ring-1 ring-[#fff1e8]/45 backdrop-blur-[1px]'
            : 'border border-[#9a5a2e]/35 bg-[#d39a6a]/[0.05] ring-1 ring-[#fff1e8]/30'
        }`}
      />

      {/* 3. Ephemeral Capacitive Touch Ripples on Click / Press */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 0.68, scale: 0.25 }}
            animate={{ opacity: 0, scale: ripple.interactive ? 1.45 : 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ left: ripple.x, top: ripple.y }}
            className="fixed -ml-8 -mt-8 w-16 h-16 rounded-full border border-[#9a5a2e]/65 ring-1 ring-[#fff1e8]/55 bg-radial from-[#d39a6a]/20 via-transparent to-transparent will-change-transform"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
