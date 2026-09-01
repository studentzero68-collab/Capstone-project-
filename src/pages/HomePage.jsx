import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { LISTINGS, JOURNEY_CARDS } from '../data/listings'
import ListingCard from '../components/ListingCard'
import FilterPanel from '../components/FilterPanel'
import AnimationOverlay from '../components/AnimationOverlay'

export default function HomePage({
  activeCategory, setActiveCategory,
  filters, setFilters,
  filterOpen, setFilterOpen,
  sortBy, setSortBy,
  wishlist, toggleWishlist,
  handleSearch,
}) {
  const navigate = useNavigate()
  const [activeCulture, setActiveCulture] = useState('all')
  const [shown, setShown] = useState(8)
  const [animation, setAnimation] = useState(null)
  const [activeJourney, setActiveJourney] = useState(null)
  const [email, setEmail] = useState('')
  const [newsletterMsg, setNewsletterMsg] = useState('')

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  })

  const getFiltered = useCallback(() => {
    return LISTINGS.filter(l => {
      const catMatch   = activeCategory === 'all' || l.category === activeCategory
      const priceMatch = l.price >= filters.priceMin && l.price <= filters.priceMax
      const bedsMatch  = filters.beds === 0 || l.beds >= filters.beds
      const typesMatch = filters.types.length === 0 || filters.types.includes(l.category)
      const amenMatch  = filters.amenities.length === 0 ||
        filters.amenities.every(a =>
          l.amenities.map(x => x.toLowerCase()).some(x => x.includes(a))
        )
      return catMatch && priceMatch && bedsMatch && typesMatch && amenMatch
    })
  }, [activeCategory, filters])

  const getSorted = (arr) => {
    const copy = [...arr]
    if (sortBy === 'price-asc')  return copy.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') return copy.sort((a, b) => b.price - a.price)
    if (sortBy === 'rating')     return copy.sort((a, b) => b.rating - a.rating)
    return copy
  }

  const filtered  = getSorted(getFiltered())
  const displayed = filtered.slice(0, shown)

  const cultureListings = LISTINGS.filter(l =>
    (activeCulture === 'all' && l.culture) || l.culture === activeCulture
  )

  const handleJourney = (card) => {
    setActiveJourney(card.id)
    setAnimation({ type: card.animType, label: card.label })
  }

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setNewsletterMsg('Please enter a valid email address.')
      return
    }
    setNewsletterMsg("You're in. Welcome to the Zero family.")
    setEmail('')
    setTimeout(() => setNewsletterMsg(''), 4000)
  }

  const CULTURE_TABS = [
    { id: 'all',          label: 'All Cultures'  },
    { id: 'japanese',     label: 'Japanese'      },
    { id: 'korean',       label: 'Korean'        },
    { id: 'southafrican', label: 'South African' },
  ]

  return (
    <main id="main-content">

      {/* Animation overlay */}
      {animation && (
        <AnimationOverlay
          animType={animation.type}
          label={animation.label}
          onDone={() => setAnimation(null)}
        />
      )}

      {/* Filter panel */}
      {filterOpen && (
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          onClose={() => setFilterOpen(false)}
        />
      )}

      {/* ── HERO ── */}
      <section className="hero" aria-label="Hero banner">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-content">
          <h1 className="hero-title">
            Start at <em>Zero</em>
          </h1>
          <p className="hero-subtitle">
            Treehouses · Beach shacks · Garage lofts · Studio dens · Cultural retreats
            across South Africa
          </p>
          <div className="hero-cta-row">
            <button className="btn-hero" onClick={handleSearch}>
              Explore stays
            </button>
            <button
              className="btn-hero btn-hero-outline"
              onClick={() =>
                document.getElementById('journey-section')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              What's your vibe?
            </button>
          </div>
        </div>
        <div className="hero-scroll-hint" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* ── JOURNEY ── */}
      <section
        className="journey-section reveal"
        id="journey-section"
        aria-label="Journey types"
      >
        <div className="section-header">
          <h2 className="section-title">What's your journey?</h2>
          <p className="section-sub">Pick your vibe and let the adventure find you</p>
        </div>
        <div className="journey-cards" role="list">
          {JOURNEY_CARDS.map(card => (
            <div
              key={card.id}
              className={`journey-card reveal${activeJourney === card.id ? ' active' : ''}`}
              role="listitem"
              tabIndex={0}
              onClick={() => handleJourney(card)}
              onKeyDown={e => e.key === 'Enter' && handleJourney(card)}
              aria-label={`Select journey type: ${card.title}`}
            >
              <div className="journey-card-icon" aria-hidden="true">
                {card.id === 'romantic' && (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--rose)" aria-hidden="true">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                )}
                {card.id === 'friends' && (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--blue-light)" aria-hidden="true">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                )}
                {card.id === 'family' && (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--orange)" aria-hidden="true">
                    <path d="M10 3 L3 8 L3 20 L9 20 L9 14 L11 14 L11 20 L17 20 L17 8 Z"/>
                  </svg>
                )}
                {card.id === 'solo' && (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--purple-light)" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                )}
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LISTINGS ── */}
      <section className="listings-section" aria-label="Featured stays" id="listings">
        <div className="section-header reveal">
          <h2 className="section-title">Featured Stays</h2>
          <p className="section-sub">Every space has a story — find yours</p>
        </div>

        {/* Sort row */}
        <div style={{
          display: 'flex', justifyContent: 'flex-end',
          maxWidth: 1440, margin: '0 auto',
          padding: '0 1.5rem 1rem', gap: '.5rem', alignItems: 'center',
        }}>
          <span style={{ fontSize: '.85rem', color: 'var(--text-dim)' }}>Sort by:</span>
          <select
            className="sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            aria-label="Sort listings"
          >
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>

        <div className="listings-grid" role="list" aria-label="Property listings">
          {displayed.length === 0 ? (
            <p className="no-results">
              No stays match your filters. Try adjusting them.
            </p>
          ) : (
            displayed.map(l => (
              <ListingCard
                key={l.id}
                listing={l}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            ))
          )}
        </div>

        {filtered.length > shown && (
          <div className="load-more-wrap">
            <button
              className="btn-load-more"
              onClick={() => setShown(s => s + 6)}
              aria-label="Show more listings"
            >
              Show more stays
            </button>
          </div>
        )}
      </section>

      {/* ── CULTURE ── */}
      <section
        className="culture-section"
        aria-label="Cultural experiences"
        id="culture"
      >
        <div className="section-header reveal">
          <h2 className="section-title">Stay in the Culture</h2>
          <p className="section-sub">Japanese zen · Korean warmth · South African spirit</p>
        </div>

        <div className="culture-tabs" role="tablist" aria-label="Culture filter">
          {CULTURE_TABS.map(t => (
            <button
              key={t.id}
              className={`culture-tab${activeCulture === t.id ? ' active' : ''}`}
              role="tab"
              aria-selected={activeCulture === t.id}
              onClick={() => setActiveCulture(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="listings-grid" role="list" aria-label="Cultural listings">
          {cultureListings.length === 0 ? (
            <p className="no-results">No listings found for this culture.</p>
          ) : (
            cultureListings.map(l => (
              <ListingCard
                key={l.id}
                listing={l}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            ))
          )}
        </div>
      </section>

      {/* ── WHY ZERO ── */}
      <section className="why-section" aria-label="Why choose Zero" id="why">
        <div className="section-header reveal">
          <h2 className="section-title">Why Zero?</h2>
          <p className="section-sub">Because everyone deserves a first-class journey</p>
        </div>
        <div className="why-grid">
          {[
            {
              title: 'Open to All',
              desc: "You don't have to be rich to explore the world. Zero is built for the everyday adventurer.",
              svg: (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="var(--blue-light)" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              ),
            },
            {
              title: 'Real Spaces',
              desc: 'No cookie-cutter hotels. Just real people, real stories, and real spaces with soul.',
              svg: (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="var(--purple-light)" aria-hidden="true">
                  <path d="M10 3 L3 8 L3 20 L9 20 L9 14 L11 14 L11 20 L17 20 L17 8 Z"/>
                </svg>
              ),
            },
            {
              title: 'Safe & Verified',
              desc: 'Every listing is verified. Every host is screened. Every stay is guaranteed.',
              svg: (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="var(--green)" aria-hidden="true">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                </svg>
              ),
            },
            {
              title: 'Fresh Starts',
              desc: 'Zero means beginnings. Every trip is a chance to reset, discover, and grow.',
              svg: (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="var(--orange)" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              ),
            },
          ].map(card => (
            <div key={card.title} className="why-card reveal">
              <div className="why-icon" aria-hidden="true">{card.svg}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section
        className="newsletter-section"
        aria-label="Newsletter signup"
        id="newsletter"
      >
        <div className="newsletter-inner">
          <h2 className="newsletter-title">Stay in the loop</h2>
          <p>New spots, exclusive deals, and Zero stories — straight to your inbox.</p>
          <form className="newsletter-form" onSubmit={handleNewsletter} noValidate>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              aria-label="Your email address"
              required
            />
            <button type="submit" className="btn-newsletter">
              Subscribe
            </button>
          </form>
          {newsletterMsg && (
            <p className="newsletter-msg" role="status">{newsletterMsg}</p>
          )}
        </div>
      </section>

    </main>
  )
}
