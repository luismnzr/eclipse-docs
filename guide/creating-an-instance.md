# Creating a New Instance

Step-by-step guide to fabricate, launch and hand off a new Eclipse client instance. The running example is a **store** (ecommerce-only) instance called `tienda-luna`, but every step applies to the other presets — differences are called out inline.

::: tip Source of truth
This page mirrors the operations docs in the base repo: [`docs/FABRICA.md`](https://github.com/luismnzr/eclipse-v1/blob/main/docs/FABRICA.md), [`docs/MODULOS.md`](https://github.com/luismnzr/eclipse-v1/blob/main/docs/MODULOS.md) and [`docs/CLIENT_SETUP_GUIDE.md`](https://github.com/luismnzr/eclipse-v1/blob/main/docs/CLIENT_SETUP_GUIDE.md). If they disagree, the scripts in `bin/` win.
:::

## The model

- **`eclipse-v1` is the factory.** The product evolves there.
- **Each client is an independent clone**: its own git repo with a clean history, its own Heroku app, its own Postgres/Redis, and its own **module license** (see [Modules & Licensing](./modules.md)).
- **Nothing flows back.** Improvements are born in the base and reach clients by per-repo backport (e.g. the `/eclipse-security-backport` skill), one client at a time.

Creating an instance is split into two phases so you don't pay for hosting before the client is ready:

| Phase | Command | What it does | Cost |
|-------|---------|--------------|------|
| **Local** | `bin/eclipse_new` (default) or `bin/setup_client --local` | Clone, license, identity, local DB, brand color, clean git history | **$0** |
| **Heroku** | `bin/setup_client --heroku` (or `bin/eclipse_new --heroku`) | App + Postgres + Redis, ENV vars, deploy, migrate, seed, worker, studio settings | **≈ $22 USD/month** |

The Heroku cost at list price: Postgres essential-0 $5 + Redis mini $3 + web and worker Basic dynos $7 each, prorated per second. The script warns you right before creating the app.

## Presets

Pick the flavor the client paid for. Presets live in `config/presets/*.yml` and are just module lists:

| Preset | Modules | Use it for |
|--------|---------|------------|
| `studio` | reservations, events, shop, wellhub | Full studio: classes, packages, subscriptions, events, shop, Wellhub |
| `store` | shop | Ecommerce only — no classes, teachers or studio integrations |
| `personal` | shop, events | Personal brands: shop plus workshops/launches, no class booking |

Paid add-ons go on top with `--modules`: `video` (Studio Online, requires `reservations`) and `marketing` (email campaigns, works with any flavor).

```bash
# Store + email campaigns
bin/eclipse_new tienda-luna --modules shop,marketing --github luismnzr/tienda-luna
```

## Before you start

**Tools on your machine:**

| Tool | Needed for |
|------|-----------|
| `git`, `ruby` (3.3.6) | Always — both scripts use them |
| PostgreSQL + Redis | Running the clone locally |
| [`gh`](https://cli.github.com) (authenticated) | `--github` (creating the client's private repo) |
| [`heroku`](https://devcenter.heroku.com/articles/heroku-cli) (logged in) | Heroku phase only — the local phase and `--dry-run` don't need it |
| `openssl` | Heroku phase (generates webhook secrets) |
| [Stripe CLI](https://stripe.com/docs/stripe-cli) | Testing payments locally / `bin/stripe_smoke` |

**From the client** — none of this blocks the factory (only the Heroku app name is required), but you'll want it for the handoff:

- Business name, contact email, phone, address, timezone, currency
- Domain (with DNS access), brand color(s), logo (SVG + 512×512 PNG)
- Their **Stripe** account keys (live and test)
- For a store: product catalog, photos, prices, categories, shipping policy and rates
- For a studio: class types, teachers, schedule, packages and subscription plans

**Accounts you create per client** (can be left pending during setup):

- A **Postmark** server for the client (transactional emails; `marketing` also needs a `broadcast` stream)
- A **MUX** environment, only with `video`

## Step 1 — Refresh the base

The factory refuses to clone from a stale `main`: an instance born from an outdated base is exactly the silent failure it guards against.

```bash
cd ~/dev/eclipse-v1
git checkout main && git pull
```

## Step 2 — Fabricate the clone (local phase, $0)

```bash
bin/eclipse_new tienda-luna --preset store \
    --dir ~/dev/clientes \
    --github luismnzr/tienda-luna
```

All flags:

| Flag | Meaning |
|------|---------|
| `<cliente>` | Instance name: lowercase, digits and hyphens (Heroku app name rules) |
| `--preset NAME` | `studio`, `store` or `personal` |
| `--modules a,b,c` | Custom license; overrides the preset's list |
| `--dir PATH` | Where to create the clone (default: sibling of the base checkout) |
| `--base URL\|PATH` | Where to clone from (default: the base's `origin`) |
| `--github OWNER/REPO` | Create the client's **private** repo with `gh` and push the initial commit |
| `--heroku` | Also run the Heroku phase (starts billing) |
| `--skip-heroku` | Run the Heroku phase against an app that already exists (implies `--heroku`) |
| `--no-setup` | Only clone + write the license — for a throwaway test clone |
| `--dry-run` | Print what it would do without executing |

What `bin/eclipse_new` does, in order:

1. **Validates** that local `main` is up to date with `origin` (refuses otherwise).
2. **Clones** the base into `<dir>/tienda-luna`.
3. **Renames the local database** (`eclipse_v1_*` → `tienda_luna_*` in `config/database.yml`, plus the `channel_prefix` in `config/cable.yml`) so two clients on your machine never share data.
4. **Writes the license** from the preset (or `--modules`) to `config/instance.yml`, validated with the same rules the app uses at boot. The clone is licensed from second zero, even with `--no-setup`.
5. **Runs `bin/setup_client --local`** inside the clone (interactive — see below).
6. With `--github`: **creates the private repo** and pushes the client's initial commit.

### The local-phase prompts

`bin/setup_client --local` asks only for identity; everything has a default or can be left blank:

| Prompt | Default | Notes |
|--------|---------|-------|
| Heroku app name | Folder name (`tienda-luna`) | **The only required value.** Validated for format (lowercase, digits, hyphens, starts with a letter, ≤ 30 chars) and that it doesn't already exist in your Heroku account |
| Studio name | Derived from the app name (`Tienda Luna`) | |
| Domain | *(blank)* | Blank = the `*.herokuapp.com` URL Heroku assigns later |
| Primary brand color | *(blank)* | Hex, e.g. `#0d9488`. Written to `--color-primary` in `theme.css` |

Then it:

- Writes the full manifest to `config/instance.yml` (client, app, domain, preset, modules, `base_version`, `created_at`).
- Updates `app/assets/stylesheets/theme.css` with the brand color (if given).
- **Wipes the base's git history** (`origin` pointed at `eclipse-v1`) and creates the client's initial commit — manifest, DB rename and color included.

The resulting manifest looks like:

```yaml
# config/instance.yml
client: "Tienda Luna"
app: "tienda-luna"
domain: ""
preset: "store"
modules:
  - shop
base_version: "99cdd64"
created_at: "2026-09-29"
```

::: warning Commit the manifest
`config/instance.yml` stays committed in the client's repo. It documents what was sold, is the license fallback for local development, and is what the Heroku phase reads to avoid asking again.
:::

::: details Manual equivalent (without the factory)
```bash
git clone https://github.com/luismnzr/eclipse-v1.git tienda-luna
cd tienda-luna
bin/setup_client --local --preset store
# Create the GitHub repo yourself, then:
git remote add origin git@github.com:luismnzr/tienda-luna.git
git push -u origin main
```
`bin/setup_client` with no phase flag runs **both** phases in one go (with the cost warning in between). Use `bin/setup_client --dry-run` to walk through every prompt without executing anything.
:::

## Step 3 — Build and demo it locally

Develop the client's design and show it to them without paying for hosting:

```bash
cd ~/dev/clientes/tienda-luna
bundle install
bin/rails db:create db:migrate db:seed   # in development, seeds include demo data
bin/dev                                  # Rails + Tailwind watcher on :3000
```

- Log in at `http://localhost:3000` as `admin@eclipse.dev` / `password`.
- The demo dataset follows the license: a `store` clone gets a product catalog with categories, the storefront switched on and ~50 orders with realistic shipping (the "Por enviar" queue is never empty) — no classes or teachers. See [Demo data](#demo-data).
- Use `bin/dev`, not a bare `rails s`: a fresh clone returns 500 until the Tailwind CSS is compiled (or run `bin/rails tailwindcss:build` once).
- Background jobs run in-process in development (Active Job `:async` adapter) — no Sidekiq needed locally; emails open in Letter Opener.
- For local payments: `stripe listen --forward-to localhost:3000/webhooks/stripe` (see [Getting Started](./getting-started.md#stripe-webhook-testing)).

This is where the client-specific design work happens (see [Theming](../features/theming.md)): `theme.css` tokens, logo and icons in `public/`, and any component overrides. Commit and push to the client's repo as you go.

## Step 4 — Launch on Heroku (billing starts)

When the client is ready to go live:

```bash
cd ~/dev/clientes/tienda-luna
bin/setup_client --heroku
```

Identity and license are read from `config/instance.yml` — they are **not** asked again, and `--preset`/`--modules` are rejected in this phase so the manifest and `ECLIPSE_MODULES` can't tell different stories. To change the license, re-run `--local` or edit the manifest first.

### The Heroku-phase prompts

Only what applies to the license is asked:

| Section | Prompts | Asked when |
|---------|---------|-----------|
| Contact & settings | Email, phone, address (optional), timezone (`America/Mexico_City`), currency (`mxn`) | Always |
| Stripe | Secret key, publishable key, webhook secret | Always — **Enter leaves each one pending** |
| Postmark | Server API token, sender address | Always — Enter leaves it pending |
| Studio policies | Cancellation window, late-cancel forfeit, waitlist, max waitlist, booking window | Only with `reservations` |
| AWS S3 | Access key, secret, bucket, region, storage prefix | Always, optional — **but required in practice for a store** (see below) |
| Wellhub | Enable? + **production** partner API key | Only with `wellhub` |
| MUX | Token ID/secret, signing key ID/private key, webhook secret | Only with `video` — pendable |
| Marketing | Instructions for the `broadcast` stream + generated webhook secret | Only with `marketing` |
| Demo data | "Seed demo data?" | Always — answer **No** for real clients |

For our `store` instance there are no policy, Wellhub or MUX prompts.

::: warning S3 is not optional for a store
Without `AWS_BUCKET`, production saves uploads on the dyno's disk, which Heroku wipes on every restart and deploy — product photos and hero slides would disappear. Give every instance that uploads images the shared bucket and its own `STORAGE_PREFIX` (e.g. `tienda-luna`).
:::

::: danger Pending keys
A pending key is never uploaded empty — the instance launches anyway and the final summary prints ready-to-run `heroku config:set` commands with the consequence of each gap:

- **Stripe** pending → no payments (checkout fails when paying).
- **Postmark** pending → **no emails: users cannot confirm their account.** Set it before opening sign-ups.
- **MUX** pending → Studio Online can't upload or play videos.
:::

### What the Heroku phase does

1. **Creates the app** (`heroku create`) + `heroku-postgresql:essential-0` + `heroku-redis:mini` + Ruby buildpack. If the name is taken by another account (Heroku names are global), it asks for another name and retries instead of losing your answers. If the app already exists in *your* account, it offers to reuse it — so re-running `--heroku` is a safe **resume** after a half-failed run (addons are not re-created).
2. **Resolves the domain**: blank domain → the app's real `*.herokuapp.com` URL, written back to the manifest and committed.
3. **Sets ENV vars**: `RAILS_ENV`, `SECRET_KEY_BASE`, `APP_HOST`, `ECLIPSE_MODULES` (the effective license in production) plus every key you provided. See [Configuration](./configuration.md).
4. **Deploys**: `git push <app> main`. The Procfile `release` phase runs `db:migrate`.
5. **Seeds** (`rails db:seed`, or `SEED_DEMO=true rails db:seed` if you said yes) and scales `worker=1`.
6. **Writes studio settings** via `rails runner`: name, contact, timezone, currency, `brand_color`; with `reservations` the booking policies; **without `reservations` but with `shop`, `shop_enabled=true`** — for a store, the shop *is* the site.
7. **Saves a summary** to `~/.eclipse_setup_<app>.txt` (mode 600) with the final webhook URLs, pending keys and — with Wellhub — the tenant registration values. Delete it once you've used it: the Wellhub webhook secret is not recoverable later.

::: tip Fabricate and launch in one go
`bin/eclipse_new tienda-luna --preset store --github luismnzr/tienda-luna --heroku` runs both phases back to back.
:::

## Step 5 — Post-launch manual steps

The script prints these at the end. For a store:

1. **Admin account** — log in at `https://<domain>` as `admin@eclipse.dev` / `password`. Production forces a new password on first login. Create the client's real admin user and hand it over.
2. **Studio details** — complete anything left blank (email, phone, address, WhatsApp, Instagram, schedule) in **Admin → Configuración**. These feed `/contacto`, `/privacidad` and the footer.
3. **Branding assets** — replace `public/icon.png` (512×512) and `public/icon.svg`, optionally the navbar logo in `app/views/shared/_navbar.html.erb`; review `--color-primary-hover` and `--color-accent` in `theme.css`. Commit and `git push <app> main`.
4. **Custom domain** (when the client has one):
   ```bash
   heroku domains:add tiendaluna.mx -a tienda-luna
   heroku config:set APP_HOST=tiendaluna.mx -a tienda-luna
   heroku certs:auto:enable -a tienda-luna
   ```
   Then add the CNAME to Heroku's DNS target, Postmark's DKIM + Return-Path records, update `domain:` in `config/instance.yml`, and move every webhook to the new domain.
5. **Stripe webhook** — in the client's Stripe dashboard, point a webhook to `https://<domain>/webhooks/stripe` with at least `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated`, `customer.subscription.deleted` (a store with OXXO/SPEI also needs `checkout.session.async_payment_succeeded` and `checkout.session.async_payment_failed`). Copy its signing secret into `STRIPE_WEBHOOK_SECRET`.
6. **Load the catalog** (store/personal) — in **Admin → Configuración → Tienda**: categories (`shop_categories`), shipping flat rate and free-shipping threshold, shipping & returns text, product info/care defaults, home section titles. Then products, variants, sizes and photos in `/admin/products`. See [Tienda](../manual/admin/tienda.md) and the base repo's [`docs/TIENDA.md`](https://github.com/luismnzr/eclipse-v1/blob/main/docs/TIENDA.md).
   - For a **studio**: categories, class templates, teachers, schedule, packages and subscription plans instead (and with Wellhub, tenant registration on the gateway — see [Integrations](../features/integrations.md)).
7. **Home** — hero slides in **Admin → Inicio (Hero)** (without slides, the static hero is shown).

## Step 6 — Verify before handoff

**Automated smoke** — from any checkout of the base, against the live instance:

```bash
bin/eclipse_smoke https://tiendaluna.mx --modules shop
```

It checks the universal routes (`/up`, `/`, `/login`, `/signup`, `/privacidad`, `/contacto`, `robots.txt`, `sitemap.xml`, Stripe webhook alive), that licensed modules answer and **unlicensed ones are 404** (for a store: `/classes`, `/packages`, `/eventos`, `/video` and the Wellhub/MUX/Postmark webhooks must be 404). A `500` on `POST /webhooks/stripe` almost always means `STRIPE_WEBHOOK_SECRET` is missing. Exit code is non-zero on failure.

**Manual checklist** (≈ 5 minutes — what the smoke can't see):

1. **Sign-up & email** — create a real account; the confirmation email arrives and login works.
2. **Test payment** — with the client's test keys, run `bin/stripe_smoke` to confirm real events from *their* account (API version included) land correctly, then a full Stripe test-mode checkout with `4242 4242 4242 4242`. For a store: a cart purchase that shows up in **Pedidos → Por enviar** with its shipping address, in payment history, and with the confirmation email. See [`docs/PAGOS.md`](https://github.com/luismnzr/eclipse-v1/blob/main/docs/PAGOS.md).
3. **Admin** — the nav shows exactly the licensed modules (a store has no Clases/Maestros/Paquetes).
4. **Branding** — colors, logo, name and timezone.
5. With `video`: upload and play a short test video. With `marketing`: send a test campaign, check the unsubscribe link, and that the `broadcast` stream + its webhook exist in Postmark.

Finally switch Stripe to **live** keys (`heroku config:set STRIPE_SECRET_KEY=sk_live_... STRIPE_PUBLISHABLE_KEY=pk_live_... STRIPE_WEBHOOK_SECRET=whsec_... -a <app>`) with the live-mode webhook.

## Demo data

The "Seed demo data?" answer doesn't depend on the preset directly: `db/seeds/demo.rb` builds each section **from the licensed modules** (`Eclipse::Modules`).

| Licensed | Demo data |
|----------|-----------|
| *Always* | 42 fake students with ~2 months of history, recent admin notifications |
| `reservations` | Historical classes, reservations (attended / no-show / cancelled), package and subscription sales with payments |
| `shop` | Product catalog, storefront on, ~50 orders with realistic shipping |
| `events` | Past and upcoming workshops/retreats with registrations and payments |
| `marketing` | Most demo students opted in, so campaign audiences look alive |

Base data (settings, admin user and — with `reservations` — the class/package/plan catalog with 2 weeks of schedule) comes from `db/seeds.rb` and is always seeded. The demo dataset only loads in development or with `SEED_DEMO=true` in production. Re-seeding production never overwrites the studio's identity.

## Pausing or tearing down an instance

`bin/eclipse_destroy` is the factory's mirror image. Run from the client's repo it reads the app from `config/instance.yml` (or pass the name); it shows dynos and addons before touching anything, and `--dry-run` only prints.

```bash
cd ~/dev/clientes/tienda-luna
bin/eclipse_destroy --pause     # dynos to 0 + maintenance mode: ≈ $8/month of addons remain
bin/eclipse_destroy --resume    # back: web=1 worker=1, maintenance off
bin/eclipse_destroy --destroy   # delete the whole app: $0, irreversible
```

- **`--pause`** — for a client who pauses or skips a month. Data, ENV, domain and webhooks survive; resumes in seconds. Meanwhile the site shows Heroku's maintenance page and jobs (emails, Stripe/MUX/Postmark webhooks) are not processed.
- **`--destroy`** — for a definitive cancellation. First captures and downloads a Postgres backup to `~/.eclipse_backup_<app>_<date>.dump` (skip deliberately with `--no-backup`), then asks for double confirmation (type the app name + y/N) and runs `heroku apps:destroy`.

Neither touches — and these may keep billing on their own: the client's GitHub repo, the Postmark server, the Stripe account, the MUX environment, DNS, and the Wellhub tenant on the gateway.

## Changing an existing instance

**License** (e.g. a store that buys `marketing`):

```bash
heroku config:set ECLIPSE_MODULES=shop,marketing -a tienda-luna
```

Update `modules:` in `config/instance.yml` in the client's repo so it stays documented. Removing a module deletes no data — only its surface disappears; re-adding it brings everything back. See [Modules & Licensing](./modules.md).

**Base improvements** — backport per client repo, never `git pull` from the base (the histories are unrelated by design). Apply the change in the client's repo and deploy with `git push <app> main`.

## Troubleshooting

| Symptom | Likely cause |
|---------|-------------|
| `eclipse_new` dies with "base local desactualizada" | Local `main` is behind `origin/main`: `git pull` in the base |
| App crashes on boot with a license error | Typo or missing dependency in `ECLIPSE_MODULES` (e.g. `wellhub` without `reservations`) — the app fails loudly on purpose |
| A store clone shows classes locally | No license: the clone has no `config/instance.yml` and no `ECLIPSE_MODULES`, so **all** modules are licensed. Fabricate with `--preset` or run `setup_client --local` |
| 500 on every page of a fresh clone | Tailwind CSS not compiled — use `bin/dev` or `bin/rails tailwindcss:build` |
| `/tienda` is 404 with `shop` licensed | The client's switch is off: **Admin → Configuración → Funcionalidades → "Habilitar tienda"** |
| `POST /webhooks/stripe` → 500 | `STRIPE_WEBHOOK_SECRET` missing |
| Users never get the confirmation email | `POSTMARK_API_TOKEN` pending, or sender domain not verified in Postmark |
| Emails / webhooks not processed | Worker not running: `heroku ps:scale worker=1 -a <app>` |
| `--heroku` died halfway | Re-run `bin/setup_client --heroku`; it reuses the app and skips existing addons |

## Quick reference

```bash
# Fabricate (free)
cd ~/dev/eclipse-v1 && git pull
bin/eclipse_new tienda-luna --preset store --dir ~/dev/clientes --github luismnzr/tienda-luna

# Work locally
cd ~/dev/clientes/tienda-luna
bin/rails db:create db:migrate db:seed && bin/dev

# Launch (billing starts)
bin/setup_client --heroku

# Verify
bin/eclipse_smoke https://tiendaluna.mx --modules shop

# Pause / resume / destroy
bin/eclipse_destroy --pause | --resume | --destroy
```
