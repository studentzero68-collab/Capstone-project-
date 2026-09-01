import React from 'react';
import '../styles/ListingCard.css';

function ListingCard({ listing, isLiked, onToggleWishlist, onOpenDetail }) {
  const stars = '★'.repeat(Math.floor(listing.rating)) + (listing.rating % 1 >= 0.5 ? '½' : '');

  return (
    <article className="listing-card" role="listitem">
      <div className="card-img-wrap">
        <img src={listing.img} alt={listing.title} loading="lazy" />
        <span className="card-badge">{listing.badge}</span>
        <button
          className={`card-wishlist ${isLiked ? 'liked' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(listing.id);
          }}
          aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isLiked}
        >
          {isLiked ? 'Saved' : 'Save'}
        </button>
      </div>
      <div className="card-body" onClick={() => onOpenDetail(listing)}>
        <h3 className="card-title">{listing.title}</h3>
        <p className="card-location">{listing.location}</p>
        <div className="card-meta">
          <span>{listing.guests} guests</span>
          <span>{listing.beds} bed{listing.beds > 1 ? 's' : ''}</span>
          <span>{listing.baths} bath{listing.baths > 1 ? 's' : ''}</span>
        </div>
        <div className="card-rating">
          <span aria-hidden="true">★</span>
          <span>{listing.rating}</span>
          <span style={{ color: 'var(--white-dim)', fontSize: '0.82rem' }}>({listing.reviews})</span>
        </div>
        <div className="card-price-row">
          <span className="card-price">R{Number(listing.price).toLocaleString('en-ZA')}</span>
          <span className="card-per">/ night</span>
        </div>
      </div>
    </article>
  );
}

export default ListingCard;
