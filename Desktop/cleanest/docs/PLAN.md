# PLAN.md

Rule: work on ONE milestone at a time. Do not start the next until the owner approves.

## Milestone 0: Foundation

- [x] Monorepo with apps/web, apps/rider, apps/api, packages/shared
- [x] TypeScript, lint, typecheck and test scripts working
- [x] PostgreSQL + PostGIS running locally; migration tool set up
- [x] .env.example with every variable from README.md
- [x] Basic CI that runs lint, typecheck and tests
- [x] Role-based auth skeleton (customer, provider, rider, admin)

## Milestone 1: Accounts and onboarding

- [ ] Phone OTP and email sign-up (SMS through Africa's Talking sandbox)
- [ ] Customer address: map pin, autocomplete, required landmark note
- [ ] Provider onboarding: facility pin, radius, documents, service menu, capacity, hours
- [ ] Rider onboarding: documents, vehicle, payout number
- [ ] Secure document upload with signed URLs
- [ ] Admin approval queue for providers and riders

## Milestone 2: Discovery

- [ ] Provider search by PostGIS distance within radius
- [ ] List and map view with filters (distance, turnaround, price, rating)
- [ ] Routes API road distance for the top 10 to 20 results only, with caching
- [ ] Hide providers outside their radius or at full capacity

## Milestone 3: Orders and pricing

- [ ] Order state machine with allowed transitions and actors
- [ ] Order creation from provider menu with estimated weight or items
- [ ] Delivery fee per leg from stored road distance
- [ ] Weighing step and final price; approval flow for more than 15% above estimate
- [ ] order_events log with time, actor, location, photos
- [ ] Tests for every transition and every pricing rule

## Milestone 4: Payments

- [ ] M-Pesa STK Push in the Daraja sandbox
- [ ] Payment ledger: charge, hold, refund, commission, payout
- [ ] Release payouts after delivery and dispute window (M-Pesa B2C sandbox)
- [ ] Refund rules for cancellations
- [ ] Idempotent callbacks and reconciliation job

## Milestone 5: Riders and dispatch

- [ ] Rider availability and location updates
- [ ] Sequential job offers (about 30 seconds each), then widen radius, then admin alert
- [ ] Separate pickup and return legs with their own fees
- [ ] Rider app: accept job, navigate, photo and item count, status updates
- [ ] Order status and rider location shown to the customer at key steps

## Milestone 6: Trust and safety

- [ ] Bag tags or QR codes scanned at each handover
- [ ] Cancellations, no-show fee, refunds
- [ ] Dispute and claim flow with evidence; payout hold while open
- [ ] Ratings for provider and rider

## Milestone 7: Notifications and admin

- [ ] SMS and push for every order event
- [ ] Admin dashboard: live orders, disputes, ledger, fee and radius settings
- [ ] Audit log for admin actions

## Milestone 8: Hardening and pilot launch

- [ ] Security checklist in docs/SECURITY.md fully passed
- [ ] ODPC registration and privacy policy in place (owner task)
- [ ] Terms, rider and provider agreements, compensation policy (owner task)
- [ ] Load and failure testing; backups and a tested restore
- [ ] Staging environment with M-Pesa production go-live checks
- [ ] Pilot town onboarding: providers and riders recruited (owner task)

## Later (not now)

Silver and Gold tiers, polygons, scored dispatch, card payments, live GPS map, WhatsApp, featured placements, Swahili.

## Track B: Redesign (Cleanest Enterprise)

Branch: `redesign/cleanest-enterprise`. Track B owns design tokens, global styles, `apps/web/components/ui`, the marketing pages and the visual layer of existing screens. Track A owns apps/api, packages/shared, database migrations and business logic. Merge main into this branch at the end of every redesign milestone and fix conflicts immediately.

Presentation only: no changes to API contracts, route paths, data models, order states, pricing rules, auth or payment code, or any test IDs or accessible names. All existing tests must keep passing. Allowed stack: Tailwind CSS, shadcn/ui, Motion, lucide-react (ask owner before adding anything else). Brand text lives in one file (`apps/web/lib/brand.ts`).

### R0: Design system foundation - DONE 2026-10-13

- [x] Design tokens as CSS variables (colour, radius, shadow, spacing, blur, motion), light and dark
- [x] Core primitives: Button, Input, Card, Badge, Dialog, Drawer, Sheet, Tooltip, Toast, Tabs, Accordion, Command
- [x] Glass components: GlassCard, GlassNavbar, ReededGlass, GlowOrbs
- [x] Motion helpers: reveal, stagger, count-up, hover sheen, all reduced-motion safe
- [x] Brand assets: Cleanest Enterprise logo (owner-provided image at `apps/web/public/logo.jpeg`) wired into the layout and favicon; theme colours matched to the brand brief (white/off-white, deep navy, aqua/teal primary, one warm accent); owner to confirm exact hex codes
- [x] A /design gallery route (development only) that shows every component, state and theme

### R1: App shell - DONE 2026-10-13

- [x] Navbar, mobile menu sheet, footer, page layout, theme toggle, global command palette
  - Shared `SiteHeader` (GlassNavbar), `SiteFooter` (with WhatsApp 0756 577 743), `MobileMenu` (bottom sheet), `ThemeToggle` (localStorage + flash-free init script), `CommandPalette` (Ctrl/Cmd+K, pages + providers). All pages use the shared shell; duplicated header/footer markup removed.

### R2: Marketing landing page - DONE 2026-10-13

- [x] Hero with live order-status glass card, trust bar, services bento grid, how-it-works scroll line, enterprise section with quote form, pricing cards with toggle, tracking preview, before and after slider, testimonials, FAQ, final call-to-action
- [x] Kutus content: providers across Ngomongo, Diaspora, Gitwe, Mjini, Soko, Joslian, Executive, Leisure, Spenza, Summer Gardens and Maanet; placeholder orders and availability; notifications at different sections (rider availability, laundry companies free); contact via WhatsApp 0756577743 and Instagram (owner to provide handle)
- [x] Pricing display: delivery fee KES 50-150 depending on location and load; average KES 40 per kg with different provider rates
  - Built as `apps/web/src/components/landing/*` (hero, trust-bar, services-bento, how-it-works-line, enterprise, pricing, tracking-preview, before-after, testimonials, faq, final-cta) assembled in `app/page.tsx`. Instagram link still pending the owner's handle.

### R3: Customer experience - DONE 2026-10-13

- [x] Sign-up, address pin with landmark note, provider list and map with glass overlays, provider detail, booking dialog, price breakdown, payment, order tracker (5 customer stages: Booked, Picked up, Cleaning, On the way, Delivered), rating
  - Sign-up: customers pick Kutus area, street and optional landmark; stored once at sign-up.
  - Providers page: map + list split view with glass overlay card; Google Maps loads when NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set, otherwise a graceful area-chip fallback; search and sort are functional.
  - Provider detail: booking dialog with service/weight/date/time, full price breakdown, M-Pesa STK Push simulation, confirmation linking to /orders/[id].
  - Order tracker: five-stage timeline with timestamps, rider card with WhatsApp, delivery address with landmark, price breakdown, rating form.
  - Instagram handle still pending from the owner.

### R4: Provider, rider and admin screens

- [ ] Restyle only the screens that exist. Dense data tables stay clean and readable, with glass used sparingly (cards and overlays, not table cells).

### R5: Polish

- [ ] Accessibility pass, performance pass on mobile, empty, loading and error states, final animation tuning
