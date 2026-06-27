'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface Jet {
  id: number;
  x: number;
  y: number;
  direction: number; // 1 for right, -1 for left
  targetY: number;
  opacity: number;
}

export default function JetstreamAnimation() {
  const { scrollYProgress } = useScroll();
  const timeRef = useRef(0);
  const animationFrameRef = useRef<number>();
  const [jet, setJet] = useState<Jet>({
    id: 0,
    x: -400,
    y: 400,
    direction: 1,
    targetY: 400,
    opacity: 0
  });

  // Jet scroll response offsets
  const scrollOffsetX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 80]), { stiffness: 50, damping: 20 });
  const scrollOffsetY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -40]), { stiffness: 50, damping: 20 });

  // Stream path that flows continuously
  const streamPath = useRef('');
  const streamPhase = useRef(0);

  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.016;
      streamPhase.current = (timeRef.current * 0.5) % (Math.PI * 2);

      // Generate flowing stream path behind the jet
      const baseY = 540;
      const amplitude = 25;
      const frequency = 0.002;
      
      let path = 'M -200 ' + baseY;
      for (let x = -200; x <= 2200; x += 50) {
        const y = baseY + Math.sin(x * frequency + streamPhase.current) * amplitude + Math.sin(x * frequency * 2 + streamPhase.current * 1.5) * (amplitude * 0.5);
        path += ` L ${x} ${y}`;
      }
      streamPath.current = path;

      // Update jet position
      setJet(prev => {
        let newX = prev.x + prev.direction * 1.2;
        let newDirection = prev.direction;
        let newY = prev.y + (prev.targetY - prev.y) * 0.02;
        let newOpacity = Math.min(prev.opacity + 0.005, 0.8);
        let newTargetY = prev.targetY;

        // When jet reaches edge, flip direction and change target Y
        if (newX > 2200) {
          newDirection = -1;
          newTargetY = 300 + Math.random() * 480;
        } else if (newX < -300) {
          newDirection = 1;
          newTargetY = 300 + Math.random() * 480;
        }

        return {
          ...prev,
          x: newX,
          y: newY,
          direction: newDirection,
          targetY: newTargetY,
          opacity: newOpacity
        };
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="streamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
            <stop offset="15%" stopColor="rgba(59, 130, 246, 0.15)" />
            <stop offset="40%" stopColor="rgba(147, 197, 253, 0.25)" />
            <stop offset="65%" stopColor="rgba(59, 130, 246, 0.18)" />
            <stop offset="85%" stopColor="rgba(59, 130, 246, 0.08)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>

          <linearGradient id="coreStreamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="30%" stopColor="rgba(255, 255, 255, 0.1)" />
            <stop offset="55%" stopColor="rgba(255, 255, 255, 0.15)" />
            <stop offset="80%" stopColor="rgba(255, 255, 255, 0.08)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>

          <filter id="streamGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="15" result="blur"/>
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

          <filter id="ambientGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="20" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Ambient background glow */}
        <ellipse
          cx="960"
          cy="540"
          rx="600"
          ry="300"
          fill="rgba(59, 130, 246, 0.03)"
          filter="url(#ambientGlow)"
        />

        {/* Continuous flowing stream */}
        <motion.path
          d={streamPath.current}
          stroke="url(#streamGradient)"
          strokeWidth="120"
          fill="none"
          filter="url(#streamGlow)"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 3 }}
        />

        <motion.path
          d={streamPath.current}
          stroke="url(#coreStreamGradient)"
          strokeWidth="50"
          fill="none"
          filter="url(#streamGlow)"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 3, delay: 0.5 }}
        />

        {/* Jet with scroll response and direction-based flip */}
        <motion.g
          style={{ x: scrollOffsetX, y: scrollOffsetY }}
          transform={`translate(${jet.x}, ${jet.y})`}
        >
          <motion.g
            style={{ rotate: -90, scaleX: jet.direction }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: jet.opacity, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <image
              href="/jet.png"
              width="220"
              height="110"
              x="-110"
              y="-55"
              filter="url(#jetGlow)"
            />
          </motion.g>
        </motion.g>

        {/* Floating ambient particles */}
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            cx={200 + Math.random() * 1520}
            cy={200 + Math.random() * 680}
            r={2 + Math.random() * 4}
            fill="rgba(147, 197, 253, 0.1)"
            filter="url(#ambientGlow)"
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </svg>
    </div>
  );
}
