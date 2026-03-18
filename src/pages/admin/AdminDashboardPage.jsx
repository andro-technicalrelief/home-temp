import { Link } from 'react-router-dom'
import { DEMO_CLIENTS } from '../../context/AuthContext'

// ═══════════════════════════════════════════════════════
// ADMIN DASHBOARD
// Overview stats for the platform administrator
// ═══════════════════════════════════════════════════════

const tierColors = {
  enterprise: 'bg-purple-500/15 text-purple-400',
  growth: 'bg-blue-500/15 text-blue-400',
  sme: 'bg-emerald-500/15 text-emerald-400',
  starter: 'bg-amber-500/15 text-amber-400',
  free: 'bg-white/10 text-white/50',
}

export default function AdminDashboardPage() {
  const totalClients = DEMO_CLIENTS.length

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white">
          Admin <span className="text-gradient">Dashboard</span>
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm mt-1">
          Platform overview and client management.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Clients', value: totalClients, icon: '👥', color: 'text-[var(--color-accent-light)]' },
          { label: 'Active Services', value: '7', icon: '📦', color: 'text-[var(--color-success)]' },
          { label: 'Open Tickets', value: '3', icon: '🎫', color: 'text-[var(--color-warning)]' },
          { label: 'Monthly Revenue', value: 'R28,497', icon: '💰', color: 'text-emerald-400' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</div>
            <div className="text-[var(--color-text-muted)] text-xs mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl">
          <div className="flex items-center justify-between p-5 border-b border-[var(--color-border-dark)]">
            <h3 className="text-lg font-bold text-white">Recent Clients</h3>
            <Link to="/admin/clients" className="text-xs text-[var(--color-accent-light)] hover:text-white transition-colors no-underline">
              View All →
            </Link>
          </div>
          <div>
            {DEMO_CLIENTS.slice(0, 4).map((client, i) => (
              <Link
                key={client.id}
                to={`/admin/clients/${client.id}`}
                className={`flex items-center gap-4 px-5 py-4 no-underline hover:bg-[var(--color-bg-card-hover)] transition-colors ${
                  i < Math.min(4, DEMO_CLIENTS.length) - 1 ? 'border-b border-[var(--color-border-dark)]' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)] font-bold text-xs flex items-center justify-center flex-shrink-0">
                  {client.first_name[0]}{client.last_name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium">{client.first_name} {client.last_name}</div>
                  <div className="text-[var(--color-text-muted)] text-xs truncate">{client.email}</div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${tierColors[client.tier] || tierColors.free}`}>
                  {client.tier?.toUpperCase()}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Manage Clients', desc: 'View & edit profiles', icon: '👥', to: '/admin/clients' },
              { label: 'Ticket Queue', desc: 'Support requests', icon: '🎫', to: '/admin/tickets' },
              { label: 'Infrastructure', desc: 'Server overview', icon: '🖥️', to: '/dashboard/infrastructure' },
              { label: 'Cost Overview', desc: 'Platform expenses', icon: '🔍', to: '/dashboard/transparency' },
            ].map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-5 hover:border-[var(--color-accent)]/20 hover:-translate-y-0.5 transition-all no-underline"
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <div className="text-white font-semibold text-sm">{action.label}</div>
                <div className="text-[var(--color-text-muted)] text-xs mt-0.5">{action.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
