# Subscriptions

Subscriptions give students unlimited class access for a recurring fee. They're powered by Stripe's subscription billing.

## How Subscriptions Work

### Subscription Plan Definition

A `SubscriptionPlan` defines the offering:

| Field | Description |
|-------|-------------|
| `name` | Display name (e.g., "Monthly Unlimited") |
| `price` | Price per billing cycle |
| `interval` | Billing frequency: `monthly` or `annual` |
| `stripe_price_id` | Linked Stripe Price object ID |
| `description` | Description shown to students |
| `active` | Whether the plan is visible for purchase |

### Subscribing

1. Student visits `/packages` (subscriptions are listed alongside packages)
2. Clicks "Subscribe" on a plan
3. `StripeCheckoutService` creates a Stripe Checkout Session in `subscription` mode using the plan's `stripe_price_id`
4. Student completes payment on Stripe's hosted page
5. Stripe sends `checkout.session.completed` webhook
6. `StripeWebhookService` creates:
   - A `Payment` record
   - A `UserSubscription` linked to the plan with Stripe subscription details
7. Confirmation email sent with plan details and next billing date

### UserSubscription (Active Instance)

| Field | Description |
|-------|-------------|
| `user` | The subscriber |
| `subscription_plan` | The plan they subscribed to |
| `stripe_subscription_id` | Stripe subscription ID for API operations |
| `status` | Current status (active, past_due, cancelled, etc.) |
| `current_period_start` | Start of current billing period |
| `current_period_end` | End of current billing period |

## Booking With a Subscription

When a subscriber books a class:

- `ReservationService` checks for an active subscription **before** checking for package credits
- If the user has an active subscription, the reservation is created directly — **no credit is deducted**
- Subscriptions = unlimited access within the billing period

## Subscription Management

Students manage their subscription through Stripe's Customer Portal:

- "Manage Subscription" button at `/profile/subscription` redirects to the Stripe Customer Portal
- From the portal, students can:
  - Update their payment method
  - Cancel their subscription
  - View invoices and receipts

Portal events come back to Eclipse via webhooks.

## Stripe Webhook Events

| Event | Action in Eclipse |
|-------|-------------------|
| `checkout.session.completed` | Create `Payment` + `UserSubscription` |
| `invoice.paid` | Update `current_period_start/end`, create payment record |
| `invoice.payment_failed` | Mark subscription as `past_due`, notify student |
| `customer.subscription.updated` | Sync status changes (e.g., plan changes) |
| `customer.subscription.deleted` | Deactivate the `UserSubscription` |

## Subscription vs Package Priority

When a user has **both** an active subscription and an active package:

- The subscription takes priority for booking (no credit deducted)
- Package credits are preserved for use after the subscription ends

## Admin Capabilities

Admins can:

- **Create subscription plans** — Define new plans linked to Stripe Price objects
- **Edit plans** — Modify details (price changes require a new Stripe Price)
- **Deactivate plans** — Hide from the student-facing page
- **Grant a subscription** — Manually give a user a subscription (for comps)

## Key Files

| File | Purpose |
|------|---------|
| `app/models/subscription_plan.rb` | Plan definition model |
| `app/models/user_subscription.rb` | Active subscription instance |
| `app/services/stripe_checkout_service.rb` | Creates Stripe Checkout for subscriptions |
| `app/services/stripe_webhook_service.rb` | Processes subscription-related webhooks |
| `app/services/stripe_customer_service.rb` | Creates Stripe Customer Portal sessions |
| `app/controllers/checkouts_controller.rb` | Checkout and portal redirect flows |
| `app/controllers/admin/subscription_plans_controller.rb` | Admin plan management |
