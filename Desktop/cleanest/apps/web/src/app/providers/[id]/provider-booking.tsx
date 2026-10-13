'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ProviderData } from '../data';

interface ProviderBookingProps {
  provider: ProviderData;
}

export default function ProviderBooking({ provider }: ProviderBookingProps) {
  const [estimatedWeight, setEstimatedWeight] = useState(5);
  const [selectedService, setSelectedService] = useState(provider.serviceTypes[0]);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');

  const formatPrice = (cents: number) => {
    return `KES ${(cents / 100).toFixed(2)}`;
  };

  const estimatedPrice = estimatedWeight * provider.pricePerKg;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="lg:col-span-1">
      <div className="card sticky top-24">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Book Pickup</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Weight: {estimatedWeight} kg
              </label>
              <input
                type="range"
                min="2"
                max="20"
                value={estimatedWeight}
                onChange={(e) => setEstimatedWeight(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>2 kg</span>
                <span>20 kg</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={minDate}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Time</label>
              <select value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="input-field">
                <option value="">Select time</option>
                <option value="08:00-10:00">8:00 AM - 10:00 AM</option>
                <option value="10:00-12:00">10:00 AM - 12:00 PM</option>
                <option value="12:00-14:00">12:00 PM - 2:00 PM</option>
                <option value="14:00-16:00">2:00 PM - 4:00 PM</option>
                <option value="16:00-18:00">4:00 PM - 6:00 PM</option>
              </select>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Laundry ({estimatedWeight} kg × {formatPrice(provider.pricePerKg)})</span>
                <span className="text-gray-900">{formatPrice(estimatedPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Fee (Pickup + Return)</span>
                <span className="text-gray-900">{formatPrice(20000)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service Fee</span>
                <span className="text-gray-900">{formatPrice(2000)}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
                <span className="font-semibold text-gray-900">Estimated Total</span>
                <span className="font-semibold text-gray-900">{formatPrice(estimatedPrice + 22000)}</span>
              </div>
              <p className="text-xs text-gray-500 text-center">Final price confirmed after weighing. 15% variance threshold applies.</p>
            </div>

            <button className="btn-primary w-full py-3 text-lg" disabled={!pickupDate || !pickupTime}>
              Book Pickup
            </button>
            <p className="text-xs text-gray-500 text-center">Pay on delivery with M-Pesa or Card</p>
          </div>
        </div>
      </div>
    </div>
  );
}
