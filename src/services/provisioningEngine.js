/**
 * Provisioning Engine
 *
 * Orchestrates the full lifecycle from payment → account creation → server provisioning.
 * Chain: PayFast charge → Blesta user create → DirectAdmin provision → HostAfrica DNS
 *
 * In production, each step would call real APIs through a backend proxy.
 * This mock simulates the full provisioning flow with realistic delays and status tracking.
 */

// ═══════════════════════════════════════════════════════
// STATUS DEFINITIONS
// ═══════════════════════════════════════════════════════

export const SERVICE_STATUS = {
  PENDING: 'pending',
  PAYMENT_PROCESSING: 'payment_processing',
  PROVISIONING: 'provisioning',
  CONFIGURING: 'configuring',
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  TERMINATED: 'terminated',
  FAILED: 'failed',
}

export const STATUS_LABELS = {
  [SERVICE_STATUS.PENDING]: { label: 'Pending', color: 'bg-amber-500/15 text-amber-400' },
  [SERVICE_STATUS.PAYMENT_PROCESSING]: { label: 'Processing Payment', color: 'bg-blue-500/15 text-blue-400' },
  [SERVICE_STATUS.PROVISIONING]: { label: 'Provisioning', color: 'bg-purple-500/15 text-purple-400' },
  [SERVICE_STATUS.CONFIGURING]: { label: 'Configuring', color: 'bg-indigo-500/15 text-indigo-400' },
  [SERVICE_STATUS.ACTIVE]: { label: 'Active', color: 'bg-emerald-500/15 text-emerald-400' },
  [SERVICE_STATUS.SUSPENDED]: { label: 'Suspended', color: 'bg-red-500/15 text-red-400' },
  [SERVICE_STATUS.TERMINATED]: { label: 'Terminated', color: 'bg-gray-500/15 text-gray-400' },
  [SERVICE_STATUS.FAILED]: { label: 'Failed', color: 'bg-red-500/15 text-red-400' },
}

// ═══════════════════════════════════════════════════════
// PROVISIONING STEPS
// ═══════════════════════════════════════════════════════

const PROVISION_STEPS = [
  { id: 'payment', label: 'Charge PayFast Token', description: 'Processing payment via linked card' },
  { id: 'blesta_user', label: 'Create Blesta Account', description: 'Setting up billing profile and service record' },
  { id: 'blesta_order', label: 'Create Blesta Order', description: 'Generating invoice and activating service' },
  { id: 'directadmin', label: 'Provision DirectAdmin', description: 'Creating server account, configuring OS and control panel' },
  { id: 'hostafrica_dns', label: 'Configure DNS', description: 'Setting up DNS zones and A/MX records via HostAfrica' },
  { id: 'ssl', label: 'Install SSL Certificate', description: 'Issuing and installing Let\'s Encrypt SSL' },
  { id: 'security', label: 'Harden Security', description: 'Configuring firewall, fail2ban, and DDoS protection' },
  { id: 'verify', label: 'Verify & Activate', description: 'Running health checks and activating service' },
]

// ═══════════════════════════════════════════════════════
// PROVISIONING FLOW
// ═══════════════════════════════════════════════════════

/**
 * Provision a new service after successful payment.
 * Simulates the full chain with step-by-step progress callbacks.
 *
 * @param {object} params
 * @param {string} params.planId - Plan identifier (e.g., 'vps-starter')
 * @param {string} params.domain - Domain name
 * @param {string} params.clientId - Blesta client ID
 * @param {string} params.payfastToken - PayFast card token
 * @param {function} params.onStepUpdate - Callback(stepIndex, status, message)
 * @returns {Promise<object>} Provisioning result
 */
export async function provisionAfterPayment({ planId, domain, clientId, payfastToken, onStepUpdate }) {
  const steps = PROVISION_STEPS.map((s) => ({ ...s, status: 'pending', startedAt: null, completedAt: null }))
  const results = { success: true, steps, serverId: null, error: null }

  for (let i = 0; i < steps.length; i++) {
    steps[i].status = 'running'
    steps[i].startedAt = new Date().toISOString()
    onStepUpdate?.(i, 'running', steps[i].description)

    // Simulate step execution with realistic delays
    const delay = [1200, 800, 600, 2000, 1000, 1500, 1000, 800][i] || 1000
    await new Promise((r) => setTimeout(r, delay))

    // Simulate rare failures (5% chance on DirectAdmin step for realism)
    if (steps[i].id === 'directadmin' && Math.random() < 0.05) {
      steps[i].status = 'failed'
      results.success = false
      results.error = 'DirectAdmin provisioning timed out. Retrying...'
      onStepUpdate?.(i, 'failed', results.error)

      // Auto-retry once
      await new Promise((r) => setTimeout(r, 2000))
      steps[i].status = 'running'
      onStepUpdate?.(i, 'running', 'Retrying DirectAdmin provisioning...')
      await new Promise((r) => setTimeout(r, 2000))
    }

    steps[i].status = 'complete'
    steps[i].completedAt = new Date().toISOString()
    onStepUpdate?.(i, 'complete', `${steps[i].label} complete`)
  }

  results.serverId = `srv-${Date.now()}`
  results.success = true
  return results
}

/**
 * Deprovision a service (reverse chain for cancellations).
 *
 * @param {string} serviceId
 * @param {function} onStepUpdate
 * @returns {Promise<object>}
 */
export async function deprovisionService(serviceId, onStepUpdate) {
  const deprovisionSteps = [
    { label: 'Cancel active subscriptions', delay: 800 },
    { label: 'Remove DNS records', delay: 600 },
    { label: 'Revoke SSL certificate', delay: 500 },
    { label: 'Archive DirectAdmin account', delay: 1200 },
    { label: 'Create final backup', delay: 2000 },
    { label: 'Update Blesta status', delay: 500 },
    { label: 'Terminate service', delay: 300 },
  ]

  for (let i = 0; i < deprovisionSteps.length; i++) {
    onStepUpdate?.(i, 'running', deprovisionSteps[i].label)
    await new Promise((r) => setTimeout(r, deprovisionSteps[i].delay))
    onStepUpdate?.(i, 'complete', `${deprovisionSteps[i].label} — done`)
  }

  return { success: true, serviceId, message: 'Service terminated. Final backup available for 30 days.' }
}

/**
 * Check if there are pending services awaiting payment/provisioning.
 * In production: queries Blesta for services in 'pending' status.
 */
export async function getPendingServices(clientId) {
  await new Promise((r) => setTimeout(r, 200))
  // Mock: no pending services by default
  return []
}

/**
 * Get the provisioning step definitions for UI display.
 */
export function getProvisionSteps() {
  return PROVISION_STEPS
}
