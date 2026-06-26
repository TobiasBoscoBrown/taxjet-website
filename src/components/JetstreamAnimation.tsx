'use client';

import { motion } from 'framer-motion';

export default function JetstreamAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="jetstreamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main jetstream path */}
        <motion.path
          d="M -100 540 Q 400 400, 800 540 T 1600 540 T 2020 540"
          stroke="url(#jetstreamGradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          style={{ strokeDasharray: '1000', strokeDashoffset: 0 }}
        />
        
        {/* Secondary jetstream */}
        <motion.path
          d="M -100 520 Q 400 380, 800 520 T 1600 520 T 2020 520"
          stroke="rgba(59, 130, 246, 0.15)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 4, ease: "easeInOut", delay: 0.5 }}
          style={{ strokeDasharray: '1000', strokeDashoffset: 0 }}
        />
        
        {/* Plane */}
        <motion.g
          initial={{ x: -100, y: 540, rotate: -5 }}
          animate={{ x: 1920, y: 540, rotate: 5 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatDelay: 2 }}
        >
          <path
            d="M 0 0 L 40 -8 L 40 8 Z"
            fill="rgba(255, 255, 255, 0.8)"
            filter="url(#glow)"
          />
          <path
            d="M 15 0 L 25 -20 L 30 0 Z"
            fill="rgba(255, 255, 255, 0.6)"
          />
          <path
            d="M 20 0 L 25 15 L 28 0 Z"
            fill="rgba(255, 255, 255, 0.6)"
          />
        </motion.g>
      </svg>
    </div>
  );
}
