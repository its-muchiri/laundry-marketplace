# SPEC.md

## What we are building

A laundry marketplace for Kenya. Customers book a nearby laundry provider. A rider picks up the dirty laundry, the provider cleans it, a rider returns it. Customers pay with M-Pesa. The first launch is ONE town with Bronze-tier providers only.

## Roles

- **Customer:** books, pays, tracks, rates.
- **Provider:** lists services, accepts orders, weighs and cleans, marks ready.
- **Rider:** accepts pickup and delivery jobs, photographs items, gets paid per leg.
- **Admin:** approves providers and riders, resolves disputes, monitors orders.

## MVP scope (build this)

- Sign-up with phone OTP and email.
- Address as map pin plus a required landmark note.
- Provider onboarding with documents; admin approval before going live.
- Rider onboarding with documents; admin approval before going live.
- Provider service menu (per kg and per piece), capacity, hours, turnaround, radius coverage.
- Discovery: list and map, distance filter, provider cards. PostGIS for filtering; Routes API only for the top results.
- Order flow with the state machine in docs/ARCHITECTURE.md.
- Estimated price authorised at booking; final price after weighing; customer approval if more than 15% above the estimate.
- Delivery fee per leg: base fee + (road km x per-km rate) + peak surcharge.
- Payments: M-Pesa STK Push; funds held until delivery; payouts to providers and riders by M-Pesa B2C after the dispute window.
- Dispatch: offer each job to one rider at a time (nearest first) for about 30 seconds, then the next, then widen the radius.
- Photos and item counts at pickup, provider intake and drop-off; bag tag or QR code per order.
- Cancellations, refunds and basic disputes as defined in docs/PRD.md.
- Ratings: customer rates provider and rider.
- Notifications: SMS and push.
- Admin dashboard: approvals, live orders, disputes, payment ledger, fee settings.

## Out of scope for the MVP

Silver and Gold tiers, polygon coverage zones, scored rider dispatch, card payments, live GPS map, WhatsApp, featured placements, per-zone pricing, insurance, Swahili, cash on delivery.

## Money rules

- Currency is KES. Store integer cents.
- Customer total = laundry subtotal + delivery fee + optional service fee.
- Provider commission is 15% of the laundry subtotal at Bronze, deducted from the provider payout.
- The platform keeps 10 to 20% of each delivery fee (setting in admin).
- Final fee numbers are admin settings, not hard-coded.

## Open questions (ask me before building the related part)

- Which town is the pilot?
- Customer service fee at launch: yes or no?
- Base fee, per-km rate, peak surcharge, platform share of delivery fee?
- Card provider choice (Paystack, Flutterwave or Pesapal) for Phase 2?
- Compensation cap per item and per order, and the claim window?
- Is Stripe Connect really unavailable for this setup?
