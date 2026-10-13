'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface RatingProps {
  onSubmit: (rating: number, note: string) => void;
  submitted?: boolean;
}

export function Rating({ onSubmit, submitted = false }: RatingProps) {
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [note, setNote] = useState('');

  const send = (e: FormEvent) => {
    e.preventDefault();
    if (stars === 0) return;
    onSubmit(stars, note);
  };

  if (submitted) {
    return (
      <div
        className="bg-primary-soft text-primary-strong rounded-lg p-4 text-sm"
        role="status"
      >
        Thanks for rating this order. Your feedback goes to the provider
        and helps other customers choose.
      </div>
    );
  }

  return (
    <form onSubmit={send} className="space-y-4">
      <fieldset>
        <legend className="text-sm font-medium mb-2">
          How was your laundry?
        </legend>
        <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setStars(star)}
              onMouseEnter={() => setHover(star)}
              aria-label={`${star} out of 5 stars`}
              className="p-1"
            >
              <Star
                className={cn(
                  'h-8 w-8 transition-colors',
                  (hover || stars) >= star
                    ? 'text-warning fill-current'
                    : 'text-border'
                )}
              />
            </button>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="rating-note" className="sr-only">
          Note for the provider (optional)
        </label>
        <Input
          id="rating-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note for the provider (optional)"
        />
      </div>
      <Button type="submit" disabled={stars === 0} className="w-full">
        Submit rating
      </Button>
    </form>
  );
}
