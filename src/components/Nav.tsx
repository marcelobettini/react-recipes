import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router"
import Icon from "./Icon"
import "./Nav.css"

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/recipes", label: "Recipes", end: false },
  { to: "/about", label: "About", end: false },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  // Close the overlay whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Lock scroll while the fullscreen menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Esc closes the menu.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  // Shrink the pill once the page scrolls — observed via a sentinel element
  // at the top of the document rather than a scroll listener.
  useEffect(() => {
    const sentinel = document.querySelector(".top-sentinel")
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav__pill">
          <Link to="/" className="nav__brand" aria-label="Salvia — home">
            <span className="nav__mark">
              <Icon name="leaf" size={16} />
            </span>
            <span className="nav__word">Salvia</span>
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `nav__link ${isActive ? "is-active" : ""}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav__actions">
            <Link to="/recipes" className="btn btn--sm nav__cta">
              Explore
              <span className="btn__icon">
                <Icon name="arrow-up-right" size={15} />
              </span>
            </Link>

            <button
              type="button"
              className={`nav__burger ${open ? "is-open" : ""}`}
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`nav-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav className="nav-overlay__nav" aria-label="Menu">
          {LINKS.map((link, index) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className="nav-overlay__link"
              style={{ "--d": `${140 + index * 90}ms` } as React.CSSProperties}
              tabIndex={open ? 0 : -1}
            >
              <span className="nav-overlay__index">0{index + 1}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div
          className="nav-overlay__footer"
          style={{ "--d": `${140 + LINKS.length * 90}ms` } as React.CSSProperties}
        >
          <div>
            <span className="nav-overlay__label">Visit</span>
            <p>14 Rue des Herbes, Lyon</p>
          </div>
          <div>
            <span className="nav-overlay__label">Write</span>
            <p>hello@salvia.kitchen</p>
          </div>
          <div className="nav-overlay__socials">
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Pinterest">Pinterest</a>
          </div>
        </div>
      </div>
    </>
  )
}
