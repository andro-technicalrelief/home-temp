'use client'

import { Link } from '@/lib/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import TierBadge from '../../components/TierBadge'

const quickActions = [
  { label: 'Infrastructure', desc: 'Monitor servers & backups', icon: '🖥️', to: '/dashboard/infrastructure' },
  { label: 'Wallet', desc: 'Cards & payment methods', icon: '💳', to: '/dashboard/wallet' },
  { label: 'Marketplace', desc: 'Upgrades & add-ons', icon: '🛒', to: '/dashboard/marketplace' },
  { label: 'Support', desc: 'Get help from our team', icon: '🎫', to: '/dashboard/support' },
]

// ═══════════════════════════════════════════════════════
// MOCK DATA — shown only for demo clients
// Real users get blank states until services are added
// ═══════════════════════════════════════════════════════

const MOCK_STATS = [
  { label: 'Active Services', value: '3', icon: '🖥️', color: 'text-[var(--color-accent-light)]' },
  { label: 'Unpaid Invoices', value: '1', icon: '💳', color: 'text-[var(--color-warning)]' },
  { label: 'Open Tickets', value: '0', icon: '🎫', color: 'text-[var(--color-success)]' },
  { label: 'Active Projects', value: '2', icon: '🚀', color: 'text-[var(--color-secondary)]' },
]

const BLANK_STATS = [
  { label: 'Active Services', value: '0', icon: '🖥️', color: 'text-[var(--color-text-muted)]' },
  { label: 'Unpaid Invoices', value: '0', icon: '💳', color: 'text-[var(--color-success)]' },
  { label: 'Open Tickets', value: '0', icon: '🎫', color: 'text-[var(--color-success)]' },
  { label: 'Active Projects', value: '0', icon: '🚀', color: 'text-[var(--color-text-muted)]' },
]

const MOCK_SECURITY = [
  { label: 'SSL Certificates', status: 'valid', detail: '2 active, auto-renewing', icon: '🔒' },
  { label: 'Firewall', status: 'active', detail: 'CSF + fail2ban enabled', icon: '🛡️' },
  { label: 'Last Security Scan', status: 'clear', detail: '2 hours ago — no threats', icon: '🔍' },
  { label: 'DDoS Protection', status: 'active', detail: 'Layer 3-7 mitigation', icon: '⚡' },
]

const MOCK_BILLING = {
  monthlySpend: 'R10,399',
  nextBilling: '2026-04-01',
  outstanding: 'R0.00',
  tier: { id: 'sme', label: 'SME' },
  linkedCard: '**** 4512',
}

const BLANK_BILLING = {
  monthlySpend: 'R0.00',
  nextBilling: '—',
  outstanding: 'R0.00',
  tier: { id: 'free', label: 'Free' },
  linkedCard: 'No card linked',
}

const MOCK_ACTIVITY = [
  { type: 'payment', desc: 'Invoice #1042 paid — R1,499.00', time: '2 hours ago', icon: '✓', color: 'bg-[var(--color-success)]/15 text-[var(--color-success)]' },
  { type: 'backup', desc: 'Full backup completed — web-prod-01', time: '6 hours ago', icon: '💾', color: 'bg-[var(--color-secondary)]/15 text-[var(--color-secondary)]' },
  { type: 'ssl', desc: 'SSL renewed — example.co.za', time: '1 day ago', icon: '🔒', color: 'bg-[var(--color-accent)]/15 text-[var(--color-accent)]' },
  { type: 'provision', desc: 'Linux VPS staging-01 provisioned', time: '2 days ago', icon: '🐧', color: 'bg-purple-500/15 text-purple-400' },
  { type: 'ticket', desc: 'Support ticket #204 resolved', time: '3 days ago', icon: '🎫', color: 'bg-[var(--color-success)]/15 text-[var(--color-success)]' },
]

const statusStyle = {
  valid: 'bg-emerald-500/15 text-emerald-400',
  active: 'bg-emerald-500/15 text-emerald-400',
  clear: 'bg-emerald-500/15 text-emerald-400',
  warning: 'bg-amber-500/15 text-amber-400',
  expired: 'bg-red-500/15 text-red-400',
  inactive: 'bg-white/5 text-white/30',
}

export default function DashboardPage() {
  const { user, isFirebaseAuth } = useAuth()
  const firstName = user?.first_name || 'there'

  // New Firebase users get blank states, demo clients get mock data
  const isNewUser = isFirebaseAuth
  const stats = isNewUser ? BLANK_STATS : MOCK_STATS
  const billing = isNewUser ? BLANK_BILLING : MOCK_BILLING
  const activity = isNewUser ? [] : MOCK_ACTIVITY
  const security = isNewUser ? [] : MOCK_SECURITY

  return (
    <div>
      {/* Welcome + Tier */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white">
            Welcome back, <span className="text-gradient">{firstName}</span>
          </h1>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">
            {isNewUser
              ? "Your account is ready. Browse the Marketplace to add your first service."
              : "Here's your account overview and command center."}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <TierBadge tier={billing.tier.id} />
          <div className="text-right">
            <div className="text-white text-sm font-bold">{billing.tier.label} Tier</div>
            <div className="text-[var(--color-text-muted)] text-[10px]">
              {isNewUser ? 'No plan selected' : '1–10 users'}
            </div>
          </div>
        </div>
      </div>

      {/* Billing summary strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[var(--color-bg-card)] to-[var(--color-bg-navy)] border border-[var(--color-border-dark)] rounded-2xl p-5 mb-8 flex flex-wrap items-center gap-x-8 gap-y-3"
        data-tour-id="payment-info"
      >
        <div>
          <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Monthly Spend</div>
          <div className="text-white text-xl font-extrabold">{billing.monthlySpend}</div>
        </div>
        <div>
          <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Next Billing</div>
          <div className="text-white text-sm font-medium">{billing.nextBilling}</div>
        </div>
        <div>
          <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Outstanding</div>
          <div className="text-emerald-400 text-sm font-bold">{billing.outstanding}</div>
        </div>
        <div>
          <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Auto-Pay</div>
          <div className="text-white text-sm font-medium">{billing.linkedCard}</div>
        </div>
        <Link
          to="/dashboard/wallet"
          className="ml-auto px-4 py-2 text-xs text-[var(--color-accent-light)] font-semibold hover:text-white transition-colors no-underline"
        >
          {isNewUser ? 'Link a Card →' : 'Manage Billing →'}
        </Link>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8" data-tour-id="stats-cards">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</div>
            <div className="text-[var(--color-text-muted)] text-xs mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Security Health + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Security health */}
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-bold text-white">Security Health</h3>
            <span className={`ml-auto px-2.5 py-1 text-[10px] font-bold rounded-full ${
              isNewUser
                ? 'bg-white/5 text-white/30'
                : 'bg-emerald-500/15 text-emerald-400'
            }`}>
              {isNewUser ? 'NO SERVICES' : 'ALL CLEAR'}
            </span>
          </div>
          {isNewUser ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3 opacity-30">🛡️</div>
              <p className="text-[var(--color-text-muted)] text-sm">
                Add a hosting service to enable security monitoring, SSL certificates, and firewall protection.
              </p>
              <Link
                to="/dashboard/marketplace"
                className="inline-block mt-4 px-4 py-2 bg-[var(--color-accent)]/10 text-[var(--color-accent-light)] text-sm font-medium rounded-xl border border-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/20 transition-all no-underline"
              >
                Browse Services →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {security.map((item) => (
                <div key={item.label} className="flex items-start gap-3 py-2">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${statusStyle[item.status]}`}>
                    {item.icon}
                  </span>
                  <div>
                    <div className="text-white text-sm font-medium">{item.label}</div>
                    <div className="text-[var(--color-text-muted)] text-[11px]">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div data-tour-id="quick-actions">
          <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-5 hover:border-[var(--color-accent)]/20 hover:-translate-y-0.5 transition-all no-underline group"
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <div className="text-white font-semibold text-sm">{action.label}</div>
                <div className="text-[var(--color-text-muted)] text-xs mt-0.5">{action.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Recent Activity</h3>
          {!isNewUser && (
            <Link to="/dashboard/reports" className="text-xs text-[var(--color-accent-light)] hover:text-white transition-colors no-underline">View Reports →</Link>
          )}
        </div>
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl overflow-hidden">
          {activity.length > 0 ? (
            activity.map((item, i) => (
              <div key={i} className={`flex items-center gap-4 px-6 py-4 ${i < activity.length - 1 ? 'border-b border-[var(--color-border-dark)]' : ''} hover:bg-[var(--color-bg-card-hover)] transition-colors`}>
                <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center text-sm flex-shrink-0`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm truncate">{item.desc}</div>
                </div>
                <div className="text-[var(--color-text-muted)] text-xs whitespace-nowrap">{item.time}</div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <div className="text-3xl mb-3 opacity-30">📋</div>
              <p className="text-[var(--color-text-muted)] text-sm mb-1">No activity yet</p>
              <p className="text-[var(--color-text-muted)] text-xs">Activity will appear here as you add services, make payments, and interact with support.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
