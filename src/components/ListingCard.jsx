import { useNavigate } from 'react-router-dom'

export default function ListingCard({ listing, wishlist, toggleWishlist, searchQuery = '' }) {
  const navigate = useNavigate()
  const isLiked = wishlist.includes(listing.id)

  const highlight = (text) => {
    if (!searchQuery) return text
    const escaped = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const parts = text.split(new RegExp(`(${escaped})`, 'gi'))
    return parts.map((p, i) =>
      p.toLowerCase() === searchQuery.toLowerCase()
        ? (
          <mark
            key={i}
            style={{ background: 'rgba(230,126,34,.35)', color: 'inherit', borderRadius: 2 }}
          >
            {p}
          </mark>
        )
        : p
    )
  }

  const formatPrice = (n) => `R${Number(n).toLocaleString('en-ZA')}`

  return (
    <article
      className="listing-card reveal"
      role="listitem"
      tabIndex={0}
      aria-label={`${listing.title}, ${listing.location}, ${formatPrice(listing.price)} per night`}
      onClick={() => navigate(`/listing/${listing.id}`)}
      onKeyDown={e => { if (e.key === 'Enter') navigate(`/listing/${listing.id}`) }}
    >
      <div className="card-img-wrap">
        <img src={listing.img} alt={listing.title} loading="lazy" />
        <span className="card-badge">{listing.badge}</span>
        <button
          className={`card-wishlist${isLiked ? ' liked' : ''}`}
          aria-label={isLiked ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-pressed={isLiked}
          onClick={e => { e.stopPropagation(); toggleWishlist(listing.id) }}
        >
          {isLiked ? 'Saved' : 'Save'}
        </button>
      </div>

      <div className="card-body">
        <h3 className="card-title">{highlight(listing.title)}</h3>
        <p className="card-location">{highlight(listing.location)}</p>
        <div className="card-meta">
          <span>{listing.guests} guests</span>
          <span>{listing.beds} bed{listing.beds > 1 ? 's' : ''}</span>
          <span>{listing.baths} bath{listing.baths > 1 ? 's' : ''}</span>
        </div>
        <div className="card-rating">
          <span aria-hidden="true">*</span>
          <span>{listing.rating}</span>
          <span style={{ color: 'var(--text-dim)', fontSize: '.82rem' }}>
            ({listing.reviews})
          </span>
        </div>
        <div className="card-price-row">
          <span className="card-price">{formatPrice(listing.price)}</span>
          <span className="card-per">/ night</span>
        </div>
      </div>
    </article>
  )
}
