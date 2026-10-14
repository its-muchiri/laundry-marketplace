'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { m, useReducedMotion } from 'framer-motion';
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
  const reduce = useReducedMotion();

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
              {[
                { id: 'one-off', label: 'One-off' },
                { id: 'plan', label: 'Weekly plan • save 10%' },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setBilling(option.id as Billing)}
                  aria-pressed={billing === (option.id as Billing)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                    billing === (option.id as Billing)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground-muted hover:bg-surface hover:text-foreground'
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
                <m.div
                  className={cn(
                    'card h-full p-6 flex flex-col border border-border rounded-card relative overflow-hidden',
                    plan.featured && 'ring-2 ring-primary-strong shadow-lifted'
                  )}
                  whileHover={{ scale: reduce ? 1 : 1.02 }}
                  whileTap={{ scale: reduce ? 1 : 0.98 }}
                  transition={{ duration: reduce ? 0 : 0.3, type: 'spring', bounce: 0.2 }}
                >
                  {plan.featured && (
                    <span className="absolute -top-2 left-2 bg-primary-strong text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                      Most popular
                    </span>
                  )}
                  <div className="relative z-10 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold tracking-tight mb-4">
                      {plan.name}
                    </h3>
                    <p className="text-foreground-muted text-sm mb-6">
                      {plan.blurb}
                    </p>
                    <p className="mb-4">
                      <span className="block text-4xl font-bold tracking-tight">
                        <CountUp
                          to={billing === 'one-off' ? plan.oneOff : plan.plan}
                        />
                      </span>
                      <span className="text-foreground-muted text-sm block mt-1">
                        KES/kg avg
                      </span>
                    </p>
                    <p className="text-xs text-foreground-muted mb-6">
                      {billing === 'one-off'
                        ? 'Pay per order, weighed at pickup'
                        : 'Recurring weekly orders, 10% off'}
                    </p>
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.includes.map((item, index) => (
                        <m.li
                          key={item}
                          className="flex items-start gap-2 text-sm opacity-0"
                          whileInView={{ opacity: 1, transition: { delay: index * 0.1, duration: 0.3 } }}
                        >
                          <Check className="h-4 w-4 text-primary-strong shrink-0 mt-0.5" />
                          <span className="text-foreground-muted">{item}</span>
                        </m.li>
                      ))}
                    </ul>
                    <m.a
                      href="/providers"
                      className="w-full btn-primary text-center mt-auto"
                      whileHover={{ scale: reduce ? 1 : 1.05 }}
                      whileTap={{ scale: reduce ? 1 : 0.95 }}
                      transition={{ duration: reduce ? 0 : 0.2 }}
                    >
                      Start with {plan.name}
                    </m.a>
                  </div>
                </m.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}