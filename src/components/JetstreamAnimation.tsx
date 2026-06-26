'use client';

import { motion } from 'framer-motion';

export default function JetstreamAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Expanding jetstream gradient - starts narrow at jet, expands outward */}
          <linearGradient id="jetstreamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
            <stop offset="15%" stopColor="rgba(59, 130, 246, 0.6)" />
            <stop offset="40%" stopColor="rgba(147, 197, 253, 0.4)" />
            <stop offset="70%" stopColor="rgba(59, 130, 246, 0.2)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>
          
          <linearGradient id="jetstreamGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
            <stop offset="30%" stopColor="rgba(255, 255, 255, 0.4)" />
            <stop offset="70%" stopColor="rgba(255, 255, 255, 0.2)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>

          {/* Enhanced glow filter */}
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
        
        {/* Primary jetstream - expanding trail behind jet */}
        <motion.path
          d="M -200 540 C 100 520, 400 500, 960 540 S 1820 580, 2120 540"
          stroke="url(#jetstreamGradient)"
          strokeWidth="8"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 4, ease: "easeInOut" }}
          style={{ strokeDasharray: '2000', strokeDashoffset: 0 }}
        />
        
        {/* Secondary jetstream - wider expanding flow */}
        <motion.path
          d="M -200 540 C 100 510, 400 480, 960 540 S 1820 600, 2120 540"
          stroke="url(#jetstreamGlow)"
          strokeWidth="4"
          fill="none"
          filter="url(#softGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 5, ease: "easeInOut", delay: 0.2 }}
          style={{ strokeDasharray: '2000', strokeDashoffset: 0 }}
        />

        {/* Tertiary jetstream - widest outer expansion */}
        <motion.path
          d="M -200 540 C 100 500, 400 460, 960 540 S 1820 620, 2120 540"
          stroke="rgba(147, 197, 253, 0.3)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 6, ease: "easeInOut", delay: 0.4 }}
          style={{ strokeDasharray: '2000', strokeDashoffset: 0 }}
        />

        {/* Jet image */}
        <motion.img
          src="/jet.png"
          alt="Jet"
          width="120"
          height="60"
          initial={{ x: -150, y: 540, rotate: -3 }}
          animate={{ x: 2070, y: 540, rotate: 3 }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatDelay: 3 }}
          style={{
            position: 'absolute',
            filter: 'url(#glow)'
          }}
        />
      </svg>
    </div>
  );
}
