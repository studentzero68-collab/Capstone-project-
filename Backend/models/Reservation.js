const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema(
  {
    accommodation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Accommodation',
      required: [true, 'Accommodation is required'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Host is required'],
    },
    checkin: {
      type: Date,
      required: [true, 'Check-in date is required'],
    },
    checkout: {
      type: Date,
      required: [true, 'Check-out date is required'],
    },
    guests: {
      type: Number,
      required: [true, 'Guest count is required'],
      min: [1, 'Must have at least 1 guest'],
    },
    // Cost breakdown snapshot at booking time
    basePrice:      { type: Number, required: true },
    weeklyDiscount: { type: Number, default: 0 },
    cleaningFee:    { type: Number, default: 0 },
    serviceFee:     { type: Number, default: 0 },
    occupancyTaxes: { type: Number, default: 0 },
    total:          { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'confirmed',
    },
  },
  { timestamps: true }
)

// Validate checkout is after checkin
reservationSchema.pre('save', function (next) {
  if (this.checkout <= this.checkin) {
    return next(new Error('Check-out date must be after check-in date'))
  }
  next()
})

module.exports = mongoose.model('Reservation', reservationSchema)
