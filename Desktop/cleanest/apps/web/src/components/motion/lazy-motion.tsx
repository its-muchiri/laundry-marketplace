'use client';

import { LazyMotion, m, domAnimation } from 'framer-motion';
import type { ReactNode } from 'react';

export interface MotionProviderProps {
  children: ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

export { m } from 'framer-motion';