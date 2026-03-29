'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MOCK_SERVERS, MOCK_BACKUPS, MOCK_ALERTS, getBandwidthHistory, triggerBackup } from '../../services/infrastructureApi'

const severityStyles = {
  critical: 'bg-red-500/15 text-red-400 border-red-500/20',
  warning: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  info: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
}

function UsageBar({ label, used, total, unit, warn = 80, crit = 90 }) {
  const pct = total > 0 ? (used / total) * 100 : 0
  const color = pct >= crit ? 'bg-red-500' : pct >= warn ? 'bg-amber-500' : 'bg-emerald-500'
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-[var(--color-text-muted)]">{label}</span>
        <span className="text-white font-medium">{used}{unit ? ` ${unit}` : '%'} / {total}{unit ? ` ${unit}` : '%'}</span>
      </div>
      <div className="h-2 bg-[var(--color-bg-dark)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(pct, 100)}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  )
}

function BandwidthChart({ data }) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div className="flex items-end gap-[3px] h-[120px]">
      {data.map((d, i) => {
        const pct = (d.value / max) * 100
        return (
          <div key={i} className="flex-1 group relative flex flex-col justify-end">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${pct}%` }}
              transition={{ duration: 0.5, delay: i * 0.02 }}
              className="bg-[var(--color-accent)]/60 hover:bg-[var(--color-accent)] rounded-t transition-colors min-h-[2px]"
            />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {d.date}: {d.value} GB
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function InfrastructurePage() {
  const [selectedServer, setSelectedServer] = useState(MOCK_SERVERS[0]?.id)
  const [backingUp, setBackingUp] = useState(false)
  const [backupMsg, setBackupMsg] = useState(null)

  const server = MOCK_SERVERS.find((s) => s.id === selectedServer)
  const serverBackups = MOCK_BACKUPS.filter((b) => b.serverId === selectedServer)
  const serverAlerts = MOCK_ALERTS.filter((a) => a.serverId === selectedServer)
  const bandwidthData = useMemo(() => getBandwidthHistory(selectedServer), [selectedServer])

  const handleBackup = async () => {
    setBackingUp(true)
    setBackupMsg(null)
    const result = await triggerBackup(selectedServer)
    setBackingUp(false)
    setBackupMsg(result.message)
    setTimeout(() => setBackupMsg(null), 4000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Infrastructure</h1>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">Real-time monitoring of your servers, backups, and alerts.</p>
        </div>
      </div>

      {/* Server selector tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
        {MOCK_SERVERS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedServer(s.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer border ${
              selectedServer === s.id
                ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]/30 text-white'
                : 'bg-[var(--color-bg-card)] border-[var(--color-border-dark)] text-[var(--color-text-muted)] hover:text-white'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${s.status === 'online' ? 'bg-emerald-400' : 'bg-red-400'}`} />
            {s.name}
            <span className="text-[10px] opacity-60 uppercase">{s.type}</span>
          </button>
        ))}
      </div>

      {server && (
        <>
          {/* Server info bar */}
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-5 mb-6 flex flex-wrap gap-x-8 gap-y-3 items-center">
            <div>
              <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Plan</div>
              <div className="text-white text-sm font-medium">{server.plan}</div>
            </div>
            <div>
              <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">OS</div>
              <div className="text-white text-sm font-medium">{server.os}</div>
            </div>
            <div>
              <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Location</div>
              <div className="text-white text-sm font-medium">{server.location}</div>
            </div>
            <div>
              <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">IP</div>
              <div className="text-white text-sm font-mono">{server.ip}</div>
            </div>
            <div>
              <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Uptime</div>
              <div className="text-emerald-400 text-sm font-bold">{server.uptime}%</div>
            </div>
            <a
              href={server.directAdminUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto px-4 py-2 bg-[var(--color-accent)]/10 text-[var(--color-accent-light)] text-sm font-semibold rounded-lg hover:bg-[var(--color-accent)]/20 transition-all no-underline"
            >
              Open DirectAdmin ↗
            </a>
          </div>

          {/* Resource usage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl p-5">
              <UsageBar label="CPU" used={server.stats.cpu.used} total={server.stats.cpu.total} />
              <div className="text-[10px] text-[var(--color-text-muted)] mt-2">{server.stats.cpu.cores} vCPU cores</div>
            </div>
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl p-5">
              <UsageBar label="RAM" used={server.stats.ram.used} total={server.stats.ram.total} unit={server.stats.ram.unit} />
            </div>
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl p-5">
              <UsageBar label="Disk" used={server.stats.disk.used} total={server.stats.disk.total} unit={server.stats.disk.unit} />
            </div>
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-xl p-5">
              <UsageBar label="Bandwidth" used={server.stats.bandwidth.used} total={server.stats.bandwidth.total} unit={server.stats.bandwidth.unit} warn={70} crit={85} />
            </div>
          </div>

          {/* Bandwidth chart + Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-4">Bandwidth Usage — Last 30 Days</h3>
              <BandwidthChart data={bandwidthData} />
              <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] mt-2">
                <span>{bandwidthData[0]?.date}</span>
                <span>{bandwidthData[bandwidthData.length - 1]?.date}</span>
              </div>
            </div>

            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-4">Alerts</h3>
              {serverAlerts.length === 0 ? (
                <div className="text-center py-6">
                  <div className="text-3xl mb-2">✅</div>
                  <div className="text-[var(--color-text-muted)] text-sm">No active alerts</div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {serverAlerts.map((a) => (
                    <div key={a.id} className={`px-3 py-2.5 rounded-lg border text-xs ${severityStyles[a.severity]}`}>
                      <div className="font-semibold mb-0.5">{a.severity.toUpperCase()}</div>
                      <div className="opacity-80">{a.message}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Backups */}
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-dark)] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">Recent Backups</h3>
              <div className="flex items-center gap-3">
                <AnimatePresence>
                  {backupMsg && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-400 text-xs">
                      ✓ {backupMsg}
                    </motion.span>
                  )}
                </AnimatePresence>
                <button
                  onClick={handleBackup}
                  disabled={backingUp}
                  className="px-4 py-2 bg-[var(--color-accent)] text-white text-xs font-semibold rounded-lg hover:bg-[var(--color-accent-hover)] transition-all disabled:opacity-50 cursor-pointer"
                >
                  {backingUp ? 'Running...' : '⚡ Backup Now'}
                </button>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border-dark)]">
                  {['Date', 'Type', 'Size', 'Retention', 'Status'].map((h) => (
                    <th key={h} className="text-left py-2.5 px-3 text-[var(--color-text-muted)] text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {serverBackups.map((b) => (
                  <tr key={b.id} className="border-b border-[var(--color-border-dark)] last:border-b-0 hover:bg-[var(--color-bg-card-hover)] transition-colors">
                    <td className="py-2.5 px-3 text-white text-sm">{new Date(b.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td className="py-2.5 px-3 text-[var(--color-text-light)] text-sm">{b.type}</td>
                    <td className="py-2.5 px-3 text-[var(--color-text-light)] text-sm">{b.size}</td>
                    <td className="py-2.5 px-3 text-[var(--color-text-muted)] text-sm">{b.retention}</td>
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
        </>
      )}
    </div>
  )
}
