import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { DEMO_CLIENTS } from '../../context/AuthContext'

// ═══════════════════════════════════════════════════════
// ADMIN: ALL CLIENTS
// Searchable, filterable client list
// ═══════════════════════════════════════════════════════

const tierColors = {
  enterprise: 'bg-purple-500/15 text-purple-400',
  growth: 'bg-blue-500/15 text-blue-400',
  sme: 'bg-emerald-500/15 text-emerald-400',
  starter: 'bg-amber-500/15 text-amber-400',
  free: 'bg-white/10 text-white/50',
}

export default function AdminClientsPage() {
  const [search, setSearch] = useState('')
  const [tierFilter, setTierFilter] = useState('all')

  const tiers = useMemo(() => {
    const set = new Set(DEMO_CLIENTS.map((c) => c.tier).filter(Boolean))
    return ['all', ...Array.from(set)]
  }, [])

  const filteredClients = useMemo(() => {
    let result = [...DEMO_CLIENTS]
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.first_name.toLowerCase().includes(q) ||
          c.last_name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          (c.company || '').toLowerCase().includes(q)
      )
    }
    if (tierFilter !== 'all') {
      result = result.filter((c) => c.tier === tierFilter)
    }
    return result
  }, [search, tierFilter])

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">All Clients</h1>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">
            {DEMO_CLIENTS.length} clients registered. Search, filter, and manage profiles.
          </p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="flex-1 min-w-[250px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or company..."
            className="w-full px-4 py-3 bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl text-white text-sm placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          {tiers.map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                tierFilter === tier
                  ? 'bg-[var(--color-accent)]/15 text-white border border-[var(--color-accent)]/20'
                  : 'bg-[var(--color-bg-card)] text-[var(--color-text-muted)] border border-[var(--color-border-dark)] hover:text-white'
              }`}
            >
              {tier === 'all' ? 'All' : tier.charAt(0).toUpperCase() + tier.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Client Table */}
      {filteredClients.length === 0 ? (
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-12 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-white font-bold mb-1">No clients found</h3>
          <p className="text-[var(--color-text-muted)] text-sm">Try adjusting your search or filter.</p>
        </div>
      ) : (
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border-dark)]">
                  <th className="text-left py-3 px-5 text-[10px] uppercase tracking-wider font-bold text-[var(--color-text-muted)]">Client</th>
                  <th className="text-left py-3 px-5 text-[10px] uppercase tracking-wider font-bold text-[var(--color-text-muted)]">Company</th>
                  <th className="text-left py-3 px-5 text-[10px] uppercase tracking-wider font-bold text-[var(--color-text-muted)]">Location</th>
                  <th className="text-center py-3 px-5 text-[10px] uppercase tracking-wider font-bold text-[var(--color-text-muted)]">Tier</th>
                  <th className="text-right py-3 px-5 text-[10px] uppercase tracking-wider font-bold text-[var(--color-text-muted)]">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    className="border-b border-[var(--color-border-dark)] hover:bg-[var(--color-bg-card-hover)] transition-colors"
                  >
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)] font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {client.first_name[0]}{client.last_name[0]}
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">{client.first_name} {client.last_name}</div>
                          <div className="text-[var(--color-text-muted)] text-[11px]">{client.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="text-[var(--color-text-light)] text-sm">{client.company || '—'}</span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="text-[var(--color-text-muted)] text-sm">{client.city}, {client.state}</span>
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold ${tierColors[client.tier] || tierColors.free}`}>
                        {(client.tier || 'free').toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <Link
                        to={`/admin/clients/${client.id}`}
                        className="px-4 py-2 bg-[var(--color-accent)]/10 text-[var(--color-accent-light)] text-xs font-medium rounded-lg border border-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/20 transition-all no-underline"
                      >
                        Manage →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
