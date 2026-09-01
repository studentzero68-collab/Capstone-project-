import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { LISTINGS } from '../data/listings'

export default function DetailPage({ wishlist, toggleWishlist }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const listing = LISTINGS.find(l => l.id === Number(id))

  const [checkin, setCheckin]       = useState('')
  const [checkout, setCheckout]     = useState('')
  const [bookGuests, setBookGuests] = useState(1)
  const [reserved, setReserved]     = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (!listing) {
    return (
      <main style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', marginBottom: '1rem' }}>
          Listing not found
        </h2>
        <button className="btn-hero" onClick={() => navigate('/')}>
          Back to home
        </button>
      </main>
    )
  }

  const isLiked = wishlist.includes(listing.id)
  const formatPrice = (n) => `R${Number(n).toLocaleString('en-ZA')}`

  const nights = (() => {
    if (!checkin || !checkout) return 0
    const diff = Math.round((new Date(checkout) - new Date(checkin)) / 86400000)
    return diff > 0 ? diff : 0
  })()

  const basePrice      = listing.price * nights
  const weeklyDiscount = nights >= 7 ? Math.round(basePrice * 0.10) : 0
  const cleaningFee    = 350
  const serviceFee     = Math.round((basePrice - weeklyDiscount) * 0.12)
  const taxes          = Math.round((basePrice - weeklyDiscount + cleaningFee + serviceFee) * 0.15)
  const total          = basePrice - weeklyDiscount + cleaningFee + serviceFee + taxes

  const handleReserve = () => {
    if (!checkin || !checkout || nights <= 0) {
      alert('Please select valid check-in and check-out dates.')
      return
    }
    setReserved(true)
    setTimeout(() => setReserved(false), 3000)
  }

  const stars = (n) => '* '.repeat(n).trim()

  return (
    <main id="main-content">
      <div className="detail-layout">

        {/* Back */}
        <nav aria-label="Breadcrumb">
          <button className="btn-back" onClick={() => navigate(-1)} aria-label="Go back">
            &larr; Back
          </button>
        </nav>

        {/* Photo grid */}
        <div
          className="detail-photos"
          role="img"
          aria-label={`Photos of ${listing.title}`}
        >
          {listing.photos.slice(0, 5).map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${listing.title} — photo ${i + 1}`}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>

        {/* 2-col layout */}
        <div className="detail-main">

          {/* Info column */}
          <div className="detail-info-col">
            <span className="detail-badge">{listing.badge}</span>
            <h1 className="detail-title">{listing.title}</h1>
            <p className="detail-location">{listing.location}</p>

            <div className="detail-meta-row">
              <span>{listing.guests} guests</span>
              <span>{listing.beds} bedroom{listing.beds > 1 ? 's' : ''}</span>
              <span>{listing.baths} bath{listing.baths > 1 ? 's' : ''}</span>
            </div>

            <div className="detail-rating-row">
              <span>* {listing.rating}</span>
              <span style={{ color: 'var(--text-dim)' }}>·</span>
              <a
                href="#reviews-heading"
                style={{ color: 'var(--gold)', fontFamily: 'var(--font-accent)' }}
              >
                {listing.reviews} reviews
              </a>
              <button
                style={{
                  marginLeft: 'auto', background: 'none', border: '1px solid var(--border-color)',
                  cursor: 'pointer', fontSize: '.85rem', color: isLiked ? 'var(--rose)' : 'var(--text-dim)',
                  padding: '.3rem .8rem', borderRadius: 'var(--radius-xl)', transition: 'all var(--transition)',
                }}
                onClick={() => toggleWishlist(listing.id)}
                aria-label={isLiked ? 'Remove from wishlist' : 'Save to wishlist'}
                aria-pressed={isLiked}
              >
                {isLiked ? 'Saved' : 'Save'}
              </button>
            </div>

            <hr className="detail-divider" />

            {/* Host */}
            <div className="detail-host">
              <div className="host-avatar" aria-hidden="true">
                {listing.hostInitial}
              </div>
              <div>
                <p className="host-name">Hosted by {listing.host}</p>
                <p className="host-super">Superhost · Joined Zero 2025</p>
              </div>
            </div>

            <hr className="detail-divider" />

            <h2 className="detail-sub-heading">About this space</h2>
            <p className="detail-description">{listing.description}</p>

            <hr className="detail-divider" />

            <h2 className="detail-sub-heading">What this place offers</h2>
            <ul className="amenities-list" aria-label="Amenities">
              {listing.amenities.map(a => (
                <li key={a}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--green)" aria-hidden="true">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                  {a}
                </li>
              ))}
            </ul>

            <hr className="detail-divider" />

            <h2 className="detail-sub-heading">House rules</h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', color: 'var(--text-dim)', fontSize: '.93rem' }}>
              <li>Check-in: after 14:00 · Check-out: before 11:00</li>
              <li>No smoking on the premises</li>
              <li>Pets on request only</li>
              <li>Events allowed with prior approval</li>
              <li>Maximum {listing.guests} guests</li>
            </ul>

            <hr className="detail-divider" />

            <h2 className="detail-sub-heading">Health &amp; safety</h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', color: 'var(--text-dim)', fontSize: '.93rem' }}>
              <li>Enhanced cleaning between stays</li>
              <li>Hand sanitiser provided</li>
              <li>First aid kit on site</li>
              <li>Carbon monoxide &amp; smoke detectors</li>
            </ul>

            <hr className="detail-divider" />

            <h2 className="detail-sub-heading">Cancellation policy</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '.93rem', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--text-main)' }}>Flexible:</strong> Full refund for
              cancellations made at least 24 hours before check-in. After that, the first night
              and service fee are non-refundable.
            </p>

            <hr className="detail-divider" />

            {/* Reviews */}
            <h2 className="detail-sub-heading" id="reviews-heading">
              * {listing.rating} · {listing.reviews} reviews
            </h2>
            <div className="reviews-list" aria-label="Guest reviews">
              {listing.reviewsList.map((r, i) => (
                <div key={i} className="review-card">
                  <div className="review-header">
                    <div className="review-avatar" aria-hidden="true">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="review-name">{r.name}</p>
                      <p className="review-date">{r.date}</p>
                    </div>
                  </div>
                  <p
                    className="review-stars"
                    aria-label={`${r.stars} out of 5 stars`}
                  >
                    {stars(r.stars)}
                  </p>
                  <p className="review-text">"{r.text}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Booking card */}
          <aside aria-label="Booking">
            <div className="detail-booking-card">
              <div className="booking-price-row">
                <span className="booking-price">{formatPrice(listing.price)}</span>
                <span className="booking-per">/ night</span>
              </div>
              <div className="booking-rating-row">
                * {listing.rating} · {listing.reviews} reviews
              </div>

              <div className="booking-dates">
                <div className="booking-field">
                  <label htmlFor="book-checkin">Check in</label>
                  <input
                    id="book-checkin"
                    type="date"
                    value={checkin}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setCheckin(e.target.value)}
                  />
                </div>
                <div className="booking-field">
                  <label htmlFor="book-checkout">Check out</label>
                  <input
                    id="book-checkout"
                    type="date"
                    value={checkout}
                    min={checkin || new Date().toISOString().split('T')[0]}
                    onChange={e => setCheckout(e.target.value)}
                  />
                </div>
              </div>

              <div className="booking-guests-row">
                <label>Guests</label>
                <div className="guest-stepper">
                  <button
                    className="stepper-btn"
                    onClick={() => setBookGuests(g => Math.max(1, g - 1))}
                    aria-label="Decrease guests"
                    disabled={bookGuests <= 1}
                  >
                    &minus;
                  </button>
                  <span className="guest-count" aria-live="polite">{bookGuests}</span>
                  <button
                    className="stepper-btn"
                    onClick={() => setBookGuests(g => Math.min(listing.guests, g + 1))}
                    aria-label="Increase guests"
                    disabled={bookGuests >= listing.guests}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="btn-reserve"
                onClick={handleReserve}
                aria-label={`Reserve ${listing.title}`}
              >
                {reserved ? 'Reserved!' : 'Reserve'}
              </button>
              <p className="booking-notice">You won't be charged yet</p>

              {nights > 0 && (
                <div className="booking-price-breakdown">
                  <div className="breakdown-row">
                    <span>{formatPrice(listing.price)} x {nights} night{nights !== 1 ? 's' : ''}</span>
                    <span>{formatPrice(basePrice)}</span>
                  </div>
                  {weeklyDiscount > 0 && (
                    <div className="breakdown-row" style={{ color: 'var(--green)' }}>
                      <span>Weekly discount (10%)</span>
                      <span>-{formatPrice(weeklyDiscount)}</span>
                    </div>
                  )}
                  <div className="breakdown-row">
                    <span>Cleaning fee</span>
                    <span>{formatPrice(cleaningFee)}</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Service fee</span>
                    <span>{formatPrice(serviceFee)}</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Occupancy taxes (15%)</span>
                    <span>{formatPrice(taxes)}</span>
                  </div>
                  <div className="breakdown-row total">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
