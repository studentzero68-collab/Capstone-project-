import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import DetailPage from './pages/DetailPage'
import AdminPage from '../../Admin/AdminPage'
import LoginPage from './pages/LoginPage'

// Protect admin routes — redirect to login if not signed in as admin
function AdminRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'admin') return <Navigate to="/" replace />
  return children
}

export default function App() {
  const { user, logout } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()

  const [theme, setTheme] = useState(
    () => localStorage.getItem('zero_theme') || 'dark'
  )
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery]       = useState('')
  const [checkin, setCheckin]               = useState('')
  const [checkout, setCheckout]             = useState('')
  const [guests, setGuests]                 = useState(1)
  const [filterOpen, setFilterOpen]         = useState(false)
  const [filters, setFilters]               = useState({
    priceMin: 0, priceMax: 5000, beds: 0, types: [], amenities: [],
  })
  const [sortBy, setSortBy]     = useState('recommended')
  const [wishlist, setWishlist] = useState(
    () => JSON.parse(localStorage.getItem('zero_wishlist') || '[]')
  )

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('zero_theme', theme)
  }, [theme])

  // Persist wishlist
  useEffect(() => {
    localStorage.setItem('zero_wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const toggleTheme   = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const toggleWishlist = (id) =>
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  const handleSearch = () => navigate('/search')
  const handleLogout = () => { logout(); navigate('/') }

  // Hide navbar + footer on login page
  const isLoginPage  = location.pathname === '/login'
  const isAdminPage  = location.pathname === '/admin'
  const showCatBar   = !isAdminPage && !isLoginPage

  const sharedProps = {
    theme, toggleTheme,
    activeCategory, setActiveCategory,
    searchQuery, setSearchQuery,
    checkin, setCheckin,
    checkout, setCheckout,
    guests, setGuests,
    filterOpen, setFilterOpen,
    filters, setFilters,
    sortBy, setSortBy,
    wishlist, toggleWishlist,
    handleSearch,
    user, handleLogout,
  }

  return (
    <div data-theme={theme}>
      {!isLoginPage && (
        <Navbar {...sharedProps} showCatBar={showCatBar} />
      )}

      <Routes>
        <Route path="/login"        element={<LoginPage />} />
        <Route path="/"             element={<HomePage {...sharedProps} />} />
        <Route path="/search"       element={<SearchPage {...sharedProps} />} />
        <Route path="/listing/:id"  element={<DetailPage wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
        <Route path="/admin"        element={
          <AdminRoute>
            <AdminPage theme={theme} toggleTheme={toggleTheme} />
          </AdminRoute>
        } />
        {/* Fallback */}
        <Route path="*"             element={<Navigate to="/" replace />} />
      </Routes>

      {!isLoginPage && !isAdminPage && <Footer />}
    </div>
  )
}
