/**
 * System Utilities
 *
 * Cron path sanitization, API key generation, and security utilities
 * for the Technical Relief Unified Command Center.
 */

// ═══════════════════════════════════════════════════════
// CRON PATH FIX
// ═══════════════════════════════════════════════════════

/**
 * Fix cron commands that incorrectly append a trailing slash to /dev/null.
 * Corrects: `/dev/null/` → `/dev/null`
 *
 * @param {string} command - Raw cron command string
 * @returns {string} Sanitized cron command
 */
export function fixCronNullDevice(command) {
  return command.replace(/\/dev\/null\//g, '/dev/null')
}

/**
 * Generate a correct cron command for the technicalrelief.co.za endpoint.
 *
 * @param {string} cronKey - The API/cron key
 * @param {string} interval - Cron timing expression (default: every 5 min)
 * @returns {string} Properly formatted cron command
 */
export function generateCronCommand(cronKey, interval = '*/5 * * * *') {
  const endpoint = `https://technicalrelief.co.za/cron?cron_key=${cronKey}`
  // FIXED: ensure /dev/null never has a trailing slash
  return `${interval} curl -s "${endpoint}" > /dev/null 2>&1`
}

// ═══════════════════════════════════════════════════════
// API KEY ROTATION
// ═══════════════════════════════════════════════════════

/**
 * Generate a high-entropy API/cron key.
 * Uses crypto.getRandomValues for cryptographic randomness.
 *
 * @param {number} length - Key length in characters (default 48)
 * @returns {string} Hex-encoded high-entropy key
 */
export function generateApiKey(length = 48) {
  const array = new Uint8Array(Math.ceil(length / 2))
  crypto.getRandomValues(array)
  return Array.from(array, (b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, length)
}

/**
 * Rotate the cron key — generates a new key and returns the update payload.
 * In production: this would call the Blesta/backend API to persist the change.
 *
 * @param {string} clientId - Client identifier
 * @returns {Promise<object>} { success, newKey, cronCommand, rotatedAt }
 */
export async function rotateCronKey(clientId) {
  // Simulate API call delay
  await new Promise((r) => setTimeout(r, 800))

  const newKey = generateApiKey(48)
  const cronCommand = generateCronCommand(newKey)

  // In production: persist to database
  // await blestaApi.updateClientMeta(clientId, { cron_key: newKey })

  return {
    success: true,
    newKey,
    cronCommand,
    rotatedAt: new Date().toISOString(),
    message: 'API key rotated successfully. Update your cron jobs with the new key.',
  }
}

/**
 * Validate that a cron key has sufficient entropy.
 * Rejects weak keys under 32 characters or with low character variety.
 *
 * @param {string} key
 * @returns {{ valid: boolean, reason?: string }}
 */
export function validateKeyEntropy(key) {
  if (!key || key.length < 32) {
    return { valid: false, reason: 'Key must be at least 32 characters.' }
  }
  const uniqueChars = new Set(key.split('')).size
  if (uniqueChars < 10) {
    return { valid: false, reason: 'Key has insufficient character variety.' }
  }
  return { valid: true }
}
