# ARCHITECTURE.md

## Overview

Three clients (customer PWA, rider app, web dashboards) talk to one Node.js (NestJS) backend over REST and WebSocket. The backend is the only component that touches the database and third-party services.

## Components

- apps/web: Next.js PWA for customers; web dashboards for providers and admins.
- apps/rider: React Native or Flutter. Native because background GPS is unreliable in a browser.
- apps/api: NestJS modules: auth, users, providers, riders, orders (state machine), pricing, dispatch, payments (ledger), live-location (WebSocket), notifications, admin.
- PostgreSQL + PostGIS: all data and spatial queries.
- Third parties: Google Maps (Places, Geocoding, Routes), M-Pesa Daraja, a card provider (Phase 2), Africa's Talking (SMS), Firebase (push).

## Order state machine

Main flow: placed > accepted > rider_assigned > picked_up > at_provider > weighed > processing > ready > out_for_delivery > delivered > completed.

Exit states: cancelled, disputed.

Rules:

- Only the allowed actor can trigger each transition: provider accepts, weighs and marks ready; rider picks up and delivers; customer approves price changes and cancels.
- Every transition writes an order_events row: time, actor, location, photos.
- Pickup, intake and drop-off need photos and an item count before the state advances.
- If the final price is more than 15% above the estimate, the order pauses at weighed until the customer approves or cancels.
- Payout is released only after completed plus the dispute window. A dispute holds the payout.

## Distance and cost control

- Filter and sort providers with PostGIS (ST_DWithin on geography, or a metric projection).
- Call the Routes API only for the top 10 to 20 results or the selected provider.
- Cache road distance for repeated customer and provider pairs.
- Store coordinates when an address is saved. Never geocode the same address twice.

## Pricing

- Customer total = laundry subtotal + delivery fee + optional service fee.
- Leg fee = base fee + (road km x per-km rate) + peak surcharge. Each leg is priced separately.
- Provider commission: 15% of laundry subtotal at Bronze, taken from the provider payout.
- Platform keeps 10 to 20% of each delivery fee. All fee values are admin settings.
- Money is integer KES cents.

## Dispatch (MVP)

Offer the job to the nearest available rider for about 30 seconds. If declined or timed out, offer to the next. After a set number of misses, widen the radius, then alert an admin.

## Data model (core tables)

- users: id, role, phone, email, verification_status
- addresses: user_id, point (geometry, 4326), landmark_note, label
- providers: user_id, facility_point, radius_m, hours, daily_capacity, tier, payout_details
- service_items: provider_id, name, unit (kg or piece), price_cents, turnaround_hours
- riders: user_id, vehicle_type, documents, available, current_point
- orders: customer_id, provider_id, state, est_price_cents, final_price_cents, approval_required
- order_items: order_id, service_item_id, quantity or weight
- order_legs: order_id, kind (pickup or return), rider_id, road_distance_m, fee_cents, status
- order_events: order_id, from_state, to_state, actor_id, at, point, photo_urls
- payments and ledger_entries: order_id, type (charge, hold, refund, commission, payout), amount_cents, provider_ref, idempotency_key
- ratings: order_id, rater_id, target_id, stars, comment
- disputes: order_id, opened_by, evidence, decision, amount_cents
- settings: key, value (fees, radius, thresholds)

## Conventions

- Shared types and constants (states, fee rules) live in packages/shared.
- Every payment callback is idempotent.
- Admin actions are written to an audit log.
