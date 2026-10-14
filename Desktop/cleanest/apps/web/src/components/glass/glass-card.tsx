'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'dark' | 'light';
  sheen?: boolean;
}

export function GlassCard({
  children,
  className,
  variant = 'dark',
  sheen = false,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!sheen || !ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty(
      '--sheen-x',
      `${e.clientX - rect.left}px`
    );
    ref.current.style.setProperty(
      '--sheen-y',
      `${e.clientY - rect.top}px`
    );
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn(
        variant === 'light' ? 'glass-light' : 'glass',
        sheen && 'sheen',
        className
      )}
    >
      {sheen && (
        <span
          aria-hidden="true"
          className="sheen pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-normal"
          style={{
            background:
              'radial-gradient(240px circle at var(--sheen-x, 20%) var(--sheen-y, 20%), rgba(255,255,255,.18), transparent 60%)',
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
