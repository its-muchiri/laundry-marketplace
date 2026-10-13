'use client';

import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Reveal } from '@/components/motion/reveal';

const beforeSrc =
  'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=900&h=500&fit=crop';
const afterSrc =
  'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=900&h=500&fit=crop';

export function BeforeAfter() {
  const [split, setSplit] = useState(50);

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSplit(Number(e.target.value));

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              The Cleanest Enterprise difference
            </h2>
            <p className="text-lg text-foreground-muted">
              Drag the slider to see what professional cleaning
              does to a week of laundry.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative aspect-video rounded-card overflow-hidden shadow-lifted select-none"
            aria-label="Before and after comparison"
          >
            <img
              src={afterSrc}
              alt="Clean, freshly folded laundry"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
            >
              <img
                src={beforeSrc}
                alt="Unwashed laundry piled up"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
            </div>
            <span
              className="absolute top-0 bottom-0 w-1 bg-primary-foreground shadow"
              style={{ left: `${split}%` }}
              aria-hidden="true"
            />
            <input
              type="range"
              min={0}
              max={100}
              value={split}
              onChange={onChange}
              aria-label="Reveal clean laundry"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
            />
            <span className="absolute top-3 left-3 bg-navy/80 text-navy-foreground text-xs font-medium px-2 py-1 rounded-full">
              Before
            </span>
            <span className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
              After
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
