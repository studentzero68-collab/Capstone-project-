/**
 * accommodationController.js
 * CRUD for property listings
 */
const Accommodation = require('../models/Accommodation')

// ── GET /api/accommodations ──────────────────────────────────────
const getAllAccommodations = async (req, res) => {
  try {
    const { type, minPrice, maxPrice, guests, search } = req.query
    const filter = {}

    if (type)     filter.type = type
    if (guests)   filter.guests = { $gte: Number(guests) }
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }
    if (search) {
      filter.$or = [
        { title:    { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ]
    }

    const accommodations = await Accommodation.find(filter)
      .populate('host', 'username email')
      .sort({ createdAt: -1 })

    res.json({ success: true, count: accommodations.length, accommodations })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── GET /api/accommodations/:id ──────────────────────────────────
const getAccommodationById = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id)
      .populate('host', 'username email')

    if (!accommodation) {
      return res.status(404).json({ success: false, message: 'Accommodation not found' })
    }
    res.json({ success: true, accommodation })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── POST /api/accommodations  (protected: host/admin) ───────────
const createAccommodation = async (req, res) => {
  try {
    const {
      title, location, description, type,
      guests, bedrooms, bathrooms, price,
      weeklyDiscount, cleaningFee, serviceFee, occupancyTaxes,
      amenities, images,
      enhancedCleaning, selfCheckIn,
    } = req.body

    if (!title || !location || !description || !type || !price) {
      return res.status(400).json({ success: false, message: 'Required fields missing' })
    }

    // Handle uploaded images from multer (optional)
    const uploadedImages = req.files
      ? req.files.map(f => `/uploads/${f.filename}`)
      : []
    const allImages = [
      ...(Array.isArray(images) ? images : images ? [images] : []),
      ...uploadedImages,
    ]

    const accommodation = await Accommodation.create({
      title, location, description, type,
      guests:         Number(guests)         || 1,
      bedrooms:       Number(bedrooms)       || 1,
      bathrooms:      Number(bathrooms)      || 1,
      price:          Number(price),
      weeklyDiscount: Number(weeklyDiscount) || 0,
      cleaningFee:    Number(cleaningFee)    || 0,
      serviceFee:     Number(serviceFee)     || 0,
      occupancyTaxes: Number(occupancyTaxes) || 0,
      amenities:      Array.isArray(amenities) ? amenities : amenities ? [amenities] : [],
      images:         allImages,
      enhancedCleaning: Boolean(enhancedCleaning),
      selfCheckIn:      Boolean(selfCheckIn),
      host:           req.user._id,
    })

    res.status(201).json({ success: true, accommodation })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── PUT /api/accommodations/:id  (protected: host/admin) ────────
const updateAccommodation = async (req, res) => {
  try {
    let accommodation = await Accommodation.findById(req.params.id)
    if (!accommodation) {
      return res.status(404).json({ success: false, message: 'Accommodation not found' })
    }

    // Only the host or an admin can update
    if (
      accommodation.host.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ success: false, message: 'Not authorised to update this listing' })
    }

    // Handle newly uploaded images
    const uploadedImages = req.files
      ? req.files.map(f => `/uploads/${f.filename}`)
      : []
    if (uploadedImages.length) {
      req.body.images = [...(req.body.images || accommodation.images), ...uploadedImages]
    }

    accommodation = await Accommodation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('host', 'username email')

    res.json({ success: true, accommodation })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── DELETE /api/accommodations/:id  (protected: host/admin) ─────
const deleteAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id)
    if (!accommodation) {
      return res.status(404).json({ success: false, message: 'Accommodation not found' })
    }

    if (
      accommodation.host.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ success: false, message: 'Not authorised to delete this listing' })
    }

    await accommodation.deleteOne()
    res.json({ success: true, message: 'Accommodation deleted successfully' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = {
  getAllAccommodations,
  getAccommodationById,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
}
