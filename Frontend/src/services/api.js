/**
 * api.js — Central API service layer
 * All calls to the Node/Express backend go through here.
 * Base URL: http://localhost:5000/api
 */

const BASE = 'http://localhost:5000/api'

// ── Helpers ──────────────────────────────────────────────────────

/** Get stored JWT token */
const getToken = () => localStorage.getItem('zero_token')

/** Default headers with optional auth */
const headers = (auth = false, json = true) => {
  const h = {}
  if (json) h['Content-Type'] = 'application/json'
  if (auth) {
    const token = getToken()
    if (token) h['Authorization'] = `Bearer ${token}`
  }
  return h
}

/** Throw readable error from response */
const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`)
  return data
}

// ── Auth ─────────────────────────────────────────────────────────

export const apiLogin = async (email, password) => {
  const res = await fetch(`${BASE}/users/login`, {
    method:  'POST',
    headers: headers(false),
    body:    JSON.stringify({ email, password }),
  })
  const data = await handleResponse(res)
  if (data.token) localStorage.setItem('zero_token', data.token)
  return data
}

export const apiRegister = async (username, email, password, role = 'user') => {
  const res = await fetch(`${BASE}/users/register`, {
    method:  'POST',
    headers: headers(false),
    body:    JSON.stringify({ username, email, password, role }),
  })
  const data = await handleResponse(res)
  if (data.token) localStorage.setItem('zero_token', data.token)
  return data
}

export const apiGetMe = async () => {
  const res = await fetch(`${BASE}/users/me`, { headers: headers(true) })
  return handleResponse(res)
}

export const apiLogout = () => {
  localStorage.removeItem('zero_token')
  localStorage.removeItem('zero_user')
}

// ── Accommodations ───────────────────────────────────────────────

export const apiGetAccommodations = async (params = {}) => {
  const qs = new URLSearchParams(params).toString()
  const res = await fetch(`${BASE}/accommodations${qs ? '?' + qs : ''}`)
  return handleResponse(res)
}

export const apiGetAccommodation = async (id) => {
  const res = await fetch(`${BASE}/accommodations/${id}`)
  return handleResponse(res)
}

export const apiCreateAccommodation = async (formData) => {
  // formData is a FormData object (supports file uploads)
  const res = await fetch(`${BASE}/accommodations`, {
    method:  'POST',
    headers: { Authorization: `Bearer ${getToken()}` }, // no Content-Type — browser sets multipart
    body:    formData,
  })
  return handleResponse(res)
}

export const apiUpdateAccommodation = async (id, formData) => {
  const res = await fetch(`${BASE}/accommodations/${id}`, {
    method:  'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    body:    formData,
  })
  return handleResponse(res)
}

export const apiDeleteAccommodation = async (id) => {
  const res = await fetch(`${BASE}/accommodations/${id}`, {
    method:  'DELETE',
    headers: headers(true),
  })
  return handleResponse(res)
}

// ── Reservations ─────────────────────────────────────────────────

export const apiCreateReservation = async (payload) => {
  const res = await fetch(`${BASE}/reservations`, {
    method:  'POST',
    headers: headers(true),
    body:    JSON.stringify(payload),
  })
  return handleResponse(res)
}

export const apiGetMyReservations = async () => {
  const res = await fetch(`${BASE}/reservations/user`, { headers: headers(true) })
  return handleResponse(res)
}

export const apiGetHostReservations = async () => {
  const res = await fetch(`${BASE}/reservations/host`, { headers: headers(true) })
  return handleResponse(res)
}

export const apiGetAllReservations = async () => {
  const res = await fetch(`${BASE}/reservations`, { headers: headers(true) })
  return handleResponse(res)
}

export const apiDeleteReservation = async (id) => {
  const res = await fetch(`${BASE}/reservations/${id}`, {
    method:  'DELETE',
    headers: headers(true),
  })
  return handleResponse(res)
}

const localReservationsKey = (user) => `zero_reservations_${user?.id || user?.email || 'guest'}`

export const getLocalReservations = (user) => {
  try {
    return JSON.parse(localStorage.getItem(localReservationsKey(user)) || '[]')
  } catch {
    return []
  }
}

export const saveLocalReservation = (user, reservation) => {
  const reservations = [reservation, ...getLocalReservations(user)]
  localStorage.setItem(localReservationsKey(user), JSON.stringify(reservations))
  window.dispatchEvent(new CustomEvent('zero:reservation-created'))
}
