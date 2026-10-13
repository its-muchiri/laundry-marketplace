import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, MessageCircle } from 'lucide-react';
import { brand } from '@/lib/brand';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { GlassCard } from '@/components/glass/glass-card';
import { OrderTimeline } from '@/components/order/order-timeline';
import { Rating } from '@/components/order/rating';
import { formatPrice } from '@/app/providers/data';

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: OrderPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Order ${id} - ${brand.name}`,
    description: `Track order ${id} from booking to delivery`,
  };
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-sm text-foreground-muted mb-1">
              <Link href="/providers" className="hover:text-primary-strong">
                Providers
              </Link>{' '}
              / Order
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              Order {id}
            </h1>
            <p className="text-foreground-muted mt-1">
              Ngomongo Fresh Cleaners · 3.2 kg · Wash &amp; Fold
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
              <GlassCard className="p-6">
                <h2 className="text-lg font-semibold tracking-tight mb-6">
                  Tracking
                </h2>
                <OrderTimeline
                  currentStage={3}
                  timestamps={[
                    'Today, 9:12 AM',
                    'Today, 9:48 AM',
                    'Today, 11:20 AM',
                    null,
                    null,
                  ]}
                />
                <p className="mt-6 pt-4 border-t border-border text-sm text-foreground-muted">
                  The rider is on the way and should arrive in about
                  12 minutes.
                </p>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold tracking-tight">
                    Your rider
                  </h2>
                  <a
                    href="https://wa.me/254756577743"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary px-3 py-2 text-sm"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <span className="h-12 w-12 rounded-full bg-primary-soft text-primary-strong flex items-center justify-center font-bold text-lg">
                    A
                  </span>
                  <div>
                    <p className="font-semibold tracking-tight">
                      Amara O.
                    </p>
                    <p className="text-sm text-foreground-muted">
                      4.9 · 1,240 deliveries
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h2 className="text-lg font-semibold tracking-tight mb-4">
                  Delivery address
                </h2>
                <p className="flex items-start gap-2 text-foreground-muted">
                  <MapPin className="h-4 w-4 mt-0.5 text-primary-strong shrink-0" />
                  <span>
                    Ngomongo Shopping Centre, near the blue kiosk
                    <span className="block text-sm">
                      Landmark: blue kiosk by the entrance
                    </span>
                  </span>
                </p>
              </GlassCard>
            </div>

            <div className="space-y-6">
              <GlassCard className="p-6">
                <h2 className="text-lg font-semibold tracking-tight mb-4">
                  Price breakdown
                </h2>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-foreground-muted">
                      Laundry (3.2 kg × {formatPrice(4200)})
                    </dt>
                    <dd>{formatPrice(13440)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-foreground-muted">
                      Delivery (pickup + return)
                    </dt>
                    <dd>{formatPrice(8000)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-foreground-muted">Service fee</dt>
                    <dd>{formatPrice(2000)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 font-semibold">
                    <dt>Total</dt>
                    <dd>{formatPrice(23440)}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-xs text-foreground-muted">
                  Pay on delivery with M-Pesa or card. Final price
                  confirmed after weighing; 15% variance threshold
                  applies.
                </p>
              </GlassCard>

              <GlassCard className="p-6">
                <h2 className="text-lg font-semibold tracking-tight mb-4">
                  Rate this order
                </h2>
                <Rating
                  onSubmit={() => {}}
                />
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
