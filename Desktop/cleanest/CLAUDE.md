# CLAUDE.md

## Project

Laundry marketplace for Kenya. Customers book a nearby laundry provider; riders handle pickup and return. Roles: customer, provider, rider, admin. Full requirements: docs/PRD.md. Short spec: docs/SPEC.md.

## Read first

docs/SPEC.md, docs/ARCHITECTURE.md, docs/DESIGN.md, docs/SECURITY.md, docs/DECISIONS.md, docs/PLAN.md

## Stack

- Customer web app: Next.js (React, TypeScript), PWA
- Rider app: React Native or Flutter (see docs/DECISIONS.md)
- Backend: Node.js with NestJS (TypeScript), WebSocket gateway for live location
- Database: PostgreSQL with PostGIS
- Maps: Google Maps JavaScript API, Places, Geocoding, Routes API
- Payments: M-Pesa Daraja (STK Push, B2C) plus one card provider
- Messaging: Africa's Talking (SMS), Firebase (push)

## Repo layout

- apps/web: customer PWA and dashboards
- apps/rider: rider app
- apps/api: backend
- packages/shared: shared types and constants (order states, fee rules)
- docs/: all project documents

## Commands

- Install: `npm install`
- Run API: `npm run dev:api`
- Run web: `npm run dev:web`
- Test: `npm test`
- Lint and typecheck: `npm run lint && npm run typecheck`
- Migrate database: `npm run db:migrate`

## Rules

- Build only what the current milestone in docs/PLAN.md asks for. MVP scope only; Phase 2 and 3 items are out of scope.
- Money is stored as integer cents of Kenya shillings (KES x 100). Never use floats for money.
- Prices, distances, order state changes and payouts are calculated and validated on the server only.
- Order states change only through the state machine in apps/api. No direct status updates anywhere else.
- Use PostGIS for distance filtering. Call the Google Routes API only for the top 10 to 20 results or the selected provider, and cache the result.
- Store coordinates once at sign-up. Do not geocode the same address twice.
- Never commit secrets. Use environment variables and keep .env.example current.
- Never log phone numbers, ID numbers, payment details or exact customer addresses.
- Write a test for every pricing, state-machine and payment rule.
- Keep functions small. Prefer plain, readable code over clever code.

## Do not

- Add dependencies without telling me why.
- Rewrite files that are not part of the current task.
- Delete or weaken tests to make them pass.
- Make up answers to legal, tax or payment questions. Ask me.

## Always, after a task

- Update docs/PLAN.md (tick tasks), CHANGELOG.md, and docs/DECISIONS.md if a choice was made.
