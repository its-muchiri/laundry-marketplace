'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Building2, CalendarCheck, Headset, Receipt, Check } from 'lucide-react';
import { brand } from '@/lib/brand';
import { Reveal } from '@/components/motion/reveal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const perks = [
  { icon: Building2, title: 'Bulk rates', description: 'Volume pricing for hotels, Airbnbs and clinics with regular loads.' },
  { icon: CalendarCheck, title: 'Scheduled pickups', description: 'Daily, weekly or custom pickup schedules that never miss a turn.' },
  { icon: Headset, title: 'Dedicated account', description: 'One account manager and one invoice for every property.' },
  { icon: Receipt, title: 'Itemised reports', description: 'Weight, turnaround and cost reports for every pickup.' },
];

const whatsappUrl = 'https://wa.me/254756577743';

export function Enterprise() {
  const [business, setBusiness] = useState('');
  const [contact, setContact] = useState('');
  const [volume, setVolume] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Hello ${brand.name}, I'd like a business quote.\nBusiness: ${business}\nContact: ${contact}\nWeekly volume: ${volume}`
    );
    window.open(`${whatsappUrl}?text=${message}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <section className="py-20 bg-navy text-navy-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <p className="text-primary text-sm font-medium mb-4">For businesses</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              Laundry done for your hotel, Airbnb, restaurant, clinic or office
            </h2>
            <p className="text-navy-foreground/70 text-lg mb-10">
              Regular loads deserve regular service. Enterprise plans give
              your business predictable pickups, bulk rates and one simple
              invoice.
            </p>
            <ul className="space-y-6">
              {perks.map((perk) => (
                <li key={perk.title} className="flex gap-4">
                  <span className="h-11 w-11 shrink-0 rounded-xl bg-navy-soft flex items-center justify-center text-primary">
                    <perk.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight mb-1">
                      {perk.title}
                    </h3>
                    <p className="text-navy-foreground/70 text-sm">
                      {perk.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="bg-surface text-foreground rounded-card shadow-lifted p-6 sm:p-8">
              <h3 className="text-2xl font-semibold tracking-tight mb-2">
                Get a business quote
              </h3>
              <p className="text-foreground-muted mb-6">
                We reply on WhatsApp within one working day.
              </p>
              {sent ? (
                <div className="flex items-start gap-3 bg-primary-soft text-primary-strong rounded-lg p-4" role="status">
                  <Check className="h-5 w-5 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    WhatsApp should have opened with your details pre-filled.
                    If it did not, message us directly on 0756 577 743.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <label htmlFor="biz-name" className="block text-sm font-medium mb-1">
                      Business name
                    </label>
                    <Input
                      id="biz-name"
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                      placeholder="Soko Boutique Hotel"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="biz-contact" className="block text-sm font-medium mb-1">
                      Phone or email
                    </label>
                    <Input
                      id="biz-contact"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="+254 7XX XXX XXX"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="biz-volume" className="block text-sm font-medium mb-1">
                      Estimated weekly volume (kg)
                    </label>
                    <Input
                      id="biz-volume"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      placeholder="e.g. 50"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Request quote on WhatsApp
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
