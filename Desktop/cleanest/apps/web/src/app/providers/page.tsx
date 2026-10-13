'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { brand } from '@/lib/brand';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { ProvidersMap } from '@/components/providers/map';
import {
  providers,
  formatPrice,
  formatDeliveryFeeRange,
  ProviderData,
} from './data';
import { cn } from '@/lib/utils';

type SortKey = 'distance' | 'rating' | 'price' | 'turnaround';

function sortProviders(list: ProviderData[], sort: SortKey) {
  const sorted = [...list];
  switch (sort) {
    case 'distance':
      return sorted.sort((a, b) => a.distanceKm - b.distanceKm);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'price':
      return sorted.sort((a, b) => a.pricePerKg - b.pricePerKg);
    case 'turnaround':
      return sorted.sort((a, b) => a.turnaroundHours - b.turnaroundHours);
  }
}

export default function ProvidersPage() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('distance');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? providers.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.area.toLowerCase().includes(q) ||
            p.serviceTypes.some((s) => s.toLowerCase().includes(q))
        )
      : providers;
    return sortProviders(filtered, sort);
  }, [query, sort]);

  const select = (id: string) => setSelectedId(id);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="py-8" id="main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Available Providers in Kutus
            </h1>
            <p className="text-foreground-muted mt-1">
              Compare and book from verified laundry providers
              near you. Delivery is {formatDeliveryFeeRange()}
              depending on location and load.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <label htmlFor="provider-search" className="sr-only">
                Search providers, services, or area
              </label>
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                id="provider-search"
                type="text"
                placeholder="Search providers, services, or area..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <label htmlFor="provider-sort" className="sr-only">
              Sort providers
            </label>
            <select
              id="provider-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="input-field w-full md:w-auto"
            >
              <option value="distance">Sort: Nearest First</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="price">Sort: Lowest Price</option>
              <option value="turnaround">
                Sort: Fastest Turnaround
              </option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
              <ProvidersMap
                providers={visible}
                selectedId={selectedId}
                onSelect={select}
              />
            </div>

            <div className="lg:col-span-1 lg:max-h-[420px] lg:overflow-y-auto lg:pr-1 space-y-3">
              {visible.length === 0 && (
                <div className="card p-6 text-center text-foreground-muted text-sm">
                  No providers match &ldquo;{query}&rdquo;. Try an
                  area like Ngomongo or a service like dry
                  cleaning.
                </div>
              )}
              {visible.map((provider) => (
                <div
                  key={provider.id}
                  className={cn(
                    'card p-4 transition-shadow',
                    provider.id === selectedId &&
                      'ring-2 ring-primary-strong'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/providers/${provider.id}`}
                        className="font-semibold tracking-tight hover:text-primary-strong transition-colors"
                      >
                        {provider.name}
                      </Link>
                      <p className="text-sm text-foreground-muted">
                        {provider.area} ·{' '}
                        {provider.distanceKm.toFixed(1)} km
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => select(provider.id)}
                      aria-pressed={provider.id === selectedId}
                      aria-label={`Show ${provider.name} on the map`}
                      className={cn(
                        'text-xs font-medium px-2 py-1 rounded-full shrink-0',
                        provider.id === selectedId
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-surface border border-border text-foreground-muted'
                      )}
                    >
                      Map
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <span className="flex items-center text-warning">
                      <Star className="h-4 w-4 fill-current" />
                      {provider.rating}
                    </span>
                    <span className="text-foreground-muted">
                      ({provider.reviewCount})
                    </span>
                    <span className="text-foreground-muted">
                      · {provider.turnaroundHours}h
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <span className="font-bold tracking-tight">
                      {formatPrice(provider.pricePerKg)}/kg
                    </span>
                    <span
                      className={cn(
                        'text-xs font-medium px-2 py-1 rounded-full',
                        provider.availableNow
                          ? 'bg-success/15 text-success'
                          : 'bg-warning/15 text-warning'
                      )}
                    >
                      {provider.availableNow
                        ? `Available · ${provider.slotsLeft} slots`
                        : 'Full today'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
