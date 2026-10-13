import { Quote, Star } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { Stagger, StaggerItem } from '@/components/motion/stagger';

const testimonials = [
  {
    quote:
      'The rider collected at 8am and my bedding was back folded by 6pm. The price matched the estimate to the shilling.',
    name: 'Sarah M.',
    area: 'Ngomongo',
    rating: 5,
  },
  {
    quote:
      'We run three Airbnbs in Mjini and the weekly pickup schedule is the only reason we stay on top of the linen.',
    name: 'James K.',
    area: 'Mjini',
    rating: 5,
  },
  {
    quote:
      'Fair per-kg pricing, no surprises at delivery. The tracking card tells me exactly where my clothes are.',
    name: 'Grace W.',
    area: 'Gitwe',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-surface-raised">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Loved across Kutus
            </h2>
            <p className="text-lg text-foreground-muted">
              Households and businesses in all 11 areas we serve.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Stagger>
            {testimonials.map((testimonial) => (
              <StaggerItem key={testimonial.name} className="h-full">
                <figure className="card h-full p-6 flex flex-col">
                  <Quote className="h-8 w-8 text-primary-strong mb-4" />
                  <blockquote className="text-foreground mb-6 flex-1">
                    {testimonial.quote}
                  </blockquote>
                  <div className="flex items-center text-warning mb-2">
                    {Array.from({ length: testimonial.rating }).map((_, star) => (
                      <Star key={star} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <figcaption className="text-sm">
                    <span className="font-semibold tracking-tight">
                      {testimonial.name}
                    </span>
                    <span className="text-foreground-muted">
                      {' '}
                      · {testimonial.area}
                    </span>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
