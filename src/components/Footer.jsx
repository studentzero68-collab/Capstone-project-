export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-grid">
        <div>
          <div className="footer-brand" style={{ background: 'var(--gradient-sunset)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Zero
          </div>
          <p className="footer-tagline">Where every journey begins 🌍</p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/search">Browse stays</a></li>
            <li><a href="/search?cat=treehouse">Treehouses</a></li>
            <li><a href="/search?cat=beach">Beach spots</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Hosting</h4>
          <ul>
            <li><a href="/admin">Host dashboard</a></li>
            <li><a href="#">List your space</a></li>
            <li><a href="#">Host resources</a></li>
            <li><a href="#">Community forum</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help centre</a></li>
            <li><a href="#">Cancellation policy</a></li>
            <li><a href="#">Safety</a></li>
            <li><a href="#">Contact us</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Zero · Built with 💜 in South Africa</span>
        <div className="footer-socials">
          {['𝕏', 'IG', 'TT', 'YT'].map(s => (
            <a key={s} href="#" className="footer-social" aria-label={`Zero on ${s}`}>{s}</a>
          ))}
        </div>
        <span>
          <a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Sitemap</a>
        </span>
      </div>
    </footer>
  )
}
