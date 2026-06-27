'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo } from 'react';

export default function JetstreamAnimation() {
  const { scrollYProgress } = useScroll();

  const jetX = useTransform(scrollYProgress, [0, 1], [-150, 2070]);
  const jetY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [540, 380, 620, 420, 540]);
  const jetRotate = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [-8, 6, -6, 5, -3]);

  const trailPath = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 50; i++) {
      const t = i / 50;
      const x = -150 + t * 2220;
      const y = 540 + Math.sin(t * Math.PI * 3) * 120 + Math.cos(t * Math.PI * 2) * 60;
      points.push({ x, y });
    }
    return points;
  }, []);

  const trailD = useMemo(() => {
    if (trailPath.length === 0) return '';
    let d = `M ${trailPath[0].x} ${trailPath[0].y}`;
    for (let i = 1; i < trailPath.length; i++) {
      d += ` L ${trailPath[i].x} ${trailPath[i].y}`;
    }
    return d;
  }, [trailPath]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="jetstreamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
            <stop offset="20%" stopColor="rgba(59, 130, 246, 0.5)" />
            <stop offset="50%" stopColor="rgba(147, 197, 253, 0.3)" />
            <stop offset="80%" stopColor="rgba(59, 130, 246, 0.1)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feGaussianBlur stdDeviation="8" result="wideBlur"/>
            <feMerge>
              <feMergeNode in="wideBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Trail path that follows the jet's flight path */}
        <motion.path
          d={trailD}
          stroke="url(#jetstreamGradient)"
          strokeWidth="6"
          fill="none"
          filter="url(#glow)"
          strokeLinecap="round"
          style={{
            strokeDasharray: 2500,
            strokeDashoffset: useTransform(scrollYProgress, [0, 1], [2500, 0])
          }}
        />

        <motion.path
          d={trailD}
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="2"
          fill="none"
          filter="url(#softGlow)"
          strokeLinecap="round"
          style={{
            strokeDasharray: 2500,
            strokeDashoffset: useTransform(scrollYProgress, [0, 1], [2500, 0])
          }}
        />

        {/* Jet image that follows scroll */}
        <motion.g
          style={{
            x: jetX,
            y: jetY,
            rotate: jetRotate
          }}
        >
          <image
            href="/jet.png"
            width="140"
            height="70"
            x="-70"
            y="-35"
            filter="url(#glow)"
          />
        </motion.g>
      </svg>
    </div>
  );
}
