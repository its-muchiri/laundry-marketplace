'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ProviderData, formatPrice, DELIVERY_FEE_MIN_CENTS, DELIVERY_FEE_MAX_CENTS, SERVICE_FEE_CENTS } from '../data';

interface ProviderBookingProps {
  provider: ProviderData;
}

export default function ProviderBooking({ provider }: ProviderBookingProps) {
  const [estimatedWeight, setEstimatedWeight] = useState(5);
  const [selectedService, setSelectedService] = useState(provider.serviceTypes[0]);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');

  const estimatedPrice = estimatedWeight * provider.pricePerKg;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="lg:col-span-1">
      <div className="card sticky top-24">
        <div className="p-6">
          <h2 className="text-lg font-semibold tracking-tight mb-4">Book Pickup</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Service Type</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="input-field"
              >
                {provider.serviceTypes.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Estimated Weight: {estimatedWeight} kg
              </label>
              <input
                type="range"
                min="2"
                max="20"
                value={estimatedWeight}
                onChange={(e) => setEstimatedWeight(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                aria-label="Estimated weight in kilograms"
              />
              <div className="flex justify-between text-xs text-foreground-muted mt-1">
                <span>2 kg</span>
                <span>20 kg</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Pickup Date</label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={minDate}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Pickup Time</label>
              <select value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="input-field">
                <option value="">Select time</option>
                <option value="08:00-10:00">8:00 AM - 10:00 AM</option>
                <option value="10:00-12:00">10:00 AM - 12:00 PM</option>
                <option value="12:00-14:00">12:00 PM - 2:00 PM</option>
                <option value="14:00-16:00">2:00 PM - 4:00 PM</option>
                <option value="16:00-18:00">4:00 PM - 6:00 PM</option>
              </select>
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground-muted">Laundry ({estimatedWeight} kg × {formatPrice(provider.pricePerKg)})</span>
                <span className="tracking-tight">{formatPrice(estimatedPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground-muted">Delivery Fee (Pickup + Return)</span>
                <span className="tracking-tight">{formatPrice(DELIVERY_FEE_MIN_CENTS)} - {formatPrice(DELIVERY_FEE_MAX_CENTS)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground-muted">Service Fee</span>
                <span className="tracking-tight">{formatPrice(SERVICE_FEE_CENTS)}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-border pt-2">
                <span className="font-semibold tracking-tight">Estimated Total</span>
                <span className="font-semibold tracking-tight">
                  {formatPrice(estimatedPrice + SERVICE_FEE_CENTS + DELIVERY_FEE_MIN_CENTS)} - {formatPrice(estimatedPrice + SERVICE_FEE_CENTS + DELIVERY_FEE_MAX_CENTS)}
                </span>
              </div>
              <p className="text-xs text-foreground-muted text-center">Final price confirmed after weighing. 15% variance threshold applies.</p>
            </div>

            <button className="btn-primary w-full py-3 text-lg" disabled={!pickupDate || !pickupTime}>
              Book Pickup
            </button>
            <p className="text-xs text-foreground-muted text-center">Pay on delivery with M-Pesa or Card</p>
          </div>
        </div>
      </div>
    </div>
  );
}
