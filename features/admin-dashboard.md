# Admin Dashboard

The admin dashboard gives studio owners full control over their business. All admin views live under the `/admin` namespace with a dedicated layout.

## Dashboard Overview (`/admin`)

The main dashboard shows a snapshot of studio activity:

- **Today:** Classes, reservations, revenue
- **This week/month:** Totals for classes, reservations, signups, revenue
- **Quick stats:** Active students, active packages, active subscriptions, waitlist entries
- **Charts:** Revenue over time, reservations over time, class utilization, popular classes/teachers
- **Recent activity:** Last 10 reservations, cancellations, and purchases

## User Management (`/admin/users`)

Searchable, sortable, paginated table of all users.

**Columns:** Name, email, role, signup date, active package/subscription, total classes attended

**Filters:** Role, has active package, has active subscription, signup date range

**Admin actions on a user:**

| Action | Description |
|--------|-------------|
| Change role | Promote to teacher or admin, or revert to student |
| Sell package | Manually assign a package (for comps, gifts, overrides) |
| Add credits | Grant extra credits to an existing package |
| Remove credits | Deduct credits from an existing package |
| Grant subscription | Manually activate a subscription |
| View history | See all reservations, payments, packages |

**Search:** `/admin/users/search` provides quick user lookup by name or email.

## Class Management

### Class Templates (`/admin/class_templates`)

CRUD for reusable class definitions:

| Field | Description |
|-------|-------------|
| Name | Class name (e.g., "Vinyasa Flow") |
| Category | Category (Yoga, Pilates, etc.) |
| Style | Class style/variant |
| Level | Difficulty level |
| Description | Class description |
| Default duration | Default class length |
| Default capacity | Default number of spots |
| Image | Class image |

### Categories (`/admin/categories`)

CRUD for class categories (Yoga, Pilates, Barre, Meditation, etc.) with name, description, and sort order.

### Scheduled Classes (`/admin/classes`)

- View all scheduled classes (calendar or list)
- Create a class from a template: select template, assign teacher, set date/time, override duration/capacity
- **Bulk scheduling:** Create recurring classes (e.g., "Every Monday at 7am for 8 weeks")
- Edit or cancel individual class instances
- View class roster and waitlist
- Mark attendance: confirmed, no-show, or revert
- Remove a student from the roster
- Record walk-in check-ins

## Package & Subscription Management

### Packages (`/admin/packages`)

Full CRUD with reordering:

- Create/edit packages with pricing, credits, and expiration
- Reorder display order (drag-and-drop or manual)
- Cannot delete packages with active purchases — deactivate instead

### Subscription Plans (`/admin/subscription_plans`)

- Create/edit plans linked to Stripe Price objects
- Toggle active/inactive

## Reservation Management (`/admin/reservations`)

Table of all reservations with filters:

- **Filters:** Date range, class, teacher, status
- **Actions:** Mark completed, mark no-show, revert no-show

## Events (`/admin/events`)

Manage special events (workshops, retreats, etc.):

- CRUD for events with pricing and capacity
- Manage event registrations
- Events have their own Stripe Checkout flow

## Shop (`/admin/products`, `/admin/orders`)

**Products:** CRUD for retail items (name, description, price, stock, image, active toggle)

**Orders:** Admin creates orders from the dashboard for walk-in sales — select products, quantities, assign to student (optional), record payment.

## External Check-ins (`/admin/external_checkins`)

Manual check-in recording for walk-ins or partner platform validations (Wellhub, Fitpass):

- Record check-ins with platform, user identifier, and class
- Validate check-ins
- Export data for reconciliation

## Wellhub Bookings (`/admin/wellhub_bookings`)

View and manage bookings that came through Wellhub.

## Studio Settings (`/admin/settings`)

Form-based interface for all `StudioSetting` values, organized into:

- **Studio Information:** Name, email, phone, address, timezone
- **Booking Rules:** Cancellation window, waitlist settings, booking window
- **Payment:** Currency, Stripe configuration status
- **Features:** Shop enabled, etc.
- **Wellhub:** Trigger schedule sync

See [Configuration](../guide/configuration.md) for the full settings reference.

## Reports (`/admin/reports`)

- Revenue breakdown: packages vs subscriptions vs shop
- Class utilization: average fill rate per class template, teacher, time slot
- Student retention: new vs returning, package renewal rate
- Export to CSV

## Notifications (`/admin/notifications`)

Real-time admin notifications for key events (new signups, purchases, cancellations). Mark as read individually or in bulk.

## Routes Reference

All admin routes:

| Route | Controller | Purpose |
|-------|-----------|---------|
| `GET /admin` | `admin/dashboard#show` | Dashboard |
| `/admin/users` | `admin/users` | User CRUD + actions |
| `/admin/classes` | `admin/classes` | Class CRUD + roster |
| `/admin/class_templates` | `admin/class_templates` | Template CRUD |
| `/admin/categories` | `admin/categories` | Category CRUD |
| `/admin/packages` | `admin/packages` | Package CRUD + reorder |
| `/admin/subscription_plans` | `admin/subscription_plans` | Plan CRUD |
| `/admin/reservations` | `admin/reservations` | Reservation management |
| `/admin/events` | `admin/events` | Event management |
| `/admin/products` | `admin/products` | Product CRUD |
| `/admin/orders` | `admin/orders` | Order management |
| `/admin/external_checkins` | `admin/external_checkins` | Check-in recording |
| `/admin/wellhub_bookings` | `admin/wellhub_bookings` | Wellhub bookings |
| `/admin/settings` | `admin/settings` | Studio settings |
| `/admin/reports` | `admin/reports` | Reports |
| `/admin/notifications` | `admin/notifications` | Notifications |
