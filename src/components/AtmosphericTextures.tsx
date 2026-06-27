'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

/**
 * Layered atmospheric texture built from REAL documents, drawn as crisp inline
 * SVG (no raster screenshots): a Form 1040 fragment, passport entry stamps, and
 * a column of country dialing / ISO codes. Everything sits at very low opacity
 * in ink, so it reads as paper grain under the content, never as decoration.
 * Pure vector keeps the page fast and razor-sharp at any resolution.
 */

function Form1040() {
  const rows = Array.from({ length: 9 });
  return (
    <svg width="360" height="460" viewBox="0 0 360 460" fill="none" stroke="#16233a">
      <rect x="1" y="1" width="358" height="458" strokeWidth="1.5" />
      <text x="18" y="34" fontFamily="Georgia, serif" fontSize="22" fill="#16233a" stroke="none">
        Form 1040
      </text>
      <text x="18" y="54" fontFamily="monospace" fontSize="11" fill="#16233a" stroke="none">
        U.S. Individual Income Tax Return
      </text>
      <line x1="18" y1="66" x2="342" y2="66" strokeWidth="1" />
      {rows.map((_, i) => (
        <g key={i} transform={`translate(0 ${92 + i * 38})`}>
          <text x="18" y="0" fontFamily="monospace" fontSize="10" fill="#16233a" stroke="none">
            {i + 1}
          </text>
          <line x1="40" y1="4" x2="250" y2="4" strokeWidth="0.75" />
          <rect x="262" y="-14" width="80" height="22" strokeWidth="0.75" />
        </g>
      ))}
    </svg>
  );
}

function PassportStamp({ label, code, date }: { label: string; code: string; date: string }) {
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
      <g stroke="#9A3B3B" transform="rotate(-9 90 90)">
        <circle cx="90" cy="90" r="74" strokeWidth="2" />
        <circle cx="90" cy="90" r="62" strokeWidth="1" strokeDasharray="3 4" />
        <text x="90" y="58" textAnchor="middle" fontFamily="Georgia, serif" fontSize="15" fill="#9A3B3B" stroke="none" letterSpacing="2">
          {label}
        </text>
        <text x="90" y="96" textAnchor="middle" fontFamily="monospace" fontSize="26" fill="#9A3B3B" stroke="none" letterSpacing="3">
          {code}
        </text>
        <line x1="42" y1="108" x2="138" y2="108" strokeWidth="1" />
        <text x="90" y="128" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#9A3B3B" stroke="none" letterSpacing="2">
          {date}
        </text>
      </g>
    </svg>
  );
}

function CountryCodes() {
  const codes = [
    ['UK', '+44', 'GBR'],
    ['JP', '+81', 'JPN'],
    ['AE', '+971', 'ARE'],
    ['DE', '+49', 'DEU'],
    ['SG', '+65', 'SGP'],
    ['AU', '+61', 'AUS'],
    ['FR', '+33', 'FRA'],
    ['CH', '+41', 'CHE'],
  ];
  return (
    <svg width="220" height="320" viewBox="0 0 220 320" fill="none" stroke="#16233a">
      <text x="0" y="16" fontFamily="monospace" fontSize="11" fill="#16233a" stroke="none" letterSpacing="2">
        COUNTRY / DIAL / ISO
      </text>
      <line x1="0" y1="26" x2="220" y2="26" strokeWidth="0.75" />
      {codes.map((c, i) => (
        <g key={i} transform={`translate(0 ${52 + i * 32})`} fill="#16233a" stroke="none" fontFamily="monospace" fontSize="14">
          <text x="0" y="0">{c[0]}</text>
          <text x="70" y="0">{c[1]}</text>
          <text x="160" y="0">{c[2]}</text>
        </g>
      ))}
    </svg>
  );
}

type Layer = {
  el: React.ReactNode;
  className: string;
  depth: number;
  rotate: number;
  opacity: number;
};

const layers: Layer[] = [
  { el: <Form1040 />, className: 'top-[6%] -left-12 w-[360px]', depth: 40, rotate: -5, opacity: 0.05 },
  { el: <PassportStamp label="ARRIVAL" code="LHR" date="06 JUN 2026" />, className: 'top-[12%] right-[6%]', depth: 70, rotate: 0, opacity: 0.10 },
  { el: <CountryCodes />, className: 'top-[44%] left-[4%]', depth: 55, rotate: 0, opacity: 0.06 },
  { el: <PassportStamp label="DEPARTURE" code="NRT" date="21 MAR 2026" />, className: 'bottom-[16%] right-[10%]', depth: 90, rotate: 6, opacity: 0.09 },
  { el: <Form1040 />, className: 'bottom-[-6%] left-[14%] w-[300px]', depth: 30, rotate: 4, opacity: 0.045 },
  { el: <PassportStamp label="ARRIVAL" code="DXB" date="14 JAN 2026" />, className: 'top-[60%] right-[34%]', depth: 60, rotate: -12, opacity: 0.07 },
];

function TextureLayer({ layer, scrollYProgress }: { layer: Layer; scrollYProgress: MotionValue<number> }) {
  const y = useTransform(scrollYProgress, [0, 1], [0, -layer.depth]);
  return (
    <motion.div
      className={`absolute ${layer.className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: layer.opacity }}
      transition={{ duration: 2.2, ease: 'easeOut' }}
      style={{ y, rotate: layer.rotate }}
    >
      {layer.el}
    </motion.div>
  );
}

export default function AtmosphericTextures() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="document-overlay">
      {layers.map((layer, i) => (
        <TextureLayer key={i} layer={layer} scrollYProgress={scrollYProgress} />
      ))}
      {/* faint paper vignette for depth */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, transparent 55%, rgba(22,35,58,0.05) 100%)' }}
      />
    </div>
  );
}
