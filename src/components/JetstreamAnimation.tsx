'use client';

import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface Jet {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  rotation: number;
  opacity: number;
  phase: 'fade-in' | 'flying' | 'fade-out';
  progress: number;
}

interface StreamParticle {
  id: number;
  x: number;
  y: number;
  life: number;
  size: number;
  opacity: number;
}

export default function JetstreamAnimation() {
  const [jets, setJets] = useState<Jet[]>([]);
  const [streamParticles, setStreamParticles] = useState<StreamParticle[]>([]);
  const jetIdRef = useRef(0);
  const particleIdRef = useRef(0);
  const animationFrameRef = useRef<number>();

  // Spawn a new jet periodically (only 1 at a time)
  useEffect(() => {
    const spawnJet = () => {
      setJets(prev => {
        if (prev.length > 0) return prev;

        const id = jetIdRef.current++;

        // Random spawn position off-screen (left or right for horizontal crossing)
        const fromLeft = Math.random() > 0.5;
        let startX: number, startY: number, targetX: number, targetY: number;

        if (fromLeft) {
          startX = -400;
          startY = 300 + Math.random() * 480;
          targetX = 2320;
          targetY = startY;
        } else {
          startX = 2320;
          startY = 300 + Math.random() * 480;
          targetX = -400;
          targetY = startY;
        }

        const angle = Math.atan2(targetY - startY, targetX - startX);
        const rotation = (angle * 180) / Math.PI + 90;

        const newJet: Jet = {
          id,
          x: startX,
          y: startY,
          targetX,
          targetY,
          rotation,
          opacity: 0,
          phase: 'fade-in',
          progress: 0
        };

        return [newJet];
      });
    };

    spawnJet();
    return () => {};
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setJets(prev => prev.map(jet => {
        const dx = jet.targetX - jet.x;
        const dy = jet.targetY - jet.y;
        const totalDistance = Math.sqrt(
          Math.pow(jet.targetX - (jet.targetX > jet.x ? -400 : 2320), 2) +
          Math.pow(jet.targetY - jet.y, 2)
        );
        const currentDistance = Math.sqrt(dx * dx + dy * dy);
        const progress = 1 - (currentDistance / totalDistance);

        let newOpacity = jet.opacity;
        let newPhase = jet.phase;
        let speed = 1.2;

        // Fade in at start
        if (jet.phase === 'fade-in') {
          newOpacity = Math.min(jet.opacity + 0.008, 0.6);
          if (newOpacity >= 0.6) {
            newPhase = 'flying';
          }
        }
        // Fade out near end
        else if (jet.phase === 'flying' && progress > 0.85) {
          newPhase = 'fade-out';
        }
        else if (jet.phase === 'fade-out') {
          newOpacity = Math.max(jet.opacity - 0.01, 0);
          speed = 0.8;
        }

        // Emit stream particles continuously from behind the jet
        if (jet.phase !== 'fade-out' || newOpacity > 0.1) {
          const emitCount = 4;
          const direction = jet.targetX > jet.x ? -1 : 1;
          for (let i = 0; i < emitCount; i++) {
            const spread = (Math.random() - 0.5) * 20;
            const offset = 60 + Math.random() * 40;
            setStreamParticles(prev => [...prev, {
              id: particleIdRef.current++,
              x: jet.x + (direction * offset) + spread,
              y: jet.y + spread,
              life: 1,
              size: 3 + Math.random() * 5,
              opacity: 0.18
            }]);
          }
        }

        // Check if jet should be removed
        if (newOpacity <= 0 && jet.phase === 'fade-out') {
          setTimeout(() => {
            setJets(prev => prev.filter(j => j.id !== jet.id));
            setTimeout(() => {
              setJets(prev => {
                if (prev.length === 0) {
                  const id = jetIdRef.current++;
                  const fromLeft = Math.random() > 0.5;
                  let startX: number, startY: number, targetX: number, targetY: number;

                  if (fromLeft) {
                    startX = -400;
                    startY = 300 + Math.random() * 480;
                    targetX = 2320;
                    targetY = startY;
                  } else {
                    startX = 2320;
                    startY = 300 + Math.random() * 480;
                    targetX = -400;
                    targetY = startY;
                  }

                  const angle = Math.atan2(targetY - startY, targetX - startX);
                  const rotation = (angle * 180) / Math.PI + 90;

                  return [...prev, {
                    id,
                    x: startX,
                    y: startY,
                    targetX,
                    targetY,
                    rotation,
                    opacity: 0,
                    phase: 'fade-in' as const,
                    progress: 0
                  }];
                }
                return prev;
              });
            }, 2000);
          }, 100);
          return jet;
        }

        const newX = jet.x + (dx / currentDistance) * speed;
        const newY = jet.y + (dy / currentDistance) * speed;

        return {
          ...jet,
          x: newX,
          y: newY,
          opacity: newOpacity,
          phase: newPhase,
          progress
        };
      }));

      // Update stream particles
      setStreamParticles(prev => prev
        .map(particle => ({
          ...particle,
          life: particle.life - 0.005,
          size: particle.size + 0.12,
          opacity: particle.opacity * 0.994
        }))
        .filter(particle => particle.life > 0)
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
          <filter id="streamGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="jetGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Stream particles */}
        {streamParticles.map(particle => (
          <circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={`rgba(150, 180, 220, ${particle.opacity})`}
            filter="url(#streamGlow)"
          />
        ))}

        {/* Jets */}
        {jets.map(jet => (
          <g key={jet.id} transform={`translate(${jet.x}, ${jet.y}) rotate(${jet.rotation})`}>
            <image
              href="/jet.png"
              width="180"
              height="90"
              x="-90"
              y="-45"
              opacity={jet.opacity}
              filter="url(#jetGlow)"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
