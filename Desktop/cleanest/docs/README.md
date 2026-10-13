# README.md

A location-based laundry marketplace for Kenya. Customers book a nearby provider; riders collect and return the clothes. Status: pre-launch, building the MVP (see docs/PLAN.md).

## Requirements

- Node.js 20 or newer
- PostgreSQL 15 or newer with the PostGIS extension
- A Google Cloud project with Maps JavaScript, Places, Geocoding and Routes APIs enabled
- Safaricom Daraja sandbox credentials
- Africa's Talking sandbox account and a Firebase project (for SMS and push)

## Setup

```bash
git clone <repo-url> && cd laundry-marketplace
npm install
```

Copy `.env.example` to `.env` and fill in the values below.

Create the database and enable PostGIS: `CREATE EXTENSION postgis;`

```bash
npm run db:migrate
npm run db:seed  # adds sample providers and riders for one town
npm run dev:api  # and, in another terminal:
npm run dev:web
```

## Environment variables

Never commit `.env`.

| Name | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Signs login tokens |
| `GOOGLE_MAPS_BROWSER_KEY` | Restricted key for the web app (Maps JS, Places) |
| `GOOGLE_MAPS_SERVER_KEY` | Server-only key (Geocoding, Routes) |
| `MPESA_CONSUMER_KEY`, `MPESA_CONSUMER_SECRET` | Daraja credentials |
| `MPESA_SHORTCODE`, `MPESA_PASSKEY` | STK Push settings |
| `MPESA_CALLBACK_URL` | Public URL Daraja calls back |
| `CARD_PROVIDER_SECRET` | Card provider secret key |
| `AT_USERNAME`, `AT_API_KEY` | Africa's Talking SMS |
| `FIREBASE_SERVICE_ACCOUNT` | Push notifications |
| `APP_ENV` | development, staging or production |

## Scripts

- `npm run dev:api`, `npm run dev:web`: run locally
- `npm test`: run all tests
- `npm run lint && npm run typecheck`: code checks
- `npm run db:migrate`: apply database migrations

## Docs

- docs/PRD.md: full product requirements
- docs/SPEC.md: short spec
- docs/ARCHITECTURE.md: system design
- docs/DESIGN.md: UI rules
- docs/SECURITY.md: security rules
- docs/DECISIONS.md: why we chose what we chose
- docs/PLAN.md: tasks and progress
- CHANGELOG.md: what changed
