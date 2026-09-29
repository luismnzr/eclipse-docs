# Modules & Licensing

Eclipse is one codebase with **licensable modules**. Every instance (one clone per client) is created with a **license**: the list of modules that client paid for. Anything not licensed **does not exist** in that instance — no public routes, no admin screens, no settings sections, no menu entries. This matters because flavors are priced differently: a *store* client must not see (or be able to switch on) the reservations of a *studio* plan.

## Two layers, two owners

| Layer | Owner | Where it lives | Example |
|-------|-------|----------------|---------|
| **License** | Operator (you) | `ECLIPSE_MODULES` (ENV) / `config/instance.yml` | The instance has the `shop` module or not |
| **Configuration** | Client's admin | `StudioSetting` (Admin → Configuración) | With `shop` licensed, the "Habilitar tienda" switch decides whether the storefront is public yet |

Configuration only operates **inside** the license. For example:

```ruby
# app/models/studio_setting.rb
def self.shop_enabled?
  Eclipse::Modules.enabled?(:shop) && get("shop_enabled") == "true"
end
```

## Available modules

| Module | Includes | Requires |
|--------|----------|----------|
| `reservations` | Classes, templates, categories, reservations, waitlist, packages, subscriptions, check-ins (internal and external), teachers (role + teacher panel) | — |
| `events` | Public events (`/eventos`), registrations and their checkout | — |
| `shop` | Full ecommerce: admin catalog and orders, storefront, cart, checkout, payment links | — |
| `wellhub` | Wellhub integration | `reservations` |
| `video` | Studio Online: recorded classes on MUX | `reservations` |
| `marketing` | Email campaigns to opted-in users (audiences adapt to the license) | — |

**Always present** (not modules): users and profiles, hero slides, legal pages (`/privacidad`, `/contacto`), discounts, notifications, studio settings, reports (showing only the licensed modules' sections) and the user's payment/order history.

## Presets

`config/presets/*.yml` define the commercial flavors. They're just module lists, customizable per client with `--modules`:

| Preset | Modules |
|--------|---------|
| `studio` | reservations, events, shop, wellhub |
| `store` | shop |
| `personal` | shop, events |

```yaml
# config/presets/store.yml
name: Eclipse Store
modules:
  - shop
```

Add-ons billed separately: `video` and `marketing`, added with `--modules` at creation time or later via `ECLIPSE_MODULES`.

## How the license is resolved

`Eclipse::Modules` (`lib/eclipse/modules.rb`) uses the first source that applies:

1. **`ENV["ECLIPSE_MODULES"]`** — comma-separated, e.g. `shop,events`. This is the effective license in production (set by `bin/setup_client --heroku`).
2. **`config/instance.yml`** — the `modules:` key (written by `bin/eclipse_new` / `bin/setup_client`, committed in the client's repo).
3. **Neither:** **all modules**. The base in development and instances created before the module layer keep working unchanged.

The license is **validated at boot**. An unknown module, a missing dependency (e.g. `wellhub` without `reservations`) or an explicitly empty license (`ECLIPSE_MODULES=","`, or `modules:` with no entries) fails the boot with a clear message instead of being silently ignored.

::: warning "Not configured" means everything
A clone with no `config/instance.yml` and no `ECLIPSE_MODULES` licenses **every** module. That's why `bin/eclipse_new` writes the manifest right after cloning, even with `--no-setup`.
:::

## Using it in code

```ruby
# Anywhere
Eclipse::Modules.enabled?(:shop)     # => true / false
Eclipse::Modules.licensed            # => ["shop", "marketing"]
```

```erb
<%# Views — helper %>
<% if module_enabled?(:reservations) %>
  <%= link_to "Clases", classes_path %>
<% end %>
```

```ruby
# config/routes.rb — unlicensed routes are not mounted (404)
constraints ->(_req) { Eclipse::Modules.enabled?(:events) } do
  resources :events, path: "eventos", only: %i[index show]
end
```

The seeds follow the same rule: `db/seeds.rb` only seeds teachers, classes, packages and plans with `reservations`, and `db/seeds/demo.rb` builds each demo section from the licensed modules.

## Changing an instance's license

```bash
heroku config:set ECLIPSE_MODULES=shop,events -a <app>
```

Then update `modules:` in the client repo's `config/instance.yml` so it stays documented. Removing a module deletes no data (tables stay intact); only its surface disappears. Re-adding it brings everything back.

## Adding a new module to the base

1. Add it to `Eclipse::Modules::KNOWN` (and to `DEPENDENCIES` if it needs another module).
2. Mount its routes inside `constraints ->(_req) { Eclipse::Modules.enabled?(:name) }`.
3. Hide its surfaces with `module_enabled?(:name)`: navbar, footer, home, admin nav, dashboard, settings, reports and sitemap.
4. Add it to the presets that should include it.
5. Write gating tests with `Eclipse::Modules.with_licensed(...)` (see `test/controllers/eclipse_modules_gating_test.rb`).
6. If it needs keys, add its prompts to `bin/setup_client` behind `has_module <name>`, and its checks to `bin/eclipse_smoke`.

```ruby
# Test helper: fix the license inside a block without touching ENV
Eclipse::Modules.with_licensed(%w[shop]) do
  get "/classes"
  assert_response :not_found
end
```
