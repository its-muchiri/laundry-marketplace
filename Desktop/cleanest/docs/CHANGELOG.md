# CHANGELOG

All notable changes to this project are recorded here. Newest first.

Format: Added, Changed, Fixed, Removed, Security.

## [Unreleased]

### Added

- Track B R2 (marketing landing page): home page rebuilt as the marketing site with hero (live order-status glass card, area search), trust bar with count-up stats, services bento grid, how-it-works scroll line, enterprise section with WhatsApp-prefilled quote form, pricing cards with one-off/weekly toggle, interactive five-stage tracking preview, before/after slider, testimonials, FAQ accordion and final CTA. Kutus content, KES 40/kg average and KES 50-150 delivery range used throughout.
- Track B R1 (app shell): shared `SiteHeader` (GlassNavbar with logo, links, auth buttons), `SiteFooter` (brand, customer/provider/rider columns, WhatsApp 0756 577 743), `MobileMenu` (full-screen bottom sheet), `ThemeToggle` (light/dark, persisted, flash-free init), and a global Ctrl/Cmd+K command palette (pages + providers). Home, how-it-works, providers and provider-detail pages now use the shared shell instead of duplicated header/footer markup.
- Track B R0 (design system foundation, branch `redesign/cleanest-enterprise`):
  - Design tokens as CSS variables in `apps/web/src/styles/globals.css`: colour, radius, shadow, spacing, blur and motion; light and dark themes via the `.dark` class; reduced blur on mobile; solid fallback when backdrop-filter is unsupported; reduced-motion guards on decorative animation.
  - shadcn/ui core primitives in `apps/web/src/components/ui`: Button, Input, Card, Badge, Dialog, Drawer, Sheet, Tooltip, Toast, Tabs, Accordion, Command (Radix UI, cmdk, cva, clsx, tailwind-merge).
  - Glass components: GlassCard, GlassNavbar, ReededGlass, GlowOrbs.
  - Motion helpers: Reveal, Stagger, CountUp, HoverSheen (200-600ms, reduced-motion safe).
  - Brand source of truth `apps/web/lib/brand.ts`; app rebranded from LaundryKE to Cleanest Enterprise; provider dataset moved to Kutus areas (Ngomongo, Diaspora, Gitwe, Mjini, Soko, Joslian, Executive, Leisure, Spenza, Summer Gardens, Maanet); pricing display shows average KES 40/kg with provider variation and delivery fee as the KES 50-150 range.
  - `/design` gallery route showing every component, state and theme (development only).
- Project documentation converted from .docx to markdown (docs/*.md, plus CLAUDE.md at the repo root).
- Track B: Redesign (Cleanest Enterprise) milestones R0-R5 in docs/PLAN.md, with decision D13.
- Cleanest Enterprise brand image (logo and favicon artwork, owner-provided) at apps/web/public/logo.jpeg; wired into layout and favicon in R0.

## [0.1.0] - YYYY-MM-DD

### Milestone 0: Foundation

#### Added

- (the AI fills this in after Milestone 0)
