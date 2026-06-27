'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';

const textures = [
  { src: '/textures/globe.png', position: 'top-[5%] left-[-5%]', size: 'w-80 h-80', speed: 0.15, rotate: -6, opacity: 0.06 },
  { src: '/textures/irs-forms.png', position: 'top-[10%] right-[5%]', size: 'w-72 h-72', speed: 0.25, rotate: 8, opacity: 0.05 },
  { src: '/textures/passport-stamps.png', position: 'top-[45%] left-[8%]', size: 'w-64 h-64', speed: 0.2, rotate: -12, opacity: 0.06 },
  { src: '/textures/country-codes.png', position: 'bottom-[15%] right-[10%]', size: 'w-72 h-72', speed: 0.3, rotate: 5, opacity: 0.05 },
  { src: '/textures/handwritten-seal.png', position: 'bottom-[5%] left-[15%]', size: 'w-56 h-56', speed: 0.18, rotate: -8, opacity: 0.05 },
  { src: '/textures/jetstream.png', position: 'top-[60%] right-[-10%]', size: 'w-96 h-96', speed: 0.35, rotate: 15, opacity: 0.04 },
];

function TextureLayer({ texture, index, scrollYProgress }: {
  texture: typeof textures[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const y = useTransform(scrollYProgress, [0, 1], [0, -(texture.speed * 400)]);

  return (
    <motion.div
      className={`absolute ${texture.position} ${texture.size} pointer-events-none`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: texture.opacity, scale: 1 }}
      transition={{ duration: 2, delay: index * 0.15 }}
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
        style={{ filter: 'grayscale(100%) brightness(1.5) contrast(0.8)' }}
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

      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
      }} />
    </div>
  );
}
