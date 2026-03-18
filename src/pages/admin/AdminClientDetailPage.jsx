import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { DEMO_CLIENTS } from '../../context/AuthContext'

// ═══════════════════════════════════════════════════════
// ADMIN: CLIENT DETAIL / EDIT
// View and edit a specific client's profile.
// Changes are synced locally (will be backed by Blesta API)
// ═══════════════════════════════════════════════════════

const TIERS = ['free', 'starter', 'sme', 'growth', 'enterprise']

const tierColors = {
  enterprise: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  growth: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  sme: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  starter: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  free: 'bg-white/10 text-white/50 border-white/10',
}

export default function AdminClientDetailPage() {
  const { clientId } = useParams()
  const client = DEMO_CLIENTS.find((c) => c.id === clientId)

  const [formData, setFormData] = useState(() => (client ? { ...client } : {}))
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  if (!client) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-4">🔍</div>
        <h2 className="text-xl font-bold text-white mb-2">Client not found</h2>
        <p className="text-[var(--color-text-muted)] text-sm mb-6">The client ID "{clientId}" doesn't exist.</p>
        <Link to="/admin/clients" className="px-6 py-3 bg-[var(--color-accent)] text-white font-semibold text-sm rounded-xl no-underline hover:bg-[var(--color-accent-hover)] transition-all">
          ← Back to Clients
        </Link>
      </div>
    )
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    // Simulate API call — in production, this syncs to Blesta via backend
    await new Promise((r) => setTimeout(r, 800))

    // Sync changes to the DEMO_CLIENTS array (in-memory)
    const idx = DEMO_CLIENTS.findIndex((c) => c.id === clientId)
    if (idx !== -1) {
      Object.assign(DEMO_CLIENTS[idx], formData)
    }

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const inputClass = "w-full px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded-xl text-white text-sm placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all"

  return (
    <div>
      {/* Header */}
      <div className="flex items-start gap-4 mb-8 flex-wrap">
        <Link
          to="/admin/clients"
          className="mt-1 w-9 h-9 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] text-[var(--color-text-muted)] hover:text-white hover:border-[var(--color-accent)]/30 flex items-center justify-center transition-all no-underline text-sm"
        >
          ←
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)] font-bold text-sm flex items-center justify-center flex-shrink-0">
              {client.first_name[0]}{client.last_name[0]}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{formData.first_name} {formData.last_name}</h1>
              <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                <span>{formData.email}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${tierColors[formData.tier] || tierColors.free}`}>
                  {(formData.tier || 'free').toUpperCase()}
                </span>
                <span className="font-mono opacity-60">{clientId}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success banner */}
      {saved && (
        <div className="mb-6 p-4 bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-xl text-[var(--color-success)] text-sm font-medium flex items-center gap-2">
          ✓ Changes saved successfully. Client profile updated.
        </div>
      )}

      {/* Edit Form */}
      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Personal Info */}
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-5">Personal Information</h3>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2">First Name</label>
                  <input value={formData.first_name} onChange={(e) => handleChange('first_name', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2">Last Name</label>
                  <input value={formData.last_name} onChange={(e) => handleChange('last_name', e.target.value)} className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2">Email</label>
                <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2">Phone</label>
                <input value={formData.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2">Company</label>
                <input value={formData.company || ''} onChange={(e) => handleChange('company', e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Address + Tier */}
          <div className="flex flex-col gap-6">
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-5">Address</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2">Street Address</label>
                  <input value={formData.address1 || ''} onChange={(e) => handleChange('address1', e.target.value)} className={inputClass} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2">City</label>
                    <input value={formData.city || ''} onChange={(e) => handleChange('city', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2">Province</label>
                    <input value={formData.state || ''} onChange={(e) => handleChange('state', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2">Postal Code</label>
                    <input value={formData.zip || ''} onChange={(e) => handleChange('zip', e.target.value)} className={inputClass} />
                  </div>
                </div>
              </div>
            </div>

            {/* Tier */}
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Account Tier</h3>
              <div className="flex flex-wrap gap-2">
                {TIERS.map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => handleChange('tier', tier)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      formData.tier === tier
                        ? tierColors[tier] || tierColors.free
                        : 'bg-[var(--color-bg-dark)] text-[var(--color-text-muted)] border-[var(--color-border-dark)] hover:text-white'
                    }`}
                  >
                    {tier.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Services placeholder */}
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-bold text-white mb-4">Client Services</h3>
          <div className="text-center py-8">
            <div className="text-3xl mb-3 opacity-30">📦</div>
            <p className="text-[var(--color-text-muted)] text-sm mb-1">Services will be managed via Blesta</p>
            <p className="text-[var(--color-text-muted)] text-xs">Once the Blesta API is connected, client services, invoices, and billing will appear here.</p>
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center justify-end gap-4">
          <Link to="/admin/clients" className="px-6 py-3 text-[var(--color-text-muted)] text-sm font-medium hover:text-white transition-colors no-underline">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-[var(--color-accent)] text-white font-semibold text-sm rounded-xl hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : '💾 Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
