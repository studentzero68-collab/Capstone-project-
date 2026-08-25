/* =============================================
   ZERO — Where Every Journey Begins
   main.js — Full Application Logic
   ============================================= */

'use strict';

/* ===================== DATA ===================== */
/* ===================== LISTINGS DATA ===================== */
// 18 unique properties across 9 categories:
// treehouse (2), beach (2), garage (2), baker (2),
// musician (2), gamer (2), japanese (2), korean (2), southafrican (2)
const LISTINGS = [
  /* ---- TREEHOUSES ---- */
  {
    id: 1, category: 'treehouse', culture: null,
    title: 'The Canopy Nest', location: 'Knysna Forest, Western Cape',
    price: 1850, rating: 4.97, reviews: 134, guests: 2, beds: 1, baths: 1,
    badge: 'Treehouse',
    img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
    amenities: ['WiFi','Kitchen','Parking','Outdoor shower','Fire pit','Deck'],
    description: 'Nestled 9 metres above the forest floor in the heart of the Knysna Forest. Wake up to birdsong, sip your morning coffee on the private deck, and fall asleep to the sounds of the wild. This is pure freedom — no crowds, no noise, just you and the trees.',
    host: 'Thabo M.', hostEmoji: '🌲',
    reviewsList: [
      { name: 'Lerato K.', date: 'July 2026', stars: 5, text: 'Absolutely magical. We never wanted to leave. The deck at sunset is indescribable.' },
      { name: 'Marco V.', date: 'June 2026', stars: 5, text: 'Best stay of our lives. Thabo was incredibly welcoming and the space felt alive.' }
    ]
  },
  {
    id: 2, category: 'treehouse', culture: null,
    title: 'Sky Loft Hideaway', location: 'Magaliesberg, North West',
    price: 2100, rating: 4.91, reviews: 88, guests: 2, beds: 1, baths: 1,
    badge: 'Treehouse',
    img: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&q=80',
    amenities: ['WiFi','Outdoor shower','Hammock','Fireplace','No TV by design','Stargazing deck'],
    description: 'A romantic treehouse loft with floor-to-ceiling windows and a private stargazing deck. No TV, no distractions — just you, your person, and the Magaliesberg mountains. Completely off-grid solar powered.',
    host: 'Annika R.', hostEmoji: '⭐',
    reviewsList: [
      { name: 'Sipho D.', date: 'August 2026', stars: 5, text: 'We came for a weekend and wished we could stay a week. Truly otherworldly.' },
      { name: 'Priya N.', date: 'May 2026', stars: 4, text: 'Stunning views. A little hard to find but 100% worth it.' }
    ]
  },

  /* ---- BEACH SPOTS ---- */
  {
    id: 3, category: 'beach', culture: null,
    title: 'Sunset Shack Muizenberg', location: 'Muizenberg, Cape Town',
    price: 950, rating: 4.88, reviews: 201, guests: 4, beds: 2, baths: 1,
    badge: 'Beach',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    amenities: ['WiFi','Kitchen','Beach gear','Outdoor shower','Surfboard rental','Braai area'],
    description: 'Steps from the most colourful beach huts in the country. Surf, swim, eat fish and chips on the promenade — then come back to this cosy 2-bed shack that feels like the ocean itself lives inside. Perfect for friend groups and families.',
    host: 'Candice F.', hostEmoji: '🏄',
    reviewsList: [
      { name: 'Amos T.', date: 'August 2026', stars: 5, text: 'The location is unreal. Woke up, grabbed a board, and walked straight to the waves.' },
      { name: 'Julia M.', date: 'July 2026', stars: 5, text: 'Candice is the most generous host. Left us fresh produce from the market. Loved it.' }
    ]
  },
  {
    id: 4, category: 'beach', culture: null,
    title: 'Dune House Sodwana', location: 'Sodwana Bay, KwaZulu-Natal',
    price: 750, rating: 4.79, reviews: 63, guests: 6, beds: 3, baths: 2,
    badge: 'Beach',
    img: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=80',
    amenities: ['WiFi','Full kitchen','Parking','Pool','Dive gear storage','Air conditioning'],
    description: 'Right next to the world-famous Sodwana diving spots. Three bedrooms, a private pool, and an outdoor kitchen built for big gatherings. This is the one you book for a legendary friend trip or family reunion.',
    host: 'Kagiso L.', hostEmoji: '🤿',
    reviewsList: [
      { name: 'Brett H.', date: 'June 2026', stars: 5, text: 'Dove every morning, braai every evening. Absolute perfection for a group holiday.' }
    ]
  },

  /* ---- GARAGE HOMES ---- */
  {
    id: 5, category: 'garage', culture: null,
    title: 'The Workshop Loft', location: 'Maboneng, Johannesburg',
    price: 1100, rating: 4.85, reviews: 157, guests: 3, beds: 2, baths: 1,
    badge: 'Garage Home',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    amenities: ['WiFi','Kitchen','Car bay (2 vehicles)','Workshop tools','Smart TV','Security'],
    description: 'A converted industrial workshop in the heart of Maboneng. High ceilings, polished concrete floors, exposed brick — and space for 2 cars in your very own indoor bay. An architect\'s dream turned into a liveable masterpiece.',
    host: 'Deon V.', hostEmoji: '🔧',
    reviewsList: [
      { name: 'Naledi S.', date: 'July 2026', stars: 5, text: 'This place is something else. Felt like living in a magazine. Will be back.' },
      { name: 'James O.', date: 'June 2026', stars: 5, text: 'Brought my project car along — having the bay was everything. 10/10.' }
    ]
  },
  {
    id: 6, category: 'garage', culture: null,
    title: 'Steel & Timber Dwelling', location: 'Woodstock, Cape Town',
    price: 1350, rating: 4.93, reviews: 94, guests: 4, beds: 2, baths: 2,
    badge: 'Garage Home',
    img: 'https://images.unsplash.com/photo-1486304873000-235643847519?w=600&q=80',
    amenities: ['WiFi','Full kitchen','3-car garage','Rooftop deck','Smart home system','EV charger'],
    description: 'What used to be a commercial garage is now a stunning 2-storey live-work space. Rooftop deck with city mountain views, a chef\'s kitchen, and a 3-car secure garage. The EV charger is a bonus — arrive in style and leave recharged.',
    host: 'Yusuf A.', hostEmoji: '🏗️',
    reviewsList: [
      { name: 'Chantal D.', date: 'August 2026', stars: 5, text: 'The rooftop at sunset with Table Mountain in the background — zero words.' }
    ]
  },

  /* ---- BAKER'S APARTMENTS ---- */
  {
    id: 7, category: 'baker', culture: null,
    title: 'The Flour & Flame Flat', location: 'Bree Street, Cape Town',
    price: 880, rating: 4.82, reviews: 112, guests: 2, beds: 1, baths: 1,
    badge: 'Baker\'s Apt',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    amenities: ['Professional kitchen','Stand mixer','Proofing oven','Recipe library','WiFi','Market basket on arrival'],
    description: 'Designed by and for people who love to bake. A professional-grade kitchen with a proofing oven, stand mixer, and a full recipe library. Wake up, head to the nearby market, come back and bake your heart out. Warm, homey, and full of the smell of possibility.',
    host: 'Miriam B.', hostEmoji: '🧁',
    reviewsList: [
      { name: 'Zara P.', date: 'July 2026', stars: 5, text: 'As a pastry chef, this was heaven. The proofing oven alone is worth every cent.' },
      { name: 'Thandi M.', date: 'June 2026', stars: 5, text: 'Baked sourdough every single morning. The kitchen is better than most restaurants.' }
    ]
  },
  {
    id: 8, category: 'baker', culture: null,
    title: 'Sweet Home Melville', location: 'Melville, Johannesburg',
    price: 720, rating: 4.76, reviews: 78, guests: 2, beds: 1, baths: 1,
    badge: 'Baker\'s Apt',
    img: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&q=80',
    amenities: ['Full kitchen','Baking station','WiFi','Garden access','Weekly farmers market nearby','Spice rack included'],
    description: 'A cosy Melville cottage with a dedicated baking station, warm Joburg sunshine, and a lush garden to enjoy your creations. Homey, relaxed, and built for the baker who wants to slow down and just create.',
    host: 'Rachel G.', hostEmoji: '🍞',
    reviewsList: [
      { name: 'Kwame S.', date: 'May 2026', stars: 4, text: 'Loved the garden. Made croissants and ate them outside. Pure joy.' }
    ]
  },

  /* ---- MUSICIAN STUDIOS ---- */
  {
    id: 9, category: 'musician', culture: null,
    title: 'The Resonance Studio', location: 'Newtown, Johannesburg',
    price: 1600, rating: 4.95, reviews: 67, guests: 2, beds: 1, baths: 1,
    badge: 'Studio',
    img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80',
    amenities: ['Soundproofed','Recording booth','DAW workstation','Acoustic treatment','WiFi','Keyboard & guitar provided'],
    description: 'A fully soundproofed live-in studio in Newtown — Jozi\'s creative heartbeat. Record during the day, sleep in the loft above at night. A DAW workstation with industry software, an acoustic booth, and a keyboard and guitar waiting for you.',
    host: 'Sipho K.', hostEmoji: '🎸',
    reviewsList: [
      { name: 'Leila A.', date: 'August 2026', stars: 5, text: 'Recorded an entire EP here. The acoustics are professional grade. Sipho is a legend.' },
      { name: 'David N.', date: 'July 2026', stars: 5, text: 'Cannot believe a place like this exists on Zero. Booked again already.' }
    ]
  },
  {
    id: 10, category: 'musician', culture: null,
    title: 'Salt River Sound Loft', location: 'Salt River, Cape Town',
    price: 1250, rating: 4.88, reviews: 43, guests: 2, beds: 1, baths: 1,
    badge: 'Studio',
    img: 'https://images.unsplash.com/photo-1478737270197-f5b9e9e3a7d6?w=600&q=80',
    amenities: ['Soundproofed','Piano','Drum pad','Mixing board','WiFi','Rooftop access'],
    description: 'A warm industrial loft that doubles as a creative music space. Piano, drum pads, mixing board — everything you need to get into the zone. Rooftop access for when you need fresh air between sessions.',
    host: 'Fatima S.', hostEmoji: '🎹',
    reviewsList: [
      { name: 'Marcus T.', date: 'June 2026', stars: 5, text: 'The piano alone had me in tears. A truly inspired space.' }
    ]
  },

  /* ---- GAMER DENS ---- */
  {
    id: 11, category: 'gamer', culture: null,
    title: 'Level Up Bunker', location: 'Hatfield, Pretoria',
    price: 650, rating: 4.84, reviews: 189, guests: 4, beds: 2, baths: 1,
    badge: 'Gamer Den',
    img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80',
    amenities: ['4K gaming setups (x4)','PS5 & Xbox Series X','VR headset','120" projector','WiFi 1Gbps','Mini fridge & snack bar'],
    description: 'The ultimate gamer\'s den. Four 4K gaming setups, a PS5, Xbox Series X, a VR headset, and a 120-inch projector for those big-screen moments. 1Gbps WiFi, a snack bar stocked on arrival, and blackout blinds. You may never leave.',
    host: 'Bryan X.', hostEmoji: '🕹️',
    reviewsList: [
      { name: 'Itumeleng P.', date: 'July 2026', stars: 5, text: '48 hours of pure gaming bliss. The VR setup is next level. Already rebooked.' },
      { name: 'Shane W.', date: 'June 2026', stars: 5, text: 'Best bro trip we\'ve ever had. The projector for FIFA tournaments was ELITE.' }
    ]
  },
  {
    id: 12, category: 'gamer', culture: null,
    title: 'Respawn Retreat', location: 'Fourways, Johannesburg',
    price: 780, rating: 4.79, reviews: 102, guests: 3, beds: 2, baths: 1,
    badge: 'Gamer Den',
    img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80',
    amenities: ['3x Gaming PCs','Console corner','Streaming setup','Ring light & mic','WiFi 500Mbps','Smart lighting'],
    description: 'Built for the modern gamer and streamer. Three gaming PCs, a full streaming corner with ring light and professional mic, and smart RGB lighting you control. Create content, go live, or just grind — this place was made for it.',
    host: 'Nadia C.', hostEmoji: '📡',
    reviewsList: [
      { name: 'Rory M.', date: 'August 2026', stars: 5, text: 'Streamed to 5k viewers from here. The setup is legitimately professional.' }
    ]
  },

  /* ---- JAPANESE CULTURE ---- */
  {
    id: 13, category: 'japanese', culture: 'japanese',
    title: 'Zen Garden Retreat', location: 'Franschhoek, Western Cape',
    price: 2400, rating: 4.98, reviews: 76, guests: 2, beds: 1, baths: 1,
    badge: 'Japanese',
    img: 'https://images.unsplash.com/photo-1545579133-99bb5ad189be?w=600&q=80',
    amenities: ['Tatami room','Private onsen','Zen garden','Tea ceremony kit','WiFi','Shoji sliding doors'],
    description: 'A fully authentic Japanese-inspired retreat. Tatami floors, shoji screens, a private onsen (hot spring bath), and a hand-raked zen garden. Every detail sourced with care. Arrive stressed, leave transformed.',
    host: 'Aiko T.', hostEmoji: '🌸',
    reviewsList: [
      { name: 'Nomsa B.', date: 'July 2026', stars: 5, text: 'The onsen experience alone justifies the price. I cried when we had to leave.' },
      { name: 'Pierre L.', date: 'June 2026', stars: 5, text: 'Most peaceful place I\'ve ever stayed. Aiko\'s attention to detail is extraordinary.' }
    ]
  },
  {
    id: 14, category: 'japanese', culture: 'japanese',
    title: 'Sakura Studio', location: 'Gardens, Cape Town',
    price: 1400, rating: 4.89, reviews: 55, guests: 2, beds: 1, baths: 1,
    badge: 'Japanese',
    img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80',
    amenities: ['Futon bedding','Bonsai collection','Tea station','WiFi','Japanese breakfast provided','Minimalist design'],
    description: 'A minimalist Cape Town studio infused with Japanese aesthetics. Futon bedding, a curated bonsai collection, a morning matcha station, and a Japanese-style breakfast on arrival. Small in size, limitless in peace.',
    host: 'Kenji M.', hostEmoji: '🍵',
    reviewsList: [
      { name: 'Sara F.', date: 'August 2026', stars: 5, text: 'The morning matcha and bonsai corner set the tone for the most calming weekend.' }
    ]
  },

  /* ---- KOREAN CULTURE ---- */
  {
    id: 15, category: 'korean', culture: 'korean',
    title: 'Seoul Hanok Hideout', location: 'Braamfontein, Johannesburg',
    price: 1700, rating: 4.92, reviews: 48, guests: 2, beds: 1, baths: 1,
    badge: '🇰🇷 Korean',
    img: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=600&q=80',
    amenities: ['Ondol floor heating','Jjimjilbang-style spa','Korean skincare station','WiFi','K-drama room','Korean breakfast'],
    description: 'Inspired by traditional Korean hanok architecture. Ondol underfloor heating, a jjimjilbang-style relaxation room, a full Korean skincare station, and a K-drama lounge stocked with snacks and blankets. This one is for the culture.',
    host: 'Ji-Yeon P.', hostEmoji: '🌿',
    reviewsList: [
      { name: 'Lebo M.', date: 'July 2026', stars: 5, text: 'The K-drama room with the snack wall had us staying in all weekend on purpose.' },
      { name: 'Anna K.', date: 'June 2026', stars: 5, text: 'Ji-Yeon made us feel like family. The skincare station was an unexpected delight.' }
    ]
  },
  {
    id: 16, category: 'korean', culture: 'korean',
    title: 'Gangnam Style Flat', location: 'Sandton, Johannesburg',
    price: 2000, rating: 4.85, reviews: 37, guests: 2, beds: 1, baths: 1,
    badge: '🇰🇷 Korean',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
    amenities: ['Smart toilet','Karaoke room','K-food pantry','WiFi','OLED TV wall','City views'],
    description: 'Sleek, modern, and inspired by Seoul\'s glamorous Gangnam district. Smart toilet, a private karaoke room, OLED TV wall, and a K-food pantry stocked with everything from ramen to tteokbokki. City views on the 18th floor.',
    host: 'Min-Jae L.', hostEmoji: '🎤',
    reviewsList: [
      { name: 'Tshepo N.', date: 'August 2026', stars: 5, text: 'We did karaoke till 2am and the views were unreal. Worth every single rand.' }
    ]
  },

  /* ---- SOUTH AFRICAN CULTURE ---- */
  {
    id: 17, category: 'southafrican', culture: 'southafrican',
    title: 'Ubuntu Lodge', location: 'Soweto, Johannesburg',
    price: 600, rating: 4.97, reviews: 223, guests: 6, beds: 3, baths: 2,
    badge: '🇿🇦 South African',
    img: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&q=80',
    amenities: ['Braai pit','Township tour included','Shebeen corner','WiFi','African art collection','Marimba corner'],
    description: 'A bold, colourful lodge celebrating the spirit of ubuntu — "I am because we are." Township-style décor, a shebeen corner stocked with local craft beer, a braai pit for epic evenings, and a marimba corner for impromptu sessions. A township tour is included on arrival.',
    host: 'Mama Rose', hostEmoji: '🌍',
    reviewsList: [
      { name: 'Michael S.', date: 'July 2026', stars: 5, text: 'The most authentic South African experience I\'ve ever had. Mama Rose is a national treasure.' },
      { name: 'Claire B.', date: 'June 2026', stars: 5, text: 'The braai, the marimba, the art — it all moved me. I sobbed happy tears leaving.' }
    ]
  },
  {
    id: 18, category: 'southafrican', culture: 'southafrican',
    title: 'Karoo Farmstay', location: 'Matjiesfontein, Northern Cape',
    price: 850, rating: 4.91, reviews: 98, guests: 8, beds: 4, baths: 3,
    badge: '🇿🇦 South African',
    img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=600&q=80',
    amenities: ['Stargazing deck','Braai','Farm animals','WiFi (limited — by design)','Outdoor kitchen','Boreholes & windmill'],
    description: 'A sprawling Karoo farmstay under the darkest, most star-filled skies in the country. Four bedrooms, an outdoor kitchen, real farm animals, and a braai built for twelve. No signal struggles — that\'s the point. Disconnect to reconnect.',
    host: 'Dirk & Elsa V.', hostEmoji: '🌾',
    reviewsList: [
      { name: 'Bongani Z.', date: 'August 2026', stars: 5, text: 'The Milky Way from that deck changed my perspective on life. I\'m serious.' },
      { name: 'Hanna T.', date: 'June 2026', stars: 5, text: 'Brought 7 friends. Best. Decision. Ever. Dirk\'s lamb chops on the braai — a religious experience.' }
    ]
  }
];

/* ===================== STATE ===================== */
const state = {
  currentPage: 'home',       // 'home' | 'search' | 'detail'
  activeCategory: 'all',
  activeCulture: 'all',
  searchQuery: '',
  checkin: '',
  checkout: '',
  guests: 1,
  sortBy: 'recommended',
  filterPriceMin: 0,
  filterPriceMax: 5000,
  filterBeds: 0,
  filterTypes: [],
  filterAmenities: [],
  wishlist: JSON.parse(localStorage.getItem('zero_wishlist') || '[]'),
  homeListingsShown: 8,
  activeJourney: null,
  currentListing: null,
  bookingGuests: 1,
  recentlyViewed: JSON.parse(localStorage.getItem('zero_recent') || '[]')
};

/* ===================== DOM REFS ===================== */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

const pages = {
  home:   $('page-home'),
  search: $('page-search'),
  detail: $('page-detail')
};

/* ===================== ROUTING ===================== */
function navigateTo(page) {
  Object.values(pages).forEach(p => { p.classList.remove('active'); p.classList.add('hidden'); });
  pages[page].classList.remove('hidden');
  pages[page].classList.add('active');
  state.currentPage = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  syncPageTitle(page, page === 'search' ? state.searchQuery : page === 'detail' ? state.currentListing?.title : '');

  // Show/hide cat bar and footer
  const catBar = $('cat-bar');
  const footer = $('site-footer');
  catBar.style.display = (page === 'detail') ? 'none' : '';
  footer.style.display = (page === 'detail') ? '' : '';

  // Search page: render results
  if (page === 'search') renderSearchResults();
  initReveal();
}

/* ===================== CARD BUILDER ===================== */
function buildCard(listing) {
  const isLiked = state.wishlist.includes(listing.id);
  const stars = '★'.repeat(Math.floor(listing.rating)) + (listing.rating % 1 >= 0.5 ? '½' : '');
  const article = document.createElement('article');
  article.className = 'listing-card reveal';
  article.setAttribute('role', 'listitem');
  article.setAttribute('tabindex', '0');
  article.setAttribute('aria-label', `${listing.title}, ${listing.location}, R${listing.price.toLocaleString()} per night`);
  article.dataset.id = listing.id;
  article.innerHTML = `
    <div class="card-img-wrap">
      <img src="${listing.img}" alt="${listing.title}" loading="lazy" />
      <span class="card-badge">${listing.badge}</span>
      <button class="card-wishlist ${isLiked ? 'liked' : ''}"
        aria-label="${isLiked ? 'Remove from wishlist' : 'Add to wishlist'}"
        aria-pressed="${isLiked}"
        data-id="${listing.id}">
        ${isLiked ? 'Saved' : 'Save'}
      </button>
    </div>
    <div class="card-body">
      <h3 class="card-title">${highlightMatch(listing.title, state.searchQuery)}</h3>
      <p class="card-location">${highlightMatch(listing.location, state.searchQuery)}</p>
      <div class="card-meta">
        <span>${listing.guests} guests</span>
        <span>${listing.beds} bed${listing.beds > 1 ? 's' : ''}</span>
        <span>${listing.baths} bath${listing.baths > 1 ? 's' : ''}</span>
      </div>
      <div class="card-rating">
        <span aria-hidden="true">★</span>
        <span>${listing.rating}</span>
        <span style="color:var(--white-dim);font-size:.82rem">(${listing.reviews})</span>
      </div>
      <div class="card-price-row">
        <span class="card-price">${formatPrice(listing.price)}</span>
        <span class="card-per">/ night</span>
      </div>
    </div>`;

  // Open detail on click
  article.addEventListener('click', e => {
    if (e.target.closest('.card-wishlist')) return;
    openDetail(listing);
  });
  article.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.target.closest('.card-wishlist')) openDetail(listing);
  });

  // Wishlist button
  article.querySelector('.card-wishlist').addEventListener('click', e => {
    e.stopPropagation();
    toggleWishlist(listing.id, e.currentTarget);
  });

  return article;
}

/* ===================== WISHLIST ===================== */
function toggleWishlist(id, btn) {
  const idx = state.wishlist.indexOf(id);
  if (idx === -1) {
    state.wishlist.push(id);
    btn.innerHTML = '❤️';
    btn.classList.add('liked');
    btn.setAttribute('aria-pressed', 'true');
    btn.setAttribute('aria-label', 'Remove from wishlist');
  } else {
    state.wishlist.splice(idx, 1);
    btn.innerHTML = '🤍';
    btn.classList.remove('liked');
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-label', 'Add to wishlist');
  }
  localStorage.setItem('zero_wishlist', JSON.stringify(state.wishlist));
}

/* ===================== HOME LISTINGS ===================== */
function getFilteredListings() {
  return LISTINGS.filter(l => {
    const catMatch = state.activeCategory === 'all' || l.category === state.activeCategory;
    const priceMatch = l.price >= state.filterPriceMin && l.price <= state.filterPriceMax;
    const bedsMatch = state.filterBeds === 0 || l.beds >= state.filterBeds;
    const typesMatch = state.filterTypes.length === 0 || state.filterTypes.includes(l.category);
    const amenMatch = state.filterAmenities.length === 0 ||
      state.filterAmenities.every(a => l.amenities.map(x => x.toLowerCase()).some(x => x.includes(a)));
    return catMatch && priceMatch && bedsMatch && typesMatch && amenMatch;
  });
}

function sortListings(arr) {
  const copy = [...arr];
  switch (state.sortBy) {
    case 'price-asc':  return copy.sort((a, b) => a.price - b.price);
    case 'price-desc': return copy.sort((a, b) => b.price - a.price);
    case 'rating':     return copy.sort((a, b) => b.rating - a.rating);
    default:           return copy;
  }
}

function renderHomeListings() {
  const grid = $('home-listings-grid');
  grid.innerHTML = '<div class="spinner-wrap"><div class="spinner" aria-label="Loading listings"></div></div>';

  // Simulate brief loading delay for UX
  setTimeout(() => {
    grid.innerHTML = '';
    const filtered = sortListings(getFilteredListings());
    const shown = filtered.slice(0, state.homeListingsShown);
    if (shown.length === 0) {
      grid.innerHTML = '<p class="no-results">No stays match your filters. Try adjusting them.</p>';
    } else {
      shown.forEach(l => grid.appendChild(buildCard(l)));
    }
    $('btn-load-more').style.display = filtered.length > state.homeListingsShown ? '' : 'none';
    initReveal();
  }, 300);
}

function renderCultureGrid() {
  const grid = $('culture-grid');
  grid.innerHTML = '';
  const filtered = LISTINGS.filter(l =>
    (state.activeCulture === 'all' && l.culture) ||
    l.culture === state.activeCulture
  );
  if (filtered.length === 0) {
    grid.innerHTML = '<p class="no-results">No listings found for this culture.</p>';
  } else {
    filtered.forEach(l => grid.appendChild(buildCard(l)));
  }
  initReveal();
}

/* ===================== DEBOUNCE ===================== */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/* ===================== PRICE FORMATTER ===================== */
function formatPrice(n) {
  return `R${Number(n).toLocaleString('en-ZA')}`;
}

function highlightMatch(text, query) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
}

function renderSearchResults() {
  const grid = $('search-listings-grid');
  grid.innerHTML = '';

  let results = LISTINGS.filter(l => {
    const q = state.searchQuery.toLowerCase();
    return (
      l.title.toLowerCase().includes(q) ||
      l.location.toLowerCase().includes(q) ||
      l.category.toLowerCase().includes(q) ||
      (l.culture && l.culture.toLowerCase().includes(q))
    );
  });

  // Apply all panel filters
  results = results.filter(l =>
    l.price >= state.filterPriceMin &&
    l.price <= state.filterPriceMax &&
    (state.filterBeds === 0 || l.beds >= state.filterBeds) &&
    (state.filterTypes.length === 0 || state.filterTypes.includes(l.category)) &&
    (state.filterAmenities.length === 0 ||
      state.filterAmenities.every(a => l.amenities.map(x => x.toLowerCase()).some(x => x.includes(a))))
  );

  results = sortListings(results);

  const count = $('search-results-count');
  count.textContent = `${results.length} stay${results.length !== 1 ? 's' : ''} found${state.searchQuery ? ` for "${state.searchQuery}"` : ''}`;

  if (results.length === 0) {
    grid.innerHTML = '<p class="no-results">No stays found. Try a different search or adjust filters.</p>';
  } else {
    results.forEach(l => grid.appendChild(buildCard(l)));
  }
  initReveal();
}

/* ===================== DETAIL PAGE ===================== */
function openDetail(listing) {
  state.currentListing = listing;

  // Track recently viewed
  state.recentlyViewed = state.recentlyViewed.filter(id => id !== listing.id);
  state.recentlyViewed.unshift(listing.id);
  if (state.recentlyViewed.length > 6) state.recentlyViewed = state.recentlyViewed.slice(0, 6);
  localStorage.setItem('zero_recent', JSON.stringify(state.recentlyViewed));

  // Photos
  const photosEl = $('detail-photos');
  photosEl.innerHTML = '';
  // Use same image 3 times with slight variation via different crops (Unsplash supports that)
  const imgUrls = [
    listing.img,
    listing.img.replace('w=600', 'w=601').replace('q=80', 'q=81'),
    listing.img.replace('w=600', 'w=599').replace('q=80', 'q=79')
  ];
  imgUrls.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `${listing.title} photo ${i + 1}`;
    img.loading = 'lazy';
    photosEl.appendChild(img);
  });

  // Badge, title, location
  $('detail-badge').textContent = listing.badge;
  $('detail-title').textContent = listing.title;
  $('detail-location').innerHTML = `📍 ${listing.location}`;

  // Breadcrumb
  if ($('bread-category')) $('bread-category').textContent = listing.badge;
  if ($('bread-title'))    $('bread-title').textContent    = listing.title;
  if ($('bread-home'))     $('bread-home').onclick = () => navigateTo('home');

  // Meta
  $('detail-meta-row').innerHTML = `
    <span>👥 ${listing.guests} guests</span>
    <span>🛏 ${listing.beds} bedroom${listing.beds > 1 ? 's' : ''}</span>
    <span>🚿 ${listing.baths} bath${listing.baths > 1 ? 's' : ''}</span>`;

  // Rating
  $('detail-rating-row').innerHTML = `
    <span>★ ${listing.rating}</span>
    <span style="color:var(--white-dim)">·</span>
    <a href="#reviews-heading" style="color:var(--gold);font-family:var(--font-accent)">${listing.reviews} reviews</a>`;

  // Host
  $('host-avatar').textContent = listing.hostEmoji;
  $('host-name').textContent = `Hosted by ${listing.host}`;

  // Description
  $('detail-description').textContent = listing.description;

  // Amenities
  const amenList = $('amenities-list');
  amenList.innerHTML = '';
  listing.amenities.forEach(a => {
    const li = document.createElement('li');
    li.innerHTML = `<span aria-hidden="true">✓</span> ${a}`;
    amenList.appendChild(li);
  });

  // Reviews
  const reviewsList = $('reviews-list');
  reviewsList.innerHTML = '';
  listing.reviewsList.forEach(r => {
    const div = document.createElement('div');
    div.className = 'review-card';
    div.innerHTML = `
      <div class="review-header">
        <div class="review-avatar" aria-hidden="true">👤</div>
        <div>
          <p class="review-name">${r.name}</p>
          <p class="review-date">${r.date}</p>
        </div>
      </div>
      <p class="review-stars" aria-label="${r.stars} stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</p>
      <p class="review-text">${r.text}</p>`;
    reviewsList.appendChild(div);
  });

  // Booking card
  $('booking-price').textContent = `R${listing.price.toLocaleString()}`;
  $('booking-rating-row').innerHTML = `★ ${listing.rating} · ${listing.reviews} reviews`;

  // Reset guest count
  state.bookingGuests = 1;
  $('guest-count').textContent = '1';

  // Set today as min for date inputs
  const today = new Date().toISOString().split('T')[0];
  $('book-checkin').min = today;
  $('book-checkout').min = today;
  $('book-checkin').value = '';
  $('book-checkout').value = '';

  // Sync save button state on open
  const savedBtn = $('btn-save-listing');
  if (savedBtn) {
    const isSaved = state.wishlist.includes(listing.id);
    savedBtn.textContent = isSaved ? '❤️ Saved to Wishlist' : '🤍 Save to Wishlist';
    savedBtn.classList.toggle('saved', isSaved);
  }
}

function updateBookingBreakdown() {
  if (!state.currentListing) return;
  const breakdown = $('booking-breakdown');
  const checkin  = $('book-checkin').value;
  const checkout = $('book-checkout').value;

  if (checkin && checkout && checkout > checkin) {
    const nights = Math.round((new Date(checkout) - new Date(checkin)) / 86400000);
    const subtotal = nights * state.currentListing.price;
    const fee = Math.round(subtotal * 0.12);
    const total = subtotal + fee;
    breakdown.innerHTML = `
      <div class="breakdown-row"><span>R${state.currentListing.price.toLocaleString()} × ${nights} night${nights > 1 ? 's' : ''}</span><span>R${subtotal.toLocaleString()}</span></div>
      <div class="breakdown-row"><span>Zero service fee</span><span>R${fee.toLocaleString()}</span></div>
      <div class="breakdown-row total"><span>Total</span><span>R${total.toLocaleString()}</span></div>`;
  } else {
    breakdown.innerHTML = `<p style="font-family:var(--font-accent);color:var(--white-dim);font-size:.9rem;text-align:center">Select dates to see total price</p>`;
  }
}

/* ===================== JOURNEY ANIMATIONS ===================== */
function playAnimation(type) {
  const overlay   = $('animation-overlay');
  const container = $('animation-container');
  const label     = $('animation-label');
  overlay.classList.remove('hidden');
  container.innerHTML = '';

  const configs = {
    romantic: {
      label: '❤️ A Romantic Escape Awaits...',
      count: 40,
      make: () => {
        const el = document.createElement('span');
        el.className = 'anim-particle';
        el.textContent = ['🌹','❤️','🌸','💐','✨'][Math.floor(Math.random() * 5)];
        el.style.left  = Math.random() * 100 + 'vw';
        el.style.animationDuration = (2.5 + Math.random() * 2) + 's';
        el.style.animationDelay    = (Math.random() * 1.5) + 's';
        el.style.fontSize = (1.5 + Math.random() * 2) + 'rem';
        return el;
      }
    },
    friends: {
      label: '✊ Let\'s Go Crew!',
      count: 12,
      make: (i) => {
        const el = document.createElement('span');
        el.className = 'anim-fist';
        el.textContent = ['✊','🤜','🤛','🙌','🎉'][i % 5];
        el.style.left = (5 + i * 8) + 'vw';
        el.style.top  = (20 + Math.random() * 50) + 'vh';
        el.style.animationDelay = (i * 0.12) + 's';
        return el;
      }
    },
    family: {
      label: '🏠 Home is Where Your Family Is',
      count: 10,
      make: (i) => {
        const el = document.createElement('span');
        el.className = 'anim-family';
        el.textContent = ['👨‍👩‍👧‍👦','🏠','🌻','💛','👶','🐾'][i % 6];
        el.style.left = (5 + i * 9) + 'vw';
        el.style.top  = (15 + Math.random() * 55) + 'vh';
        el.style.animationDelay = (i * 0.18) + 's';
        return el;
      }
    },
    solo: {
      label: '⚔️ Your Quest Begins...',
      count: 1,
      make: () => {
        const el = document.createElement('span');
        el.className = 'anim-knight';
        el.textContent = '♞';
        el.style.fontSize = '6rem';
        el.style.color = 'var(--gold)';
        return el;
      }
    }
  };

  const cfg = configs[type];
  label.textContent = cfg.label;
  for (let i = 0; i < cfg.count; i++) {
    container.appendChild(cfg.make(i));
  }

  // Dismiss after animation
  setTimeout(() => {
    overlay.classList.add('hidden');
    container.innerHTML = '';
  }, 3200);
}

/* ===================== CATEGORY BAR ===================== */
function initCatBar() {
  $$('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      $$('.cat-pill').forEach(p => { p.classList.remove('active'); p.setAttribute('aria-selected', 'false'); });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');
      state.activeCategory = pill.dataset.category;
      state.homeListingsShown = 8;
      if (state.currentPage === 'home') {
        renderHomeListings();
        document.getElementById('listings-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        navigateTo('search');
      }
    });
  });
}

/* ===================== SEARCH BAR ===================== */
function initSearchBar() {
  const btn   = $('nsb-search-btn');
  const input = $('nsb-where-input');

  function doSearch() {
    state.searchQuery = input.value.trim();
    state.checkin  = $('nsb-checkin-input').value;
    state.checkout = $('nsb-checkout-input').value;
    navigateTo('search');
  }

  btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
  input.addEventListener('input', debounce(() => {
    // Live preview count in placeholder area
    const q = input.value.trim().toLowerCase();
    if (!q) return;
    const count = LISTINGS.filter(l =>
      l.title.toLowerCase().includes(q) ||
      l.location.toLowerCase().includes(q) ||
      l.category.toLowerCase().includes(q)
    ).length;
    input.setAttribute('aria-description', `${count} result${count !== 1 ? 's' : ''} found`);
  }, 300));

  // Guests display (simple toggle)
  $('nsb-guests-display').addEventListener('click', () => {
    const cur = parseInt($('nsb-guests-display').textContent) || 0;
    const next = cur < 16 ? cur + 1 : 1;
    $('nsb-guests-display').textContent = `${next} guest${next > 1 ? 's' : ''}`;
    state.guests = next;
  });
}

/* ===================== SORT ===================== */
function initSort() {
  $('sort-select').addEventListener('change', e => {
    state.sortBy = e.target.value;
    renderSearchResults();
  });
}

/* ===================== CULTURE TABS ===================== */
function initCultureTabs() {
  $$('.culture-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.culture-tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      state.activeCulture = tab.dataset.culture;
      renderCultureGrid();
    });
  });
}

/* ===================== JOURNEY CARDS ===================== */
function initJourneyCards() {
  $$('.journey-card').forEach(card => {
    card.addEventListener('click', () => {
      $$('.journey-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.activeJourney = card.dataset.journey;
      playAnimation(card.dataset.journey);
    });
  });
}

/* ===================== FILTER PANEL ===================== */
function initFilterPanel() {
  const panel    = $('filter-panel');
  const backdrop = $('filter-backdrop');
  const openBtn  = $('filter-btn');
  const closeBtn = $('filter-close');
  const clearBtn = $('filter-clear');
  const applyBtn = $('filter-apply');
  const minSlider = $('price-min');
  const maxSlider = $('price-max');
  const minDisplay = $('price-min-display');
  const maxDisplay = $('price-max-display');

  function openPanel() {
    panel.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function closePanel() {
    panel.classList.add('hidden');
    document.body.style.overflow = '';
    openBtn.focus();
  }

  openBtn.addEventListener('click', openPanel);
  closeBtn.addEventListener('click', closePanel);
  backdrop.addEventListener('click', closePanel);

  // ESC closes
  panel.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });

  // Price sliders
  minSlider.addEventListener('input', () => {
    if (parseInt(minSlider.value) > parseInt(maxSlider.value) - 100) {
      minSlider.value = parseInt(maxSlider.value) - 100;
    }
    minDisplay.textContent = parseInt(minSlider.value).toLocaleString();
  });
  maxSlider.addEventListener('input', () => {
    if (parseInt(maxSlider.value) < parseInt(minSlider.value) + 100) {
      maxSlider.value = parseInt(minSlider.value) + 100;
    }
    maxDisplay.textContent = parseInt(maxSlider.value).toLocaleString();
  });

  // Bed stepper
  let bedCount = 0;
  $('bed-minus').addEventListener('click', () => {
    if (bedCount > 0) { bedCount--; $('bed-count').textContent = bedCount === 0 ? 'Any' : bedCount; }
  });
  $('bed-plus').addEventListener('click', () => {
    bedCount++;
    $('bed-count').textContent = bedCount;
  });

  // Clear
  clearBtn.addEventListener('click', () => {
    state.filterPriceMin = 0;
    state.filterPriceMax = 5000;
    state.filterBeds     = 0;
    state.filterTypes    = [];
    state.filterAmenities = [];
    minSlider.value = 0;
    maxSlider.value = 5000;
    minDisplay.textContent = '0';
    maxDisplay.textContent = '5,000';
    bedCount = 0;
    $('bed-count').textContent = 'Any';
    $$('.prop-type-cb, .amenity-cb').forEach(cb => { cb.checked = false; });
    updateFilterBadge();
  });

  // Apply
  applyBtn.addEventListener('click', () => {
    state.filterPriceMin  = parseInt(minSlider.value);
    state.filterPriceMax  = parseInt(maxSlider.value);
    state.filterBeds      = bedCount;
    state.filterTypes     = [...$$('.prop-type-cb:checked')].map(cb => cb.value);
    state.filterAmenities = [...$$('.amenity-cb:checked')].map(cb => cb.value);
    closePanel();
    state.homeListingsShown = 8;
    updateFilterBadge();
    if (state.currentPage === 'home') {
      renderHomeListings();
    } else {
      renderSearchResults();
    }
  });
}

/* ===================== FILTER BADGE ===================== */
function updateFilterBadge() {
  const btn = $('filter-btn');
  const activeCount = (state.filterPriceMin > 0 || state.filterPriceMax < 5000 ? 1 : 0)
    + (state.filterBeds > 0 ? 1 : 0)
    + state.filterTypes.length
    + state.filterAmenities.length;

  btn.classList.toggle('has-filters', activeCount > 0);
  const existing = btn.querySelector('.filter-count-badge');
  if (existing) existing.remove();
  if (activeCount > 0) {
    const badge = document.createElement('span');
    badge.className = 'filter-count-badge';
    badge.textContent = activeCount;
    btn.appendChild(badge);
  }
}

/* ===================== BOOKING CARD INTERACTIONS ===================== */
function initBookingCard() {
  // Date changes → recalculate
  $('book-checkin').addEventListener('change', () => {
    const ci = $('book-checkin').value;
    $('book-checkout').min = ci;
    updateBookingBreakdown();
  });
  $('book-checkout').addEventListener('change', updateBookingBreakdown);

  // Guest stepper
  $('guest-minus').addEventListener('click', () => {
    if (state.bookingGuests > 1) {
      state.bookingGuests--;
      $('guest-count').textContent = state.bookingGuests;
    }
  });
  $('guest-plus').addEventListener('click', () => {
    const max = state.currentListing ? state.currentListing.guests : 16;
    if (state.bookingGuests < max) {
      state.bookingGuests++;
      $('guest-count').textContent = state.bookingGuests;
    }
  });

  // Reserve
  $('btn-reserve').addEventListener('click', () => {
    const checkin  = $('book-checkin').value;
    const checkout = $('book-checkout').value;
    if (!checkin || !checkout || checkout <= checkin) {
      showToast('Please select valid check-in and check-out dates.', '#c0392b');
      return;
    }
    const nights = Math.round((new Date(checkout) - new Date(checkin)) / 86400000);
    const listing = state.currentListing;
    // Save to booking history
    const bookings = JSON.parse(localStorage.getItem('zero_bookings') || '[]');
    bookings.push({
      id: listing.id,
      title: listing.title,
      location: listing.location,
      checkin,
      checkout,
      nights,
      guests: state.bookingGuests,
      total: nights * listing.price + Math.round(nights * listing.price * 0.12),
      bookedAt: new Date().toISOString()
    });
    localStorage.setItem('zero_bookings', JSON.stringify(bookings));
    showToast(`🎉 Reservation confirmed for ${nights} night${nights > 1 ? 's' : ''} at ${listing.title}!`, 'var(--green)');
  });

  // Save to wishlist from detail page
  $('btn-save-listing').addEventListener('click', () => {
    if (!state.currentListing) return;
    const id  = state.currentListing.id;
    const btn = $('btn-save-listing');
    const idx = state.wishlist.indexOf(id);
    if (idx === -1) {
      state.wishlist.push(id);
      btn.textContent = '❤️ Saved to Wishlist';
      btn.classList.add('saved');
    } else {
      state.wishlist.splice(idx, 1);
      btn.textContent = '🤍 Save to Wishlist';
      btn.classList.remove('saved');
    }
    localStorage.setItem('zero_wishlist', JSON.stringify(state.wishlist));
  });

  // Back button
  $('btn-back').addEventListener('click', () => {
    window.history.length > 1 ? window.history.back() : navigateTo('home');
  });
  // Also handle browser back if needed
  window.addEventListener('popstate', () => navigateTo('home'));
}

/* ===================== LOAD MORE ===================== */
function initLoadMore() {
  $('btn-load-more').addEventListener('click', () => {
    state.homeListingsShown += 8;
    renderHomeListings();
  });
}

/* ===================== NEWSLETTER ===================== */
function initNewsletter() {
  $('newsletter-form').addEventListener('submit', e => {
    e.preventDefault();
    const email = $('newsletter-email').value.trim();
    const msg   = $('newsletter-msg');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.textContent = 'Please enter a valid email address.';
      msg.style.color = '#e74c3c';
      return;
    }
    msg.textContent = `✅ You're in! We'll send updates to ${email}`;
    msg.style.color = 'var(--gold)';
    $('newsletter-email').value = '';
    setTimeout(() => { msg.textContent = ''; }, 6000);
  });
}

/* ===================== NAV DROPDOWN ===================== */
function initNavDropdown() {
  const btn      = $('btn-nav-menu');
  const dropdown = $('nav-dropdown');

  btn.addEventListener('click', e => {
    e.stopPropagation();
    const isHidden = dropdown.classList.contains('hidden');
    dropdown.classList.toggle('hidden', !isHidden);
    btn.setAttribute('aria-expanded', String(isHidden));
  });
  document.addEventListener('click', () => {
    dropdown.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
  });
  dropdown.addEventListener('click', e => e.stopPropagation());

  // Login/signup placeholders
  $('menu-signup').addEventListener('click', () => {
    showToast('✨ Sign-up coming soon — stay tuned!', 'var(--blue-deep)');
    dropdown.classList.add('hidden');
  });
  $('menu-login').addEventListener('click', () => {
    showToast('👋 Login coming soon — stay tuned!', 'var(--blue-deep)');
    dropdown.classList.add('hidden');
  });
}

/* ===================== LOGO / FOOTER HOME LINKS ===================== */
function initNavLinks() {
  $('nav-logo').addEventListener('click', e => {
    e.preventDefault();
    state.activeCategory = 'all';
    $$('.cat-pill').forEach(p => {
      p.classList.toggle('active', p.dataset.category === 'all');
      p.setAttribute('aria-selected', p.dataset.category === 'all' ? 'true' : 'false');
    });
    navigateTo('home');
  });
  $('footer-search-link').addEventListener('click', () => {
    state.searchQuery = '';
    navigateTo('search');
  });
  $('btn-become-host').addEventListener('click', () => {
    showToast('🏠 Host registration coming soon!', 'var(--purple)');
  });
}

/* ===================== TOAST ===================== */
function showToast(msg, bg = 'var(--green)') {
  const toast = $('reserve-toast');
  const msgEl = $('reserve-toast-msg');
  msgEl.textContent = msg;
  toast.style.background = bg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 4000);
}

/* ===================== SCROLL REVEAL ===================== */
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$('.reveal:not(.visible)').forEach(el => observer.observe(el));
}

/* ===================== STICKY NAVBAR ===================== */
function initStickyNav() {
  const navbar = $('navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 4px 24px rgba(0,0,0,.5)'
      : 'none';
  }, { passive: true });
}

/* ===================== KEYBOARD ACCESSIBILITY ===================== */
function initKeyboardNav() {
  // Close filter with ESC on detail page back button
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!$('filter-panel').classList.contains('hidden')) {
        $('filter-panel').classList.add('hidden');
        document.body.style.overflow = '';
      }
      if (!$('animation-overlay').classList.contains('hidden')) {
        $('animation-overlay').classList.add('hidden');
        $('animation-container').innerHTML = '';
      }
    }
  });
}

/* ===================== MOBILE SEARCH TOGGLE ===================== */
function initMobileSearchToggle() {
  const toggle  = $('nav-search-toggle');
  const bar     = document.querySelector('.nav-search-bar');
  if (!toggle || !bar) return;
  toggle.addEventListener('click', () => {
    const isOpen = bar.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) $('nsb-where-input').focus();
  });
}

/* ===================== BACK TO TOP ===================== */
function initBackToTop() {
  const btn = $('back-to-top');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('hidden', window.scrollY < 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ===================== GUESTS POPOVER ===================== */
function initGuestsPopover() {
  const display  = $('nsb-guests-display');
  const popover  = $('guests-popover');
  let adults = 1, children = 0, infants = 0;

  function updateDisplay() {
    const total = adults + children;
    const parts = [`${total} guest${total !== 1 ? 's' : ''}`];
    if (infants > 0) parts.push(`${infants} infant${infants !== 1 ? 's' : ''}`);
    display.textContent = parts.join(', ');
    state.guests = total;
  }

  function makeStepper(minusId, plusId, getter, setter, min, max) {
    $(minusId).addEventListener('click', e => {
      e.stopPropagation();
      if (getter() > min) { setter(getter() - 1); $(plusId.replace('plus','count').replace('minus','count')); updateDisplay(); }
      const countId = minusId.replace('minus','count');
      $(countId).textContent = getter();
      updateDisplay();
    });
    $(plusId).addEventListener('click', e => {
      e.stopPropagation();
      if (getter() < max) { setter(getter() + 1); }
      const countId = plusId.replace('plus','count');
      $(countId).textContent = getter();
      updateDisplay();
    });
  }

  makeStepper('gp-adult-minus','gp-adult-plus', ()=>adults, v=>{adults=v;}, 1, 16);
  makeStepper('gp-child-minus','gp-child-plus', ()=>children, v=>{children=v;}, 0, 10);
  makeStepper('gp-infant-minus','gp-infant-plus', ()=>infants, v=>{infants=v;}, 0, 5);

  display.addEventListener('click', e => {
    e.stopPropagation();
    popover.classList.toggle('hidden');
  });
  document.addEventListener('click', () => popover.classList.add('hidden'));
  popover.addEventListener('click', e => e.stopPropagation());
}

/* ===================== ACTIVE CAT PILL SYNC ===================== */
function syncCatPills() {
  $$('.cat-pill').forEach(p => {
    const isActive = p.dataset.category === state.activeCategory;
    p.classList.toggle('active', isActive);
    p.setAttribute('aria-selected', String(isActive));
  });
}

/* ===================== PAGE TITLE SYNC ===================== */
function syncPageTitle(page, extra) {
  const titles = {
    home:   'Zero — Where Every Journey Begins',
    search: `Search Results${extra ? ` for "${extra}"` : ''} — Zero`,
    detail: `${extra || 'Listing'} — Zero`
  };
  document.title = titles[page] || titles.home;
}

/* ===================== INIT ===================== */
function init() {
  // Render home grids first
  renderHomeListings();
  renderCultureGrid();

  // Wire up all interactions
  initMobileSearchToggle();
  initBackToTop();
  initGuestsPopover();
  initCatBar();
  initSearchBar();
  initSort();
  initCultureTabs();
  // Culture banner cards also trigger tab filter
  $$('.culture-banner-card').forEach(card => {
    const activate = () => {
      const culture = card.dataset.culture;
      $$('.culture-tab').forEach(t => {
        t.classList.toggle('active', t.dataset.culture === culture);
        t.setAttribute('aria-selected', t.dataset.culture === culture ? 'true' : 'false');
      });
      state.activeCulture = culture;
      renderCultureGrid();
      document.getElementById('culture-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    card.addEventListener('click', activate);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') activate(); });
  });
  initJourneyCards();
  initFilterPanel();
  initBookingCard();
  initLoadMore();
  initNewsletter();
  initNavDropdown();
  initNavLinks();
  initStickyNav();
  initKeyboardNav();
  initReveal();

  // Start on home
  navigateTo('home');
}

document.addEventListener('DOMContentLoaded', init);
