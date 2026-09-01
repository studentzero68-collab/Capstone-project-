import React, { useState } from 'react';
import '../styles/Navbar.css';

function Navbar({ onSearch, onNavigate, onCategorySelect, activeCategory }) {
  const [searchInput, setSearchInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const categories = [
    'all',
    'treehouse',
    'beach',
    'garage',
    'baker',
    'musician',
    'gamer',
    'japanese',
    'korean',
    'southafrican',
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
      setSearchInput('');
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <a href="#" className="brand" onClick={() => onNavigate('home')}>
          <span className="brand-zero">Zero</span>
          <span className="brand-tag">Where Every Journey Begins</span>
        </a>

        <form className="nav-search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search destinations or categories"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="nsb-search-btn" aria-label="Search">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="13" cy="13" r="8" stroke="white" strokeWidth="2.5" />
              <line x1="19" y1="19" x2="27" y2="27" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span>Search</span>
          </button>
        </form>

        <div className="nav-actions">
          <button className="btn-host" onClick={() => onNavigate('admin')}>
            Become a Host
          </button>
          <button
            className="btn-menu"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-label="User menu"
          >
            ☰
          </button>
          {showDropdown && (
            <div className="nav-dropdown">
              <button onClick={() => { alert('Sign up feature'); setShowDropdown(false); }}>
                Sign up
              </button>
              <button onClick={() => { alert('Log in feature'); setShowDropdown(false); }}>
                Log in
              </button>
              <hr />
              <button onClick={() => { alert('Host your home'); setShowDropdown(false); }}>
                Airbnb your home
              </button>
              <button onClick={() => { alert('Help Centre'); setShowDropdown(false); }}>
                Help Centre
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="cat-bar">
        <div className="cat-bar-inner">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => onCategorySelect(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
