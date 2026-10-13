import { Metadata } from 'next';
import { brand } from '@/lib/brand';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Hero } from '@/components/landing/hero';
import { TrustBar } from '@/components/landing/trust-bar';
import { ServicesBento } from '@/components/landing/services-bento';
import { HowItWorksLine } from '@/components/landing/how-it-works-line';
import { Enterprise } from '@/components/landing/enterprise';
import { Pricing } from '@/components/landing/pricing';
import { TrackingPreview } from '@/components/landing/tracking-preview';
import { BeforeAfter } from '@/components/landing/before-after';
import { Testimonials } from '@/components/landing/testimonials';
import { Faq } from '@/components/landing/faq';
import { FinalCta } from '@/components/landing/final-cta';

export const metadata: Metadata = {
  title: `${brand.name} - ${brand.tagline}`,
  description: `${brand.tagline}. Book a vetted laundry provider near you in Kutus. Riders collect and return your clothes. Pay with M-Pesa and track every step.`,
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <TrustBar />
        <ServicesBento />
        <HowItWorksLine />
        <Enterprise />
        <Pricing />
        <TrackingPreview />
        <BeforeAfter />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
