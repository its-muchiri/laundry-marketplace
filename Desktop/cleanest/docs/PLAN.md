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
