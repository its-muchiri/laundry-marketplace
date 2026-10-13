'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { brand } from '@/lib/brand';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const links = [
  { label: brand.nav.home, href: '/' },
  { label: brand.nav.providers, href: '/providers' },
  { label: brand.nav.howItWorks, href: '/how-it-works' },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="btn-secondary p-2 rounded-lg md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] sm:h-auto">
        <SheetTitle className="sr-only">Site menu</SheetTitle>
        <nav className="flex flex-col p-6" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-4 text-lg font-medium border-b border-border"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-6">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="btn-primary flex-1 text-center py-3"
            >
              {brand.nav.login}
            </Link>
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="btn-secondary flex-1 text-center py-3"
            >
              {brand.nav.signup}
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
