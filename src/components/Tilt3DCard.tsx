import { ReactNode, useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';

interface Tilt3DCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
  onMouseEnter?: () => void;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  role?: string;
  tabIndex?: number;
  ariaLabel?: string;
}

export function Tilt3DCard({
  children,
  className = '',
  maxTilt = 8,
  glareOpacity = 0.22,
  onMouseEnter,
  onClick,
  onKeyDown,
  role,
  tabIndex,
  ariaLabel,
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const glareXRaw = useMotionValue(50);
  const glareYRaw = useMotionValue(50);

  const rotateX = useSpring(rotateXRaw, { stiffness: 260, damping: 24 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 260, damping: 24 });
  const glareX = useSpring(glareXRaw, { stiffness: 220, damping: 26 });
  const glareY = useSpring(glareYRaw, { stiffness: 220, damping: 26 });

  const glareBackground = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(211, 154, 106, ${
    hovered ? glareOpacity : 0
  }), transparent 68%)`;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;

    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rotateXRaw.set((0.5 - py) * maxTilt * 2);
    rotateYRaw.set((px - 0.5) * maxTilt * 2);
    glareXRaw.set(px * 100);
    glareYRaw.set(py * 100);
  };

  const handlePointerEnter = () => {
    setHovered(true);
    onMouseEnter?.();
  };

  const handlePointerLeave = () => {
    setHovered(false);
    rotateXRaw.set(0);
    rotateYRaw.set(0);
    glareXRaw.set(50);
    glareYRaw.set(50);
  };

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1100,
        transformStyle: 'preserve-3d',
      }}
      className={`relative will-change-transform ${className}`}
    >
      {/* Dynamic 3D Specular Copper Sheen */}
      <motion.div
        aria-hidden="true"
        style={{ background: glareBackground }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-20 transition-opacity duration-200"
      />
      {children}
    </motion.div>
  );
}
