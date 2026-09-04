/**
 * seed.js — Seeds users AND all 18 accommodations into MongoDB Atlas
 * Run once:  node seed.js
 * Safe to re-run — upserts rather than duplicating
 */
require('dotenv').config()
const mongoose      = require('mongoose')
const User          = require('./models/User')
const Accommodation = require('./models/Accommodation')

// ── Image URLs (Unsplash, free to use) ───────────────────────────
const T1  = 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80'
const T2  = 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80'
const T3  = 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80'
const T4  = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80'
const T5  = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80'

const B1  = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'
const B2  = 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&q=80'
const B3  = 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80'
const B4  = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80'
const B5  = 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=800&q=80'

const G1  = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
const G2  = 'https://images.unsplash.com/photo-1486304873000-235643847519?w=800&q=80'
const G3  = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
const G4  = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80'
const G5  = 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80'

const K1  = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80'
const K2  = 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80'
const K3  = 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=800&q=80'
const K4  = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=800&q=80'
const K5  = 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80'

const M1  = 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80'
const M2  = 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80'
const M3  = 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80'
const M4  = 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&q=80'
const M5  = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80'

const GR1 = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80'
const GR2 = 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80'
const GR3 = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80'
const GR4 = 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80'
const GR5 = 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&q=80'

const J1  = 'https://images.unsplash.com/photo-1545579133-99bb5ad189be?w=800&q=80'
const J2  = 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80'
const J3  = 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80'
const J4  = 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80'
const J5  = 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80'

const KR1 = 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=800&q=80'
const KR2 = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80'
const KR3 = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80'
const KR4 = 'https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?w=800&q=80'
const KR5 = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80'

const SA1 = 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80'
const SA2 = 'https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=800&q=80'
const SA3 = 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80'
const SA4 = 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80'
const SA5 = 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80'

// ── Users ────────────────────────────────────────────────────────
const USERS = [
  { username: 'Alex Mokoena',   email: 'guest@zero.com',  password: 'guest123',  role: 'user' },
  { username: 'Lerato Khumalo', email: 'lerato@zero.com', password: 'lerato123', role: 'user' },
  { username: 'Zero Admin',     email: 'admin@zero.com',  password: 'admin123',  role: 'admin' },
  { username: 'Host Manager',   email: 'host@zero.com',   password: 'host123',   role: 'host' },
]

// ── Accommodation seed data ───────────────────────────────────────
// host is filled in at runtime using the admin user's _id
const ACCOMMODATIONS = (hostId) => [
  // ── TREEHOUSES ──
  {
    title: 'The Canopy Nest',
    location: 'Knysna Forest, Western Cape',
    description: 'Nestled 9 metres above the forest floor in the heart of the Knysna Forest. Wake up to birdsong, sip your morning coffee on the private deck, and fall asleep to the sounds of the wild. Pure freedom — no crowds, no noise, just you and the trees.',
    type: 'treehouse', guests: 2, bedrooms: 1, bathrooms: 1, price: 1850,
    weeklyDiscount: 10, cleaningFee: 350, serviceFee: 200, occupancyTaxes: 150,
    amenities: ['WiFi', 'Kitchen', 'Parking', 'Outdoor shower', 'Fire pit', 'Deck'],
    images: [T1, T2, T3, T4, T5],
    rating: 4.97, reviews: 134,
    selfCheckIn: true, enhancedCleaning: true,
    specificRatings: { cleanliness: 5.0, communication: 5.0, checkIn: 4.9, accuracy: 4.9, location: 5.0, value: 4.8 },
    host: hostId,
  },
  {
    title: 'Sky Loft Hideaway',
    location: 'Magaliesberg, North West',
    description: 'A romantic treehouse loft with floor-to-ceiling windows and a private stargazing deck. No TV, no distractions — just you, your person, and the Magaliesberg mountains. Completely off-grid solar powered.',
    type: 'treehouse', guests: 2, bedrooms: 1, bathrooms: 1, price: 2100,
    weeklyDiscount: 10, cleaningFee: 350, serviceFee: 220, occupancyTaxes: 160,
    amenities: ['WiFi', 'Outdoor shower', 'Hammock', 'Fireplace', 'No TV by design', 'Stargazing deck'],
    images: [T2, T1, T3, T4, T5],
    rating: 4.91, reviews: 88,
    selfCheckIn: true, enhancedCleaning: true,
    specificRatings: { cleanliness: 4.9, communication: 5.0, checkIn: 4.8, accuracy: 4.9, location: 5.0, value: 4.7 },
    host: hostId,
  },

  // ── BEACH ──
  {
    title: 'Sunset Shack Muizenberg',
    location: 'Muizenberg, Cape Town',
    description: 'Steps from the most colourful beach huts in the country. Surf, swim, eat fish and chips on the promenade — then come back to this cosy 2-bed shack that feels like the ocean itself lives inside.',
    type: 'beach', guests: 4, bedrooms: 2, bathrooms: 1, price: 950,
    weeklyDiscount: 8, cleaningFee: 300, serviceFee: 110, occupancyTaxes: 90,
    amenities: ['WiFi', 'Kitchen', 'Beach gear', 'Outdoor shower', 'Surfboard rental', 'Braai area'],
    images: [B1, B2, B3, B4, B5],
    rating: 4.88, reviews: 201,
    selfCheckIn: false, enhancedCleaning: true,
    specificRatings: { cleanliness: 4.9, communication: 4.8, checkIn: 4.9, accuracy: 4.8, location: 5.0, value: 4.7 },
    host: hostId,
  },
  {
    title: 'Dune House Sodwana',
    location: 'Sodwana Bay, KwaZulu-Natal',
    description: 'Right next to the world-famous Sodwana diving spots. Three bedrooms, a private pool, and an outdoor kitchen built for big gatherings. The one you book for a legendary group trip or family reunion.',
    type: 'beach', guests: 6, bedrooms: 3, bathrooms: 2, price: 750,
    weeklyDiscount: 12, cleaningFee: 400, serviceFee: 95, occupancyTaxes: 80,
    amenities: ['WiFi', 'Full kitchen', 'Parking', 'Pool', 'Dive gear storage', 'Air conditioning'],
    images: [B2, B1, B3, B4, B5],
    rating: 4.79, reviews: 63,
    selfCheckIn: false, enhancedCleaning: false,
    specificRatings: { cleanliness: 4.8, communication: 4.7, checkIn: 4.8, accuracy: 4.7, location: 4.9, value: 4.8 },
    host: hostId,
  },

  // ── GARAGE ──
  {
    title: 'The Workshop Loft',
    location: 'Maboneng, Johannesburg',
    description: "A converted industrial workshop in the heart of Maboneng. High ceilings, polished concrete floors, exposed brick — and space for 2 cars in your very own indoor bay. An architect's dream turned liveable masterpiece.",
    type: 'garage', guests: 3, bedrooms: 2, bathrooms: 1, price: 1100,
    weeklyDiscount: 8, cleaningFee: 350, serviceFee: 130, occupancyTaxes: 100,
    amenities: ['WiFi', 'Kitchen', 'Car bay (2 vehicles)', 'Workshop tools', 'Smart TV', 'Security'],
    images: [G1, G2, G3, G4, G5],
    rating: 4.85, reviews: 157,
    selfCheckIn: true, enhancedCleaning: true,
    specificRatings: { cleanliness: 4.9, communication: 4.8, checkIn: 5.0, accuracy: 4.8, location: 4.7, value: 4.7 },
    host: hostId,
  },
  {
    title: 'Steel & Timber Dwelling',
    location: 'Woodstock, Cape Town',
    description: "What used to be a commercial garage is now a stunning 2-storey live-work space. Rooftop deck with city mountain views, a chef's kitchen, and a 3-car secure garage with an EV charger.",
    type: 'garage', guests: 4, bedrooms: 2, bathrooms: 2, price: 1350,
    weeklyDiscount: 10, cleaningFee: 380, serviceFee: 160, occupancyTaxes: 120,
    amenities: ['WiFi', 'Full kitchen', '3-car garage', 'Rooftop deck', 'Smart home system', 'EV charger'],
    images: [G2, G1, G3, G4, G5],
    rating: 4.93, reviews: 94,
    selfCheckIn: true, enhancedCleaning: true,
    specificRatings: { cleanliness: 5.0, communication: 5.0, checkIn: 4.9, accuracy: 4.9, location: 4.8, value: 4.8 },
    host: hostId,
  },

  // ── BAKER ──
  {
    title: "The Flour & Flame Flat",
    location: 'Bree Street, Cape Town',
    description: "Designed by and for people who love to bake. A professional-grade kitchen with a proofing oven, stand mixer, and a full recipe library. Wake up, head to the nearby market, come back and bake your heart out.",
    type: 'baker', guests: 2, bedrooms: 1, bathrooms: 1, price: 880,
    weeklyDiscount: 7, cleaningFee: 300, serviceFee: 105, occupancyTaxes: 85,
    amenities: ['Professional kitchen', 'Stand mixer', 'Proofing oven', 'Recipe library', 'WiFi', 'Market basket on arrival'],
    images: [K1, K2, K3, K4, K5],
    rating: 4.82, reviews: 112,
    selfCheckIn: false, enhancedCleaning: true,
    specificRatings: { cleanliness: 4.9, communication: 4.8, checkIn: 4.8, accuracy: 4.8, location: 4.7, value: 4.7 },
    host: hostId,
  },
  {
    title: 'Sweet Home Melville',
    location: 'Melville, Johannesburg',
    description: 'A cosy Melville cottage with a dedicated baking station, warm Joburg sunshine, and a lush garden to enjoy your creations. Homey, relaxed, and built for the baker who wants to slow down and just create.',
    type: 'baker', guests: 2, bedrooms: 1, bathrooms: 1, price: 720,
    weeklyDiscount: 5, cleaningFee: 280, serviceFee: 90, occupancyTaxes: 70,
    amenities: ['Full kitchen', 'Baking station', 'WiFi', 'Garden access', 'Weekly farmers market nearby', 'Spice rack included'],
    images: [K2, K1, K3, K4, K5],
    rating: 4.76, reviews: 78,
    selfCheckIn: false, enhancedCleaning: false,
    specificRatings: { cleanliness: 4.8, communication: 4.7, checkIn: 4.8, accuracy: 4.7, location: 4.6, value: 4.8 },
    host: hostId,
  },

  // ── MUSICIAN ──
  {
    title: 'The Resonance Studio',
    location: 'Newtown, Johannesburg',
    description: "A fully soundproofed live-in studio in Newtown — Jozi's creative heartbeat. Record during the day, sleep in the loft above at night. A DAW workstation with industry software, an acoustic booth, and instruments waiting.",
    type: 'musician', guests: 2, bedrooms: 1, bathrooms: 1, price: 1600,
    weeklyDiscount: 10, cleaningFee: 350, serviceFee: 190, occupancyTaxes: 145,
    amenities: ['Soundproofed', 'Recording booth', 'DAW workstation', 'Acoustic treatment', 'WiFi', 'Keyboard & guitar provided'],
    images: [M1, M2, M3, M4, M5],
    rating: 4.95, reviews: 67,
    selfCheckIn: true, enhancedCleaning: true,
    specificRatings: { cleanliness: 5.0, communication: 5.0, checkIn: 4.9, accuracy: 5.0, location: 4.8, value: 4.9 },
    host: hostId,
  },
  {
    title: 'Salt River Sound Loft',
    location: 'Salt River, Cape Town',
    description: 'A warm industrial loft that doubles as a creative music space. Piano, drum pads, mixing board — everything you need to get into the zone. Rooftop access for when you need fresh air between sessions.',
    type: 'musician', guests: 2, bedrooms: 1, bathrooms: 1, price: 1250,
    weeklyDiscount: 8, cleaningFee: 320, serviceFee: 150, occupancyTaxes: 115,
    amenities: ['Soundproofed', 'Piano', 'Drum pad', 'Mixing board', 'WiFi', 'Rooftop access'],
    images: [M2, M1, M3, M4, M5],
    rating: 4.88, reviews: 43,
    selfCheckIn: true, enhancedCleaning: false,
    specificRatings: { cleanliness: 4.9, communication: 4.8, checkIn: 5.0, accuracy: 4.9, location: 4.7, value: 4.8 },
    host: hostId,
  },

  // ── GAMER ──
  {
    title: 'Level Up Bunker',
    location: 'Hatfield, Pretoria',
    description: "The ultimate gamer's den. Four 4K gaming setups, a PS5, Xbox Series X, a VR headset, and a 120-inch projector for big-screen moments. 1Gbps WiFi, a snack bar stocked on arrival, and blackout blinds.",
    type: 'gamer', guests: 4, bedrooms: 2, bathrooms: 1, price: 650,
    weeklyDiscount: 5, cleaningFee: 280, serviceFee: 80, occupancyTaxes: 65,
    amenities: ['4K gaming setups (x4)', 'PS5 & Xbox Series X', 'VR headset', '120" projector', 'WiFi 1Gbps', 'Mini fridge & snack bar'],
    images: [GR1, GR2, GR3, GR4, GR5],
    rating: 4.84, reviews: 189,
    selfCheckIn: true, enhancedCleaning: false,
    specificRatings: { cleanliness: 4.8, communication: 4.9, checkIn: 5.0, accuracy: 4.8, location: 4.6, value: 4.9 },
    host: hostId,
  },
  {
    title: 'Respawn Retreat',
    location: 'Fourways, Johannesburg',
    description: 'Built for the modern gamer and streamer. Three gaming PCs, a full streaming corner with ring light and professional mic, and smart RGB lighting you control. Create content, go live, or just grind.',
    type: 'gamer', guests: 3, bedrooms: 2, bathrooms: 1, price: 780,
    weeklyDiscount: 5, cleaningFee: 290, serviceFee: 95, occupancyTaxes: 75,
    amenities: ['3x Gaming PCs', 'Console corner', 'Streaming setup', 'Ring light & mic', 'WiFi 500Mbps', 'Smart lighting'],
    images: [GR2, GR1, GR3, GR4, GR5],
    rating: 4.79, reviews: 102,
    selfCheckIn: true, enhancedCleaning: false,
    specificRatings: { cleanliness: 4.8, communication: 4.8, checkIn: 4.9, accuracy: 4.7, location: 4.6, value: 4.8 },
    host: hostId,
  },

  // ── JAPANESE ──
  {
    title: 'Zen Garden Retreat',
    location: 'Franschhoek, Western Cape',
    description: 'A fully authentic Japanese-inspired retreat. Tatami floors, shoji screens, a private onsen (hot spring bath), and a hand-raked zen garden. Every detail sourced with care. Arrive stressed, leave transformed.',
    type: 'japanese', guests: 2, bedrooms: 1, bathrooms: 1, price: 2400,
    weeklyDiscount: 12, cleaningFee: 450, serviceFee: 280, occupancyTaxes: 210,
    amenities: ['Tatami room', 'Private onsen', 'Zen garden', 'Tea ceremony kit', 'WiFi', 'Shoji sliding doors'],
    images: [J1, J2, J3, J4, J5],
    rating: 4.98, reviews: 76,
    selfCheckIn: false, enhancedCleaning: true,
    specificRatings: { cleanliness: 5.0, communication: 5.0, checkIn: 5.0, accuracy: 5.0, location: 5.0, value: 4.9 },
    host: hostId,
  },
  {
    title: 'Sakura Studio',
    location: 'Gardens, Cape Town',
    description: 'A minimalist Cape Town studio infused with Japanese aesthetics. Futon bedding, a curated bonsai collection, a morning matcha station, and a Japanese-style breakfast on arrival.',
    type: 'japanese', guests: 2, bedrooms: 1, bathrooms: 1, price: 1400,
    weeklyDiscount: 8, cleaningFee: 320, serviceFee: 170, occupancyTaxes: 130,
    amenities: ['Futon bedding', 'Bonsai collection', 'Tea station', 'WiFi', 'Japanese breakfast provided', 'Minimalist design'],
    images: [J2, J1, J3, J4, J5],
    rating: 4.89, reviews: 55,
    selfCheckIn: true, enhancedCleaning: true,
    specificRatings: { cleanliness: 5.0, communication: 4.9, checkIn: 4.9, accuracy: 4.9, location: 4.8, value: 4.8 },
    host: hostId,
  },

  // ── KOREAN ──
  {
    title: 'Seoul Hanok Hideout',
    location: 'Braamfontein, Johannesburg',
    description: 'Inspired by traditional Korean hanok architecture. Ondol underfloor heating, a jjimjilbang-style relaxation room, a full Korean skincare station, and a K-drama lounge stocked with snacks and blankets.',
    type: 'korean', guests: 2, bedrooms: 1, bathrooms: 1, price: 1700,
    weeklyDiscount: 10, cleaningFee: 370, serviceFee: 200, occupancyTaxes: 155,
    amenities: ['Ondol floor heating', 'Jjimjilbang-style spa', 'Korean skincare station', 'WiFi', 'K-drama room', 'Korean breakfast'],
    images: [KR1, KR2, KR3, KR4, KR5],
    rating: 4.92, reviews: 48,
    selfCheckIn: false, enhancedCleaning: true,
    specificRatings: { cleanliness: 5.0, communication: 4.9, checkIn: 4.9, accuracy: 4.9, location: 4.8, value: 4.8 },
    host: hostId,
  },
  {
    title: 'Gangnam Style Flat',
    location: 'Sandton, Johannesburg',
    description: "Sleek, modern, and inspired by Seoul's glamorous Gangnam district. Smart toilet, a private karaoke room, OLED TV wall, and a K-food pantry stocked with everything from ramen to tteokbokki.",
    type: 'korean', guests: 2, bedrooms: 1, bathrooms: 1, price: 2000,
    weeklyDiscount: 10, cleaningFee: 400, serviceFee: 240, occupancyTaxes: 180,
    amenities: ['Smart toilet', 'Karaoke room', 'K-food pantry', 'WiFi', 'OLED TV wall', 'City views'],
    images: [KR2, KR1, KR3, KR4, KR5],
    rating: 4.85, reviews: 37,
    selfCheckIn: true, enhancedCleaning: true,
    specificRatings: { cleanliness: 4.9, communication: 4.9, checkIn: 4.8, accuracy: 4.9, location: 4.8, value: 4.7 },
    host: hostId,
  },

  // ── SOUTH AFRICAN ──
  {
    title: 'Ubuntu Lodge',
    location: 'Soweto, Johannesburg',
    description: 'A bold, colourful lodge celebrating the spirit of ubuntu. Township-style decor, a shebeen corner stocked with local craft beer, a braai pit for epic evenings, and a marimba corner. Township tour included on arrival.',
    type: 'southafrican', guests: 6, bedrooms: 3, bathrooms: 2, price: 600,
    weeklyDiscount: 10, cleaningFee: 420, serviceFee: 80, occupancyTaxes: 65,
    amenities: ['Braai pit', 'Township tour included', 'Shebeen corner', 'WiFi', 'African art collection', 'Marimba corner'],
    images: [SA1, SA2, SA3, SA4, SA5],
    rating: 4.97, reviews: 223,
    selfCheckIn: false, enhancedCleaning: true,
    specificRatings: { cleanliness: 5.0, communication: 5.0, checkIn: 5.0, accuracy: 5.0, location: 4.9, value: 5.0 },
    host: hostId,
  },
  {
    title: 'Karoo Farmstay',
    location: 'Matjiesfontein, Northern Cape',
    description: "A sprawling Karoo farmstay under the darkest, most star-filled skies in the country. Four bedrooms, an outdoor kitchen, real farm animals, and a braai built for twelve. Disconnect to reconnect.",
    type: 'southafrican', guests: 8, bedrooms: 4, bathrooms: 3, price: 850,
    weeklyDiscount: 12, cleaningFee: 500, serviceFee: 110, occupancyTaxes: 90,
    amenities: ['Stargazing deck', 'Braai', 'Farm animals', 'WiFi (limited — by design)', 'Outdoor kitchen', 'Boreholes & windmill'],
    images: [SA2, SA1, SA3, SA4, SA5],
    rating: 4.91, reviews: 98,
    selfCheckIn: false, enhancedCleaning: false,
    specificRatings: { cleanliness: 4.9, communication: 5.0, checkIn: 4.9, accuracy: 4.9, location: 5.0, value: 4.9 },
    host: hostId,
  },
]

// ── Main seed function ────────────────────────────────────────────
async function seed() {
  console.log('Connecting to MongoDB Atlas...')
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected.')

  // 1. Seed users
  console.log('\nSeeding users...')
  for (const u of USERS) {
    const existing = await User.findOne({ email: u.email }).select('+password')
    if (existing) {
      existing.username = u.username
      existing.role     = u.role
      existing.password = u.password
      await existing.save()
      console.log(`  Updated: ${u.email}`)
    } else {
      await User.create(u)
      console.log(`  Created: ${u.email}`)
    }
  }

  // 2. Get host user _id for linking accommodations
  const hostUser = await User.findOne({ role: 'host' })
  if (!hostUser) throw new Error('Host user not found — make sure users are seeded first')

  // 3. Seed accommodations
  console.log('\nSeeding accommodations...')
  const accommodations = ACCOMMODATIONS(hostUser._id)

  for (const acc of accommodations) {
    const existing = await Accommodation.findOne({ title: acc.title })
    if (existing) {
      await Accommodation.findByIdAndUpdate(existing._id, acc, { runValidators: true })
      console.log(`  Updated: ${acc.title}`)
    } else {
      await Accommodation.create(acc)
      console.log(`  Created: ${acc.title}`)
    }
  }

  // 4. Final count
  const userCount = await User.countDocuments()
  const accCount  = await Accommodation.countDocuments()
  console.log(`\nDone.`)
  console.log(`  Users:          ${userCount}`)
  console.log(`  Accommodations: ${accCount}`)
}

seed()
  .catch(err => {
    console.error('\nSeeding failed:', err.message)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB.')
  })
