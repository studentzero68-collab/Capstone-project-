const mongoose = require('mongoose')

const accommodationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    type: {
      type: String,
      required: [true, 'Type is required'],
      enum: ['treehouse', 'beach', 'garage', 'baker', 'musician', 'gamer', 'japanese', 'korean', 'southafrican'],
    },
    guests: {
      type: Number,
      required: [true, 'Guest count is required'],
      min: [1, 'Must allow at least 1 guest'],
    },
    bedrooms: {
      type: Number,
      required: [true, 'Bedroom count is required'],
      min: [0, 'Bedrooms cannot be negative'],
    },
    bathrooms: {
      type: Number,
      required: [true, 'Bathroom count is required'],
      min: [0, 'Bathrooms cannot be negative'],
    },
    price: {
      type: Number,
      required: [true, 'Price per night is required'],
      min: [0, 'Price cannot be negative'],
    },
    weeklyDiscount: { type: Number, default: 0, min: 0, max: 100 },
    cleaningFee:    { type: Number, default: 0, min: 0 },
    serviceFee:     { type: Number, default: 0, min: 0 },
    occupancyTaxes: { type: Number, default: 0, min: 0 },
    amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String], // URL strings or upload paths
      default: [],
    },
    rating:  { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0, min: 0 },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    enhancedCleaning: { type: Boolean, default: false },
    selfCheckIn:      { type: Boolean, default: false },
    specificRatings: {
      cleanliness:   { type: Number, default: 0 },
      communication: { type: Number, default: 0 },
      checkIn:       { type: Number, default: 0 },
      accuracy:      { type: Number, default: 0 },
      location:      { type: Number, default: 0 },
      value:         { type: Number, default: 0 },
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Accommodation', accommodationSchema)
