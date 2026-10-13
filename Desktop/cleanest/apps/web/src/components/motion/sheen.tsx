'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SheenProps {
  children: ReactNode;
  className?: string;
}

export function Sheen({ children, className }: SheenProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn('group/sheen relative overflow-hidden', className)}
      initial="rest"
      whileHover={reduce ? undefined : 'hover'}
      animate="rest"
      variants={{ rest: { y: 0 }, hover: { y: -4 } }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
      {!reduce && (
        <motion.span
          aria-hidden="true"
          className="sheen-sweep pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          variants={{ rest: { x: '-120%' }, hover: { x: '120%' } }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  );
}
