const express = require('express')
const router  = express.Router()
const {
  createReservation,
  getReservationsByUser,
  getReservationsByHost,
  getAllReservations,
  deleteReservation,
} = require('../controllers/reservationController')
const { protect, restrictTo } = require('../middleware/auth')

// All reservation routes require login
router.use(protect)

router.post('/',          createReservation)
router.get('/user',       getReservationsByUser)
router.get('/host',       getReservationsByHost)
router.get('/',           restrictTo('admin'), getAllReservations)
router.delete('/:id',     deleteReservation)

module.exports = router
