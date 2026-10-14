'use client';

import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowOrbsProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export function GlowOrbs({ className, variant = 'dark' }: GlowOrbsProps) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <span
        className={cn(
          'orb absolute -top-1/4 -left-1/4 h-[70vmax] w-[70vmax] rounded-full',
          !reduce && 'animate-orb-drift'
        )}
        style={{
          background:
            variant === 'dark'
              ? 'radial-gradient(circle at center, rgba(200,169,106,.20) 0%, transparent 62%)'
              : 'radial-gradient(circle at center, rgba(200,169,106,.26) 0%, transparent 62%)',
          ['--orb-duration' as string]: '52s',
        }}
      />
      <span
        className={cn(
          'orb absolute top-1/4 -right-1/4 h-[60vmax] w-[60vmax] rounded-full',
          !reduce && 'animate-orb-drift'
        )}
        style={{
          background:
            variant === 'dark'
              ? 'radial-gradient(circle at center, rgba(127,181,174,.14) 0%, transparent 60%)'
              : 'radial-gradient(circle at center, rgba(127,181,174,.20) 0%, transparent 60%)',
          ['--orb-duration' as string]: '38s',
        }}
      />
      <span
        className={cn(
          'orb absolute bottom-[-20%] left-[15%] h-[55vmax] w-[55vmax] rounded-full',
          !reduce && 'animate-orb-drift'
        )}
        style={{
          background:
            variant === 'dark'
              ? 'radial-gradient(circle at center, rgba(58,90,160,.22) 0%, transparent 60%)'
              : 'radial-gradient(circle at center, rgba(200,169,106,.16) 0%, transparent 60%)',
          ['--orb-duration' as string]: '60s',
        }}
      />
    </div>
  );
}
