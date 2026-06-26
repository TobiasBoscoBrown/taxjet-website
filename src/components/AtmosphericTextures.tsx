'use client';

import { motion } from 'framer-motion';

export default function AtmosphericTextures() {
  return (
    <div className="document-overlay">
      {/* IRS Form 1040 texture */}
      <motion.div
        className="absolute top-[10%] left-[5%] w-64 h-80 border border-white/10 rotate-[-15deg]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.02, scale: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="p-4 space-y-2">
          <div className="h-2 bg-white/20 w-3/4"></div>
          <div className="h-2 bg-white/20 w-1/2"></div>
          <div className="h-2 bg-white/20 w-2/3"></div>
          <div className="h-2 bg-white/20 w-1/3"></div>
          <div className="h-2 bg-white/20 w-3/4"></div>
          <div className="h-2 bg-white/20 w-1/2"></div>
        </div>
      </motion.div>

      {/* Passport stamp texture */}
      <motion.div
        className="absolute top-[30%] right-[10%] w-32 h-32 border-4 border-white/10 rounded-full rotate-[12deg]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.02, scale: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/20 text-xs font-bold tracking-widest rotate-[-45deg]">
            ENTRY
          </div>
        </div>
      </motion.div>

      {/* Country codes texture */}
      <motion.div
        className="absolute bottom-[20%] left-[15%] space-y-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.02 }}
        transition={{ duration: 2, delay: 0.6 }}
      >
        <div className="text-white/20 text-sm font-mono">+1 USA</div>
        <div className="text-white/20 text-sm font-mono">+44 GBR</div>
        <div className="text-white/20 text-sm font-mono">+33 FRA</div>
        <div className="text-white/20 text-sm font-mono">+49 DEU</div>
        <div className="text-white/20 text-sm font-mono">+81 JPN</div>
      </motion.div>

      {/* FBAR form texture */}
      <motion.div
        className="absolute bottom-[15%] right-[20%] w-48 h-64 border border-white/10 rotate-[8deg]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.02, scale: 1 }}
        transition={{ duration: 2, delay: 0.9 }}
      >
        <div className="p-3 space-y-2">
          <div className="h-2 bg-white/20 w-full"></div>
          <div className="h-2 bg-white/20 w-2/3"></div>
          <div className="h-2 bg-white/20 w-3/4"></div>
          <div className="h-2 bg-white/20 w-1/2"></div>
        </div>
      </motion.div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.01]" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px'
      }} />
    </div>
  );
}
