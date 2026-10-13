import {
  Shirt,
  Sparkles,
  BedDouble,
  Wand2,
  Zap,
  Package,
} from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { Stagger, StaggerItem } from '@/components/motion/stagger';

const services = [
  {
    title: 'Wash & Fold',
    description: 'Washed, dried and folded by weight. The everyday essential.',
    price: 'From KES 40/kg',
    icon: Shirt,
    span: 'md:col-span-2',
  },
  {
    title: 'Dry Cleaning',
    description: 'Suits, dresses and delicates cleaned solvent-free.',
    price: 'Priced per item',
    icon: Sparkles,
    span: '',
  },
  {
    title: 'Duvets & Bedding',
    description: 'Hotel-grade laundering for duvets, sheets and pillowcases.',
    price: 'From KES 250',
    icon: BedDouble,
    span: '',
  },
  {
    title: 'Ironing',
    description: 'Crisp shirts, trousers and linens, pressed to order.',
    price: 'From KES 30/item',
    icon: Wand2,
    span: '',
  },
  {
    title: 'Express 24h',
    description: 'Same-day pickup, next-day return for urgent loads.',
    price: '+20% on the rate',
    icon: Zap,
    span: 'md:col-span-2',
  },
  {
    title: 'Pickup & Return',
    description: 'Verified riders collect and deliver, tracked in real time.',
    price: 'KES 50-150 per order',
    icon: Package,
    span: '',
  },
];

export function ServicesBento() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Every service your household or business needs
            </h2>
            <p className="text-lg text-foreground-muted">
              Transparent per-kg pricing with provider variation. Pay with M-Pesa
              after the final weigh-in.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Stagger className="contents">
            {services.map((service) => (
              <StaggerItem key={service.title} className={service.span}>
                <div className="card h-full p-6 group hover:shadow-lifted transition-shadow duration-normal">
                  <div className="w-12 h-12 bg-primary-soft rounded-xl flex items-center justify-center text-primary-strong mb-4">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight mb-2">
                    {service.title}
                  </h3>
                  <p className="text-foreground-muted mb-4">{service.description}</p>
                  <p className="text-sm font-medium text-primary-strong">
                    {service.price}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
