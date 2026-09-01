import { useEffect, useCallback } from 'react'
import { LISTINGS } from '../data/listings'
import ListingCard from '../components/ListingCard'
import FilterPanel from '../components/FilterPanel'

// Rough map positions for the fake map pins
const MAP_PINS = [
  { id: 1,  top: '20%', left: '30%' },
  { id: 2,  top: '35%', left: '55%' },
  { id: 3,  top: '60%', left: '25%' },
  { id: 4,  top: '45%', left: '70%' },
  { id: 5,  top: '25%', left: '65%' },
  { id: 6,  top: '70%', left: '50%' },
  { id: 7,  top: '55%', left: '40%' },
  { id: 8,  top: '80%', left: '30%' },
]

export default function SearchPage({
  searchQuery,
  filters, setFilters,
  filterOpen, setFilterOpen,
  sortBy, setSortBy,
  wishlist, toggleWishlist,
}) {
  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  })

  const getResults = useCallback(() => {
    const q = searchQuery.toLowerCase()
    return LISTINGS.filter(l => {
      const textMatch = !q ||
        l.title.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q) ||
        (l.culture && l.culture.toLowerCase().includes(q))
      const priceMatch = l.price >= filters.priceMin && l.price <= filters.priceMax
      const bedsMatch = filters.beds === 0 || l.beds >= filters.beds
      const typesMatch = filters.types.length === 0 || filters.types.includes(l.category)
      const amenMatch = filters.amenities.length === 0 ||
        filters.amenities.every(a => l.amenities.map(x => x.toLowerCase()).some(x => x.includes(a)))
      return textMatch && priceMatch && bedsMatch && typesMatch && amenMatch
    })
  }, [searchQuery, filters])

  const sort = (arr) => {
    const copy = [...arr]
    if (sortBy === 'price-asc')  return copy.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') return copy.sort((a, b) => b.price - a.price)
    if (sortBy === 'rating')     return copy.sort((a, b) => b.rating - a.rating)
    return copy
  }

  const results = sort(getResults())
  const formatPrice = (n) => `R${Number(n).toLocaleString('en-ZA')}`

  return (
    <main id="main-content">
      {filterOpen && (
        <FilterPanel filters={filters} setFilters={setFilters} onClose={() => setFilterOpen(false)} />
      )}

      <div className="search-page-layout">
        {/* Results column */}
        <div className="search-results-col">
          <div className="search-results-header">
            <p className="results-count" role="status" aria-live="polite">
              {results.length} stay{results.length !== 1 ? 's' : ''} found
              {searchQuery && ` for "${searchQuery}"`}
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
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
          </div>

          <div className="listings-grid" role="list" aria-label="Search results">
            {results.length === 0 ? (
              <p className="no-results">
                No stays found{searchQuery ? ` for "${searchQuery}"` : ''}. Try adjusting your search or filters.
              </p>
            ) : (
              results.map(l => (
                <ListingCard
                  key={l.id}
                  listing={l}
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                  searchQuery={searchQuery}
                />
              ))
            )}
          </div>
        </div>

        {/* Map column */}
        <aside className="search-map-col" aria-label="Map view">
          <div className="map-bg">
            {/* Map grid lines for visual effect */}
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

            {/* Map pins */}
            {MAP_PINS.map(pin => {
              const listing = LISTINGS.find(l => l.id === pin.id)
              if (!listing) return null
              return (
                <div
                  key={pin.id}
                  className="map-pin"
                  style={{ top: pin.top, left: pin.left }}
                  title={listing.title}
                >
                  <div className="map-pin-dot" />
                  <div className="map-pin-price">{formatPrice(listing.price)}</div>
                </div>
              )
            })}

            <div className="map-label">🗺️ South Africa</div>
          </div>
        </aside>
      </div>
    </main>
  )
}
