# Zero — React Version
## Where Every Journey Begins

A React + Vite conversion of the Zero Airbnb-inspired accommodation platform. Built with modern React hooks, component-based architecture, and responsive design.

---

## What's New in the React Version

### Tech Stack
- **React 18** with Functional Components
- **Vite** for fast development and building
- **CSS 3** with CSS Variables and Gradients
- **ES6+ JavaScript**
- **Local Storage** for wishlist persistence

### Features
- Home Page with Hero, Value Props, Listings Grid, and Newsletter
- Search Page with Filters (Price Range, Sort Options)
- Listing Detail Page with Host Info, Amenities, Reviews, and Booking
- Admin Dashboard with Login (Demo: admin@zero.com / password)
- Category Filtering across all listings
- Wishlist/Save functionality with persistence
- Fully Responsive Design (Mobile, Tablet, Desktop)
- Smooth Animations and Hover Effects
- Modal Navigation without page reloads

---

## Project Structure

```
src/
├── App.jsx                 # Main app component with routing logic
├── main.jsx                # Entry point
├── index.css               # Global styles
├── App.css                 # Main app styles
├── data.js                 # 18 Listings data
│
├── components/
│   ├── Navbar.jsx          # Navigation with search and category filter
│   └── ListingCard.jsx     # Reusable listing card component
│
├── pages/
│   ├── HomePage.jsx        # Home page with hero, value props, listings
│   ├── SearchPage.jsx      # Search results with filters and sorting
│   ├── DetailPage.jsx      # Listing detail with booking
│   └── AdminPage.jsx       # Admin dashboard with login
│
└── styles/
    ├── Navbar.css          # Navbar styling
    ├── ListingCard.css     # Card styling
    ├── HomePage.css        # Home page styling
    ├── SearchPage.css      # Search page styling
    ├── DetailPage.css      # Detail page styling
    └── AdminPage.css       # Admin page styling
```

---

## Key Components

### App.jsx (Root Component)
- Central state management for current page, wishlist, filters
- Navigation logic between pages
- Props passing for all features

### Navbar.jsx
- Sticky navigation with brand logo
- Search bar with form submission
- Category pill buttons for filtering
- User menu dropdown

### ListingCard.jsx
- Reusable card displaying:
  - Property image with badge
  - Title, location, guest/bed/bath info
  - Star rating with review count
  - Price per night
  - Save/Wishlist button

### HomePage.jsx
- Hero section with gradient background
- "Why Zero?" value proposition cards
- Featured stays grid (8 cards initially)
- Load More button for pagination
- Newsletter signup form
- Footer with links

### SearchPage.jsx
- Results count display
- Left sidebar with filters:
  - Price range slider
  - Sort dropdown (Recommended, Price Low→High, Price High→Low, Top Rated)
- Results grid with dynamic filtering
- No results message

### DetailPage.jsx
- Photo grid (1 large + 2 small images)
- Listing details: title, location, badge, rating
- Host profile section
- Quick info cards (guests, beds, bathrooms)
- Full description
- Amenities grid
- Guest reviews section
- Sticky booking card with:
  - Price display
  - Guest/Check-in/Check-out selectors
  - Reserve button
  - Price breakdown

### AdminPage.jsx
- Login page with email/password validation
- Demo credentials: admin@zero.com / password
- Dashboard with:
  - Stats cards (Listings, Reservations, Messages, Earnings)
  - Recent activity feed
  - Logout functionality

---

## Getting Started

### Installation
```bash
cd "Capstone project React"
npm install
```

### Development
```bash
npm run dev
```
Server runs at: **http://localhost:5173/**

### Build for Production
```bash
npm run build
npm run preview  # Preview production build
```

---

## How to Use

### Navigate Between Pages
- Click **brand logo** → Home
- **Search bar** → Search results
- Click **Become a Host** → Admin dashboard
- Click any **listing card** → Detail page
- Click **← Back** on detail page → Home

### Search & Filter
1. Enter destination, category, or amenity in search bar
2. Adjust price range with sliders
3. Select sort option (Recommended, Price, Rating)
4. Results update in real-time

### Save to Wishlist
- Click **Save** button on any card
- Status persists in localStorage
- Saved listings show "Saved" with highlighted button

### Admin Login
- Email: `admin@zero.com`
- Password: `password`
- View dashboard with stats and activity feed

---

## Responsive Design

- **Desktop (1024px+):** Full grid layouts, 4-col listing grid
- **Tablet (768px-1024px):** 2-col layouts, adjustable sidebars
- **Mobile (<768px):** 1-col stack, full-width cards, hamburger nav

---

## Comparing Original vs React Version

| Feature | Original | React |
|---------|----------|-------|
| JavaScript Framework | Vanilla JS | React 18 |
| Build Tool | None | Vite |
| Component Reusability | HTML Templates | React Components |
| State Management | Object `state` | React `useState` |
| Routing | Manual DOM manipulation | Conditional rendering |
| CSS Organization | Single file | Modular CSS per component |
| Performance | DOM manipulation | Virtual DOM & Reconciliation |
| Developer Experience | Console logs | React Dev Tools |

---

## Future Enhancements

- Add React Router for URL-based navigation
- Implement Context API for global state
- Add backend API integration
- Implement actual booking system
- Add payment gateway integration
- User authentication with JWT
- Real-time messaging feature
- Image upload for listings

---

**Version:** 1.0 React Conversion  
**Build Tool:** Vite 8.2.2  
**React Version:** 18+

Enjoy your Zero accommodation platform!
