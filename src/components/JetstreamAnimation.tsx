'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function JetstreamAnimation() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, vx: number, vy: number, life: number }>>([]);
  const particleIdRef = useRef(0);
  const lastEmitRef = useRef(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 25 });

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Emit particles from jet's tail
  useEffect(() => {
    if (!isMounted) return;

    const emitParticle = () => {
      const now = Date.now();
      if (now - lastEmitRef.current > 50) {
        lastEmitRef.current = now;
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 3;
        const mouseXVal = parseFloat(springX.get() as unknown as string) || 960;
        const mouseYVal = parseFloat(springY.get() as unknown as string) || 540;
        setParticles(prev => [...prev, {
          id: particleIdRef.current++,
          x: mouseXVal - 200,
          y: mouseYVal,
          vx: Math.cos(angle) * speed - 3,
          vy: Math.sin(angle) * speed,
          life: 1
        }]);
      }
    };

    const interval = setInterval(emitParticle, 30);
    return () => clearInterval(interval);
  }, [isMounted, springX, springY]);

  // Update particles
  useEffect(() => {
    const updateParticles = () => {
      setParticles(prev => prev
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          life: p.life - 0.02
        }))
        .filter(p => p.life > 0)
      );
    };

    const interval = setInterval(updateParticles, 16);
    return () => clearInterval(interval);
  }, []);

  // Calculate jet position with circling motion around mouse
  const time = useMotionValue(0);
  useEffect(() => {
    const interval = setInterval(() => {
      time.set(Date.now() / 1000);
    }, 16);
    return () => clearInterval(interval);
  }, [time]);

  const circleRadius = 80;
  const circleSpeed = 0.5;
  const jetX = useTransform(time, (t) => {
    const mouseXVal = parseFloat(springX.get() as unknown as string) || 960;
    return mouseXVal + Math.cos(t * circleSpeed) * circleRadius;
  });
  const jetY = useTransform(time, (t) => {
    const mouseYVal = parseFloat(springY.get() as unknown as string) || 540;
    return mouseYVal + Math.sin(t * circleSpeed) * circleRadius;
  });

  // Rotate jet to face direction of movement
  const jetRotate = useTransform(time, (t) => {
    return Math.sin(t * circleSpeed) * 15;
  });

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="streamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
            <stop offset="10%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="35%" stopColor="rgba(147, 197, 253, 0.4)" />
            <stop offset="60%" stopColor="rgba(59, 130, 246, 0.25)" />
            <stop offset="85%" stopColor="rgba(59, 130, 246, 0.1)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>

          <filter id="streamGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="15" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="particleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="jetGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Dynamic wiggling stream with dissipation */}
        <motion.path
          d="M -500 540 C 100 500, 500 480, 960 540 S 1700 600, 2500 540"
          stroke="url(#streamGradient)"
          strokeWidth="150"
          fill="none"
          filter="url(#streamGlow)"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{
            opacity: 0.8,
            pathLength: 1,
            d: [
              "M -500 540 C 100 500, 500 480, 960 540 S 1700 600, 2500 540",
              "M -500 540 C 100 520, 500 500, 960 540 S 1700 580, 2500 540",
              "M -500 540 C 100 480, 500 460, 960 540 S 1700 620, 2500 540",
              "M -500 540 C 100 500, 500 480, 960 540 S 1700 600, 2500 540"
            ]
          }}
          transition={{
            opacity: { duration: 2 },
            pathLength: { duration: 2 },
            d: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        <motion.path
          d="M -500 540 C 100 490, 500 470, 960 540 S 1700 610, 2500 540"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="60"
          fill="none"
          filter="url(#streamGlow)"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{
            opacity: 0.7,
            pathLength: 1,
            d: [
              "M -500 540 C 100 490, 500 470, 960 540 S 1700 610, 2500 540",
              "M -500 540 C 100 510, 500 490, 960 540 S 1700 590, 2500 540",
              "M -500 540 C 100 470, 500 450, 960 540 S 1700 630, 2500 540",
              "M -500 540 C 100 490, 500 470, 960 540 S 1700 610, 2500 540"
            ]
          }}
          transition={{
            opacity: { duration: 2, delay: 0.2 },
            pathLength: { duration: 2, delay: 0.2 },
            d: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
          }}
        />

        {/* Soft particles from jet exhaust */}
        {particles.map(p => (
          <motion.circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r={4 + p.life * 8}
            fill={`rgba(147, 197, 253, ${p.life * 0.4})`}
            filter="url(#particleGlow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: p.life * 0.6 }}
          />
        ))}

        {/* Jet circling around mouse */}
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
