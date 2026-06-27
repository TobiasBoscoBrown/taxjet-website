'use client';

import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/**
 * The signature moving element: a single plane drawing a jetstream contrail
 * across the high-altitude sky. It is driven entirely by scroll, so when the
 * page is still, the plane is still. Everything else on the site stays
 * cinematic and motionless. Apple-product-page motion restraint.
 *
 * The flight path climbs from the lower-left up to the upper-right, a quiet
 * metaphor for "navigate foreign income without turbulence."
 */

// Gentle climbing arc across a 1920x1080 sky.
const FLIGHT_PATH =
  'M -120 880 C 360 760, 620 700, 980 540 S 1560 300, 2080 180';

export default function JetstreamAnimation() {
  const { scrollYProgress } = useScroll();
  // Smooth the scroll so the plane glides instead of snapping.
  const progress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    mass: 0.5,
  });

  const pathRef = useRef<SVGPathElement>(null);
  const [plane, setPlane] = useState({ x: -120, y: 880, angle: -28 });

  const place = (p: number) => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const clamped = Math.min(Math.max(p, 0), 1);
    const a = path.getPointAtLength(len * clamped);
    const b = path.getPointAtLength(Math.min(len, len * clamped + 1.2));
    const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    setPlane({ x: a.x, y: a.y, angle });
  };

  useMotionValueEvent(progress, 'change', place);
  useEffect(() => {
    place(0.0001);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 -z-[1] pointer-events-none overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="trail" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(47,95,224,0)" />
            <stop offset="20%" stopColor="rgba(47,95,224,0.10)" />
            <stop offset="70%" stopColor="rgba(47,95,224,0.22)" />
            <stop offset="100%" stopColor="rgba(47,95,224,0.30)" />
          </linearGradient>
          <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="planeShadow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#16233a" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Hidden measuring path */}
        <path ref={pathRef} d={FLIGHT_PATH} fill="none" stroke="none" />

        {/* Soft jetstream halo */}
        <motion.path
          d={FLIGHT_PATH}
          fill="none"
          stroke="rgba(47,95,224,0.10)"
          strokeWidth={22}
          strokeLinecap="round"
          filter="url(#soft)"
          style={{ pathLength: progress }}
        />
        {/* Crisp contrail core */}
        <motion.path
          d={FLIGHT_PATH}
          fill="none"
          stroke="url(#trail)"
          strokeWidth={3}
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />

        {/* The plane — a clean paper-plane silhouette at the leading edge */}
        <g
          transform={`translate(${plane.x} ${plane.y}) rotate(${plane.angle})`}
          filter="url(#planeShadow)"
        >
          <path d="M34 0 L-22 -17 L-5 0 Z" fill="#16233a" />
          <path d="M34 0 L-22 17 L-5 0 Z" fill="#2a3c5c" />
          <path d="M-5 0 L-22 17 L-13 0 Z" fill="#0f1828" />
        </g>
      </svg>
    </div>
  );
}
