import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ProviderBooking from './provider-booking';
import { getProvider } from '../data';
import { brand } from '@/lib/brand';

interface ProviderPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProviderPageProps): Promise<Metadata> {
  const { id } = await params;
  const provider = getProvider(id);
  if (!provider) return { title: 'Provider Not Found' };
  return {
    title: `${provider.name} - ${brand.name}`,
    description: provider.description,
  };
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  const { id } = await params;
  const provider = getProvider(id);

  if (!provider) notFound();

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
              <Link href="/" className="text-foreground-muted hover:text-primary-strong font-medium">{brand.nav.home}</Link>
              <Link href="/providers" className="text-primary-strong font-medium">{brand.nav.providers}</Link>
              <Link href="/how-it-works" className="text-foreground-muted hover:text-primary-strong font-medium">{brand.nav.howItWorks}</Link>
              <Link href="/login" className="btn-primary">{brand.nav.login}</Link>
              <Link href="/signup" className="btn-secondary">{brand.nav.signup}</Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/providers" className="inline-flex items-center text-sm text-foreground-muted hover:text-foreground mb-6">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Providers
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="card">
                <div className="relative aspect-video">
                  <img src={provider.imageUrl} alt={provider.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold tracking-tight">{provider.name}</h1>
                      <div className="flex items-center gap-3 mt-2 text-sm text-foreground-muted">
                        <span>{provider.area}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-warning fill-current" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          {provider.rating} ({provider.reviewCount} reviews)
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {provider.distanceKm.toFixed(1)} km
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold tracking-tight">KES {(provider.pricePerKg / 100).toFixed(2)}/kg</div>
                      <div className="text-sm text-foreground-muted">Min. 2kg order</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {provider.serviceTypes.map((service) => (
                      <span key={service} className="px-3 py-1 bg-primary-soft text-primary-strong text-sm rounded-full">
                        {service}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-surface rounded-lg">
                    <div>
                      <p className="text-sm text-foreground-muted">Turnaround</p>
                      <p className="font-semibold tracking-tight">{provider.turnaroundHours} hours</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground-muted">Distance</p>
                      <p className="font-semibold tracking-tight">{provider.distanceKm.toFixed(1)} km</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground-muted">Availability</p>
                      <p className="font-semibold tracking-tight">
                        {provider.availableNow ? `${provider.slotsLeft} slots left` : 'Full today'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="p-6">
                  <h2 className="text-lg font-semibold tracking-tight mb-4">About</h2>
                  <p className="text-foreground-muted leading-relaxed">{provider.description}</p>
                </div>
              </div>

              <div className="card">
                <div className="p-6">
                  <h2 className="text-lg font-semibold tracking-tight mb-4">Contact & Hours</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-foreground-muted">Address</p>
                      <p className="tracking-tight">{provider.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground-muted">Phone</p>
                      <a href={`tel:${provider.phone}`} className="text-primary-strong hover:underline">{provider.phone}</a>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-foreground-muted">Opening Hours</p>
                      <p className="tracking-tight">{provider.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="p-6">
                  <h2 className="text-lg font-semibold tracking-tight mb-4">Reviews</h2>
                  <div className="space-y-4">
                    {[
                      { author: 'Sarah M.', rating: 5, date: '2 days ago', text: 'Excellent service! Clothes came back fresh and perfectly folded. Rider was on time and very professional.' },
                      { author: 'James K.', rating: 4, date: '1 week ago', text: 'Good quality wash and fold. Slight delay on return but communicated well. Will use again.' },
                      { author: 'Grace W.', rating: 5, date: '2 weeks ago', text: 'Best laundry service in the area. Eco-friendly detergents and great prices for bulk orders.' },
                    ].map((review, i) => (
                      <div key={i} className="border-b border-border pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium tracking-tight">{review.author}</span>
                            <span className="text-sm text-foreground-muted">{review.date}</span>
                          </div>
                          <div className="flex items-center text-warning">
                            {[...Array(review.rating)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-foreground-muted">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <ProviderBooking provider={provider} />
          </div>
        </div>
      </main>

      <footer className="bg-navy text-navy-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-navy-foreground/70 text-sm">
          <p>{brand.copyright()}</p>
        </div>
      </footer>
    </div>
  );
}
