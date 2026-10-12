import { Link, Outlet, useLocation } from "react-router"
import Nav from "../components/Nav"
import Icon from "../components/Icon"
import useReveal from "../hooks/useReveal"
import "./RootLayout.css"

export default function RootLayout() {
  const { pathname } = useLocation()
  useReveal(pathname)

  return (
    <>
      {/* Layer 1 — ambient mesh orbs */}
      <div className="ambient" aria-hidden="true">
        <span className="ambient__orb ambient__orb--terracotta" />
        <span className="ambient__orb ambient__orb--sage" />
        <span className="ambient__orb ambient__orb--saffron" />
      </div>

      {/* Layer 2 — fixed film grain */}
      <div className="grain" aria-hidden="true" />

      {/* Sentinel for the nav shrink (avoids a scroll listener) */}
      <div className="top-sentinel" aria-hidden="true" />

      <Nav />

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="shell">
          <div className="footer__top" data-reveal>
            <span className="eyebrow">Salvia Kitchen</span>
            <h2 className="display-lg footer__cta">
              Cook something <em className="italic">worth remembering.</em>
            </h2>
            <Link to="/recipes" className="btn btn--terracotta">
              Browse the collection
              <span className="btn__icon">
                <Icon name="arrow-up-right" size={16} />
              </span>
            </Link>
          </div>

          <div className="footer__grid">
            <div className="footer__brand" data-reveal>
              <span className="footer__mark">
                <Icon name="leaf" size={18} />
              </span>
              <p className="muted">
                Recipes measured, tested and written for people who love to make food at home.
              </p>
            </div>

            <nav className="footer__col" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
              <h4>Explore</h4>
              <ul>
                <li><Link to="/recipes">All recipes</Link></li>
                <li><Link to="/">This week&rsquo;s table</Link></li>
                <li><Link to="/about">Our story</Link></li>
              </ul>
            </nav>

            <nav className="footer__col" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
              <h4>Kitchen</h4>
              <ul>
                <li><Link to="/recipes">Seasonal</Link></li>
                <li><Link to="/recipes">Weeknight</Link></li>
                <li><Link to="/recipes">Slow Sunday</Link></li>
              </ul>
            </nav>

            <nav className="footer__col" data-reveal style={{ "--d": "240ms" } as React.CSSProperties}>
              <h4>Follow</h4>
              <ul>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Pinterest</a></li>
                <li><a href="#">Newsletter</a></li>
              </ul>
            </nav>
          </div>

          <div className="footer__bottom">
            <span>&copy; {new Date().getFullYear()} Salvia Kitchen</span>
            <span className="footer__bottom-note">Made with care, one plate at a time.</span>
          </div>
        </div>
      </footer>
    </>
  )
}
