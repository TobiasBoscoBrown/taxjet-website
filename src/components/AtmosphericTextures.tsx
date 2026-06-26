'use client';

import { motion } from 'framer-motion';

export default function AtmosphericTextures() {
  return (
    <div className="document-overlay">
      {/* IRS Form 1040 - realistic tax form document */}
      <motion.div
        className="absolute top-[8%] left-[3%] w-72 h-96 border border-white/20 bg-white/[0.03] rotate-[-12deg]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="p-5 space-y-3">
          <div className="text-white/30 text-xs font-mono tracking-widest mb-4">FORM 1040</div>
          <div className="h-3 bg-white/30 w-1/2"></div>
          <div className="h-2 bg-white/20 w-3/4"></div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-8 border border-white/20"></div>
            <div className="h-8 border border-white/20"></div>
          </div>
          <div className="h-2 bg-white/20 w-full"></div>
          <div className="h-2 bg-white/20 w-2/3"></div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="h-6 border border-white/20"></div>
            <div className="h-6 border border-white/20"></div>
            <div className="h-6 border border-white/20"></div>
          </div>
          <div className="h-2 bg-white/20 w-full mt-4"></div>
          <div className="h-2 bg-white/20 w-1/2"></div>
        </div>
      </motion.div>

      {/* Passport stamp - realistic circular stamp */}
      <motion.div
        className="absolute top-[25%] right-[8%] w-36 h-36 border-4 border-dashed border-white/25 rounded-full rotate-[15deg] bg-white/[0.03]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-white/40 text-[10px] font-bold tracking-widest uppercase">Immigration</div>
          <div className="text-white/30 text-xs font-bold tracking-widest mt-1">ENTRY</div>
          <div className="text-white/20 text-[8px] font-mono mt-2">JFK 2024</div>
        </div>
      </motion.div>

      {/* Country codes - realistic flight/boarding texture */}
      <motion.div
        className="absolute bottom-[18%] left-[10%] space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 0.6 }}
      >
        <div className="text-white/30 text-xs font-mono tracking-widest">DEPARTURES</div>
        <div className="text-white/25 text-sm font-mono">+1 USA  JFK</div>
        <div className="text-white/25 text-sm font-mono">+44 GBR LHR</div>
        <div className="text-white/25 text-sm font-mono">+33 FRA CDG</div>
        <div className="text-white/25 text-sm font-mono">+49 DEU FRA</div>
        <div className="text-white/25 text-sm font-mono">+81 JPN NRT</div>
      </motion.div>

      {/* FBAR form - realistic foreign account report */}
      <motion.div
        className="absolute bottom-[12%] right-[15%] w-56 h-72 border border-white/20 bg-white/[0.03] rotate-[6deg]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 2, delay: 0.9 }}
      >
        <div className="p-5 space-y-3">
          <div className="text-white/30 text-xs font-mono tracking-widest mb-4">FINCEN 114</div>
          <div className="h-2 bg-white/20 w-full"></div>
          <div className="h-2 bg-white/20 w-2/3"></div>
          <div className="h-8 border border-white/20 mt-4"></div>
          <div className="h-2 bg-white/20 w-3/4"></div>
          <div className="h-2 bg-white/20 w-1/2"></div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="h-6 border border-white/20"></div>
            <div className="h-6 border border-white/20"></div>
          </div>
          <div className="h-2 bg-white/20 w-full mt-4"></div>
        </div>
      </motion.div>

      {/* Visa stamp texture */}
      <motion.div
        className="absolute top-[55%] left-[20%] w-28 h-20 border-2 border-white/20 rotate-[-8deg] bg-white/[0.03]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 2, delay: 1.2 }}
      >
        <div className="p-3 space-y-1">
          <div className="text-white/30 text-[8px] font-mono tracking-widest">VISA</div>
          <div className="h-1 bg-white/20 w-3/4"></div>
          <div className="h-1 bg-white/20 w-1/2"></div>
          <div className="h-1 bg-white/20 w-2/3"></div>
        </div>
      </motion.div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px'
      }} />
    </div>
  );
}
