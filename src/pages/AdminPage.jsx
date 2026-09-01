import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LISTINGS } from '../data/listings'

const MOCK_BOOKINGS = [
  { id: 'BK001', guest: 'Lerato K.',    listing: 'The Canopy Nest',        checkin: '2026-09-10', checkout: '2026-09-14', total: 'R8,740',  status: 'confirmed' },
  { id: 'BK002', guest: 'Marco V.',     listing: 'Sky Loft Hideaway',      checkin: '2026-09-15', checkout: '2026-09-17', total: 'R5,540',  status: 'confirmed' },
  { id: 'BK003', guest: 'Amos T.',      listing: 'Sunset Shack Muizenberg', checkin: '2026-09-20', checkout: '2026-09-25', total: 'R6,200',  status: 'pending'   },
  { id: 'BK004', guest: 'Julia M.',     listing: 'Level Up Bunker',        checkin: '2026-09-22', checkout: '2026-09-24', total: 'R1,740',  status: 'confirmed' },
  { id: 'BK005', guest: 'Sipho D.',     listing: 'Zen Garden Retreat',     checkin: '2026-10-01', checkout: '2026-10-05', total: 'R12,600', status: 'pending'   },
  { id: 'BK006', guest: 'Tshepo N.',    listing: 'Gangnam Style Flat',     checkin: '2026-09-28', checkout: '2026-09-30', total: 'R5,340',  status: 'cancelled' },
  { id: 'BK007', guest: 'Bongani Z.',   listing: 'Karoo Farmstay',        checkin: '2026-10-10', checkout: '2026-10-15', total: 'R5,950',  status: 'confirmed' },
  { id: 'BK008', guest: 'Naledi S.',    listing: 'The Workshop Loft',     checkin: '2026-10-05', checkout: '2026-10-07', total: 'R2,900',  status: 'pending'   },
]

const TABS = ['overview', 'bookings', 'listings', 'analytics']

export default function AdminPage({ theme, toggleTheme }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [bookings, setBookings] = useState(MOCK_BOOKINGS)
  const [searchBooking, setSearchBooking] = useState('')

  const stats = {
    totalBookings: bookings.filter(b => b.status === 'confirmed').length,
    totalRevenue: 'R48,010',
    activeListings: LISTINGS.length,
    avgRating: (LISTINGS.reduce((s, l) => s + l.rating, 0) / LISTINGS.length).toFixed(2),
  }

  const updateStatus = (id, status) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
  }

  const filteredBookings = bookings.filter(b =>
    b.guest.toLowerCase().includes(searchBooking.toLowerCase()) ||
    b.listing.toLowerCase().includes(searchBooking.toLowerCase()) ||
    b.id.toLowerCase().includes(searchBooking.toLowerCase())
  )

  const statusClass = { confirmed: 'status-confirmed', pending: 'status-pending', cancelled: 'status-cancelled' }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar" aria-label="Admin navigation">
        <span className="admin-logo">Zero Admin</span>

        {TABS.map(tab => (
          <button
            key={tab}
            className={`admin-nav-item${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}
            aria-current={activeTab === tab ? 'page' : undefined}
          >
            {{ overview: '📊', bookings: '📋', listings: '🏠', analytics: '📈' }[tab]}
            &nbsp;{tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}

        <hr style={{ borderColor: 'var(--border-color)', margin: '.5rem 0' }} />

        <button className="admin-nav-item" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          {theme === 'dark' ? '☀️' : '🌙'} {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>

        <button className="admin-nav-item" onClick={() => navigate('/')}>
          ← Back to Zero
        </button>
      </aside>

      {/* Main content */}
      <main className="admin-main" id="admin-main-content">

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <>
            <div className="admin-header">
              <h1 className="admin-title">Dashboard Overview</h1>
              <span style={{ fontFamily: 'var(--font-accent)', color: 'var(--text-dim)' }}>
                September 2026
              </span>
            </div>

            <div className="admin-stats">
              <div className="stat-card">
                <p className="stat-label">Confirmed bookings</p>
                <p className="stat-value">{stats.totalBookings}</p>
                <p className="stat-change">↑ 12% this month</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Total revenue</p>
                <p className="stat-value">{stats.totalRevenue}</p>
                <p className="stat-change">↑ 8% this month</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Active listings</p>
                <p className="stat-value">{stats.activeListings}</p>
                <p className="stat-change">Across 9 categories</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Avg. rating</p>
                <p className="stat-value">★ {stats.avgRating}</p>
                <p className="stat-change">From {LISTINGS.reduce((s, l) => s + l.reviews, 0)} reviews</p>
              </div>
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', marginBottom: '1rem', color: 'var(--text-main)' }}>
              Recent bookings
            </h2>
            <BookingsTable
              bookings={bookings.slice(0, 5)}
              updateStatus={updateStatus}
              statusClass={statusClass}
            />
          </>
        )}

        {/* ── BOOKINGS ── */}
        {activeTab === 'bookings' && (
          <>
            <div className="admin-header">
              <h1 className="admin-title">All Bookings</h1>
              <input
                type="text"
                placeholder="Search by guest, listing or ID…"
                value={searchBooking}
                onChange={e => setSearchBooking(e.target.value)}
                style={{
                  background: 'var(--bg-input)', border: '1px solid var(--border-color)',
                  color: 'var(--text-main)', padding: '.5rem 1rem', borderRadius: 'var(--radius-sm)',
                  fontSize: '.9rem', outline: 'none', width: 260,
                }}
                aria-label="Search bookings"
              />
            </div>
            <BookingsTable
              bookings={filteredBookings}
              updateStatus={updateStatus}
              statusClass={statusClass}
            />
          </>
        )}

        {/* ── LISTINGS ── */}
        {activeTab === 'listings' && (
          <>
            <div className="admin-header">
              <h1 className="admin-title">Listings</h1>
              <span style={{ fontFamily: 'var(--font-accent)', color: 'var(--text-dim)' }}>
                {LISTINGS.length} properties
              </span>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Price/night</th>
                    <th>Rating</th>
                    <th>Reviews</th>
                  </tr>
                </thead>
                <tbody>
                  {LISTINGS.map(l => (
                    <tr key={l.id}>
                      <td style={{ fontWeight: 500 }}>{l.title}</td>
                      <td>
                        <span className="status-badge status-confirmed">{l.badge}</span>
                      </td>
                      <td style={{ color: 'var(--blue-light)', fontFamily: 'var(--font-accent)' }}>
                        {l.location}
                      </td>
                      <td>R{l.price.toLocaleString('en-ZA')}</td>
                      <td style={{ color: 'var(--gold)' }}>★ {l.rating}</td>
                      <td style={{ color: 'var(--text-dim)' }}>{l.reviews}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── ANALYTICS ── */}
        {activeTab === 'analytics' && (
          <>
            <div className="admin-header">
              <h1 className="admin-title">Analytics</h1>
            </div>

            <div className="admin-stats">
              <div className="stat-card">
                <p className="stat-label">Page views (Sept)</p>
                <p className="stat-value">12,480</p>
                <p className="stat-change">↑ 23% vs last month</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Conversion rate</p>
                <p className="stat-value">3.8%</p>
                <p className="stat-change">↑ 0.4% vs last month</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Avg. booking value</p>
                <p className="stat-value">R6,001</p>
                <p className="stat-change">↑ 5% vs last month</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Wishlist saves</p>
                <p className="stat-value">847</p>
                <p className="stat-change">↑ 18% vs last month</p>
              </div>
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', margin: '1.5rem 0 1rem', color: 'var(--text-main)' }}>
              Top categories by revenue
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem', maxWidth: 600 }}>
              {[
                { cat: 'Japanese', pct: 88, rev: 'R14,400' },
                { cat: 'Treehouse', pct: 72, rev: 'R11,800' },
                { cat: 'Korean', pct: 65, rev: 'R9,700' },
                { cat: 'Musician Studio', pct: 58, rev: 'R8,500' },
                { cat: 'Garage Home', pct: 51, rev: 'R7,200' },
                { cat: 'Beach', pct: 44, rev: 'R6,100' },
              ].map(row => (
                <div key={row.cat}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.25rem', fontSize: '.88rem' }}>
                    <span style={{ color: 'var(--text-main)' }}>{row.cat}</span>
                    <span style={{ color: 'var(--text-dim)' }}>{row.rev}</span>
                  </div>
                  <div style={{ background: 'var(--bg-input)', borderRadius: 4, height: 8 }}>
                    <div style={{
                      background: 'var(--gradient-sunset)', height: '100%',
                      borderRadius: 4, width: `${row.pct}%`, transition: 'width .6s ease'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

function BookingsTable({ bookings, updateStatus, statusClass }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Guest</th>
            <th>Listing</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-dim)' }}>
                No bookings found
              </td>
            </tr>
          ) : (
            bookings.map(b => (
              <tr key={b.id}>
                <td style={{ color: 'var(--text-dim)', fontFamily: 'monospace' }}>{b.id}</td>
                <td style={{ fontWeight: 500 }}>{b.guest}</td>
                <td style={{ color: 'var(--blue-light)', fontFamily: 'var(--font-accent)' }}>{b.listing}</td>
                <td>{b.checkin}</td>
                <td>{b.checkout}</td>
                <td style={{ color: 'var(--gold)', fontWeight: 600 }}>{b.total}</td>
                <td>
                  <span className={`status-badge ${statusClass[b.status]}`}>{b.status}</span>
                </td>
                <td style={{ display: 'flex', gap: '.4rem' }}>
                  {b.status !== 'confirmed' && (
                    <button className="btn-admin-action" onClick={() => updateStatus(b.id, 'confirmed')}>
                      Confirm
                    </button>
                  )}
                  {b.status !== 'cancelled' && (
                    <button className="btn-admin-action" onClick={() => updateStatus(b.id, 'cancelled')}>
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
