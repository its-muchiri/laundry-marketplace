# Laundry Marketplace PRD

Oct 11, 2026 · @claude

## 1. Overview

This is a location-based laundry marketplace for Kenya: customers book a nearby laundry provider, and a rider collects and returns the clothes. The first release targets one neighbourhood or town, with simple radius coverage and M-Pesa payments, before adding tiers, smart dispatch and polygons.

**The problem.** Laundry is time-consuming, good providers are hard to find and trust, and pickup and delivery is arranged informally over WhatsApp with no tracking, no price certainty and no recourse when clothes are damaged or lost.

Three user groups, one marketplace:

- Platform team: an admin team verifies providers and riders, resolves disputes and monitors orders.

## 2. Goals, non-goals and success metrics

The first launch aims to prove that one town can sustain repeat laundry orders with reliable pickup and delivery, at a margin that covers costs.

**Goals**

- Complete orders end to end (book, pay, pick up, clean, deliver) with M-Pesa.
- Give customers a clear price before and after weighing, with approval for large changes.
- Keep Google Maps costs low by using PostGIS first and paid routing only where needed.
- Build trust through photos, item counts, ratings and a defined dispute process.

**Non-goals for launch**

- Custom polygon coverage zones, Silver and Gold tiers, and smart rider scoring.
- Ads and featured placements.
- Expansion beyond one town or neighbourhood.

**Targets (to confirm with the business owner)**

## 3. Scope by phase

The MVP covers the smallest set of features that completes a paid order safely; everything else waits for real order data.

## 4. Onboarding flows

Each role signs up differently, and providers and riders cannot take orders until an admin approves them.

**Customer**

- Sign-up: phone number with OTP (primary), email, and later Google or Apple login.
- Address: the customer types an address with autocomplete, then drops or drags a map pin. Because many Kenyan locations have no formal address, the pin plus a landmark note (for example, the gate colour or the nearest shop) is required, and the rider can call the customer.
- Preferences: saved addresses and wash preferences such as hypoallergenic detergent or hang dry.

**Laundry provider**

- Facility location: pin the facility on a map. MVP coverage is a delivery radius; custom polygons come in Phase 2.
- Verification: business registration, KRA PIN, facility photos and owner ID. An admin approves before the provider goes live.
- Service menu: items priced per kg (wash and fold), per piece (dry cleaning), ironing only, and specialty items.
- Operating settings: daily capacity, opening hours, turnaround time, and an auto-accept toggle.
- Payout details: M-Pesa number or bank account, verified with a small test payout.

**Rider**

- Identity and vehicle: national ID, driving licence, vehicle type (bike, scooter, van) and registration, and a background check.
- Payout details: M-Pesa number for per-trip or daily earnings.
- Training: a short guide on photographing items at pickup, counting items and handling no-show customers.
- Device: the rider uses the native app so location tracking works in the background.

## 5. Discovery: search, map and filters

The main screen shows a list and an interactive map side by side, and it must stay cheap to run: Google is called for a few results, not for every provider.

- Search: address, neighbourhood or landmark autocomplete, plus search by provider or item.
- List and map views: provider cards on one side and map markers on the other. Tier-styled pins arrive with Silver and Gold in Phase 2.
- Categories: Wash and Fold, Dry Cleaning, Ironing and Pressing, Specialty.
- Tags: Eco-friendly, Same-day, Stain specialist.
- Filters: distance (under 2, 5 or 10 km), turnaround (under 12, 24 or 48 hours), rating (4 stars and above), price range, and tier (Bronze, Silver, Gold).

**Distance logic (cost control)**

- Filter and sort with PostGIS. Straight-line distance finds all providers within the search radius with no API calls.
- Call the Routes API only for the top 10 to 20 results, or for the provider the customer selects, to show real road distance and travel time.
- Cache results for repeated customer and provider pairs, and store coordinates at sign-up so geocoding is not repeated.
- Use the Routes API (route matrix) rather than the legacy Distance Matrix API.

**Requirements**

- Search results load in under 2 seconds on a mobile connection.
- A provider outside its own delivery radius never appears for that customer.
- Providers at full daily capacity show as unavailable for that day.

## 6. Provider tier system

All providers start as Bronze at launch; Silver and Gold arrive in Phase 2 once there is enough order and rating data. Tiers are evaluated on a rolling 30 days using provider ratings, which are collected from the first order.

**Rules to define before Phase 2:**

- Promotion: a provider moves up after meeting the next tier's thresholds for the full 30-day window.
- Demotion: a provider drops one tier after two consecutive review periods below the current tier's thresholds, with a warning after the first.
- Minimum ratings: a tier needs at least 10 rated orders before the rating threshold counts.
- Terminology: the commission cut is a tier discount, not a volume discount.
- Featured placements: state clearly whether Gold's perk waives commission on ad placement fees or on orders (open question).

## 7. Order lifecycle

Every order moves through the same states in the same order, and the backend enforces each transition so the app can never skip a step.

The main flow runs from placed to completed in a snake, with the weighing step as the control point for price changes. Cancelled and disputed can interrupt the flow, and disputed holds the payout.

**Rules for the state machine**

- Only the allowed actor can trigger a transition: the provider accepts and weighs, the rider picks up and delivers, the customer approves price changes.
- Every transition stores a timestamp, the actor and the location, which feeds disputes and rider on-time metrics.
- Pickup, intake and drop-off each require photos and an item count before the state advances.
- A price change of more than 15% pauses the order until the customer approves or cancels.

## 8. Pricing, fees and payments

The customer pays in Kenya shillings (KES), funds are held until delivery is confirmed, and the platform earns from provider commission and a share of the delivery fee.

**Customer total**

Total = Laundry subtotal + Delivery fee + Service fee

The service fee is a small flat amount shown separately. It is separate from the provider commission, which is taken from the provider's side and never added to the customer's bill. Decision needed: whether to charge a service fee at launch or rely on commission and the delivery margin alone.

**Delivery fee**

- Each leg (pickup, return) is priced separately, because different riders may handle each leg.
- Leg fee = Base fee + (Road km x Per-km rate) + Peak surcharge.
- Road distance comes from the Routes API, calculated once at booking and stored.
- The rider's unpaid trip to the pickup point is covered by the base fee or a minimum fare.
- The platform keeps 10 to 20% of each delivery fee to cover Maps, payment fees and support, rather than passing 100% to the rider.

**Weight-based pricing**

- The customer gives an estimated weight, and the platform authorises the estimated total.
- The provider weighs the clothes at intake and records the final weight.
- If the final price is within 15% of the estimate, it is charged automatically.
- If it exceeds the estimate by more than 15%, the customer must approve before processing continues.
- If it comes in lower, the difference is refunded.

**Payments**

Stripe Connect is removed from the plan because it is, as far as I know, not available for onboarding Kenyan businesses; confirm this before relying on any alternative.

**Revenue model**

- Provider commission: 15% of the laundry subtotal at Bronze (13% Silver, 10% Gold), deducted from the provider payout.
- Delivery margin: 10 to 20% of each delivery fee.
- Optional service fee: a small flat fee per order (see decision above).

## 9. Rider dispatch and scoring

The platform offers each job to one rider at a time instead of broadcasting to everyone, which avoids races and rider frustration.

**Dispatch flow**

- Once the provider accepts, find available riders inside the starting radius using PostGIS.
- Rank them (simple nearest-first at launch, scored from Phase 2).
- Offer the job to the top rider for about 30 seconds.
- If declined or timed out, offer to the next rider.
- After a set number of misses, widen the radius, then alert an admin.

**Rider score (Phase 2)**

Every input is normalised to a 0 to 1 scale so the weights mean what they say.

Score = 0.30 x (Rating/5) + 0.30 x OnTimeRate + 0.25 x (1 - ETA/MaxETA) + 0.15 x AcceptanceRate

- Rating: customer rating after each leg, 1 to 5.
- On-time rate: share of legs delivered within the quoted ETA plus a grace window.
- ETA: road travel time to the pickup point from the Routes API, with MaxETA being the largest in the candidate pool.
- Acceptance rate: offers accepted out of offers received in the rider's area.
- New riders start with a neutral default score (for example 0.7) for their first 10 jobs so they are not buried.
- The weights above are a starting proposal and should be tuned with real data.

**Rider requirements**

- Each leg is a separate job with its own fee, so a different rider can do pickup and return.
- The rider captures photos and item counts at pickup and drop-off.
- A rider who arrives and finds no one home waits a set time, logs a call attempt, and is paid a no-show fee under the cancellation policy.

## 10. Trust and safety

Damage and loss are the biggest trust risks in laundry, so the platform records evidence at every handover and defines who pays before anything goes wrong.

**Handling and evidence**

- Photos and an item count at pickup, at provider intake and at drop-off.
- A bag tag or QR code on every order, scanned at each handover.
- A compensation cap per item and per order stated in the terms, with a claim window of 24 to 48 hours after delivery.

**Cancellations, refunds and disputes**

Disputes go to the admin dashboard with all photos, messages and timestamps. Payouts for that order stay on hold until the dispute is resolved.

**Ratings**

- Customers rate the provider and the rider after delivery. Provider ratings drive tiers.
- Providers and riders may flag problem customers, reviewed by an admin.
- Reviews can be reported, and admins can remove abusive ones.

## 11. Notifications and admin dashboard

Customers, providers and riders are told about every order change, and a small admin team runs verification, disputes and monitoring from one dashboard.

**Notifications**

SMS uses Africa's Talking, push uses Firebase, and WhatsApp is added in Phase 2.

**Admin dashboard**

- Approve or reject provider and rider applications, with document review.
- Live order board with filters by status, provider and rider.
- Dispute and claim queue with evidence photos and a decision log.
- Payment ledger, held funds, refunds and payout reconciliation.
- Suspend or reactivate providers, riders and customers.
- Adjust fees, radius, peak surcharges and cancellation rules without a code change.
- Export reports of orders, revenue, ratings and cancellations.

## 12. Technical architecture and data model

The customer web app, rider app and dashboards all talk to one Node.js backend, which owns business logic, the order state machine and real-time location, and uses PostGIS so Google Maps is called only when needed.

The backend is the only component that talks to the database and to third-party services, so prices, distances and states are always checked on the server.

**Technology choices**

- Customer app: React with Next.js as a PWA, using the Google Maps JavaScript API and Places autocomplete.
- Rider app: React Native or Flutter, because background GPS tracking is unreliable in a mobile browser.
- Backend: Node.js (NestJS or Express) with a WebSocket gateway for live rider coordinates.
- Database: PostgreSQL with PostGIS. Store locations as geometry points (SRID 4326) and cast to geography, or use a metric projection, when you need distances in metres.
- Maps APIs: Places (autocomplete), Geocoding (address to coordinates, run once and stored), Routes API (road distance and traffic-aware ETA).
- Messaging: Africa's Talking for SMS, Firebase for push, WhatsApp in Phase 2.

**Key data tables**

See docs/ARCHITECTURE.md.

## 13. Compliance, security and non-functional requirements

The platform stores ID documents, payment records and live locations, so data protection and payment security are launch requirements, not later extras. This is general guidance, not legal advice; a Kenyan advocate should review it.

**Compliance**

- Data Protection Act 2019: register with the Office of the Data Protection Commissioner (ODPC), publish a privacy policy, collect consent for location and documents, and honour deletion requests.
- Documents: encrypt IDs, licences and registration documents at rest and serve them only through signed, expiring URLs.
- Location data: track riders only while on a job, and keep customer addresses private until an order is accepted.
- Payments: use the provider's hosted flows so card details never touch the platform, and keep a full audit ledger.
- Terms and policies: terms of service, rider and provider agreements, a compensation policy and a cancellation policy.
- Tax and licensing: confirm VAT, withholding and business licence obligations with an accountant.

**Security**

- All API traffic over HTTPS, with role-based access (customer, provider, rider, admin).
- No API keys or secrets in the code repository; use environment variables and a secrets manager.
- Rate limiting and OTP abuse protection on sign-up and login.
- Server-side checks on every price, distance and status change; never trust the client.

**Non-functional requirements**

| User | What they need | What they give the platform |
| --- | --- | --- |
| Customer | Fast booking, clear price, tracking, safe handling of clothes | Orders and ratings |
| Laundry provider | Steady orders, fair fees, simple order management | Capacity, service menu, quality |
| Rider | Predictable earnings, fair job offers, easy payouts | Pickup and delivery capacity |

| Metric | Launch target | Why it matters |
| --- | --- | --- |
| Orders completed per week | 100 by week 8 | Proves demand |
| Repeat customer rate (30 days) | 35% | Proves satisfaction |
| On-time delivery | 90% | Core promise |
| Order cancellation rate | Below 8% | Operational health |
| Damage or loss claims | Below 1% of orders | Trust |
| Average rider pickup wait | Under 15 minutes | Dispatch quality |
| Contribution margin per order | Above zero after payment and Maps fees | Viability |

| Feature | MVP (launch) | Phase 2 | Phase 3 |
| --- | --- | --- | --- |
| Customer sign-up | Phone OTP, email | Google, Apple login | Saved wash preferences |
| Address entry | Map pin plus landmark note | Multiple saved addresses | Gate and apartment fine-tuning |
| Provider coverage | Radius from facility | Custom polygons | Per-zone pricing |
| Discovery | List and map, distance filter | Turnaround, price, rating filters | Category cards, tags |
| Provider tiers | Bronze only | Silver and Gold, 30-day review | Featured placements |
| Payments | M-Pesa STK Push, held until delivery | Cards (Paystack, Flutterwave or Pesapal) | Cash on delivery review |
| Rider dispatch | Sequential offers to nearest rider | Normalised score ranking | Batching and peak pricing |
| Tracking | Order status plus rider location at key steps | Live GPS map | ETA accuracy reporting |
| Trust and safety | Photos, item count, bag tags, basic disputes | Compensation workflow | Insurance partner |
| Ratings | Customer rates provider and rider | Provider rates customer | Reputation scoring |
| Notifications | SMS, push | WhatsApp | Marketing messages |
| Admin | Verification, orders, disputes | Payout reconciliation | Analytics |
| Apps | Customer PWA, rider mobile app | Provider mobile app | Native customer app |

| | Bronze | Silver | Gold |
| --- | --- | --- | --- |
| Entry | New, or under 50 orders a month | 50 to 200 orders, rating 4.2 or above, cancellations under 3% | Over 200 orders, rating 4.7 or above, cancellations under 1% |
| Commission | 15% | 13% | 10% |
| Visibility | Standard sorting and pin | Priority sorting, styled pin | Featured section, gold pin |
| Perks | Standard dashboard | Analytics, priority support | Custom branding, discounted featured placements |

| Need | Approach |
| --- | --- |
| Customer payment | M-Pesa STK Push through the Daraja API |
| Card payments | Paystack, Flutterwave or Pesapal |
| Holding funds | Platform holds payment until delivery is confirmed (escrow-style ledger) |
| Provider payout | M-Pesa B2C or bank transfer, after delivery and a short dispute window |
| Rider payout | M-Pesa B2C, per trip or daily |
| Refunds | Back to the original payment method through the same provider |

| Situation | Default outcome (to confirm) |
| --- | --- |
| Customer cancels before rider assignment | Full refund |
| Customer cancels after rider assigned | Refund minus a small cancellation fee paid to the rider |
| Rider arrives, customer not available | Customer charged a no-show fee, order rescheduled or cancelled |
| Provider rejects order after pickup | Full refund, rider paid for the trip, provider penalised |
| Provider misses turnaround time | Customer notified, partial refund of delivery fee if late beyond a threshold |
| Item damaged or lost | Claim reviewed by admin using photos and counts, paid up to the cap |

| Event | Customer | Provider | Rider |
| --- | --- | --- | --- |
| Order placed | SMS, push | Push, SMS | |
| Order accepted or rejected | SMS, push | | |
| Rider assigned or en route | SMS, push | | Push |
| Picked up and at provider | Push | Push | |
| Weighed, price changed | SMS, push (approval needed if over 15%) | | |
| Ready for delivery | SMS, push | | Push |
| Delivered | SMS, push | Push | Push |
| Payout sent | | SMS | SMS |

| Area | Target |
| --- | --- |
| Page load on 4G | Under 3 seconds |
| API response (p95) | Under 500 ms |
| Availability | 99.5% monthly |
| Offline tolerance | Riders can queue photo uploads and status updates when the signal drops |
| Backups | Daily database backup, tested restore |
| Languages | English at launch, Swahili in Phase 2 |
