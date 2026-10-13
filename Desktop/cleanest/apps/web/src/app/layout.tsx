import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { brand } from '@/lib/brand';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: `${brand.name} - ${brand.tagline}`,
  description: brand.description,
  keywords: ['laundry', 'dry cleaning', 'kenya', 'kutus', 'marketplace', 'delivery', 'mpesa'],
  icons: {
    icon: brand.logo,
    apple: brand.logo,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()",
          }}
        />
        <meta name="theme-color" content={brand.themeColor} />
      </head>
      <body className="min-h-screen bg-background text-foreground">{children}</body>
    </html>
  );
}
