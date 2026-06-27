'use client';

import { motion } from 'framer-motion';

export default function AtmosphericTextures() {
  return (
    <div className="document-overlay">
      {/* Subtle vignette for depth */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.35) 100%)'
        }}
      />
    </div>
  );
}
