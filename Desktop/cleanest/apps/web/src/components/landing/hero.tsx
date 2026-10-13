'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Navigation } from 'lucide-react';
import { brand } from '@/lib/brand';
import { GlassCard } from '@/components/glass/glass-card';
import { Reveal } from '@/components/motion/reveal';

const stages = ['Booked', 'Picked up', 'Cleaning', 'On the way', 'Delivered'];
const currentStage = 3;

export function Hero() {
  const [area, setArea] = useState('');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-soft to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-3 py-1 text-sm text-foreground-muted mb-6">
              <MapPin className="h-4 w-4 text-primary-strong" />
              Now serving 11 areas in Kutus
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              The cleanest laundry in Kutus,{' '}
              <span className="text-primary-strong">delivered</span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground-muted mb-8 max-w-2xl">
              {brand.tagline}. Book a nearby provider in seconds. Riders collect
              and return your clothes. Pay with M-Pesa. Track every step.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <Link href="/providers" className="btn-primary text-lg px-8 py-4 text-center">
                Find Providers Near You
              </Link>
              <Link href="/how-it-works" className="btn-secondary text-lg px-8 py-4 text-center">
                How It Works
              </Link>
            </div>
            <form
              className="flex items-center gap-2 max-w-md"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `/providers${area ? `?area=${encodeURIComponent(area)}` : ''}`;
              }}
            >
              <label htmlFor="hero-area" className="sr-only">
                Search your area in Kutus
              </label>
              <input
                id="hero-area"
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Ngomongo, Diaspora, Gitwe..."
                className="input-field flex-1"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                <Navigation className="h-4 w-4 mr-2" />
                Search
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.15}>
            <GlassCard className="p-6 max-w-lg w-full mx-auto">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
                  </span>
                  <span className="text-sm font-medium">Live order</span>
                </div>
                <span className="text-sm text-foreground-muted">#CE-1042</span>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-semibold tracking-tight">Wash & Fold</p>
                  <p className="text-sm text-foreground-muted">3.2 kg · Ngomongo</p>
                </div>
                <p className="font-bold tracking-tight">KES 178.00</p>
              </div>

              <ol className="relative">
                <span className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
                {stages.map((stage, index) => (
                  <li key={stage} className="relative flex items-center gap-3 py-2">
                    <span
                      className={`relative z-10 h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                        index < currentStage
                          ? 'bg-primary border-primary'
                          : index === currentStage
                            ? 'bg-primary-strong border-primary-strong'
                            : 'bg-surface border-border'
                      }`}
                    >
                      {index < currentStage && (
                        <svg className="h-3 w-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span
                      className={`text-sm ${
                        index <= currentStage ? 'font-medium' : 'text-foreground-muted'
                      }`}
                    >
                      {stage}
                    </span>
                    {index === currentStage && (
                      <span className="ml-auto text-xs text-primary-strong font-medium">
                        Rider Amara · ~12 min
                      </span>
                    )}
                  </li>
                ))}
              </ol>

              <p className="mt-5 pt-4 border-t border-border text-sm text-foreground-muted">
                Delivery fee KES 50-150 depending on location and load
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
