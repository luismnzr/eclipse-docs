# Architecture

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Ruby on Rails 7.2 | Server-rendered monolith — simple, fast, easy to customize per client |
| **Frontend** | Hotwire (Turbo + Stimulus) | SPA-like feel without a JS framework. Custom UI is applied at the template level, not via a JS theme system |
| **Styling** | Tailwind CSS 3.x | Utility-first CSS. Designers override classes directly in templates |
| **Components** | ViewComponent | Reusable server-side UI components. Each is a Ruby class + ERB template that can be overridden per client |
| **Database** | PostgreSQL 16 | One database per client instance |
| **Auth** | Devise | Session-based authentication with three roles |
| **Authorization** | Pundit | Policy-based, role-aware access control |
| **Background Jobs** | Sidekiq + Redis | Async processing for waitlists, emails, webhooks, scheduled tasks |
| **Payments** | Stripe | Checkout Sessions, Customer Portal, webhooks. Each client has their own Stripe account |
| **Email** | Action Mailer + Postmark | Transactional emails with per-client sending domains |
| **File Storage** | Active Storage + S3 | Logos, teacher photos, product images |
| **Caching** | Redis | Shared with Sidekiq for fragment caching |
| **Deployment** | Heroku | One app per client with Postgres + Redis add-ons |
| **CI** | GitHub Actions | Brakeman security scanning, RuboCop linting, importmap audit |

## Directory Structure

```
app/
├── components/
│   └── ui/                     # ViewComponent library (shadcn-inspired)
│       ├── button_component.rb
│       ├── card_component.rb
│       ├── dialog_component.rb
│       ├── input_component.rb
│       ├── table_component.rb
│       ├── tabs_component.rb
│       ├── toast_component.rb
│       └── ...
├── controllers/
│   ├── application_controller.rb
│   ├── classes_controller.rb         # Class browsing
│   ├── reservations_controller.rb    # Reservation create/cancel
│   ├── packages_controller.rb        # Package listing
│   ├── checkouts_controller.rb       # Stripe Checkout flows
│   ├── profiles_controller.rb        # User profile sections
│   ├── pages_controller.rb           # Static pages
│   ├── webhooks/
│   │   ├── stripe_controller.rb
│   │   └── wellhub_controller.rb
│   ├── admin/                        # Admin namespace
│   │   ├── dashboard_controller.rb
│   │   ├── users_controller.rb
│   │   ├── classes_controller.rb
│   │   ├── packages_controller.rb
│   │   ├── settings_controller.rb
│   │   ├── reports_controller.rb
│   │   └── ...
│   └── teacher/                      # Teacher namespace
│       ├── dashboard_controller.rb
│       ├── classes_controller.rb
│       └── profile_controller.rb
├── models/
│   ├── user.rb                 # Devise + role enum (student/teacher/admin)
│   ├── studio_class.rb         # Scheduled class instance
│   ├── class_template.rb       # Reusable class definition
│   ├── reservation.rb          # Student ↔ Class booking
│   ├── waitlist_entry.rb       # Ordered waitlist
│   ├── package.rb              # Credit package definition
│   ├── user_package.rb         # Purchased package instance
│   ├── class_credit.rb         # Credit usage tracking
│   ├── subscription_plan.rb    # Unlimited plan definition
│   ├── user_subscription.rb    # Active subscription
│   ├── payment.rb              # Stripe payment record
│   ├── studio_setting.rb       # Key-value config store
│   ├── category.rb             # Class categories
│   ├── page.rb                 # CMS-lite pages (ActionText)
│   ├── product.rb              # Shop items
│   ├── order.rb / order_item.rb
│   ├── wellhub_booking.rb
│   └── external_checkin.rb
├── services/
│   ├── reservation_service.rb
│   ├── waitlist_service.rb
│   ├── credit_deduction_service.rb
│   ├── stripe_checkout_service.rb
│   ├── stripe_customer_service.rb
│   ├── stripe_webhook_service.rb
│   ├── wellhub_booking_service.rb
│   ├── wellhub_checkin_service.rb
│   ├── wellhub_schedule_sync_service.rb
│   ├── wellhub_setup_service.rb
│   └── walkin_checkin_service.rb
├── jobs/                       # Sidekiq background jobs
├── mailers/                    # Transactional email templates
├── policies/                   # Pundit authorization policies
├── views/                      # ERB templates
└── javascript/
    └── controllers/            # Stimulus controllers
```

## Key Patterns

### Service Objects

Complex business logic lives in `app/services/`, not in controllers or models. Each service encapsulates a single operation:

- `ReservationService` — Creates and cancels reservations, handles credit checks
- `WaitlistService` — Manages waitlist entries and auto-promotion
- `CreditDeductionService` — Deducts and restores credits from user packages
- `StripeCheckoutService` — Creates Stripe Checkout Sessions for packages and subscriptions
- `StripeWebhookService` — Processes incoming Stripe webhook events

### Turbo Frames & Streams

Dynamic sections of the UI use Turbo Frames for lazy loading and Turbo Streams for real-time updates:

- Class schedule sections load via Turbo Frames
- Spots remaining update in real-time via Turbo Streams + Action Cable
- Reservation actions (book/cancel) respond with Turbo Stream updates

### Pundit Policies

Every controller action has a corresponding Pundit policy. The application controller enforces this with `after_action :verify_authorized`.

### Roles

Three roles via enum on the `User` model:

```ruby
enum role: { student: 0, teacher: 1, admin: 2 }
```

- **Student** — Browse, book, purchase, manage profile
- **Teacher** — Everything a student can do + view their teaching schedule, rosters, mark attendance
- **Admin** — Full access to all management features

## Data Model

```
User (student/teacher/admin)
├── has_many :reservations
├── has_many :waitlist_entries
├── has_many :user_packages
├── has_one  :user_subscription
└── has_many :payments

ClassTemplate
├── belongs_to :category
├── has_many :studio_classes
└── name, style, level, description, default_duration, default_capacity

StudioClass
├── belongs_to :class_template
├── belongs_to :teacher (User where role: :teacher)
├── has_many :reservations
├── has_many :waitlist_entries
└── date, start_time, end_time, duration, capacity, status

Reservation
├── belongs_to :user
├── belongs_to :studio_class
├── belongs_to :class_credit (optional)
└── status: [confirmed, cancelled, completed, no_show]

WaitlistEntry
├── belongs_to :user
├── belongs_to :studio_class
└── position, joined_at, promoted_at, status

Package
├── has_many :user_packages
└── name, price, credit_count, expiration_days, description, active

UserPackage
├── belongs_to :user
├── belongs_to :package
├── has_many :class_credits
└── purchased_at, expires_at, credits_remaining

SubscriptionPlan
├── has_many :user_subscriptions
└── name, price, interval (monthly/annual), stripe_price_id, active

UserSubscription
├── belongs_to :user
├── belongs_to :subscription_plan
└── stripe_subscription_id, status, current_period_start, current_period_end

ClassCredit
├── belongs_to :user_package
├── has_one :reservation
└── used_at

Payment
├── belongs_to :user
└── stripe_payment_intent_id, amount, currency, status, description

StudioSetting
└── key, value (singleton key-value store)

Category
├── has_many :class_templates
└── name, slug, description, sort_order

Page
└── title, slug, body (ActionText), published, sort_order

Product / Order / OrderItem — Shop module
WellhubBooking / ExternalCheckin — Integration models
```

### Key Database Constraints

| Index | Purpose |
|-------|---------|
| `reservations [user_id, studio_class_id]` UNIQUE | Prevents double booking |
| `waitlist_entries [user_id, studio_class_id]` UNIQUE | One waitlist entry per user per class |
| `waitlist_entries [studio_class_id, position]` | Ordered retrieval for FIFO promotion |
| `studio_classes [date, start_time]` | Fast schedule queries |
| `user_packages [user_id, expires_at]` | Active package lookups |
| `studio_settings [key]` UNIQUE | One value per setting key |

## Routing Overview

Routes are organized by role namespace:

| Path | Namespace | Purpose |
|------|-----------|---------|
| `/` | Root | Student-facing pages |
| `/classes` | Student | Class browsing and booking |
| `/packages` | Student | Package and subscription listing |
| `/profile/*` | Student | Profile sections (classes, billing, etc.) |
| `/checkout/*` | Student | Stripe Checkout flows |
| `/admin/*` | Admin | Dashboard, user/class/package management, reports, settings |
| `/teacher/*` | Teacher | Teaching schedule, rosters, attendance |
| `/webhooks/*` | System | Stripe and Wellhub webhook endpoints |
