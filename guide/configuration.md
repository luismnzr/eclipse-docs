# Configuration

Eclipse is configured at two levels: **environment variables** (set per deployment) and **studio settings** (managed via the admin dashboard).

## Environment Variables

These are set on the Heroku app (or in `.env` for local development).

### Rails

| Variable | Example | Description |
|----------|---------|-------------|
| `RAILS_ENV` | `production` | Rails environment |
| `RAILS_MASTER_KEY` | (from credentials) | Decrypts `credentials.yml.enc` |
| `SECRET_KEY_BASE` | (generated) | Session and cookie signing |

### Database & Redis

| Variable | Example | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgres://...` | Auto-set by Heroku Postgres add-on |
| `REDIS_URL` | `redis://...` | Auto-set by Heroku Redis add-on |

### Stripe

| Variable | Example | Description |
|----------|---------|-------------|
| `STRIPE_PUBLISHABLE_KEY` | `pk_live_...` | Stripe public key (used in frontend) |
| `STRIPE_SECRET_KEY` | `sk_live_...` | Stripe secret key (used in backend) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Verifies webhook signatures |
| `STRIPE_CONNECT_ACCOUNT_ID` | `acct_...` | Connected account ID (if using Stripe Connect) |

### Email (Postmark)

| Variable | Example | Description |
|----------|---------|-------------|
| `POSTMARK_API_KEY` | `...` | Postmark server API token |
| `MAILER_FROM_ADDRESS` | `hello@studio.com` | Sender email address |
| `MAILER_FROM_NAME` | `Studio Name` | Sender display name |

### File Storage (AWS S3)

| Variable | Example | Description |
|----------|---------|-------------|
| `AWS_ACCESS_KEY_ID` | `AKIA...` | AWS access key |
| `AWS_SECRET_ACCESS_KEY` | `...` | AWS secret key |
| `AWS_BUCKET` | `eclipse-studio-name` | S3 bucket name |
| `AWS_REGION` | `us-east-1` | S3 bucket region |

### Application

| Variable | Example | Description |
|----------|---------|-------------|
| `APP_HOST` | `app.studio.com` | Application hostname (used in emails, URLs) |
| `STUDIO_NAME` | `Studio Name` | Fallback studio name |

---

## Studio Settings

Studio settings are stored in the `StudioSetting` model as key-value pairs. They're managed through the admin dashboard at `/admin/settings` and control runtime behavior without requiring redeployment.

### Studio Information

| Key | Default | Description |
|-----|---------|-------------|
| `studio_name` | `"Studio"` | Display name throughout the app |
| `studio_email` | `""` | Contact email shown to students |
| `studio_phone` | `""` | Contact phone number |
| `studio_address` | `""` | Physical address |
| `studio_timezone` | `"America/Mexico_City"` | Timezone for all scheduling. All times are stored in UTC and displayed in this timezone |

### Booking Rules

| Key | Default | Description |
|-----|---------|-------------|
| `cancellation_window_hours` | `12` | Hours before class start when free cancellation ends. After this window, cancellation forfeits the credit |
| `late_cancel_forfeit_credit` | `true` | Whether late cancellations lose the credit |
| `waitlist_enabled` | `true` | Enable/disable the waitlist system globally |
| `max_waitlist_size` | `5` | Maximum waitlist spots per class |
| `booking_window_days` | `14` | How far in advance students can book classes |

### Payment & Features

| Key | Default | Description |
|-----|---------|-------------|
| `currency` | `"mxn"` | Default currency for all pricing (passed to Stripe) |
| `shop_enabled` | `false` | Enable/disable the retail shop module |

### How Settings Are Used

Settings are accessed throughout the application via `StudioSetting`:

```ruby
# Read a setting with a fallback
StudioSetting.get("cancellation_window_hours", "12").to_i

# Check a boolean setting
StudioSetting.get("waitlist_enabled", "true") == "true"
```

Settings that control behavior:

- **Reservation flow** checks `cancellation_window_hours` and `late_cancel_forfeit_credit` before allowing cancellations
- **Waitlist system** checks `waitlist_enabled` and `max_waitlist_size` before adding entries
- **Class schedule** uses `booking_window_days` to determine which classes are bookable
- **All time displays** use `studio_timezone` for conversion from UTC
