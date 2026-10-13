import { Search, Package, Sparkles, Undo2 } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';

const steps = [
  {
    icon: Search,
    title: 'Find & Book',
    description:
      'Compare vetted providers near you in Ngomongo, Diaspora, Gitwe, Mjini and 7 more areas. Pick a slot that suits you.',
  },
  {
    icon: Package,
    title: 'Rider Collects',
    description:
      'A verified rider arrives, weighs your load, confirms the price and gives you a bag tag for tracking.',
  },
  {
    icon: Sparkles,
    title: 'Professional Cleaning',
    description:
      'Your provider washes, dries and folds with eco-friendly detergents. Delicates and stains get special care.',
  },
  {
    icon: Undo2,
    title: 'Clean & Return',
    description:
      'The rider delivers fresh laundry to your door. Final weight confirmed, pay with M-Pesa, rate the service.',
  },
];

export function HowItWorksLine() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              From dirty to delivered in four steps
            </h2>
            <p className="text-lg text-foreground-muted">
              No subscription, no minimum order. Book your first pickup in
              under 2 minutes.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          <span
            className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-primary-strong to-primary"
            aria-hidden="true"
          />
          <ol className="space-y-12">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.1}>
                <li className="relative flex gap-6">
                  <span className="relative z-10 h-14 w-14 shrink-0 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lifted">
                    <step.icon className="h-6 w-6" />
                  </span>
                  <div className="pt-1">
                    <p className="text-sm font-medium text-primary-strong mb-1">
                      Step {index + 1}
                    </p>
                    <h3 className="text-2xl font-semibold tracking-tight mb-2">
                      {step.title}
                    </h3>
                    <p className="text-foreground-muted max-w-2xl">
                      {step.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
