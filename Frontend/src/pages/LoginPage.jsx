/**
 * LoginPage.jsx
 * Two modes: 'login' and 'signup' — toggled by the tab at the top.
 *
 * Login:  email + password → backend /api/users/login (demo fallback)
 * Signup: username + email + password + confirm → backend /api/users/register
 *         On success, user is automatically logged in and redirected.
 *         New users are saved in MongoDB as role 'user' (guest).
 *         Also shows in the admin Users tab.
 */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, DEMO_USERS } from '../context/AuthContext'

// ── Validation helpers ────────────────────────────────────────────
const isValidEmail   = e => /^\S+@\S+\.\S+$/.test(e.trim())
const isStrongEnough = p => p.length >= 6

export default function LoginPage() {
  const navigate      = useNavigate()
  const { user, login, register } = useAuth()

  // Redirect away if already logged in
  useEffect(() => {
    if (!user) return
    navigate(user.role === 'admin' ? '/admin' : '/', { replace: true })
  }, [user, navigate])

  // ── Mode: 'login' or 'signup' ─────────────────────────────────
  const [mode, setMode]       = useState('login')

  // ── Shared fields ─────────────────────────────────────────────
  const [role, setRole]       = useState('guest')   // guest | admin
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  // ── Sign-up only fields ───────────────────────────────────────
  const [username, setUsername]         = useState('')
  const [confirmPwd, setConfirmPwd]     = useState('')
  const [showConfirm, setShowConfirm]   = useState(false)
  const [successMsg, setSuccessMsg]     = useState('')

  // ── Field errors (per-field validation) ──────────────────────
  const [fieldErrors, setFieldErrors]   = useState({})

  const clearAll = () => {
    setEmail(''); setPassword(''); setUsername(''); setConfirmPwd('')
    setError(''); setFieldErrors(''); setSuccessMsg('')
  }

  const switchMode = (m) => {
    setMode(m)
    clearAll()
  }

  // ── Validate login ────────────────────────────────────────────
  const validateLogin = () => {
    const errs = {}
    if (!email.trim())         errs.email    = 'Email is required'
    else if (!isValidEmail(email)) errs.email = 'Enter a valid email'
    if (!password)             errs.password = 'Password is required'
    return errs
  }

  // ── Validate signup ───────────────────────────────────────────
  const validateSignup = () => {
    const errs = {}
    if (!username.trim())          errs.username = 'Name is required'
    else if (username.trim().length < 2) errs.username = 'Name must be at least 2 characters'
    if (!email.trim())             errs.email    = 'Email is required'
    else if (!isValidEmail(email)) errs.email    = 'Enter a valid email address'
    if (!password)                 errs.password = 'Password is required'
    else if (!isStrongEnough(password)) errs.password = 'Password must be at least 6 characters'
    if (!confirmPwd)               errs.confirmPwd = 'Please confirm your password'
    else if (password !== confirmPwd)   errs.confirmPwd = 'Passwords do not match'
    return errs
  }

  // ── Submit login ──────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault()
    setError(''); setFieldErrors({})
    const errs = validateLogin()
    if (Object.keys(errs).length) { setFieldErrors(errs); return }

    setLoading(true)
    await new Promise(r => setTimeout(r, 500)) // brief UX delay
    const result = await login(email.trim(), password, role)
    setLoading(false)

    if (result.ok) {
      navigate(result.user.role === 'admin' ? '/admin' : '/')
    } else {
      setError(result.error || 'Invalid email or password.')
    }
  }

  // ── Submit signup ─────────────────────────────────────────────
  const handleSignup = async (e) => {
    e.preventDefault()
    setError(''); setFieldErrors({}); setSuccessMsg('')
    const errs = validateSignup()
    if (Object.keys(errs).length) { setFieldErrors(errs); return }

    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    // Always register as 'user' role (guest) — admins are seeded directly
    const result = await register(username.trim(), email.trim(), password, 'user')
    setLoading(false)

    if (result.ok) {
      // Auto-logged in — useEffect above will redirect
      if (result.warning) {
        setSuccessMsg(result.warning)
      } else {
        setSuccessMsg('Account created! Signing you in...')
      }
    } else {
      // Common: email already taken
      if (result.error?.toLowerCase().includes('email')) {
        setFieldErrors({ email: 'This email is already registered. Try signing in.' })
      } else {
        setError(result.error || 'Could not create account. Please try again.')
      }
    }
  }

  const fillDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail); setPassword(demoPass)
    setError(''); setFieldErrors({})
  }

  const demos = role === 'admin' ? DEMO_USERS.admin : DEMO_USERS.guest

  // ── Eye icon ──────────────────────────────────────────────────
  const EyeIcon = ({ visible }) => visible ? (
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
  )

  const fe = fieldErrors // shorthand

  return (
    <div className="login-page">

      {/* ── LEFT PANEL ── */}
      <div className="login-left">
        <div className="login-left-inner">
          <button className="login-brand" onClick={() => navigate('/')} aria-label="Go to Zero home">
            Zero
          </button>
          <p className="login-brand-tag">Where every journey begins</p>

          <div className="login-hero-text">
            <h2>{mode === 'signup' ? 'Join the\nZero family.' : 'Your next story\nstarts here.'}</h2>
            <p>
              {mode === 'signup'
                ? 'Create a free account to save your favourite stays, manage bookings, and unlock exclusive deals across South Africa.'
                : 'Treehouses above the forest floor. Beach shacks with the ocean at your door. Garage lofts, baker\'s kitchens, musician studios — all across South Africa.'
              }
            </p>
          </div>

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

      {/* ── RIGHT PANEL ── */}
      <div className="login-right">
        <div className="login-form-wrap">

          {/* ── Login / Sign up mode tabs ── */}
          <div className="login-mode-tabs" role="tablist" aria-label="Login or sign up">
            <button
              className={`login-mode-tab${mode === 'login' ? ' active' : ''}`}
              role="tab"
              aria-selected={mode === 'login'}
              onClick={() => switchMode('login')}
            >
              Sign in
            </button>
            <button
              className={`login-mode-tab${mode === 'signup' ? ' active' : ''}`}
              role="tab"
              aria-selected={mode === 'signup'}
              onClick={() => switchMode('signup')}
            >
              Create account
            </button>
          </div>

          {/* ── Dynamic header ── */}
          <div className="login-form-header">
            <h1>{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h1>
            <p>{mode === 'signup' ? 'Free forever. No credit card needed.' : 'Sign in to your Zero account'}</p>
          </div>

          {/* ════════════════════════════════
                  SIGN IN FORM
              ════════════════════════════════ */}
          {mode === 'login' && (
            <>
              {/* Guest / Admin role tabs */}
              <div className="login-role-tabs" role="tablist" aria-label="Account type">
                <button
                  className={`login-role-tab${role === 'guest' ? ' active' : ''}`}
                  role="tab" aria-selected={role === 'guest'}
                  onClick={() => { setRole('guest'); setError(''); setEmail(''); setPassword('') }}
                >
                  Guest
                </button>
                <button
                  className={`login-role-tab${role === 'admin' ? ' active' : ''}`}
                  role="tab" aria-selected={role === 'admin'}
                  onClick={() => { setRole('admin'); setError(''); setEmail(''); setPassword('') }}
                >
                  Admin / Host
                </button>
              </div>

              <form className="login-form" onSubmit={handleLogin} noValidate>
                {/* Email */}
                <div className="login-field">
                  <label htmlFor="li-email">Email address</label>
                  <input
                    id="li-email" type="email"
                    placeholder={role === 'admin' ? 'admin@zero.com' : 'guest@zero.com'}
                    value={email}
                    onChange={e => { setEmail(e.target.value); setFieldErrors(f => ({...f, email: ''})) }}
                    autoComplete="email"
                    aria-invalid={!!fe.email}
                    aria-describedby={fe.email ? 'li-email-err' : undefined}
                  />
                  {fe.email && <p className="login-field-error" id="li-email-err" role="alert">{fe.email}</p>}
                </div>

                {/* Password */}
                <div className="login-field">
                  <div className="login-field-row">
                    <label htmlFor="li-password">Password</label>
                    <button type="button" className="login-forgot">Forgot password?</button>
                  </div>
                  <div className="login-pwd-wrap">
                    <input
                      id="li-password" type={showPwd ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={e => { setPassword(e.target.value); setFieldErrors(f => ({...f, password: ''})) }}
                      autoComplete="current-password"
                      aria-invalid={!!fe.password}
                    />
                    <button type="button" className="login-show-pwd"
                      onClick={() => setShowPwd(v => !v)}
                      aria-label={showPwd ? 'Hide password' : 'Show password'}>
                      <EyeIcon visible={showPwd} />
                    </button>
                  </div>
                  {fe.password && <p className="login-field-error" role="alert">{fe.password}</p>}
                </div>

                {error && <p className="login-error" role="alert">{error}</p>}

                <button type="submit" className="login-submit" disabled={loading} aria-busy={loading}>
                  {loading
                    ? <span className="login-spinner" aria-hidden="true" />
                    : <> Sign in as {role === 'admin' ? 'Admin' : 'Guest'} <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg> </>
                  }
                </button>
              </form>

              {/* Demo quick-fill */}
              <div className="login-divider"><span>Quick demo access</span></div>
              <div className="login-demos">
                {demos.map(d => (
                  <button key={d.email} className="login-demo-btn" type="button" onClick={() => fillDemo(d.email, d.password)}>
                    <span className="login-demo-name">{d.name}</span>
                    <span className="login-demo-email">{d.email}</span>
                  </button>
                ))}
              </div>

              {/* Switch to sign up */}
              <p className="login-register">
                No account?{' '}
                <button type="button" className="login-register-link" onClick={() => switchMode('signup')}>
                  Create one free
                </button>
              </p>
            </>
          )}

          {/* ════════════════════════════════
                  SIGN UP FORM
              ════════════════════════════════ */}
          {mode === 'signup' && (
            <>
              {successMsg && (
                <div className="login-success" role="status">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--green)" aria-hidden="true">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  {successMsg}
                </div>
              )}

              <form className="login-form" onSubmit={handleSignup} noValidate>

                {/* Full name */}
                <div className="login-field">
                  <label htmlFor="su-name">Full name</label>
                  <input
                    id="su-name" type="text"
                    placeholder="e.g. Lerato Khumalo"
                    value={username}
                    onChange={e => { setUsername(e.target.value); setFieldErrors(f => ({...f, username: ''})) }}
                    autoComplete="name"
                    aria-invalid={!!fe.username}
                    aria-describedby={fe.username ? 'su-name-err' : undefined}
                  />
                  {fe.username && <p className="login-field-error" id="su-name-err" role="alert">{fe.username}</p>}
                </div>

                {/* Email */}
                <div className="login-field">
                  <label htmlFor="su-email">Email address</label>
                  <input
                    id="su-email" type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setFieldErrors(f => ({...f, email: ''})) }}
                    autoComplete="email"
                    aria-invalid={!!fe.email}
                    aria-describedby={fe.email ? 'su-email-err' : undefined}
                  />
                  {fe.email && <p className="login-field-error" id="su-email-err" role="alert">{fe.email}</p>}
                </div>

                {/* Password */}
                <div className="login-field">
                  <label htmlFor="su-password">Password</label>
                  <div className="login-pwd-wrap">
                    <input
                      id="su-password" type={showPwd ? 'text' : 'password'}
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={e => { setPassword(e.target.value); setFieldErrors(f => ({...f, password: ''})) }}
                      autoComplete="new-password"
                      aria-invalid={!!fe.password}
                    />
                    <button type="button" className="login-show-pwd"
                      onClick={() => setShowPwd(v => !v)}
                      aria-label={showPwd ? 'Hide password' : 'Show password'}>
                      <EyeIcon visible={showPwd} />
                    </button>
                  </div>
                  {/* Strength indicator */}
                  {password.length > 0 && (
                    <div className="pwd-strength">
                      <div
                        className={`pwd-strength-bar ${password.length < 6 ? 'weak' : password.length < 10 ? 'medium' : 'strong'}`}
                        style={{ width: `${Math.min(100, (password.length / 12) * 100)}%` }}
                      />
                      <span className="pwd-strength-label">
                        {password.length < 6 ? 'Too short' : password.length < 10 ? 'Good' : 'Strong'}
                      </span>
                    </div>
                  )}
                  {fe.password && <p className="login-field-error" role="alert">{fe.password}</p>}
                </div>

                {/* Confirm password */}
                <div className="login-field">
                  <label htmlFor="su-confirm">Confirm password</label>
                  <div className="login-pwd-wrap">
                    <input
                      id="su-confirm" type={showConfirm ? 'text' : 'password'}
                      placeholder="Repeat your password"
                      value={confirmPwd}
                      onChange={e => { setConfirmPwd(e.target.value); setFieldErrors(f => ({...f, confirmPwd: ''})) }}
                      autoComplete="new-password"
                      aria-invalid={!!fe.confirmPwd}
                    />
                    <button type="button" className="login-show-pwd"
                      onClick={() => setShowConfirm(v => !v)}
                      aria-label={showConfirm ? 'Hide password' : 'Show password'}>
                      <EyeIcon visible={showConfirm} />
                    </button>
                  </div>
                  {/* Match indicator */}
                  {confirmPwd.length > 0 && (
                    <p style={{
                      fontSize: '.78rem', marginTop: '.3rem',
                      color: confirmPwd === password ? 'var(--green)' : '#e55',
                    }}>
                      {confirmPwd === password ? 'Passwords match' : 'Passwords do not match'}
                    </p>
                  )}
                  {fe.confirmPwd && <p className="login-field-error" role="alert">{fe.confirmPwd}</p>}
                </div>

                {error && <p className="login-error" role="alert">{error}</p>}

                <button type="submit" className="login-submit" disabled={loading} aria-busy={loading}>
                  {loading
                    ? <span className="login-spinner" aria-hidden="true" />
                    : <> Create account <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg> </>
                  }
                </button>

                <p style={{ fontSize: '.78rem', color: 'var(--text-dim)', textAlign: 'center', marginTop: '.25rem' }}>
                  By signing up you agree to our Terms and Privacy Policy.
                </p>
              </form>

              {/* Switch to sign in */}
              <p className="login-register">
                Already have an account?{' '}
                <button type="button" className="login-register-link" onClick={() => switchMode('login')}>
                  Sign in
                </button>
              </p>
            </>
          )}

          {/* Back to site */}
          <button type="button" className="login-back-home" onClick={() => navigate('/')}>
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
