# Launching a New Store

The runbook for a **store** instance (preset `store`, module `shop` only): an online shop with cart, variants, shipping and guest checkout — no classes, teachers or studio integrations. Follow it top to bottom and tick the boxes.

Every step links to the full reference in [Creating a New Instance](./creating-an-instance.md). The running example is `tienda-luna`; replace it with the client's name.

| | |
|---|---|
| **Time** | ≈ 30 min of factory work + the client's catalog load |
| **Cost** | $0 until [Step 5](#_5-launch-on-heroku); then ≈ $22 USD/month on Heroku |
| **Module license** | `shop` (add `marketing` if the client bought email campaigns) |

## 0. Gather from the client

None of this blocks the factory — only the app name is required — but you need it before handoff.

- [ ] Business name, contact email, phone, WhatsApp, Instagram, address, business hours
- [ ] Domain (and who controls its DNS), brand color(s), logo as SVG + 512×512 PNG
- [ ] Access to **their** Stripe account (test and live keys). The money goes to the client, never to an Eclipse account
- [ ] Catalog: products, prices, photos, variants (color/price/stock/SKU), sizes, categories in menu order
- [ ] Shipping policy: flat rate per order, free-shipping threshold (if any), whether they offer pickup, and the "Envíos y devoluciones" text

And on your side, per client:

- [ ] A **Postmark** server for the client (+ sender signature or verified domain). With `marketing`, a `broadcast` message stream too
- [ ] A `STORAGE_PREFIX` for the shared S3 bucket — use the app name (`tienda-luna`)

## 1. Refresh the base

```bash
cd ~/dev/eclipse-v1
git checkout main && git pull
```

The factory refuses to clone from a local `main` that is behind `origin/main`.

## 2. Fabricate the clone ($0)

```bash
bin/eclipse_new tienda-luna --preset store \
    --dir ~/dev/clientes \
    --github luismnzr/tienda-luna
# With email campaigns: --modules shop,marketing instead of --preset store
```

Answer the prompts:

| Prompt | Answer for a store |
|--------|-------------------|
| Heroku app name | Enter (= `tienda-luna`) — or another name if it's taken |
| Studio name | The business name as customers see it, e.g. `Tienda Luna` |
| Domain | The final domain if it exists (`tiendaluna.mx`), otherwise Enter |
| Primary brand color | Hex, e.g. `#0d9488` (or Enter and set it later in `theme.css`) |
| `Proceed with setup? [y/N]` | **`y`** |
| `Reinitialize git history for this client? [y/N]` | **`y`** — with `N` the client's repo gets the whole `eclipse-v1` history |

Check the result:

- [ ] `~/dev/clientes/tienda-luna/config/instance.yml` has `preset: "store"` and `modules: [shop]`
- [ ] `git log` in the clone shows a **single** commit: `Initial commit — Eclipse base for Tienda Luna`
- [ ] `https://github.com/luismnzr/tienda-luna` exists, is private, and has that one commit

→ Reference: [Step 2 — Fabricate the clone](./creating-an-instance.md#step-2-fabricate-the-clone-local-phase-0)

## 3. Build and demo it locally ($0)

```bash
cd ~/dev/clientes/tienda-luna
bundle install
bin/rails db:create db:migrate db:seed   # development seeds include the store demo
bin/dev                                  # http://localhost:3000
```

- [ ] Log in as `admin@eclipse.dev` / `password`
- [ ] The admin nav shows Panel, Usuarios, Descuentos, Inicio (Hero), a **Tienda** group (Productos, Pedidos), Configuración and Reportes — and no Clases / Plantillas / Paquetes / Reservaciones / Eventos
- [ ] `/tienda` shows the demo catalog; **Pedidos → Por enviar** has demo orders

Now the client-specific design work, committing and pushing to the client's repo as you go:

- [ ] `app/assets/stylesheets/theme.css` — review `--color-primary-hover` and `--color-accent` next to the primary color (see [Theming](../features/theming.md))
- [ ] `public/icon.png` (512×512) and `public/icon.svg`; optionally the logo in `app/views/shared/_navbar.html.erb`

```bash
git add -A && git commit -m "Branding de Tienda Luna" && git push
```

::: tip Use `bin/dev`
A bare `rails s` on a fresh clone returns 500 until Tailwind is compiled. `bin/dev` compiles it on the fly (or run `bin/rails tailwindcss:build` once).
:::

→ Reference: [Step 3 — Build and demo it locally](./creating-an-instance.md#step-3-build-and-demo-it-locally)

## 4. Prepare the keys (before launch day)

Have these at hand; any of them can be left pending with Enter and set later with `heroku config:set`.

| Key | Where | Pending means |
|-----|-------|---------------|
| Stripe secret + publishable key | Client's Stripe → Developers → API keys. **Start with test keys** | Checkout fails when paying |
| Stripe webhook secret | Only exists after creating the endpoint (Step 6) — normally pending on the first run | `POST /webhooks/stripe` → 500 |
| Postmark server API token | Client's Postmark server → API Tokens | **No emails: nobody can confirm their account** |
| Sender address | A verified sender in that Postmark server | Mail goes out as `hello@eclipse.dev` |
| AWS key, secret, bucket, region | The shared Eclipse bucket | **Product photos vanish on every deploy** |
| Storage prefix | `tienda-luna` | Files mixed with other clients |

::: warning S3 is not optional for a store
Without `AWS_BUCKET`, uploads live on the dyno's disk, which Heroku wipes on every restart and deploy.
:::

## 5. Launch on Heroku

::: danger Billing starts here
≈ $22 USD/month: Postgres essential-0 $5 + Redis mini $3 + web and worker Basic dynos $7 each, prorated per second.
:::

```bash
cd ~/dev/clientes/tienda-luna
bin/setup_client --heroku
```

Identity and license come from `config/instance.yml`; it asks:

| Prompt | Answer for a store |
|--------|-------------------|
| Contact email / phone / address | The client's (blank is fine — fill in later in Admin → Configuración → General) |
| Timezone / currency | Enter for `America/Mexico_City` / `mxn` unless the client is elsewhere |
| Stripe ×3 | Test keys; webhook secret usually pending |
| Postmark token / sender | From Step 4 |
| AWS ×4 + storage prefix | From Step 4 — don't skip them |
| Seed demo data? | **`N`** for a real client (`y` only for a demo/sales instance) |
| `Proceed with setup? [y/N]` | `y` — creates the app and starts billing |

There are no policy, Wellhub or MUX prompts for a store. The script then creates the app, Postgres and Redis, sets ENV (with `ECLIPSE_MODULES=shop`), deploys, migrates, seeds, scales `worker=1` and writes the settings — including **`shop_enabled=true`**, because for a store the shop *is* the site.

- [ ] The final summary shows the app URL and, if any, the pending `heroku config:set` lines
- [ ] Save `~/.eclipse_setup_tienda-luna.txt` somewhere safe, then delete it

→ Reference: [Step 4 — Launch on Heroku](./creating-an-instance.md#step-4-launch-on-heroku-billing-starts)

## 6. Post-launch setup

**Access**

- [ ] Log in at `https://<domain>` as `admin@eclipse.dev` / `password` → production forces a new password
- [ ] Create the client's real admin account in **Admin → Usuarios** and set its role to Admin (accounts created from the panel skip email confirmation)

**Domain** (if the client has one)

```bash
heroku domains:add tiendaluna.mx -a tienda-luna
heroku config:set APP_HOST=tiendaluna.mx -a tienda-luna
heroku certs:auto:enable -a tienda-luna
```

- [ ] CNAME to Heroku's DNS target, plus Postmark's DKIM and Return-Path records
- [ ] `domain:` updated in `config/instance.yml` (commit + push)

**Stripe** (client's dashboard, test mode first)

- [ ] Webhook endpoint `https://<domain>/webhooks/stripe` with these events:
  - `checkout.session.completed`
  - `checkout.session.async_payment_succeeded` and `checkout.session.async_payment_failed` (OXXO / SPEI)
  - `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated`, `customer.subscription.deleted`
- [ ] Its signing secret: `heroku config:set STRIPE_WEBHOOK_SECRET=whsec_... -a tienda-luna`
- [ ] Payment methods: Checkout uses the methods enabled in **Stripe → Settings → Payment methods**. Turn on OXXO / bank transfer there if the client wants them (orders stay `pending` until the money arrives)
- [ ] Discount codes, if any, go in **Admin → Descuentos** (synced to Stripe as promotion codes, so the Stripe key must be set). Checkout already shows the code field

**Store content** (or hand it to the client with the [Tienda manual](../manual/admin/tienda.md))

- [ ] **Admin → Configuración → General**: name, contact, WhatsApp, Instagram, address, hours — they feed `/contacto`, `/privacidad` and the footer
- [ ] **Admin → Configuración → Tienda**: shipping flat rate, free-shipping threshold, categories, home section titles, "Envíos y devoluciones", product info/care defaults
- [ ] **Admin → Productos**: products with photos, variants, sizes, stock, and per-product shipping surcharge if needed
- [ ] **Admin → Inicio (Hero)**: at least one slide (without slides the home shows the static hero)

::: info Shipping countries
Stripe Checkout collects addresses in Mexico, the US and Canada (`StripeCheckoutService#shipping_countries`). Anything else is a code change in the client's repo.
:::

## 7. Verify before handoff

```bash
# From any checkout of the base
bin/eclipse_smoke https://tiendaluna.mx --modules shop
```

- [ ] Smoke is green: universal routes, Stripe webhook alive (400, not 500), and `/classes`, `/packages`, `/eventos`, `/video` and the Wellhub/MUX/Postmark webhooks all **404**
- [ ] `/tienda` is 200 (a note instead means the switch is off: Admin → Configuración → Tienda → "Habilitar tienda/mercancía")
- [ ] `curl -s https://tiendaluna.mx/catalogo.json` lists the products, and `/llms.txt` answers (both 404 if "Publicar el catálogo para asistentes de IA" is off in Configuración → General)

Manual checklist (≈ 5 minutes):

- [ ] **Sign-up**: register with a real email → the confirmation email arrives → login works
- [ ] **Guest purchase with shipping**: add a product to the cart, pay with `4242 4242 4242 4242` → the order appears in **Pedidos → Por enviar** with its address, stock goes down, the customer gets the confirmation and the owner gets the "nuevo pedido" email + bell notification
- [ ] **Pickup purchase**: choose "recoger en el estudio" → Stripe asks for no address and charges no shipping
- [ ] **Fulfilment**: capture carrier + tracking number on that order → the customer gets the tracking email
- [ ] **Payment link**: Pedidos → Crear pedido → "Link de pago (Stripe)" → generate the link and pay it
- [ ] **Branding**: colors, logo, name, timezone; the confirmation emails use the brand color
- [ ] Optional: `bin/stripe_smoke` from the client's clone with their **test** key, to confirm real events from their account land correctly

→ Reference: [Step 6 — Verify before handoff](./creating-an-instance.md#step-6-verify-before-handoff)

## 8. Go live

- [ ] In Stripe **live mode**, create the same webhook endpoint and events
- [ ] Switch the keys:
  ```bash
  heroku config:set STRIPE_SECRET_KEY=sk_live_... STRIPE_PUBLISHABLE_KEY=pk_live_... \
      STRIPE_WEBHOOK_SECRET=whsec_... -a tienda-luna
  ```
- [ ] Cancel or delete the test orders you created (Pedidos → cancel returns the stock)
- [ ] Hand over the admin account and the [Tienda manual](../manual/admin/tienda.md); for shipping operations, the base repo's [`docs/GUIA_ENVIOS_ENVIA.md`](https://github.com/luismnzr/eclipse-v1/blob/main/docs/GUIA_ENVIOS_ENVIA.md)

## Afterwards

| Need | Command |
|------|---------|
| Client buys email campaigns | `heroku config:set ECLIPSE_MODULES=shop,marketing -a tienda-luna` + update `modules:` in `config/instance.yml` + create the `broadcast` stream and its webhook in Postmark (see [Modules & Licensing](./modules.md)) |
| Client pauses | `bin/eclipse_destroy --pause` (≈ $8/month remain) — `--resume` to come back |
| Client cancels | `bin/eclipse_destroy --destroy` (backs up Postgres first, irreversible) |
| Base improvement | Backport it in the client's repo and `git push tienda-luna main` — never pull from the base |

→ Reference: [Pausing or tearing down an instance](./creating-an-instance.md#pausing-or-tearing-down-an-instance)
