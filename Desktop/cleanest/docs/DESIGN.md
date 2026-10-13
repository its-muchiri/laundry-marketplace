# DESIGN.md

## Principles

- Mobile first. Most users are on phones with variable 4G, so pages must be light and fast.
- One clear action per screen. The main button is always obvious.
- Show price and delivery time before asking for payment. No surprises.
- Plain language. English at launch; keep all text in a translation file for Swahili later.
- Accessible: contrast ratio of at least 4.5:1, tap targets at least 44px, visible focus states.

## Design tokens (starting palette, change to your brand)

- Primary: #0E7C86 (teal)
- Primary dark: #0A5A62
- Accent: #F4A261 (warm orange, used sparingly for highlights)
- Success: #2E7D32
- Warning: #ED6C02
- Error: #C62828
- Text: #1F2933
- Muted text: #52606D
- Background: #FFFFFF
- Surface: #F5F7FA
- Border: #D9E2EC

## Typography

- Font: Inter or system sans-serif.
- Sizes: 14 (small), 16 (body), 20 (heading 3), 24 (heading 2), 32 (heading 1).
- Line height 1.5 for body text.

## Spacing and shape

- Spacing scale: 4, 8, 12, 16, 24, 32, 48.
- Corner radius: 8 for cards and inputs, 999 for pills.
- Shadows are light, used only on floating elements such as the map sheet.

## Core components

- Provider card: name, rating, distance, turnaround, price hint, tag pills.
- Map with pins, a list or map toggle, and a bottom sheet on mobile.
- Order status tracker: the 11 steps simplified into 5 customer-friendly stages (Booked, Picked up, Cleaning, On the way, Delivered).
- Price breakdown: subtotal, delivery fee, service fee, total. Show estimated versus final after weighing.
- Approval banner when the final price exceeds the estimate by more than 15%.
- Photo capture with item counter for riders.
- Empty, loading and error states for every list and screen.

## Screens to design first

- Customer: sign-up, address pin, provider list and map, provider detail, order summary, payment, tracking, rating.
- Provider: order queue, order detail, weigh and confirm, menu and capacity settings.
- Rider: job offer, job detail with navigation, photo and count, earnings.
- Admin: approval queue, live orders, disputes, settings.

## Maps

- Custom pin only for the user and for providers at MVP. Tier-styled pins arrive with Silver and Gold.
- Always show the landmark note next to the pin on the order screen.
