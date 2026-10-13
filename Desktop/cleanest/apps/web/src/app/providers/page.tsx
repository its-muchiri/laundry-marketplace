import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Providers - Laundry Marketplace Kenya',
  description: 'Browse and book nearby laundry providers',
};

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
  address: string;
  hours: string;
  phone: string;
  description: string;
}

const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'Clean & Fresh Laundry',
    rating: 4.8,
    reviewCount: 124,
    distanceKm: 1.2,
    turnaroundHours: 24,
    pricePerKg: 15000,
    serviceTypes: ['Wash & Fold', 'Dry Clean', 'Ironing', 'Stain Removal', 'Bedding'],
    imageUrl: 'https://images.unsplash.com/photo-1545177966-53940b83b3e8?w=800&h=400&fit=crop',
    address: '123 Kenyatta Avenue, Nairobi CBD',
    hours: 'Mon-Sat: 8:00 AM - 8:00 PM | Sun: 9:00 AM - 5:00 PM',
    phone: '+254 700 123 456',
    description: 'Professional laundry services with eco-friendly detergents. Specializing in delicate fabrics and bulk orders.',
  },
  {
    id: '2',
    name: 'Express Wash Hub',
    rating: 4.6,
    reviewCount: 89,
    distanceKm: 2.5,
    turnaroundHours: 12,
    pricePerKg: 18000,
    serviceTypes: ['Wash & Fold', 'Express 6hr', 'Stain Removal', 'Shoe Cleaning'],
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop',
    address: '456 Moi Avenue, Near Kencom',
    hours: 'Mon-Sun: 7:00 AM - 10:00 PM',
    phone: '+254 711 234 567',
    description: 'Fastest turnaround in Nairobi. 6-hour express service available. Modern equipment with quality guarantee.',
  },
  {
    id: '3',
    name: 'Prestige Dry Cleaners',
    rating: 4.9,
    reviewCount: 203,
    distanceKm: 3.1,
    turnaroundHours: 48,
    pricePerKg: 22000,
    serviceTypes: ['Dry Clean', 'Premium Wash', 'Leather Care', 'Wedding Dresses', 'Curtains'],
    imageUrl: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=400&fit=crop',
    address: '789 Westlands Road, Westlands',
    hours: 'Mon-Fri: 8:00 AM - 7:00 PM | Sat: 9:00 AM - 4:00 PM',
    phone: '+254 722 345 678',
    description: 'Premium dry cleaning for luxury garments. Specialist in wedding dresses, suits, and leather items.',
  },
  {
    id: '4',
    name: 'Campus Laundry Co.',
    rating: 4.4,
    reviewCount: 67,
    distanceKm: 0.8,
    turnaroundHours: 24,
    pricePerKg: 12000,
    serviceTypes: ['Wash & Fold', 'Student Discount', 'Bulk Orders', 'Sports Kits'],
    imageUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&h=400&fit=crop',
    address: '321 University Way, Near UoN',
    hours: 'Mon-Sun: 8:00 AM - 9:00 PM',
    phone: '+254 733 456 789',
    description: 'Affordable laundry for students. 20% student discount with valid ID. Bulk pricing for hostels.',
  },
];

export default function ProvidersPage() {
  const formatPrice = (cents: number) => {
    return `KES ${(cents / 100).toFixed(2)}`;
  };

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

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Available Providers</h1>
            <p className="text-gray-600 mt-1">Compare and book from verified laundry providers near you</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search providers, services, or location..."
                className="input-field pl-10"
              />
            </div>
            <select className="input-field w-full md:w-auto">
              <option value="distance">Sort: Nearest First</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="price">Sort: Lowest Price</option>
              <option value="turnaround">Sort: Fastest Turnaround</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProviders.map((provider) => (
              <Link key={provider.id} href={`/providers/${provider.id}`} className="card group">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={provider.imageUrl}
                    alt={provider.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    {provider.distanceKm.toFixed(1)} km away
                  </div>
                  <div className="absolute bottom-3 left-3 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {formatPrice(provider.pricePerKg)}/kg
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
                    <div className="text-sm text-gray-500">
                      {provider.turnaroundHours}h turnaround
                    </div>
                    <span className="btn-primary text-sm py-2 px-4">Book Now</span>
                  </div>
                </div>
              </Link>
            ))}
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