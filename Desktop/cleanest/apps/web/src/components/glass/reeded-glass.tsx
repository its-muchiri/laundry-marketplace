'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ReededGlassProps {
  children: ReactNode;
  className?: string;
  rib?: number;
  ribA?: number;
  blur?: number;
  tint?: 'none' | 'champagne' | 'sage' | 'midnight';
  intensity?: 'subtle' | 'full';
  refract?: boolean;
}

const tints = {
  none: 'transparent',
  champagne:
    'linear-gradient(180deg, rgba(200,169,106,.16), rgba(200,169,106,.04))',
  sage: 'linear-gradient(180deg, rgba(127,181,174,.16), rgba(127,181,174,.04))',
  midnight:
    'linear-gradient(180deg, rgba(19,29,49,.65), rgba(19,29,49,.35))',
};

export function ReededGlass({
  children,
  className,
  rib = 12,
  ribA = 7,
  blur = 22,
  tint = 'none',
  intensity = 'full',
  refract = false,
}: ReededGlassProps) {
  return (
    <div
      className={cn('reeded', refract && 'refract', className)}
      style={
        {
          '--rib': `${rib}px`,
          '--rib-a': `${ribA}px`,
          '--reeded-blur': `${blur}px`,
          '--rib-opacity': intensity === 'subtle' ? 0.55 : 1,
          background: tints[tint],
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
