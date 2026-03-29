'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

// ─── MOCK DATA ───────────────────────────────────────

function generateMonthlyBandwidth() {
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
  return months.map((m) => ({ month: m, value: Math.round((Math.random() * 2.5 + 0.5) * 100) / 100 }))
}

const MOCK_BACKUP_LOG = [
  { date: '2026-03-15', server: 'web-prod-01', type: 'Full', size: '4.2 GB', duration: '12m', status: 'success' },
  { date: '2026-03-14', server: 'web-prod-01', type: 'Full', size: '4.1 GB', duration: '11m', status: 'success' },
  { date: '2026-03-15', server: 'shared-prod-01', type: 'Full', size: '1.8 GB', duration: '5m', status: 'success' },
  { date: '2026-03-14', server: 'shared-prod-01', type: 'Full', size: '1.7 GB', duration: '5m', status: 'success' },
  { date: '2026-03-13', server: 'web-prod-01', type: 'Full', size: '4.1 GB', duration: '13m', status: 'success' },
  { date: '2026-03-12', server: 'web-prod-01', type: 'Full', size: '4.0 GB', duration: '11m', status: 'success' },
  { date: '2026-03-11', server: 'staging-01', type: 'Incremental', size: '0.9 GB', duration: '3m', status: 'success' },
  { date: '2026-03-10', server: 'web-prod-01', type: 'Full', size: '0 B', duration: '—', status: 'failed' },
  { date: '2026-03-09', server: 'web-prod-01', type: 'Full', size: '3.9 GB', duration: '12m', status: 'success' },
  { date: '2026-03-08', server: 'shared-prod-01', type: 'Full', size: '1.6 GB', duration: '4m', status: 'success' },
]

const LICENSE_STATUS = [
  { name: 'DirectAdmin — web-prod-01', type: 'Control Panel', expiry: '2027-01-15', status: 'active', autoRenew: true },
  { name: 'DirectAdmin — shared-prod-01', type: 'Control Panel', expiry: '2027-01-15', status: 'active', autoRenew: true },
  { name: 'DirectAdmin — staging-01', type: 'Control Panel', expiry: '2027-01-15', status: 'active', autoRenew: true },
  { name: 'SSL — example.co.za', type: 'SSL Certificate', expiry: '2026-09-10', status: 'active', autoRenew: true },
  { name: 'SSL — mysite.com', type: 'SSL Certificate', expiry: '2026-11-22', status: 'active', autoRenew: true },
  { name: 'Domain — example.co.za', type: 'Domain Registration', expiry: '2027-06-10', status: 'active', autoRenew: true },
  { name: 'Domain — mysite.com', type: 'Domain Registration', expiry: '2027-06-10', status: 'active', autoRenew: true },
]

const INVOICE_HISTORY = [
  { month: 'March 2026', invoices: 2, total: 'R10,399.00', status: 'paid' },
  { month: 'February 2026', invoices: 2, total: 'R10,399.00', status: 'paid' },
  { month: 'January 2026', invoices: 3, total: 'R11,098.00', status: 'paid' },
  { month: 'December 2025', invoices: 2, total: 'R10,399.00', status: 'paid' },
  { month: 'November 2025', invoices: 2, total: 'R10,399.00', status: 'paid' },
  { month: 'October 2025', invoices: 1, total: 'R5,000.00', status: 'paid' },
]

// ─── COMPONENTS ──────────────────────────────────────

function BarChart({ data, label, unit }) {
  const max = Math.max(...data.map((d) => d.value), 0.1)
  return (
    <div>
      <div className="flex items-end gap-3 h-[160px]">
        {data.map((d, i) => {
          const pct = (d.value / max) * 100
          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1">
              <span className="text-[10px] text-[var(--color-text-muted)]">{d.value} {unit}</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${pct}%` }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="w-full bg-[var(--color-accent)]/50 hover:bg-[var(--color-accent)] rounded-t-md transition-colors min-h-[4px]"
              />
              <span className="text-[10px] text-[var(--color-text-muted)] mt-1">{d.month}</span>
            </div>
          )
        })}
      </div>
      <div className="text-center mt-3 text-[var(--color-text-muted)] text-xs">{label}</div>
    </div>
  )
}

const TABS = ['Bandwidth', 'Backups', 'Licenses', 'Invoices']

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('Bandwidth')
  const bandwidthData = useMemo(() => generateMonthlyBandwidth(), [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Reports</h1>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">Data-driven insights across bandwidth, backups, licenses, and billing.</p>
        </div>
        <button className="px-4 py-2 border border-[var(--color-border-dark)] text-[var(--color-text-muted)] text-sm rounded-xl hover:text-white hover:border-white/20 transition-all cursor-pointer">
          📥 Export CSV
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl p-1 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-[var(--color-accent)] text-white'
                : 'text-[var(--color-text-muted)] hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Bandwidth ── */}
      {activeTab === 'Bandwidth' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'This Month', value: `${bandwidthData[bandwidthData.length - 1]?.value} TB`, icon: '📡', color: 'text-blue-400' },
              { label: '6-Month Avg', value: `${(bandwidthData.reduce((a, d) => a + d.value, 0) / bandwidthData.length).toFixed(2)} TB`, icon: '📊', color: 'text-emerald-400' },
              { label: 'Trend', value: bandwidthData[bandwidthData.length - 1]?.value > bandwidthData[bandwidthData.length - 2]?.value ? '↑ Up' : '↓ Down', icon: '📈', color: 'text-amber-400' },
            ].map((s) => (
              <div key={s.label} className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl p-5">
                <div className="text-xl mb-1">{s.icon}</div>
                <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
                <div className="text-[var(--color-text-muted)] text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-6">Monthly Bandwidth Usage</h3>
            <BarChart data={bandwidthData} label="Bandwidth in TB per month (all servers combined)" unit="TB" />
          </div>
        </motion.div>
      )}

      {/* ── Backups ── */}
      {activeTab === 'Backups' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Successful', value: MOCK_BACKUP_LOG.filter((b) => b.status === 'success').length, icon: '✅', color: 'text-emerald-400' },
              { label: 'Failed', value: MOCK_BACKUP_LOG.filter((b) => b.status === 'failed').length, icon: '❌', color: 'text-red-400' },
              { label: 'Success Rate', value: `${Math.round((MOCK_BACKUP_LOG.filter((b) => b.status === 'success').length / MOCK_BACKUP_LOG.length) * 100)}%`, icon: '📊', color: 'text-blue-400' },
            ].map((s) => (
              <div key={s.label} className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl p-5">
                <div className="text-xl mb-1">{s.icon}</div>
                <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
                <div className="text-[var(--color-text-muted)] text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-4">Backup Log — Last 30 Days</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--color-border-dark)]">
                    {['Date', 'Server', 'Type', 'Size', 'Duration', 'Status'].map((h) => (
                      <th key={h} className="text-left py-2.5 px-3 text-[var(--color-text-muted)] text-xs uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_BACKUP_LOG.map((b, i) => (
                    <tr key={i} className="border-b border-[var(--color-border-dark)] last:border-b-0 hover:bg-[var(--color-bg-card-hover)] transition-colors">
                      <td className="py-2.5 px-3 text-white text-sm">{b.date}</td>
                      <td className="py-2.5 px-3 text-[var(--color-text-light)] text-sm font-mono">{b.server}</td>
                      <td className="py-2.5 px-3 text-[var(--color-text-light)] text-sm">{b.type}</td>
                      <td className="py-2.5 px-3 text-[var(--color-text-light)] text-sm">{b.size}</td>
                      <td className="py-2.5 px-3 text-[var(--color-text-muted)] text-sm">{b.duration}</td>
                      <td className="py-2.5 px-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${b.status === 'success' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Licenses ── */}
      {activeTab === 'Licenses' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-4">Active Licenses & Domains</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--color-border-dark)]">
                    {['Name', 'Type', 'Expiry', 'Auto-Renew', 'Status'].map((h) => (
                      <th key={h} className="text-left py-2.5 px-3 text-[var(--color-text-muted)] text-xs uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LICENSE_STATUS.map((lic, i) => (
                    <tr key={i} className="border-b border-[var(--color-border-dark)] last:border-b-0 hover:bg-[var(--color-bg-card-hover)] transition-colors">
                      <td className="py-2.5 px-3 text-white text-sm font-medium">{lic.name}</td>
                      <td className="py-2.5 px-3 text-[var(--color-text-light)] text-sm">{lic.type}</td>
                      <td className="py-2.5 px-3 text-[var(--color-text-light)] text-sm">{lic.expiry}</td>
                      <td className="py-2.5 px-3">
                        <span className={`text-xs font-bold ${lic.autoRenew ? 'text-emerald-400' : 'text-[var(--color-text-muted)]'}`}>
                          {lic.autoRenew ? '✓ Yes' : 'No'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
                          {lic.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Invoices ── */}
      {activeTab === 'Invoices' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total Paid (6mo)', value: `R${INVOICE_HISTORY.reduce((a, inv) => a + parseFloat(inv.total.replace(/[R,]/g, '')), 0).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`, icon: '💰', color: 'text-emerald-400' },
              { label: 'Monthly Avg', value: `R${(INVOICE_HISTORY.reduce((a, inv) => a + parseFloat(inv.total.replace(/[R,]/g, '')), 0) / INVOICE_HISTORY.length).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`, icon: '📊', color: 'text-blue-400' },
              { label: 'Total Invoices', value: INVOICE_HISTORY.reduce((a, inv) => a + inv.invoices, 0), icon: '📄', color: 'text-purple-400' },
            ].map((s) => (
              <div key={s.label} className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl p-5">
                <div className="text-xl mb-1">{s.icon}</div>
                <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
                <div className="text-[var(--color-text-muted)] text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-4">Invoice History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--color-border-dark)]">
                    {['Period', 'Invoices', 'Total', 'Status'].map((h) => (
                      <th key={h} className="text-left py-2.5 px-3 text-[var(--color-text-muted)] text-xs uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {INVOICE_HISTORY.map((inv, i) => (
                    <tr key={i} className="border-b border-[var(--color-border-dark)] last:border-b-0 hover:bg-[var(--color-bg-card-hover)] transition-colors">
                      <td className="py-2.5 px-3 text-white text-sm font-medium">{inv.month}</td>
                      <td className="py-2.5 px-3 text-[var(--color-text-light)] text-sm">{inv.invoices}</td>
                      <td className="py-2.5 px-3 text-white text-sm font-bold">{inv.total}</td>
                      <td className="py-2.5 px-3">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
