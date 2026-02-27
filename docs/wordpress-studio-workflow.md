# WordPress Studio Local Development Workflow

## Overview

A brainstormed workflow for building a custom website locally with Claude, using WordPress Studio as the local environment, and deploying to a live WordPress site — with a page builder for final content polish.

---

## The Core Workflow

```
Claude (in VS Code / Claude Code)
    ↕ edits files directly
WordPress Studio (local WP environment)
    ↕ live preview in browser
    ↕ Studio Sync
Live WordPress site (WordPress.com or Pressable)
    ↕ page builder for final content
```

### Step by Step

1. **Create a site in WordPress Studio** — takes ~30 seconds, gives you a full local WP install
2. **Open the theme folder in VS Code** — Studio has a built-in button for this; that folder is where Claude works
3. **Build the theme together** — converting existing HTML/CSS/JS into proper WP theme files (`style.css`, `header.php`, `page.php`, etc.)
4. **Studio renders it live** — real WordPress output with the active theme, plugins installed, etc.
5. **Install the page builder in Studio** — Elementor, Bricks, etc. run locally to test compatibility before going live
6. **Use Studio Sync to push** — one-click sync to live WordPress.com or Pressable site
7. **Final polish in the page builder** — content, copy, images on the live (or staging) site

---

## WordPress Studio Key Features

- **Free** — available for Mac and Windows
- **Exposes site files on disk** — Claude can directly edit theme files; no copy/paste workflow
- **Open in VS Code button** — seamless editor integration
- **Runs real WordPress** — plugins, admin bar, blocks, and page builders all work locally
- **Studio Sync** — push/pull themes, plugins, database, or entire `wp-content` to/from live site
- **7-day shareable preview URLs** — share with clients before going live
- **Terminal access** — WP-CLI, deploy scripts, command-line management
- **Studio Assistant** — built-in AI for plugin management, WP-CLI tasks (complements Claude's code editing)
- **Git integration** — version control the theme alongside the workflow

---

## Hosting Compatibility

| Hosting | Studio Sync Support |
|---|---|
| WordPress.com | Native — one-click push/pull |
| Pressable | Native — full sync support |
| Self-hosted (SiteGround, Kinsta, etc.) | Manual — use WP Migrate or All-in-One WP Migration plugin |

---

## Page Builder Options

| Builder | Notes |
|---|---|
| Elementor | Most popular; large ecosystem |
| Bricks Builder | More code-friendly; fights less with custom theme CSS |
| Divi | Full-featured; heavier |
| GeneratePress | Lightweight; good for custom theme + builder hybrid |

**Recommendation:** If the custom theme code is the source of truth, use the page builder only for content-editable regions (text, images) — not layout. Bricks Builder is the best fit for this approach.

---

## Approach Options

### Option A: Custom Theme → Page Builder for Content
- Convert HTML/CSS/JS into a WordPress theme
- Page builder handles only text/image editing
- Code stays clean; Claude remains the source of truth
- **Best if:** developer controls layout; client edits content

### Option B: Build Styled for a Page Builder
- Match CSS/JS to the page builder's class structure
- Builder inherits and extends your styles
- **Best if:** long-term editing happens in the page builder

### Option C: Page Builder JSON Templates
- Export/import builder templates (Elementor, Bricks support this)
- Prototype locally, recreate structure as builder templates
- **Best if:** client/non-developer needs full visual editing control

---

## Key Decisions Before Starting

1. **Hosting provider** — WordPress.com or Pressable (native sync) vs. self-hosted (manual migration)?
2. **Page builder** — which one? (affects CSS strategy)
3. **Who owns layout long-term?** — developer (code) or editor (page builder)?

---

## Sources

- [WordPress Studio — Free Local Development Tool](https://developer.wordpress.com/studio/)
- [WordPress Studio Docs](https://developer.wordpress.com/docs/developer-tools/studio/)
- [Meet Studio Sync for WordPress.com](https://wordpress.com/blog/2025/01/06/studio-sync/)
- [Studio Now Works With Pressable](https://pressable.com/blog/build-locally-sync-seamlessly-studio-now-works-with-pressable/)
- [Local WordPress Development Workflows Using WordPress Studio](https://wordpress.com/blog/2025/03/19/local-wordpress-development-workflows/)
