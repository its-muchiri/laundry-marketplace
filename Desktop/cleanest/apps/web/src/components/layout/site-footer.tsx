import Link from 'next/link';
import Image from 'next/image';
import { brand } from '@/lib/brand';

const columns = [
  {
    heading: 'Customer',
    links: [
      { label: 'Find Providers', href: '/providers' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Sign Up', href: '/signup' },
      { label: 'Log In', href: '/login' },
    ],
  },
  {
    heading: 'Provider',
    links: [
      { label: 'Become a Provider', href: '/provider/signup' },
      { label: 'Provider Dashboard', href: '/provider/dashboard' },
      { label: 'Terms', href: '/provider/terms' },
    ],
  },
  {
    heading: 'Rider',
    links: [
      { label: 'Join as Rider', href: '/rider/signup' },
      { label: 'Rider App', href: '/rider/app' },
      { label: 'Terms', href: '/rider/terms' },
    ],
  },
];

export function SiteFooter() {
  return (
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
            <p className="text-navy-foreground/70 text-sm mb-4">{brand.tagline}.</p>
            <ul className="space-y-2 text-navy-foreground/70 text-sm">
              <li>
                <a
                  href={brand.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-navy-foreground underline underline-offset-2"
                >
                  WhatsApp {brand.contact.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={brand.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-navy-foreground underline underline-offset-2"
                >
                  @{brand.contact.instagram}
                </a>
              </li>
            </ul>
          </div>
          {columns.map((column) => (
            <div key={column.heading}>
              <h4 className="font-semibold mb-4">{column.heading}</h4>
              <ul className="space-y-2 text-navy-foreground/70 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-navy-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-navy-soft mt-8 pt-8 text-center text-navy-foreground/70 text-sm">
          <p>{brand.copyright()}</p>
        </div>
      </div>
    </footer>
  );
}
