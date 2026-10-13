'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import { Check, MapPin, Navigation, X } from 'lucide-react';
import {
  ProviderData,
  formatPrice,
  DELIVERY_FEE_MIN_CENTS,
  DELIVERY_FEE_MAX_CENTS,
  SERVICE_FEE_CENTS,
} from '../data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ProviderBookingProps {
  provider: ProviderData;
}

type Step = 'details' | 'payment' | 'processing' | 'done';

export default function ProviderBooking({ provider }: ProviderBookingProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('details');
  const [estimatedWeight, setEstimatedWeight] = useState(5);
  const [selectedService, setSelectedService] = useState(
    provider.serviceTypes[0]
  );
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [orderId, setOrderId] = useState('');

  const laundryCost = estimatedWeight * provider.pricePerKg;
  const totalMin = laundryCost + SERVICE_FEE_CENTS + DELIVERY_FEE_MIN_CENTS;
  const totalMax = laundryCost + SERVICE_FEE_CENTS + DELIVERY_FEE_MAX_CENTS;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const detailsReady = Boolean(pickupDate && pickupTime);

  const startPayment = (e: FormEvent) => {
    e.preventDefault();
    if (!detailsReady) return;
    setStep('payment');
  };

  const pay = (e: FormEvent) => {
    e.preventDefault();
    if (mpesaPhone.trim().length < 9) return;
    setStep('processing');
    window.setTimeout(() => {
      setOrderId(`CE-${Math.floor(1000 + Math.random() * 9000)}`);
      setStep('done');
    }, 2000);
  };

  const close = () => {
    setOpen(false);
    window.setTimeout(() => setStep('details'), 200);
  };

  return (
    <div className="lg:col-span-1">
      <div className="card sticky top-24">
        <div className="p-6">
          <h2 className="text-lg font-semibold tracking-tight mb-2">
            {provider.name}
          </h2>
          <p className="text-sm text-foreground-muted mb-4">
            {formatPrice(provider.pricePerKg)}/kg ·{' '}
            {provider.turnaroundHours}h turnaround ·{' '}
            {provider.availableNow
              ? `${provider.slotsLeft} slots left`
              : 'Full today'}
          </p>
          <Dialog open={open} onOpenChange={(next) => (next ? setOpen(true) : close())}>
            <DialogTrigger asChild>
              <Button className="w-full py-3 text-lg" disabled={!provider.availableNow}>
                Book Pickup
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              {step === 'details' && (
                <>
                  <DialogTitle>Book pickup</DialogTitle>
                  <form onSubmit={startPayment} className="space-y-4 mt-4">
                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium mb-1"
                      >
                        Service Type
                      </label>
                      <select
                        id="service"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="input-field"
                      >
                        {provider.serviceTypes.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="weight"
                        className="block text-sm font-medium mb-1"
                      >
                        Estimated Weight: {estimatedWeight} kg
                      </label>
                      <input
                        id="weight"
                        type="range"
                        min="2"
                        max="20"
                        value={estimatedWeight}
                        onChange={(e) =>
                          setEstimatedWeight(Number(e.target.value))
                        }
                        className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                        aria-label="Estimated weight in kilograms"
                      />
                      <div className="flex justify-between text-xs text-foreground-muted mt-1">
                        <span>2 kg</span>
                        <span>20 kg</span>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium mb-1"
                      >
                        Pickup Date
                      </label>
                      <input
                        id="date"
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        min={minDate}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="time"
                        className="block text-sm font-medium mb-1"
                      >
                        Pickup Time
                      </label>
                      <select
                        id="time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="input-field"
                      >
                        <option value="">Select time</option>
                        <option value="08:00-10:00">8:00 AM - 10:00 AM</option>
                        <option value="10:00-12:00">10:00 AM - 12:00 PM</option>
                        <option value="12:00-14:00">12:00 PM - 2:00 PM</option>
                        <option value="14:00-16:00">2:00 PM - 4:00 PM</option>
                        <option value="16:00-18:00">4:00 PM - 6:00 PM</option>
                      </select>
                    </div>

                    <dl className="border-t border-border pt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-foreground-muted">
                          Laundry ({estimatedWeight} kg × {formatPrice(provider.pricePerKg)})
                        </dt>
                        <dd>{formatPrice(laundryCost)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-foreground-muted">
                          Delivery Fee (Pickup + Return)
                        </dt>
                        <dd>
                          {formatPrice(DELIVERY_FEE_MIN_CENTS)} -{' '}
                          {formatPrice(DELIVERY_FEE_MAX_CENTS)}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-foreground-muted">Service Fee</dt>
                        <dd>{formatPrice(SERVICE_FEE_CENTS)}</dd>
                      </div>
                      <div className="flex justify-between border-t border-border pt-2 font-semibold">
                        <dt>Estimated Total</dt>
                        <dd>
                          {formatPrice(totalMin)} - {formatPrice(totalMax)}
                        </dd>
                      </div>
                      <p className="text-xs text-foreground-muted">
                        Final price confirmed after weighing. 15% variance
                        threshold applies.
                      </p>
                    </dl>

                    <Button type="submit" className="w-full" disabled={!detailsReady}>
                      Continue to payment
                    </Button>
                  </form>
                </>
              )}

              {step === 'payment' && (
                <>
                  <DialogTitle>Pay with M-Pesa</DialogTitle>
                  <form onSubmit={pay} className="space-y-4 mt-4">
                    <div className="bg-surface rounded-lg p-4 text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-foreground-muted">
                          {selectedService} · {estimatedWeight} kg
                        </span>
                        <span>{formatPrice(laundryCost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground-muted">
                          Delivery + service fee
                        </span>
                        <span>
                          {formatPrice(SERVICE_FEE_CENTS + DELIVERY_FEE_MIN_CENTS)}
                          {' - '}
                          {formatPrice(SERVICE_FEE_CENTS + DELIVERY_FEE_MAX_CENTS)}
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold border-t border-border pt-2">
                        <span>Total (upper bound)</span>
                        <span>{formatPrice(totalMax)}</span>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="mpesa"
                        className="block text-sm font-medium mb-1"
                      >
                        M-Pesa phone number
                      </label>
                      <Input
                        id="mpesa"
                        type="tel"
                        value={mpesaPhone}
                        onChange={(e) => setMpesaPhone(e.target.value)}
                        placeholder="+254 7XX XXX XXX"
                        required
                        minLength={9}
                      />
                      <p className="mt-1 text-xs text-foreground-muted">
                        We send an STK Push prompt to this number. You
                        confirm with your M-Pesa PIN on your phone.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        className="flex-1"
                        onClick={() => setStep('details')}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                      <Button type="submit" className="flex-1">
                        Pay {formatPrice(totalMax)}
                      </Button>
                    </div>
                  </form>
                </>
              )}

              {step === 'processing' && (
                <>
                  <DialogTitle>Check your phone</DialogTitle>
                  <div className="mt-8 mb-8 text-center" role="status">
                    <span className="inline-block h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                    <p className="mt-6 font-medium">
                      STK Push sent to {mpesaPhone}
                    </p>
                    <p className="text-sm text-foreground-muted mt-1">
                      Enter your M-Pesa PIN to confirm{' '}
                      {formatPrice(totalMax)}. Do not close this window.
                    </p>
                  </div>
                </>
              )}

              {step === 'done' && (
                <>
                  <DialogTitle>Booking confirmed</DialogTitle>
                  <div className="mt-4 text-center" role="status">
                    <span className="inline-flex h-12 w-12 rounded-full bg-success/15 text-success items-center justify-center">
                      <Check className="h-6 w-6" />
                    </span>
                    <p className="mt-4 font-semibold text-lg">
                      Order {orderId} booked
                    </p>
                    <p className="text-sm text-foreground-muted mt-1">
                      A rider collects {estimatedWeight} kg on{' '}
                      {pickupDate} at {pickupTime.replace('-', ' to ')}.
                    </p>
                  </div>
                  <div className="mt-6 space-y-2">
                    <Link
                      href={`/orders/${orderId}`}
                      className="btn-primary w-full text-center py-3 block"
                    >
                      Track your order
                    </Link>
                    <Button variant="secondary" className="w-full" onClick={close}>
                      Done
                    </Button>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>

          <p className="flex items-start gap-2 text-xs text-foreground-muted mt-4">
            <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span>
              {provider.address}. Riders use your saved address
              and landmark from sign-up.
            </span>
          </p>
          <p className="flex items-start gap-2 text-xs text-foreground-muted mt-2">
            <Navigation className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span>
              {provider.distanceKm.toFixed(1)} km from you. Pay on
              delivery with M-Pesa or card.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
