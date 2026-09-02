/**
 * HomePage.jsx
 * Rubric sections covered:
 *  - Hero Banner
 *  - Journey / "What's your vibe?" cards with animations
 *  - Featured listings grid with sort + filter
 *  - Discover Zero Experiences
 *  - Inspiration for your next trip (location cards)
 *  - Things to do on your trip (static CTA + bg image)
 *  - Things to do at home (static CTA + bg image)
 *  - ShopZero section (2-col: title+button | gift card image)
 *  - Inspiration for future getaways (static tabs + list)
 *  - Culture section (Japanese / Korean / South African tabs)
 *  - Why Zero
 *  - Newsletter
 *  - Static Footer (in Footer.jsx)
 */
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { LISTINGS, JOURNEY_CARDS } from '../data/listings'
import ListingCard from '../components/ListingCard'
import FilterPanel from '../components/FilterPanel'
import AnimationOverlay from '../components/AnimationOverlay'

// ── Static inspiration destinations ─────────────────────────────
const INSPIRATION_TRIPS = [
  { city:'Cape Town',     country:'South Africa', img:'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&q=70', type:'Beach & Mountains' },
  { city:'Knysna',        country:'Western Cape',  img:'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&q=70', type:'Forest & Lagoon'   },
  { city:'Johannesburg',  country:'Gauteng',       img:'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400&q=70', type:'Urban Culture'    },
  { city:'Kruger Park',   country:'Limpopo',       img:'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&q=70', type:'Safari & Wildlife'},
  { city:'Durban',        country:'KwaZulu-Natal',  img:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70', type:'Beaches & Surf'  },
  { city:'Magaliesberg',  country:'North West',    img:'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400&q=70', type:'Treehouses & Sky' },
]

// ── Static experiences ────────────────────────────────────────────
const EXPERIENCES = [
  { title:'Treehouse Sunrise Yoga',     host:'Thabo M.', rating:4.97, reviews:87,  price:320,  img:'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=70', duration:'2 hrs' },
  { title:'Braai Master Class',          host:'Mama Rose', rating:4.95, reviews:143, price:450,  img:'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400&q=70', duration:'3 hrs' },
  { title:'Karoo Stargazing Night',      host:'Dirk V.',  rating:4.98, reviews:62,  price:280,  img:'https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=400&q=70', duration:'4 hrs' },
  { title:'Matcha Ceremony & Mindfulness',host:'Aiko T.', rating:4.92, reviews:55,  price:380,  img:'https://images.unsplash.com/photo-1545579133-99bb5ad189be?w=400&q=70', duration:'2 hrs' },
]

// ── Future getaway tabs + content ────────────────────────────────
const GETAWAY_TABS = ['Romantic Escapes', 'Family Adventures', 'Solo Quests', 'Friend Trips']
const GETAWAY_CONTENT = {
  'Romantic Escapes': [
    { city:'Franschhoek',    img:'https://images.unsplash.com/photo-1545579133-99bb5ad189be?w=300&q=70', nights:'3 nights from R2,400/night' },
    { city:'Magaliesberg',   img:'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=300&q=70', nights:'2 nights from R2,100/night' },
    { city:'Knysna Forest',  img:'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&q=70', nights:'3 nights from R1,850/night' },
    { city:'Winelands',      img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=70', nights:'2 nights from R1,400/night' },
  ],
  'Family Adventures': [
    { city:'Sodwana Bay',    img:'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=300&q=70', nights:'5 nights from R750/night' },
    { city:'Kruger Park',   img:'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=300&q=70', nights:'4 nights from R850/night' },
    { city:'Soweto',        img:'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=300&q=70', nights:'3 nights from R600/night' },
    { city:'Durban Beachfront', img:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=70', nights:'4 nights from R950/night' },
  ],
  'Solo Quests': [
    { city:'Newtown, Joburg', img:'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&q=70', nights:'2 nights from R1,600/night' },
    { city:'Salt River, CT', img:'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&q=70', nights:'3 nights from R1,250/night' },
    { city:'Hatfield, Pta',  img:'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&q=70', nights:'2 nights from R650/night' },
    { city:'Matjiesfontein', img:'https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=300&q=70', nights:'5 nights from R850/night' },
  ],
  'Friend Trips': [
    { city:'Fourways, Joburg', img:'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=300&q=70', nights:'3 nights from R780/night' },
    { city:'Maboneng',        img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=70', nights:'2 nights from R1,100/night' },
    { city:'Muizenberg',      img:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=70', nights:'4 nights from R950/night' },
    { city:'Braamfontein',    img:'https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=300&q=70', nights:'3 nights from R1,700/night' },
  ],
}

const CULTURE_TABS = [
  { id:'all',          label:'All Cultures'  },
  { id:'japanese',     label:'Japanese'      },
  { id:'korean',       label:'Korean'        },
  { id:'southafrican', label:'South African' },
]

export default function HomePage({
  activeCategory,
  filters, setFilters,
  filterOpen, setFilterOpen,
  sortBy, setSortBy,
  wishlist, toggleWishlist,
  handleSearch,
}) {
  const navigate        = useNavigate()
  const [activeCulture, setActiveCulture]   = useState('all')
  const [shown, setShown]                   = useState(8)
  const [animation, setAnimation]           = useState(null)
  const [activeJourney, setActiveJourney]   = useState(null)
  const [activeGetaway, setActiveGetaway]   = useState('Romantic Escapes')
  const [email, setEmail]                   = useState('')
  const [newsletterMsg, setNewsletterMsg]   = useState('')

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  })

  const getFiltered = useCallback(() =>
    LISTINGS.filter(l => {
      const catMatch   = activeCategory === 'all' || l.category === activeCategory
      const priceMatch = l.price >= filters.priceMin && l.price <= filters.priceMax
      const bedsMatch  = filters.beds === 0 || l.beds >= filters.beds
      const typesMatch = filters.types.length === 0 || filters.types.includes(l.category)
      const amenMatch  = filters.amenities.length === 0 ||
        filters.amenities.every(a => l.amenities.map(x=>x.toLowerCase()).some(x=>x.includes(a)))
      return catMatch && priceMatch && bedsMatch && typesMatch && amenMatch
    }),
  [activeCategory, filters])

  const getSorted = arr => {
    const c = [...arr]
    if (sortBy==='price-asc')  return c.sort((a,b)=>a.price-b.price)
    if (sortBy==='price-desc') return c.sort((a,b)=>b.price-a.price)
    if (sortBy==='rating')     return c.sort((a,b)=>b.rating-a.rating)
    return c
  }

  const filtered  = getSorted(getFiltered())
  const displayed = filtered.slice(0, shown)
  const cultureListings = LISTINGS.filter(l =>
    (activeCulture==='all' && l.culture) || l.culture===activeCulture
  )

  const handleJourney = card => {
    setActiveJourney(card.id)
    setAnimation({ type: card.animType, label: card.label })
  }

  const handleNewsletter = e => {
    e.preventDefault()
    if (!email || !email.includes('@')) { setNewsletterMsg('Please enter a valid email address.'); return }
    setNewsletterMsg("You're in. Welcome to the Zero family.")
    setEmail('')
    setTimeout(() => setNewsletterMsg(''), 4000)
  }

  return (
    <main id="main-content">

      {animation && (
        <AnimationOverlay animType={animation.type} label={animation.label} onDone={() => setAnimation(null)} />
      )}
      {filterOpen && (
        <FilterPanel filters={filters} setFilters={setFilters} onClose={() => setFilterOpen(false)} />
      )}

      {/* ══════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════ */}
      <section className="hero" aria-label="Hero banner">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-content">
          <h1 className="hero-title">Start at <em>Zero</em></h1>
          <p className="hero-subtitle">
            Treehouses · Beach shacks · Garage lofts · Studio dens · Cultural retreats across South Africa
          </p>
          <div className="hero-cta-row">
            <button className="btn-hero" onClick={handleSearch}>Explore stays</button>
            <button className="btn-hero btn-hero-outline"
              onClick={() => document.getElementById('journey-section')?.scrollIntoView({ behavior:'smooth' })}>
              What's your vibe?
            </button>
          </div>
        </div>
        <div className="hero-scroll-hint" aria-hidden="true"><span /></div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. INSPIRATION FOR YOUR NEXT TRIP
      ══════════════════════════════════════════════════════ */}
      <section className="inspiration-section" aria-label="Inspiration for your next trip">
        <div className="section-header reveal">
          <h2 className="section-title">Inspiration for your next trip</h2>
          <p className="section-sub">Discover South Africa's most unique destinations</p>
        </div>
        <div className="inspiration-grid">
          {INSPIRATION_TRIPS.map(dest => (
            <button
              key={dest.city}
              className="inspiration-card reveal"
              onClick={() => { handleSearch() }}
              aria-label={`Explore ${dest.city}`}
            >
              <img src={dest.img} alt={dest.city} loading="lazy" />
              <div className="inspiration-card-body">
                <p className="inspiration-city">{dest.city}</p>
                <p className="inspiration-country">{dest.country}</p>
                <p className="inspiration-type">{dest.type}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. JOURNEY / VIBE SELECTOR
      ══════════════════════════════════════════════════════ */}
      <section className="journey-section reveal" id="journey-section" aria-label="Journey types">
        <div className="section-header">
          <h2 className="section-title">What's your journey?</h2>
          <p className="section-sub">Pick your vibe and let the adventure find you</p>
        </div>
        <div className="journey-cards" role="list">
          {JOURNEY_CARDS.map(card => (
            <div key={card.id}
              className={`journey-card reveal${activeJourney===card.id?' active':''}`}
              role="listitem" tabIndex={0}
              onClick={() => handleJourney(card)}
              onKeyDown={e => e.key==='Enter' && handleJourney(card)}
              aria-label={`Select: ${card.title}`}>
              <div className="journey-card-icon" aria-hidden="true">
                {card.id==='romantic' && <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--rose)"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>}
                {card.id==='friends'  && <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--blue-light)"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>}
                {card.id==='family'   && <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--orange)"><path d="M10 3L3 8v12h6v-6h2v6h6V8z"/></svg>}
                {card.id==='solo'     && <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--purple-light)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>}
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. DISCOVER ZERO EXPERIENCES
      ══════════════════════════════════════════════════════ */}
      <section className="experiences-section" aria-label="Discover Zero Experiences">
        <div className="section-header reveal">
          <h2 className="section-title">Discover Zero Experiences</h2>
          <p className="section-sub">More than a place to stay — a memory to keep</p>
        </div>
        <div className="experiences-grid">
          {EXPERIENCES.map(exp => (
            <div key={exp.title} className="experience-card reveal">
              <div className="experience-img-wrap">
                <img src={exp.img} alt={exp.title} loading="lazy" />
                <span className="experience-duration">{exp.duration}</span>
              </div>
              <div className="experience-body">
                <p className="experience-host">Hosted by {exp.host}</p>
                <h3 className="experience-title">{exp.title}</h3>
                <div className="experience-meta">
                  <span className="card-rating">
                    <span aria-hidden="true">*</span> {exp.rating}
                    <span style={{ color:'var(--text-dim)', fontSize:'.8rem' }}>({exp.reviews})</span>
                  </span>
                  <span style={{ color:'var(--text-dim)', fontSize:'.82rem' }}>From R{exp.price}/person</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. FEATURED LISTINGS GRID
      ══════════════════════════════════════════════════════ */}
      <section className="listings-section" aria-label="Featured stays" id="listings">
        <div className="section-header reveal">
          <h2 className="section-title">Featured Stays</h2>
          <p className="section-sub">Every space has a story — find yours</p>
        </div>
        <div style={{ display:'flex', justifyContent:'flex-end', maxWidth:1440, margin:'0 auto', padding:'0 1.5rem 1rem', gap:'.5rem', alignItems:'center' }}>
          <span style={{ fontSize:'.85rem', color:'var(--text-dim)' }}>Sort by:</span>
          <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)} aria-label="Sort listings">
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
        <div className="listings-grid" role="list">
          {displayed.length===0
            ? <p className="no-results">No stays match your filters. Try adjusting them.</p>
            : displayed.map(l => (
                <ListingCard key={l.id} listing={l} wishlist={wishlist} toggleWishlist={toggleWishlist} />
              ))
          }
        </div>
        {filtered.length > shown && (
          <div className="load-more-wrap">
            <button className="btn-load-more" onClick={() => setShown(s=>s+6)}>Show more stays</button>
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════════════════
          6. THINGS TO DO ON YOUR TRIP
      ══════════════════════════════════════════════════════ */}
      <section className="things-section" aria-label="Things to do on your trip">
        <div className="things-card"
          style={{ backgroundImage:'url(https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=70)' }}>
          <div className="things-overlay">
            <h2 className="things-title">Things to do<br />on your trip</h2>
            <p className="things-sub">Safaris, braais, ocean dives, marimba sessions — curated activities at every Zero destination.</p>
            <button className="btn-hero" onClick={handleSearch}>Explore activities</button>
          </div>
        </div>
        <div className="things-card"
          style={{ backgroundImage:'url(https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=70)' }}>
          <div className="things-overlay">
            <h2 className="things-title">Things to do<br />at home</h2>
            <p className="things-sub">Online experiences, virtual braais, matcha ceremonies — bring the Zero vibe to your living room.</p>
            <button className="btn-hero" onClick={handleSearch}>Explore online</button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. SHOPZERO SECTION (2-col: title+button | image)
      ══════════════════════════════════════════════════════ */}
      <section className="shopzero-section" aria-label="ShopZero gift cards">
        <div className="shopzero-inner">
          <div className="shopzero-left">
            <h2 className="shopzero-title">Give the gift<br />of Zero</h2>
            <p className="shopzero-sub">
              Send a Zero Gift Card to someone you love. Good for any stay, any time —
              because every journey deserves the best beginning.
            </p>
            <button className="btn-hero" style={{ marginTop:'1.5rem' }}>
              Shop gift cards
            </button>
          </div>
          <div className="shopzero-right">
            <div className="shopzero-card-stack">
              {['#7b2d8b','#0f3460','#e67e22'].map((bg, i) => (
                <div key={bg} className="shopzero-gift-card" style={{
                  background: `linear-gradient(135deg, ${bg}, ${bg}99)`,
                  transform: `rotate(${(i-1)*8}deg) translateX(${(i-1)*12}px)`,
                  zIndex: 3-i,
                }}>
                  <span style={{ fontFamily:'var(--font-heading)', fontStyle:'italic', fontSize:'1.5rem', color:'#fff' }}>Zero</span>
                  <span style={{ fontFamily:'var(--font-accent)', fontSize:'.75rem', color:'rgba(255,255,255,.7)' }}>Gift Card</span>
                  <div style={{ marginTop:'auto', fontFamily:'var(--font-accent)', fontSize:'1.1rem', color:'#fff' }}>
                    {['R500','R1,000','R2,000'][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. INSPIRATION FOR FUTURE GETAWAYS (tabs + list)
      ══════════════════════════════════════════════════════ */}
      <section className="getaways-section" aria-label="Inspiration for future getaways">
        <div className="section-header reveal">
          <h2 className="section-title">Inspiration for future getaways</h2>
          <p className="section-sub">Start dreaming about where Zero takes you next</p>
        </div>
        <div className="culture-tabs" style={{ marginBottom:'2rem' }} role="tablist">
          {GETAWAY_TABS.map(tab => (
            <button key={tab}
              className={`culture-tab${activeGetaway===tab?' active':''}`}
              role="tab" aria-selected={activeGetaway===tab}
              onClick={() => setActiveGetaway(tab)}>
              {tab}
            </button>
          ))}
        </div>
        <div className="getaways-grid">
          {(GETAWAY_CONTENT[activeGetaway]||[]).map(item => (
            <button key={item.city} className="getaway-card reveal" onClick={handleSearch}>
              <img src={item.img} alt={item.city} loading="lazy" />
              <div className="getaway-card-body">
                <p className="getaway-city">{item.city}</p>
                <p className="getaway-nights">{item.nights}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. CULTURE SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="culture-section" aria-label="Cultural experiences" id="culture">
        <div className="section-header reveal">
          <h2 className="section-title">Stay in the Culture</h2>
          <p className="section-sub">Japanese zen · Korean warmth · South African spirit</p>
        </div>
        <div className="culture-tabs" role="tablist">
          {CULTURE_TABS.map(t => (
            <button key={t.id}
              className={`culture-tab${activeCulture===t.id?' active':''}`}
              role="tab" aria-selected={activeCulture===t.id}
              onClick={() => setActiveCulture(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="listings-grid" role="list">
          {cultureListings.length===0
            ? <p className="no-results">No listings found for this culture.</p>
            : cultureListings.map(l => (
                <ListingCard key={l.id} listing={l} wishlist={wishlist} toggleWishlist={toggleWishlist} />
              ))
          }
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          10. WHY ZERO
      ══════════════════════════════════════════════════════ */}
      <section className="why-section" aria-label="Why choose Zero" id="why">
        <div className="section-header reveal">
          <h2 className="section-title">Why Zero?</h2>
          <p className="section-sub">Because everyone deserves a first-class journey</p>
        </div>
        <div className="why-grid">
          {[
            { title:'Open to All',    desc:"You don't have to be rich to explore the world. Zero is built for the everyday adventurer.",
              svg:<svg width="36" height="36" viewBox="0 0 24 24" fill="var(--blue-light)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg> },
            { title:'Real Spaces',    desc:'No cookie-cutter hotels. Just real people, real stories, and real spaces with soul.',
              svg:<svg width="36" height="36" viewBox="0 0 24 24" fill="var(--purple-light)"><path d="M10 3L3 8v12h6v-6h2v6h6V8z"/></svg> },
            { title:'Safe & Verified',desc:'Every listing is verified. Every host is screened. Every stay is guaranteed.',
              svg:<svg width="36" height="36" viewBox="0 0 24 24" fill="var(--green)"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg> },
            { title:'Fresh Starts',   desc:'Zero means beginnings. Every trip is a chance to reset, discover, and grow.',
              svg:<svg width="36" height="36" viewBox="0 0 24 24" fill="var(--orange)"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg> },
          ].map(c => (
            <div key={c.title} className="why-card reveal">
              <div className="why-icon" aria-hidden="true">{c.svg}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          11. NEWSLETTER
      ══════════════════════════════════════════════════════ */}
      <section className="newsletter-section" aria-label="Newsletter signup" id="newsletter">
        <div className="newsletter-inner">
          <h2 className="newsletter-title">Stay in the loop</h2>
          <p>New spots, exclusive deals, and Zero stories — straight to your inbox.</p>
          <form className="newsletter-form" onSubmit={handleNewsletter} noValidate>
            <input type="email" placeholder="your@email.com" value={email}
              onChange={e => setEmail(e.target.value)} aria-label="Your email address" required />
            <button type="submit" className="btn-newsletter">Subscribe</button>
          </form>
          {newsletterMsg && <p className="newsletter-msg" role="status">{newsletterMsg}</p>}
        </div>
      </section>

    </main>
  )
}
