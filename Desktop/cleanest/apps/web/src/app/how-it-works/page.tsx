import { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export const metadata: Metadata = {
  title: `How It Works - ${brand.name}`,
  description: 'Learn how Cleanest Enterprise works: book, track, and pay for laundry delivery',
};

const steps = [
  {
    number: 1,
    title: 'Find & Book',
    description: 'Browse nearby providers, compare prices, ratings, and turnaround times. Select your service type and book a pickup slot that fits your schedule.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    features: ['Real-time provider availability', 'Transparent pricing per kg', 'Flexible pickup windows', 'Service type selection'],
  },
  {
    number: 2,
    title: 'Rider Collects',
    description: 'A verified rider arrives at your doorstep. They weigh your laundry, confirm the estimated price, and give you a bag tag for tracking. You can track the rider in real-time.',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=400&fit=crop',
    features: ['Verified riders with background checks', 'Real-time GPS tracking', 'Bag tag for item tracking', 'Photo confirmation at pickup'],
  },
  {
    number: 3,
    title: 'Professional Cleaning',
    description: 'Your items are processed at the provider facility using professional equipment and eco-friendly detergents. Special care for delicate fabrics, stains, and premium items.',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=400&fit=crop',
    features: ['Eco-friendly detergents', 'Fabric-specific treatment', 'Stain removal expertise', 'Quality inspection'],
  },
  {
    number: 4,
    title: 'Delivery & Payment',
    description: 'Rider returns your clean, folded laundry. Final weight is confirmed, price adjusted if needed (within 15% variance). Pay securely with M-Pesa STK Push or card on delivery.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    features: ['M-Pesa STK Push & Card', 'Final weigh confirmation', '15% price variance cap', 'Digital receipt & rating'],
  },
];

const faqs = [
  {
    question: 'How is the price calculated?',
    answer: 'Price is based on weight (per kg) × provider rate + delivery fee (pickup + return legs) + service fee. Final price confirmed after weighing at pickup.',
  },
  {
    question: 'What if the final weight differs from my estimate?',
    answer: 'We weigh at pickup. If final price exceeds estimate by more than 15%, you approve before cleaning starts. Otherwise, the estimated price stands.',
  },
  {
    question: 'How do I track my order?',
    answer: 'Real-time tracking in the app: rider location, provider status, cleaning progress, and return delivery. SMS updates at each key step.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'M-Pesa STK Push (primary), Visa/Mastercard via Paystack/Pesapal. Payment on delivery after final weigh confirmation.',
  },
  {
    question: 'What if items are damaged or lost?',
    answer: 'Bag tags scanned at each handover. Dispute window: 24 hours after delivery. Compensation up to KES 5,000/item, KES 20,000/order. Provider insurance covers claims.',
  },
  {
    question: 'Can I schedule recurring pickups?',
    answer: 'Yes! Set up weekly/bi-weekly recurring pickups from your dashboard. Get 10% discount on recurring orders.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main id="main">
        <section className="bg-gradient-to-b from-primary-soft to-background py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              How <span className="text-primary-strong">{brand.shortName}</span> Works
            </h1>
            <p className="text-lg sm:text-xl text-foreground-muted max-w-3xl mx-auto">
              Four simple steps from dirty laundry to fresh, folded clothes delivered to your door.
            </p>
          </div>
        </section>

        <section className="py-20 bg-surface-raised">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {steps.map((step, index) => (
              <div key={step.number} className={`mb-20 ${index % 2 === 1 ? 'flex-row-reverse' : ''} flex flex-col lg:flex-row items-center gap-12`}>
                  <div className="lg:w-1/2">
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-lifted">
                      <img src={step.image} alt={step.title} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  </div>
                <div className="lg:w-1/2 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary-soft rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-strong">{step.number}</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight">{step.title}</h2>
                  </div>
                  <p className="text-foreground-muted text-lg mb-6 leading-relaxed">{step.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {step.features.map((feature) => (
                      <span key={feature} className="px-3 py-1 bg-surface text-foreground-muted text-sm rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
              <p className="text-foreground-muted mt-2">Everything you need to know about using {brand.name}</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <dl className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="card">
                    <div className="p-6">
                      <dt className="font-semibold tracking-tight hover:text-primary-strong transition-colors flex items-center justify-between">
                        {faq.question}
                        <svg className="w-5 h-5 text-foreground-muted hover:text-primary-strong transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </dt>
                      <dd className="mt-3 text-foreground-muted leading-relaxed">{faq.answer}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">Ready to Try It?</h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Book your first pickup in under 2 minutes. No subscription required.
            </p>
            <Link href="/signup" className="bg-primary-foreground text-primary px-8 py-4 rounded-lg font-semibold hover:bg-surface inline-block">
              Create Free Account
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
