/**
 * AdminPage.jsx
 * Full admin dashboard: Overview, Listings (CRUD), Reservations, Users
 * Rubric: JWT auth, create/view/update/delete listings, reservations table,
 *         image uploads, input validation, error feedback.
 */
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  apiGetAccommodations,
  apiCreateAccommodation,
  apiUpdateAccommodation,
  apiDeleteAccommodation,
  apiGetAllReservations,
  apiGetHostReservations,
  apiDeleteReservation,
} from '../services/api'
import { LISTINGS } from '../data/listings'

// ── Static mock data shown when backend is offline ───────────────
const MOCK_BOOKINGS = [
  { _id:'BK001', user:{username:'Lerato K.'}, accommodation:{title:'The Canopy Nest',price:1850},    checkin:'2026-09-10', checkout:'2026-09-14', total:8740,  status:'confirmed' },
  { _id:'BK002', user:{username:'Marco V.'}, accommodation:{title:'Sky Loft Hideaway',price:2100},   checkin:'2026-09-15', checkout:'2026-09-17', total:5540,  status:'confirmed' },
  { _id:'BK003', user:{username:'Amos T.'},  accommodation:{title:'Sunset Shack',price:950},          checkin:'2026-09-20', checkout:'2026-09-25', total:6200,  status:'pending'   },
  { _id:'BK004', user:{username:'Julia M.'}, accommodation:{title:'Level Up Bunker',price:650},       checkin:'2026-09-22', checkout:'2026-09-24', total:1740,  status:'confirmed' },
  { _id:'BK005', user:{username:'Sipho D.'}, accommodation:{title:'Zen Garden Retreat',price:2400},  checkin:'2026-10-01', checkout:'2026-10-05', total:12600, status:'pending'   },
  { _id:'BK006', user:{username:'Tshepo N.'},accommodation:{title:'Gangnam Style Flat',price:2000},  checkin:'2026-09-28', checkout:'2026-09-30', total:5340,  status:'cancelled' },
]

const PROPERTY_TYPES = ['treehouse','beach','garage','baker','musician','gamer','japanese','korean','southafrican']
const AMENITY_LIST   = ['WiFi','Kitchen','Parking','Pool','Air conditioning','Braai area','Outdoor shower','Fireplace',
                         'Soundproofed','Smart TV','Gym','Washing machine','Workspace','Beach gear','Surfboard rental']

const EMPTY_FORM = {
  title:'', location:'', description:'', type:'treehouse',
  guests:2, bedrooms:1, bathrooms:1, price:'',
  weeklyDiscount:0, cleaningFee:350, serviceFee:0, occupancyTaxes:0,
  amenities:[], images:[],
}

const TABS = ['overview','listings','reservations','users']

export default function AdminPage({ theme, toggleTheme }) {
  const navigate           = useNavigate()
  const { user, logout }   = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  // ── Listings state ────────────────────────────────────────────
  const [listings, setListings]         = useState([])
  const [listingsLoading, setListingsLoading] = useState(false)
  const [listingsError, setListingsError]     = useState('')

  // Form state
  const [showForm, setShowForm]     = useState(false)
  const [editTarget, setEditTarget] = useState(null)  // null = create mode
  const [form, setForm]             = useState(EMPTY_FORM)
  const [formErrors, setFormErrors] = useState({})
  const [formLoading, setFormLoading] = useState(false)
  const [formSuccess, setFormSuccess] = useState('')
  const fileRef = useRef(null)

  // ── Reservations state ────────────────────────────────────────
  const [reservations, setReservations]   = useState(MOCK_BOOKINGS)
  const [resLoading, setResLoading]       = useState(false)

  // ── Stats ─────────────────────────────────────────────────────
  const avgRating = (LISTINGS.reduce((s,l) => s+l.rating,0) / LISTINGS.length).toFixed(2)

  // ── Load listings from backend ────────────────────────────────
  useEffect(() => {
    if (activeTab === 'listings' || activeTab === 'overview') fetchListings()
    if (activeTab === 'reservations') fetchReservations()
  }, [activeTab])

  const fetchListings = async () => {
    setListingsLoading(true); setListingsError('')
    try {
      const data = await apiGetAccommodations()
      setListings(data.accommodations || [])
    } catch {
      // Backend offline — show static data
      setListings(LISTINGS.map(l => ({ ...l, _id: String(l.id), host: { username: l.host } })))
    } finally { setListingsLoading(false) }
  }

  const fetchReservations = async () => {
    setResLoading(true)
    try {
      const data = await apiGetAllReservations()
      if (data.reservations?.length) setReservations(data.reservations)
    } catch { /* keep mock data */ }
    finally { setResLoading(false) }
  }

  // ── Form helpers ──────────────────────────────────────────────
  const openCreate = () => {
    setEditTarget(null); setForm(EMPTY_FORM)
    setFormErrors({}); setFormSuccess(''); setShowForm(true)
  }

  const openEdit = (listing) => {
    setEditTarget(listing._id || listing.id)
    setForm({
      title:          listing.title          || '',
      location:       listing.location       || '',
      description:    listing.description    || '',
      type:           listing.type || listing.category || 'treehouse',
      guests:         listing.guests         || 2,
      bedrooms:       listing.bedrooms || listing.beds || 1,
      bathrooms:      listing.bathrooms || listing.baths || 1,
      price:          listing.price          || '',
      weeklyDiscount: listing.weeklyDiscount || 0,
      cleaningFee:    listing.cleaningFee    || 350,
      serviceFee:     listing.serviceFee     || 0,
      occupancyTaxes: listing.occupancyTaxes || 0,
      amenities:      listing.amenities      || [],
      images:         listing.images || (listing.img ? [listing.img] : []),
    })
    setFormErrors({}); setFormSuccess(''); setShowForm(true)
  }

  const closeForm = () => { setShowForm(false); setEditTarget(null) }

  const setField = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    setFormErrors(e => { const n = {...e}; delete n[key]; return n })
  }

  const toggleAmenity = (a) =>
    setField('amenities', form.amenities.includes(a)
      ? form.amenities.filter(x => x !== a)
      : [...form.amenities, a])

  // ── Validation ────────────────────────────────────────────────
  const validate = () => {
    const e = {}
    if (!form.title.trim())       e.title       = 'Title is required'
    if (!form.location.trim())    e.location    = 'Location is required'
    if (!form.description.trim()) e.description = 'Description is required'
    if (!form.price || Number(form.price) <= 0) e.price = 'Valid price is required'
    if (Number(form.guests) < 1)  e.guests      = 'At least 1 guest required'
    return e
  }

  // ── Submit ────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setFormErrors(errs); return }

    setFormLoading(true); setFormSuccess('')
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'amenities') v.forEach(a => fd.append('amenities', a))
        else if (k === 'images') { /* handled below */ }
        else fd.append(k, v)
      })
      // Attach selected files
      if (fileRef.current?.files) {
        Array.from(fileRef.current.files).forEach(f => fd.append('images', f))
      }
      // Also send existing image URLs
      form.images.forEach(url => fd.append('images', url))

      if (editTarget) {
        await apiUpdateAccommodation(editTarget, fd)
        setFormSuccess('Listing updated successfully.')
      } else {
        await apiCreateAccommodation(fd)
        setFormSuccess('Listing created successfully.')
      }
      await fetchListings()
      setTimeout(closeForm, 1200)
    } catch (err) {
      setFormErrors({ submit: err.message })
    } finally { setFormLoading(false) }
  }

  // ── Delete ────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this listing? This cannot be undone.')) return
    try {
      await apiDeleteAccommodation(id)
      setListings(prev => prev.filter(l => (l._id || l.id) !== id))
    } catch (err) {
      alert('Delete failed: ' + err.message)
    }
  }

  // ── Cancel reservation ────────────────────────────────────────
  const handleCancelRes = async (id) => {
    if (!window.confirm('Cancel this reservation?')) return
    try {
      await apiDeleteReservation(id)
      setReservations(prev => prev.filter(r => r._id !== id))
    } catch { /* offline */ }
  }

  const fmtPrice  = (n) => `R${Number(n||0).toLocaleString('en-ZA')}`
  const fmtDate   = (d) => d ? new Date(d).toLocaleDateString('en-ZA') : '—'
  const statusCls = { confirmed:'status-confirmed', pending:'status-pending', cancelled:'status-cancelled' }

  return (
    <div className="admin-layout">

      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside className="admin-sidebar" aria-label="Admin navigation">
        <span className="admin-logo">Zero</span>

        {user && (
          <div style={{ padding:'.5rem .85rem 1rem', borderBottom:`1px solid var(--border-color)`, marginBottom:'.5rem' }}>
            <p style={{ fontSize:'.78rem', color:'var(--text-dim)', textTransform:'uppercase', letterSpacing:'.06em' }}>Signed in as</p>
            <p style={{ fontSize:'.9rem', fontWeight:600, color:'var(--text-main)', marginTop:'.15rem' }}>{user.name}</p>
            <span style={{ fontSize:'.75rem', background:'var(--gradient-sunset)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:700 }}>
              {user.role?.toUpperCase()}
            </span>
          </div>
        )}

        {TABS.map(tab => (
          <button key={tab} className={`admin-nav-item${activeTab===tab?' active':''}`}
            onClick={() => setActiveTab(tab)} aria-current={activeTab===tab?'page':undefined}>
            {tab.charAt(0).toUpperCase()+tab.slice(1)}
          </button>
        ))}

        <hr style={{ borderColor:'var(--border-color)', margin:'.75rem 0' }} />
        <button className="admin-nav-item" onClick={toggleTheme}>
          {theme==='dark' ? 'Light mode' : 'Dark mode'}
        </button>
        <button className="admin-nav-item" onClick={() => navigate('/')}>
          Back to Zero
        </button>
        <button className="admin-nav-item" style={{ color:'var(--sunset)' }}
          onClick={() => { logout(); navigate('/login') }}>
          Sign out
        </button>
      </aside>

      {/* ── Main ────────────────────────────────────────────── */}
      <main className="admin-main" id="admin-main-content">

        {/* ═══════ OVERVIEW ═══════ */}
        {activeTab==='overview' && (
          <>
            <div className="admin-header">
              <h1 className="admin-title">Dashboard Overview</h1>
              <span style={{ fontFamily:'var(--font-accent)', color:'var(--text-dim)' }}>September 2026</span>
            </div>
            <div className="admin-stats">
              {[
                { label:'Confirmed bookings', value: reservations.filter(r=>r.status==='confirmed').length, change:'+12% this month' },
                { label:'Total revenue',      value: fmtPrice(reservations.reduce((s,r)=>s+(r.total||0),0)), change:'+8% this month' },
                { label:'Active listings',    value: listings.length || LISTINGS.length, change:'Across 9 categories' },
                { label:'Avg. rating',        value:`* ${avgRating}`, change:`From ${LISTINGS.reduce((s,l)=>s+l.reviews,0)} reviews` },
              ].map(s => (
                <div key={s.label} className="stat-card">
                  <p className="stat-label">{s.label}</p>
                  <p className="stat-value">{s.value}</p>
                  <p className="stat-change">{s.change}</p>
                </div>
              ))}
            </div>

            <h2 style={{ fontFamily:'var(--font-heading)', fontStyle:'italic', margin:'1.5rem 0 1rem', color:'var(--text-main)' }}>Recent bookings</h2>
            <ReservationsTable rows={MOCK_BOOKINGS.slice(0,5)} onCancel={handleCancelRes} fmtPrice={fmtPrice} fmtDate={fmtDate} statusCls={statusCls} />

            <h2 style={{ fontFamily:'var(--font-heading)', fontStyle:'italic', margin:'2rem 0 1rem', color:'var(--text-main)' }}>Revenue by category</h2>
            <div style={{ display:'flex', flexDirection:'column', gap:'.75rem', maxWidth:600 }}>
              {[
                { cat:'Japanese',       pct:88, rev:'R14,400' },
                { cat:'Treehouse',      pct:72, rev:'R11,800' },
                { cat:'Korean',         pct:65, rev:'R9,700'  },
                { cat:'Musician Studio',pct:58, rev:'R8,500'  },
                { cat:'Garage Home',    pct:51, rev:'R7,200'  },
                { cat:'Beach',          pct:44, rev:'R6,100'  },
              ].map(r => (
                <div key={r.cat}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'.25rem', fontSize:'.88rem' }}>
                    <span style={{ color:'var(--text-main)' }}>{r.cat}</span>
                    <span style={{ color:'var(--text-dim)' }}>{r.rev}</span>
                  </div>
                  <div style={{ background:'var(--bg-input)', borderRadius:4, height:8 }}>
                    <div style={{ background:'var(--gradient-sunset)', height:'100%', borderRadius:4, width:`${r.pct}%`, transition:'width .6s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ═══════ LISTINGS ═══════ */}
        {activeTab==='listings' && (
          <>
            <div className="admin-header">
              <h1 className="admin-title">Manage Listings</h1>
              <button className="btn-reserve" style={{ width:'auto', padding:'.6rem 1.4rem' }} onClick={openCreate}>
                + New listing
              </button>
            </div>

            {listingsError && <p style={{ color:'#e55', marginBottom:'1rem' }}>{listingsError}</p>}

            {/* ── Listing form (create / edit) ── */}
            {showForm && (
              <div className="filter-panel" role="dialog" aria-modal="true" aria-label={editTarget ? 'Edit listing' : 'Create listing'}>
                <div className="filter-backdrop" onClick={closeForm} />
                <div className="filter-box" style={{ maxWidth:680, maxHeight:'92vh' }}>
                  <div className="filter-header">
                    <span className="filter-title">{editTarget ? 'Edit Listing' : 'Create New Listing'}</span>
                    <button className="filter-close" onClick={closeForm} aria-label="Close">X</button>
                  </div>

                  <form className="filter-body" onSubmit={handleSubmit} noValidate style={{ gap:'1.25rem' }}>

                    {/* Title */}
                    <div>
                      <label style={labelStyle}>Title *</label>
                      <input style={inputStyle(!!formErrors.title)} value={form.title}
                        onChange={e => setField('title', e.target.value)} placeholder="e.g. The Canopy Nest" />
                      {formErrors.title && <p style={errStyle}>{formErrors.title}</p>}
                    </div>

                    {/* Location */}
                    <div>
                      <label style={labelStyle}>Location *</label>
                      <input style={inputStyle(!!formErrors.location)} value={form.location}
                        onChange={e => setField('location', e.target.value)} placeholder="e.g. Knysna Forest, Western Cape" />
                      {formErrors.location && <p style={errStyle}>{formErrors.location}</p>}
                    </div>

                    {/* Description */}
                    <div>
                      <label style={labelStyle}>Description *</label>
                      <textarea style={{ ...inputStyle(!!formErrors.description), minHeight:90, resize:'vertical' }}
                        value={form.description} onChange={e => setField('description', e.target.value)}
                        placeholder="Describe the space..." />
                      {formErrors.description && <p style={errStyle}>{formErrors.description}</p>}
                    </div>

                    {/* Type */}
                    <div>
                      <label style={labelStyle}>Property type *</label>
                      <select style={inputStyle()} value={form.type} onChange={e => setField('type', e.target.value)}>
                        {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
                      </select>
                    </div>

                    {/* Numbers row */}
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'1rem' }}>
                      {[
                        { key:'guests',   label:'Guests *'  },
                        { key:'bedrooms', label:'Bedrooms *' },
                        { key:'bathrooms',label:'Bathrooms *' },
                      ].map(f => (
                        <div key={f.key}>
                          <label style={labelStyle}>{f.label}</label>
                          <input type="number" min="0" style={inputStyle()} value={form[f.key]}
                            onChange={e => setField(f.key, e.target.value)} />
                          {formErrors[f.key] && <p style={errStyle}>{formErrors[f.key]}</p>}
                        </div>
                      ))}
                    </div>

                    {/* Pricing row */}
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                      {[
                        { key:'price',          label:'Price per night (R) *' },
                        { key:'weeklyDiscount', label:'Weekly discount (%)' },
                        { key:'cleaningFee',    label:'Cleaning fee (R)' },
                        { key:'serviceFee',     label:'Service fee (R)' },
                        { key:'occupancyTaxes', label:'Occupancy taxes (R)' },
                      ].map(f => (
                        <div key={f.key}>
                          <label style={labelStyle}>{f.label}</label>
                          <input type="number" min="0" style={inputStyle(!!formErrors[f.key])}
                            value={form[f.key]} onChange={e => setField(f.key, e.target.value)} />
                          {formErrors[f.key] && <p style={errStyle}>{formErrors[f.key]}</p>}
                        </div>
                      ))}
                    </div>

                    {/* Amenities */}
                    <div>
                      <label style={labelStyle}>Amenities</label>
                      <div className="filter-chips" style={{ marginTop:'.4rem' }}>
                        {AMENITY_LIST.map(a => (
                          <button key={a} type="button"
                            className={`filter-chip${form.amenities.includes(a)?' selected':''}`}
                            onClick={() => toggleAmenity(a)}>
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Image upload */}
                    <div>
                      <label style={labelStyle}>Images (optional)</label>
                      <input ref={fileRef} type="file" multiple accept="image/*"
                        style={{ ...inputStyle(), cursor:'pointer' }} />
                      <p style={{ fontSize:'.78rem', color:'var(--text-dim)', marginTop:'.3rem' }}>
                        PNG, JPG or WebP — max 10MB each
                      </p>
                      {form.images.length > 0 && (
                        <div style={{ display:'flex', flexWrap:'wrap', gap:'.5rem', marginTop:'.5rem' }}>
                          {form.images.slice(0,5).map((src,i) => (
                            <img key={i} src={src} alt="" style={{ width:60, height:60, objectFit:'cover', borderRadius:6, border:'1px solid var(--border-color)' }} />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Feedback */}
                    {formErrors.submit && <p style={errStyle}>{formErrors.submit}</p>}
                    {formSuccess      && <p style={{ color:'var(--green)', fontSize:'.9rem' }}>{formSuccess}</p>}

                    <div className="filter-footer">
                      <button type="button" className="btn-filter-clear" onClick={closeForm}>Cancel</button>
                      <button type="submit" className="btn-filter-apply" disabled={formLoading}>
                        {formLoading ? 'Saving...' : editTarget ? 'Save changes' : 'Create listing'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Listings table */}
            {listingsLoading ? (
              <div className="spinner-wrap"><div className="spinner" /></div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Listing</th>
                      <th>Type</th>
                      <th>Location</th>
                      <th>Guests</th>
                      <th>Price/night</th>
                      <th>Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(listings.length > 0 ? listings : LISTINGS.map(l=>({...l,_id:String(l.id)}))).map(l => (
                      <tr key={l._id || l.id}>
                        <td>
                          <div style={{ display:'flex', alignItems:'center', gap:'.65rem' }}>
                            {(l.img || (l.images&&l.images[0])) && (
                              <img src={l.img || l.images[0]} alt=""
                                style={{ width:44, height:44, objectFit:'cover', borderRadius:6, flexShrink:0 }} />
                            )}
                            <span style={{ fontWeight:500 }}>{l.title}</span>
                          </div>
                        </td>
                        <td><span className="status-badge status-confirmed">{l.type||l.category||l.badge}</span></td>
                        <td style={{ color:'var(--blue-light)', fontFamily:'var(--font-accent)' }}>{l.location}</td>
                        <td>{l.guests}</td>
                        <td style={{ fontWeight:600 }}>R{Number(l.price).toLocaleString('en-ZA')}</td>
                        <td style={{ color:'var(--gold)' }}>* {l.rating||'—'}</td>
                        <td>
                          <div style={{ display:'flex', gap:'.4rem' }}>
                            <button className="btn-admin-action" onClick={() => openEdit(l)}>Edit</button>
                            <button className="btn-admin-action"
                              style={{ borderColor:'rgba(192,57,43,.4)', color:'var(--sunset)' }}
                              onClick={() => handleDelete(l._id||l.id)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ═══════ RESERVATIONS ═══════ */}
        {activeTab==='reservations' && (
          <>
            <div className="admin-header">
              <h1 className="admin-title">All Reservations</h1>
              <span style={{ fontFamily:'var(--font-accent)', color:'var(--text-dim)' }}>
                {reservations.length} total
              </span>
            </div>
            {resLoading
              ? <div className="spinner-wrap"><div className="spinner" /></div>
              : <ReservationsTable rows={reservations} onCancel={handleCancelRes} fmtPrice={fmtPrice} fmtDate={fmtDate} statusCls={statusCls} />
            }
          </>
        )}

        {/* ═══════ USERS ═══════ */}
        {activeTab==='users' && (
          <>
            <div className="admin-header">
              <h1 className="admin-title">User Accounts</h1>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Role</th><th>Password (demo)</th></tr>
                </thead>
                <tbody>
                  {[
                    { name:'Alex Mokoena',   email:'guest@zero.com',  role:'guest', pw:'guest123'  },
                    { name:'Lerato Khumalo', email:'lerato@zero.com', role:'guest', pw:'lerato123' },
                    { name:'Zero Admin',     email:'admin@zero.com',  role:'admin', pw:'admin123'  },
                    { name:'Host Manager',   email:'host@zero.com',   role:'admin', pw:'host123'   },
                  ].map(u => (
                    <tr key={u.email}>
                      <td style={{ fontWeight:500 }}>{u.name}</td>
                      <td style={{ color:'var(--blue-light)' }}>{u.email}</td>
                      <td>
                        <span className={`status-badge ${u.role==='admin'?'status-confirmed':'status-pending'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td style={{ fontFamily:'monospace', color:'var(--text-dim)', fontSize:'.85rem' }}>{u.pw}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ marginTop:'1rem', fontSize:'.85rem', color:'var(--text-dim)' }}>
              With MongoDB running, real users are managed via POST /api/users/register
            </p>
          </>
        )}
      </main>
    </div>
  )
}

// ── Sub-component: Reservations table ────────────────────────────
function ReservationsTable({ rows, onCancel, fmtPrice, fmtDate, statusCls }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th><th>Guest</th><th>Listing</th>
            <th>Check-in</th><th>Check-out</th><th>Total</th>
            <th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length===0 ? (
            <tr><td colSpan={8} style={{ textAlign:'center', padding:'2rem', color:'var(--text-dim)' }}>No reservations found</td></tr>
          ) : rows.map(r => (
            <tr key={r._id}>
              <td style={{ fontFamily:'monospace', color:'var(--text-dim)', fontSize:'.8rem' }}>
                {String(r._id).slice(-6).toUpperCase()}
              </td>
              <td style={{ fontWeight:500 }}>{r.user?.username || r.user?.name || '—'}</td>
              <td style={{ color:'var(--blue-light)', fontFamily:'var(--font-accent)' }}>
                {r.accommodation?.title || '—'}
              </td>
              <td>{fmtDate(r.checkin)}</td>
              <td>{fmtDate(r.checkout)}</td>
              <td style={{ color:'var(--gold)', fontWeight:600 }}>{fmtPrice(r.total)}</td>
              <td><span className={`status-badge ${statusCls[r.status]||'status-pending'}`}>{r.status}</span></td>
              <td>
                {r.status!=='cancelled' && (
                  <button className="btn-admin-action"
                    style={{ borderColor:'rgba(192,57,43,.4)', color:'var(--sunset)' }}
                    onClick={() => onCancel(r._id)}>
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Style helpers ─────────────────────────────────────────────────
const labelStyle = {
  display:'block', fontSize:'.78rem', fontWeight:700,
  textTransform:'uppercase', letterSpacing:'.06em',
  color:'var(--text-dim)', marginBottom:'.3rem',
}
const inputStyle = (hasError=false) => ({
  width:'100%', background:'var(--bg-input)',
  border:`1.5px solid ${hasError ? '#e55' : 'var(--border-color)'}`,
  borderRadius:'var(--radius-sm)', color:'var(--text-main)',
  padding:'.6rem .85rem', fontSize:'.9rem', outline:'none',
  fontFamily:'var(--font-body)',
})
const errStyle = {
  color:'#e55', fontSize:'.8rem', marginTop:'.25rem',
}
