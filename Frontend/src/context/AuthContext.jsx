import { createContext, useContext, useState } from 'react'
import { apiLogin, apiRegister, apiLogout } from '../services/api'

const AuthContext = createContext(null)

// ── Demo credentials (exported for use in LoginPage) ──────────────
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

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('zero_user') || 'null')
    } catch { return null }
  })

  /**
   * Login — tries real backend first, falls back to demo credentials
   * so the app works even without MongoDB running.
   */
  const login = async (email, password, role) => {
    // ── Demo fallback (works offline) ────────────────────────────
    const list = DEMO_USERS[role] || []
    const demo = list.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (demo) {
      const userData = { ...demo, id: demo.email }
      setUser(userData)
      localStorage.setItem('zero_user', JSON.stringify(userData))
      return { ok: true, user: userData }
    }

    // ── Real backend ─────────────────────────────────────────────
    try {
      const data = await apiLogin(email, password)
      if (data.success) {
        const userData = {
          id:   data.user.id,
          name: data.user.username,
          email: data.user.email,
          role: data.user.role === 'admin' || data.user.role === 'host' ? 'admin' : 'guest',
          backendRole: data.user.role,
        }
        setUser(userData)
        localStorage.setItem('zero_user', JSON.stringify(userData))
        return { ok: true, user: userData }
      }
      return { ok: false, error: data.message || 'Login failed' }
    } catch (err) {
      return { ok: false, error: err.message || 'Could not connect to server' }
    }
  }

  const register = async (username, email, password, role = 'user') => {
    try {
      const data = await apiRegister(username, email, password, role)
      if (data.success) {
        const userData = {
          id:    data.user.id,
          name:  data.user.username,
          email: data.user.email,
          role:  data.user.role === 'admin' || data.user.role === 'host' ? 'admin' : 'guest',
          backendRole: data.user.role,
        }
        setUser(userData)
        localStorage.setItem('zero_user', JSON.stringify(userData))
        return { ok: true, user: userData }
      }
      return { ok: false, error: data.message }
    } catch (err) {
      return { ok: false, error: err.message }
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
