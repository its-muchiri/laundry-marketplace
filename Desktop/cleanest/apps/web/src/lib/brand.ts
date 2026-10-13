export const brand = {
  name: 'Cleanest Enterprise',
  shortName: 'Cleanest',
  tagline: 'Premium laundry and dry cleaning for Kenya',
  description:
    'Book premium laundry and dry cleaning in Kutus. Verified providers, riders who collect and return, M-Pesa payment and live tracking for households and businesses.',
  themeColor: '#0e7490',
  logo: '/logo.jpeg',
  copyright: (year: number = new Date().getFullYear()) =>
    `© ${year} Cleanest Enterprise. All rights reserved.`,
  nav: {
    home: 'Home',
    providers: 'Find Providers',
    howItWorks: 'How It Works',
    login: 'Login',
    signup: 'Sign Up',
  },
  contact: {
    whatsapp: '+254 756 577 743',
    whatsappUrl: 'https://wa.me/254756577743',
    instagram: '',
  },
} as const;
