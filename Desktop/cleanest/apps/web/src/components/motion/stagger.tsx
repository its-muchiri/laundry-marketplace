'use client';

import type { ReactNode } from 'react';
import { m, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
}

export function Stagger({
  children,
  className,
  staggerChildren = 0.08,
}: StaggerProps) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduce ? 0 : staggerChildren },
        },
      }}
    >
      {children}
    </m.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE },
        },
      }}
    >
      {children}
    </m.div>
  );
}
