/**
 * Infrastructure API Client
 *
 * Mock service for DirectAdmin + HostAfrica provisioning and monitoring.
 * In production, these would call real server APIs via a backend proxy.
 */

// ═══════════════════════════════════════════════════════
// MOCK SERVER DATA
// ═══════════════════════════════════════════════════════

const randomBetween = (min, max) => Math.round((Math.random() * (max - min) + min) * 10) / 10

function generateDailyData(days, minVal, maxVal) {
  const data = []
  const now = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split('T')[0],
      value: randomBetween(minVal, maxVal),
    })
  }
  return data
}

export const MOCK_SERVERS = [
  {
    id: 'srv-001',
    name: 'web-prod-01',
    type: 'vps',
    os: 'Ubuntu 22.04 LTS',
    location: 'Johannesburg, ZA',
    ip: '196.15.xx.42',
    status: 'online',
    plan: 'Linux VPS Professional',
    directAdminUrl: 'https://196.15.xx.42:2222',
    stats: {
      cpu: { used: randomBetween(15, 45), total: 100, cores: 4 },
      ram: { used: randomBetween(3.2, 5.8), total: 8, unit: 'GB' },
      disk: { used: randomBetween(42, 68), total: 120, unit: 'GB' },
      bandwidth: { used: randomBetween(1.2, 2.8), total: 4, unit: 'TB' },
    },
    uptime: 99.97,
    uptimeSince: '2026-01-15T08:00:00Z',
  },
  {
    id: 'srv-002',
    name: 'shared-prod-01',
    type: 'shared',
    os: 'CloudLinux 8',
    location: 'Cape Town, ZA',
    ip: '102.34.xx.18',
    status: 'online',
    plan: 'Professional Hosting',
    directAdminUrl: 'https://102.34.xx.18:2222',
    stats: {
      cpu: { used: randomBetween(8, 25), total: 100, cores: 2 },
      ram: { used: randomBetween(1.1, 2.4), total: 4, unit: 'GB' },
      disk: { used: randomBetween(12, 22), total: 30, unit: 'GB' },
      bandwidth: { used: randomBetween(200, 600), total: 1000, unit: 'GB' },
    },
    uptime: 99.99,
    uptimeSince: '2025-11-01T00:00:00Z',
  },
  {
    id: 'srv-003',
    name: 'staging-01',
    type: 'vps',
    os: 'Debian 12',
    location: 'Johannesburg, ZA',
    ip: '196.15.xx.88',
    status: 'online',
    plan: 'Linux VPS Starter',
    directAdminUrl: 'https://196.15.xx.88:2222',
    stats: {
      cpu: { used: randomBetween(5, 15), total: 100, cores: 2 },
      ram: { used: randomBetween(1.0, 2.5), total: 4, unit: 'GB' },
      disk: { used: randomBetween(8, 20), total: 50, unit: 'GB' },
      bandwidth: { used: randomBetween(100, 500), total: 2000, unit: 'GB' },
    },
    uptime: 99.95,
    uptimeSince: '2026-02-01T12:00:00Z',
  },
]

export const MOCK_BACKUPS = [
  { id: 'bk-1', serverId: 'srv-001', date: '2026-03-15T03:00:00Z', size: '4.2 GB', type: 'Full', status: 'success', retention: '14 days' },
  { id: 'bk-2', serverId: 'srv-001', date: '2026-03-14T03:00:00Z', size: '4.1 GB', type: 'Full', status: 'success', retention: '14 days' },
  { id: 'bk-3', serverId: 'srv-002', date: '2026-03-15T04:00:00Z', size: '1.8 GB', type: 'Full', status: 'success', retention: '14 days' },
  { id: 'bk-4', serverId: 'srv-002', date: '2026-03-14T04:00:00Z', size: '1.7 GB', type: 'Full', status: 'success', retention: '14 days' },
  { id: 'bk-5', serverId: 'srv-003', date: '2026-03-15T05:00:00Z', size: '0.9 GB', type: 'Incremental', status: 'success', retention: '7 days' },
  { id: 'bk-6', serverId: 'srv-001', date: '2026-03-10T03:00:00Z', size: '0 B', type: 'Full', status: 'failed', retention: '—' },
]

export const MOCK_ALERTS = [
  { id: 'al-1', serverId: 'srv-001', severity: 'warning', message: 'Disk usage above 75% on /var', timestamp: '2026-03-15T14:22:00Z', acknowledged: false },
  { id: 'al-2', serverId: 'srv-001', severity: 'info', message: 'SSL certificate renewal successful', timestamp: '2026-03-14T08:00:00Z', acknowledged: true },
  { id: 'al-3', serverId: 'srv-003', severity: 'info', message: 'Security patches applied (3 packages)', timestamp: '2026-03-13T06:15:00Z', acknowledged: true },
]

// ═══════════════════════════════════════════════════════
// API FUNCTIONS
// ═══════════════════════════════════════════════════════

/** Get all servers for the current client */
export async function getServers() {
  await new Promise((r) => setTimeout(r, 300))
  return MOCK_SERVERS
}

/** Get stats for a specific server */
export async function getServerStats(serverId) {
  await new Promise((r) => setTimeout(r, 200))
  const server = MOCK_SERVERS.find((s) => s.id === serverId)
  return server ? server.stats : null
}

/** Get bandwidth history (30 days) for a server */
export function getBandwidthHistory(serverId) {
  const server = MOCK_SERVERS.find((s) => s.id === serverId)
  if (!server) return []
  const maxBw = server.stats.bandwidth.unit === 'TB' ? 150 : 30 // GB/day
  return generateDailyData(30, maxBw * 0.1, maxBw * 0.6)
}

/** Get backups for a server */
export function getBackups(serverId) {
  if (!serverId) return MOCK_BACKUPS
  return MOCK_BACKUPS.filter((b) => b.serverId === serverId)
}

/** Get alerts for a server */
export function getAlerts(serverId) {
  if (!serverId) return MOCK_ALERTS
  return MOCK_ALERTS.filter((a) => a.serverId === serverId)
}

/** Trigger a manual backup (mock) */
export async function triggerBackup(serverId) {
  await new Promise((r) => setTimeout(r, 1500))
  return { success: true, message: `Backup initiated for ${serverId}` }
}

/** Provision a new service (mock) */
export async function provisionService({ planId, domain, clientId }) {
  await new Promise((r) => setTimeout(r, 2000))
  return {
    success: true,
    serverId: `srv-${Date.now()}`,
    message: `Service provisioned: ${planId} for ${domain}`,
    steps: [
      { step: 'Blesta order created', status: 'complete' },
      { step: 'DirectAdmin account created', status: 'complete' },
      { step: 'HostAfrica DNS configured', status: 'complete' },
      { step: 'SSL certificate installed', status: 'complete' },
    ],
  }
}
