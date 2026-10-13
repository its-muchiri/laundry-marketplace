import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { brand } from '@/lib/brand';
import { Reveal } from '@/components/motion/reveal';

export function FinalCta() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-primary-foreground mb-6">
            Ready for the cleanest laundry in Kutus?
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-10">
            Join households, hotels, Airbnbs, restaurants, clinics and
            offices across 11 areas. Delivery is KES 50-150 depending
            on location and load.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="bg-primary-foreground text-primary px-8 py-4 rounded-lg font-semibold hover:bg-surface text-lg"
            >
              Create Free Account
            </Link>
            <a
              href="https://wa.me/254756577743"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-primary-foreground/40 text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary-foreground/10 text-lg"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp 0756 577 743
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
