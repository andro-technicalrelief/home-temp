import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const footerLinks = {
  Services: [
    { label: 'Managed Hosting', to: '/hosting' },
    { label: 'Linux VPS Hosting', to: '/vps' },
    { label: 'Domain Registration', to: '/domains/register' },
    { label: 'Domain Transfer', to: '/domains/transfer' },
    { label: 'Pricing', to: '/pricing' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Knowledge Base', to: '/knowledge-base' },
    { label: 'Client Area', to: '/login' },
    { label: 'Support', to: '/dashboard/support' },
  ],
  Legal: [
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'SLA', href: '#' },
    { label: 'Acceptable Use', href: '#' },
  ],
}

export default function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      {/* Scroll-to-top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] text-white flex items-center justify-center cursor-pointer hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-300 shadow-lg ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        ↑
      </button>

      <footer className="bg-[var(--color-bg-dark)] border-t border-[var(--color-border-dark)] pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <Link to="/" className="flex items-center no-underline mb-4">
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
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-4">
                Premium managed hosting and full-stack development services. Everything is set up and managed for you — enterprise-grade infrastructure with engineering discipline.
              </p>
              <div className="flex items-center gap-2 text-[var(--color-success)] text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
                All Systems Operational
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h5 className="text-white font-semibold text-lg mb-4">{title}</h5>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.to ? (
                        <Link
                          to={link.to}
                          className="text-[var(--color-text-muted)] hover:text-white text-sm transition-colors no-underline hover:translate-x-1 inline-block"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-[var(--color-text-muted)] hover:text-white text-sm transition-colors no-underline"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[var(--color-border-dark)] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[var(--color-text-muted)] text-sm">
              © {new Date().getFullYear()} Technical Relief. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-[var(--color-text-muted)] hover:text-white text-sm transition-colors no-underline">Terms</a>
              <a href="#" className="text-[var(--color-text-muted)] hover:text-white text-sm transition-colors no-underline">Privacy</a>
              <a href="#" className="text-[var(--color-text-muted)] hover:text-white text-sm transition-colors no-underline">SLA</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
