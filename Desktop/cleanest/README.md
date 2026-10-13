# Laundry Marketplace Kenya

A location-based laundry marketplace for Kenya. Customers book a nearby provider; riders collect and return the clothes. Status: pre-launch, building the MVP.

## Tech Stack

- **API**: NestJS (Node.js 20) with TypeORM, PostgreSQL + PostGIS
- **Web App**: Next.js 14 PWA with Tailwind CSS
- **Rider App**: React Native / Expo 51
- **Shared**: TypeScript types, constants, enums
- **Database**: PostgreSQL 15+ with PostGIS extension
- **Payments**: M-Pesa Daraja STK Push (Safaricom)
- **SMS**: Africa's Talking
- **Push**: Firebase Cloud Messaging
- **Maps**: Google Maps Platform (Maps JS, Places, Geocoding, Routes)
- **CI/CD**: GitHub Actions with Docker

## Project Structure

```
laundry-marketplace/
├── apps/
│   ├── api/          # NestJS backend API
│   ├── web/          # Next.js customer PWA
│   └── rider/        # Expo rider app
├── packages/
│   └── shared/       # Shared TypeScript types
├── docs/             # Documentation
├── .github/
│   └── workflows/    # CI/CD pipelines
├── docker-compose.yml
└── package.json      # Root workspace config
```

## Requirements

- Node.js 20+
- PostgreSQL 15+ with PostGIS
- Docker & Docker Compose (optional)
- Google Cloud project with Maps APIs enabled
- Safaricom Daraja sandbox credentials
- Africa's Talking sandbox account
- Firebase project

## Quick Start

### Using Docker (Recommended)

```bash
# Clone and enter directory
git clone <repo-url> && cd laundry-marketplace

# Copy environment file
cp .env.example .env
# Edit .env with your credentials

# Start all services
docker-compose up -d

# Run migrations
docker-compose exec api npm run db:migrate

# Seed sample data
docker-compose exec api npm run db:seed
```

### Local Development (without Docker)

```bash
# Install dependencies
npm install

# Start PostgreSQL with PostGIS locally
# Create database: CREATE DATABASE laundry_marketplace;
# Enable PostGIS: CREATE EXTENSION postgis;

# Copy and configure environment
cp .env.example .env

# Run migrations
npm run db:migrate

# Seed data
npm run db:seed

# Start API (terminal 1)
npm run dev:api

# Start Web (terminal 2)
npm run dev:web

# Start Rider (terminal 3)
cd apps/rider && npm start
```

## Environment Variables

See `.env.example` for all required variables. Key categories:

- **Database**: `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`
- **JWT**: `JWT_SECRET`, `JWT_ACCESS_EXPIRY`, `JWT_REFRESH_EXPIRY`
- **Money**: All amounts in KES cents (e.g., `10000` = KES 100.00)
- **Google Maps**: `GOOGLE_MAPS_API_KEY` (browser), `GOOGLE_MAPS_SERVER_KEY` (server)
- **M-Pesa**: `MPESA_CONSUMER_KEY`, `MPESA_CONSUMER_SECRET`, `MPESA_SHORTCODE`, `MPESA_PASSKEY`
- **Africa's Talking**: `AFRICAS_TALKING_USERNAME`, `AFRICAS_TALKING_API_KEY`
- **Firebase**: `FIREBASE_PROJECT_ID`, `FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL`

## Available Scripts

```bash
# Development
npm run dev:api      # Start API with hot reload
npm run dev:web      # Start Next.js dev server
npm run dev:rider    # Start Expo dev server

# Building
npm run build        # Build all workspaces
npm run build:api    # Build API only
npm run build:web    # Build Web only

# Testing
npm run test         # Run all tests
npm run test:api     # Run API tests
npm run test:web     # Run Web tests

# Code Quality
npm run lint         # Lint all workspaces
npm run typecheck    # TypeScript type checking

# Database
npm run db:migrate   # Run migrations
npm run db:seed      # Seed sample data
```

## API Endpoints

Base URL: `http://localhost:3001/api/v1`

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/verify-otp` - Verify phone OTP

### Customers
- `GET /providers` - List nearby providers (with PostGIS distance)
- `GET /providers/:id` - Provider details
- `POST /orders` - Create order
- `GET /orders` - List customer orders
- `GET /orders/:id` - Order details with tracking

### Providers
- `POST /providers/onboard` - Provider onboarding
- `GET /providers/me` - Provider dashboard
- `PATCH /providers/me` - Update provider profile

### Riders
- `GET /riders/jobs/available` - Available jobs nearby
- `POST /riders/jobs/:id/accept` - Accept job
- `POST /riders/legs/:id/start` - Start leg
- `POST /riders/legs/:id/complete` - Complete leg with photos

### Payments
- `POST /payments/mpesa/stk-push` - Initiate M-Pesa STK Push
- `POST /payments/mpesa/callback` - M-Pesa callback
- `GET /payments/history` - Payment history

### Admin
- `GET /admin/dashboard` - Admin dashboard stats
- `GET /admin/providers/pending` - Pending provider approvals
- `GET /admin/riders/pending` - Pending rider approvals
- `PATCH /admin/settings` - Update platform settings

## Database Schema

Key tables with PostGIS geometry columns:
- `users` - All users (customers, providers, riders, admins)
- `addresses` - Customer addresses with `location` (POINT)
- `providers` - Provider facilities with `location` (POINT) and `service_radius_km`
- `riders` - Riders with `current_location` (POINT)
- `orders` - Orders with status state machine
- `order_legs` - Pickup and return legs
- `order_events` - Audit trail with `location` (POINT)
- `payments` - Payment records
- `ledger_entries` - Financial ledger
- `documents` - KYC documents
- `notifications` - User notifications
- `settings` - Platform configuration

## Milestones

See [PLAN.md](docs/PLAN.md) for detailed milestones:

- **Milestone 0**: Foundation (monorepo, TypeScript, PostGIS, CI, auth) ✅
- **Milestone 1**: Accounts & Onboarding
- **Milestone 2**: Discovery (PostGIS search, maps)
- **Milestone 3**: Orders & Pricing
- **Milestone 4**: Payments (M-Pesa)
- **Milestone 5**: Riders & Dispatch
- **Milestone 6**: Trust & Safety
- **Milestone 7**: Notifications & Admin
- **Milestone 8**: Hardening & Pilot Launch

## Deployment

### API
```bash
# Build Docker image
docker build -t laundry-api ./apps/api

# Run container
docker run -d -p 3001:3001 --env-file .env laundry-api
```

### Web (Vercel)
```bash
# Deploy to Vercel
vercel --prod
```

### Rider (Expo/EAS)
```bash
cd apps/rider
eas build --platform all
eas submit --platform all
```

## Security

- All amounts stored as integer KES cents
- JWT with short access tokens (15min) + refresh tokens (7d)
- bcrypt password hashing (cost 12)
- Rate limiting on auth endpoints
- CORS restricted to known origins
- Helmet.js security headers
- Input validation with class-validator
- SQL injection prevention via TypeORM

See [SECURITY.md](docs/SECURITY.md) for full checklist.

## Documentation

- [PRD](docs/PRD.md) - Product Requirements
- [SPEC](docs/SPEC.md) - Technical Specification
- [ARCHITECTURE](docs/ARCHITECTURE.md) - System Design
- [DESIGN](docs/DESIGN.md) - UI/UX Guidelines
- [DECISIONS](docs/DECISIONS.md) - Architecture Decisions
- [PLAN](docs/PLAN.md) - Milestones & Progress
- [CHANGELOG](docs/CHANGELOG.md) - Version History

## License

Proprietary - All rights reserved.