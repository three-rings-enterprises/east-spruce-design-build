# WordPress Project Setup Plan

## Context

The goal is to set up a WordPress block theme project for East Spruce Design Build that:
- Lives in this git repo for full version control (branches = features/pages, easy rollbacks)
- Is developed in VS Code
- Connects to WordPress Studio for local preview and sharing
- Can either convert the existing static site or start from a clean slate

---

## How the Pieces Connect

```
This Git Repo (VS Code)         WordPress Studio (local server)
─────────────────────           ───────────────────────────────
wordpress-theme/                ~/Studio/east-spruce/
  east-spruce/         ──────▶    wp-content/themes/east-spruce/
    theme.json                    (symlinked OR deployed via MCP)
    style.css
    functions.php
    templates/
    parts/
    assets/
```

Claude Code talks to Studio via the Studio MCP server, which wraps the `studio` CLI to create sites, write files, run WP-CLI, and create shareable preview links.

---

## Step 1: Add Studio MCP Server to Claude Code

The MCP server is currently configured for **Claude Desktop only**. To use it from Claude Code, add it to `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "wordpress-studio-mcp-server": {
      "command": "node",
      "args": [
        "/Users/josephpascucci/Documents/GitHub/east-spruce-design-build/wordpress-agent-skills/studio-mcp/dist/index.js"
      ]
    }
  }
}
```

The `dist/index.js` bundle already exists — no build step required. Restart Claude Code after saving.

---

## Step 2: Create the Studio Site

In a Claude Code session (with MCP active), use:
- `studio_site_create` — creates the local WordPress site at `~/Studio/east-spruce/`
- `studio_site_start` — boots it up and returns the local URL

This only needs to happen once. The Studio site persists between sessions.

---

## Step 3: Git Repo Structure (Theme Lives Here)

Add a `wordpress-theme/` directory to this repo. All WordPress theme files go here:

```
east-spruce-design-build/
├── site/                          # Original static site (reference/archive)
├── wordpress-agent-skills/        # MCP toolkit (unchanged)
├── wordpress-theme/
│   └── east-spruce/               # The block theme
│       ├── theme.json
│       ├── style.css
│       ├── functions.php
│       ├── templates/
│       │   ├── index.html         # Homepage
│       │   ├── page.html
│       │   ├── single.html
│       │   └── 404.html
│       ├── parts/
│       │   ├── header.html
│       │   └── footer.html
│       └── assets/
│           └── images/
└── docs/                          # Design decisions, notes, plans
```

---

## Step 4: Sync Strategy — Repo to Studio

**Recommended: Symlink (zero friction)**

```bash
ln -s \
  /Users/josephpascucci/Documents/GitHub/east-spruce-design-build/wordpress-theme/east-spruce \
  ~/Studio/east-spruce/wp-content/themes/east-spruce
```

Edit in VS Code → changes are instantly live in Studio. No sync step needed.

**Alternative: MCP deploy (on-demand)**

Use `studio_fs_write_file` from Claude Code to push specific files when ready. More control but more friction.

---

## Step 5: Git Workflow (Branching Strategy)

```
main        ── stable, deployable state
feature/    ── new pages or sections (e.g., feature/about-page)
fix/        ── bug fixes and tweaks
```

Each page or design direction gets a branch. Merge to main when approved.
WordPress template files map naturally to branches: one template = one feature branch.

---

## Two Paths: Convert vs. Start Fresh

### Path A: Convert the existing static site (Recommended)
- Translate `site/index.html` into FSE block templates
- Port CSS variables from `site/css/styles.css` into `theme.json` color palette and typography
- Rebuild interactivity (carousel, accordion, scroll-reveal) as block patterns with custom JS in `functions.php`
- ~12 sections → maps to `templates/index.html` (homepage) + `parts/header.html` + `parts/footer.html`
- Images stay external (Unsplash CDN URLs) for now, or move to `assets/images/`

You already have a working, branded design. The static site is well-structured and the conversion is straightforward. Starting fresh risks losing design fidelity.

### Path B: Start fresh with the AI workflow
- Describe the site to Claude Code (with MCP active)
- It generates 3 design previews, you pick one
- Full theme is generated and deployed to Studio automatically
- Then bring in content/copy from the static site manually

---

## What Claude Code Can Do with MCP Active

| Task | MCP Tool |
|------|----------|
| Create/start Studio site | `studio_site_create`, `studio_site_start` |
| Write theme files directly | `studio_fs_write_file` |
| Activate theme | `studio_wp theme activate east-spruce` |
| Create pages/posts | `studio_wp post create ...` |
| Install plugins | `studio_wp plugin install ...` |
| Create a shareable preview URL | `studio_preview_create` |
| Fix broken block markup | `studio_block_fix` |

---

## Key Files to Create (in Order)

1. `wordpress-theme/east-spruce/theme.json` — color palette + typography from static site CSS variables
2. `wordpress-theme/east-spruce/style.css` — theme metadata + animation CSS
3. `wordpress-theme/east-spruce/functions.php` — Google Fonts enqueue + scroll observer JS
4. `wordpress-theme/east-spruce/parts/header.html` — nav block template
5. `wordpress-theme/east-spruce/parts/footer.html` — footer block template
6. `wordpress-theme/east-spruce/templates/index.html` — full homepage (~12 sections)

---

## Verification Checklist

1. MCP connected: run `studio_site_list` from Claude Code — should return site list
2. Site running: `studio_site_start` returns a `localhost:xxxx` URL
3. Theme active: visit `localhost:xxxx` — East Spruce homepage renders
4. Edit loop working: change a color in `theme.json` in VS Code → refresh browser → change visible
5. Preview link: `studio_preview_create` returns a `*.wp.build` URL for client sharing
