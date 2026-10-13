'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Provider {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  distanceKm: number;
  turnaroundHours: number;
  pricePerKg: number;
  serviceTypes: string[];
  imageUrl?: string;
}

export default function HomePage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setUserLocation({ lat: -0.5117, lng: 37.2661 });
        }
      );
    } else {
      setUserLocation({ lat: -0.5117, lng: 37.2661 });
    }
  }, []);

  useEffect(() => {
    const mockProviders: Provider[] = [
      {
        id: '1',
        name: 'Clean & Fresh Laundry',
        rating: 4.8,
        reviewCount: 124,
        distanceKm: 1.2,
        turnaroundHours: 24,
        pricePerKg: 150,
        serviceTypes: ['Wash & Fold', 'Dry Clean', 'Ironing'],
        imageUrl: 'https://images.unsplash.com/photo-1545177966-53940b83b3e8?w=400&h=300&fit=crop',
      },
      {
        id: '2',
        name: 'Express Wash Hub',
        rating: 4.6,
        reviewCount: 89,
        distanceKm: 2.5,
        turnaroundHours: 12,
        pricePerKg: 180,
        serviceTypes: ['Wash & Fold', 'Express 6hr', 'Stain Removal'],
        imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop',
      },
      {
        id: '3',
        name: 'Prestige Dry Cleaners',
        rating: 4.9,
        reviewCount: 203,
        distanceKm: 3.1,
        turnaroundHours: 48,
        pricePerKg: 220,
        serviceTypes: ['Dry Clean', 'Premium Wash', 'Leather Care', 'Wedding Dresses'],
        imageUrl: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop',
      },
      {
        id: '4',
        name: 'Campus Laundry Co.',
        rating: 4.4,
        reviewCount: 67,
        distanceKm: 0.8,
        turnaroundHours: 24,
        pricePerKg: 120,
        serviceTypes: ['Wash & Fold', 'Student Discount', 'Bulk Orders'],
        imageUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=300&fit=crop',
      },
    ];
    setProviders(mockProviders);
    setLoading(false);
  }, []);

  const formatPrice = (cents: number) => {
    return `KES ${(cents / 100).toFixed(2)}`;
  };

  const filteredProviders = providers.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.serviceTypes.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">LaundryKE</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/providers" className="text-gray-600 hover:text-primary-600 font-medium">Find Providers</Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-primary-600 font-medium">How It Works</Link>
              <Link href="/login" className="btn-primary">Login</Link>
              <Link href="/signup" className="btn-secondary">Sign Up</Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative bg-gradient-to-b from-primary-50 to-white py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
                Laundry Done <span className="text-primary-600">Right</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Book a nearby provider in seconds. Riders collect and return your clothes.
                Pay with M-Pesa. Track every step.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/providers" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                  Find Providers Near You
                </Link>
                <Link href="/how-it-works" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                  How It Works
                </Link>
              </div>
            </div>

            <div className="mt-16 relative">
              <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl mx-auto border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter your location or use current location"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 input-field bg-gray-50"
                    aria-label="Search location"
                  />
                  <button className="btn-primary whitespace-nowrap" disabled={loading}>
                    {loading ? 'Locating...' : 'Use My Location'}
                  </button>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  {userLocation ? `Showing providers near you` : 'Detecting your location...'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Available Providers</h2>
              <select className="input-field w-auto px-4 py-2" aria-label="Sort providers">
                <option value="distance">Nearest First</option>
                <option value="rating">Highest Rated</option>
                <option value="price">Lowest Price</option>
                <option value="turnaround">Fastest Turnaround</option>
              </select>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="card animate-pulse">
                    <div className="aspect-video bg-gray-200" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProviders.map((provider) => (
                  <Link key={provider.id} href={`/providers/${provider.id}`} className="card group">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={provider.imageUrl}
                        alt={provider.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                        {provider.distanceKm.toFixed(1)} km
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {provider.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="flex items-center text-yellow-500">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          {provider.rating}
                        </span>
                        <span className="text-sm text-gray-500">({provider.reviewCount} reviews)</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {provider.serviceTypes.slice(0, 3).map((service) => (
                          <span key={service} className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full">
                            {service}
                          </span>
                        ))}
                        {provider.serviceTypes.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{provider.serviceTypes.length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div>
                          <span className="text-lg font-bold text-gray-900">{formatPrice(provider.pricePerKg)}/kg</span>
                          <span className="text-sm text-gray-500 ml-2">• {provider.turnaroundHours}h turnaround</span>
                        </div>
                        <span className="btn-primary text-sm py-2 px-4">Book Now</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: 1,
                  title: 'Find & Book',
                  description: 'Browse nearby providers, compare prices and ratings, book your pickup time.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  ),
                },
                {
                  step: 2,
                  title: 'Rider Collects',
                  description: 'A verified rider picks up your laundry at your doorstep. Track in real-time.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                },
                {
                  step: 3,
                  title: 'Clean & Return',
                  description: 'Provider cleans your items. Rider delivers back. Pay on delivery with M-Pesa.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div key={item.step} className="text-center p-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary-600">
                    {item.icon}
                  </div>
                  <div className="text-4xl font-bold text-primary-600 mb-2">{item.step}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of customers enjoying convenient laundry delivery in Kenya.
            </p>
            <Link href="/signup" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-block">
              Create Free Account
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <span className="text-xl font-bold">LaundryKE</span>
              </div>
              <p className="text-gray-400 text-sm">Laundry made simple for Kenya.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/providers" className="hover:text-white">Find Providers</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/support" className="hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Provider</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/provider/signup" className="hover:text-white">Become a Provider</Link></li>
                <li><Link href="/provider/dashboard" className="hover:text-white">Provider Dashboard</Link></li>
                <li><Link href="/provider/terms" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Rider</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/rider/signup" className="hover:text-white">Join as Rider</Link></li>
                <li><Link href="/rider/app" className="hover:text-white">Rider App</Link></li>
                <li><Link href="/rider/terms" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 LaundryKE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}