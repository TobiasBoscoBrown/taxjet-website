'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function AtmosphericTextures() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div className="document-overlay">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{ y }}
      >
        <Image
          src="/textures/atmospheric-composite.png"
          alt=""
          fill
          className="object-cover opacity-100"
          style={{ filter: 'grayscale(100%) brightness(1.4) contrast(0.7)' }}
          unoptimized
        />
      </motion.div>

      {/* Soft darkening overlay */}
      <div className="absolute inset-0 pointer-events-none bg-black/50" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)'
      }} />
    </div>
  );
}
