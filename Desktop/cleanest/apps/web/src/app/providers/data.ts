export interface ProviderData {
  id: string;
  name: string;
  area: string;
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
  availableNow: boolean;
  slotsLeft: number;
  ordersToday: number;
}

export const DELIVERY_FEE_MIN_CENTS = 5000;
export const DELIVERY_FEE_MAX_CENTS = 15000;
export const SERVICE_FEE_CENTS = 2000;

export function formatPrice(cents: number): string {
  return `KES ${(cents / 100).toFixed(2)}`;
}

export function formatDeliveryFeeRange(): string {
  return `${formatPrice(DELIVERY_FEE_MIN_CENTS)} - ${formatPrice(DELIVERY_FEE_MAX_CENTS)}`;
}

export const providers: ProviderData[] = [
  {
    id: '1',
    name: 'Ngomongo Fresh Cleaners',
    area: 'Ngomongo',
    rating: 4.8,
    reviewCount: 124,
    distanceKm: 1.2,
    turnaroundHours: 24,
    pricePerKg: 4200,
    serviceTypes: ['Wash & Fold', 'Dry Clean', 'Ironing', 'Stain Removal', 'Bedding'],
    imageUrl: 'https://images.unsplash.com/photo-1545177966-53940b83b3e8?w=800&h=400&fit=crop',
    address: 'Ngomongo Shopping Centre, Kutus',
    hours: 'Mon-Sat: 8:00 AM - 8:00 PM | Sun: 9:00 AM - 5:00 PM',
    phone: '+254 700 123 456',
    description: 'Professional laundry in the heart of Ngomongo. Eco-friendly detergents, delicate fabrics and bulk orders for local hotels and Airbnbs.',
    availableNow: true,
    slotsLeft: 6,
    ordersToday: 18,
  },
  {
    id: '2',
    name: 'Diaspora Wash & Fold',
    area: 'Diaspora',
    rating: 4.6,
    reviewCount: 89,
    distanceKm: 1.8,
    turnaroundHours: 12,
    pricePerKg: 4500,
    serviceTypes: ['Wash & Fold', 'Express 6hr', 'Stain Removal', 'Shoe Cleaning'],
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop',
    address: 'Diaspora Estate, Kutus',
    hours: 'Mon-Sun: 7:00 AM - 10:00 PM',
    phone: '+254 711 234 567',
    description: 'Same-day express service for the Diaspora estate and surrounding areas. Modern equipment with a quality guarantee on every load.',
    availableNow: true,
    slotsLeft: 4,
    ordersToday: 22,
  },
  {
    id: '3',
    name: 'Gitwe Quick Wash',
    area: 'Gitwe',
    rating: 4.5,
    reviewCount: 64,
    distanceKm: 2.4,
    turnaroundHours: 8,
    pricePerKg: 3800,
    serviceTypes: ['Wash & Fold', 'Express 4hr', 'Ironing'],
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    address: 'Gitwe Market Road, Kutus',
    hours: 'Mon-Sun: 6:30 AM - 9:30 PM',
    phone: '+254 722 345 678',
    description: 'Fastest turnaround in Gitwe. Four-hour express wash for busy households and restaurants with table linen to clean daily.',
    availableNow: true,
    slotsLeft: 8,
    ordersToday: 27,
  },
  {
    id: '4',
    name: 'Mjini Laundry House',
    area: 'Mjini',
    rating: 4.7,
    reviewCount: 142,
    distanceKm: 2.9,
    turnaroundHours: 24,
    pricePerKg: 4000,
    serviceTypes: ['Wash & Fold', 'Dry Clean', 'Ironing', 'Bedding', 'Curtains'],
    imageUrl: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=400&fit=crop',
    address: 'Mjini Town Centre, Kutus',
    hours: 'Mon-Sat: 8:00 AM - 8:00 PM | Sun: 10:00 AM - 4:00 PM',
    phone: '+254 733 456 789',
    description: 'Full-service laundry house in Mjini. Dry cleaning, wash and fold, and curtain care for clinics, offices and families.',
    availableNow: true,
    slotsLeft: 5,
    ordersToday: 15,
  },
  {
    id: '5',
    name: 'Soko Central Cleaners',
    area: 'Soko',
    rating: 4.4,
    reviewCount: 76,
    distanceKm: 3.2,
    turnaroundHours: 24,
    pricePerKg: 3600,
    serviceTypes: ['Wash & Fold', 'Ironing', 'Bulk Orders'],
    imageUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&h=400&fit=crop',
    address: 'Soko Market, Kutus',
    hours: 'Mon-Sun: 7:00 AM - 9:00 PM',
    phone: '+254 744 567 890',
    description: 'Value laundry near Soko market. Bulk pricing for guest houses and restaurants, with reliable daily pickup slots.',
    availableNow: false,
    slotsLeft: 0,
    ordersToday: 31,
  },
  {
    id: '6',
    name: 'Joslian Dry Cleaners',
    area: 'Joslian',
    rating: 4.9,
    reviewCount: 203,
    distanceKm: 3.6,
    turnaroundHours: 48,
    pricePerKg: 5500,
    serviceTypes: ['Dry Clean', 'Premium Wash', 'Leather Care', 'Wedding Dresses', 'Curtains'],
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    address: 'Joslian Plaza, Kutus',
    hours: 'Mon-Fri: 8:00 AM - 7:00 PM | Sat: 9:00 AM - 4:00 PM',
    phone: '+254 755 678 901',
    description: 'Premium dry cleaning for luxury garments. Specialist in wedding dresses, suits and leather care for discerning customers.',
    availableNow: true,
    slotsLeft: 3,
    ordersToday: 9,
  },
  {
    id: '7',
    name: 'Executive Garment Care',
    area: 'Executive',
    rating: 4.7,
    reviewCount: 118,
    distanceKm: 4.1,
    turnaroundHours: 24,
    pricePerKg: 4800,
    serviceTypes: ['Wash & Fold', 'Dry Clean', 'Pressing', 'Corporate Wear'],
    imageUrl: 'https://images.unsplash.com/photo-1545177966-53940b83b3e8?w=800&h=400&fit=crop',
    address: 'Executive Corner, Kutus',
    hours: 'Mon-Sat: 7:30 AM - 8:30 PM',
    phone: '+254 766 789 012',
    description: 'Garment care for professionals and offices. Corporate wash and fold contracts with scheduled pickup and delivery.',
    availableNow: true,
    slotsLeft: 7,
    ordersToday: 14,
  },
  {
    id: '8',
    name: 'Leisure Line Laundry',
    area: 'Leisure',
    rating: 4.3,
    reviewCount: 58,
    distanceKm: 4.5,
    turnaroundHours: 24,
    pricePerKg: 3500,
    serviceTypes: ['Wash & Fold', 'Sports Kits', 'Student Discount'],
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop',
    address: 'Leisure Park, Kutus',
    hours: 'Mon-Sun: 8:00 AM - 9:00 PM',
    phone: '+254 777 890 123',
    description: 'Friendly neighbourhood laundry near Leisure Park. Sports kits, student discounts and honest prices.',
    availableNow: true,
    slotsLeft: 9,
    ordersToday: 12,
  },
  {
    id: '9',
    name: 'Spenza Wash Co.',
    area: 'Spenza',
    rating: 4.6,
    reviewCount: 97,
    distanceKm: 5.0,
    turnaroundHours: 12,
    pricePerKg: 4400,
    serviceTypes: ['Wash & Fold', 'Express 6hr', 'Stain Removal'],
    imageUrl: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=400&fit=crop',
    address: 'Spenza Lane, Kutus',
    hours: 'Mon-Sun: 7:00 AM - 10:00 PM',
    phone: '+254 788 901 234',
    description: 'Express wash and fold on Spenza lane. Six-hour turnaround for hotels and clinics that cannot wait.',
    availableNow: true,
    slotsLeft: 5,
    ordersToday: 20,
  },
  {
    id: '10',
    name: 'Summer Gardens Laundry',
    area: 'Summer Gardens',
    rating: 4.8,
    reviewCount: 131,
    distanceKm: 5.4,
    turnaroundHours: 24,
    pricePerKg: 4600,
    serviceTypes: ['Wash & Fold', 'Dry Clean', 'Bedding', 'Curtains'],
    imageUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&h=400&fit=crop',
    address: 'Summer Gardens, Kutus',
    hours: 'Mon-Sat: 8:00 AM - 8:00 PM | Sun: 10:00 AM - 5:00 PM',
    phone: '+254 799 012 345',
    description: 'Fresh, fragrant laundry for the Summer Gardens community. Bedding and curtain specialists for holiday homes and Airbnbs.',
    availableNow: false,
    slotsLeft: 0,
    ordersToday: 25,
  },
  {
    id: '11',
    name: 'Maanet Family Wash',
    area: 'Maanet',
    rating: 4.5,
    reviewCount: 71,
    distanceKm: 5.8,
    turnaroundHours: 24,
    pricePerKg: 3900,
    serviceTypes: ['Wash & Fold', 'Ironing', 'Bulk Orders'],
    imageUrl: 'https://images.unsplash.com/photo-1545177966-53940b83b3e8?w=800&h=400&fit=crop',
    address: 'Maanet Village, Kutus',
    hours: 'Mon-Sun: 7:30 AM - 9:00 PM',
    phone: '+254 700 123 789',
    description: 'Family-run wash serving Maanet and the farms around it. Reliable bulk orders for restaurants and guest houses.',
    availableNow: true,
    slotsLeft: 10,
    ordersToday: 16,
  },
];

export function getProvider(id: string): ProviderData | null {
  return providers.find((p) => p.id === id) || null;
}

export function searchProviders(query: string): ProviderData[] {
  const q = query.trim().toLowerCase();
  if (!q) return providers;
  return providers.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.area.toLowerCase().includes(q) ||
      p.serviceTypes.some((s) => s.toLowerCase().includes(q))
  );
}
