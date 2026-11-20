import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[70] h-[3px] bg-[#3e1f0f]/10 pointer-events-none"
    >
      <motion.div
        style={{ scaleX }}
        className="h-full w-full origin-left bg-gradient-to-r from-[#9a5a2e] via-[#d39a6a] to-[#fff1e8] shadow-[0_0_8px_rgba(211,154,106,0.5)]"
      />
    </div>
  );
}
