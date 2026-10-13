import { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { providers, formatPrice, formatDeliveryFeeRange } from './data';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export const metadata: Metadata = {
  title: `Providers - ${brand.name}`,
  description: 'Compare and book from verified laundry providers near you in Kutus',
};

export default function ProvidersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Available Providers in Kutus</h1>
            <p className="text-foreground-muted mt-1">
              Compare and book from verified laundry providers near you.
              Delivery is {formatDeliveryFeeRange()} depending on location and load.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search providers, services, or area..."
                className="input-field pl-10"
                aria-label="Search providers"
              />
            </div>
            <select className="input-field w-full md:w-auto" aria-label="Sort providers">
              <option value="distance">Sort: Nearest First</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="price">Sort: Lowest Price</option>
              <option value="turnaround">Sort: Fastest Turnaround</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {providers.map((provider) => (
              <Link key={provider.id} href={`/providers/${provider.id}`} className="card group">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={provider.imageUrl}
                    alt={provider.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-surface-raised/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-foreground">
                    {provider.distanceKm.toFixed(1)} km away
                  </div>
                  <div className="absolute bottom-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {formatPrice(provider.pricePerKg)}/kg
                  </div>
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
                    <div className="text-sm text-foreground-muted">
                      {provider.turnaroundHours}h turnaround
                      {provider.availableNow ? ' · Available now' : ' · Full today'}
                    </div>
                    <span className="btn-primary text-sm py-2 px-4">Book Now</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
