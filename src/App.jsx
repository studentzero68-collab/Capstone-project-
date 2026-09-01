import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import AdminPage from './pages/AdminPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedListing, setSelectedListing] = useState(null);
  const [wishlist, setWishlist] = useState(() =>
    JSON.parse(localStorage.getItem('zero_wishlist') || '[]')
  );
  const [activeCategory, setActiveCategory] = useState('all');
  const [filterPriceMin, setFilterPriceMin] = useState(0);
  const [filterPriceMax, setFilterPriceMax] = useState(5000);
  const [sortBy, setSortBy] = useState('recommended');

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('zero_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const openDetail = (listing) => {
    setSelectedListing(listing);
    navigateTo('detail');
  };

  const goToSearch = (query) => {
    setSearchQuery(query);
    navigateTo('search');
  };

  return (
    <>
      {currentPage !== 'admin' && (
        <Navbar
          onSearch={goToSearch}
          onNavigate={navigateTo}
          onCategorySelect={setActiveCategory}
          activeCategory={activeCategory}
        />
      )}

      {currentPage === 'home' && (
        <HomePage
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onOpenDetail={openDetail}
          onSearch={goToSearch}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          filterPriceMin={filterPriceMin}
          filterPriceMax={filterPriceMax}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      )}

      {currentPage === 'search' && (
        <SearchPage
          searchQuery={searchQuery}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onOpenDetail={openDetail}
          filterPriceMin={filterPriceMin}
          filterPriceMax={filterPriceMax}
          onPriceChange={(min, max) => {
            setFilterPriceMin(min);
            setFilterPriceMax(max);
          }}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      )}

      {currentPage === 'detail' && selectedListing && (
        <DetailPage
          listing={selectedListing}
          isLiked={wishlist.includes(selectedListing.id)}
          onToggleWishlist={toggleWishlist}
          onNavigate={navigateTo}
        />
      )}

      {currentPage === 'admin' && <AdminPage onNavigate={navigateTo} />}
    </>
  );
}

export default App;
