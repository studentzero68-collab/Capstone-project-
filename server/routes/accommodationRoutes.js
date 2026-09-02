const express = require('express')
const router  = express.Router()
const multer  = require('multer')
const path    = require('path')
const fs      = require('fs')

const {
  getAllAccommodations,
  getAccommodationById,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
} = require('../controllers/accommodationController')
const { protect, restrictTo } = require('../middleware/auth')

// Multer config — save to server/uploads/
const uploadsDir = path.join(__dirname, '..', 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename:    (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`)
  },
})
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/
    const ok = allowed.test(path.extname(file.originalname).toLowerCase()) &&
               allowed.test(file.mimetype)
    if (ok) return cb(null, true)
    cb(new Error('Only JPEG, PNG and WebP images are allowed'))
  },
})

// Public
router.get('/',    getAllAccommodations)
router.get('/:id', getAccommodationById)

// Protected — host or admin only
router.post(
  '/',
  protect,
  restrictTo('host', 'admin'),
  upload.array('images', 10),
  createAccommodation
)
router.put(
  '/:id',
  protect,
  restrictTo('host', 'admin'),
  upload.array('images', 10),
  updateAccommodation
)
router.delete(
  '/:id',
  protect,
  restrictTo('host', 'admin'),
  deleteAccommodation
)

module.exports = router
