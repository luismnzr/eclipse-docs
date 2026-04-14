# Packages & Credits

Eclipse uses a credit-based system for class access. Studios sell packages (e.g., "10-Class Pack"), and each reservation deducts one credit.

## How Packages Work

### Package Definition

A `Package` is a product the studio sells. It defines:

| Field | Description |
|-------|-------------|
| `name` | Display name (e.g., "10-Class Pack") |
| `price` | Price in the studio's currency |
| `credit_count` | Number of class credits included |
| `expiration_days` | Days until the package expires (from purchase date) |
| `description` | Description shown to students |
| `active` | Whether the package is visible for purchase |

### Purchasing a Package

1. Student visits `/packages` and clicks "Buy" on a package
2. `StripeCheckoutService` creates a Stripe Checkout Session with the package price
3. Student completes payment on Stripe's hosted checkout page
4. Stripe sends a `checkout.session.completed` webhook
5. `StripeWebhookService` creates:
   - A `Payment` record
   - A `UserPackage` with full credits and calculated expiration date
6. Confirmation email sent with package details and expiration date

### UserPackage (Purchased Instance)

When a student buys a package, a `UserPackage` record is created:

| Field | Description |
|-------|-------------|
| `user` | The student who purchased |
| `package` | The package definition |
| `purchased_at` | Purchase timestamp |
| `expires_at` | Expiration date (`purchased_at + package.expiration_days`) |
| `credits_remaining` | Number of unused credits |

## Credit System

### Deduction

When a student books a class (`ReservationService`):

1. `CreditDeductionService` finds the student's active packages (not expired, credits > 0)
2. Selects the package with the **earliest expiration** (use-it-or-lose-it logic)
3. Creates a `ClassCredit` record linked to the `UserPackage`
4. Decrements `credits_remaining` on the `UserPackage`
5. The `ClassCredit` is linked to the `Reservation`

### Restoration

Credits are restored when:

- Student cancels **before** the cancellation window
- Admin cancels a class (all students get credits back)
- Admin manually overrides a cancellation to restore the credit

Credits are **not** restored when:

- Student cancels **after** the cancellation window (late cancel)
- Student is marked as a no-show

### Credit Flow Diagram

```
Student books class
    │
    ▼
CreditDeductionService
    │
    ├── Find active UserPackage (earliest expiry)
    ├── Create ClassCredit (used_at = now)
    ├── Decrement credits_remaining
    └── Link ClassCredit → Reservation
    │
    ▼
Student cancels (before window)
    │
    ▼
CreditDeductionService (restore)
    │
    ├── Mark ClassCredit as unused
    └── Increment credits_remaining
```

## Package Expiration

Packages expire based on calendar days from purchase:

- `PackageExpirationWarningJob` — Runs daily, finds packages expiring in 3 days, sends a warning email with remaining credits and a renewal CTA
- `PackageExpirationJob` — Runs daily at midnight (studio timezone), marks expired packages

Expired packages:
- Remaining credits are lost
- Student receives an expiration email with a link to purchase a new package
- The package remains in the student's history but is no longer usable

## Admin Capabilities

Admins can:

- **Create packages** — Define new packages with pricing, credits, and expiration
- **Edit packages** — Modify existing package details
- **Reorder packages** — Control display order on the packages page
- **Deactivate packages** — Soft-disable (can't delete packages with active purchases)
- **Sell a package to a user** — Manually assign a package (for comps, gifts, etc.)
- **Add/remove credits** — Adjust a user's credit balance directly

## Key Files

| File | Purpose |
|------|---------|
| `app/models/package.rb` | Package definition model |
| `app/models/user_package.rb` | Purchased package instance |
| `app/models/class_credit.rb` | Individual credit tracking |
| `app/services/credit_deduction_service.rb` | Credit deduction and restoration logic |
| `app/services/stripe_checkout_service.rb` | Creates Stripe Checkout for package purchase |
| `app/controllers/packages_controller.rb` | Student-facing package listing |
| `app/controllers/checkouts_controller.rb` | Checkout flow (package, subscription, gift card) |
| `app/controllers/admin/packages_controller.rb` | Admin package CRUD |
| `app/jobs/package_expiration_job.rb` | Expires packages past their date |

## Gift Cards

Studios can also sell packages as gift cards:

1. Purchaser selects a package and checks out via `/checkout/gift-card/:package_id`
2. A gift card code is generated
3. Recipient redeems the code at `/gift-cards/redeem`
4. A `UserPackage` is created for the recipient with full credits
