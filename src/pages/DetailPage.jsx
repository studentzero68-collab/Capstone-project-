import React, { useState } from 'react';
import '../styles/DetailPage.css';

function DetailPage({ listing, isLiked, onToggleWishlist, onNavigate }) {
  const [bookingGuests, setBookingGuests] = useState(1);

  if (!listing) return null;

  return (
    <main className="page detail-page">
      <button className="back-button" onClick={() => onNavigate('home')}>
        ← Back
      </button>

      {/* Photo Grid */}
      <section className="detail-photos">
        <div className="photo-grid">
          <div className="photo-large">
            <img src={listing.img} alt={listing.title} />
          </div>
          <div className="photo-small">
            <img src={listing.img} alt={listing.title} />
          </div>
          <div className="photo-small">
            <img src={listing.img} alt={listing.title} />
          </div>
        </div>
      </section>

      <div className="detail-container">
        {/* Left Column - Details */}
        <section className="detail-content">
          {/* Header */}
          <div className="detail-header">
            <div>
              <h1>{listing.title}</h1>
              <p className="detail-location">{listing.location}</p>
              <div className="detail-meta">
                <span className="badge">{listing.badge}</span>
                <span className="rating">
                  ★ {listing.rating} ({listing.reviews} reviews)
                </span>
              </div>
            </div>
            <button
              className={`detail-wishlist ${isLiked ? 'liked' : ''}`}
              onClick={() => onToggleWishlist(listing.id)}
            >
              {isLiked ? '❤️ Saved' : '🤍 Save'}
            </button>
          </div>

          {/* Host Profile */}
          <div className="host-profile">
            <div className="host-info">
              <div className="host-avatar">
                {listing.host.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3>Hosted by {listing.host}</h3>
                <p>⭐ Superhost</p>
              </div>
            </div>
            <button className="btn-contact-host">Contact Host</button>
          </div>

          {/* Quick Info */}
          <div className="quick-info">
            <div className="info-item">
              <span className="info-label">Guests</span>
              <span className="info-value">{listing.guests}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Bedrooms</span>
              <span className="info-value">{listing.beds}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Bathrooms</span>
              <span className="info-value">{listing.baths}</span>
            </div>
          </div>

          {/* Description */}
          <section className="detail-section">
            <h2>About this place</h2>
            <p>{listing.description}</p>
          </section>

          {/* Amenities */}
          <section className="detail-section">
            <h2>What this place offers</h2>
            <div className="amenities-grid">
              {listing.amenities.map((amenity, idx) => (
                <div key={idx} className="amenity-item">
                  <span>✓</span>
                  {amenity}
                </div>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section className="detail-section">
            <h2>Reviews</h2>
            <div className="reviews-list">
              {listing.reviewsList.map((review, idx) => (
                <div key={idx} className="review-item">
                  <div className="review-header">
                    <h4>{review.name}</h4>
                    <span className="review-stars">{'★'.repeat(review.stars)}</span>
                  </div>
                  <p className="review-date">{review.date}</p>
                  <p className="review-text">{review.text}</p>
                </div>
              ))}
            </div>
          </section>
        </section>

        {/* Right Column - Booking Card */}
        <aside className="booking-card">
          <div className="booking-price">
            <span className="price">R{Number(listing.price).toLocaleString('en-ZA')}</span>
            <span className="per-night">/ night</span>
          </div>

          <div className="booking-rating">
            ★ {listing.rating} ({listing.reviews})
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            alert(`Booking ${bookingGuests} guest(s) at ${listing.title}! Coming soon!`);
          }}>
            <div className="form-group">
              <label>Guests</label>
              <select value={bookingGuests} onChange={(e) => setBookingGuests(Number(e.target.value))}>
                {Array.from({ length: listing.guests }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Check-in Date</label>
              <input type="date" required />
            </div>

            <div className="form-group">
              <label>Check-out Date</label>
              <input type="date" required />
            </div>

            <button type="submit" className="btn-reserve">
              Reserve
            </button>
          </form>

          <div className="booking-info">
            <p>You won't be charged yet</p>
            <hr />
            <div className="price-breakdown">
              <div className="breakdown-item">
                <span>R{Number(listing.price).toLocaleString('en-ZA')} × 1 night</span>
                <span>R{Number(listing.price).toLocaleString('en-ZA')}</span>
              </div>
              <div className="breakdown-item">
                <span>Service fee</span>
                <span>R50</span>
              </div>
              <hr />
              <div className="breakdown-total">
                <span>Total</span>
                <span>R{(listing.price + 50).toLocaleString('en-ZA')}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default DetailPage;
