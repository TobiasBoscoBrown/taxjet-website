'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function JetstreamAnimation() {
  const { scrollYProgress } = useScroll();

  // Jet flies across the screen
  const jetX = useTransform(scrollYProgress, [0, 1], [-400, 2320]);
  const jetY = useTransform(scrollYProgress, [0, 0.5, 1], [650, 500, 550]);

  // Subtle rotation as it flies
  const jetRotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [-3, 4, -2, 3, -1]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="jetGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Huge jet flying across */}
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
