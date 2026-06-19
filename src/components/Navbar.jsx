'use client'

import { useState, useEffect } from 'react'
import { Link, useLocation } from '@/lib/navigation'

const navDropdowns = {
  Domains: [
    { label: 'Register a Domain', to: '/domains/register' },
    { label: 'Transfer a Domain', to: '/domains/transfer' },
  ],
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [location])

  const isActive = (path) => location.pathname === path

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-bg-dark)]/95 backdrop-blur-xl border-b border-[var(--color-border-dark)] py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center no-underline group">
          <img
            src="/images/headericon-white.svg"
            alt="Technical Relief Icon"
            className="h-12 mr-2.5 object-contain"
          />
          <div className="flex flex-col justify-center leading-tight">
            <span className="font-extrabold text-[21px] tracking-tight text-white -mb-px">
              Technical
            </span>
            <span className="font-extrabold text-[21px] tracking-tight text-white">
              Relief
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          <NavLink to="/" active={isActive('/')}>Home</NavLink>
          <NavLink to="/#architecture" active={false}>Architecture</NavLink>

          {Object.entries(navDropdowns).map(([label, items]) => (
            <div key={label} className="relative group">
              <button className="text-[15px] font-medium text-[var(--color-text-light)] hover:text-white transition-colors py-2 cursor-pointer">
                {label}
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[240px] bg-[var(--color-bg-navy)]/98 backdrop-blur-2xl border border-[var(--color-border-dark)] rounded-xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.4)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-250 translate-y-2 group-hover:translate-y-0">
                {items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center px-4 py-3 rounded-lg text-[var(--color-text-light)] hover:bg-[var(--color-bg-card-hover)] hover:text-white transition-all text-sm no-underline"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <NavLink to="/about" active={isActive('/about')}>About</NavLink>
          <NavLink to="/knowledge-base" active={isActive('/knowledge-base')}>Knowledge Base</NavLink>
        </div>

        {/* Right side — CTA + Login */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden lg:inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-[var(--color-text-light)] hover:text-white transition-colors no-underline"
          >
            Login
          </Link>
          <Link
            to="/get-started"
            className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-xl bg-[var(--color-accent)] text-white shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(59,130,246,0.4)] transition-all no-underline"
          >
            Request Architecture Session
          </Link>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-1 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 w-[300px] h-screen bg-[var(--color-bg-navy)] border-l border-[var(--color-border-dark)] flex flex-col pt-20 px-6 pb-6 gap-1 transition-transform duration-400 z-[9999] overflow-y-auto ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <MobileNavLink to="/" active={isActive('/')} onClick={() => setMobileOpen(false)}>Home</MobileNavLink>
        <MobileNavLink to="/#architecture" active={false} onClick={() => setMobileOpen(false)}>Architecture</MobileNavLink>

        {Object.entries(navDropdowns).map(([label, items]) => (
          <div key={label}>
            <button
              className="w-full text-left py-3 px-3 text-[var(--color-text-light)] hover:text-white font-medium text-[15px] transition-colors cursor-pointer"
              onClick={() => setOpenDropdown(openDropdown === label ? null : label)}
            >
              {label} <span className={`inline-block ml-1 transition-transform ${openDropdown === label ? 'rotate-180' : ''}`}>▾</span>
            </button>
            {openDropdown === label && (
              <div className="pl-4 pb-2 flex flex-col gap-1">
                {items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="py-2 px-3 text-sm text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-bg-card-hover)] rounded-lg transition-all no-underline"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        <MobileNavLink to="/about" active={isActive('/about')} onClick={() => setMobileOpen(false)}>About</MobileNavLink>
        <MobileNavLink to="/knowledge-base" active={isActive('/knowledge-base')} onClick={() => setMobileOpen(false)}>Knowledge Base</MobileNavLink>

        <div className="mt-auto pt-6 border-t border-[var(--color-border-dark)] flex flex-col gap-2">
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-full py-3 border border-[var(--color-border-dark)] text-[var(--color-text-light)] font-semibold rounded-xl hover:text-white hover:border-white/20 transition-all no-underline"
          >
            🔑 Login
          </Link>
          <Link
            to="/get-started"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-full py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-all no-underline"
          >
            Request Architecture Session
          </Link>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-[9998]"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </nav>
  )
}

function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`text-[15px] font-medium transition-colors py-2 relative no-underline ${
        active ? 'text-white' : 'text-[var(--color-text-light)] hover:text-white'
      }`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-[var(--color-accent)] transition-all ${
          active ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    </Link>
  )
}

function MobileNavLink({ to, active, onClick, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`py-3 px-3 rounded-lg text-[15px] font-medium transition-all no-underline ${
        active
          ? 'text-white bg-[var(--color-bg-card)]'
          : 'text-[var(--color-text-light)] hover:text-white hover:bg-[var(--color-bg-card-hover)]'
      }`}
    >
      {children}
    </Link>
  )
}
