'use client';

import { useState } from 'react';
import { Check, MapPin } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { GlassCard } from '@/components/glass/glass-card';
import { cn } from '@/lib/utils';

const stages = ['Booked', 'Picked up', 'Cleaning', 'On the way', 'Delivered'];

const details = [
  'Your slot is confirmed and a provider is assigned.',
  'The rider weighs your load and confirms the final price.',
  'Your items are washed, dried and folded at the provider.',
  'The rider is returning your clean laundry now.',
  'Delivered. Rate your experience and reorder in one tap.',
];

export function TrackingPreview() {
  const [stage, setStage] = useState(2);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Track every step
            </h2>
            <p className="text-lg text-foreground-muted">
              Five customer stages, from booking to delivery. Tap a
              stage to preview what you see in the app.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <Reveal className="lg:col-span-2">
            <div className="flex flex-col gap-2">
              {stages.map((label, index) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setStage(index)}
                  aria-pressed={stage === index}
                  className={cn(
                    'text-left px-4 py-3 rounded-lg border text-sm font-medium transition-colors',
                    stage === index
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-surface border-border text-foreground-muted hover:text-foreground'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <GlassCard className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-sm text-foreground-muted">
                  <MapPin className="h-4 w-4 text-primary-strong" />
                  Ngomongo · 3.2 kg
                </div>
                <span className="text-sm text-foreground-muted">
                  ETA 12 min
                </span>
              </div>
              <ol className="space-y-0">
                {stages.map((label, index) => (
                  <li key={label} className="relative flex gap-4 pb-6 last:pb-0">
                    {index < stages.length - 1 && (
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute left-[11px] top-6 bottom-0 w-0.5',
                          index < stage ? 'bg-primary' : 'bg-border'
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        'relative z-10 h-6 w-6 shrink-0 rounded-full border-2 flex items-center justify-center',
                        index < stage
                          ? 'bg-primary border-primary'
                          : index === stage
                            ? 'bg-primary-strong border-primary-strong'
                            : 'bg-surface border-border'
                      )}
                    >
                      {index < stage && (
                        <Check className="h-3 w-3 text-primary-foreground" />
                      )}
                    </span>
                    <div>
                      <p
                        className={cn(
                          'font-medium',
                          index > stage && 'text-foreground-muted'
                        )}
                      >
                        {label}
                      </p>
                      {index === stage && (
                        <p className="text-sm text-foreground-muted mt-1">
                          {details[stage]}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
