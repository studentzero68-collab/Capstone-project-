# Zero — Where Every Journey Begins

> A unique Airbnb-inspired accommodation platform built as a Full Stack Web Development Capstone Project.
> Zero is for the people who never got to travel growing up — every stay is affordable, bold, and makes you feel like royalty.

---

## Live Demo

Deployed on Heroku: *(add your Heroku link here once deployed)*

GitHub Repository: [https://github.com/studentzero68-collab/Capstone-project-](https://github.com/studentzero68-collab/Capstone-project-)

---

## What is Zero?

**Zero** symbolises beginnings and fresh starts. It was built with a personal mission: you don't have to be rich to enjoy the world. The platform gives every type of traveller — first-timers, solo adventurers, families, friend groups, and romantic partners — a space that feels like it was made for them.

The aesthetic is **chill but bold** — black, deep blue, and a sunset purple-to-orange gradient palette. Fonts are **Lobster** (italic headings) and **Caveat** (handwritten accents), giving every screen a warm, human feel. The whole experience is built to make the most common person feel open, free, and like nobility.

---

## Pages & Features

### 1. Home Page
- **Hero section** with animated gradient background, main headline, and two CTA buttons
- **Journey Type Selector** — choose Romantic, Friends, Family, or Solo travel, each triggering a unique animation:
  - Romantic → falling roses and petals
  - Friends → fist bump emojis burst across the screen
  - Family → bouncing family emojis appear
  - Solo → a knight chess piece walks across the screen
- **Property listings grid** — filterable by category via the navbar category bar
- **Culture sections** — tabbed sections for Japanese, Korean, and South African themed stays (plus an "All" view)
- **Why Zero** — four value proposition cards explaining the mission
- **Newsletter signup** — with email validation and confirmation feedback
- **Load more** button to progressively reveal listings

### 2. Search Results Page
- Triggered by the navbar search bar (searches title, location, category)
- Results count displayed dynamically
- **Sort by** dropdown: Recommended, Price (low to high), Price (high to low), Top Rated
- Split layout: **results column** on the left, **interactive map placeholder** on the right with animated price pins
- All active filters (price range, beds, property type, amenities) apply to search results

### 3. Listing Detail Page
- **Photo grid** (3-image layout, first image spans full height)
- Full listing title, location, category badge, guest/bed/bath meta
- Star rating with review count
- **Host profile** section with name and superhost status
- Full description of the property
- **Amenities list** in a 2-column grid
- **Guest reviews** with star ratings and dates
- **Sticky booking card** (right column) with:
  - Price per night
  - Check-in / Check-out date pickers
  - Guest stepper (plus/minus buttons, capped at max guests)
  - **Live price breakdown** (nightly cost + 12% Zero service fee + total)
  - Reserve button with toast confirmation

### 4. Filter Panel (accessible from any listings page)
- Price range dual sliders (R0 — R5,000)
- Bedroom stepper
- Property type checkboxes
- Amenities checkboxes
- Clear all / Apply buttons

### 5. Wishlist
- Heart button on every card
- Persisted to `localStorage` — survives page refreshes

---

## Property Categories

| Category | Description |
|---|---|
| Treehouses | Canopy escapes in forests and mountains |
| Beach Spots | Beachside shacks, surf houses, coastal retreats |
| Garage Homes | Converted industrial spaces with car bays |
| Baker's Apartments | Professional kitchens, proofing ovens, homey feel |
| Musician Studios | Soundproofed live-in recording spaces |
| Gamer Dens | High-spec gaming setups, streaming corners |

## Cultural Sections

| Culture | Vibe |
|---|---|
| Japanese | Tatami, onsen, zen gardens, minimalism |
| Korean | Hanok-inspired, K-drama rooms, karaoke, skincare |
| South African | Ubuntu spirit, braai, township art, Karoo farmstays |

---

## How the Code Works

### File Structure

```
Capstone project/
├── index.html    — Single HTML file, all three page views
├── style.css     — Full stylesheet (variables, all components, responsive)
├── main.js       — All data, routing, rendering, and interactions
└── README.md     — This file
```

### index.html

The app uses a **single-page architecture** — three `<div>` sections act as "pages":

- `#page-home` — the home/landing page
- `#page-search` — search results with a map panel
- `#page-detail` — individual listing detail view

Only one page has `class="active"` at a time. JavaScript swaps the `active` class to navigate between them without any page reload.

The navbar contains:
- The **brand logo** (always visible)
- A **multi-field pill search bar** (Where / Check-in / Check-out / Guests)
- A **category filter bar** with scrollable pills
- A **user menu button** with a dropdown

A **filter panel** and **animation overlay** sit as fixed-position overlays, toggled by JS.

### style.css

Organised into clearly labelled sections:

1. **CSS custom properties** — all colours, gradients, fonts, radii, shadows, and transitions in one place
2. **Reset & base** — normalises browser defaults
3. **Utility classes** — `.hidden`, `.page`, `.reveal`, `.section-title`
4. **Animation overlay** — keyframe animations for all four journey types
5. **Navbar** — sticky top bar, pill search bar, category pills, filter button
6. **Hero** — full-viewport gradient banner with scroll indicator
7. **Journey cards** — hover lift effects, active state glow
8. **Listings grid & card** — image zoom on hover, badge, wishlist button, price
9. **Search page** — two-column layout with sticky map
10. **Detail page** — photo grid, two-column info/booking layout, booking card
11. **Filter panel** — modal overlay with range sliders and checkboxes
12. **Footer** — four-column grid with brand, links, and bottom bar
13. **Responsive** — breakpoints at 1100px, 768px, 640px, 400px

The colour palette uses **CSS gradients** throughout — `--gradient-sunset` (purple → red → orange → gold) is applied to headings, buttons, badges, and price text via `background-clip: text`.

### main.js

Organised into clear sections with comments:

**DATA**
- `LISTINGS` array — 18 property objects, each with: id, category, culture, title, location, price, rating, reviews, guests, beds, baths, badge, image URL, amenities array, description, host info, and reviews array

**STATE**
- A single `state` object holds all app state: current page, active filters, search query, dates, guests, sort order, wishlist, and booking data

**ROUTING**
- `navigateTo(page)` — switches the active page, scrolls to top, shows/hides nav elements

**RENDERING**
- `buildCard(listing)` — creates a full listing card DOM element with image, badge, wishlist button, meta, rating, and price
- `renderHomeListings()` — filters and renders cards into the home grid
- `renderCultureGrid()` — filters by culture and renders
- `renderSearchResults()` — filters by search query + all panel filters + sort

**DETAIL PAGE**
- `openDetail(listing)` — populates all detail page fields from the listing object, sets up the booking card
- `updateBookingBreakdown()` — calculates nights, subtotal, fee, and total dynamically when dates change

**ANIMATIONS**
- `playAnimation(type)` — creates DOM elements for each journey type animation and auto-dismisses after 3.2s

**INTERACTIONS**
- `initCatBar()` — category pill tabs
- `initSearchBar()` — search triggers navigation to search page
- `initFilterPanel()` — opens/closes filter modal, applies/clears filter state
- `initBookingCard()` — date pickers, guest stepper, reserve button, price breakdown
- `initJourneyCards()` — triggers journey animations
- `initCultureTabs()` — swaps culture filter
- `initNewsletter()` — validates email, shows confirmation
- `initNavDropdown()` — opens/closes user menu
- `showToast(msg, bg)` — brief notification overlay

**UTILITIES**
- `toggleWishlist(id, btn)` — adds/removes from wishlist array, persists to `localStorage`
- `initReveal()` — `IntersectionObserver` for scroll-triggered fade-in animations
- `initStickyNav()` — adds drop shadow to navbar on scroll

---

## Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Semantic structure, ARIA accessibility attributes |
| CSS3 | Custom properties, CSS Grid, Flexbox, keyframe animations, `backdrop-filter`, `background-clip: text` |
| Vanilla JavaScript (ES6+) | All interactivity — no frameworks, no dependencies |
| Google Fonts | Lobster, Caveat, Inter |
| Unsplash | Royalty-free property images via URL |
| localStorage | Wishlist persistence |

---

## Design Decisions

- **No frameworks** — pure HTML, CSS, and JS as required by the brief
- **Single-page routing** — avoids multiple HTML files while still presenting distinct "pages"
- **18 unique listings** across 9 categories — enough data to meaningfully demonstrate all filter and search features
- **Accessible by default** — ARIA roles, labels, `aria-selected`, `aria-pressed`, `aria-live` regions, keyboard navigation, and visible focus indicators throughout
- **Mobile-first responsive** — layouts collapse gracefully at 1100px, 768px, 640px, and 400px
- **Sticky booking card** — mirrors the real Airbnb UX, stays in view as you scroll the detail page
- **Live price breakdown** — calculates dynamically as dates are selected, including a 12% service fee

---

## Running Locally

No build step required — this is a pure HTML/CSS/JS project.

1. Clone the repository:
   ```bash
   git clone https://github.com/studentzero68-collab/Capstone-project-.git
   cd Capstone-project-
   ```
2. Open `index.html` in any modern browser — or use the VS Code Live Server extension.

---

## Deployment

This project is deployed on **Heroku** using a static file server.

Steps to deploy:
1. Create a `package.json` and a simple Express static server (or use `heroku-static-buildpack`)
2. `heroku create zero-capstone`
3. `git push heroku main`

*(Full deployment instructions to be added once live URL is confirmed)*

---

## Author

Built by a student at **Zaio Full Stack Developer Boot Camp** — Capstone Project 2026.

*"Every great journey starts from zero."*
