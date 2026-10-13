import { Reveal } from '@/components/motion/reveal';
import { CountUp } from '@/components/motion/count-up';

const stats = [
  { value: 11, prefix: '', suffix: '', label: 'Areas in Kutus' },
  { value: 11, prefix: '', suffix: '', label: 'Vetted providers' },
  { value: 40, prefix: 'KES ', suffix: '/kg', label: 'Average price' },
  { value: 150, prefix: 'KES ', suffix: '', label: 'Max delivery fee' },
];

export function TrustBar() {
  return (
    <section className="py-12 bg-surface-raised border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-sm font-medium text-foreground-muted mb-8">
            Trusted by households, hotels, Airbnbs, restaurants, clinics and
            offices across Kutus
          </p>
        </Reveal>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <Reveal key={stat.label} delay={0.05}>
              <div className="text-center">
                <dd className="text-3xl font-bold tracking-tight text-primary-strong">
                  <CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </dd>
                <dt className="mt-1 text-sm text-foreground-muted">{stat.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
