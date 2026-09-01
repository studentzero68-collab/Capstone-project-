// ── Local asset imports ──────────────────────────────────────────
// 53 images mapped to categories:
// treehouse: img01–img06  | beach: img07–img12
// garage:    img13–img18  | baker: img19–img24
// musician:  img25–img30  | gamer: img31–img36
// japanese:  img37–img42  | korean: img43–img48
// southafrican: img49–img53 + img01

import img01 from '../assets/img01.jpg'
import img02 from '../assets/img02.jpg'
import img03 from '../assets/img03.jpg'
import img04 from '../assets/img04.jpg'
import img05 from '../assets/img05.jpg'
import img06 from '../assets/img06.jpg'
import img07 from '../assets/img07.jpg'
import img08 from '../assets/img08.jpg'
import img09 from '../assets/img09.jpg'
import img10 from '../assets/img10.jpg'
import img11 from '../assets/img11.jpg'
import img12 from '../assets/img12.jpg'
import img13 from '../assets/img13.jpg'
import img14 from '../assets/img14.jpg'
import img15 from '../assets/img15.jpg'
import img16 from '../assets/img16.jpg'
import img17 from '../assets/img17.jpg'
import img18 from '../assets/img18.jpg'
import img19 from '../assets/img19.jpg'
import img20 from '../assets/img20.jpg'
import img21 from '../assets/img21.jpg'
import img22 from '../assets/img22.jpg'
import img23 from '../assets/img23.jpg'
import img24 from '../assets/img24.jpg'
import img25 from '../assets/img25.jpg'
import img26 from '../assets/img26.jpg'
import img27 from '../assets/img27.jpg'
import img28 from '../assets/img28.jpg'
import img29 from '../assets/img29.jpg'
import img30 from '../assets/img30.jpg'
import img31 from '../assets/img31.jpg'
import img32 from '../assets/img32.jpg'
import img33 from '../assets/img33.jpg'
import img34 from '../assets/img34.jpg'
import img35 from '../assets/img35.jpg'
import img36 from '../assets/img36.jpg'
import img37 from '../assets/img37.jpg'
import img38 from '../assets/img38.jpg'
import img39 from '../assets/img39.jpg'
import img40 from '../assets/img40.jpg'
import img41 from '../assets/img41.jpg'
import img42 from '../assets/img42.jpg'
import img43 from '../assets/img43.jpg'
import img44 from '../assets/img44.jpg'
import img45 from '../assets/img45.jpg'
import img46 from '../assets/img46.jpg'
import img47 from '../assets/img47.jpg'
import img48 from '../assets/img48.jpg'
import img49 from '../assets/img49.jpg'
import img50 from '../assets/img50.jpg'
import img51 from '../assets/img51.jpg'
import img52 from '../assets/img52.jpg'
import img53 from '../assets/img53.jpg'

export const LISTINGS = [
  /* ──────────── TREEHOUSES ──────────── */
  {
    id: 1, category: 'treehouse', culture: null,
    title: 'The Canopy Nest', location: 'Knysna Forest, Western Cape',
    price: 1850, rating: 4.97, reviews: 134, guests: 2, beds: 1, baths: 1,
    badge: 'Treehouse',
    img: img01,
    photos: [img01, img02, img03, img04, img05],
    amenities: ['WiFi', 'Kitchen', 'Parking', 'Outdoor shower', 'Fire pit', 'Deck'],
    description: 'Nestled 9 metres above the forest floor in the heart of the Knysna Forest. Wake up to birdsong, sip your morning coffee on the private deck, and fall asleep to the sounds of the wild. This is pure freedom — no crowds, no noise, just you and the trees.',
    host: 'Thabo M.', hostEmoji: '🌿',
    reviewsList: [
      { name: 'Lerato K.', date: 'July 2026', stars: 5, text: 'Absolutely magical. We never wanted to leave. The deck at sunset is indescribable.' },
      { name: 'Marco V.', date: 'June 2026', stars: 5, text: 'Best stay of our lives. Thabo was incredibly welcoming and the space felt alive.' },
    ],
  },
  {
    id: 2, category: 'treehouse', culture: null,
    title: 'Sky Loft Hideaway', location: 'Magaliesberg, North West',
    price: 2100, rating: 4.91, reviews: 88, guests: 2, beds: 1, baths: 1,
    badge: 'Treehouse',
    img: img06,
    photos: [img06, img05, img04, img03, img02],
    amenities: ['WiFi', 'Outdoor shower', 'Hammock', 'Fireplace', 'No TV by design', 'Stargazing deck'],
    description: 'A romantic treehouse loft with floor-to-ceiling windows and a private stargazing deck. No TV, no distractions — just you, your person, and the Magaliesberg mountains. Completely off-grid solar powered.',
    host: 'Annika R.', hostEmoji: '🌙',
    reviewsList: [
      { name: 'Sipho D.', date: 'August 2026', stars: 5, text: 'We came for a weekend and wished we could stay a week. Truly otherworldly.' },
      { name: 'Priya N.', date: 'May 2026', stars: 4, text: 'Stunning views. A little hard to find but 100% worth it.' },
    ],
  },

  /* ──────────── BEACH SPOTS ──────────── */
  {
    id: 3, category: 'beach', culture: null,
    title: 'Sunset Shack Muizenberg', location: 'Muizenberg, Cape Town',
    price: 950, rating: 4.88, reviews: 201, guests: 4, beds: 2, baths: 1,
    badge: 'Beach',
    img: img07,
    photos: [img07, img08, img09, img10, img11],
    amenities: ['WiFi', 'Kitchen', 'Beach gear', 'Outdoor shower', 'Surfboard rental', 'Braai area'],
    description: 'Steps from the most colourful beach huts in the country. Surf, swim, eat fish and chips on the promenade — then come back to this cosy 2-bed shack that feels like the ocean itself lives inside.',
    host: 'Candice F.', hostEmoji: '🏄',
    reviewsList: [
      { name: 'Amos T.', date: 'August 2026', stars: 5, text: 'The location is unreal. Woke up, grabbed a board, and walked straight to the waves.' },
      { name: 'Julia M.', date: 'July 2026', stars: 5, text: 'Candice is the most generous host. Left us fresh produce from the market. Loved it.' },
    ],
  },
  {
    id: 4, category: 'beach', culture: null,
    title: 'Dune House Sodwana', location: 'Sodwana Bay, KwaZulu-Natal',
    price: 750, rating: 4.79, reviews: 63, guests: 6, beds: 3, baths: 2,
    badge: 'Beach',
    img: img12,
    photos: [img12, img11, img10, img09, img08],
    amenities: ['WiFi', 'Full kitchen', 'Parking', 'Pool', 'Dive gear storage', 'Air conditioning'],
    description: 'Right next to the world-famous Sodwana diving spots. Three bedrooms, a private pool, and an outdoor kitchen built for big gatherings.',
    host: 'Kagiso L.', hostEmoji: '🌊',
    reviewsList: [
      { name: 'Brett H.', date: 'June 2026', stars: 5, text: 'Dove every morning, braai every evening. Absolute perfection for a group holiday.' },
    ],
  },

  /* ──────────── GARAGE HOMES ──────────── */
  {
    id: 5, category: 'garage', culture: null,
    title: 'The Workshop Loft', location: 'Maboneng, Johannesburg',
    price: 1100, rating: 4.85, reviews: 157, guests: 3, beds: 2, baths: 1,
    badge: 'Garage Home',
    img: img13,
    photos: [img13, img14, img15, img16, img17],
    amenities: ['WiFi', 'Kitchen', 'Car bay (2 vehicles)', 'Workshop tools', 'Smart TV', 'Security'],
    description: "A converted industrial workshop in the heart of Maboneng. High ceilings, polished concrete floors, exposed brick — and space for 2 cars in your very own indoor bay. An architect's dream turned into a liveable masterpiece.",
    host: 'Deon V.', hostEmoji: '🔧',
    reviewsList: [
      { name: 'Naledi S.', date: 'July 2026', stars: 5, text: 'This place is something else. Felt like living in a magazine. Will be back.' },
      { name: 'James O.', date: 'June 2026', stars: 5, text: 'Brought my project car along — having the bay was everything. 10/10.' },
    ],
  },
  {
    id: 6, category: 'garage', culture: null,
    title: 'Steel & Timber Dwelling', location: 'Woodstock, Cape Town',
    price: 1350, rating: 4.93, reviews: 94, guests: 4, beds: 2, baths: 2,
    badge: 'Garage Home',
    img: img18,
    photos: [img18, img17, img16, img15, img14],
    amenities: ['WiFi', 'Full kitchen', '3-car garage', 'Rooftop deck', 'Smart home system', 'EV charger'],
    description: "What used to be a commercial garage is now a stunning 2-storey live-work space. Rooftop deck with city mountain views, a chef's kitchen, and a 3-car secure garage.",
    host: 'Yusuf A.', hostEmoji: '🏗️',
    reviewsList: [
      { name: 'Chantal D.', date: 'August 2026', stars: 5, text: 'The rooftop at sunset with Table Mountain in the background — zero words.' },
    ],
  },

  /* ──────────── BAKER'S APARTMENTS ──────────── */
  {
    id: 7, category: 'baker', culture: null,
    title: 'The Flour & Flame Flat', location: 'Bree Street, Cape Town',
    price: 880, rating: 4.82, reviews: 112, guests: 2, beds: 1, baths: 1,
    badge: "Baker's Apt",
    img: img19,
    photos: [img19, img20, img21, img22, img23],
    amenities: ['Professional kitchen', 'Stand mixer', 'Proofing oven', 'Recipe library', 'WiFi', 'Market basket on arrival'],
    description: "Designed by and for people who love to bake. A professional-grade kitchen with a proofing oven, stand mixer, and a full recipe library. Wake up, head to the nearby market, come back and bake your heart out.",
    host: 'Miriam B.', hostEmoji: '🥐',
    reviewsList: [
      { name: 'Zara P.', date: 'July 2026', stars: 5, text: 'As a pastry chef, this was heaven. The proofing oven alone is worth every cent.' },
      { name: 'Thandi M.', date: 'June 2026', stars: 5, text: 'Baked sourdough every single morning. The kitchen is better than most restaurants.' },
    ],
  },
  {
    id: 8, category: 'baker', culture: null,
    title: 'Sweet Home Melville', location: 'Melville, Johannesburg',
    price: 720, rating: 4.76, reviews: 78, guests: 2, beds: 1, baths: 1,
    badge: "Baker's Apt",
    img: img24,
    photos: [img24, img23, img22, img21, img20],
    amenities: ['Full kitchen', 'Baking station', 'WiFi', 'Garden access', 'Weekly farmers market nearby', 'Spice rack included'],
    description: 'A cosy Melville cottage with a dedicated baking station, warm Joburg sunshine, and a lush garden to enjoy your creations.',
    host: 'Rachel G.', hostEmoji: '🎂',
    reviewsList: [
      { name: 'Kwame S.', date: 'May 2026', stars: 4, text: 'Loved the garden. Made croissants and ate them outside. Pure joy.' },
    ],
  },

  /* ──────────── MUSICIAN STUDIOS ──────────── */
  {
    id: 9, category: 'musician', culture: null,
    title: 'The Resonance Studio', location: 'Newtown, Johannesburg',
    price: 1600, rating: 4.95, reviews: 67, guests: 2, beds: 1, baths: 1,
    badge: 'Studio',
    img: img25,
    photos: [img25, img26, img27, img28, img29],
    amenities: ['Soundproofed', 'Recording booth', 'DAW workstation', 'Acoustic treatment', 'WiFi', 'Keyboard & guitar provided'],
    description: "A fully soundproofed live-in studio in Newtown — Jozi's creative heartbeat. Record during the day, sleep in the loft above at night.",
    host: 'Sipho K.', hostEmoji: '🎵',
    reviewsList: [
      { name: 'Leila A.', date: 'August 2026', stars: 5, text: 'Recorded an entire EP here. The acoustics are professional grade. Sipho is a legend.' },
      { name: 'David N.', date: 'July 2026', stars: 5, text: 'Cannot believe a place like this exists on Zero. Booked again already.' },
    ],
  },
  {
    id: 10, category: 'musician', culture: null,
    title: 'Salt River Sound Loft', location: 'Salt River, Cape Town',
    price: 1250, rating: 4.88, reviews: 43, guests: 2, beds: 1, baths: 1,
    badge: 'Studio',
    img: img30,
    photos: [img30, img29, img28, img27, img26],
    amenities: ['Soundproofed', 'Piano', 'Drum pad', 'Mixing board', 'WiFi', 'Rooftop access'],
    description: 'A warm industrial loft that doubles as a creative music space. Piano, drum pads, mixing board — everything you need to get into the zone.',
    host: 'Fatima S.', hostEmoji: '🎹',
    reviewsList: [
      { name: 'Marcus T.', date: 'June 2026', stars: 5, text: 'The piano alone had me in tears. A truly inspired space.' },
    ],
  },

  /* ──────────── GAMER DENS ──────────── */
  {
    id: 11, category: 'gamer', culture: null,
    title: 'Level Up Bunker', location: 'Hatfield, Pretoria',
    price: 650, rating: 4.84, reviews: 189, guests: 4, beds: 2, baths: 1,
    badge: 'Gamer Den',
    img: img31,
    photos: [img31, img32, img33, img34, img35],
    amenities: ['4K gaming setups (×4)', 'PS5 & Xbox Series X', 'VR headset', '120" projector', 'WiFi 1Gbps', 'Mini fridge & snack bar'],
    description: "The ultimate gamer's den. Four 4K gaming setups, a PS5, Xbox Series X, a VR headset, and a 120-inch projector for those big-screen moments.",
    host: 'Bryan X.', hostEmoji: '🎮',
    reviewsList: [
      { name: 'Itumeleng P.', date: 'July 2026', stars: 5, text: '48 hours of pure gaming bliss. The VR setup is next level. Already rebooked.' },
      { name: 'Shane W.', date: 'June 2026', stars: 5, text: 'Best bro trip we\'ve ever had. The projector for FIFA tournaments was ELITE.' },
    ],
  },
  {
    id: 12, category: 'gamer', culture: null,
    title: 'Respawn Retreat', location: 'Fourways, Johannesburg',
    price: 780, rating: 4.79, reviews: 102, guests: 3, beds: 2, baths: 1,
    badge: 'Gamer Den',
    img: img36,
    photos: [img36, img35, img34, img33, img32],
    amenities: ['3× Gaming PCs', 'Console corner', 'Streaming setup', 'Ring light & mic', 'WiFi 500Mbps', 'Smart lighting'],
    description: 'Built for the modern gamer and streamer. Three gaming PCs, a full streaming corner with ring light and professional mic, and smart RGB lighting.',
    host: 'Nadia C.', hostEmoji: '🕹️',
    reviewsList: [
      { name: 'Rory M.', date: 'August 2026', stars: 5, text: 'Streamed to 5k viewers from here. The setup is legitimately professional.' },
    ],
  },

  /* ──────────── JAPANESE CULTURE ──────────── */
  {
    id: 13, category: 'japanese', culture: 'japanese',
    title: 'Zen Garden Retreat', location: 'Franschhoek, Western Cape',
    price: 2400, rating: 4.98, reviews: 76, guests: 2, beds: 1, baths: 1,
    badge: 'Japanese',
    img: img37,
    photos: [img37, img38, img39, img40, img41],
    amenities: ['Tatami room', 'Private onsen', 'Zen garden', 'Tea ceremony kit', 'WiFi', 'Shoji sliding doors'],
    description: 'A fully authentic Japanese-inspired retreat. Tatami floors, shoji screens, a private onsen (hot spring bath), and a hand-raked zen garden.',
    host: 'Aiko T.', hostEmoji: '⛩️',
    reviewsList: [
      { name: 'Nomsa B.', date: 'July 2026', stars: 5, text: 'The onsen experience alone justifies the price. I cried when we had to leave.' },
      { name: 'Pierre L.', date: 'June 2026', stars: 5, text: "Most peaceful place I've ever stayed. Aiko's attention to detail is extraordinary." },
    ],
  },
  {
    id: 14, category: 'japanese', culture: 'japanese',
    title: 'Sakura Studio', location: 'Gardens, Cape Town',
    price: 1400, rating: 4.89, reviews: 55, guests: 2, beds: 1, baths: 1,
    badge: 'Japanese',
    img: img42,
    photos: [img42, img41, img40, img39, img38],
    amenities: ['Futon bedding', 'Bonsai collection', 'Tea station', 'WiFi', 'Japanese breakfast provided', 'Minimalist design'],
    description: 'A minimalist Cape Town studio infused with Japanese aesthetics. Futon bedding, a curated bonsai collection, a morning matcha station.',
    host: 'Kenji M.', hostEmoji: '🌸',
    reviewsList: [
      { name: 'Sara F.', date: 'August 2026', stars: 5, text: 'The morning matcha and bonsai corner set the tone for the most calming weekend.' },
    ],
  },

  /* ──────────── KOREAN CULTURE ──────────── */
  {
    id: 15, category: 'korean', culture: 'korean',
    title: 'Seoul Hanok Hideout', location: 'Braamfontein, Johannesburg',
    price: 1700, rating: 4.92, reviews: 48, guests: 2, beds: 1, baths: 1,
    badge: 'Korean',
    img: img43,
    photos: [img43, img44, img45, img46, img47],
    amenities: ['Ondol floor heating', 'Jjimjilbang-style spa', 'Korean skincare station', 'WiFi', 'K-drama room', 'Korean breakfast'],
    description: 'Inspired by traditional Korean hanok architecture. Ondol underfloor heating, a jjimjilbang-style relaxation room, and a K-drama lounge stocked with snacks.',
    host: 'Ji-Yeon P.', hostEmoji: '🏮',
    reviewsList: [
      { name: 'Lebo M.', date: 'July 2026', stars: 5, text: 'The K-drama room with the snack wall had us staying in all weekend on purpose.' },
      { name: 'Anna K.', date: 'June 2026', stars: 5, text: "Ji-Yeon made us feel like family. The skincare station was an unexpected delight." },
    ],
  },
  {
    id: 16, category: 'korean', culture: 'korean',
    title: 'Gangnam Style Flat', location: 'Sandton, Johannesburg',
    price: 2000, rating: 4.85, reviews: 37, guests: 2, beds: 1, baths: 1,
    badge: 'Korean',
    img: img48,
    photos: [img48, img47, img46, img45, img44],
    amenities: ['Smart toilet', 'Karaoke room', 'K-food pantry', 'WiFi', 'OLED TV wall', 'City views'],
    description: "Sleek, modern, and inspired by Seoul's glamorous Gangnam district. Smart toilet, a private karaoke room, OLED TV wall, and a K-food pantry.",
    host: 'Min-Jae L.', hostEmoji: '🎤',
    reviewsList: [
      { name: 'Tshepo N.', date: 'August 2026', stars: 5, text: 'We did karaoke till 2am and the views were unreal. Worth every single rand.' },
    ],
  },

  /* ──────────── SOUTH AFRICAN CULTURE ──────────── */
  {
    id: 17, category: 'southafrican', culture: 'southafrican',
    title: 'Ubuntu Lodge', location: 'Soweto, Johannesburg',
    price: 600, rating: 4.97, reviews: 223, guests: 6, beds: 3, baths: 2,
    badge: 'South African',
    img: img49,
    photos: [img49, img50, img51, img52, img53],
    amenities: ['Braai pit', 'Township tour included', 'Shebeen corner', 'WiFi', 'African art collection', 'Marimba corner'],
    description: 'A bold, colourful lodge celebrating the spirit of ubuntu — "I am because we are." Township-style décor, a shebeen corner, a braai pit, and a marimba corner. Township tour included.',
    host: 'Mama Rose', hostEmoji: '🌍',
    reviewsList: [
      { name: 'Michael S.', date: 'July 2026', stars: 5, text: 'The most authentic South African experience I\'ve ever had. Mama Rose is a national treasure.' },
      { name: 'Claire B.', date: 'June 2026', stars: 5, text: 'The braai, the marimba, the art — it all moved me. I sobbed happy tears leaving.' },
    ],
  },
  {
    id: 18, category: 'southafrican', culture: 'southafrican',
    title: 'Karoo Farmstay', location: 'Matjiesfontein, Northern Cape',
    price: 850, rating: 4.91, reviews: 98, guests: 8, beds: 4, baths: 3,
    badge: 'South African',
    img: img53,
    photos: [img53, img52, img51, img50, img49],
    amenities: ['Stargazing deck', 'Braai', 'Farm animals', 'WiFi (limited — by design)', 'Outdoor kitchen', 'Boreholes & windmill'],
    description: 'A sprawling Karoo farmstay under the darkest, most star-filled skies in the country. Four bedrooms, an outdoor kitchen, real farm animals, and a braai built for twelve.',
    host: 'Dirk & Elsa V.', hostEmoji: '⭐',
    reviewsList: [
      { name: 'Bongani Z.', date: 'August 2026', stars: 5, text: 'The Milky Way from that deck changed my perspective on life. I\'m serious.' },
      { name: 'Hanna T.', date: 'June 2026', stars: 5, text: "Brought 7 friends. Best. Decision. Ever. Dirk's lamb chops on the braai — a religious experience." },
    ],
  },
]

export const CATEGORIES = [
  { id: 'all',          label: 'All',          icon: '🌍' },
  { id: 'treehouse',    label: 'Treehouses',   icon: '🌳' },
  { id: 'beach',        label: 'Beach',        icon: '🏖️' },
  { id: 'garage',       label: 'Garage Homes', icon: '🏗️' },
  { id: 'baker',        label: 'Baker\'s Apts', icon: '🥐' },
  { id: 'musician',     label: 'Studios',      icon: '🎵' },
  { id: 'gamer',        label: 'Gamer Dens',   icon: '🎮' },
  { id: 'japanese',     label: 'Japanese',     icon: '⛩️' },
  { id: 'korean',       label: 'Korean',       icon: '🏮' },
  { id: 'southafrican', label: 'South African', icon: '🌍' },
]

export const CULTURE_TABS = [
  { id: 'all',          label: '🌍 All Cultures' },
  { id: 'japanese',     label: '⛩️ Japanese'     },
  { id: 'korean',       label: '🏮 Korean'       },
  { id: 'southafrican', label: '🌍 South African' },
]

export const JOURNEY_CARDS = [
  {
    id: 'romantic',
    icon: '🌹',
    title: 'Romantic Getaway',
    desc: 'For two souls ready to bloom',
    animType: 'rose',
    label: 'Let the petals fall…',
  },
  {
    id: 'friends',
    icon: '✊',
    title: 'Friend Trips',
    desc: 'Squad up and make memories',
    animType: 'fist',
    label: 'Let\'s gooo! 🤜🤛',
  },
  {
    id: 'family',
    icon: '👨‍👩‍👧‍👦',
    title: 'Family Time',
    desc: 'Space, warmth, and togetherness',
    animType: 'family',
    label: 'Together is the best place',
  },
  {
    id: 'solo',
    icon: '⚔️',
    title: 'Solo Journey',
    desc: 'Your quest. Your rules.',
    animType: 'knight',
    label: 'The adventure begins… 🗡️',
  },
]
