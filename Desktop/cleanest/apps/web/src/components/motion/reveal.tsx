'use client';

import type { ReactNode } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

interface LineRevealProps {
  children: ReactNode[];
  stagger?: number;
  className?: string;
}

export function LineReveal({
  children,
  stagger = 0.12,
  className,
}: LineRevealProps) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {children.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-1">
          <m.span
            className="block"
            initial={{ y: reduce ? 0 : '112%' }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.9,
              delay: i * stagger,
              ease: EASE,
            }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </span>
  );
}

interface ClipRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function ClipReveal({ children, delay = 0, className }: ClipRevealProps) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={cn('overflow-hidden', className)}
      initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

interface RuleProps {
  className?: string;
  light?: boolean;
  delay?: number;
}

export function Rule({ className, light = false, delay = 0 }: RuleProps) {
  const reduce = useReducedMotion();
  return (
    <m.span
      aria-hidden="true"
      className={cn(
        'block h-px w-full',
        light ? 'bg-[var(--hairline-light)]' : 'bg-[var(--hairline-dark)]',
        className
      )}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      style={{ originX: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    />
  );
}
