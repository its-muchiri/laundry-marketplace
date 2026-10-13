'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { brand } from '@/lib/brand';
import { providers, formatPrice, formatDeliveryFeeRange } from './providers/data';

export default function HomePage() {
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
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const filteredProviders = providers.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.serviceTypes.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-surface-raised/90 shadow-sm sticky top-0 z-50 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-lg">
                <Image src={brand.logo} alt={`${brand.name} logo`} fill className="object-cover" />
              </div>
              <span className="text-xl font-bold tracking-tight">{brand.name}</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/providers" className="text-foreground-muted hover:text-primary-strong font-medium">{brand.nav.providers}</Link>
              <Link href="/how-it-works" className="text-foreground-muted hover:text-primary-strong font-medium">{brand.nav.howItWorks}</Link>
              <Link href="/login" className="btn-primary">{brand.nav.login}</Link>
              <Link href="/signup" className="btn-secondary">{brand.nav.signup}</Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative bg-gradient-to-b from-primary-soft to-background py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Laundry Done <span className="text-primary-strong">Right</span>
              </h1>
              <p className="text-lg sm:text-xl text-foreground-muted mb-8 max-w-2xl mx-auto">
                {brand.tagline}. Book a nearby provider in seconds. Riders collect and return your clothes.
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
              <div className="bg-surface-raised rounded-2xl shadow-lifted p-6 max-w-2xl mx-auto border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-5 h-5 text-primary-strong" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search your area in Kutus - Ngomongo, Diaspora, Gitwe..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 input-field bg-surface"
                    aria-label="Search location"
                  />
                  <button className="btn-primary whitespace-nowrap" disabled={loading}>
                    {loading ? 'Locating...' : 'Use My Location'}
                  </button>
                </div>
                <p className="text-sm text-foreground-muted text-center">
                  {userLocation ? 'Showing providers near you' : 'Detecting your location...'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-surface-raised">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Available Providers in Kutus</h2>
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
                    <div className="aspect-video bg-border" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-border rounded w-3/4" />
                      <div className="h-4 bg-border rounded w-1/2" />
                      <div className="h-4 bg-border rounded w-full" />
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
                      <div className="absolute top-3 right-3 bg-surface-raised/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-foreground">
                        {provider.distanceKm.toFixed(1)} km
                      </div>
                      {provider.availableNow ? (
                        <div className="absolute top-3 left-3 bg-success text-white px-2 py-1 rounded-full text-xs font-medium">
                          Available now
                        </div>
                      ) : (
                        <div className="absolute top-3 left-3 bg-warning text-white px-2 py-1 rounded-full text-xs font-medium">
                          Full - join queue
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold tracking-tight mb-1 group-hover:text-primary-strong transition-colors">
                        {provider.name}
                      </h3>
                      <p className="text-sm text-foreground-muted mb-2">{provider.area}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="flex items-center text-warning">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          {provider.rating}
                        </span>
                        <span className="text-sm text-foreground-muted">({provider.reviewCount} reviews)</span>
                        <span className="text-xs text-foreground-muted">· {provider.ordersToday} orders today</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {provider.serviceTypes.slice(0, 3).map((service) => (
                          <span key={service} className="px-2 py-1 bg-primary-soft text-primary-strong text-xs rounded-full">
                            {service}
                          </span>
                        ))}
                        {provider.serviceTypes.length > 3 && (
                          <span className="px-2 py-1 bg-surface text-foreground-muted text-xs rounded-full">
                            +{provider.serviceTypes.length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div>
                          <span className="text-lg font-bold tracking-tight">{formatPrice(provider.pricePerKg)}/kg</span>
                          <span className="text-sm text-foreground-muted ml-2">· {provider.turnaroundHours}h turnaround</span>
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

        <section className="py-16 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">How It Works</h2>
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
                  <div className="w-16 h-16 bg-primary-soft rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary-strong">
                    {item.icon}
                  </div>
                  <div className="text-4xl font-bold text-primary-strong mb-2">{item.step}</div>
                  <h3 className="text-xl font-semibold tracking-tight mb-2">{item.title}</h3>
                  <p className="text-foreground-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">Ready to Get Started?</h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of Kenyans enjoying convenient laundry delivery in Kutus.
              Delivery is {formatDeliveryFeeRange()} depending on location and load.
            </p>
            <Link href="/signup" className="bg-primary-foreground text-primary px-8 py-4 rounded-lg font-semibold hover:bg-surface inline-block">
              Create Free Account
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-navy text-navy-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative h-8 w-8 overflow-hidden rounded-lg">
                  <Image src={brand.logo} alt={`${brand.name} logo`} fill className="object-cover" />
                </div>
                <span className="text-xl font-bold">{brand.name}</span>
              </div>
              <p className="text-navy-foreground/70 text-sm">{brand.tagline}.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer</h4>
              <ul className="space-y-2 text-navy-foreground/70 text-sm">
                <li><Link href="/providers" className="hover:text-navy-foreground">Find Providers</Link></li>
                <li><Link href="/pricing" className="hover:text-navy-foreground">Pricing</Link></li>
                <li><Link href="/faq" className="hover:text-navy-foreground">FAQ</Link></li>
                <li><Link href="/support" className="hover:text-navy-foreground">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Provider</h4>
              <ul className="space-y-2 text-navy-foreground/70 text-sm">
                <li><Link href="/provider/signup" className="hover:text-navy-foreground">Become a Provider</Link></li>
                <li><Link href="/provider/dashboard" className="hover:text-navy-foreground">Provider Dashboard</Link></li>
                <li><Link href="/provider/terms" className="hover:text-navy-foreground">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Rider</h4>
              <ul className="space-y-2 text-navy-foreground/70 text-sm">
                <li><Link href="/rider/signup" className="hover:text-navy-foreground">Join as Rider</Link></li>
                <li><Link href="/rider/app" className="hover:text-navy-foreground">Rider App</Link></li>
                <li><Link href="/rider/terms" className="hover:text-navy-foreground">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-navy-soft mt-8 pt-8 text-center text-navy-foreground/70 text-sm">
            <p>{brand.copyright()}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
