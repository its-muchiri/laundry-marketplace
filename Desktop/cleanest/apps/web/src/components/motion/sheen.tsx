'use client';

import { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SheenProps {
  className?: string;
  variant?: 'ambient' | 'cursor';
  intensity?: number;
}

export function Sheen({ className, variant = 'ambient', intensity = 0.18 }: SheenProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  if (reduce) return null;

  if (variant === 'cursor') {
    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    return (
      <div
        ref={ref}
        onPointerMove={onPointerMove}
        className={cn('relative overflow-hidden', className)}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-normal"
          style={
            position
              ? {
                  opacity: 1,
                  background: `radial-gradient(280px circle at ${position.x}px ${position.y}px, rgba(255,255,255,${intensity}), transparent 65%)`,
                }
              : { opacity: 0 }
          }
        />
      </div>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        'ambient-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3',
        'animate-shimmer',
        className
      )}
      style={{
        background:
          'linear-gradient(90deg, transparent, rgba(255,255,255,.10), transparent)',
        opacity: intensity,
      }}
    />
  );
}

export function AmbientSheen({ className, intensity = 0.1 }: SheenProps) {
  return <Sheen className={className} variant="ambient" intensity={intensity} />;
}

export function CursorSheen({ className, intensity = 0.18 }: SheenProps) {
  return <Sheen className={className} variant="cursor" intensity={intensity} />;
}