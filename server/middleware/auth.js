/**
 * auth.js — JWT authentication middleware
 * Protects routes by verifying Bearer tokens
 */
const jwt  = require('jsonwebtoken')
const User = require('../models/User')

// Verify JWT and attach user to req
const protect = async (req, res, next) => {
  let token

  // Extract token from Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorised — no token provided',
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorised — user not found',
      })
    }

    next()
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Not authorised — invalid or expired token',
    })
  }
}

// Restrict to specific roles
const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: `Access denied — role '${req.user.role}' is not permitted`,
    })
  }
  next()
}

module.exports = { protect, restrictTo }
