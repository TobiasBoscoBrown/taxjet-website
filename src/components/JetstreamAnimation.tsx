'use client';

import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/**
 * The signature moving element: one plane drawing a jetstream contrail across
 * the high-altitude sky, driven entirely by scroll. When the page is still, the
 * plane is still; everything else stays cinematic and motionless.
 *
 * Each load generates a fresh spawn point and flight path, and now and then the
 * plane pulls a full loop-de-loop somewhere along the way.
 */

const VW = 1920;
const VH = 1080;

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

// A full circular loop that starts and ends at (cx, cy + r), so the path can
// continue cleanly afterward. k is the cubic-bezier circle constant.
function loopDeLoop(cx: number, cy: number, r: number, dir: number) {
  const k = 0.5523 * r;
  const s = dir; // 1 or -1 -> loop winds one way or the other
  return [
    `C ${cx - s * k} ${cy + r} ${cx - s * r} ${cy + k} ${cx - s * r} ${cy}`,
    `C ${cx - s * r} ${cy - k} ${cx - s * k} ${cy - r} ${cx} ${cy - r}`,
    `C ${cx + s * k} ${cy - r} ${cx + s * r} ${cy - k} ${cx + s * r} ${cy}`,
    `C ${cx + s * r} ${cy + k} ${cx + s * k} ${cy + r} ${cx} ${cy + r}`,
  ].join(' ');
}

// Smooth Catmull-Rom path through waypoints, with an optional loop spliced in.
function buildFlightPath() {
  const startY = rand(160, 860);
  const endY = rand(120, 820);
  const segments = 4;
  const pts: [number, number][] = [[rand(-280, -160), startY]];
  for (let i = 1; i < segments; i++) {
    const t = i / segments;
    const x = -120 + t * (VW + 240);
    const baseY = startY + (endY - startY) * t;
    pts.push([x, clamp(baseY + rand(-260, 260), 110, 960)]);
  }
  pts.push([rand(VW + 120, VW + 320), endY]);

  // 55% of loads get a loop, at one of the interior waypoints.
  const doLoop = Math.random() < 0.55;
  const loopIndex = doLoop ? 1 + Math.floor(Math.random() * (segments - 1)) : -1;
  const loopR = rand(60, 100);
  const loopDir = Math.random() < 0.5 ? 1 : -1;

  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2[0]} ${p2[1]}`;
    if (i + 1 === loopIndex) {
      d += ' ' + loopDeLoop(p2[0], p2[1], loopR, loopDir);
    }
  }
  return d;
}

const DEFAULT_PATH = `M -200 760 C 360 700, 980 540, 2080 220`;

export default function JetstreamAnimation() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 22, mass: 0.5 });

  const pathRef = useRef<SVGPathElement>(null);
  const [pathD, setPathD] = useState(DEFAULT_PATH);
  const [plane, setPlane] = useState({ x: -200, y: 760, angle: -24 });

  const place = (p: number) => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    if (!len) return;
    const c = clamp(p, 0, 1);
    const a = path.getPointAtLength(len * c);
    const b = path.getPointAtLength(Math.min(len, len * c + 1.2));
    const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    setPlane({ x: a.x, y: a.y, angle });
  };

  // Randomize the flight path on the client only (avoids hydration mismatch).
  useEffect(() => {
    setPathD(buildFlightPath());
  }, []);

  // Re-measure whenever the path changes.
  useEffect(() => {
    place(progress.get() || 0.0001);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathD]);

  useMotionValueEvent(progress, 'change', place);

  return (
    <div className="fixed inset-0 -z-[1] pointer-events-none overflow-hidden">
      <svg className="w-full h-full" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
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

        <path ref={pathRef} d={pathD} fill="none" stroke="none" />

        <motion.path
          d={pathD}
          fill="none"
          stroke="rgba(47,95,224,0.10)"
          strokeWidth={22}
          strokeLinecap="round"
          filter="url(#soft)"
          style={{ pathLength: progress }}
        />
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#trail)"
          strokeWidth={3}
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />

        <g transform={`translate(${plane.x} ${plane.y}) rotate(${plane.angle})`} filter="url(#planeShadow)">
          <path d="M34 0 L-22 -17 L-5 0 Z" fill="#16233a" />
          <path d="M34 0 L-22 17 L-5 0 Z" fill="#2a3c5c" />
          <path d="M-5 0 L-22 17 L-13 0 Z" fill="#0f1828" />
        </g>
      </svg>
    </div>
  );
}
