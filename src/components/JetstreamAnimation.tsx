'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function JetstreamAnimation() {
  const { scrollYProgress } = useScroll();

  // Jet flies across the screen with scroll
  const jetX = useTransform(scrollYProgress, [0, 1], [-400, 2320]);
  const jetY = useTransform(scrollYProgress, [0, 0.5, 1], [650, 500, 550]);

  // Subtle rotation as it flies
  const jetRotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [-3, 4, -2, 3, -1]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="streamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
            <stop offset="15%" stopColor="rgba(59, 130, 246, 0.25)" />
            <stop offset="45%" stopColor="rgba(147, 197, 253, 0.35)" />
            <stop offset="75%" stopColor="rgba(59, 130, 246, 0.2)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>

          <linearGradient id="coreStreamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="30%" stopColor="rgba(255, 255, 255, 0.15)" />
            <stop offset="60%" stopColor="rgba(255, 255, 255, 0.2)" />
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
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Constant beautiful stream flowing across */}
        <motion.path
          d="M -400 540 C 200 510, 700 490, 960 540 S 1800 590, 2400 540"
          stroke="url(#streamGradient)"
          strokeWidth="120"
          fill="none"
          filter="url(#streamGlow)"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.7, pathLength: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        <motion.path
          d="M -400 540 C 200 500, 700 470, 960 540 S 1800 610, 2400 540"
          stroke="url(#coreStreamGradient)"
          strokeWidth="50"
          fill="none"
          filter="url(#streamGlow)"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.6, pathLength: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
        />

        {/* Jet flies with scroll */}
        <motion.g style={{ x: jetX, y: jetY, rotate: jetRotate }}>
          <image
            href="/jet.png"
            width="450"
            height="225"
            x="-225"
            y="-112.5"
            filter="url(#jetGlow)"
          />
        </motion.g>
      </svg>
    </div>
  );
}
