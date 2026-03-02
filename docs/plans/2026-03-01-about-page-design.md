# About Page Design — East Spruce Design Build

**Date:** 2026-03-01
**Approach:** Cinematic Scroll
**Source PRD:** `brand_assets/EastSpruce_About_PRD_v3.pdf`
**Output:** `site/about.html`

## Design Decisions

- **Layout approach**: Cinematic Scroll — alternating contained and full-bleed sections with distinct visual treatments per section
- **Hero video**: Use existing `brand_assets/cabin_in_woods_web.mov` drone footage as muted/looped background
- **Section layouts**: Mixed creatively (not uniform text-left/photo-right)
- **Credentials**: Text-based styled cards (no logo/badge files needed)
- **Design language**: Matches homepage exactly — same colors, typography, spacing, animations

## Brand Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--teal` | `#1BADA6` | Accent — labels, highlights, CTAs |
| `--teal-dark` | `#148F89` | Hover states |
| `--dark` | `#141414` | Dark sections |
| `--warm-white` | `#F5F3EF` | Light sections |
| `--light` | `#DCDAD5` | Subtle backgrounds |

## Typography

- **Display**: Cormorant Garant (300–600, italic available)
- **Body/UI**: DM Sans (300–600)

## Sections

### 1. Hero — Video Background (100vh)
- Full-viewport, `cabin_in_woods_web.mov` muted/looped as background
- Dark gradient overlay (bottom-heavy)
- Label: "About East Spruce" — uppercase DM Sans, teal accent line above
- Headline: **"Built from Passion. Guided by Principle."** — large Cormorant Garant
- 1-2 lines supporting subtext
- Scroll hint bottom-right (reused from homepage)
- Staggered fadeUpIn animations

### 2. Our Story — Split Layout with Stacked Photos
- Warm-white background (`#F5F3EF`)
- Left column (55%): label "Our Story" in teal, headline "It Started With a Drawing and a Shovel", 2-3 paragraphs origin story (childhood → Barnstone → Solar Decathlon → Penn State → 9 years firm → ESDB 2018)
- Right column (45%): 2-3 placeholder photos stacked at slight angles (3-5° rotation), subtle shadows, teal accent corner on one
- Scroll-triggered fadeUpIn animations

### 3. The Studio — Full-Bleed with Floating Card
- Full-width studio/carriage house image (placeholder)
- Floating dark semi-transparent card overlaid lower-left:
  - Label: "Where We Work"
  - Headline: "A Studio That Practices What It Preaches"
  - Copy: renovated 19th-century carriage house, fossil-fuel free, EV charging, smart daylighting, solar near net-zero
  - Optional CTA: "See Our Work →"

### 4. The Philosophy — Dark Section
- Dark background (`#141414`)
- Two-column: text left, detail image right
- Label: "Our Approach" in teal
- Headline: "Sustainability Isn't a Feature. It's How We Think."
- Copy: SAVE framework, 100-year design horizon
- CTA: "Learn About Our Approach →"
- Detail photo placeholder (wall assembly, insulation, material close-up)

### 5. Meet Elliot — Portrait-Dominant
- Warm-white background
- Reversed layout: large portrait left (60%), text right (40%)
- Label: "The Founder"
- Headline: "Meet Elliot Nolter"
- Credentials: RA (PA & NJ), CPHC, SHP
- Personal story about involvement from first conversation to final walkthrough
- CTA: "Start a Conversation →"

### 6. Credentials & Certifications — Badge Strip
- Light gray background (subtle separation from warm-white)
- Horizontal row of text-based credential cards
- Each: icon/symbol + name + brief description
- Licensed Architect (PA & NJ), CPHC, SHP, Penn State Solar Decathlon Alumni, AIA Member

### 7. Closing CTA — Full-Bleed Emotional Close
- Reuses homepage closing CTA pattern
- Full-bleed lifestyle photo placeholder, dark overlay
- Headline: "Great design doesn't just look right. It feels right."
- CTA button: "Start Your Project"

### 8. Footer
- Reused identically from homepage

## Technical Notes

- Single HTML file (`site/about.html`) with inline styles + Tailwind CDN
- Video served locally from `site/` (copy from brand_assets)
- Placeholder images from `placehold.co`
- Mobile-first responsive (breakpoints: 600px, 900px)
- Scroll-triggered animations via IntersectionObserver
- Navigation links match homepage (Portfolio, Services, About, Start a Project)
