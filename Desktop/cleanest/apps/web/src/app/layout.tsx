import type { Metadata } from 'next';
import { Instrument_Serif } from 'next/font/google';
import '@/styles/globals.css';
import { brand } from '@/lib/brand';
import { ScrollProgress } from '@/components/motion/scroll-progress';
import { MotionProvider } from '@/components/motion/lazy-motion';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
  weight: '400',
});

const themeScript = `(function(){try{
var d=document.documentElement;
var c=navigator.connection;
if((c&&c.saveData)||(navigator.deviceMemory&&navigator.deviceMemory<=4)){
d.setAttribute('data-power','low');
}
var t=localStorage.getItem('theme');
if(t==='light'){d.classList.add('light');}
}catch(e){}})()`;

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
    <html
      lang="en"
      className={`${instrumentSerif.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <meta name="theme-color" content="#0B1220" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&family=Instrument+Serif:ital,wght@0,400;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-ink text-on-dark font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded focus:bg-champagne focus:px-4 focus:py-2 focus:font-medium focus:text-ink"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}