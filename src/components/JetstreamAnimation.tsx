'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function JetstreamAnimation() {
  const { scrollYProgress } = useScroll();

  // Jet travels along the stream path
  const jetX = useTransform(scrollYProgress, [0, 1], [-200, 2100]);

  // The stream is revealed from behind the jet as it flies
  const streamReveal = useTransform(scrollYProgress, [0, 1], [2600, 0]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="streamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
            <stop offset="20%" stopColor="rgba(59, 130, 246, 0.25)" />
            <stop offset="50%" stopColor="rgba(147, 197, 253, 0.2)" />
            <stop offset="80%" stopColor="rgba(59, 130, 246, 0.1)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>

          <linearGradient id="coreStreamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.1)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>

          <filter id="streamGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Main stream created by the jet - revealed as jet flies */}
        <motion.path
          d="M -300 540 C 300 525, 700 510, 960 540 S 1700 570, 2300 540"
          stroke="url(#streamGradient)"
          strokeWidth="90"
          fill="none"
          filter="url(#streamGlow)"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          style={{
            strokeDasharray: 2600,
            strokeDashoffset: streamReveal
          }}
        />

        <motion.path
          d="M -300 540 C 300 525, 700 510, 960 540 S 1700 570, 2300 540"
          stroke="url(#coreStreamGradient)"
          strokeWidth="35"
          fill="none"
          filter="url(#streamGlow)"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          style={{
            strokeDasharray: 2600,
            strokeDashoffset: streamReveal
          }}
        />

        {/* Jet travels ahead of its stream */}
        <motion.g style={{ x: jetX, y: 540 }}>
          <image
            href="/jet.png"
            width="120"
            height="60"
            x="-60"
            y="-30"
            style={{ filter: 'drop-shadow(0 0 25px rgba(59, 130, 246, 0.5))' }}
          />
        </motion.g>
      </svg>
    </div>
  );
}
