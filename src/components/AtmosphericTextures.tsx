'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';

const textures = [
  { src: '/textures/globe.png', position: 'top-[5%] left-[-3%]', size: 'w-96 h-96', speed: 0.15, rotate: -6, opacity: 0.1, float: { y: [0, -15, 0], duration: 8 } },
  { src: '/textures/irs-forms.png', position: 'top-[8%] right-[3%]', size: 'w-80 h-80', speed: 0.25, rotate: 8, opacity: 0.08, float: { y: [0, 12, 0], duration: 10 } },
  { src: '/textures/passport-stamps.png', position: 'top-[40%] left-[5%]', size: 'w-72 h-72', speed: 0.2, rotate: -12, opacity: 0.1, float: { y: [0, -10, 0], duration: 9 } },
  { src: '/textures/country-codes.png', position: 'bottom-[12%] right-[8%]', size: 'w-80 h-80', speed: 0.3, rotate: 5, opacity: 0.08, float: { y: [0, 14, 0], duration: 11 } },
  { src: '/textures/handwritten-seal.png', position: 'bottom-[3%] left-[12%]', size: 'w-64 h-64', speed: 0.18, rotate: -8, opacity: 0.08, float: { y: [0, -12, 0], duration: 10 } },
  { src: '/textures/jetstream.png', position: 'top-[55%] right-[-5%]', size: 'w-[28rem] h-[28rem]', speed: 0.35, rotate: 15, opacity: 0.06, float: { y: [0, 18, 0], duration: 12 } },
];

function TextureLayer({ texture, index, scrollYProgress }: {
  texture: typeof textures[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -(texture.speed * 400)]);

  return (
    <motion.div
      className={`absolute ${texture.position} ${texture.size} pointer-events-none`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: texture.opacity,
        scale: 1,
        y: texture.float.y,
      }}
      transition={{
        opacity: { duration: 2, delay: index * 0.15 },
        scale: { duration: 2, delay: index * 0.15 },
        y: { duration: texture.float.duration, repeat: Infinity, ease: "easeInOut" }
      }}
      style={{
        y: parallaxY,
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
