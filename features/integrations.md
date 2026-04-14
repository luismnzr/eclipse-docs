# Integrations

Eclipse integrates with external services for payments, email delivery, and partner studio networks.

## Stripe

Stripe handles all payment processing. Each studio client has their own Stripe account.

### Architecture

Eclipse uses **Stripe Connect (Standard)** — each studio is a connected account. The platform (Eclipse) has API access for creating checkout sessions, managing subscriptions, and processing webhooks.

### Payment Flows

**Package Purchase:**
`/checkout/package/:package_id` → Stripe Checkout (one-time) → webhook → `UserPackage` created

**Subscription:**
`/checkout/subscription/:plan_id` → Stripe Checkout (subscription mode) → webhook → `UserSubscription` created

**Gift Card:**
`/checkout/gift-card/:package_id` → Stripe Checkout (one-time) → webhook → gift card code generated

**Event Registration:**
`/checkout/event/:event_id` → Stripe Checkout → webhook → registration confirmed

### Customer Portal

Students manage billing through Stripe's hosted Customer Portal:
- Update payment method
- Cancel subscriptions
- View invoices and receipts

Accessed via `POST /billing/portal` which creates a portal session and redirects.

### Webhook Events

Eclipse listens at `POST /webhooks/stripe` for:

| Event | Handler Action |
|-------|---------------|
| `checkout.session.completed` | Fulfill purchase (package, subscription, event, or gift card) |
| `invoice.paid` | Update subscription period, create payment record |
| `invoice.payment_failed` | Mark subscription as past_due, notify student |
| `customer.subscription.updated` | Sync status changes |
| `customer.subscription.deleted` | Deactivate subscription |

### Webhook Security

- Signatures verified using `STRIPE_WEBHOOK_SECRET`
- Events processed idempotently (Stripe event ID prevents duplicates via `StripeWebhookEvent` model)
- Webhooks return 200 immediately; processing happens in background via Sidekiq

### Key Files

| File | Purpose |
|------|---------|
| `app/services/stripe_checkout_service.rb` | Creates Checkout Sessions |
| `app/services/stripe_webhook_service.rb` | Processes webhook events |
| `app/services/stripe_customer_service.rb` | Creates Customer Portal sessions |
| `app/controllers/webhooks/stripe_controller.rb` | Webhook endpoint |
| `app/controllers/checkouts_controller.rb` | Checkout and portal redirect flows |
| `app/models/stripe_webhook_event.rb` | Idempotency tracking for processed events |
| `app/models/payment.rb` | Payment records |

---

## Wellhub (formerly Gympass)

Wellhub is a corporate wellness aggregator. Employees of partner companies can book classes at studios through Wellhub.

### How It Works

1. **Schedule Sync** — Eclipse pushes class schedules to Wellhub via `WellhubScheduleSyncService`
2. **Booking** — Wellhub sends booking requests to Eclipse's webhook at `POST /webhooks/wellhub`
3. **Check-in Validation** — Teachers validate Wellhub bookings during class (via the teacher roster view)
4. **Capacity Sync** — Available spots are synced back to Wellhub

### Models

| Model | Purpose |
|-------|---------|
| `WellhubBooking` | Records bookings from Wellhub with external reference IDs |
| `ExternalCheckin` | Tracks validated check-ins for reconciliation |

### Admin Management

- View Wellhub bookings at `/admin/wellhub_bookings`
- Trigger schedule sync from `/admin/settings`
- External check-ins at `/admin/external_checkins`

### Key Files

| File | Purpose |
|------|---------|
| `app/services/wellhub_booking_service.rb` | Processes incoming Wellhub bookings |
| `app/services/wellhub_checkin_service.rb` | Validates check-ins |
| `app/services/wellhub_schedule_sync_service.rb` | Pushes schedule data to Wellhub |
| `app/services/wellhub_setup_service.rb` | Initial Wellhub integration setup |
| `app/controllers/webhooks/wellhub_controller.rb` | Wellhub webhook endpoint |

### Environment Variables

Wellhub integration is optional. When configured:

```
WELLHUB_API_KEY=...
WELLHUB_GYM_ID=...
```

---

## Postmark (Email)

All transactional emails are delivered via Postmark.

### Setup Per Client

Each studio client has their own Postmark server and verified sender domain:

| Variable | Purpose |
|----------|---------|
| `POSTMARK_API_KEY` | Server API token |
| `MAILER_FROM_ADDRESS` | Sender email (e.g., `hello@studio.com`) |
| `MAILER_FROM_NAME` | Sender name |

### Email Types

See the full list of email triggers in the [Reservations](./reservations.md) and [Packages & Credits](./packages-and-credits.md) docs.

Summary of all mailers:

| Mailer | Emails |
|--------|--------|
| `ReservationMailer` | Booking confirmation, cancellation, class cancelled by admin |
| `PackageMailer` | Purchase confirmation, expiring soon, expired |
| `WaitlistMailer` | Joined waitlist, promoted, expired |
| `ReminderMailer` | Class reminder (2 hours before) |

### Development

In development, emails are captured by **Letter Opener** and viewable at `/letter_opener` instead of being sent.

---

## AWS S3 (File Storage)

Active Storage with S3 backend for:
- Studio logos
- Teacher profile photos
- Product images
- Any other uploaded files

Each client uses their own S3 bucket (or a shared bucket with per-client prefixes).

### Configuration

```
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_BUCKET=eclipse-studio-name
AWS_REGION=us-east-1
```

In development, Active Storage defaults to local disk storage.
