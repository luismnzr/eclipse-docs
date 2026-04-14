# Introduction

Eclipse is a white-label studio management platform built for boutique fitness businesses — yoga, Pilates, barre, cycling, and more. Each studio client gets their own fully independent instance with a custom-designed interface on top of a solid, functional base.

## What Eclipse Does

Eclipse gives three types of users everything they need:

**For studio owners (admin):** A complete management tool — classes, packages, subscriptions, reservations, revenue tracking, user management, and a retail shop.

**For students:** A clean interface to browse classes, buy packages or subscriptions, make reservations, join waitlists, and manage their account.

**For teachers:** A focused view of their teaching schedule, class rosters, and attendance tracking.

## How It Works

Eclipse is a Ruby on Rails monolith. It's not a multi-tenant SaaS — each client gets their own cloned repository, their own Heroku app, their own database, and their own Stripe account. This architecture gives every studio full data isolation and the freedom to have a completely unique design.

The base application is intentionally minimal in its visual design (black-and-white, unstyled but fully functional). For each new client, a UI/UX designer applies a custom theme and design layer before deployment.

```
┌─────────────────────────────────────────────┐
│              Eclipse Base Repo               │
│  (black & white, fully functional)           │
└──────────┬──────────────┬───────────────────┘
           │              │
     ┌─────▼─────┐  ┌────▼──────┐
     │  Studio A  │  │  Studio B │  ...
     │  (custom   │  │  (custom  │
     │   design)  │  │   design) │
     │  Heroku    │  │  Heroku   │
     │  Postgres  │  │  Postgres │
     │  Stripe    │  │  Stripe   │
     └───────────┘  └───────────┘
```

## Core Concepts

| Concept | Description |
|---------|-------------|
| **StudioClass** | A scheduled class instance (date, time, capacity, teacher) |
| **ClassTemplate** | A reusable class definition (name, style, level) used to create StudioClasses |
| **Reservation** | A student's booking for a specific class |
| **Package** | A credit-based product (e.g., "10-Class Pack") that students purchase |
| **UserPackage** | A purchased package instance with credits and an expiration date |
| **ClassCredit** | Tracks individual credit usage per reservation |
| **SubscriptionPlan** | An unlimited access plan (monthly or annual) |
| **WaitlistEntry** | A student's position in line when a class is full |
| **StudioSetting** | Key-value configuration that drives studio behavior (timezone, cancellation policy, etc.) |

## Who This Documentation Is For

- **Developers** working on Eclipse (extending features, fixing bugs)
- **Designers** customizing client instances (theming, component overrides)
- **Ops / deployment** setting up new client instances on Heroku
- **Studio owners** who want to understand how their platform works under the hood

## Documentation Structure

| Section | What You'll Find |
|---------|-----------------|
| [Architecture](./architecture.md) | Tech stack, patterns, data model |
| [Getting Started](./getting-started.md) | Local development setup |
| [Configuration](./configuration.md) | Environment variables and studio settings |
| **Features** | |
| [Reservations](../features/reservations.md) | Booking, cancellation, and attendance |
| [Packages & Credits](../features/packages-and-credits.md) | Credit-based class packages |
| [Subscriptions](../features/subscriptions.md) | Unlimited access plans via Stripe |
| [Waitlist](../features/waitlist.md) | Waitlist logic and auto-promotion |
| [Integrations](../features/integrations.md) | Stripe, Wellhub, Postmark |
| [Theming](../features/theming.md) | Client customization and design system |
| [Admin Dashboard](../features/admin-dashboard.md) | Admin features and management tools |
| [Teacher Views](../features/teacher-views.md) | Teacher schedule and roster tools |
| **Operations** | |
| [Client Setup Guide](https://github.com/luismnzr/eclipse-v1/blob/main/docs/CLIENT_SETUP_GUIDE.md) | Step-by-step new client setup |
| [Deployment Guide](https://github.com/luismnzr/eclipse-v1/blob/main/docs/DEPLOYMENT_GUIDE.md) | Production deployment checklist |
