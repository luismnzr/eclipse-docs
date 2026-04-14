# Waitlist

When a class is full, students can join a waitlist. When a spot opens (via cancellation or capacity increase), the next person in line is automatically promoted.

## How It Works

### Joining the Waitlist

1. Student clicks "Join Waitlist" on a full class
2. `WaitlistService` creates a `WaitlistEntry` with:
   - The next position number for that class
   - Status: `pending`
3. Student sees their position in the queue
4. Confirmation email sent with class details and position

### Waitlist Entry

| Field | Description |
|-------|-------------|
| `user` | The student waiting |
| `studio_class` | The class they're waiting for |
| `position` | FIFO position (1 = first in line) |
| `joined_at` | When they joined the waitlist |
| `promoted_at` | When they were promoted (null if still waiting) |
| `status` | `pending`, `promoted`, or `expired` |

### Auto-Promotion

When a spot opens (someone cancels or admin increases capacity), `WaitlistPromotionJob` runs:

```
Spot opens in class
    │
    ▼
Find earliest pending WaitlistEntry (position order)
    │
    ▼
Does user still have credits or active subscription?
    ├── YES → Create reservation, deduct credit, mark entry as "promoted"
    │         Send "You're in!" email
    │
    └── NO  → Mark entry as "expired", skip to next entry
              Send "waitlist expired" email
    │
    ▼
Repeat until spot is filled or waitlist is exhausted
```

Key rules:

- **Strictly FIFO** — Position 1 always gets first chance
- **Credit check at promotion time** — A student's package may have expired between joining the waitlist and being promoted
- **Skipped entries are marked `expired`** — Not deleted, for audit trail
- **Only one promotion per spot** — The loop stops as soon as someone is successfully promoted

### Leaving the Waitlist

Students can voluntarily leave the waitlist at any time:
- Destroys the `WaitlistEntry`
- No email notification

## Waitlist Settings

Controlled via `StudioSetting`:

| Setting | Default | Description |
|---------|---------|-------------|
| `waitlist_enabled` | `true` | Master toggle for the waitlist system |
| `max_waitlist_size` | `5` | Maximum entries per class |

When `waitlist_enabled` is `false`, the "Join Waitlist" button is hidden and full classes simply show "Full".

## Uniqueness Constraint

A user can only be on the waitlist **once per class**. Enforced at the database level with a unique composite index on `[user_id, studio_class_id]`.

## Waitlist Statuses

| Status | Meaning |
|--------|---------|
| `pending` | Student is waiting for a spot |
| `promoted` | Student was promoted and a reservation was created |
| `expired` | Student was skipped (no credits) or the class passed |

## Student-Facing Views

Students can manage their waitlist entries from their profile at `/profile/waitlists`:
- See all current waitlist positions
- Leave a waitlist

The class detail page shows:
- Current waitlist position (if on the waitlist)
- "Join Waitlist" button (if class is full and waitlist has space)

## Key Files

| File | Purpose |
|------|---------|
| `app/models/waitlist_entry.rb` | Waitlist entry model with position and status |
| `app/services/waitlist_service.rb` | Join, leave, and promotion logic |
| `app/controllers/waitlist_entries_controller.rb` | Student create/destroy actions |
| `app/jobs/waitlist_promotion_job.rb` | Background job for auto-promotion |
| `app/mailers/waitlist_mailer.rb` | Waitlist confirmation and promotion emails |
