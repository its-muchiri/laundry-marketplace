'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlassNavbarProps extends React.HTMLAttributes<HTMLElement> {
  condense?: boolean;
}

export function GlassNavbar({
  className,
  condense = true,
  children,
  ...props
}: GlassNavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'glass-panel sticky top-0 z-50 shadow-glass',
        className
      )}
      data-scrolled={scrolled || undefined}
      {...props}
    >
      <div
        className={cn(
          'transition-all duration-normal',
          condense && scrolled && 'scale-[0.98]'
        )}
      >
        {children}
      </div>
    </header>
  );
}
