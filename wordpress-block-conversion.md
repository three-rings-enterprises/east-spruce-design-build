# HTML → WordPress Block Theme Conversion Reference

Convert an existing HTML site (Tailwind/inline styles) into a WordPress block theme and deploy it to a local WordPress Studio site.

## Workflow

1. **Inventory pages** — Identify every HTML page (index, about, contact, etc.) and shared elements (header, footer, nav).
2. **Extract design tokens** — Pull colors, fonts, spacing from the HTML/CSS into `theme.json` format.
3. **Scaffold theme** — Create the theme directory with `theme.json`, `style.css`, `functions.php`.
4. **Convert markup** — For each page, convert HTML to WordPress block markup. Extract shared header/footer into template parts.
5. **Deploy to Studio** — Create or select a Studio site, write theme files, activate, and create content pages.
6. **Verify** — Screenshot both the original HTML site and the Studio site. Compare and fix differences. Repeat until they match.

---

## Block Markup Syntax

Every HTML element maps to a WordPress block wrapped in comment delimiters with JSON attributes:

```html
<!-- wp:block-name {"attr":"value"} -->
<tag class="wp-block-block-name">content</tag>
<!-- /wp:block-name -->
```

Self-closing blocks (no inner content):
```html
<!-- wp:block-name {"attr":"value"} /-->
```

---

## HTML → Block Mappings

| HTML | WordPress Block |
|------|----------------|
| `<div>` (container) | `<!-- wp:group {"layout":{"type":"constrained"}} -->` |
| `<section>` (full-width) | `<!-- wp:group {"align":"full","layout":{"type":"constrained"}} -->` |
| `<h1>`–`<h6>` | `<!-- wp:heading {"level":N} -->` |
| `<p>` | `<!-- wp:paragraph -->` |
| `<img>` | `<!-- wp:image {"url":"...","alt":"..."} -->` |
| `<a>` (button) | `<!-- wp:button --><div class="wp-block-button"><a class="wp-block-button__link">Text</a></div><!-- /wp:button -->` |
| `<a>` (text link) | Use inline `<a>` inside a `wp:paragraph` block |
| `<ul>` / `<ol>` | `<!-- wp:list -->` / `<!-- wp:list {"ordered":true} -->` |
| Grid/flex columns | `<!-- wp:columns {"align":"wide"} -->` with `<!-- wp:column {"width":"33.33%"} -->` children |
| `<header>` | `<!-- wp:template-part {"slug":"header","tagName":"header"} /-->` |
| `<footer>` | `<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->` |
| Background image section | `<!-- wp:cover {"url":"...","dimRatio":60} -->` |
| Spacer | `<!-- wp:spacer {"height":"4rem"} /-->` |

### Applying Styles

- **Theme colors**: Use `"backgroundColor":"primary"` or `"textColor":"dark"` (slug from `theme.json` palette).
- **Custom classes**: Use `"className":"my-class"` and define `.my-class` in `style.css`.
- **Inline styles**: Use `"style":{"spacing":{"padding":{"top":"2rem"}},"color":{"background":"#f5f5f5"}}}`
- **Tailwind classes cannot be used** — convert them to block attributes, theme.json tokens, or custom CSS.

---

## Theme File Structure

```
theme-slug/
├── theme.json              # Design tokens + global styles
├── style.css               # WP metadata header + custom CSS
├── functions.php           # Font/asset enqueuing
├── templates/
│   ├── index.html          # Homepage / fallback
│   ├── page.html           # Default page template
│   ├── page-about.html     # Custom page template (per slug)
│   ├── page-contact.html   # Each HTML page → its own template
│   └── single.html         # Blog post (if applicable)
└── parts/
    ├── header.html         # Shared header
    └── footer.html         # Shared footer
```

For each HTML page, create a `templates/page-{slug}.html`. The homepage uses `templates/index.html`.
Every template starts and ends with the shared header/footer parts:

```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">
  <!-- page content blocks here -->
</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
```

---

## theme.json (Template)

```json
{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 3,
  "settings": {
    "appearanceTools": true,
    "layout": { "contentSize": "800px", "wideSize": "1280px" },
    "color": {
      "defaultPalette": false,
      "defaultGradients": false,
      "palette": [
        { "slug": "primary", "name": "Primary", "color": "#__EXTRACT__" },
        { "slug": "secondary", "name": "Secondary", "color": "#__EXTRACT__" },
        { "slug": "accent", "name": "Accent", "color": "#__EXTRACT__" },
        { "slug": "light", "name": "Light", "color": "#__EXTRACT__" },
        { "slug": "dark", "name": "Dark", "color": "#__EXTRACT__" }
      ]
    },
    "typography": {
      "fontFamilies": [
        { "slug": "display", "name": "Display", "fontFamily": "\"__EXTRACT__\", serif" },
        { "slug": "body", "name": "Body", "fontFamily": "\"__EXTRACT__\", sans-serif" }
      ],
      "fontSizes": [
        { "slug": "small", "name": "Small", "size": "0.875rem" },
        { "slug": "base", "name": "Base", "size": "1rem" },
        { "slug": "large", "name": "Large", "size": "1.25rem" },
        { "slug": "xl", "name": "XL", "size": "1.75rem" },
        { "slug": "2xl", "name": "2XL", "size": "2.5rem" }
      ]
    }
  },
  "styles": {
    "color": { "background": "#__LIGHT__", "text": "#__DARK__" },
    "typography": {
      "fontFamily": "var(--wp--preset--font-family--body)",
      "fontSize": "var(--wp--preset--font-size--base)",
      "lineHeight": "1.6"
    },
    "elements": {
      "heading": { "typography": { "fontFamily": "var(--wp--preset--font-family--display)", "lineHeight": "1.2" } },
      "link": { "color": { "text": "var(--wp--preset--color--accent)" } },
      "button": {
        "color": { "background": "var(--wp--preset--color--accent)", "text": "#ffffff" },
        "border": { "radius": "4px" }
      }
    }
  }
}
```

Replace all `__EXTRACT__` placeholders with values from the source HTML.

---

## style.css

```css
/*
Theme Name: __THEME_NAME__
Author: __AUTHOR__
Description: A WordPress block theme
Version: 1.0.0
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
Text Domain: __THEME_SLUG__
*/

/* --- Custom CSS ported from Tailwind/inline styles --- */
/* Animations, shadows, gradients, pseudo-elements, etc. */

/* --- Editor visibility (required if using entrance animations) --- */
.editor-styles-wrapper [class*="fade-"],
.editor-styles-wrapper [class*="slide-"] {
  opacity: 1 !important;
  transform: none !important;
}

/* --- Reduced motion --- */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* --- Footer margin reset --- */
.wp-site-blocks > footer { margin-block-start: 0; }
```

---

## functions.php

```php
<?php
function __THEME_SLUG___enqueue_assets() {
    wp_enqueue_style(
        '__THEME_SLUG__-fonts',
        'https://fonts.googleapis.com/css2?family=__DISPLAY_FONT__:wght@400;600;700&family=__BODY_FONT__:wght@400;500;600&display=swap',
        array(), null
    );
    wp_enqueue_style('__THEME_SLUG__-style', get_stylesheet_uri(), ['__THEME_SLUG__-fonts']);
}
add_action( 'enqueue_block_assets', '__THEME_SLUG___enqueue_assets' );
```

---

## Deployment via Studio CLI

```bash
# Create site (skip if using existing site)
studio site create --path ~/Studio/__SITE_NAME__

# Start site
studio site start --path ~/Studio/__SITE_NAME__ --skip-browser

# Theme files should already be written to:
# ~/Studio/__SITE_NAME__/wp-content/themes/__THEME_SLUG__/

# Activate theme
studio wp --path ~/Studio/__SITE_NAME__ theme activate __THEME_SLUG__

# Create pages to match templates (one per page-{slug}.html template)
studio wp --path ~/Studio/__SITE_NAME__ post create --post_type=page --post_title="About" --post_name="about" --post_status=publish
studio wp --path ~/Studio/__SITE_NAME__ post create --post_type=page --post_title="Contact" --post_name="contact" --post_status=publish
# Repeat for each page...

# Set homepage to static page
studio wp --path ~/Studio/__SITE_NAME__ option update show_on_front page
studio wp --path ~/Studio/__SITE_NAME__ option update page_on_front "$(studio wp --path ~/Studio/__SITE_NAME__ post list --post_type=page --name=home --field=ID 2>/dev/null || echo 2)"

# Create shareable preview (optional)
studio preview create --path ~/Studio/__SITE_NAME__
```

---

## Verification: Screenshot Comparison

After deploying, compare the original HTML site against the WordPress site:

1. Screenshot the original HTML site (e.g. `node screenshot.mjs http://localhost:3000`)
2. Get the Studio site URL from `studio site list --format=json`
3. Screenshot the Studio site (e.g. `node screenshot.mjs http://localhost:8881`)
4. Read both screenshots and compare visually
5. Fix differences in the theme files, re-screenshot, repeat until matched

Check: layout/spacing, font rendering, colors, responsive behavior, animations, hover states.
For multi-page sites, screenshot and compare each page individually.

---

## Gotchas

1. **Never use `<!-- wp:html -->`** — decompose everything into core blocks with `className` + CSS. HTML blocks are opaque to the editor.
2. **Use `enqueue_block_assets`, not `wp_enqueue_scripts`** — fonts must load in both the front-end and the block editor.
3. **Full-width sections need `"align":"full"`** — without this, sections render at `contentSize` width (800px) instead of edge-to-edge.
4. **No nested `<p>` tags** — AI commonly generates `<p><p>text</p></p>`. WordPress will break. One `<p>` per `wp:paragraph` block.
5. **Column widths must be explicit** — for N columns, set `"width":"__PCT__%"` on each `wp:column` (e.g. 3 columns = `"33.33%"`). Don't rely on CSS flex.
6. **Animations need editor overrides** — if you use `opacity: 0` for entrance animations, content is invisible in the block editor. Add `.editor-styles-wrapper` overrides in `style.css`.
7. **Block wrapper classes must match attributes** — if JSON says `"backgroundColor":"primary"`, the div must have `has-primary-background-color has-background`.
8. **Theme slug format** — lowercase, hyphens only: `^[a-z0-9-]+$`. No spaces, underscores, or capitals.
