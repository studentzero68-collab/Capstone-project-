import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../data/listings'
import { apiDeleteReservation, apiGetMyReservations, getLocalReservations, removeLocalReservation } from '../services/api'

export default function Navbar({
  theme, toggleTheme,
  activeCategory, setActiveCategory,
  searchQuery, setSearchQuery,
  checkin, setCheckin,
  checkout, setCheckout,
  guests, setGuests,
  setFilterOpen, handleSearch,
  showCatBar,
  user, handleLogout,
}) {
  const today = new Date().toISOString().split('T')[0]
  const [menuOpen, setMenuOpen]         = useState(false)
  const [resOpen, setResOpen]           = useState(false)
  const [reservations, setReservations] = useState([])
  const [resLoading, setResLoading]     = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const refreshReservations = () => loadReservations()
    window.addEventListener('zero:reservation-created', refreshReservations)
    return () => window.removeEventListener('zero:reservation-created', refreshReservations)
  }, [user])

  const loadReservations = async () => {
    const localReservations = getLocalReservations(user)
    setReservations(localReservations)
    if (!user) return
    setResLoading(true)
    try {
      const data = await apiGetMyReservations()
      const remoteReservations = data.reservations || []
      const remoteIds = new Set(remoteReservations.map(reservation => reservation._id))
      setReservations([
        ...remoteReservations,
        ...localReservations.filter(reservation => !remoteIds.has(reservation._id)),
      ])
    } catch {
      setReservations(localReservations)
    } finally { setResLoading(false) }
  }

  const doSearch = () => {
    handleSearch()
    setMenuOpen(false)
  }

  const canCancel = reservation => {
    if (!reservation.checkin || reservation.status === 'cancelled') return false
    const checkinDate = new Date(reservation.checkin).toISOString().slice(0, 10)
    const todayDate = new Date().toISOString().slice(0, 10)
    return checkinDate > todayDate
  }

  const cancelReservation = async reservation => {
    const reservationId = reservation._id
    if (!canCancel(reservation)) {
      window.alert('This reservation cannot be cancelled on the day of the reservation.')
      return
    }
    if (!window.confirm('Cancel this reservation?')) return

    try {
      if (String(reservationId).startsWith('local-')) {
        removeLocalReservation(user, reservationId)
      } else {
        await apiDeleteReservation(reservationId)
        setReservations(current => current.filter(item => item._id !== reservationId))
      }
      window.alert('Your reservation has been cancelled.')
    } catch (error) {
      window.alert(error.message || 'Could not cancel this reservation. Please try again.')
    }
  }

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-inner">

        {/* Brand */}
        <button
          className="brand"
          onClick={() => navigate('/')}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          aria-label="Zero — home"
        >
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
            <input
              id="nsb-checkin"
              type="date"
              value={checkin}
              min={today}
              onChange={e => setCheckin(e.target.value)}
              aria-label="Check-in date"
            />
          </div>
          <div className="nsb-divider" />
          <div className="nsb-field">
            <label htmlFor="nsb-checkout">Check out</label>
            <input
              id="nsb-checkout"
              type="date"
              value={checkout}
              min={checkin || today}
              onChange={e => setCheckout(e.target.value)}
              aria-label="Check-out date"
            />
          </div>
          <div className="nsb-divider" />
          <div className="nsb-field" style={{ minWidth: 80 }}>
            <label>Guests</label>
            <span className="nsb-guests-display">
              {guests} guest{guests !== 1 ? 's' : ''}
            </span>
          </div>
          <button className="nsb-search-btn" onClick={doSearch} aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              width="18" height="18" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            Search
          </button>
        </div>

        {/* Nav actions */}
        <div className="nav-actions">

          {/* Dark / light toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>

          {/* Login / user button */}
          {!user && (
            <div style={{ position:'relative' }}>
              <button className="btn-host" onClick={() => { setResOpen(o => !o); if (!resOpen) loadReservations() }}>
                My Trips {reservations.length > 0 ? `(${reservations.length})` : ''}
              </button>
              {resOpen && (
                <div className="nav-dropdown" style={{ minWidth:300, right:0, top:'calc(100% + 8px)', position:'absolute', zIndex:400 }} role="dialog" aria-label="My reservations">
                  <div style={{ padding:'.75rem 1.1rem', borderBottom:'1px solid var(--border-color)' }}>
                    <p style={{ fontFamily:'var(--font-heading)', fontStyle:'italic', fontSize:'1.1rem', color:'var(--text-main)' }}>My Reservations</p>
                  </div>
                  {reservations.length === 0 ? (
                    <p style={{ padding:'1rem', color:'var(--text-dim)', fontSize:'.9rem' }}>No reservations yet.</p>
                  ) : reservations.map((r, i) => (
                    <div key={r._id || i} style={{ padding:'.65rem 1.1rem', borderBottom:'1px solid var(--border-color)', fontSize:'.88rem' }}>
                      <p style={{ fontWeight:600, color:'var(--text-main)' }}>{r.accommodation?.title || 'Stay'}</p>
                      <p style={{ color:'var(--text-dim)', marginTop:'.1rem' }}>{new Date(r.checkin).toLocaleDateString('en-ZA')} &rarr; {new Date(r.checkout).toLocaleDateString('en-ZA')}</p>
                      <p style={{ color:'var(--gold)', marginTop:'.1rem' }}>R{Number(r.total || 0).toLocaleString('en-ZA')}</p>
                      {r.offline && <p style={{ color:'var(--text-dim)', marginTop:'.25rem', fontSize:'.78rem' }}>Saved offline and waiting to sync</p>}
                    </div>
                  ))}
                  <div style={{ padding:'.5rem .75rem' }}><button className="dropdown-item" style={{ textAlign:'center', width:'100%' }} onClick={() => setResOpen(false)}>Close</button></div>
                </div>
              )}
            </div>
          )}
          {user ? (
            <div style={{ display:'flex', alignItems:'center', gap:'.6rem', position:'relative' }}>
              {/* Reservations dropdown */}
              <button
                className="btn-host"
                onClick={() => { setResOpen(o => !o); if (!resOpen) loadReservations() }}
                aria-haspopup="true" aria-expanded={resOpen}
              >
                My Trips
              </button>

              {resOpen && (
                <div className="nav-dropdown" style={{ minWidth:300, right:0, top:'calc(100% + 8px)', position:'absolute', zIndex:400 }} role="dialog" aria-label="My reservations">
                  <div style={{ padding:'.75rem 1.1rem', borderBottom:'1px solid var(--border-color)' }}>
                    <p style={{ fontFamily:'var(--font-heading)', fontStyle:'italic', fontSize:'1.1rem', color:'var(--text-main)' }}>My Reservations</p>
                  </div>
                  <div style={{ maxHeight:280, overflowY:'auto' }}>
                    {resLoading ? (
                      <p style={{ padding:'1rem', color:'var(--text-dim)', fontSize:'.9rem' }}>Loading...</p>
                    ) : reservations.length===0 ? (
                      <p style={{ padding:'1rem', color:'var(--text-dim)', fontSize:'.9rem' }}>No reservations yet. Book a stay!</p>
                    ) : (
                      reservations.map((r,i) => (
                        <div key={r._id||i} style={{ padding:'.65rem 1.1rem', borderBottom:'1px solid var(--border-color)', fontSize:'.88rem' }}>
                          <p style={{ fontWeight:600, color:'var(--text-main)' }}>{r.accommodation?.title || 'Stay'}</p>
                          <p style={{ color:'var(--text-dim)', marginTop:'.1rem' }}>
                            {r.checkin ? new Date(r.checkin).toLocaleDateString('en-ZA') : '—'} &rarr; {r.checkout ? new Date(r.checkout).toLocaleDateString('en-ZA') : '—'}
                          </p>
                          <p style={{ color:'var(--gold)', marginTop:'.1rem' }}>R{Number(r.total||0).toLocaleString('en-ZA')}</p>
                          {r.status !== 'cancelled' && (
                            <button
                              type="button"
                              className="dropdown-item"
                              style={{ color: canCancel(r) ? 'var(--sunset)' : 'var(--text-dim)', padding:'.45rem 0 0', cursor: canCancel(r) ? 'pointer' : 'not-allowed' }}
                              onClick={() => cancelReservation(r)}
                              title={canCancel(r) ? 'Cancel reservation' : 'Reservations cannot be cancelled on the check-in date'}
                            >
                              {canCancel(r) ? 'Cancel reservation' : 'Cannot cancel on check-in day'}
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                  <div style={{ padding:'.5rem .75rem' }}>
                    <button className="dropdown-item" style={{ textAlign:'center', width:'100%' }} onClick={() => setResOpen(false)}>Close</button>
                  </div>
                </div>
              )}

              <span style={{ fontFamily:'var(--font-accent)', fontSize:'.88rem', color:'var(--text-dim)', maxWidth:100, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                {user.name}
              </span>
              {user.role==='admin' && (
                <button className="btn-host" onClick={() => navigate('/admin')}>Dashboard</button>
              )}
              <button className="btn-host" style={{ borderColor:'rgba(192,57,43,.5)', color:'var(--sunset)' }} onClick={handleLogout}>
                Sign out
              </button>
            </div>
          ) : (
            <button className="btn-host" onClick={() => navigate('/login')}>Sign in</button>
          )}

          <button
            className="btn-menu"
            onClick={() => setMenuOpen(o => !o)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-label="Open menu"
          >
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="0" y1="1" x2="16" y2="1" />
              <line x1="0" y1="7" x2="16" y2="7" />
              <line x1="0" y1="13" x2="16" y2="13" />
            </svg>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </button>

          {menuOpen && (
            <div className="nav-dropdown" role="menu">
              <button
                className="dropdown-item" role="menuitem"
                onClick={() => { navigate('/'); setMenuOpen(false) }}
              >
                Home
              </button>
              <button
                className="dropdown-item" role="menuitem"
                onClick={() => { navigate('/search'); setMenuOpen(false) }}
              >
                Browse stays
              </button>
              <hr className="dropdown-divider" />
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <button
                      className="dropdown-item" role="menuitem"
                      onClick={() => { navigate('/admin'); setMenuOpen(false) }}
                    >
                      Admin dashboard
                    </button>
                  )}
                  <button
                    className="dropdown-item" role="menuitem"
                    onClick={() => { handleLogout(); setMenuOpen(false) }}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <button
                  className="dropdown-item" role="menuitem"
                  onClick={() => { navigate('/login'); setMenuOpen(false) }}
                >
                  Sign in
                </button>
              )}
              <button
                className="dropdown-item" role="menuitem"
                onClick={() => setMenuOpen(false)}
              >
                Wishlist
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Category bar */}
      {showCatBar && (
        <div
          className="cat-bar"
          style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}
        >
          <div className="cat-bar-inner" role="tablist" aria-label="Property categories">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`cat-pill${activeCategory === cat.id ? ' active' : ''}`}
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <button
            className="filter-btn"
            onClick={() => setFilterOpen(true)}
            aria-label="Open filters"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>
            Filters
          </button>
        </div>
      )}
    </nav>
  )
}
