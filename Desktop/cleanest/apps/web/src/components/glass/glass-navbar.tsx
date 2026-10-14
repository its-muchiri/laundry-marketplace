'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { brand } from '@/lib/brand';
import { MobileMenu } from '@/components/layout/mobile-menu';
import { CommandPalette } from '@/components/layout/command-palette';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface GlassNavbarProps {
  children?: ReactNode;
}

export function GlassNavbar({ children }: GlassNavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (children) {
    return (
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-normal',
          scrolled
            ? 'glass rounded-none border-x-0 border-t-0 shadow-none'
            : 'bg-transparent'
        )}
      >
        {children}
      </header>
    );
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-normal',
        scrolled
          ? 'glass rounded-none border-x-0 border-t-0 shadow-none'
          : 'bg-transparent'
      )}
    >
      <nav
        aria-label="Main navigation"
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 transition-all duration-normal',
          scrolled ? 'h-14' : 'h-20'
        )}
      >
        <Link href="/" className="flex items-center gap-3">
          <span className="relative h-8 w-8 overflow-hidden rounded-editorial">
            <Image
              src={brand.logo}
              alt={`${brand.name} logo`}
              fill
              className="object-cover"
            />
          </span>
          <span className="display-tight text-xl tracking-tight text-on-dark">
            {brand.name}
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/providers"
            className="link-underline label-mono text-on-dark-muted hover:text-on-dark"
          >
            {brand.nav.providers}
          </Link>
          <Link
            href="/how-it-works"
            className="link-underline label-mono text-on-dark-muted hover:text-on-dark"
          >
            {brand.nav.howItWorks}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <CommandPalette />
          <ThemeToggle className="hidden md:inline-flex" />
          <Link
            href="/login"
            className="btn-ghost hidden py-2 text-sm md:inline-flex"
          >
            {brand.nav.login}
          </Link>
          <Link
            href="/signup"
            className="btn-primary hidden py-2 text-sm md:inline-flex"
          >
            {brand.nav.signup}
          </Link>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}