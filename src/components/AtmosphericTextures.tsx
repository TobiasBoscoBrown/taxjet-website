'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';

const textures = [
  { src: '/textures/chrome_0wytEPGmmL.png', position: 'top-[5%] left-[-3%]', size: 'w-96 h-96', speed: 0.12, rotate: -6, opacity: 0.04 },
  { src: '/textures/chrome_8Jzbf2QJWe.png', position: 'top-[8%] right-[3%]', size: 'w-80 h-80', speed: 0.18, rotate: 8, opacity: 0.035 },
  { src: '/textures/chrome_DPonTiXsM6.png', position: 'top-[40%] left-[5%]', size: 'w-72 h-72', speed: 0.15, rotate: -12, opacity: 0.04 },
  { src: '/textures/chrome_VIe1a7ua3a.png', position: 'bottom-[12%] right-[8%]', size: 'w-80 h-80', speed: 0.22, rotate: 5, opacity: 0.035 },
  { src: '/textures/chrome_lmSr9fD6at.png', position: 'bottom-[3%] left-[12%]', size: 'w-64 h-64', speed: 0.14, rotate: -8, opacity: 0.035 },
];

function TextureLayer({ texture, index, scrollYProgress }: {
  texture: typeof textures[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const y = useTransform(scrollYProgress, [0, 1], [0, -(texture.speed * 300)]);

  return (
    <motion.div
      className={`absolute ${texture.position} ${texture.size} pointer-events-none`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: texture.opacity, scale: 1 }}
      transition={{ duration: 2.5, delay: index * 0.2 }}
      style={{
        y,
        rotate: texture.rotate,
      }}
    >
      <Image
        src={texture.src}
        alt=""
        fill
        className="object-contain opacity-100"
        style={{ filter: 'grayscale(100%) brightness(1.6) contrast(0.75)' }}
        unoptimized
      />
    </motion.div>
  );
}

export default function AtmosphericTextures() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="document-overlay">
      {textures.map((texture, index) => (
        <TextureLayer
          key={texture.src}
          texture={texture}
          index={index}
          scrollYProgress={scrollYProgress}
        />
      ))}

      {/* Subtle vignette for depth */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
        }}
      />
    </div>
  );
}
