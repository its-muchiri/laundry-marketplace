'use client';

import Link from 'next/link';
import Image from 'next/image';
import { brand } from '@/lib/brand';
import { GlassNavbar } from '@/components/glass/glass-navbar';
import { ThemeToggle } from './theme-toggle';
import { MobileMenu } from './mobile-menu';
import { CommandPalette } from './command-palette';

export function SiteHeader() {
  return (
    <GlassNavbar>
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative h-8 w-8 overflow-hidden rounded-lg">
            <Image src={brand.logo} alt={`${brand.name} logo`} fill className="object-cover" />
          </div>
          <span className="text-xl font-bold tracking-tight">{brand.name}</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/providers"
            className="text-foreground-muted hover:text-primary-strong font-medium"
          >
            {brand.nav.providers}
          </Link>
          <Link
            href="/how-it-works"
            className="text-foreground-muted hover:text-primary-strong font-medium"
          >
            {brand.nav.howItWorks}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <CommandPalette />
          <ThemeToggle className="hidden md:inline-flex" />
          <Link href="/login" className="btn-primary hidden md:inline-flex">
            {brand.nav.login}
          </Link>
          <Link href="/signup" className="btn-secondary hidden md:inline-flex">
            {brand.nav.signup}
          </Link>
          <MobileMenu />
        </div>
      </nav>
    </GlassNavbar>
  );
}