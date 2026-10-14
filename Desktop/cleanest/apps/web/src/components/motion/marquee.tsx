'use client';

import type { ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  items: string[];
  className?: string;
  duration?: number;
}

export function Marquee({
  items,
  className,
  duration = 40,
}: MarqueeProps) {
  const reduce = useReducedMotion();
  const row = [...items, ...items];

  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
        WebkitMaskImage:
          'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
      }}
    >
      <div
        className={cn(
          'flex w-max items-baseline gap-12 pr-12',
          !reduce &&
            `animate-marquee hover:[animation-play-state:paused]`
        )}
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="display-tight text-2xl italic whitespace-nowrap text-on-dark-muted sm:text-3xl"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
