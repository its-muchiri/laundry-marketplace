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

export const mockProviders: Record<string, Provider> = {
  '1': {
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
    description: 'Professional laundry services with eco-friendly detergents. Specializing in delicate fabrics and bulk orders. We use premium detergents that are gentle on clothes but tough on stains. Our team is trained to handle all fabric types including silk, wool, and cashmere.',
  },
  '2': {
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
    description: 'Fastest turnaround in Nairobi. 6-hour express service available. Modern equipment with quality guarantee. We use high-efficiency machines that clean thoroughly while being gentle on fabrics.',
  },
  '3': {
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
    description: 'Premium dry cleaning for luxury garments. Specialist in wedding dresses, suits, and leather items. We use organic solvents that are safe for delicate fabrics and the environment.',
  },
  '4': {
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
    description: 'Affordable laundry for students. 20% student discount with valid ID. Bulk pricing for hostels. We understand student budgets and offer the best value for money.',
  },
};

export interface ProviderData {
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

export function getProvider(id: string): ProviderData | null {
  return mockProviders[id] || null;
}
