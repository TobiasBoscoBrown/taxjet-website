'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo } from 'react';

export default function JetstreamAnimation() {
  const { scrollYProgress } = useScroll();

  // Jet follows a gentle sweeping path
  const jetX = useTransform(scrollYProgress, [0, 1], [-220, 2140]);
  const jetY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [620, 460, 560, 500, 520]);

  // Rotate the jet to always point along its path
  const jetRotate = useTransform(
    scrollYProgress,
    [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
    [-4, -8, 5, 7, -3, -5, 3, 4, -1]
  );

  // Build stream path that matches the jet's flight path
  const streamPath = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 80; i++) {
      const t = i / 80;
      const x = -220 + t * 2360;
      const y = 620 + Math.sin(t * Math.PI * 1.5) * -80 + Math.cos(t * Math.PI * 2) * 40;
      points.push(`${x},${y}`);
    }
    return `M ${points[0]} ${points.slice(1).map(p => `L ${p}`).join(' ')}`;
  }, []);

  const streamReveal = useTransform(scrollYProgress, [0, 1], [3200, 0]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="streamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
            <stop offset="25%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="55%" stopColor="rgba(147, 197, 253, 0.2)" />
            <stop offset="85%" stopColor="rgba(59, 130, 246, 0.05)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>

          <linearGradient id="coreStreamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.25)" />
            <stop offset="40%" stopColor="rgba(255, 255, 255, 0.12)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>

          <filter id="streamGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur"/>
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

        {/* Stream created by the jet - revealed as the jet flies */}
        <motion.path
          d={streamPath}
          stroke="url(#streamGradient)"
          strokeWidth="100"
          fill="none"
          filter="url(#streamGlow)"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          transition={{ duration: 1.2 }}
          style={{
            strokeDasharray: 3200,
            strokeDashoffset: streamReveal
          }}
        />

        <motion.path
          d={streamPath}
          stroke="url(#coreStreamGradient)"
          strokeWidth="40"
          fill="none"
          filter="url(#streamGlow)"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 1.2, delay: 0.15 }}
          style={{
            strokeDasharray: 3200,
            strokeDashoffset: streamReveal
          }}
        />

        {/* Large jet that flies and rotates toward its path */}
        <motion.g style={{ x: jetX, y: jetY, rotate: jetRotate }}>
          <image
            href="/jet.png"
            width="220"
            height="110"
            x="-110"
            y="-55"
            filter="url(#jetGlow)"
          />
        </motion.g>
      </svg>
    </div>
  );
}
