import React, { useState, useEffect } from 'react';
import { LISTINGS } from '../data';
import ListingCard from '../components/ListingCard';
import '../styles/SearchPage.css';

function SearchPage({
  searchQuery,
  wishlist,
  onToggleWishlist,
  onOpenDetail,
  filterPriceMin,
  filterPriceMax,
  onPriceChange,
  sortBy,
  onSortChange,
}) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    let filtered = LISTINGS.filter((l) => {
      const q = searchQuery.toLowerCase();
      return (
        l.title.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q) ||
        (l.culture && l.culture.toLowerCase().includes(q))
      );
    });

    // Apply price filter
    filtered = filtered.filter(
      (l) => l.price >= filterPriceMin && l.price <= filterPriceMax
    );

    // Apply sorting
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setResults(filtered);
  }, [searchQuery, filterPriceMin, filterPriceMax, sortBy]);

  return (
    <main className="page search-page">
      <div className="search-container">
        <div className="search-header">
          <h1>Search Results</h1>
          <p>
            Found <strong>{results.length}</strong> stay{results.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
        </div>

        <div className="search-layout">
          {/* Filters Sidebar */}
          <aside className="search-filters">
            <div className="filter-group">
              <h3>Price per Night</h3>
              <div className="price-filter">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={filterPriceMin}
                  onChange={(e) => onPriceChange(Number(e.target.value), filterPriceMax)}
                  className="price-slider"
                />
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={filterPriceMax}
                  onChange={(e) => onPriceChange(filterPriceMin, Number(e.target.value))}
                  className="price-slider"
                />
                <div className="price-display">
                  R{filterPriceMin.toLocaleString()} - R{filterPriceMax.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="filter-group">
              <h3>Sort By</h3>
              <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="search-results">
            {results.length === 0 ? (
              <div className="no-results-message">
                <h2>No stays found</h2>
                <p>Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="search-listings-grid">
                {results.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    isLiked={wishlist.includes(listing.id)}
                    onToggleWishlist={onToggleWishlist}
                    onOpenDetail={onOpenDetail}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default SearchPage;
