/**
 * userController.js
 * Handles user registration, login, and profile
 */
const jwt  = require('jsonwebtoken')
const User = require('../models/User')

// Generate a signed JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })

// ── POST /api/users/register ─────────────────────────────────────
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const exists = await User.findOne({ email: normalizedEmail })
    if (exists) {
      return res.status(409).json({ success: false, message: 'Email already registered' })
    }

    const user = await User.create({
      username,
      email: normalizedEmail,
      password,
      role: role || 'user',
    })

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id:       user._id,
        username: user.username,
        email:    user.email,
        role:     user.role,
      },
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── POST /api/users/login ────────────────────────────────────────
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' })
    }

    // Explicitly select password (schema hides it by default)
    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        id:       user._id,
        username: user.username,
        email:    user.email,
        role:     user.role,
      },
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── GET /api/users/me  (protected) ──────────────────────────────
const getMe = async (req, res) => {
  res.json({ success: true, user: req.user })
}

// ── GET /api/users  (admin only) ────────────────────────────────
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json({ success: true, count: users.length, users })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { registerUser, loginUser, getMe, getAllUsers }
