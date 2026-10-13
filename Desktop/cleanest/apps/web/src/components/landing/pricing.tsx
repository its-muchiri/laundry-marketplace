'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { Stagger, StaggerItem } from '@/components/motion/stagger';
import { CountUp } from '@/components/motion/count-up';
import { cn } from '@/lib/utils';

type Billing = 'one-off' | 'plan';

const plans = [
  {
    name: 'Essential',
    blurb: 'Wash & fold for households.',
    includes: ['Wash, dry and fold by weight', 'Pickup and return tracked', 'M-Pesa payment', 'SMS updates'],
    oneOff: 40,
    plan: 36,
    featured: false,
  },
  {
    name: 'Standard',
    blurb: 'Adds dry cleaning and express.',
    includes: [
      'Everything in Essential',
      'Dry cleaning per item',
      'Express 24h turnaround',
      'Duvets and bedding',
    ],
    oneOff: 55,
    plan: 50,
    featured: true,
  },
  {
    name: 'Enterprise',
    blurb: 'Bulk rates for businesses.',
    includes: [
      'Everything in Standard',
      'Scheduled daily pickups',
      'Volume discount tiers',
      'Itemised monthly invoice',
    ],
    oneOff: 45,
    plan: 40,
    featured: false,
  },
];

export function Pricing() {
  const [billing, setBilling] = useState<Billing>('one-off');

  return (
    <section className="py-20 bg-surface-raised">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Simple pricing, weighed at pickup
            </h2>
            <p className="text-lg text-foreground-muted mb-8">
              Average KES 40 per kg across providers; each provider sets
              its own rate. Delivery is KES 50-150 depending on location
              and load.
            </p>
            <div
              className="inline-flex items-center gap-1 bg-surface border border-border rounded-full p-1"
              role="group"
              aria-label="Billing period"
            >
              {(
                [
                  { id: 'one-off', label: 'One-off' },
                  { id: 'plan', label: 'Weekly plan · save 10%' },
                ] as const
              ).map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setBilling(option.id)}
                  aria-pressed={billing === option.id}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                    billing === option.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground-muted hover:text-foreground'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <Stagger>
            {plans.map((plan) => (
              <StaggerItem key={plan.name} className="h-full">
                <div
                  className={cn(
                    'card h-full p-6 flex flex-col',
                    plan.featured && 'ring-2 ring-primary-strong shadow-lifted'
                  )}
                >
                  {plan.featured && (
                    <span className="self-start bg-primary-strong text-primary-foreground text-xs font-medium px-2 py-1 rounded-full mb-4">
                      Most popular
                    </span>
                  )}
                  <h3 className="text-xl font-semibold tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-foreground-muted text-sm mb-6">
                    {plan.blurb}
                  </p>
                  <p className="mb-1">
                    <span className="text-4xl font-bold tracking-tight">
                      <CountUp
                        to={billing === 'one-off' ? plan.oneOff : plan.plan}
                      />
                    </span>
                    <span className="text-foreground-muted text-sm">
                      {' '}
                      KES/kg avg
                    </span>
                  </p>
                  <p className="text-xs text-foreground-muted mb-6">
                    {billing === 'one-off'
                      ? 'Pay per order, weighed at pickup'
                      : 'Recurring weekly orders, 10% off'}
                  </p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary-strong shrink-0 mt-0.5" />
                        <span className="text-foreground-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="/providers" className="btn-primary text-center w-full">
                    Start with {plan.name}
                  </a>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
