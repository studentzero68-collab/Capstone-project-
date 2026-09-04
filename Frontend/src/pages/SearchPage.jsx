import { useState, useEffect, useCallback } from 'react'
import { LISTINGS as STATIC_LISTINGS } from '../data/listings'
import { apiGetAccommodations } from '../services/api'
import ListingCard from '../components/ListingCard'
import FilterPanel from '../components/FilterPanel'

// Normalise a MongoDB doc to the shape ListingCard expects
const normalise = (doc) => ({
  ...doc,
  id:       doc._id || doc.id,
  category: doc.type || doc.category,
  culture:  ['japanese','korean','southafrican'].includes(doc.type) ? doc.type : null,
  beds:     doc.bedrooms  ?? doc.beds  ?? 1,
  baths:    doc.bathrooms ?? doc.baths ?? 1,
  badge:    doc.badge || (doc.type
    ? doc.type.charAt(0).toUpperCase() + doc.type.slice(1)
    : 'Stay'),
  img:      (doc.images && doc.images[0]) || doc.img || '',
  photos:   doc.images?.length > 0 ? doc.images : [doc.img || ''],
  hostInitial: doc.host?.username?.charAt(0) || doc.hostInitial || 'H',
  host:     doc.host?.username || doc.host || 'Host',
})

// Map pin positions for the decorative map panel
const MAP_PINS = [
  { idx: 0, top: '20%', left: '30%' },
  { idx: 1, top: '35%', left: '55%' },
  { idx: 2, top: '60%', left: '25%' },
  { idx: 3, top: '45%', left: '70%' },
  { idx: 4, top: '25%', left: '65%' },
  { idx: 5, top: '70%', left: '50%' },
  { idx: 6, top: '55%', left: '40%' },
  { idx: 7, top: '80%', left: '30%' },
]

export default function SearchPage({
  searchQuery,
  filters, setFilters,
  filterOpen, setFilterOpen,
  sortBy, setSortBy,
  wishlist, toggleWishlist,
}) {
  // ── Live data from MongoDB, falls back to static file ──────────
  const [allListings, setAllListings] = useState(STATIC_LISTINGS)
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    apiGetAccommodations()
      .then(data => {
        if (data.accommodations?.length > 0) {
          setAllListings(data.accommodations.map(normalise))
        }
      })
      .catch(() => { /* backend offline — keep static fallback */ })
      .finally(() => setLoading(false))
  }, [])

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  })

  // ── Filter + search ────────────────────────────────────────────
  const getResults = useCallback(() => {
    const q = (searchQuery || '').toLowerCase()
    return allListings.filter(l => {
      const cat = l.category || l.type || ''
      const textMatch = !q ||
        l.title.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        cat.toLowerCase().includes(q) ||
        (l.culture && l.culture.toLowerCase().includes(q))
      const priceMatch = l.price >= filters.priceMin && l.price <= filters.priceMax
      const bedsMatch  = filters.beds === 0 || (l.beds || l.bedrooms || 0) >= filters.beds
      const typesMatch = filters.types.length === 0 || filters.types.includes(cat)
      const amenMatch  = filters.amenities.length === 0 ||
        filters.amenities.every(a =>
          l.amenities.map(x => x.toLowerCase()).some(x => x.includes(a))
        )
      return textMatch && priceMatch && bedsMatch && typesMatch && amenMatch
    })
  }, [searchQuery, filters, allListings])

  const sort = arr => {
    const copy = [...arr]
    if (sortBy === 'price-asc')  return copy.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') return copy.sort((a, b) => b.price - a.price)
    if (sortBy === 'rating')     return copy.sort((a, b) => b.rating - a.rating)
    return copy
  }

  const results     = sort(getResults())
  const formatPrice = n => `R${Number(n).toLocaleString('en-ZA')}`

  return (
    <main id="main-content">
      {filterOpen && (
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          onClose={() => setFilterOpen(false)}
        />
      )}

      <div className="search-page-layout">

        {/* ── Results column ── */}
        <div className="search-results-col">
          <div className="search-results-header">
            <p className="results-count" role="status" aria-live="polite">
              {loading
                ? 'Loading stays...'
                : `${results.length} stay${results.length !== 1 ? 's' : ''} found${searchQuery ? ` for "${searchQuery}"` : ''}`
              }
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <span style={{ fontSize: '.85rem', color: 'var(--text-dim)' }}>Sort:</span>
              <select
                className="sort-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                aria-label="Sort results"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price low to high</option>
                <option value="price-desc">Price high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
          </div>

          <div className="listings-grid" role="list" aria-label="Search results">
            {loading ? (
              <div className="spinner-wrap" style={{ gridColumn: '1/-1' }}>
                <div className="spinner" aria-label="Loading stays" />
              </div>
            ) : results.length === 0 ? (
              <p className="no-results">
                No stays found{searchQuery ? ` for "${searchQuery}"` : ''}.
                Try adjusting your search or filters.
              </p>
            ) : (
              results.map(l => (
                <ListingCard
                  key={l._id || l.id}
                  listing={l}
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                  searchQuery={searchQuery}
                />
              ))
            )}
          </div>
        </div>

        {/* ── Map column ── */}
        <aside className="search-map-col" aria-label="Map view">
          <div className="map-bg">
            {/* Grid lines */}
            <svg
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: .12 }}
              aria-hidden="true"
            >
              {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(p => (
                <g key={p}>
                  <line x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%" stroke="#4fc3f7" strokeWidth="1" />
                  <line x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`} stroke="#4fc3f7" strokeWidth="1" />
                </g>
              ))}
            </svg>

            {/* Map pins — use first 8 listings from live results */}
            {MAP_PINS.map(pin => {
              const listing = results[pin.idx]
              if (!listing) return null
              return (
                <div
                  key={pin.idx}
                  className="map-pin"
                  style={{ top: pin.top, left: pin.left }}
                  title={listing.title}
                >
                  <div className="map-pin-dot" />
                  <div className="map-pin-price">{formatPrice(listing.price)}</div>
                </div>
              )
            })}

            <div className="map-label">South Africa</div>
          </div>
        </aside>
      </div>
    </main>
  )
}
