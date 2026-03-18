import { useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// ═══════════════════════════════════════════════════════
// ADMIN SIDEBAR — all links stay within /admin/*
// Toggle at top switches between Admin Panel and My Account
// ═══════════════════════════════════════════════════════

const sidebarSections = [
  {
    type: 'link',
    to: '/admin',
    label: 'Dashboard',
    icon: '📊',
  },
  {
    type: 'dropdown',
    label: 'Client Management',
    icon: '👥',
    links: [
      { to: '/admin/clients', label: 'All Clients', icon: '📋' },
    ],
  },
  {
    type: 'dropdown',
    label: 'Support',
    icon: '🎫',
    links: [
      { to: '/admin/tickets', label: 'Ticket Queue', icon: '📬' },
    ],
  },
  {
    type: 'dropdown',
    label: 'Platform',
    icon: '🛠️',
    links: [
      { to: '/admin/infrastructure', label: 'Servers', icon: '🏗️' },
      { to: '/admin/reports', label: 'Reports', icon: '📈' },
      { to: '/admin/transparency', label: 'Cost Overview', icon: '🔍' },
    ],
  },
]

// Flatten for mobile
const allLinks = sidebarSections.flatMap((s) =>
  s.type === 'link' ? [{ to: s.to, icon: s.icon }] : s.links.map((l) => ({ to: l.to, icon: l.icon }))
)

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
// ADMIN LAYOUT
// ═══════════════════════════════════════════════════════

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [openSections, setOpenSections] = useState(() => {
    const initial = {}
    sidebarSections.forEach((section, i) => {
      if (section.type === 'dropdown') {
        initial[i] = section.links.some((l) => location.pathname === l.to)
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

  const displayName = user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email : 'Admin'
  const initials = displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] bg-[var(--color-bg-navy)] border-r border-[var(--color-border-dark)] fixed left-0 top-0 bottom-0 z-40">
        {/* Logo */}
        <div className="p-6 border-b border-[var(--color-border-dark)]">
          <Link to="/admin" className="flex items-center no-underline">
            <img src="/images/headericon-white.svg" alt="Technical Relief" className="h-10 mr-2 object-contain" />
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold text-[17px] text-white">Technical</span>
              <span className="font-extrabold text-[17px] text-white">Relief</span>
            </div>
          </Link>
        </div>

        {/* ── Admin / My Account Toggle ── */}
        <div className="px-3 pt-4 pb-2">
          <div className="bg-[var(--color-bg-dark)] rounded-xl p-1 flex">
            <button
              className="flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer border-0 bg-amber-500/15 text-amber-400"
            >
              🛡️ Admin Panel
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer border-0 bg-transparent text-[var(--color-text-muted)] hover:text-white"
            >
              👤 My Account
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-2 px-3 flex flex-col gap-0.5 overflow-y-auto">
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
        </nav>

        {/* User */}
        <div className="p-4 border-t border-[var(--color-border-dark)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/15 text-amber-400 font-bold text-xs flex items-center justify-center flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="text-white text-sm font-medium truncate">{displayName}</div>
              <div className="text-amber-400/70 text-xs truncate">Administrator</div>
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
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-[var(--color-bg-navy)] border-b border-[var(--color-border-dark)] sticky top-0 z-30">
          <Link to="/admin" className="flex items-center no-underline">
            <img src="/images/headericon-white.svg" alt="Logo" className="h-8 mr-2 object-contain" />
            <span className="font-extrabold text-[17px] text-white">TR</span>
            <span className="ml-2 px-2 py-0.5 bg-amber-500/15 text-amber-400 text-[9px] font-bold rounded-full">ADMIN</span>
          </Link>
          <div className="flex items-center gap-3">
            {allLinks.slice(0, 6).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/admin'}
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
      </div>
    </div>
  )
}
