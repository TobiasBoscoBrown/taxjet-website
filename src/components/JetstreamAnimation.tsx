'use client';

import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/**
 * The signature moving element: one plane drawing a jetstream contrail across
 * the high-altitude sky, driven entirely by scroll. When the page is still the
 * plane is still; everything else stays cinematic and motionless.
 *
 * Each page visit generates a fresh spawn point and flight path. Once in a while
 * the plane eases through a calm, full loop-de-loop that stays tangent to its
 * line of travel, so it reads as a smooth aerobatic arc rather than a jolt.
 */

const VW = 1920;
const VH = 1080;

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

// A full loop tangent to the direction of travel at point P, so entry and exit
// share the same heading (no cusp). Built in local space then rotated by `ang`.
function tangentLoop(px: number, py: number, ang: number, r: number, dir: number) {
  const k = 0.5523 * r;
  const s = dir; // winds up or down
  // Local circle tangent to the x-axis at the origin, center (0, s*r).
  const local: [number, number][] = [
    [k, 0], [r, s * (r - k)], [r, s * r],
    [r, s * (r + k)], [k, s * 2 * r], [0, s * 2 * r],
    [-k, s * 2 * r], [-r, s * (r + k)], [-r, s * r],
    [-r, s * (r - k)], [-k, 0], [0, 0],
  ];
  const cos = Math.cos((ang * Math.PI) / 180);
  const sin = Math.sin((ang * Math.PI) / 180);
  const pt = ([x, y]: [number, number]) =>
    `${(px + x * cos - y * sin).toFixed(1)} ${(py + x * sin + y * cos).toFixed(1)}`;
  let d = '';
  for (let i = 0; i < local.length; i += 3) {
    d += ` C ${pt(local[i])} ${pt(local[i + 1])} ${pt(local[i + 2])}`;
  }
  return d;
}

function buildFlightPath() {
  const startY = rand(160, 860);
  const endY = rand(120, 820);
  const segments = 4;
  const pts: [number, number][] = [[rand(-280, -160), startY]];
  for (let i = 1; i < segments; i++) {
    const t = i / segments;
    const x = -120 + t * (VW + 240);
    const baseY = startY + (endY - startY) * t;
    pts.push([x, clamp(baseY + rand(-240, 240), 130, 940)]);
  }
  pts.push([rand(VW + 120, VW + 320), endY]);

  // Loop-de-loop is rare: about one visit in six.
  const doLoop = Math.random() < 0.17;
  const loopIndex = doLoop ? 1 + Math.floor(Math.random() * (segments - 1)) : -1;
  const loopR = rand(120, 165); // larger = calmer
  const loopDir = Math.random() < 0.5 ? 1 : -1;

  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)} ${cp2x.toFixed(1)} ${cp2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    if (i + 1 === loopIndex) {
      const ang = (Math.atan2(p3[1] - p1[1], p3[0] - p1[0]) * 180) / Math.PI;
      d += tangentLoop(p2[0], p2[1], ang, loopR, loopDir);
    }
  }
  return d;
}

const DEFAULT_PATH = `M -200 760 C 360 700, 980 540, 2080 220`;

export default function JetstreamAnimation() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  // Gentle spring so the plane glides calmly instead of snapping to scroll.
  const progress = useSpring(scrollYProgress, { stiffness: 48, damping: 24, mass: 0.6 });

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

  // Fresh path on every page visit (mount + route change).
  useEffect(() => {
    setPathD(buildFlightPath());
  }, [pathname]);

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
