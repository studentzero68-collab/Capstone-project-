const express = require('express')
const router  = express.Router()
const { registerUser, loginUser, getMe, getAllUsers } = require('../controllers/userController')
const { protect, restrictTo } = require('../middleware/auth')

// Public
router.post('/register', registerUser)
router.post('/login',    loginUser)

// Protected
router.get('/me',    protect, getMe)
router.get('/',      protect, restrictTo('admin'), getAllUsers)

module.exports = router
