import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProviderBooking from './provider-booking';
import { getProvider } from '../data';

interface ProviderPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProviderPageProps): Promise<Metadata> {
  const { id } = await params;
  const provider = getProvider(id);
  if (!provider) return { title: 'Provider Not Found' };
  return {
    title: `${provider.name} - Laundry Marketplace Kenya`,
    description: provider.description,
  };
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  const { id } = await params;
  const provider = getProvider(id);

  if (!provider) notFound();

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
              <Link href="/" className="text-gray-600 hover:text-primary-600 font-medium">Home</Link>
              <Link href="/providers" className="text-primary-600 font-medium">Find Providers</Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-primary-600 font-medium">How It Works</Link>
              <Link href="/login" className="btn-primary">Login</Link>
              <Link href="/signup" className="btn-secondary">Sign Up</Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/providers" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Providers
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="card">
                <img src={provider.imageUrl} alt={provider.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{provider.name}</h1>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
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
                      <div className="text-2xl font-bold text-gray-900">{formatPrice(provider.pricePerKg)}/kg</div>
                      <div className="text-sm text-gray-500">Min. 2kg order</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {provider.serviceTypes.map((service) => (
                      <span key={service} className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full">
                        {service}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-500">Turnaround</p>
                      <p className="font-semibold text-gray-900">{provider.turnaroundHours} hours</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Distance</p>
                      <p className="font-semibold text-gray-900">{provider.distanceKm.toFixed(1)} km</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Rating</p>
                      <p className="font-semibold text-gray-900">{provider.rating}/5.0</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
                  <p className="text-gray-600 leading-relaxed">{provider.description}</p>
                </div>
              </div>

              <div className="card">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact & Hours</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-gray-900">{provider.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a href={`tel:${provider.phone}`} className="text-primary-600 hover:underline">{provider.phone}</a>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500">Opening Hours</p>
                      <p className="text-gray-900">{provider.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Reviews</h2>
                  <div className="space-y-4">
                    {[
                      { author: 'Sarah M.', rating: 5, date: '2 days ago', text: 'Excellent service! Clothes came back fresh and perfectly folded. Rider was on time and very professional.' },
                      { author: 'James K.', rating: 4, date: '1 week ago', text: 'Good quality wash and fold. Slight delay on return but communicated well. Will use again.' },
                      { author: 'Grace W.', rating: 5, date: '2 weeks ago', text: 'Best laundry service in the area. Eco-friendly detergents and great prices for bulk orders.' },
                    ].map((review, i) => (
                      <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{review.author}</span>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center text-yellow-500">
                            {[...Array(review.rating)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600">{review.text}</p>
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

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 LaundryKE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function formatPrice(cents: number): string {
  return `KES ${(cents / 100).toFixed(2)}`;
}
