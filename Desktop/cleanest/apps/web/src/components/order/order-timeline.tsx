'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ORDER_STAGES = [
  'Booked',
  'Picked up',
  'Cleaning',
  'On the way',
  'Delivered',
] as const;

export type OrderStage = (typeof ORDER_STAGES)[number];

interface OrderTimelineProps {
  currentStage: number;
  timestamps?: (string | null)[];
}

export function OrderTimeline({
  currentStage,
  timestamps = [],
}: OrderTimelineProps) {
  return (
    <ol className="space-y-0">
      {ORDER_STAGES.map((stage, index) => (
        <li key={stage} className="relative flex gap-4 pb-7 last:pb-0">
          {index < ORDER_STAGES.length - 1 && (
            <span
              aria-hidden="true"
              className={cn(
                'absolute left-[13px] top-7 bottom-0 w-0.5',
                index < currentStage ? 'bg-primary' : 'bg-border'
              )}
            />
          )}
          <span
            className={cn(
              'relative z-10 h-7 w-7 shrink-0 rounded-full border-2 flex items-center justify-center',
              index < currentStage
                ? 'bg-primary border-primary'
                : index === currentStage
                  ? 'bg-primary-strong border-primary-strong'
                  : 'bg-surface border-border'
            )}
          >
            {index < currentStage && (
              <Check className="h-3.5 w-3.5 text-primary-foreground" />
            )}
          </span>
          <div className="pt-1">
            <p
              className={cn(
                'font-medium',
                index > currentStage && 'text-foreground-muted'
              )}
            >
              {stage}
            </p>
            {timestamps[index] ? (
              <p className="text-sm text-foreground-muted">
                {timestamps[index]}
              </p>
            ) : index === currentStage ? (
              <p className="text-sm text-primary-strong">Now</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
