'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Home,
  Info,
  LogIn,
  Search,
  Shirt,
  UserPlus,
} from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { brand } from '@/lib/brand';
import { providers } from '@/app/providers/data';

const pages = [
  { title: brand.nav.home, href: '/', icon: Home },
  { title: brand.nav.providers, href: '/providers', icon: Shirt },
  { title: brand.nav.howItWorks, href: '/how-it-works', icon: Info },
  { title: brand.nav.login, href: '/login', icon: LogIn },
  { title: brand.nav.signup, href: '/signup', icon: UserPlus },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((previous) => !previous);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search pages and providers"
        className="btn-secondary hidden md:inline-flex items-center gap-2 px-3"
      >
        <Search className="h-4 w-4" />
        <span className="text-foreground-muted">Search</span>
        <kbd className="ml-1 rounded border border-border bg-surface px-1.5 py-0.5 text-xs text-foreground-muted">
          Ctrl K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages and providers..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Go to">
            {pages.map((page) => (
              <CommandItem key={page.href} onSelect={() => go(page.href)}>
                <page.icon className="mr-2 h-4 w-4" />
                {page.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Providers">
            {providers.map((provider) => (
              <CommandItem
                key={provider.id}
                onSelect={() => go(`/providers/${provider.id}`)}
              >
                <Shirt className="mr-2 h-4 w-4" />
                {provider.name}
                <span className="ml-2 text-xs text-foreground-muted">
                  {provider.area}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
