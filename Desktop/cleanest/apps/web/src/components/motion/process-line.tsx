'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import {
  m,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProcessLineProps {
  children: ReactNode;
  className?: string;
}

export function ProcessLine({ children, className }: ProcessLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-[13px] top-0 w-px bg-[var(--hairline-light)]"
      />
      <m.span
        aria-hidden="true"
        className="absolute bottom-0 left-[13px] top-0 w-px bg-champagne"
        style={reduce ? undefined : { scaleY }}
      />
      {children}
    </div>
  );
}

interface ProcessStepProps {
  index: string;
  title: string;
  description: string;
  className?: string;
}

export function ProcessStep({
  index,
  title,
  description,
  className,
}: ProcessStepProps) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40%' });
  const reduce = useReducedMotion();

  return (
    <li ref={ref} className={cn('relative flex gap-6 pb-14 last:pb-0', className)}>
      <span
        aria-hidden="true"
        className={cn(
          'relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] transition-colors duration-slow',
          inView
            ? 'border-champagne bg-champagne text-ink'
            : 'border-[var(--hairline-light)] bg-ivory text-on-light-muted'
        )}
      >
        {index}
      </span>
      <div className="pt-0.5">
        <p
          className={cn(
            'label-mono mb-2 transition-colors duration-slow',
            inView ? 'text-champagne' : 'text-on-light-muted'
          )}
        >
          Step {index}
        </p>
        <h3
          className={cn(
            'display-tight text-3xl tracking-tight transition-colors duration-slow',
            inView ? 'text-on-light' : 'text-on-light-muted'
          )}
        >
          {title}
        </h3>
        <p className="mt-2 max-w-md text-on-light-muted">
          {description}
        </p>
      </div>
      {!reduce && inView && (
        <m.span
          aria-hidden="true"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="absolute -left-1.5 top-1.5 h-10 w-10 rounded-full border border-champagne/40"
        />
      )}
    </li>
  );
}
