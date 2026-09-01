import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { LISTINGS, CULTURE_TABS, JOURNEY_CARDS } from '../data/listings'
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
  const [animation, setAnimation] = useState(null) // { type, label }
  const [activeJourney, setActiveJourney] = useState(null)
  const [email, setEmail] = useState('')
  const [newsletterMsg, setNewsletterMsg] = useState('')

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  })

  const getFiltered = useCallback(() => {
    return LISTINGS.filter(l => {
      const catMatch = activeCategory === 'all' || l.category === activeCategory
      const priceMatch = l.price >= filters.priceMin && l.price <= filters.priceMax
      const bedsMatch = filters.beds === 0 || l.beds >= filters.beds
      const typesMatch = filters.types.length === 0 || filters.types.includes(l.category)
      const amenMatch = filters.amenities.length === 0 ||
        filters.amenities.every(a => l.amenities.map(x => x.toLowerCase()).some(x => x.includes(a)))
      return catMatch && priceMatch && bedsMatch && typesMatch && amenMatch
    })
  }, [activeCategory, filters])

  const getSorted = (arr) => {
    const copy = [...arr]
    if (sortBy === 'price-asc') return copy.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') return copy.sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') return copy.sort((a, b) => b.rating - a.rating)
    return copy
  }

  const filtered = getSorted(getFiltered())
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
    setNewsletterMsg('🎉 You\'re in! Welcome to the Zero family.')
    setEmail('')
    setTimeout(() => setNewsletterMsg(''), 4000)
  }

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
        <FilterPanel filters={filters} setFilters={setFilters} onClose={() => setFilterOpen(false)} />
      )}

      {/* ── HERO ── */}
      <section className="hero" aria-label="Hero banner">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-content">
          <h1 className="hero-title">
            Start at <em>Zero</em>
          </h1>
          <p className="hero-subtitle">
            Treehouses · Beach shacks · Garage lofts · Studio dens · Cultural retreats — all across South Africa
          </p>
          <div className="hero-cta-row">
            <button className="btn-hero" onClick={handleSearch}>
              Explore stays
            </button>
            <button className="btn-hero btn-hero-outline" onClick={() => {
              document.getElementById('journey-section')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              What's your vibe?
            </button>
          </div>
        </div>
        <div className="hero-scroll-hint" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* ── JOURNEY ── */}
      <section className="journey-section reveal" id="journey-section" aria-label="Journey types">
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
              <span className="journey-icon" aria-hidden="true">{card.icon}</span>
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

        {/* Sort */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', maxWidth: 1440, margin: '0 auto', padding: '0 1.5rem 1rem', gap: '.5rem', alignItems: 'center' }}>
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
            <p className="no-results">No stays match your filters. Try adjusting them.</p>
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
            <button className="btn-load-more" onClick={() => setShown(s => s + 6)}>
              Show more stays
            </button>
          </div>
        )}
      </section>

      {/* ── CULTURE ── */}
      <section className="culture-section" aria-label="Cultural experiences" id="culture">
        <div className="section-header reveal">
          <h2 className="section-title">Stay in the Culture</h2>
          <p className="section-sub">Japanese zen · Korean warmth · South African spirit</p>
        </div>
        <div className="culture-tabs" role="tablist" aria-label="Culture filter">
          {[
            { id: 'all', label: '🌍 All Cultures' },
            { id: 'japanese', label: '⛩️ Japanese' },
            { id: 'korean', label: '🏮 Korean' },
            { id: 'southafrican', label: '🌍 South African' },
          ].map(t => (
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
            { icon: '🌍', title: 'Open to All', desc: 'You don\'t have to be rich to explore the world. Zero is built for the everyday adventurer.' },
            { icon: '💜', title: 'Real Spaces', desc: 'No cookie-cutter hotels. Just real people, real stories, and real spaces with soul.' },
            { icon: '🔒', title: 'Safe & Verified', desc: 'Every listing is verified. Every host is screened. Every stay is guaranteed.' },
            { icon: '🌱', title: 'Fresh Starts', desc: 'Zero means beginnings. Every trip is a chance to reset, discover, and grow.' },
          ].map(card => (
            <div key={card.title} className="why-card reveal">
              <div className="why-icon" aria-hidden="true">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="newsletter-section" aria-label="Newsletter signup" id="newsletter">
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
            <button type="submit" className="btn-newsletter">Subscribe</button>
          </form>
          {newsletterMsg && <p className="newsletter-msg" role="status">{newsletterMsg}</p>}
        </div>
      </section>
    </main>
  )
}
