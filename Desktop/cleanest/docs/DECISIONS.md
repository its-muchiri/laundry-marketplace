# DECISIONS.md

Format: ID, date, decision, reason, status. Add new entries at the bottom. Never delete old ones; mark them superseded.

## D1: M-Pesa Daraja as the primary payment method

Date: 2026-10-11. Status: accepted.

Reason: M-Pesa is the dominant payment method in Kenya. Stripe Connect is, as far as we know, not available for onboarding Kenyan businesses (to be confirmed). Card payments through Paystack, Flutterwave or Pesapal come in Phase 2.

## D2: Customer funds are held until delivery

Date: 2026-10-11. Status: accepted.

Reason: protects customers and gives a dispute window before payouts.

## D3: PostGIS first, Google Routes API second

Date: 2026-10-11. Status: accepted.

Reason: straight-line filtering is free; paid road-distance calls are made only for the top 10 to 20 results or the selected provider, and cached. Use the Routes API, not the legacy Distance Matrix API.

## D4: Sequential rider offers, not broadcast

Date: 2026-10-11. Status: accepted.

Reason: broadcasting causes races and rider frustration. Offer to one rider for about 30 seconds, then the next.

## D5: Rider score uses normalised inputs (Phase 2)

Date: 2026-10-11. Status: accepted for Phase 2.

Reason: rating, on-time rate, proximity and acceptance are on different scales. Normalise each to 0 to 1 before weighting. New riders start with a neutral score.

## D6: Each delivery leg is priced separately

Date: 2026-10-11. Status: accepted.

Reason: different riders may handle pickup and return, and the rider's trip to the pickup point must be covered.

## D7: Platform keeps 10 to 20% of each delivery fee

Date: 2026-10-11. Status: proposed, owner to confirm.

Reason: Maps and payment fees would otherwise make logistics a loss.

## D8: Weight-based orders use estimate, then final price

Date: 2026-10-11. Status: accepted.

Reason: the true weight is known only after weighing. Customer approval is required if the final price is more than 15% above the estimate.

## D9: Rider app is native

Date: 2026-10-11. Status: accepted. Framework (React Native or Flutter) still to choose.

Reason: background GPS tracking is unreliable in a mobile browser.

## D10: MVP is one town, Bronze providers only, radius coverage only

Date: 2026-10-11. Status: accepted.

Reason: prove real demand and operations before adding tiers, polygons and scoring.

## D11: Money is stored as integer KES cents

Date: 2026-10-11. Status: accepted.

Reason: avoids floating point errors.

## D12: Landmark note is required with every map pin

Date: 2026-10-11. Status: accepted.

Reason: many Kenyan locations have no formal address.

## Open decisions

- ORM or query layer that works well with PostGIS.
- Rider app framework: React Native or Flutter.
- Card provider for Phase 2.
- Customer service fee yes or no.
