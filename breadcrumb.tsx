import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useContext } from 'react'
import { CartContext } from '../App'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Music', path: '/music' },
  { label: 'Blog', path: '/blog' },
  { label: 'Shop', path: '/shop' },
  { label: 'Contact Us', path: '/contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { cartCount } = useContext(CartContext)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          height: 64,
          backgroundColor: scrolled ? 'rgba(22,35,56,0.55)' : 'rgba(22,35,56,0.15)',
          backdropFilter: scrolled ? 'blur(30px) saturate(130%)' : 'blur(16px) saturate(120%)',
          WebkitBackdropFilter: scrolled ? 'blur(30px) saturate(130%)' : 'blur(16px) saturate(120%)',
          borderBottom: scrolled ? '1px solid rgba(245,250,255,0.04)' : '1px solid transparent',
        }}
      >
        <div
          className="flex items-center justify-between h-full mx-auto"
          style={{ maxWidth: 1280, padding: '0 clamp(24px, 5vw, 80px)' }}
        >
          <Link
            to="/"
            className="text-white/90 no-underline tracking-widest transition-opacity duration-500 hover:text-white"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 18,
              fontWeight: 300,
              letterSpacing: '0.12em',
            }}
          >
            Aether Hush
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link-underline text-label transition-colors duration-500 no-underline ${
                  location.pathname === link.path
                    ? 'active text-[var(--light-beach)]'
                    : 'text-white/70 hover:text-white/90'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/shop"
              className="relative text-white/60 hover:text-[var(--light-beach)] transition-colors duration-500"
            >
              <ShoppingBag size={17} strokeWidth={1.2} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 flex items-center justify-center text-white rounded-full"
                  style={{
                    width: 14,
                    height: 14,
                    backgroundColor: 'var(--lake-blue)',
                    fontSize: 8,
                    fontWeight: 500,
                    boxShadow: '0 0 8px rgba(44,130,204,0.4)',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors duration-300"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} strokeWidth={1.2} /> : <Menu size={18} strokeWidth={1.2} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
          style={{
            backgroundColor: 'rgba(15, 26, 46, 0.97)',
            backdropFilter: 'blur(40px)',
          }}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-white/80 no-underline"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(24px, 4vw, 36px)',
                fontWeight: 300,
                letterSpacing: '0.02em',
                animationDelay: `${i * 80}ms`,
                animation: 'fade-in-up 0.5s ease-out forwards',
                opacity: 0,
              }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
