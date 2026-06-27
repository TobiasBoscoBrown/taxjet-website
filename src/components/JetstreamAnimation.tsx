'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface Jet {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  rotation: number;
  opacity: number;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

export default function JetstreamAnimation() {
  const [jets, setJets] = useState<Jet[]>([]);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const jetIdRef = useRef(0);
  const bubbleIdRef = useRef(0);
  const animationFrameRef = useRef<number>();

  // Spawn a new jet periodically
  useEffect(() => {
    const spawnJet = () => {
      const id = jetIdRef.current++;
      
      // Random spawn position off-screen
      const side = Math.floor(Math.random() * 4);
      let startX: number, startY: number;

      switch(side) {
        case 0: // top
          startX = Math.random() * 1920;
          startY = -200;
          break;
        case 1: // right
          startX = 2120;
          startY = Math.random() * 1080;
          break;
        case 2: // bottom
          startX = Math.random() * 1920;
          startY = 1280;
          break;
        case 3: // left
          startX = -200;
          startY = Math.random() * 1080;
          break;
        default:
          startX = 0;
          startY = 0;
      }

      // Random target position on opposite side
      const targetSide = (side + 2) % 4;
      let targetX: number, targetY: number;

      switch(targetSide) {
        case 0:
          targetX = Math.random() * 1920;
          targetY = -200;
          break;
        case 1:
          targetX = 2120;
          targetY = Math.random() * 1080;
          break;
        case 2:
          targetX = Math.random() * 1920;
          targetY = 1280;
          break;
        case 3:
          targetX = -200;
          targetY = Math.random() * 1080;
          break;
        default:
          targetX = 0;
          targetY = 0;
      }

      // Calculate rotation to face target
      const angle = Math.atan2(targetY - startY, targetX - startX);
      const rotation = (angle * 180) / Math.PI;

      setJets(prev => [...prev, {
        id,
        x: startX,
        y: startY,
        targetX,
        targetY,
        rotation,
        opacity: 0
      }]);

      // Remove jet after it reaches target
      setTimeout(() => {
        setJets(prev => prev.filter(j => j.id !== id));
      }, 15000);
    };

    // Spawn first jet immediately
    spawnJet();

    // Spawn new jets periodically
    const interval = setInterval(spawnJet, 8000);
    return () => clearInterval(interval);
  }, []);

  // Animation loop for jets and bubbles
  useEffect(() => {
    const animate = () => {
      const now = Date.now();

      // Update jet positions
      setJets(prev => prev.map(jet => {
        const dx = jet.targetX - jet.x;
        const dy = jet.targetY - jet.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = 0.8; // Slow speed

        if (distance < 10) {
          return jet;
        }

        const newX = jet.x + (dx / distance) * speed;
        const newY = jet.y + (dy / distance) * speed;

        // Emit bubbles behind jet
        if (Math.random() < 0.3) {
          const angle = Math.atan2(dy, dx) + Math.PI + (Math.random() - 0.5) * 0.5;
          const bubbleSpeed = 0.5 + Math.random() * 0.5;
          setBubbles(prev => [...prev, {
            id: bubbleIdRef.current++,
            x: newX - Math.cos(angle) * 50,
            y: newY - Math.sin(angle) * 50,
            vx: Math.cos(angle) * bubbleSpeed,
            vy: Math.sin(angle) * bubbleSpeed,
            life: 1,
            size: 3 + Math.random() * 5
          }]);
        }

        return {
          ...jet,
          x: newX,
          y: newY,
          opacity: Math.min(jet.opacity + 0.01, 0.7)
        };
      }));

      // Update bubbles
      setBubbles(prev => prev
        .map(bubble => ({
          ...bubble,
          x: bubble.x + bubble.vx,
          y: bubble.y + bubble.vy,
          life: bubble.life - 0.008,
          size: bubble.size + 0.1
        }))
        .filter(bubble => bubble.life > 0)
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="bubbleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="jetGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Bubbles */}
        {bubbles.map(bubble => (
          <circle
            key={bubble.id}
            cx={bubble.x}
            cy={bubble.y}
            r={bubble.size}
            fill={`rgba(147, 197, 253, ${bubble.life * 0.3})`}
            filter="url(#bubbleGlow)"
          />
        ))}

        {/* Jets */}
        {jets.map(jet => (
          <g key={jet.id} transform={`translate(${jet.x}, ${jet.y}) rotate(${jet.rotation})`}>
            <image
              href="/jet.png"
              width="200"
              height="100"
              x="-100"
              y="-50"
              opacity={jet.opacity}
              filter="url(#jetGlow)"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
