/**
 * Zero Airbnb Clone — Express Server
 * Entry point: connects to MongoDB, mounts all routes
 */
require('dotenv').config()
const express    = require('express')
const mongoose   = require('mongoose')
const cors       = require('cors')
const path       = require('path')

// Route imports
const userRoutes          = require('./routes/userRoutes')
const accommodationRoutes = require('./routes/accommodationRoutes')
const reservationRoutes   = require('./routes/reservationRoutes')

const app  = express()
const PORT = process.env.PORT || 5000

// ── Middleware ──────────────────────────────────────────────────
// CORS: allow localhost in dev, and the FRONTEND_URL env var in production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL, // set this on Render to your frontend URL
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, curl)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error(`CORS blocked: ${origin}`))
  },
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// ── Routes ─────────────────────────────────────────────────────
app.use('/api/users',          userRoutes)
app.use('/api/accommodations', accommodationRoutes)
app.use('/api/reservations',   reservationRoutes)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Zero API is running', timestamp: new Date() })
})

// Serve the built React app when frontend and backend share one deployment.
const frontendDist = path.join(__dirname, '..', 'Frontend', 'dist')
app.use(express.static(frontendDist))
app.get('*', (_req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'))
})

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// Global error handler
app.use((err, _req, res, _next) => {
  console.error('Server error:', err.message)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  })
})

// ── Database + Server start ─────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Zero API running on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  })

module.exports = app
