import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, DEMO_USERS } from '../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [role, setRole]       = useState('guest')  // 'guest' | 'admin'
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password) {
      setError('Please fill in both fields.')
      return
    }
    setLoading(true)
    // Small delay for UX feel
    await new Promise(r => setTimeout(r, 600))
    const result = login(email.trim(), password, role)
    setLoading(false)
    if (result.ok) {
      navigate(result.user.role === 'admin' ? '/admin' : '/')
    } else {
      setError(result.error)
    }
  }

  const fillDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail)
    setPassword(demoPass)
    setError('')
  }

  const demos = role === 'admin' ? DEMO_USERS.admin : DEMO_USERS.guest

  return (
    <div className="login-page">

      {/* ── LEFT PANEL — Brand ── */}
      <div className="login-left">
        <div className="login-left-inner">
          <button
            className="login-brand"
            onClick={() => navigate('/')}
            aria-label="Go to Zero home"
          >
            Zero
          </button>
          <p className="login-brand-tag">Where every journey begins</p>

          <div className="login-hero-text">
            <h2>Your next story<br />starts here.</h2>
            <p>
              Treehouses above the forest floor. Beach shacks with the ocean at your door.
              Garage lofts, baker's kitchens, musician studios — all across South Africa.
            </p>
          </div>

          {/* Decorative stat row */}
          <div className="login-stats">
            <div className="login-stat">
              <span className="login-stat-val">18+</span>
              <span className="login-stat-label">Unique stays</span>
            </div>
            <div className="login-stat">
              <span className="login-stat-val">9</span>
              <span className="login-stat-label">Categories</span>
            </div>
            <div className="login-stat">
              <span className="login-stat-val">4.9</span>
              <span className="login-stat-label">Avg. rating</span>
            </div>
          </div>

          {/* Decorative gradient card preview */}
          <div className="login-card-preview" aria-hidden="true">
            <div className="lcp-img" />
            <div className="lcp-body">
              <span className="lcp-badge">Treehouse</span>
              <p className="lcp-title">The Canopy Nest</p>
              <p className="lcp-loc">Knysna Forest, Western Cape</p>
              <p className="lcp-price">R1,850 / night</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — Form ── */}
      <div className="login-right">
        <div className="login-form-wrap">

          {/* Header */}
          <div className="login-form-header">
            <h1>Welcome back</h1>
            <p>Sign in to your Zero account</p>
          </div>

          {/* Role tabs */}
          <div className="login-role-tabs" role="tablist" aria-label="Login type">
            <button
              className={`login-role-tab${role === 'guest' ? ' active' : ''}`}
              role="tab"
              aria-selected={role === 'guest'}
              onClick={() => { setRole('guest'); setError(''); setEmail(''); setPassword('') }}
            >
              Guest
            </button>
            <button
              className={`login-role-tab${role === 'admin' ? ' active' : ''}`}
              role="tab"
              aria-selected={role === 'admin'}
              onClick={() => { setRole('admin'); setError(''); setEmail(''); setPassword('') }}
            >
              Admin / Host
            </button>
          </div>

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="login-field">
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                type="email"
                placeholder={role === 'admin' ? 'admin@zero.com' : 'guest@zero.com'}
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                autoComplete="email"
                aria-describedby={error ? 'login-error' : undefined}
              />
            </div>

            <div className="login-field">
              <div className="login-field-row">
                <label htmlFor="login-password">Password</label>
                <button
                  type="button"
                  className="login-forgot"
                  tabIndex={0}
                >
                  Forgot password?
                </button>
              </div>
              <div className="login-pwd-wrap">
                <input
                  id="login-password"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-show-pwd"
                  onClick={() => setShowPwd(v => !v)}
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                >
                  {showPwd ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="login-error" id="login-error" role="alert">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="login-submit"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <span className="login-spinner" aria-hidden="true" />
              ) : (
                <>
                  Sign in as {role === 'admin' ? 'Admin' : 'Guest'}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="login-divider">
            <span>Quick demo access</span>
          </div>

          {/* Demo buttons */}
          <div className="login-demos">
            {demos.map(d => (
              <button
                key={d.email}
                className="login-demo-btn"
                onClick={() => fillDemo(d.email, d.password)}
                type="button"
              >
                <span className="login-demo-name">{d.name}</span>
                <span className="login-demo-email">{d.email}</span>
              </button>
            ))}
          </div>

          {/* Register prompt */}
          <p className="login-register">
            No account?{' '}
            <button
              type="button"
              className="login-register-link"
              onClick={() => navigate('/')}
            >
              Browse as guest
            </button>
          </p>

          {/* Back to site */}
          <button
            type="button"
            className="login-back-home"
            onClick={() => navigate('/')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Zero
          </button>

        </div>
      </div>
    </div>
  )
}
