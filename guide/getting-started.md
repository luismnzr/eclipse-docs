# Getting Started

Local development setup for Eclipse.

## Prerequisites

| Dependency | Version | Notes |
|-----------|---------|-------|
| Ruby | 3.3+ | Managed via rbenv or asdf |
| Rails | 7.2+ | Installed via Bundler |
| PostgreSQL | 16+ | Local instance or Docker |
| Redis | 7+ | Required for Sidekiq and caching |
| Node.js | 20+ | For Tailwind CSS and the asset pipeline |
| Stripe CLI | Latest | For local webhook testing |

## Quick Start

```bash
# Clone the repo
git clone git@github.com:your-org/eclipse-base.git
cd eclipse-base

# Install Ruby dependencies
bundle install

# Install JS dependencies
yarn install

# Create and set up the database
bin/rails db:create
bin/rails db:migrate
bin/rails db:seed

# Start all services (Rails + Sidekiq + Tailwind watcher)
bin/dev
```

The app will be available at `http://localhost:3000`.

## Seed Data

The seed file creates everything you need to start developing:

| Record | Details |
|--------|---------|
| Admin user | `admin@eclipse.dev` / `password` |
| Teacher user | `teacher@eclipse.dev` / `password` |
| Student user | `student@eclipse.dev` / `password` |
| Categories | Yoga, Pilates, Meditation |
| Class templates | Sample templates for each category |
| Packages | 5-class, 10-class, 20-class packs |
| Subscription plan | Monthly unlimited |
| Studio classes | 2 weeks of sample scheduled classes |
| Studio settings | All default settings populated |

## Stripe Webhook Testing

In a separate terminal, forward Stripe webhooks to your local server:

```bash
stripe listen --forward-to localhost:3000/webhooks/stripe
```

Copy the webhook signing secret from the Stripe CLI output and set it in your environment:

```bash
export STRIPE_WEBHOOK_SECRET=whsec_...
```

## Processes

`bin/dev` uses `Procfile.dev` to start:

| Process | Command | Purpose |
|---------|---------|---------|
| **web** | `puma` on port 3000 | Rails web server |
| **worker** | `sidekiq` | Background job processor |
| **css** | `tailwindcss --watch` | Tailwind CSS compilation |

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

GitHub Actions runs automatically on every push:

1. **Brakeman** — Security vulnerability scanning (Ruby)
2. **Importmap Audit** — JavaScript dependency audit
3. **RuboCop** — Ruby style and quality linting

## Development Tools

Eclipse includes a few tools to speed up development:

- **Letter Opener** — Preview emails in the browser at `/letter_opener` (development only)
- **Sidekiq Web** — Monitor background jobs at `/sidekiq` (admin-only in production)

## Environment Variables

For local development, create a `.env` file or use `rails credentials:edit`. At minimum you'll need:

```bash
# Stripe (test mode keys)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Postmark (optional for local dev — emails go to Letter Opener)
POSTMARK_API_KEY=...

# AWS S3 (optional for local dev — defaults to local file storage)
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_BUCKET=...
AWS_REGION=...
```

See the [Configuration](./configuration.md) guide for the full list of environment variables and studio settings.
