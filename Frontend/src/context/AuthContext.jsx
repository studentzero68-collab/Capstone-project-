import { createContext, useContext, useState } from 'react'
import { apiLogin, apiRegister, apiLogout, syncOfflineReservations } from '../services/api'

const AuthContext = createContext(null)

// ── Built-in demo credentials ──────────────────────────────────────
export const DEMO_USERS = {
  guest: [
    { email: 'guest@zero.com',  password: 'guest123',  name: 'Alex Mokoena',   role: 'guest' },
    { email: 'lerato@zero.com', password: 'lerato123', name: 'Lerato Khumalo', role: 'guest' },
  ],
  admin: [
    { email: 'admin@zero.com', password: 'admin123', name: 'Zero Admin',   role: 'admin' },
    { email: 'host@zero.com',  password: 'host123',  name: 'Host Manager', role: 'admin' },
  ],
}

// ── LocalStorage helpers for offline-registered users ─────────────
// When someone signs up and the backend is offline, we can't save them
// to MongoDB. Instead we save a lightweight record in localStorage so
// they can still log back in on the same browser.
const LOCAL_USERS_KEY = 'zero_local_users'

const getLocalUsers = () => {
  try { return JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]') }
  catch { return [] }
}

const saveLocalUser = (userData, password) => {
  const existing = getLocalUsers().filter(u => u.email !== userData.email)
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify([
    ...existing,
    { ...userData, _password: password }, // store password only locally
  ]))
}

const findLocalUser = (email, password) => {
  const users = getLocalUsers()
  return users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u._password === password
  ) || null
}

// ── Human-readable error messages ─────────────────────────────────
const friendlyError = (err) => {
  const msg = (err?.message || '').toLowerCase()
  if (msg.includes('failed to fetch') || msg.includes('networkerror') || msg.includes('load failed')) {
    return 'Cannot reach the server. Make sure the backend is running (cd Backend && npm run dev).'
  }
  if (msg.includes('invalid email or password') || msg.includes('invalid credentials')) {
    return 'Incorrect email or password. Please try again.'
  }
  if (msg.includes('email already')) {
    return 'That email is already registered. Try signing in instead.'
  }
  if (msg.includes('jwt') || msg.includes('token')) {
    return 'Your session expired. Please sign in again.'
  }
  return err?.message || 'Something went wrong. Please try again.'
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('zero_user') || 'null') }
    catch { return null }
  })

  const persistUser = (userData) => {
    setUser(userData)
    localStorage.setItem('zero_user', JSON.stringify(userData))
  }

  // ── LOGIN ──────────────────────────────────────────────────────
  // Priority order:
  //  1. Demo credentials (always works, no backend needed)
  //  2. Locally-stored users (signed up while backend was offline)
  //  3. Real MongoDB backend via /api/users/login
  const login = async (email, password, role) => {
    // 1. Demo users
    const allDemos = [...DEMO_USERS.guest, ...DEMO_USERS.admin]
    const demo = allDemos.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (demo) {
      const userData = { ...demo, id: demo.email }
      persistUser(userData)
      return { ok: true, user: userData }
    }

    // 2. Locally stored users (offline fallback)
    const local = findLocalUser(email, password)
    if (local) {
      const { _password, ...userData } = local // strip the stored password
      persistUser(userData)
      return { ok: true, user: userData }
    }

    // 3. Real backend
    try {
      const data = await apiLogin(email, password)
      if (data.success) {
        const userData = {
          id:          data.user.id,
          name:        data.user.username,
          email:       data.user.email,
          role:        data.user.role === 'admin' || data.user.role === 'host' ? 'admin' : 'guest',
          backendRole: data.user.role,
        }
        persistUser(userData)
        await syncOfflineReservations()
        return { ok: true, user: userData }
      }
      return { ok: false, error: data.message || 'Login failed.' }
    } catch (err) {
      // Backend is down — give a clear message
      return { ok: false, error: friendlyError(err) }
    }
  }

  // ── REGISTER ───────────────────────────────────────────────────
  // Tries to save to MongoDB. If the backend is down, saves locally
  // so the user can still log in on this browser.
  const register = async (username, email, password, role = 'user') => {
    // Check for duplicate in local users first
    const existingLocal = getLocalUsers().find(
      u => u.email.toLowerCase() === email.toLowerCase()
    )
    if (existingLocal) {
      return { ok: false, error: 'That email is already registered. Try signing in instead.' }
    }

    // Try real backend
    try {
      const data = await apiRegister(username, email, password, role)
      if (data.success) {
        const userData = {
          id:          data.user.id,
          name:        data.user.username,
          email:       data.user.email,
          role:        data.user.role === 'admin' || data.user.role === 'host' ? 'admin' : 'guest',
          backendRole: data.user.role,
        }
        // Also save locally so login works even if backend goes offline later
        saveLocalUser(userData, password)
        persistUser(userData)
        await syncOfflineReservations()
        return { ok: true, user: userData }
      }
      return { ok: false, error: friendlyError({ message: data.message }) }
    } catch (err) {
      const errorMessage = (err?.message || '').toLowerCase()
      const isUnavailable = errorMessage.includes('failed to fetch') ||
                errorMessage.includes('load failed') ||
                errorMessage.includes('networkerror') ||
                err?.status >= 500

      if (isUnavailable) {
        // Backend offline — save locally so they can use the app right now
        const userData = {
          id:    `local_${Date.now()}`,
          name:  username,
          email: email.toLowerCase(),
          role:  'guest',
          backendRole: 'user',
          isLocalOnly: true, // flag so we know to sync when backend comes back
        }
        saveLocalUser(userData, password)
        persistUser(userData)
        return {
          ok: true,
          user: userData,
          warning: 'Account saved locally (backend offline). It will sync when the server is running.',
        }
      }

      return { ok: false, error: friendlyError(err) }
    }
  }

  const logout = () => {
    apiLogout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
