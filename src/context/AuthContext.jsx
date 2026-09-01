import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// Demo credentials
export const DEMO_USERS = {
  guest: [
    { email: 'guest@zero.com',   password: 'guest123',  name: 'Alex Mokoena',  role: 'guest'  },
    { email: 'lerato@zero.com',  password: 'lerato123', name: 'Lerato Khumalo', role: 'guest' },
  ],
  admin: [
    { email: 'admin@zero.com',   password: 'admin123',  name: 'Zero Admin',    role: 'admin'  },
    { email: 'host@zero.com',    password: 'host123',   name: 'Host Manager',  role: 'admin'  },
  ],
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('zero_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const login = (email, password, role) => {
    const list = role === 'admin' ? DEMO_USERS.admin : DEMO_USERS.guest
    const found = list.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (found) {
      setUser(found)
      localStorage.setItem('zero_user', JSON.stringify(found))
      return { ok: true, user: found }
    }
    return { ok: false, error: 'Invalid email or password.' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('zero_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
