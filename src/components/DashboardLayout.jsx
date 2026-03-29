'use client'

import { useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from '@/lib/navigation'
import { useAuth } from '../context/AuthContext'
import OnboardingTour from './OnboardingTour'

// ═══════════════════════════════════════════════════════
// SIDEBAR SECTIONS — Categorised with collapsible dropdowns
// ═══════════════════════════════════════════════════════

const sidebarSections = [
  {
    // Top-level link (always visible, no dropdown)
    type: 'link',
    to: '/dashboard',
    label: 'Overview',
    icon: '📊',
  },
  {
    type: 'dropdown',
    label: 'Hosting & Infrastructure',
    icon: '🖥️',
    links: [
      { to: '/dashboard/infrastructure', label: 'Infrastructure', icon: '🏗️' },
      { to: '/dashboard/services', label: 'Services', icon: '📦' },
      { to: '/dashboard/configure', label: 'Configure', icon: '⚙️' },
    ],
  },
  {
    type: 'dropdown',
    label: 'Billing & Payments',
    icon: '💳',
    links: [
      { to: '/dashboard/billing', label: 'Invoices', icon: '🧾' },
      { to: '/dashboard/wallet', label: 'Wallet', icon: '💰' },
      { to: '/dashboard/subscriptions', label: 'Subscriptions', icon: '🔄' },
      { to: '/dashboard/reports', label: 'Reports', icon: '📈' },
      { to: '/dashboard/transparency', label: 'Cost Breakdown', icon: '🔍' },
    ],
  },
  {
    type: 'dropdown',
    label: 'Projects & Dev',
    icon: '🚀',
    links: [
      { to: '/dashboard/projects', label: 'Projects', icon: '📋' },
      { to: '/dashboard/marketplace', label: 'Marketplace', icon: '🛒' },
    ],
  },
  {
    type: 'dropdown',
    label: 'Support & Settings',
    icon: '🎫',
    links: [
      { to: '/dashboard/support', label: 'Support Tickets', icon: '🎫' },
      { to: '/dashboard/settings', label: 'Account Settings', icon: '🔧' },
    ],
  },
]

// Flatten links for mobile nav
const allLinks = sidebarSections.flatMap((s) =>
  s.type === 'link' ? [{ to: s.to, icon: s.icon }] : s.links.map((l) => ({ to: l.to, icon: l.icon }))
)

const quickLinks = [
  { label: 'DirectAdmin', href: process.env.NEXT_PUBLIC_DIRECTADMIN_URL || 'https://server.technicalrelief.co.za:2222', icon: '🖥️' },
  { label: 'Gmail', href: 'https://mail.google.com', icon: '📧' },
]

// ═══════════════════════════════════════════════════════
// COLLAPSIBLE SIDEBAR SECTION
// ═══════════════════════════════════════════════════════

function SidebarDropdown({ section, isOpen, onToggle }) {
  const location = useLocation()
  const hasActiveChild = section.links.some((l) => location.pathname === l.to)

  return (
    <div>
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer border-0 ${
          hasActiveChild
            ? 'bg-[var(--color-accent)]/5 text-white'
            : 'text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-bg-card-hover)]'
        }`}
        style={{ background: hasActiveChild ? 'rgba(59,130,246,0.05)' : undefined }}
      >
        <span className="text-lg">{section.icon}</span>
        <span className="flex-1 text-left">{section.label}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 opacity-40 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Collapsible child links */}
      <div
        className="overflow-hidden transition-all duration-200"
        style={{
          maxHeight: isOpen ? `${section.links.length * 48}px` : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="ml-4 pl-3 border-l border-[var(--color-border-dark)] mt-1 mb-1">
          {section.links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all no-underline ${
                  isActive
                    ? 'bg-[var(--color-accent)]/10 text-white'
                    : 'text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-bg-card-hover)]'
                }`
              }
            >
              <span className="text-sm">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// DASHBOARD LAYOUT
// ═══════════════════════════════════════════════════════

export default function DashboardLayout({ children }) {
  const { user, logout, isFirebaseAuth, justRegistered, clearJustRegistered } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Track which dropdown sections are open
  const [openSections, setOpenSections] = useState(() => {
    // Auto-open the section that contains the current route
    const initial = {}
    sidebarSections.forEach((section, i) => {
      if (section.type === 'dropdown') {
        const hasActiveChild = section.links.some((l) => location.pathname === l.to)
        initial[i] = hasActiveChild
      }
    })
    return initial
  })

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleTourComplete = () => {
    clearJustRegistered()
  }

  const displayName = user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email : 'User'
  const initials = displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] bg-[var(--color-bg-navy)] border-r border-[var(--color-border-dark)] fixed left-0 top-0 bottom-0 z-40">
        {/* Logo */}
        <div className="p-6 border-b border-[var(--color-border-dark)]">
          <Link to="/" className="flex items-center no-underline">
            <img src="/images/headericon-white.svg" alt="Technical Relief" className="h-10 mr-2 object-contain" />
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold text-[17px] text-white">Technical</span>
              <span className="font-extrabold text-[17px] text-white">Relief</span>
            </div>
          </Link>
        </div>

        {/* Admin / My Account Toggle (only for admin user) */}
        {user?.id === 'client-001' && (
          <div className="px-3 pt-4 pb-2">
            <div className="bg-[var(--color-bg-dark)] rounded-xl p-1 flex">
              <button
                onClick={() => navigate('/admin')}
                className="flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer border-0 bg-transparent text-[var(--color-text-muted)] hover:text-white"
              >
                🛡️ Admin Panel
              </button>
              <button
                className="flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer border-0 bg-[var(--color-accent)]/15 text-[var(--color-accent-light)]"
              >
                👤 My Account
              </button>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 flex flex-col gap-0.5 overflow-y-auto" data-tour-id="sidebar-nav">
          {sidebarSections.map((section, si) => {
            if (section.type === 'link') {
              return (
                <NavLink
                  key={section.to}
                  to={section.to}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all no-underline ${
                      isActive
                        ? 'bg-[var(--color-accent)]/10 text-white border border-[var(--color-accent)]/20'
                        : 'text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-bg-card-hover)]'
                    }`
                  }
                >
                  <span className="text-lg">{section.icon}</span>
                  {section.label}
                </NavLink>
              )
            }

            return (
              <SidebarDropdown
                key={si}
                section={section}
                isOpen={!!openSections[si]}
                onToggle={() => toggleSection(si)}
              />
            )
          })}

          {/* Divider */}
          <div className="my-3 mx-4 border-t border-[var(--color-border-dark)]" />

          {/* Quick Links */}
          <div className="px-4 mb-2" data-tour-id="quick-links">
            <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--color-text-muted)]">Quick Links</span>
          </div>
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-bg-card-hover)] transition-all no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
              <span className="ml-auto text-xs opacity-50">↗</span>
            </a>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-[var(--color-border-dark)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)] font-bold text-xs flex items-center justify-center flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="text-white text-sm font-medium truncate">{displayName}</div>
              <div className="text-[var(--color-text-muted)] text-xs truncate">{user?.email || ''}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 rounded-lg transition-all cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[260px]">
        {/* Top header (mobile) */}
        <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-[var(--color-bg-navy)] border-b border-[var(--color-border-dark)] sticky top-0 z-30">
          <Link to="/" className="flex items-center no-underline">
            <img src="/images/headericon-white.svg" alt="Logo" className="h-8 mr-2 object-contain" />
            <span className="font-extrabold text-[17px] text-white">TR</span>
          </Link>
          <div className="flex items-center gap-3">
            {allLinks.slice(0, 8).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/dashboard'}
                className={({ isActive }) =>
                  `text-lg p-2 rounded-lg transition-all no-underline ${isActive ? 'bg-[var(--color-accent)]/10' : 'opacity-60 hover:opacity-100'}`
                }
              >
                {link.icon}
              </NavLink>
            ))}
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-10">
          {children}
        </main>

        {/* Onboarding tour overlay — only after fresh registration */}
        {justRegistered && isFirebaseAuth && (
          <OnboardingTour onComplete={handleTourComplete} />
        )}
      </div>
    </div>
  )
}
