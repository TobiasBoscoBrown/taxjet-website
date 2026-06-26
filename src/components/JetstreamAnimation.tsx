'use client';

import { motion } from 'framer-motion';

export default function JetstreamAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Multi-layered gradient for beautiful jetstream */}
          <linearGradient id="jetstreamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
            <stop offset="20%" stopColor="rgba(59, 130, 246, 0.1)" />
            <stop offset="50%" stopColor="rgba(147, 197, 253, 0.4)" />
            <stop offset="80%" stopColor="rgba(59, 130, 246, 0.1)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>
          
          <linearGradient id="jetstreamGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.3)" />
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
        
        {/* Primary jetstream - main flow */}
        <motion.path
          d="M -200 540 C 200 480, 600 420, 960 540 S 1720 600, 2120 540"
          stroke="url(#jetstreamGradient)"
          strokeWidth="3"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 4, ease: "easeInOut" }}
          style={{ strokeDasharray: '2000', strokeDashoffset: 0 }}
        />
        
        {/* Secondary jetstream - upper flow */}
        <motion.path
          d="M -200 500 C 200 440, 600 380, 960 500 S 1720 560, 2120 500"
          stroke="url(#jetstreamGlow)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#softGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 5, ease: "easeInOut", delay: 0.3 }}
          style={{ strokeDasharray: '2000', strokeDashoffset: 0 }}
        />

        {/* Tertiary jetstream - lower flow */}
        <motion.path
          d="M -200 580 C 200 520, 600 460, 960 580 S 1720 640, 2120 580"
          stroke="rgba(59, 130, 246, 0.2)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 6, ease: "easeInOut", delay: 0.6 }}
          style={{ strokeDasharray: '2000', strokeDashoffset: 0 }}
        />

        {/* Particle effects along the stream */}
        {[...Array(20)].map((_, i) => (
          <motion.circle
            key={i}
            r={2 + Math.random() * 2}
            fill="rgba(255, 255, 255, 0.3)"
            filter="url(#softGlow)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
              cx: [100 + i * 100, 200 + i * 100],
              cy: [540 + Math.sin(i) * 20, 540 + Math.sin(i + 1) * 20]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Enhanced jet/plane */}
        <motion.g
          initial={{ x: -150, y: 540, rotate: -3 }}
          animate={{ x: 2070, y: 540, rotate: 3 }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatDelay: 3 }}
        >
          {/* Main fuselage */}
          <ellipse
            cx="0" cy="0" rx="60" ry="8"
            fill="rgba(255, 255, 255, 0.9)"
            filter="url(#glow)"
          />
          
          {/* Cockpit */}
          <ellipse
            cx="35" cy="-2" rx="12" ry="5"
            fill="rgba(200, 220, 255, 0.8)"
          />
          
          {/* Wings */}
          <path
            d="M 10 0 L 5 -25 L 30 0 L 5 25 Z"
            fill="rgba(255, 255, 255, 0.7)"
            filter="url(#softGlow)"
          />
          
          {/* Tail */}
          <path
            d="M -45 0 L -55 -15 L -50 0 L -55 15 Z"
            fill="rgba(255, 255, 255, 0.7)"
            filter="url(#softGlow)"
          />
          
          {/* Engine glow */}
          <motion.circle
            cx="-50" cy="0" r="4"
            fill="rgba(147, 197, 253, 0.8)"
            filter="url(#glow)"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.g>
      </svg>
    </div>
  );
}
