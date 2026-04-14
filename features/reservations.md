# Reservations

The reservation system is the core of Eclipse. Students book classes, credits are deducted, and attendance is tracked — all through a flow managed by `ReservationService`.

## How Booking Works

When a student clicks "Reserve" on a class:

1. **Auth check** — User must be logged in (redirected to login if not)
2. **Eligibility check** — User must have either:
   - An active package with remaining credits, OR
   - An active subscription (unlimited access)
3. **Credit deduction** (package users only):
   - `CreditDeductionService` finds the user's active package with the earliest expiration
   - Deducts one credit, creating a `ClassCredit` record linked to the reservation
4. **Reservation created** with status `confirmed`
5. **Confirmation email** sent via `ReservationMailer`

If the class is full, the student is offered the [waitlist](./waitlist.md) instead.

## Reservation Statuses

| Status | Meaning |
|--------|---------|
| `confirmed` | Student is booked for the class |
| `cancelled` | Student cancelled (or was removed by admin) |
| `completed` | Class happened, student attended |
| `no_show` | Class happened, student didn't show up |

## Cancellation

Cancellation behavior depends on timing relative to the class start:

### Free Cancellation (outside the window)

If the student cancels **before** the cancellation window (default: 12 hours before class):

- Reservation status → `cancelled`
- Credit is **restored** to the user's package
- Next waitlist entry is promoted (see [Waitlist](./waitlist.md))
- Cancellation confirmation email sent

### Late Cancellation (inside the window)

If the student cancels **within** the cancellation window:

- Reservation status → `cancelled`
- Credit is **forfeited** (if `late_cancel_forfeit_credit` is `true`)
- Next waitlist entry is promoted
- Cancellation confirmation email sent (noting credit was not restored)

The cancellation window is configured via `StudioSetting`:
- `cancellation_window_hours` — default `12`
- `late_cancel_forfeit_credit` — default `true`

## Attendance

After a class ends, teachers (or admins) mark attendance:

- **Confirm attendance** → status changes to `completed`
- **Mark as no-show** → status changes to `no_show`, credit is **not** restored

## Uniqueness Constraint

A user can only have **one active reservation per class**. This is enforced at the database level with a unique composite index on `[user_id, studio_class_id]`.

## Key Files

| File | Purpose |
|------|---------|
| `app/models/reservation.rb` | Reservation model with status enum and validations |
| `app/services/reservation_service.rb` | Booking and cancellation logic |
| `app/services/credit_deduction_service.rb` | Credit check, deduction, and restoration |
| `app/controllers/reservations_controller.rb` | Student-facing create/destroy actions |
| `app/controllers/admin/reservations_controller.rb` | Admin reservation management |
| `app/controllers/admin/classes_controller.rb` | Attendance marking (via class roster) |
| `app/mailers/reservation_mailer.rb` | Booking and cancellation emails |
| `app/jobs/reservation_reminder_job.rb` | Sends reminders before class (runs hourly) |

## Admin Capabilities

Admins can:
- View all reservations (filterable by date, class, teacher, status)
- Manually create a reservation for a student
- Cancel a reservation with optional credit restore override
- Mark attendance: confirmed, no-show, or revert no-show
- Remove a student from a class roster

## Email Notifications

| Trigger | Email |
|---------|-------|
| Reservation created | Confirmation with class details and cancellation policy |
| Reservation cancelled | Confirmation with credit restored/forfeited note |
| Class reminder | Sent ~2 hours before class start (via `ReservationReminderJob`) |
| No-show recorded | Notification that credit was not restored |
| Class cancelled by admin | All reserved students notified, credits restored |
