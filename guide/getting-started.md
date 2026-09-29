# Getting Started

Local development setup for the Eclipse base (`eclipse-v1`). To create a client instance instead, see [Creating a New Instance](./creating-an-instance.md).

## Prerequisites

| Dependency | Version | Notes |
|-----------|---------|-------|
| Ruby | 3.3.6 | Pinned in `.ruby-version`; manage with rbenv, asdf or mise |
| Rails | 8.1 | Installed via Bundler |
| PostgreSQL | 16+ | Local instance or Docker |
| Redis | 7+ | Production only (Sidekiq, Action Cable). Not needed locally: development uses the `:async` job and cable adapters |
| Stripe CLI | Latest | For local webhook testing |

No Node.js is required: JavaScript is served with importmap and Tailwind is compiled by `tailwindcss-rails`.

## Quick Start

```bash
# Clone the base
git clone https://github.com/luismnzr/eclipse-v1.git
cd eclipse-v1

# Install Ruby dependencies
bundle install

# Create and set up the database (development seeds include demo data)
bin/rails db:create db:migrate db:seed

# Start Rails + the Tailwind watcher
bin/dev
```

The app will be available at `http://localhost:3000`.

::: warning Use `bin/dev`
A bare `rails s` on a fresh checkout returns 500 until the CSS has been compiled. Use `bin/dev`, or run `bin/rails tailwindcss:build` once.
:::

## Local license

The base has no `config/instance.yml` and no `ECLIPSE_MODULES`, so **every module is licensed** locally. To see the app as a given flavor, set the license for your session:

```bash
ECLIPSE_MODULES=shop bin/dev                 # behave like a "store" instance
ECLIPSE_MODULES=shop,events bin/rails db:seed  # seeds follow the license too
```

See [Modules & Licensing](./modules.md).

## Seed Data

`db/seeds.rb` always creates the studio settings and these users (password `password`, already confirmed):

| User | Role | Seeded when |
|------|------|-------------|
| `admin@eclipse.dev` | Admin | Always (forced password change in production) |
| `student@eclipse.dev`, `student2@eclipse.dev` | Student | Always |
| `teacher@eclipse.dev`, `teacher2@eclipse.dev` | Teacher | `reservations` licensed |

With `reservations` it also seeds categories, class templates, packages, subscription plans and 2 weeks of scheduled classes.

In development (or with `SEED_DEMO=true`), `db/seeds/demo.rb` adds a demo dataset built from the licensed modules: 42 fake students with ~2 months of history, plus classes/reservations, shop catalog and orders, events and marketing opt-ins depending on the license. See [Demo data](./creating-an-instance.md#demo-data).

## Stripe Webhook Testing

In a separate terminal, forward Stripe webhooks to your local server:

```bash
stripe listen --forward-to localhost:3000/webhooks/stripe
```

Copy the webhook signing secret from the Stripe CLI output and set it in your environment:

```bash
export STRIPE_WEBHOOK_SECRET=whsec_...
```

`bin/stripe_smoke` drives real test-mode events through a running instance; see [`docs/PAGOS.md`](https://github.com/luismnzr/eclipse-v1/blob/main/docs/PAGOS.md) in the base repo for the full payment-testing strategy.

## Processes

`bin/dev` uses `Procfile.dev` to start:

| Process | Command | Purpose |
|---------|---------|---------|
| **web** | `bin/rails server` | Rails web server on port 3000 |
| **css** | `bin/rails tailwindcss:watch` | Tailwind CSS compilation |

Background jobs run in-process in development (Active Job `:async`). In production the `Procfile` runs `web` (Puma), `worker` (Sidekiq) and a `release` phase that runs `db:migrate`.

## Running Tests

```bash
# Run all tests
bin/rails test

# Run system tests (requires Chrome/Chromium)
bin/rails test:system

# Run a specific test file
bin/rails test test/models/reservation_test.rb

# Run a specific test by line number
bin/rails test test/models/reservation_test.rb:42
```

The test suite uses:
- **Minitest** — Rails default test framework
- **FactoryBot** — Test data generation
- **Faker** — Realistic fake data
- **Capybara + Selenium** — System/integration tests

## CI Pipeline

GitHub Actions runs on every push:

1. **Brakeman** — Security vulnerability scanning (Ruby)
2. **Importmap Audit** — JavaScript dependency audit
3. **RuboCop** — Ruby style and quality linting
4. **Tests** — `bin/rails test` against Postgres 16 and Redis 7

## Development Tools

- **Letter Opener** — Preview emails in the browser at `/letter_opener` (development only)
- **Sidekiq Web** — Monitor background jobs at `/sidekiq` (admins only)

## Environment Variables

Eclipse reads every secret from ENV vars (no Rails encrypted credentials). For local development you only need Stripe test keys if you're testing payments:

```bash
# Stripe (test mode keys)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Emails go to Letter Opener and files to local disk, so Postmark and S3 aren't needed locally. See the [Configuration](./configuration.md) guide for the full list of environment variables and studio settings.
