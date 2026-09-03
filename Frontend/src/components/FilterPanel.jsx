import { useState } from 'react'

const PROPERTY_TYPES = ['treehouse', 'beach', 'garage', 'baker', 'musician', 'gamer', 'japanese', 'korean', 'southafrican']
const AMENITY_OPTIONS = ['wifi', 'kitchen', 'pool', 'parking', 'parking', 'braai', 'soundproofed']
const BED_OPTIONS = [0, 1, 2, 3, 4]

export default function FilterPanel({ filters, setFilters, onClose }) {
  const [local, setLocal] = useState({ ...filters })

  const toggleType = (t) => {
    setLocal(f => ({
      ...f,
      types: f.types.includes(t) ? f.types.filter(x => x !== t) : [...f.types, t]
    }))
  }

  const toggleAmenity = (a) => {
    setLocal(f => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter(x => x !== a) : [...f.amenities, a]
    }))
  }

  const apply = () => {
    setFilters(local)
    onClose()
  }

  const clear = () => {
    const reset = { priceMin: 0, priceMax: 5000, beds: 0, types: [], amenities: [] }
    setLocal(reset)
    setFilters(reset)
    onClose()
  }

  return (
    <div className="filter-panel" role="dialog" aria-modal="true" aria-label="Filters">
      <div className="filter-backdrop" onClick={onClose} />
      <div className="filter-box">
        <div className="filter-header">
          <span className="filter-title">Filters</span>
          <button className="filter-close" onClick={onClose} aria-label="Close filters">✕</button>
        </div>

        <div className="filter-body">
          {/* Price range */}
          <div className="filter-section">
            <h4>Price range (per night)</h4>
            <div className="price-range">
              <input
                type="range" min="0" max="5000" step="50"
                value={local.priceMax}
                onChange={e => setLocal(f => ({ ...f, priceMax: Number(e.target.value) }))}
                aria-label="Maximum price"
              />
              <div className="price-range-labels">
                <span>R0</span>
                <span>R{local.priceMax.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="filter-section">
            <h4>Bedrooms</h4>
            <div className="beds-row">
              {BED_OPTIONS.map(n => (
                <button
                  key={n}
                  className={`beds-btn${local.beds === n ? ' selected' : ''}`}
                  onClick={() => setLocal(f => ({ ...f, beds: n }))}
                  aria-pressed={local.beds === n}
                  aria-label={n === 0 ? 'Any beds' : `${n}+ beds`}
                >
                  {n === 0 ? 'Any' : `${n}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Property types */}
          <div className="filter-section">
            <h4>Property type</h4>
            <div className="filter-chips">
              {PROPERTY_TYPES.map(t => (
                <button
                  key={t}
                  className={`filter-chip${local.types.includes(t) ? ' selected' : ''}`}
                  onClick={() => toggleType(t)}
                  aria-pressed={local.types.includes(t)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="filter-section">
            <h4>Amenities</h4>
            <div className="filter-chips">
              {AMENITY_OPTIONS.map(a => (
                <button
                  key={a}
                  className={`filter-chip${local.amenities.includes(a) ? ' selected' : ''}`}
                  onClick={() => toggleAmenity(a)}
                  aria-pressed={local.amenities.includes(a)}
                >
                  {a.charAt(0).toUpperCase() + a.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="filter-footer">
          <button className="btn-filter-clear" onClick={clear}>Clear all</button>
          <button className="btn-filter-apply" onClick={apply}>Show stays</button>
        </div>
      </div>
    </div>
  )
}
