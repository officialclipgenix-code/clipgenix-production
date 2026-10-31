import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { siteConfig } from '../config/site'

const copyrightYear = new Date().getFullYear()

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Our work', to: '/portfolio' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
]

export function SiteLayout() {
  const [openMenuPath, setOpenMenuPath] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()
  const location = useLocation()
  const menuOpen = openMenuPath === location.pathname

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMenuPath(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link className="wordmark" to="/" aria-label={`${siteConfig.name} home`}>
            <span className="wordmark__icon" aria-hidden="true">C.</span>
            <span className="wordmark__text">
              <strong>clipgenix</strong>
              <small>production</small>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link className="button button--small header-cta" to="/contact">
            Start a project <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setOpenMenuPath(menuOpen ? null : location.pathname)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation"
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={reduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
            >
              {navigation.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `mobile-nav__link${isActive ? ' is-active' : ''}`}
                  onClick={() => setOpenMenuPath(null)}
                >
                  {item.label}
                </NavLink>
              ))}
              <Link className="button mobile-nav__cta" to="/contact" onClick={() => setOpenMenuPath(null)}>
                Start a project <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <Link className="wordmark wordmark--light" to="/">
                <span className="wordmark__icon" aria-hidden="true">C.</span>
                <span className="wordmark__text">
                  <strong>clipgenix</strong>
                  <small>production</small>
                </span>
              </Link>
              <p>Creative visuals, engaging videos and content for growing brands.</p>
            </div>
            <div className="footer-column">
              <p className="footer-label">Explore</p>
              <Link to="/portfolio">Our work</Link>
              <Link to="/services">Services</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="footer-column footer-column--contact">
              <p className="footer-label">Get in touch</p>
              {siteConfig.contactEmail ? (
                <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
              ) : (
                <span className="footer-unconfigured">Email details coming soon</span>
              )}
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {copyrightYear} {siteConfig.name}. All rights reserved.</span>
            <span>Independent creative production studio</span>
          </div>
        </div>
      </footer>
    </>
  )
}
