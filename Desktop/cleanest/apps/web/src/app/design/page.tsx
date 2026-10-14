'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { GlassCard } from '@/components/glass/glass-card';
import { ReededGlass } from '@/components/glass/reeded-glass';
import { GlowOrbs } from '@/components/glass/glow-orbs';
import { GlassNavbar } from '@/components/glass/glass-navbar';
import { CountUp } from '@/components/motion/count-up';
import { Reveal } from '@/components/motion/reveal';
import { Sheen } from '@/components/motion/sheen';
import { Stagger, StaggerItem } from '@/components/motion/stagger';
import { OrderTimeline } from '@/components/order/order-timeline';
import { Rating } from '@/components/order/rating';
import { brand } from '@/lib/brand';
import { cn } from '@/lib/utils';

const swatches: Array<[string, string]> = [
  ['background', 'bg-background'],
  ['surface', 'bg-surface'],
  ['surface-raised', 'bg-surface-raised'],
  ['foreground', 'bg-foreground'],
  ['foreground-muted', 'bg-foreground-muted'],
  ['primary', 'bg-primary'],
  ['primary-strong', 'bg-primary-strong'],
  ['primary-soft', 'bg-primary-soft'],
  ['navy', 'bg-navy'],
  ['navy-soft', 'bg-navy-soft'],
  ['accent', 'bg-accent'],
  ['success', 'bg-success'],
  ['warning', 'bg-warning'],
  ['error', 'bg-error'],
  ['border', 'bg-border'],
];

export default function DesignGalleryPage() {
  const [light, setLight] = useState(false);
  const [ribWidth, setRibWidth] = useState(3);
  const [blur, setBlur] = useState(18);
  const [tint, setTint] = useState<'none' | 'champagne' | 'sage' | 'midnight'>('none');
  const [intensity, setIntensity] = useState<'subtle' | 'full'>('full');

  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle('light', next);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
        <GlassNavbar />

        <main className="relative mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6">
              <GlowOrbs />

        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight">Design system</h1>
          <p className="mt-2 max-w-2xl text-foreground-muted">
            Every token, primitive, glass component and motion helper in one
            place. Development only — not linked from navigation.
          </p>
        </Reveal>

        <section>
          <h2 className="mb-4 text-2xl font-bold tracking-tight">Colour tokens</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {swatches.map(([name, cls]) => (
              <div key={name} className="space-y-1">
                <div className={cn('h-14 rounded-card border border-border', cls)} />
                <p className="text-xs font-medium">{name}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold tracking-tight">Type scale</h2>
          <div className="space-y-2">
            <p className="text-4xl font-bold tracking-tight">Heading 1 — 4xl bold tight</p>
            <p className="text-3xl font-bold tracking-tight">Heading 2 — 3xl bold tight</p>
            <p className="text-2xl font-semibold">Heading 3 — 2xl semibold</p>
            <p className="text-lg font-medium">Body large — 16px medium</p>
            <p className="text-base">Body — 16px regular, line height 1.5</p>
            <p className="text-sm text-foreground-muted">Small — 14px muted</p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold tracking-tight">Buttons</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold tracking-tight">Inputs and badges</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Input placeholder="Default input" className="max-w-xs" />
            <Input placeholder="Disabled" disabled className="max-w-xs" />
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="soft">Soft</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold tracking-tight">Card</h2>
          <div className="max-w-md">
            <Card>
              <CardHeader>
                <CardTitle>Card title</CardTitle>
                <CardDescription>Card description</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground-muted">
                  Card content with a soft shadow and 16px radius.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold tracking-tight">Overlays</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog title</DialogTitle>
                  <DialogDescription>
                    A centred dialog with a blurred navy overlay.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Sheet (right)</Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Sheet title</SheetTitle>
                  <SheetDescription>
                    A side sheet that slides in from the right.
                  </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                  <Button>Done</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">Drawer (bottom)</Button>
              </DrawerTrigger>
              <DrawerContent side="bottom">
                <DrawerHeader>
                  <DrawerTitle>Drawer title</DrawerTitle>
                  <DrawerDescription>
                    A bottom drawer for mobile-first flows such as booking.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button>Continue</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold tracking-tight">Tabs and accordion</h2>
          <div className="grid max-w-2xl gap-6 md:grid-cols-2">
            <Tabs defaultValue="one">
              <TabsList>
                <TabsTrigger value="one">One</TabsTrigger>
                <TabsTrigger value="two">Two</TabsTrigger>
              </TabsList>
              <TabsContent value="one">First panel content.</TabsContent>
              <TabsContent value="two">Second panel content.</TabsContent>
            </Tabs>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Accordion section</AccordionTrigger>
                <AccordionContent>
                  Accordion content with a smooth height animation.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold tracking-tight">Tooltip</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>Tooltip text</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </section>

        <section className="relative">
          <h2 className="mb-4 text-2xl font-bold tracking-tight">Glass</h2>
          <div className="relative overflow-hidden rounded-card-lg bg-gradient-to-br from-primary-soft via-surface to-navy p-8">
            <GlowOrbs />
            <div className="relative grid gap-4 md:grid-cols-2">
              <GlassCard className="p-6">
                <h3 className="font-semibold">GlassCard</h3>
                <p className="mt-1 text-sm text-foreground-muted">
                  Translucent panel with backdrop blur, a 1px semi-transparent
                  border and a faint top highlight.
                </p>
              </GlassCard>
              <ReededGlass
                rib={ribWidth}
                blur={blur}
                tint={tint}
                intensity={intensity}
                className="flex min-h-32 items-center p-6"
              >
                <div>
                  <h3 className="font-semibold">ReededGlass</h3>
                  <p className="mt-1 text-sm text-foreground-muted">
                    Vertical ribs over a backdrop blur.
                  </p>
                </div>
              </ReededGlass>
            </div>
          </div>
          <div className="mt-4 grid max-w-2xl gap-4 text-sm sm:grid-cols-2">
            <label className="flex items-center justify-between gap-2">
              Rib width (px)
              <Input
                type="number"
                value={ribWidth}
                min={1}
                max={12}
                onChange={(e) => setRibWidth(Number(e.target.value))}
                className="h-8 w-24"
              />
            </label>
            <label className="flex items-center justify-between gap-2">
              Blur (px)
              <Input
                type="number"
                value={blur}
                min={0}
                max={40}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="h-8 w-24"
              />
            </label>
            <label className="flex items-center justify-between gap-2">
              Tint
              <select
                value={tint}
                onChange={(e) => setTint(e.target.value as 'none' | 'champagne' | 'sage' | 'midnight')}
                className="input-field h-8 w-24"
              >
                <option value="none">None</option>
                <option value="champagne">Champagne</option>
                <option value="sage">Sage</option>
                <option value="midnight">Midnight</option>
              </select>
            </label>
            <label className="flex items-center justify-between gap-2">
              Intensity
              <select
                value={intensity}
                onChange={(e) => setIntensity(e.target.value as 'subtle' | 'full')}
                className="input-field h-8 w-24"
              >
                <option value="full">Full</option>
                <option value="subtle">Subtle</option>
              </select>
            </label>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold tracking-tight">Motion</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Reveal>
              <Card className="p-6">
                <h3 className="font-semibold">Reveal</h3>
                <p className="mt-1 text-sm text-foreground-muted">
                  Fade and slide in on scroll, once.
                </p>
              </Card>
            </Reveal>
            <Card className="p-6 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <Sheen variant="cursor" className="absolute inset-0" />
              <div className="relative z-10">
                <h3 className="font-semibold">Sheen (cursor)</h3>
                <p className="mt-1 text-sm text-foreground-muted">
                  Move cursor over this card for a light sweep.
                </p>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold">CountUp</h3>
              <p className="mt-1 text-sm text-foreground-muted">
                <CountUp to={128} suffix=" orders" /> counted up on view.
              </p>
            </Card>
          </div>
          <Stagger className="mt-4 grid gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <StaggerItem key={i}>
                <Card className="p-4 text-center font-semibold">
                  Stagger {i}
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold tracking-tight">
            Order components
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">OrderTimeline</h3>
              <OrderTimeline
                currentStage={2}
                timestamps={['Today, 9:12 AM', 'Today, 9:48 AM', null, null, null]}
              />
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Rating</h3>
              <Rating onSubmit={() => {}} />
            </Card>
          </div>
        </section>

        <footer className="pb-12 text-center text-sm text-foreground-muted">
          {brand.copyright()}
        </footer>
      </main>
    </div>
  );
}
