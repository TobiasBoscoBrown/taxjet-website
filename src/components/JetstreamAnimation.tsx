'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function JetstreamAnimation() {
  const { scrollYProgress } = useScroll();

  // Single jet travels along the constant stream path
  const jetX = useTransform(scrollYProgress, [0, 1], [-200, 2100]);
  const jetY = useTransform(scrollYProgress, [0, 1], [540, 540]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="streamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
            <stop offset="10%" stopColor="rgba(59, 130, 246, 0.15)" />
            <stop offset="40%" stopColor="rgba(147, 197, 253, 0.25)" />
            <stop offset="70%" stopColor="rgba(59, 130, 246, 0.15)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>

          <filter id="streamGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Elegant constant stream across the full screen */}
        <motion.path
          d="M -300 540 C 300 520, 700 500, 960 540 S 1700 580, 2300 540"
          stroke="url(#streamGradient)"
          strokeWidth="100"
          fill="none"
          filter="url(#streamGlow)"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.5, pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />

        <motion.path
          d="M -300 540 C 300 510, 700 480, 960 540 S 1700 600, 2300 540"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="30"
          fill="none"
          filter="url(#streamGlow)"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.4, pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.2 }}
        />

        {/* Jet travels with the stream as you scroll */}
        <motion.g style={{ x: jetX, y: jetY }}>
          <image
            href="/jet.png"
            width="120"
            height="60"
            x="-60"
            y="-30"
            style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))' }}
          />
        </motion.g>
      </svg>
    </div>
  );
}
