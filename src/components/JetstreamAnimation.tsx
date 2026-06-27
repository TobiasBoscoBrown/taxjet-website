'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function JetstreamAnimation() {
  const { scrollYProgress } = useScroll();

  // Jet follows scroll with very subtle motion
  const jetX = useTransform(scrollYProgress, [0, 1], [-300, 2220]);
  const jetY = useTransform(scrollYProgress, [0, 0.5, 1], [580, 520, 560]);

  // Very subtle rotation
  const jetRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-2, 1, -1]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="streamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
            <stop offset="20%" stopColor="rgba(59, 130, 246, 0.12)" />
            <stop offset="50%" stopColor="rgba(147, 197, 253, 0.18)" />
            <stop offset="80%" stopColor="rgba(59, 130, 246, 0.08)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>

          <linearGradient id="coreStreamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="35%" stopColor="rgba(255, 255, 255, 0.08)" />
            <stop offset="65%" stopColor="rgba(255, 255, 255, 0.1)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>

          <filter id="streamGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="jetGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Gentle, flowing stream - no wiggling */}
        <motion.path
          d="M -400 540 C 200 520, 700 500, 960 540 S 1800 580, 2400 540"
          stroke="url(#streamGradient)"
          strokeWidth="100"
          fill="none"
          filter="url(#streamGlow)"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.5, pathLength: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
        />

        <motion.path
          d="M -400 540 C 200 510, 700 490, 960 540 S 1800 590, 2400 540"
          stroke="url(#coreStreamGradient)"
          strokeWidth="40"
          fill="none"
          filter="url(#streamGlow)"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.4, pathLength: 1 }}
          transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
        />

        {/* Jet follows scroll with subtle motion */}
        <motion.g style={{ x: jetX, y: jetY, rotate: jetRotate }}>
          <image
            href="/jet.png"
            width="400"
            height="200"
            x="-200"
            y="-100"
            filter="url(#jetGlow)"
          />
        </motion.g>
      </svg>
    </div>
  );
}
