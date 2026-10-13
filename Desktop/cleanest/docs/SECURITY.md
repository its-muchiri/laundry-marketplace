# SECURITY.md

## Secrets

- Never commit API keys, passwords, tokens or `.env` files. Keep `.env` in `.gitignore`.
- Use two Google keys: a browser key restricted by website and API, and a server key restricted by IP. Never use the server key in client code.
- Rotate any key that is ever exposed, immediately.

## Authentication and access

- OTP codes expire quickly, are single use, and are rate limited per phone number and per IP.
- Role-based access on every endpoint: customer, provider, rider, admin. Check ownership too (a customer can only read their own orders).
- Short-lived access tokens; refresh tokens are revocable.
- Admin accounts require a second factor.

## Input and server rules

- Validate and sanitise all input on the server. Use parameterised queries only.
- Never trust prices, distances, states or amounts sent by a client. Recalculate on the server.
- Rate limit sign-up, login, OTP, search and order creation.
- HTTPS only. Set secure headers and strict CORS.

## Payments

- Card details never touch our servers; use the provider's hosted flow.
- M-Pesa and card callbacks are verified, idempotent and logged.
- Every money movement is a ledger entry with a reference and an idempotency key. Nothing is edited or deleted; corrections are new entries.
- Payouts are released only by the server after delivery and the dispute window. A dispute holds the payout.
- Reconcile the ledger against M-Pesa statements on a schedule.

## Personal data (Data Protection Act 2019)

- Register with the ODPC and publish a privacy policy (owner task).
- Collect consent for location and documents.
- Encrypt ID, licence and registration documents at rest; serve them only via signed, expiring URLs.
- Track rider location only while a job is active.
- Show customer address and phone only to the provider and rider assigned to that order, and only after acceptance.
- Never log phone numbers, ID numbers, payment details or full addresses.
- Support account deletion and data export requests.

## Uploads

- Limit file type and size; scan or re-encode images; store outside the web root; random file names.

## Operations

- Daily database backups with a tested restore.
- Dependency audit in CI; update vulnerable packages.
- Admin actions go to an audit log.
- Separate development, staging and production environments with separate keys.

## Before every release

- No secrets in the repo history
- All endpoints have auth and ownership checks
- Pricing and state rules covered by tests
- Payment callbacks verified and idempotent
- Documents encrypted; signed URLs expire
- Rate limits on OTP and login
- Backup restore tested
