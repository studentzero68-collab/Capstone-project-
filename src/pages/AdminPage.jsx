import React, { useState } from 'react';
import '../styles/AdminPage.css';

function AdminPage({ onNavigate }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Invalid email format');
      return;
    }

    // Mock login
    if (email === 'admin@zero.com' && password === 'password') {
      setIsLoggedIn(true);
      setEmail('');
      setPassword('');
    } else {
      setError('Invalid credentials');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-page login-page">
        <div className="login-wrap">
          <div className="login-brand">
            <span className="brand-zero">Zero</span>
            <p>Admin Dashboard</p>
          </div>

          <form className="login-form" onSubmit={handleLogin} noValidate>
            <h1 className="login-title">Welcome back</h1>
            <p className="login-sub">Sign in to manage your listings</p>

            <div className="form-group">
              <label htmlFor="login-email">Email address</label>
              <input
                type="email"
                id="login-email"
                name="email"
                placeholder="admin@zero.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <div className="password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="toggle-pw"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="btn-primary full-width">
              Sign in
            </button>

            <p className="login-hint">
              Demo Credentials: <strong>admin@zero.com</strong> / <strong>password</strong>
            </p>

            <button
              type="button"
              className="btn-back"
              onClick={() => onNavigate('home')}
            >
              Back to Home
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page dashboard-page">
      <div className="dashboard-header">
        <div className="dashboard-brand">
          <span className="brand-zero">Zero</span>
          <p>Admin Dashboard</p>
        </div>
        <button
          className="btn-logout"
          onClick={() => {
            setIsLoggedIn(false);
            setEmail('');
            setPassword('');
          }}
        >
          Log out
        </button>
      </div>

      <div className="dashboard-content">
        <h1>Welcome to Your Dashboard</h1>
        <p>Manage your listings, reservations, and messages here.</p>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>📋 Listings</h3>
            <p className="card-stat">5 Active</p>
            <button>View & Edit</button>
          </div>

          <div className="dashboard-card">
            <h3>📅 Reservations</h3>
            <p className="card-stat">12 Upcoming</p>
            <button>View Details</button>
          </div>

          <div className="dashboard-card">
            <h3>💬 Messages</h3>
            <p className="card-stat">8 Unread</p>
            <button>View Messages</button>
          </div>

          <div className="dashboard-card">
            <h3>💰 Earnings</h3>
            <p className="card-stat">R45,230</p>
            <button>View Earnings</button>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">✓</span>
              <div>
                <p className="activity-text">New booking for "The Canopy Nest"</p>
                <p className="activity-time">2 hours ago</p>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">✓</span>
              <div>
                <p className="activity-text">Guest review received: 5 stars</p>
                <p className="activity-time">5 hours ago</p>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">✓</span>
              <div>
                <p className="activity-text">New message from guest</p>
                <p className="activity-time">1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        <button
          className="btn-back-home"
          onClick={() => onNavigate('home')}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default AdminPage;
