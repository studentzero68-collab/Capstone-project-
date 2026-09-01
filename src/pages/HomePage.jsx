import React, { useState, useEffect } from 'react';
import { LISTINGS } from '../data';
import ListingCard from '../components/ListingCard';
import '../styles/HomePage.css';

function HomePage({
  wishlist,
  onToggleWishlist,
  onOpenDetail,
  onSearch,
  activeCategory,
  onCategoryChange,
}) {
  const [homeListingsShown, setHomeListingsShown] = useState(8);
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    const filtered = LISTINGS.filter((l) =>
      activeCategory === 'all' ? true : l.category === activeCategory
    );
    setFilteredListings(filtered);
  }, [activeCategory]);

  const handleLoadMore = () => {
    setHomeListingsShown((prev) => prev + 8);
  };

  const shownListings = filteredListings.slice(0, homeListingsShown);

  return (
    <main className="page home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Where Every Journey Begins</h1>
          <p className="hero-sub">Zero is where you find unforgettable stays — treehouses, beach spots, studios, and more. For those who never got to travel growing up.</p>
          <button className="cta-btn" onClick={() => document.querySelector('.cat-bar').scrollIntoView()}>
            Explore Now
          </button>
        </div>
      </section>

      {/* Why Zero Section */}
      <section className="why-zero">
        <div className="section-header">
          <h2 className="section-title">Why Zero?</h2>
          <p className="section-sub">Four reasons you'll never want to leave</p>
        </div>
        <div className="value-cards">
          <div className="value-card">
            <div className="value-icon">✨</div>
            <h3>For Everyone</h3>
            <p>Romantic getaways, solo adventures, family reunions, friend trips — there's a space for every story.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">💰</div>
            <h3>Affordable</h3>
            <p>You don't have to be rich to enjoy the world. Our stays range from budget-friendly to luxury.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🌍</div>
            <h3>Authentic</h3>
            <p>Stay in unique spaces that tell a story. Treehouses with mountain views, beach shacks, music studios.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Community</h3>
            <p>Hosts are storytellers. Every stay comes with local knowledge and genuine hospitality.</p>
          </div>
        </div>
      </section>

      {/* Listings Grid */}
      <section className="listings-section">
        <div className="section-header">
          <h2 className="section-title">Featured Stays</h2>
          <p className="section-sub">Handpicked accommodations across South Africa</p>
        </div>
        <div className="home-listings-grid">
          {shownListings.length === 0 ? (
            <p className="no-results">No stays match your filters. Try adjusting them.</p>
          ) : (
            shownListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                isLiked={wishlist.includes(listing.id)}
                onToggleWishlist={onToggleWishlist}
                onOpenDetail={onOpenDetail}
              />
            ))
          )}
        </div>

        {filteredListings.length > homeListingsShown && (
          <div className="load-more-container">
            <button className="btn-load-more" onClick={handleLoadMore}>
              Load More Stays
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="newsletter-content">
          <h2>Get Inspiration for Your Next Journey</h2>
          <p>Join 50,000+ travelers discovering unique stays</p>
          <form onSubmit={(e) => {
            e.preventDefault();
            alert('Newsletter signup coming soon!');
          }}>
            <input type="email" placeholder="your@email.com" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-col">
            <h4>Zero</h4>
            <p>Where Every Journey Begins</p>
          </div>
          <div className="footer-col">
            <h5>Support</h5>
            <ul>
              <li><a href="#help">Help Centre</a></li>
              <li><a href="#safety">Safety</a></li>
              <li><a href="#community">Community</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Hosting</h5>
            <ul>
              <li><a href="#host">Become a Host</a></li>
              <li><a href="#hosting">Hosting Guidelines</a></li>
              <li><a href="#resources">Resources</a></li>
            </ul>
          </div>
        </div>
        <p className="footer-bottom">© 2026 Zero. All rights reserved.</p>
      </footer>
    </main>
  );
}

export default HomePage;
