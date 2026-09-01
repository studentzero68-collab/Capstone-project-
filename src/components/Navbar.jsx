import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../data/listings'

export default function Navbar({
  theme, toggleTheme,
  activeCategory, setActiveCategory,
  searchQuery, setSearchQuery,
  checkin, setCheckin,
  checkout, setCheckout,
  guests, setGuests,
  setFilterOpen, handleSearch,
  showCatBar,
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const doSearch = () => {
    handleSearch()
    setMenuOpen(false)
  }

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        {/* Brand */}
        <button className="brand" onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <span className="brand-zero">Zero</span>
          <span className="brand-tag">Where every journey begins</span>
        </button>

        {/* Search bar */}
        <div className="nav-search-bar" role="search">
          <div className="nsb-field">
            <label htmlFor="nsb-where">Where</label>
            <input
              id="nsb-where"
              type="text"
              placeholder="Search destinations"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && doSearch()}
              aria-label="Search destination"
            />
          </div>
          <div className="nsb-divider" />
          <div className="nsb-field">
            <label htmlFor="nsb-checkin">Check in</label>
            <input id="nsb-checkin" type="date" value={checkin} onChange={e => setCheckin(e.target.value)} />
          </div>
          <div className="nsb-divider" />
          <div className="nsb-field">
            <label htmlFor="nsb-checkout">Check out</label>
            <input id="nsb-checkout" type="date" value={checkout} onChange={e => setCheckout(e.target.value)} />
          </div>
          <div className="nsb-divider" />
          <div className="nsb-field" style={{ minWidth: 80 }}>
            <label>Guests</label>
            <span className="nsb-guests-display">{guests} guest{guests !== 1 ? 's' : ''}</span>
          </div>
          <button className="nsb-search-btn" onClick={doSearch} aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            Search
          </button>
        </div>

        {/* Actions */}
        <div className="nav-actions">
          {/* Theme toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button className="btn-host" onClick={() => navigate('/admin')}>Host on Zero</button>

          <button
            className="btn-menu"
            onClick={() => setMenuOpen(o => !o)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-label="Menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </button>

          {menuOpen && (
            <div className="nav-dropdown" role="menu">
              <button className="dropdown-item" role="menuitem" onClick={() => { navigate('/'); setMenuOpen(false) }}>Home</button>
              <button className="dropdown-item" role="menuitem" onClick={() => { navigate('/search'); setMenuOpen(false) }}>Browse stays</button>
              <hr className="dropdown-divider" />
              <button className="dropdown-item" role="menuitem" onClick={() => { navigate('/admin'); setMenuOpen(false) }}>Admin dashboard</button>
              <button className="dropdown-item" role="menuitem" onClick={() => setMenuOpen(false)}>Wishlist</button>
            </div>
          )}
        </div>
      </div>

      {/* Category bar */}
      {showCatBar && (
        <div className="cat-bar" style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          <div className="cat-bar-inner" role="tablist" aria-label="Property categories">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`cat-pill${activeCategory === cat.id ? ' active' : ''}`}
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="cat-icon" aria-hidden="true">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
          <button className="filter-btn" onClick={() => setFilterOpen(true)} aria-label="Open filters">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            Filters
          </button>
        </div>
      )}
    </nav>
  )
}
