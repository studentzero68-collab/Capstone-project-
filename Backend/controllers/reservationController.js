/**
 * reservationController.js
 * Create, read, and delete reservations
 */
const Reservation     = require('../models/Reservation')
const Accommodation   = require('../models/Accommodation')

// ── POST /api/reservations ───────────────────────────────────────
const createReservation = async (req, res) => {
  try {
    const {
      accommodationId, checkin, checkout, guests,
      basePrice, weeklyDiscount, cleaningFee, serviceFee, occupancyTaxes, total,
    } = req.body

    if (!accommodationId || !checkin || !checkout) {
      return res.status(400).json({ success: false, message: 'accommodationId, checkin and checkout are required' })
    }

    const accommodation = await Accommodation.findById(accommodationId)
    if (!accommodation) {
      return res.status(404).json({ success: false, message: 'Accommodation not found' })
    }

    const reservation = await Reservation.create({
      accommodation: accommodationId,
      user:          req.user._id,
      host:          accommodation.host,
      checkin:       new Date(checkin),
      checkout:      new Date(checkout),
      guests:        Number(guests) || 1,
      basePrice:     Number(basePrice)      || 0,
      weeklyDiscount:Number(weeklyDiscount) || 0,
      cleaningFee:   Number(cleaningFee)    || 0,
      serviceFee:    Number(serviceFee)     || 0,
      occupancyTaxes:Number(occupancyTaxes) || 0,
      total:         Number(total)          || 0,
    })

    await reservation.populate([
      { path: 'accommodation', select: 'title location images price' },
      { path: 'user',          select: 'username email' },
    ])

    res.status(201).json({ success: true, reservation })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── GET /api/reservations/user  (my bookings) ───────────────────
const getReservationsByUser = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id })
      .populate('accommodation', 'title location images price type')
      .sort({ createdAt: -1 })
    res.json({ success: true, count: reservations.length, reservations })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── GET /api/reservations/host  (bookings for my properties) ────
const getReservationsByHost = async (req, res) => {
  try {
    const reservations = await Reservation.find({ host: req.user._id })
      .populate('accommodation', 'title location images price')
      .populate('user', 'username email')
      .sort({ createdAt: -1 })
    res.json({ success: true, count: reservations.length, reservations })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── GET /api/reservations  (admin — all reservations) ───────────
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('accommodation', 'title location price')
      .populate('user',          'username email')
      .sort({ createdAt: -1 })
    res.json({ success: true, count: reservations.length, reservations })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── DELETE /api/reservations/:id ────────────────────────────────
const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' })
    }

    const isOwner = reservation.user.toString() === req.user._id.toString()
    const isAdmin = req.user.role === 'admin'
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorised to cancel this reservation' })
    }

    const checkinDate = reservation.checkin.toISOString().slice(0, 10)
    const todayDate = new Date().toISOString().slice(0, 10)
    if (!isAdmin && checkinDate <= todayDate) {
      return res.status(400).json({
        success: false,
        message: 'Reservations cannot be cancelled on or after the check-in date',
      })
    }

    await reservation.deleteOne()
    res.json({ success: true, message: 'Reservation cancelled successfully' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = {
  createReservation,
  getReservationsByUser,
  getReservationsByHost,
  getAllReservations,
  deleteReservation,
}
