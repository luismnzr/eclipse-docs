# Theming & Client Customization

Every Eclipse client gets a unique visual identity. The base application is intentionally black-and-white and minimal. Customization happens at three levels.

## Level 1 — Theme Variables

CSS custom properties in `app/assets/stylesheets/theme.css` control the color palette, typography, spacing, and shadows across the entire app:

```css
:root {
  /* Colors */
  --color-primary: #000000;
  --color-primary-foreground: #ffffff;
  --color-secondary: #f5f5f5;
  --color-secondary-foreground: #000000;
  --color-accent: #000000;
  --color-accent-foreground: #ffffff;
  --color-background: #ffffff;
  --color-foreground: #000000;
  --color-muted: #f5f5f5;
  --color-muted-foreground: #737373;
  --color-border: #e5e5e5;
  --color-destructive: #ef4444;

  /* Typography */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-heading: var(--font-sans);

  /* Spacing & Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
}
```

To customize a client: override these variables with the studio's brand colors, fonts, and design preferences. Every UI component references these variables, so changing them propagates everywhere.

## Level 2 — ViewComponent Templates

Eclipse uses a shadcn-inspired ViewComponent library in `app/components/ui/`. Each component is a Ruby class paired with an ERB template:

| Component | File |
|-----------|------|
| Button | `button_component.rb` |
| Card | `card_component.rb` / `.html.erb` |
| Dialog (Modal) | `dialog_component.rb` / `.html.erb` |
| Input | `input_component.rb` / `.html.erb` |
| Select | `select_component.rb` / `.html.erb` |
| Table | `table_component.rb` / `.html.erb` |
| Tabs | `tabs_component.rb` / `.html.erb` |
| Badge | `badge_component.rb` |
| Avatar | `avatar_component.rb` |
| Alert | `alert_component.rb` / `.html.erb` |
| Dropdown | `dropdown_component.rb` / `.html.erb` |
| Toast | `toast_component.rb` / `.html.erb` |

For deeper customization, override individual component templates. The components use Tailwind utility classes that reference the theme variables, so most visual changes are achievable through Level 1 alone.

## Level 3 — Page Templates

Full page layouts and view templates can be customized per client. The base provides three layouts:

| Layout | File | Used By |
|--------|------|---------|
| Student | `app/views/layouts/application.html.erb` | All student-facing pages |
| Admin | `app/views/layouts/admin.html.erb` | Admin dashboard |
| Teacher | `app/views/layouts/teacher.html.erb` | Teacher views |

Page-level customization includes:
- Hero sections, landing page content
- Navigation structure and footer
- Page-specific styling and layout tweaks

## Static Assets

Replace these files per client:

| Asset | Path | Purpose |
|-------|------|---------|
| Logo | `app/assets/images/logo.svg` | Studio logo (header, emails) |
| OG Image | `app/assets/images/og-image.png` | Social media preview image |
| Favicon | `public/favicon.ico` | Browser tab icon |

## Studio Configuration Seed

Each client gets a seed file with their studio information:

```ruby
# db/seeds/studio.rb
StudioSetting.upsert_all([
  { key: 'studio_name', value: 'My Yoga Studio' },
  { key: 'studio_timezone', value: 'America/Mexico_City' },
  { key: 'cancellation_window_hours', value: '12' },
  { key: 'currency', value: 'mxn' },
  # ...
])
```

## Customization Workflow

When setting up a new client:

1. Clone the base repo
2. Update `theme.css` with brand colors and fonts
3. Replace logo, favicon, and OG image
4. Customize page templates (hero, landing page, about page)
5. Optionally override ViewComponent templates for deeper design changes
6. Update the studio seed file
7. Deploy

The [Client Setup Guide](https://github.com/luismnzr/eclipse-v1/blob/main/docs/CLIENT_SETUP_GUIDE.md) covers this process in full detail.
